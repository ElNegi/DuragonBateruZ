from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_CELL_VERTICAL_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from pathlib import Path
import json
ROOT=Path(__file__).resolve().parents[1]
cards=json.loads((ROOT/'src/cards/cards.json').read_text(encoding='utf-8'))
out=ROOT/'CATALOGO_COMPLETO_CARTAS_NORMALIZADO.docx'

def shade(cell,fill):
    tcPr=cell._tc.get_or_add_tcPr(); shd=tcPr.find(qn('w:shd'))
    if shd is None: shd=OxmlElement('w:shd');tcPr.append(shd)
    shd.set(qn('w:fill'),fill)

def set_cell_text(cell,text,bold=False,color=None,size=8):
    cell.text='';p=cell.paragraphs[0];r=p.add_run(str(text) if text is not None else '—');r.bold=bold;r.font.size=Pt(size)
    if color:r.font.color.rgb=RGBColor.from_string(color)
    cell.vertical_alignment=WD_CELL_VERTICAL_ALIGNMENT.CENTER

d=Document();sec=d.sections[0];sec.top_margin=Inches(.55);sec.bottom_margin=Inches(.55);sec.left_margin=Inches(.55);sec.right_margin=Inches(.55)
styles=d.styles;styles['Normal'].font.name='Aptos';styles['Normal'].font.size=Pt(9)
styles['Title'].font.name='Aptos Display';styles['Title'].font.size=Pt(28);styles['Title'].font.bold=True;styles['Title'].font.color.rgb=RGBColor(20,67,112)
styles['Heading 1'].font.color.rgb=RGBColor(20,67,112);styles['Heading 1'].font.name='Aptos Display'
styles['Heading 2'].font.color.rgb=RGBColor(40,90,135)

t=d.add_paragraph(style='Title');t.alignment=WD_ALIGN_PARAGRAPH.CENTER;t.add_run('ECOS DE KI\nCatálogo completo de cartas normalizado')
p=d.add_paragraph();p.alignment=WD_ALIGN_PARAGRAPH.CENTER;p.add_run('Generado automáticamente desde src/cards/cards.json\nFuente de contenido: CATALOGO_COMPLETO_CARTAS.docx').italic=True

d.add_heading('Introducción al sistema',1)
d.add_paragraph('Cada jugador controla un personaje perteneciente a una raza inicial: Saiyan, Freezer o Namek. El combate utiliza dados D6 crecientes por ronda, cuyos resultados individuales forman el recurso de Ki. Las acciones se alternan entre combatientes y el sistema está preparado para 1v1, Battle Royale y roguelike contra NPC.')
d.add_heading('Dados y Ki',2);d.add_paragraph('Ronda 1: 1 D6; ronda 2: 2 D6; ronda 3: 3 D6; ronda 4: 4 D6; ronda 5: 5 D6; ronda 6 y posteriores: máximo 6 D6. Se conserva cada cara individual y el Ki disponible es la suma de los dados no gastados.')
d.add_heading('Naturaleza y alcance',2);d.add_paragraph('Los ataques pueden tener Naturaleza FÍSICO o KI, y Alcance CERCANÍA o DISTANCIA. Ambas etiquetas son independientes y pueden ser consultadas por Defensas, Reacciones y otros efectos.')
d.add_heading('Rarezas',2);d.add_paragraph('El documento fuente no define rareza por carta. Para no inventar datos, el campo rarity se conserva como “Pendiente” hasta que exista una tabla de balance aprobada. Las rarezas soportadas por el motor son COMUN, POCO_COMUN, RARA, EPICA y LEGENDARIA.')
d.add_heading('Palabras clave',2);d.add_paragraph('Las palabras clave del JSON se derivan de información explícita del texto fuente (por ejemplo: ROBO, CURACION, KI, DEFENSA, DESCARTE, DADOS, COMBO, REACCION, ESTADO, GRATIS), sin sustituir el texto de reglas original.')

from collections import Counter
source_counts=Counter(c['sourceType'] for c in cards)
d.add_heading('Cantidad por tipo/sección',1)
table=d.add_table(rows=1,cols=2);table.alignment=WD_TABLE_ALIGNMENT.CENTER;table.style='Table Grid'
for i,x in enumerate(['Tipo / sección','Cantidad']):set_cell_text(table.rows[0].cells[i],x,True,'FFFFFF',9);shade(table.rows[0].cells[i],'144370')
for k,v in source_counts.items():
    r=table.add_row().cells;set_cell_text(r[0],k,size=9);set_cell_text(r[1],v,size=9)
r=table.add_row().cells;set_cell_text(r[0],'TOTAL',True,size=9);set_cell_text(r[1],len(cards),True,size=9)

order=[]
for c in cards:
    if c['sourceType'] not in order:order.append(c['sourceType'])
for section in order:
    subset=[c for c in cards if c['sourceType']==section]
    d.add_page_break();d.add_heading(f'{section} ({len(subset)})',1)
    for c in subset:
        d.add_heading(f"{c['sourceIndex']}. {c['name']}",2)
        meta=d.add_table(rows=3,cols=6);meta.style='Table Grid';meta.alignment=WD_TABLE_ALIGNMENT.CENTER
        labels=[('Tipo',c['sourceType']),('Coste',c['cost']),('Rareza',c['rarity'] or 'Pendiente'),('Raza',c['raceRestriction'] or '—'),('Naturaleza',c['nature'] or '—'),('Alcance',c['range'] or '—'),('Daño',c['damage'] if c['damage'] is not None else '—'),('Objetivos',c['targeting']),('Duración',c['duration'] or '—'),('Condición','; '.join(c['conditions']) or '—'),('Palabras clave',', '.join(c['keywords']) or '—'),('ID',c['id'])]
        for idx,(lab,val) in enumerate(labels):
            rr=(idx//4);cc=(idx%4)*0 # unused
        # Use 3 rows x 4 logical pairs by merging row cells into label/value pairs
        meta = d.tables[-1]
        # recreate easier: each row has six cells, 3 pairs
        for i,(lab,val) in enumerate(labels[:9]):
            row=i//3;col=(i%3)*2
            set_cell_text(meta.rows[row].cells[col],lab,True,'FFFFFF',7);shade(meta.rows[row].cells[col],'214E78')
            set_cell_text(meta.rows[row].cells[col+1],val,size=7)
        p=d.add_paragraph();r=p.add_run('Efecto: ');r.bold=True;p.add_run(c['rulesText'])
        p=d.add_paragraph();r=p.add_run('Notas: ');r.bold=True;p.add_run('Texto de reglas preservado exactamente del Word fuente. Los metadatos derivados no sustituyen este texto.')
        d.add_paragraph('')

d.save(out)
print(out)
