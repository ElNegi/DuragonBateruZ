from docx import Document
from pathlib import Path
import json, re, unicodedata

SRC=Path('/mnt/data/CATALOGO_COMPLETO_CARTAS.docx')
OUT=Path('/mnt/data/ecos_de_ki/src/cards/cards.json')
OUT.parent.mkdir(parents=True, exist_ok=True)

def slug(s):
    s=unicodedata.normalize('NFKD',s).encode('ascii','ignore').decode().lower()
    s=re.sub(r'[^a-z0-9]+','_',s).strip('_')
    return s

def normalize_type(raw):
    m={
      'Ataque':'ATAQUE','Defensa':'DEFENSA','Recuperación':'RECUPERACION','Técnica de Ki':'TECNICA',
      'Habilidad':'HABILIDAD','Combo':'COMBO','Misión':'MISION','Saga':'SAGA','Escenario':'ESCENARIO',
      'Equipamiento':'EQUIPAMIENTO','Aliado':'ALIADO','Evento':'EVENTO','Reacción':'REACCION','Estado':'ESTADO',
      'Racial Saiyan':'RACIAL','Racial Freezer':'RACIAL','Racial Namek':'RACIAL','Poder':'PODER','Técnica clásica':'TECNICA'
    }
    return m[raw]

def race(raw):
    if 'Saiyan' in raw: return 'SAIYAN'
    if 'Freezer' in raw: return 'FREEZER'
    if 'Namek' in raw: return 'NAMEK'
    return None

def nature(raw):
    return {'Físico':'FISICO','Ki':'KI'}.get(raw)

def rng(raw):
    return {'Cercanía':'CERCANIA','Distancia':'DISTANCIA'}.get(raw)

def extract_num(pattern,text, flags=re.I):
    m=re.search(pattern,text,flags)
    return int(m.group(1)) if m else None

def infer_effects(text, card_type):
    effects=[]
    # Keep exact source text as a first-class executable fallback. The engine supports core/common operations
    # and records RULE_TEXT effects for complex cards without silently altering semantics.
    # Damage (first explicit instance)
    for m in re.finditer(r'(?:Inflige|inflige|recibe|reciben|pierde|pierden)\s+(\d+)\s+de daño', text):
        verb=text[max(0,m.start()-12):m.start()+10].lower()
        amount=int(m.group(1))
        if 'recibe' in verb or 'pierde' in verb:
            effects.append({'type':'DAMAGE','amount':amount,'target':'CONTEXT'})
        else:
            effects.append({'type':'DAMAGE','amount':amount,'target':'TARGET'})
        if len(effects)>=3: break
    # healing
    for m in re.finditer(r'[Rr]ecupera(?:s|n)?\s+(\d+)\s+de vida', text):
        effects.append({'type':'HEAL','amount':int(m.group(1)),'target':'CONTEXT'})
        if len([e for e in effects if e['type']=='HEAL'])>=2: break
    # draw
    for m in re.finditer(r'[Rr]oba(?:s|n)?\s+(\d+)\s+cart', text):
        effects.append({'type':'DRAW','amount':int(m.group(1)),'target':'SELF'})
        if len([e for e in effects if e['type']=='DRAW'])>=2: break
    # Ki recovery / loss
    for m in re.finditer(r'[Rr]ecupera(?:s|n)?\s+(\d+)\s+(?:puntos? de )?Ki', text):
        effects.append({'type':'GAIN_KI','amount':int(m.group(1)),'target':'SELF'})
    for m in re.finditer(r'[Pp]ierde(?:s|n)?\s+(\d+)\s+Ki', text):
        effects.append({'type':'LOSE_KI','amount':int(m.group(1)),'target':'CONTEXT'})
    # defense/reduction
    for m in re.finditer(r'[Rr]educe(?:s|n)?(?: en)?\s+(\d+)(?:\s+puntos?)?\s+(?:de )?daño', text):
        effects.append({'type':'BLOCK','amount':int(m.group(1)),'target':'SELF'})
        break
    if re.search(r'[Aa]nula completamente|[Aa]nula el ataque|recibes 0 de daño',text):
        effects.append({'type':'NEGATE_ATTACK','target':'SELF'})
    # discards
    m=re.search(r'[Dd]escarta(?:s|n)?\s+(\d+)\s+cart',text)
    if m: effects.append({'type':'DISCARD','amount':int(m.group(1)),'target':'CONTEXT'})
    # extra action
    if re.search(r'acción adicional|otra acción|inmediatamente otra acción', text, re.I):
        effects.append({'type':'EXTRA_ACTION','amount':1,'target':'SELF'})
    # status clear
    if re.search(r'elimina (?:todos tus )?(?:un |tus )?[Ee]stado',text):
        effects.append({'type':'CLEANSE_STATUS','target':'SELF'})
    # status application cards themselves
    if card_type=='ESTADO':
        effects.append({'type':'APPLY_STATUS_FROM_CARD','target':'TARGET'})
    # permanents
    if card_type in ('EQUIPAMIENTO','ALIADO','MISION','SAGA','ESCENARIO'):
        effects.append({'type':'ADD_PERMANENT','zone':card_type,'target':'SELF'})
    # Universal exact-text hook, intentionally always present so no rule text is dropped.
    effects.append({'type':'RULE_TEXT','text':text})
    return effects

def infer_conditions(text):
    conditions=[]
    chunks=re.split(r'(?<=[.!?])\s+',text)
    for c in chunks:
        if re.search(r'\bsi\b|solo pued|cuando|después de|antes de|objetivo:',c,re.I):
            conditions.append(c.strip())
    return conditions

def infer_target(text, card_type):
    low=text.lower()
    if 'todos los personajes enemigos' in low or 'todos los rivales' in low: return 'ALL_ENEMIES'
    if 'todos los personajes' in low or 'todos los jugadores' in low: return 'ALL'
    if 'otro personaje' in low or 'otro jugador' in low: return 'OTHER'
    if 'elige un rival' in low or 'objetivo' in low or card_type in ('ATAQUE','ESTADO'): return 'TARGET'
    return 'SELF'

def infer_duration(text, card_type):
    low=text.lower()
    if 'hasta el final del turno' in low or 'este turno' in low: return 'TURN'
    if 'próximo turno' in low or 'siguiente turno' in low: return 'NEXT_TURN'
    if 'próxima acción' in low or 'siguiente acción' in low: return 'NEXT_ACTION'
    if 'una vez por partida' in low: return 'ONCE_PER_GAME'
    if card_type in ('EQUIPAMIENTO','ALIADO','MISION','ESCENARIO'): return 'PERMANENT'
    if card_type=='SAGA': return 'MULTI_TURN'
    return None

def keywords(text, card_type, nat, ran):
    keys=[]
    if nat: keys.append(nat)
    if ran: keys.append(ran)
    for key,pat in [('ROBO',r'roba'),('CURACION',r'recupera .*vida'),('KI',r'\bKi\b'),('DEFENSA',r'reduce .*daño|anula'),('DESCARTE',r'descarta'),('DADOS',r'dado'),('COMBO',r'combo|consecutiv'),('REACCION',r'reacción'),('ESTADO',r'estado'),('GRATIS',r'gratis|cuesta 0')]:
        if re.search(pat,text,re.I): keys.append(key)
    return sorted(set(keys))

doc=Document(SRC)
cards=[]
for table_index,t in enumerate(doc.tables[1:],start=1):
    for row_index,row in enumerate(t.rows[1:],start=1):
        vals=[c.text.strip().replace('\n',' ') for c in row.cells]
        if len(vals)<7 or not vals[1]: continue
        num,name,cost_raw,type_raw,nat_raw,range_raw,rules=vals[:7]
        ctype=normalize_type(type_raw)
        r=race(type_raw)
        nat=nature(nat_raw); ran=rng(range_raw)
        cost=int(cost_raw)
        # Direct damage only when the main rule starts with inflige or has clear attack damage.
        damage=extract_num(r'^[Ii]nflige\s+(\d+)\s+de daño',rules)
        prefix = {'RACIAL': f'racial_{(r or "generic").lower()}', 'TECNICA': ('tecnica_clasica' if type_raw=='Técnica clásica' else 'tecnica')}.get(ctype,ctype.lower())
        cid=f'{prefix}_{int(num):02d}_{slug(name)}'
        cards.append({
            'id':cid,'sourceIndex':int(num),'name':name,'cardType':ctype,'sourceType':type_raw,'cost':cost,
            'rarity':None,'raceRestriction':r,'nature':nat,'range':ran,'damage':damage,
            'rulesText':rules,'conditions':infer_conditions(rules),'targeting':infer_target(rules,ctype),
            'duration':infer_duration(rules,ctype),'keywords':keywords(rules,ctype,nat,ran),
            'structuredEffects':infer_effects(rules,ctype),'upgrade':None,
            'source':{'document':'CATALOGO_COMPLETO_CARTAS.docx','tableIndex':table_index,'rowIndex':row_index}
        })

assert len(cards)==370, len(cards)
ids=[c['id'] for c in cards]
assert len(ids)==len(set(ids)), 'duplicate ids'
OUT.write_text(json.dumps(cards,ensure_ascii=False,indent=2),encoding='utf-8')
print('wrote',len(cards),OUT)
from collections import Counter
print(Counter(c['cardType'] for c in cards))
