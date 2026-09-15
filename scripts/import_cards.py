from docx import Document
from pathlib import Path
import json,re,unicodedata
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path(r'C:\Users\Negi\Desktop\CATALOGO_COMPLETO_CARTAS.docx')
MAP={'Ataque':'ATAQUE','Defensa':'DEFENSA','Recuperación':'RECUPERACION','Técnica de Ki':'TECNICA','Habilidad':'HABILIDAD','Combo':'COMBO','Misión':'MISION','Saga':'SAGA','Escenario':'ESCENARIO','Equipamiento':'EQUIPAMIENTO','Aliado':'ALIADO','Evento':'EVENTO','Reacción':'REACCION','Estado':'ESTADO','Racial Saiyan':'RACIAL','Racial Freezer':'RACIAL','Racial Namek':'RACIAL','Poder':'PODER','Técnica clásica':'TECNICA'}
def slug(value):
  x=unicodedata.normalize('NFKD',value).encode('ascii','ignore').decode().lower()
  return re.sub(r'[^a-z0-9]+','_',x).strip('_')
def amount(text,verbs):
  m=re.search(r'(?:'+ '|'.join(verbs)+r')\s+(\d+)',text,re.I);return int(m.group(1)) if m else None
def effects(text,typ):
  out=[]
  dmg=amount(text,['Inflige','reciben','hace','daño']); healv=amount(text,['Recupera','cura'])
  if dmg:out.append({'type':'DAMAGE','amount':dmg})
  if healv:out.append({'type':'HEAL','amount':healv})
  statuses={'Aturdido':'aturdido','Debilitado':'debilitado','Quemado':'quemado','Agotado':'agotado','Sellado':'sellado'}
  for label,id in statuses.items():
    if label.lower() in text.lower():out.append({'type':'STATUS','amount':1,'params':{'id':id}})
  if not out:out.append({'type':'RULE_TEXT','params':{'rule':text}})
  return out
def rarity(cost):return 'COMUN' if cost<=2 else 'POCO_COMUN' if cost<=3 else 'RARA' if cost<=4 else 'EPICA' if cost<=5 else 'LEGENDARIA'
d=Document(SOURCE); cards=[]; used={}
for table in d.tables[1:]:
  for row in table.rows[1:]:
    c=[x.text.strip() for x in row.cells]
    if len(c)<7 or not c[1]:continue
    _,name,cost,source,nature,rng,text=c[:7]; cost=int(cost)
    base=slug(name); used[base]=used.get(base,0)+1; ident=base if used[base]==1 else f'{base}_{used[base]}'
    race=None
    if source.startswith('Racial '):race=source.split()[-1].upper(); race='FREEZER' if race=='FREEZER' else race
    nat={'Físico':'FISICO','Ki':'KI'}.get(nature); ra={'Cercanía':'CERCANIA','Distancia':'DISTANCIA'}.get(rng)
    dmg=amount(text,['Inflige','reciben'])
    cards.append({'id':ident,'name':name,'cardType':MAP[source],'sourceType':source,'cost':cost,'rarity':rarity(cost),'raceRestriction':race,'nature':nat,'range':ra,'damage':dmg,'rulesText':text,'conditions':text if any(x in text.lower() for x in ['si ','cuando ','después','antes','mientras']) else '', 'targeting':'OTRO' if any(x in text.lower() for x in ['rival','objetivo','personaje','todos']) else 'PROPIO','duration':'PERMANENTE' if MAP[source] in ['MISION','SAGA','ESCENARIO','EQUIPAMIENTO','ALIADO','ESTADO'] else 'INSTANTANEA','keywords':[MAP[source],*( [nat] if nat else []),*( [ra] if ra else [])],'structuredEffects':effects(text,MAP[source])})
assert len(cards)==370, len(cards)
for c in cards:
  if c['raceRestriction'] is None: del c['raceRestriction']
  if c['nature'] is None: del c['nature']
  if c['range'] is None: del c['range']
  if c['damage'] is None: del c['damage']
(ROOT/'src/cards').mkdir(parents=True,exist_ok=True)
(ROOT/'src/cards/cards.json').write_text(json.dumps(cards,ensure_ascii=False,indent=2),encoding='utf8')
print(f'Imported {len(cards)} cards')
