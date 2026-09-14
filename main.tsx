[
  {
    "id": "ataque_01_golpe_directo",
    "sourceIndex": 1,
    "name": "Golpe Directo",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 1
    }
  },
  {
    "id": "ataque_02_golpe_pesado",
    "sourceIndex": 2,
    "name": "Golpe Pesado",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño. No puede ser jugado si ya has atacado este turno.",
    "conditions": [
      "No puede ser jugado si ya has atacado este turno."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño. No puede ser jugado si ya has atacado este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 2
    }
  },
  {
    "id": "ataque_03_golpe_rapido",
    "sourceIndex": 3,
    "name": "Golpe Rápido",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño. Si es tu primera acción del turno, puedes robar 1 carta.",
    "conditions": [
      "Si es tu primera acción del turno, puedes robar 1 carta."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño. Si es tu primera acción del turno, puedes robar 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 3
    }
  },
  {
    "id": "ataque_04_kamehameha",
    "sourceIndex": 4,
    "name": "Kamehameha",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 8,
    "rulesText": "Inflige 8 de daño.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 4
    }
  },
  {
    "id": "ataque_05_rafaga_de_ki",
    "sourceIndex": 5,
    "name": "Ráfaga de Ki",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Si el objetivo tiene una barrera, inflige 1 daño adicional.",
    "conditions": [
      "Si el objetivo tiene una barrera, inflige 1 daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Si el objetivo tiene una barrera, inflige 1 daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 5
    }
  },
  {
    "id": "ataque_06_doble_golpe",
    "sourceIndex": 6,
    "name": "Doble Golpe",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño dos veces. El rival puede defenderse de cada golpe por separado.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño dos veces. El rival puede defenderse de cada golpe por separado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 6
    }
  },
  {
    "id": "ataque_07_golpe_demoledor",
    "sourceIndex": 7,
    "name": "Golpe Demoledor",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño e ignora 3 puntos de defensa.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño e ignora 3 puntos de defensa."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 7
    }
  },
  {
    "id": "ataque_08_rafaga_concentrada",
    "sourceIndex": 8,
    "name": "Ráfaga Concentrada",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño. Si gastaste exactamente 3 Ki, roba 1 carta.",
    "conditions": [
      "Si gastaste exactamente 3 Ki, roba 1 carta."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño. Si gastaste exactamente 3 Ki, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 8
    }
  },
  {
    "id": "ataque_09_ataque_fulgurante",
    "sourceIndex": 9,
    "name": "Ataque Fulgurante",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. Si el objetivo tiene más vida que tú, inflige 3 de daño adicional.",
    "conditions": [
      "Si el objetivo tiene más vida que tú, inflige 3 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. Si el objetivo tiene más vida que tú, inflige 3 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 9
    }
  },
  {
    "id": "ataque_10_golpe_al_estomago",
    "sourceIndex": 10,
    "name": "Golpe al Estómago",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. El objetivo tiene +1 de coste en su próxima carta.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. El objetivo tiene +1 de coste en su próxima carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 10
    }
  },
  {
    "id": "ataque_11_patada_voladora",
    "sourceIndex": 11,
    "name": "Patada Voladora",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. Si el objetivo tiene un equipamiento, puedes hacer que pierda su efecto durante este turno.",
    "conditions": [
      "Si el objetivo tiene un equipamiento, puedes hacer que pierda su efecto durante este turno."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. Si el objetivo tiene un equipamiento, puedes hacer que pierda su efecto durante este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 11
    }
  },
  {
    "id": "ataque_12_punetazo_brutal",
    "sourceIndex": 12,
    "name": "Puñetazo Brutal",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño. Si el objetivo tiene 5 o menos de vida después del ataque, inflige 2 de daño adicional.",
    "conditions": [
      "Si el objetivo tiene 5 o menos de vida después del ataque, inflige 2 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño. Si el objetivo tiene 5 o menos de vida después del ataque, inflige 2 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 12
    }
  },
  {
    "id": "ataque_13_canon_de_ki",
    "sourceIndex": 13,
    "name": "Cañón de Ki",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño. Si el resultado de alguno de tus dados este turno es 6, inflige 2 de daño adicional.",
    "conditions": [
      "Si el resultado de alguno de tus dados este turno es 6, inflige 2 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [
      "DADOS",
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño. Si el resultado de alguno de tus dados este turno es 6, inflige 2 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 13
    }
  },
  {
    "id": "ataque_14_asalto_frenetico",
    "sourceIndex": 14,
    "name": "Asalto Frenético",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño tres veces.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño tres veces."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 14
    }
  },
  {
    "id": "ataque_15_golpe_desestabilizador",
    "sourceIndex": 15,
    "name": "Golpe Desestabilizador",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. El objetivo no puede jugar cartas de reacción durante su próxima acción.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_ACTION",
    "keywords": [
      "CERCANIA",
      "FISICO",
      "REACCION"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. El objetivo no puede jugar cartas de reacción durante su próxima acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 15
    }
  },
  {
    "id": "ataque_16_explosion_repentina",
    "sourceIndex": 16,
    "name": "Explosión Repentina",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño al objetivo y 2 de daño a todos los demás personajes.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño al objetivo y 2 de daño a todos los demás personajes."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 16
    }
  },
  {
    "id": "ataque_17_onda_expansiva",
    "sourceIndex": 17,
    "name": "Onda Expansiva",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño a todos los personajes enemigos.",
    "conditions": [],
    "targeting": "ALL_ENEMIES",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño a todos los personajes enemigos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 17
    }
  },
  {
    "id": "ataque_18_ataque_perforante",
    "sourceIndex": 18,
    "name": "Ataque Perforante",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño e ignora completamente las cartas de defensa que reduzcan 2 o menos de daño.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño e ignora completamente las cartas de defensa que reduzcan 2 o menos de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 18
    }
  },
  {
    "id": "ataque_19_disparo_certero",
    "sourceIndex": 19,
    "name": "Disparo Certero",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño. Este ataque no puede ser redirigido a otro objetivo.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño. Este ataque no puede ser redirigido a otro objetivo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 19
    }
  },
  {
    "id": "ataque_20_golpe_de_castigo",
    "sourceIndex": 20,
    "name": "Golpe de Castigo",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Si el objetivo te infligió daño durante su última acción, inflige 3 de daño adicional.",
    "conditions": [
      "Si el objetivo te infligió daño durante su última acción, inflige 3 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Si el objetivo te infligió daño durante su última acción, inflige 3 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 20
    }
  },
  {
    "id": "ataque_21_contraataque_brutal",
    "sourceIndex": 21,
    "name": "Contraataque Brutal",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": null,
    "rulesText": "Solo puedes jugarlo después de recibir daño. Inflige 6 de daño al atacante.",
    "conditions": [
      "Solo puedes jugarlo después de recibir daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Solo puedes jugarlo después de recibir daño. Inflige 6 de daño al atacante."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 21
    }
  },
  {
    "id": "ataque_22_ataque_de_oportunidad",
    "sourceIndex": 22,
    "name": "Ataque de Oportunidad",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": null,
    "rulesText": "Si el objetivo acaba de jugar una carta con coste 5 o superior, inflige 5 de daño.",
    "conditions": [
      "Si el objetivo acaba de jugar una carta con coste 5 o superior, inflige 5 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el objetivo acaba de jugar una carta con coste 5 o superior, inflige 5 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 22
    }
  },
  {
    "id": "ataque_23_ataque_implacable",
    "sourceIndex": 23,
    "name": "Ataque Implacable",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Si has atacado anteriormente este turno, inflige 7 de daño en su lugar.",
    "conditions": [
      "Si has atacado anteriormente este turno, inflige 7 de daño en su lugar."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Si has atacado anteriormente este turno, inflige 7 de daño en su lugar."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 23
    }
  },
  {
    "id": "ataque_24_golpe_final",
    "sourceIndex": 24,
    "name": "Golpe Final",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 10,
    "rulesText": "Inflige 10 de daño. Solo puedes jugarlo contra un personaje que tenga 10 o menos de vida.",
    "conditions": [
      "Solo puedes jugarlo contra un personaje que tenga 10 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 10 de daño. Solo puedes jugarlo contra un personaje que tenga 10 o menos de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 24
    }
  },
  {
    "id": "ataque_25_ki_explosivo",
    "sourceIndex": 25,
    "name": "Ki Explosivo",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño. Si el objetivo queda con 5 o menos de vida, debe descartar 1 carta.",
    "conditions": [
      "Si el objetivo queda con 5 o menos de vida, debe descartar 1 carta."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño. Si el objetivo queda con 5 o menos de vida, debe descartar 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 25
    }
  },
  {
    "id": "ataque_26_ataque_sacrificado",
    "sourceIndex": 26,
    "name": "Ataque Sacrificado",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": null,
    "rulesText": "Pierdes 2 de vida e infliges 8 de daño.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Pierdes 2 de vida e infliges 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 26
    }
  },
  {
    "id": "ataque_27_combo_ascendente",
    "sourceIndex": 27,
    "name": "Combo Ascendente",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. Si esta es tu segunda carta de ataque consecutiva, inflige 6 en lugar de 3.",
    "conditions": [
      "Si esta es tu segunda carta de ataque consecutiva, inflige 6 en lugar de 3."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "COMBO",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. Si esta es tu segunda carta de ataque consecutiva, inflige 6 en lugar de 3."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 27
    }
  },
  {
    "id": "ataque_28_tormenta_de_golpes",
    "sourceIndex": 28,
    "name": "Tormenta de Golpes",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": null,
    "rulesText": "Lanza un dado. Inflige 2 de daño × el resultado del dado, hasta un máximo de 10.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "DADOS",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Lanza un dado. Inflige 2 de daño × el resultado del dado, hasta un máximo de 10."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 28
    }
  },
  {
    "id": "ataque_29_ataque_de_rebote",
    "sourceIndex": 29,
    "name": "Ataque de Rebote",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño. Si el objetivo utiliza una defensa para reducir el daño, recibe 2 de daño adicional.",
    "conditions": [
      "Si el objetivo utiliza una defensa para reducir el daño, recibe 2 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño. Si el objetivo utiliza una defensa para reducir el daño, recibe 2 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 29
    }
  },
  {
    "id": "ataque_30_golpe_del_ultimo_aliento",
    "sourceIndex": 30,
    "name": "Golpe del Último Aliento",
    "cardType": "ATAQUE",
    "sourceType": "Ataque",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": null,
    "rulesText": "Solo puedes jugarlo si tienes 5 o menos de vida. Inflige 8 de daño.",
    "conditions": [
      "Solo puedes jugarlo si tienes 5 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Solo puedes jugarlo si tienes 5 o menos de vida. Inflige 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 1,
      "rowIndex": 30
    }
  },
  {
    "id": "defensa_01_bloqueo_basico",
    "sourceIndex": 1,
    "name": "Bloqueo Básico",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 4 de daño del próximo ataque que recibas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 4 de daño del próximo ataque que recibas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 1
    }
  },
  {
    "id": "defensa_02_guardia_firme",
    "sourceIndex": 2,
    "name": "Guardia Firme",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 6 de daño del próximo ataque.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 6,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 6 de daño del próximo ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 2
    }
  },
  {
    "id": "defensa_03_barrera_de_ki",
    "sourceIndex": 3,
    "name": "Barrera de Ki",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 8 de daño del próximo ataque.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 8,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 8 de daño del próximo ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 3
    }
  },
  {
    "id": "defensa_04_esquiva_rapida",
    "sourceIndex": 4,
    "name": "Esquiva Rápida",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula completamente el próximo ataque que te tenga como objetivo.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula completamente el próximo ataque que te tenga como objetivo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 4
    }
  },
  {
    "id": "defensa_05_desvio",
    "sourceIndex": 5,
    "name": "Desvío",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 4 de daño. El atacante recibe 2 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 4 de daño. El atacante recibe 2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 5
    }
  },
  {
    "id": "defensa_06_bloqueo_perfecto",
    "sourceIndex": 6,
    "name": "Bloqueo Perfecto",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula completamente un ataque de 6 o menos de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula completamente un ataque de 6 o menos de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 6
    }
  },
  {
    "id": "defensa_07_paso_atras",
    "sourceIndex": 7,
    "name": "Paso Atrás",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 3 de daño. Después, puedes robar 1 carta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 3 de daño. Después, puedes robar 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 7
    }
  },
  {
    "id": "defensa_08_barrera_reforzada",
    "sourceIndex": 8,
    "name": "Barrera Reforzada",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 10 de daño del próximo ataque.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 10,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 10 de daño del próximo ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 8
    }
  },
  {
    "id": "defensa_09_defensa_de_emergencia",
    "sourceIndex": 9,
    "name": "Defensa de Emergencia",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Solo puede jugarse si tienes 5 o menos de vida. Reduce 7 de daño.",
    "conditions": [
      "Solo puede jugarse si tienes 5 o menos de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 7,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Solo puede jugarse si tienes 5 o menos de vida. Reduce 7 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 9
    }
  },
  {
    "id": "defensa_10_contraataque_defensivo",
    "sourceIndex": 10,
    "name": "Contraataque Defensivo",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 5 de daño. Si reduces al menos 5, inflige 3 de daño al atacante.",
    "conditions": [
      "Si reduces al menos 5, inflige 3 de daño al atacante."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 5 de daño. Si reduces al menos 5, inflige 3 de daño al atacante."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 10
    }
  },
  {
    "id": "defensa_11_guardia_total",
    "sourceIndex": 11,
    "name": "Guardia Total",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el final de la acción actual, recibes 0 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Hasta el final de la acción actual, recibes 0 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 11
    }
  },
  {
    "id": "defensa_12_escudo_explosivo",
    "sourceIndex": 12,
    "name": "Escudo Explosivo",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 5 de daño. Si el ataque queda completamente bloqueado, el atacante recibe 4 de daño.",
    "conditions": [
      "Si el ataque queda completamente bloqueado, el atacante recibe 4 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 5 de daño. Si el ataque queda completamente bloqueado, el atacante recibe 4 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 12
    }
  },
  {
    "id": "defensa_13_desaparicion",
    "sourceIndex": 13,
    "name": "Desaparición",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula el ataque. No puedes ser objetivo de otro ataque durante esta acción.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula el ataque. No puedes ser objetivo de otro ataque durante esta acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 13
    }
  },
  {
    "id": "defensa_14_defensa_concentrada",
    "sourceIndex": 14,
    "name": "Defensa Concentrada",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 4 de daño. Si el ataque inflige más de 7 de daño, reduce 2 adicionales.",
    "conditions": [
      "Si el ataque inflige más de 7 de daño, reduce 2 adicionales."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 4 de daño. Si el ataque inflige más de 7 de daño, reduce 2 adicionales."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 14
    }
  },
  {
    "id": "defensa_15_armadura_de_ki",
    "sourceIndex": 15,
    "name": "Armadura de Ki",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 3 de daño de cada ataque que recibas hasta el final de este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 3 de daño de cada ataque que recibas hasta el final de este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 15
    }
  },
  {
    "id": "defensa_16_guardia_absoluta",
    "sourceIndex": 16,
    "name": "Guardia Absoluta",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 12 de daño. Después, descarta 1 carta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 12,
        "target": "SELF"
      },
      {
        "type": "DISCARD",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 12 de daño. Después, descarta 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 16
    }
  },
  {
    "id": "defensa_17_reflejo_instantaneo",
    "sourceIndex": 17,
    "name": "Reflejo Instantáneo",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el ataque tiene 4 o menos de daño, lo anulas completamente. Si tiene más, reduce 3.",
    "conditions": [
      "Si el ataque tiene 4 o menos de daño, lo anulas completamente.",
      "Si tiene más, reduce 3."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Si el ataque tiene 4 o menos de daño, lo anulas completamente. Si tiene más, reduce 3."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 17
    }
  },
  {
    "id": "defensa_18_desviar_el_ki",
    "sourceIndex": 18,
    "name": "Desviar el Ki",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 5 de daño de un ataque de Ki. El atacante pierde 1 Ki.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "LOSE_KI",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 5 de daño de un ataque de Ki. El atacante pierde 1 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 18
    }
  },
  {
    "id": "defensa_19_resistencia_saiyan",
    "sourceIndex": 19,
    "name": "Resistencia Saiyan",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 4 de daño. Si sobrevives al ataque con 3 o menos de vida, roba 2 cartas.",
    "conditions": [
      "Si sobrevives al ataque con 3 o menos de vida, roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "BLOCK",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 4 de daño. Si sobrevives al ataque con 3 o menos de vida, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 19
    }
  },
  {
    "id": "defensa_20_regeneracion_namekiana",
    "sourceIndex": 20,
    "name": "Regeneración Namekiana",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 3 de daño y recupera 3 de vida después de resolver el ataque.",
    "conditions": [
      "Reduce 3 de daño y recupera 3 de vida después de resolver el ataque."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 3 de daño y recupera 3 de vida después de resolver el ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 20
    }
  },
  {
    "id": "defensa_21_defensa_cruel",
    "sourceIndex": 21,
    "name": "Defensa Cruel",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 3 de daño. Si recibes al menos 1 de daño, el atacante recibe 2 de daño.",
    "conditions": [
      "Si recibes al menos 1 de daño, el atacante recibe 2 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 3 de daño. Si recibes al menos 1 de daño, el atacante recibe 2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 21
    }
  },
  {
    "id": "defensa_22_ultimo_escudo",
    "sourceIndex": 22,
    "name": "Último Escudo",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el ataque fuera a reducirte a 0 de vida, quedas en 1 de vida y reduces el daño restante a 0.",
    "conditions": [
      "Si el ataque fuera a reducirte a 0 de vida, quedas en 1 de vida y reduces el daño restante a 0."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Si el ataque fuera a reducirte a 0 de vida, quedas en 1 de vida y reduces el daño restante a 0."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 22
    }
  },
  {
    "id": "defensa_23_evasion_perfecta",
    "sourceIndex": 23,
    "name": "Evasión Perfecta",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula completamente el ataque. Si el ataque tenía un coste de 5 o más, roba 1 carta.",
    "conditions": [
      "Si el ataque tenía un coste de 5 o más, roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula completamente el ataque. Si el ataque tenía un coste de 5 o más, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 23
    }
  },
  {
    "id": "defensa_24_barrera_compartida",
    "sourceIndex": 24,
    "name": "Barrera Compartida",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 5 de daño a ti o a otro personaje.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 5 de daño a ti o a otro personaje."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 24
    }
  },
  {
    "id": "defensa_25_intercepcion",
    "sourceIndex": 25,
    "name": "Intercepción",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando otro personaje sea objetivo de un ataque, puedes convertirte en el objetivo. Reduce además 3 de daño.",
    "conditions": [
      "Cuando otro personaje sea objetivo de un ataque, puedes convertirte en el objetivo."
    ],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando otro personaje sea objetivo de un ataque, puedes convertirte en el objetivo. Reduce además 3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 25
    }
  },
  {
    "id": "defensa_26_defensa_reflejada",
    "sourceIndex": 26,
    "name": "Defensa Reflejada",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 6 de daño. La mitad del daño reducido, redondeada hacia abajo, se devuelve al atacante.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 6,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 6 de daño. La mitad del daño reducido, redondeada hacia abajo, se devuelve al atacante."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 26
    }
  },
  {
    "id": "defensa_27_leer_el_movimiento",
    "sourceIndex": 27,
    "name": "Leer el Movimiento",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 2 de daño. Si el atacante jugó previamente otra carta este turno, reduce 5 en su lugar.",
    "conditions": [
      "Si el atacante jugó previamente otra carta este turno, reduce 5 en su lugar."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 2 de daño. Si el atacante jugó previamente otra carta este turno, reduce 5 en su lugar."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 27
    }
  },
  {
    "id": "defensa_28_ki_protector",
    "sourceIndex": 28,
    "name": "Ki Protector",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 4 de daño. Si el ataque te deja con 6 o menos de vida, recuperas 1 resultado de dado gastado este turno.",
    "conditions": [
      "Si el ataque te deja con 6 o menos de vida, recuperas 1 resultado de dado gastado este turno."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS",
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 4 de daño. Si el ataque te deja con 6 o menos de vida, recuperas 1 resultado de dado gastado este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 28
    }
  },
  {
    "id": "defensa_29_defensa_desesperada",
    "sourceIndex": 29,
    "name": "Defensa Desesperada",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Pierdes 1 carta de tu mano. Reduce 8 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 8,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Pierdes 1 carta de tu mano. Reduce 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 29
    }
  },
  {
    "id": "defensa_30_defensa_suprema",
    "sourceIndex": 30,
    "name": "Defensa Suprema",
    "cardType": "DEFENSA",
    "sourceType": "Defensa",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula completamente el ataque y recupera 2 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula completamente el ataque y recupera 2 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 2,
      "rowIndex": 30
    }
  },
  {
    "id": "recuperacion_01_recuperacion_basica",
    "sourceIndex": 1,
    "name": "Recuperación Básica",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 4 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 4 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 1
    }
  },
  {
    "id": "recuperacion_02_gran_recuperacion",
    "sourceIndex": 2,
    "name": "Gran Recuperación",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 8 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 8 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 2
    }
  },
  {
    "id": "recuperacion_03_regeneracion",
    "sourceIndex": 3,
    "name": "Regeneración",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 2 de vida ahora y 2 al comienzo de tus próximos 2 turnos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 2 de vida ahora y 2 al comienzo de tus próximos 2 turnos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 3
    }
  },
  {
    "id": "recuperacion_04_ultimo_aliento",
    "sourceIndex": 4,
    "name": "Último Aliento",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes 5 o menos de vida, recupera 7 de vida.",
    "conditions": [
      "Si tienes 5 o menos de vida, recupera 7 de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 7,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes 5 o menos de vida, recupera 7 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 4
    }
  },
  {
    "id": "recuperacion_05_recuperacion_de_emergencia",
    "sourceIndex": 5,
    "name": "Recuperación de Emergencia",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 3 de vida. Solo puedes jugarla si tienes 4 o menos de vida.",
    "conditions": [
      "Solo puedes jugarla si tienes 4 o menos de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 3 de vida. Solo puedes jugarla si tienes 4 o menos de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 5
    }
  },
  {
    "id": "recuperacion_06_descanso",
    "sourceIndex": 6,
    "name": "Descanso",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 5 de vida, pero no puedes realizar ataques durante tu próxima acción.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_ACTION",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 5 de vida, pero no puedes realizar ataques durante tu próxima acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 6
    }
  },
  {
    "id": "recuperacion_07_curacion_profunda",
    "sourceIndex": 7,
    "name": "Curación Profunda",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 12 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 12,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 12 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 7
    }
  },
  {
    "id": "recuperacion_08_regeneracion_acelerada",
    "sourceIndex": 8,
    "name": "Regeneración Acelerada",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 4 de vida y elimina un estado negativo.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 4 de vida y elimina un estado negativo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 8
    }
  },
  {
    "id": "recuperacion_09_sangre_saiyan",
    "sourceIndex": 9,
    "name": "Sangre Saiyan",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 5 de vida. Si comenzaste el turno con menos de la mitad de tu vida máxima, roba 1 carta.",
    "conditions": [
      "Si comenzaste el turno con menos de la mitad de tu vida máxima, roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 5 de vida. Si comenzaste el turno con menos de la mitad de tu vida máxima, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 9
    }
  },
  {
    "id": "recuperacion_10_regeneracion_namekiana",
    "sourceIndex": 10,
    "name": "Regeneración Namekiana",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 7 de vida y elimina un estado negativo.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 7,
        "target": "CONTEXT"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 7 de vida y elimina un estado negativo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 10
    }
  },
  {
    "id": "recuperacion_11_resistencia_de_freezer",
    "sourceIndex": 11,
    "name": "Resistencia de Freezer",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 4 de vida. Si tienes 5 o menos de vida después de curarte, recupera 3 adicionales.",
    "conditions": [
      "Si tienes 5 o menos de vida después de curarte, recupera 3 adicionales."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 4 de vida. Si tienes 5 o menos de vida después de curarte, recupera 3 adicionales."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 11
    }
  },
  {
    "id": "recuperacion_12_semilla_senzu",
    "sourceIndex": 12,
    "name": "Semilla Senzu",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera toda tu vida. Solo puedes jugarla si tienes 10 o menos de vida.",
    "conditions": [
      "Solo puedes jugarla si tienes 10 o menos de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Recupera toda tu vida. Solo puedes jugarla si tienes 10 o menos de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 12
    }
  },
  {
    "id": "recuperacion_13_recuperar_ki",
    "sourceIndex": 13,
    "name": "Recuperar Ki",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 2 puntos de Ki gastados este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 2 puntos de Ki gastados este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 13
    }
  },
  {
    "id": "recuperacion_14_reserva_de_energia",
    "sourceIndex": 14,
    "name": "Reserva de Energía",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Guarda un resultado de dado sin gastar para utilizarlo durante tu próximo turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Guarda un resultado de dado sin gastar para utilizarlo durante tu próximo turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 14
    }
  },
  {
    "id": "recuperacion_15_recarga_de_ki",
    "sourceIndex": 15,
    "name": "Recarga de Ki",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 3 puntos de Ki gastados este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 3 puntos de Ki gastados este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 15
    }
  },
  {
    "id": "recuperacion_16_explosion_de_energia",
    "sourceIndex": 16,
    "name": "Explosión de Energía",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 2 de vida por cada dado que todavía no hayas gastado este turno, hasta un máximo de 8.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "CURACION",
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 2 de vida por cada dado que todavía no hayas gastado este turno, hasta un máximo de 8."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 16
    }
  },
  {
    "id": "recuperacion_17_meditacion",
    "sourceIndex": 17,
    "name": "Meditación",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "No recuperas vida. En tu próximo turno, uno de tus dados obtiene +2 a su resultado, hasta un máximo de 6.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "No recuperas vida. En tu próximo turno, uno de tus dados obtiene +2 a su resultado, hasta un máximo de 6."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 17
    }
  },
  {
    "id": "recuperacion_18_renovacion_de_ki",
    "sourceIndex": 18,
    "name": "Renovación de Ki",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera un dado utilizado este turno y vuelve a considerarlo disponible.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Recupera un dado utilizado este turno y vuelve a considerarlo disponible."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 18
    }
  },
  {
    "id": "recuperacion_19_volver_al_combate",
    "sourceIndex": 19,
    "name": "Volver al Combate",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 6 de vida y roba 2 cartas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 6 de vida y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 19
    }
  },
  {
    "id": "recuperacion_20_segundo_aire",
    "sourceIndex": 20,
    "name": "Segundo Aire",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 4 de vida. Si este efecto te deja por encima de la mitad de tu vida máxima, obtienes +1 al primer dado de tu próximo turno.",
    "conditions": [
      "Si este efecto te deja por encima de la mitad de tu vida máxima, obtienes +1 al primer dado de tu próximo turno."
    ],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "CURACION",
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 4 de vida. Si este efecto te deja por encima de la mitad de tu vida máxima, obtienes +1 al primer dado de tu próximo turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 20
    }
  },
  {
    "id": "recuperacion_21_recuperacion_milagrosa",
    "sourceIndex": 21,
    "name": "Recuperación Milagrosa",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 10 de vida y elimina todos tus estados negativos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 10 de vida y elimina todos tus estados negativos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 21
    }
  },
  {
    "id": "recuperacion_22_comer_una_semilla",
    "sourceIndex": 22,
    "name": "Comer una Semilla",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 6 de vida. Si tienes 3 o menos de vida, recupera 9 en su lugar.",
    "conditions": [
      "Si tienes 3 o menos de vida, recupera 9 en su lugar."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 6 de vida. Si tienes 3 o menos de vida, recupera 9 en su lugar."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 22
    }
  },
  {
    "id": "recuperacion_23_voluntad_de_sobrevivir",
    "sourceIndex": 23,
    "name": "Voluntad de Sobrevivir",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 5 de vida. Si estabas a 1 de vida, recupera 8 en su lugar.",
    "conditions": [
      "Si estabas a 1 de vida, recupera 8 en su lugar."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 5 de vida. Si estabas a 1 de vida, recupera 8 en su lugar."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 23
    }
  },
  {
    "id": "recuperacion_24_recomponerse",
    "sourceIndex": 24,
    "name": "Recomponerse",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 4 de vida y devuelve 1 carta de tu descarte a tu mano.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 4,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 4 de vida y devuelve 1 carta de tu descarte a tu mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 24
    }
  },
  {
    "id": "recuperacion_25_recuperacion_tactica",
    "sourceIndex": 25,
    "name": "Recuperación Táctica",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 3 de vida y puedes descartar 1 carta para robar 2.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 3 de vida y puedes descartar 1 carta para robar 2."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 25
    }
  },
  {
    "id": "recuperacion_26_absorcion_de_energia",
    "sourceIndex": 26,
    "name": "Absorción de Energía",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 5 de vida. Si el último ataque recibido fue de Ki, recupera además 2 Ki.",
    "conditions": [
      "Si el último ataque recibido fue de Ki, recupera además 2 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 5 de vida. Si el último ataque recibido fue de Ki, recupera además 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 26
    }
  },
  {
    "id": "recuperacion_27_energia_compartida",
    "sourceIndex": 27,
    "name": "Energía Compartida",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige a otro personaje. Tú recuperas 3 de vida y ese personaje recupera 3 de vida.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Elige a otro personaje. Tú recuperas 3 de vida y ese personaje recupera 3 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 27
    }
  },
  {
    "id": "recuperacion_28_recuperacion_total",
    "sourceIndex": 28,
    "name": "Recuperación Total",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 8 de vida y 2 Ki.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 8 de vida y 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 28
    }
  },
  {
    "id": "recuperacion_29_milagro",
    "sourceIndex": 29,
    "name": "Milagro",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si fueras a quedar en 0 de vida durante este turno, quedas en 1 de vida y recuperas 6 de vida.",
    "conditions": [
      "Si fueras a quedar en 0 de vida durante este turno, quedas en 1 de vida y recuperas 6 de vida."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si fueras a quedar en 0 de vida durante este turno, quedas en 1 de vida y recuperas 6 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 29
    }
  },
  {
    "id": "recuperacion_30_renacer_del_guerrero",
    "sourceIndex": 30,
    "name": "Renacer del Guerrero",
    "cardType": "RECUPERACION",
    "sourceType": "Recuperación",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes 3 o menos de vida, recupera 10 de vida, roba 2 cartas y recupera 1 punto de Ki.",
    "conditions": [
      "Si tienes 3 o menos de vida, recupera 10 de vida, roba 2 cartas y recupera 1 punto de Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes 3 o menos de vida, recupera 10 de vida, roba 2 cartas y recupera 1 punto de Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 3,
      "rowIndex": 30
    }
  },
  {
    "id": "tecnica_01_carga_de_ki",
    "sourceIndex": 1,
    "name": "Carga de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 2 Ki gastados este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 2 Ki gastados este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 1
    }
  },
  {
    "id": "tecnica_02_concentracion",
    "sourceIndex": 2,
    "name": "Concentración",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un dado sin gastar. Su resultado obtiene +2, hasta un máximo de 6.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un dado sin gastar. Su resultado obtiene +2, hasta un máximo de 6."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 2
    }
  },
  {
    "id": "tecnica_03_control_del_ki",
    "sourceIndex": 3,
    "name": "Control del Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cambia el resultado de uno de tus dados a cualquier valor entre 1 y 6.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cambia el resultado de uno de tus dados a cualquier valor entre 1 y 6."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 3
    }
  },
  {
    "id": "tecnica_04_sobrecarga",
    "sourceIndex": 4,
    "name": "Sobrecarga",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu próximo ataque cuesta 2 Ki menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Tu próximo ataque cuesta 2 Ki menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 4
    }
  },
  {
    "id": "tecnica_05_reserva_de_energia",
    "sourceIndex": 5,
    "name": "Reserva de Energía",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Guarda un dado sin gastar. Puedes utilizar su resultado durante tu próximo turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Guarda un dado sin gastar. Puedes utilizar su resultado durante tu próximo turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 5
    }
  },
  {
    "id": "tecnica_06_explosion_de_ki",
    "sourceIndex": 6,
    "name": "Explosión de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Convierte uno de tus dados en un 6, pero no podrás utilizar ese dado durante este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Convierte uno de tus dados en un 6, pero no podrás utilizar ese dado durante este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 6
    }
  },
  {
    "id": "tecnica_07_distribucion_de_ki",
    "sourceIndex": 7,
    "name": "Distribución de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Divide el resultado de uno de tus dados entre dos dados, redondeando hacia abajo.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Divide el resultado de uno de tus dados entre dos dados, redondeando hacia abajo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 7
    }
  },
  {
    "id": "tecnica_08_fusion_de_ki",
    "sourceIndex": 8,
    "name": "Fusión de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Combina dos dados. Suma sus resultados y utiliza ese valor como un único recurso.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Combina dos dados. Suma sus resultados y utiliza ese valor como un único recurso."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 8
    }
  },
  {
    "id": "tecnica_09_recuperacion_instantanea",
    "sourceIndex": 9,
    "name": "Recuperación Instantánea",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera un dado gastado este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Recupera un dado gastado este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 9
    }
  },
  {
    "id": "tecnica_10_ultima_reserva",
    "sourceIndex": 10,
    "name": "Última Reserva",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si no tienes ningún Ki disponible, recupera 2 Ki.",
    "conditions": [
      "Si no tienes ningún Ki disponible, recupera 2 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si no tienes ningún Ki disponible, recupera 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 10
    }
  },
  {
    "id": "tecnica_11_potenciar_tecnica",
    "sourceIndex": 11,
    "name": "Potenciar Técnica",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu próxima carta de Técnica obtiene +2 a uno de sus valores numéricos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Tu próxima carta de Técnica obtiene +2 a uno de sus valores numéricos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 11
    }
  },
  {
    "id": "tecnica_12_liberacion_de_ki",
    "sourceIndex": 12,
    "name": "Liberación de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu próxima carta cuesta 0 Ki, pero después descarta 1 carta.",
    "conditions": [
      "Tu próxima carta cuesta 0 Ki, pero después descarta 1 carta."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "GRATIS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DISCARD",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tu próxima carta cuesta 0 Ki, pero después descarta 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 12
    }
  },
  {
    "id": "tecnica_13_ki_inestable",
    "sourceIndex": 13,
    "name": "Ki Inestable",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Lanza un dado. Si sale 4-6, recupera 4 Ki. Si sale 1-3, pierdes 2 Ki.",
    "conditions": [
      "Si sale 4-6, recupera 4 Ki.",
      "Si sale 1-3, pierdes 2 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "LOSE_KI",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Lanza un dado. Si sale 4-6, recupera 4 Ki. Si sale 1-3, pierdes 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 13
    }
  },
  {
    "id": "tecnica_14_control_absoluto",
    "sourceIndex": 14,
    "name": "Control Absoluto",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Puedes reorganizar todos tus dados actuales y cambiar uno de ellos a 6.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Puedes reorganizar todos tus dados actuales y cambiar uno de ellos a 6."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 14
    }
  },
  {
    "id": "tecnica_15_acumulacion_de_energia",
    "sourceIndex": 15,
    "name": "Acumulación de Energía",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Al final de este turno, guarda 2 Ki para el siguiente turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Al final de este turno, guarda 2 Ki para el siguiente turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 15
    }
  },
  {
    "id": "tecnica_16_carga_forzada",
    "sourceIndex": 16,
    "name": "Carga Forzada",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Pierdes tu próxima acción, pero en tu siguiente turno obtienes +3 Ki.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Pierdes tu próxima acción, pero en tu siguiente turno obtienes +3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 16
    }
  },
  {
    "id": "tecnica_17_lectura_de_ki",
    "sourceIndex": 17,
    "name": "Lectura de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira los dados del rival antes de que los gaste. Después puedes obligarlo a repetir uno.",
    "conditions": [
      "Mira los dados del rival antes de que los gaste."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira los dados del rival antes de que los gaste. Después puedes obligarlo a repetir uno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 17
    }
  },
  {
    "id": "tecnica_18_drenaje_de_ki",
    "sourceIndex": 18,
    "name": "Drenaje de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Pierde 3 Ki disponibles y tú recuperas 2 Ki.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "LOSE_KI",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Pierde 3 Ki disponibles y tú recuperas 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 18
    }
  },
  {
    "id": "tecnica_19_interferencia_energetica",
    "sourceIndex": 19,
    "name": "Interferencia Energética",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un dado de un rival. Su valor se reduce en 2, hasta un mínimo de 1.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un dado de un rival. Su valor se reduce en 2, hasta un mínimo de 1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 19
    }
  },
  {
    "id": "tecnica_20_robo_de_energia",
    "sourceIndex": 20,
    "name": "Robo de Energía",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Toma un dado suyo y utiliza su resultado como si fuera tuyo.",
    "conditions": [
      "Toma un dado suyo y utiliza su resultado como si fuera tuyo."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Toma un dado suyo y utiliza su resultado como si fuera tuyo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 20
    }
  },
  {
    "id": "tecnica_21_ki_compartido",
    "sourceIndex": 21,
    "name": "Ki Compartido",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige otro personaje. Puedes transferirle hasta 3 Ki de los tuyos.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige otro personaje. Puedes transferirle hasta 3 Ki de los tuyos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 21
    }
  },
  {
    "id": "tecnica_22_flujo_perfecto",
    "sourceIndex": 22,
    "name": "Flujo Perfecto",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Durante este turno, la primera carta que juegues cuesta 2 Ki menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Durante este turno, la primera carta que juegues cuesta 2 Ki menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 22
    }
  },
  {
    "id": "tecnica_23_instinto_de_combate",
    "sourceIndex": 23,
    "name": "Instinto de Combate",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el rival tiene más Ki disponible que tú, recupera 3 Ki.",
    "conditions": [
      "Si el rival tiene más Ki disponible que tú, recupera 3 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el rival tiene más Ki disponible que tú, recupera 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 23
    }
  },
  {
    "id": "tecnica_24_sacrificio_de_ki",
    "sourceIndex": 24,
    "name": "Sacrificio de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Pierde hasta 4 Ki. Por cada 2 Ki perdidos, roba 1 carta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Pierde hasta 4 Ki. Por cada 2 Ki perdidos, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 24
    }
  },
  {
    "id": "tecnica_25_control_del_campo",
    "sourceIndex": 25,
    "name": "Control del Campo",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Durante el resto del turno, todos los jugadores deben pagar +1 Ki por sus cartas.",
    "conditions": [],
    "targeting": "ALL",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Durante el resto del turno, todos los jugadores deben pagar +1 Ki por sus cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 25
    }
  },
  {
    "id": "tecnica_26_explosion_de_poder",
    "sourceIndex": 26,
    "name": "Explosión de Poder",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Utiliza todos tus dados restantes. Suma sus resultados y guarda la mitad para el próximo turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Utiliza todos tus dados restantes. Suma sus resultados y guarda la mitad para el próximo turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 26
    }
  },
  {
    "id": "tecnica_27_dominio_energetico",
    "sourceIndex": 27,
    "name": "Dominio Energético",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el final del turno, cuando gastes un dado de 5 o 6, recupera 1 Ki.",
    "conditions": [
      "Hasta el final del turno, cuando gastes un dado de 5 o 6, recupera 1 Ki."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Hasta el final del turno, cuando gastes un dado de 5 o 6, recupera 1 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 27
    }
  },
  {
    "id": "tecnica_28_ultimo_recurso",
    "sourceIndex": 28,
    "name": "Último Recurso",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Puedes gastar 1 carta de tu mano como si tuviera un valor de 3 Ki.",
    "conditions": [
      "Puedes gastar 1 carta de tu mano como si tuviera un valor de 3 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Puedes gastar 1 carta de tu mano como si tuviera un valor de 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 28
    }
  },
  {
    "id": "tecnica_29_multiplicacion_de_ki",
    "sourceIndex": 29,
    "name": "Multiplicación de Ki",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un dado. Durante este turno, su resultado puede utilizarse dos veces.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un dado. Durante este turno, su resultado puede utilizarse dos veces."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 29
    }
  },
  {
    "id": "tecnica_30_poder_desatado",
    "sourceIndex": 30,
    "name": "Poder Desatado",
    "cardType": "TECNICA",
    "sourceType": "Técnica de Ki",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el final del turno, todos tus dados tienen +1, hasta un máximo de 6. Al terminar el turno, pierdes 3 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta el final del turno, todos tus dados tienen +1, hasta un máximo de 6. Al terminar el turno, pierdes 3 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 4,
      "rowIndex": 30
    }
  },
  {
    "id": "habilidad_01_robo_rapido",
    "sourceIndex": 1,
    "name": "Robo Rápido",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Roba 2 cartas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 1
    }
  },
  {
    "id": "habilidad_02_busqueda",
    "sourceIndex": 2,
    "name": "Búsqueda",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Busca una carta de tu mazo, muéstrala y añádela a tu mano. Baraja después.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Busca una carta de tu mazo, muéstrala y añádela a tu mano. Baraja después."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 2
    }
  },
  {
    "id": "habilidad_03_preparacion",
    "sourceIndex": 3,
    "name": "Preparación",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira las 3 primeras cartas de tu mazo. Puedes quedarte 1 y coloca las demás debajo en cualquier orden.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira las 3 primeras cartas de tu mazo. Puedes quedarte 1 y coloca las demás debajo en cualquier orden."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 3
    }
  },
  {
    "id": "habilidad_04_recambio",
    "sourceIndex": 4,
    "name": "Recambio",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Descarta hasta 2 cartas y roba la misma cantidad.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Descarta hasta 2 cartas y roba la misma cantidad."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 4
    }
  },
  {
    "id": "habilidad_05_mano_del_guerrero",
    "sourceIndex": 5,
    "name": "Mano del Guerrero",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Roba 3 cartas y después descarta 1.",
    "conditions": [
      "Roba 3 cartas y después descarta 1."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Roba 3 cartas y después descarta 1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 5
    }
  },
  {
    "id": "habilidad_06_recuperar_tecnica",
    "sourceIndex": 6,
    "name": "Recuperar Técnica",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Devuelve una carta de Técnica de tu descarte a tu mano.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Devuelve una carta de Técnica de tu descarte a tu mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 6
    }
  },
  {
    "id": "habilidad_07_recuperar_ataque",
    "sourceIndex": 7,
    "name": "Recuperar Ataque",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Devuelve una carta de Ataque de tu descarte a tu mano.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Devuelve una carta de Ataque de tu descarte a tu mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 7
    }
  },
  {
    "id": "habilidad_08_recuperar_defensa",
    "sourceIndex": 8,
    "name": "Recuperar Defensa",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Devuelve una carta de Defensa de tu descarte a tu mano.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Devuelve una carta de Defensa de tu descarte a tu mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 8
    }
  },
  {
    "id": "habilidad_09_ultimo_recurso",
    "sourceIndex": 9,
    "name": "Último Recurso",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Devuelve cualquier carta de tu descarte a tu mano. Después, descarta otra carta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Devuelve cualquier carta de tu descarte a tu mano. Después, descarta otra carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 9
    }
  },
  {
    "id": "habilidad_10_intercambio",
    "sourceIndex": 10,
    "name": "Intercambio",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tú y otro jugador elegís 1 carta de vuestra mano y las intercambiáis.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Tú y otro jugador elegís 1 carta de vuestra mano y las intercambiáis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 10
    }
  },
  {
    "id": "habilidad_11_robar_informacion",
    "sourceIndex": 11,
    "name": "Robar Información",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira la mano de un rival. Puedes elegir 1 carta para que la descarte.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira la mano de un rival. Puedes elegir 1 carta para que la descarte."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 11
    }
  },
  {
    "id": "habilidad_12_lectura_del_rival",
    "sourceIndex": 12,
    "name": "Lectura del Rival",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira las 3 primeras cartas del mazo de un rival y vuelve a colocarlas en el orden que quieras.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira las 3 primeras cartas del mazo de un rival y vuelve a colocarlas en el orden que quieras."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 12
    }
  },
  {
    "id": "habilidad_13_engano",
    "sourceIndex": 13,
    "name": "Engaño",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige una carta de tu mano. Hasta que termine tu próxima acción, puedes ocultar su coste real al rival.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_ACTION",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige una carta de tu mano. Hasta que termine tu próxima acción, puedes ocultar su coste real al rival."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 13
    }
  },
  {
    "id": "habilidad_14_cancelar_tecnica",
    "sourceIndex": 14,
    "name": "Cancelar Técnica",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cancela una carta de Técnica que acaba de jugar un rival. Su coste se pierde.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cancela una carta de Técnica que acaba de jugar un rival. Su coste se pierde."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 14
    }
  },
  {
    "id": "habilidad_15_romper_defensa",
    "sourceIndex": 15,
    "name": "Romper Defensa",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elimina una carta de Defensa o efecto defensivo activo de un rival.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elimina una carta de Defensa o efecto defensivo activo de un rival."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 15
    }
  },
  {
    "id": "habilidad_16_interrupcion",
    "sourceIndex": 16,
    "name": "Interrupción",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival juegue una carta que robe cartas, anula el robo.",
    "conditions": [
      "Cuando un rival juegue una carta que robe cartas, anula el robo."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival juegue una carta que robe cartas, anula el robo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 16
    }
  },
  {
    "id": "habilidad_17_cambio_de_objetivo",
    "sourceIndex": 17,
    "name": "Cambio de Objetivo",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cambia el objetivo de una carta que acaba de jugar un rival a otro objetivo legal.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cambia el objetivo de una carta que acaba de jugar un rival a otro objetivo legal."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 17
    }
  },
  {
    "id": "habilidad_18_provocacion",
    "sourceIndex": 18,
    "name": "Provocación",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el comienzo de tu próximo turno, el rival elegido debe seleccionarte como objetivo cuando sea posible.",
    "conditions": [
      "Hasta el comienzo de tu próximo turno, el rival elegido debe seleccionarte como objetivo cuando sea posible."
    ],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta el comienzo de tu próximo turno, el rival elegido debe seleccionarte como objetivo cuando sea posible."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 18
    }
  },
  {
    "id": "habilidad_19_desafio",
    "sourceIndex": 19,
    "name": "Desafío",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Durante este turno, si ese rival te inflige daño, puedes robar 2 cartas.",
    "conditions": [
      "Durante este turno, si ese rival te inflige daño, puedes robar 2 cartas."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Durante este turno, si ese rival te inflige daño, puedes robar 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 19
    }
  },
  {
    "id": "habilidad_20_intercambio_de_golpes",
    "sourceIndex": 20,
    "name": "Intercambio de Golpes",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tú y otro jugador reciben 3 de daño. Después, ambos roban 1 carta.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tú y otro jugador reciben 3 de daño. Después, ambos roban 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 20
    }
  },
  {
    "id": "habilidad_21_segundo_movimiento",
    "sourceIndex": 21,
    "name": "Segundo Movimiento",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de resolver esta carta, puedes realizar una acción adicional este turno.",
    "conditions": [
      "Después de resolver esta carta, puedes realizar una acción adicional este turno."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "EXTRA_ACTION",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de resolver esta carta, puedes realizar una acción adicional este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 21
    }
  },
  {
    "id": "habilidad_22_cambio_de_ritmo",
    "sourceIndex": 22,
    "name": "Cambio de Ritmo",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Termina inmediatamente tu acción actual. El jugador que tenga menos vida realiza la siguiente acción.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_ACTION",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Termina inmediatamente tu acción actual. El jugador que tenga menos vida realiza la siguiente acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 22
    }
  },
  {
    "id": "habilidad_23_aprovechar_la_apertura",
    "sourceIndex": 23,
    "name": "Aprovechar la Apertura",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si un rival tiene una defensa, estado o efecto negativo activo, roba 2 cartas.",
    "conditions": [
      "Si un rival tiene una defensa, estado o efecto negativo activo, roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ESTADO",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si un rival tiene una defensa, estado o efecto negativo activo, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 23
    }
  },
  {
    "id": "habilidad_24_presion_constante",
    "sourceIndex": 24,
    "name": "Presión Constante",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el final del turno, cada vez que un rival descarte una carta, pierde 1 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta el final del turno, cada vez que un rival descarte una carta, pierde 1 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 24
    }
  },
  {
    "id": "habilidad_25_voluntad_inquebrantable",
    "sourceIndex": 25,
    "name": "Voluntad Inquebrantable",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elimina un estado negativo de tu personaje. Si no tienes ninguno, roba 2 cartas.",
    "conditions": [
      "Si no tienes ninguno, roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ESTADO",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Elimina un estado negativo de tu personaje. Si no tienes ninguno, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 25
    }
  },
  {
    "id": "habilidad_26_adaptacion",
    "sourceIndex": 26,
    "name": "Adaptación",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un tipo de carta. La próxima carta de ese tipo que juegues este turno cuesta 2 Ki menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un tipo de carta. La próxima carta de ese tipo que juegues este turno cuesta 2 Ki menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 26
    }
  },
  {
    "id": "habilidad_27_imitacion",
    "sourceIndex": 27,
    "name": "Imitación",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Copia el efecto de una carta que otro jugador haya jugado este turno. Debes pagar su coste.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Copia el efecto de una carta que otro jugador haya jugado este turno. Debes pagar su coste."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 27
    }
  },
  {
    "id": "habilidad_28_maestria",
    "sourceIndex": 28,
    "name": "Maestría",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige una carta de tu mano. Puedes jugarla pagando 2 Ki menos, pero no puedes jugar otra carta del mismo tipo este turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige una carta de tu mano. Puedes jugarla pagando 2 Ki menos, pero no puedes jugar otra carta del mismo tipo este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 28
    }
  },
  {
    "id": "habilidad_29_instinto_de_supervivencia",
    "sourceIndex": 29,
    "name": "Instinto de Supervivencia",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes menos vida que todos los demás jugadores, roba 3 cartas.",
    "conditions": [
      "Si tienes menos vida que todos los demás jugadores, roba 3 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes menos vida que todos los demás jugadores, roba 3 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 29
    }
  },
  {
    "id": "habilidad_30_genio_del_combate",
    "sourceIndex": 30,
    "name": "Genio del Combate",
    "cardType": "HABILIDAD",
    "sourceType": "Habilidad",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Roba 4 cartas. Después puedes jugar inmediatamente una carta de coste 3 o menos sin pagar su coste.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Roba 4 cartas. Después puedes jugar inmediatamente una carta de coste 3 o menos sin pagar su coste."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 5,
      "rowIndex": 30
    }
  },
  {
    "id": "combo_01_cadena_de_golpes",
    "sourceIndex": 1,
    "name": "Cadena de Golpes",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has realizado 2 ataques consecutivos, juega esta carta gratis. Inflige 6 de daño.",
    "conditions": [
      "Si has realizado 2 ataques consecutivos, juega esta carta gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has realizado 2 ataques consecutivos, juega esta carta gratis. Inflige 6 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 1
    }
  },
  {
    "id": "combo_02_combo_de_tres_golpes",
    "sourceIndex": 2,
    "name": "Combo de Tres Golpes",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has realizado 3 ataques consecutivos, juega gratis. Inflige 9 de daño.",
    "conditions": [
      "Si has realizado 3 ataques consecutivos, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 9,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has realizado 3 ataques consecutivos, juega gratis. Inflige 9 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 2
    }
  },
  {
    "id": "combo_03_golpe_final",
    "sourceIndex": 3,
    "name": "Golpe Final",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has realizado un ataque físico y después un ataque de Ki, juega gratis. Inflige 7 de daño.",
    "conditions": [
      "Si has realizado un ataque físico y después un ataque de Ki, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has realizado un ataque físico y después un ataque de Ki, juega gratis. Inflige 7 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 3
    }
  },
  {
    "id": "combo_04_puno_ki",
    "sourceIndex": 4,
    "name": "Puño -> Ki",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de un ataque físico que haya infligido daño, juega gratis. Inflige 4 de daño.",
    "conditions": [
      "Después de un ataque físico que haya infligido daño, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de un ataque físico que haya infligido daño, juega gratis. Inflige 4 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 4
    }
  },
  {
    "id": "combo_05_ki_puno",
    "sourceIndex": 5,
    "name": "Ki -> Puño",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de un ataque de Ki que haya infligido daño, juega gratis. Inflige 5 de daño físico.",
    "conditions": [
      "Después de un ataque de Ki que haya infligido daño, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de un ataque de Ki que haya infligido daño, juega gratis. Inflige 5 de daño físico."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 5
    }
  },
  {
    "id": "combo_06_tormenta_de_golpes",
    "sourceIndex": 6,
    "name": "Tormenta de Golpes",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado 3 cartas de Ataque este turno, inflige 8 de daño.",
    "conditions": [
      "Si has jugado 3 cartas de Ataque este turno, inflige 8 de daño."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado 3 cartas de Ataque este turno, inflige 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 6
    }
  },
  {
    "id": "combo_07_asalto_imparable",
    "sourceIndex": 7,
    "name": "Asalto Imparable",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has realizado 4 ataques durante esta partida sin fallar ninguno, inflige 12 de daño gratis.",
    "conditions": [
      "Si has realizado 4 ataques durante esta partida sin fallar ninguno, inflige 12 de daño gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 12,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has realizado 4 ataques durante esta partida sin fallar ninguno, inflige 12 de daño gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 7
    }
  },
  {
    "id": "combo_08_contraataque_perfecto",
    "sourceIndex": 8,
    "name": "Contraataque Perfecto",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado una Defensa contra el último ataque recibido, esta carta cuesta 0 e inflige 7 de daño.",
    "conditions": [
      "Si has jugado una Defensa contra el último ataque recibido, esta carta cuesta 0 e inflige 7 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado una Defensa contra el último ataque recibido, esta carta cuesta 0 e inflige 7 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 8
    }
  },
  {
    "id": "combo_09_defensa_ataque",
    "sourceIndex": 9,
    "name": "Defensa -> Ataque",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de jugar una Defensa, tu siguiente ataque cuesta 2 menos y obtiene +2 de daño.",
    "conditions": [
      "Después de jugar una Defensa, tu siguiente ataque cuesta 2 menos y obtiene +2 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Después de jugar una Defensa, tu siguiente ataque cuesta 2 menos y obtiene +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 9
    }
  },
  {
    "id": "combo_10_esquiva_golpe",
    "sourceIndex": 10,
    "name": "Esquiva -> Golpe",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has evitado completamente un ataque este turno, juega gratis. Inflige 6 de daño.",
    "conditions": [
      "Si has evitado completamente un ataque este turno, juega gratis."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has evitado completamente un ataque este turno, juega gratis. Inflige 6 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 10
    }
  },
  {
    "id": "combo_11_combo_ascendente",
    "sourceIndex": 11,
    "name": "Combo Ascendente",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has infligido daño con 3 tipos diferentes de Ataque, inflige 10 de daño.",
    "conditions": [
      "Si has infligido daño con 3 tipos diferentes de Ataque, inflige 10 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has infligido daño con 3 tipos diferentes de Ataque, inflige 10 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 11
    }
  },
  {
    "id": "combo_12_golpe_incesante",
    "sourceIndex": 12,
    "name": "Golpe Incesante",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tu ataque anterior infligió daño, inflige 6 de daño. Si también el anterior infligió daño, inflige 9 en su lugar.",
    "conditions": [
      "Si tu ataque anterior infligió daño, inflige 6 de daño.",
      "Si también el anterior infligió daño, inflige 9 en su lugar."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tu ataque anterior infligió daño, inflige 6 de daño. Si también el anterior infligió daño, inflige 9 en su lugar."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 12
    }
  },
  {
    "id": "combo_13_doble_impacto",
    "sourceIndex": 13,
    "name": "Doble Impacto",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has atacado dos veces este turno, inflige 5 de daño dos veces.",
    "conditions": [
      "Si has atacado dos veces este turno, inflige 5 de daño dos veces."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has atacado dos veces este turno, inflige 5 de daño dos veces."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 13
    }
  },
  {
    "id": "combo_14_triple_impacto",
    "sourceIndex": 14,
    "name": "Triple Impacto",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has atacado tres veces este turno, inflige 4 de daño tres veces.",
    "conditions": [
      "Si has atacado tres veces este turno, inflige 4 de daño tres veces."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has atacado tres veces este turno, inflige 4 de daño tres veces."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 14
    }
  },
  {
    "id": "combo_15_combo_brutal",
    "sourceIndex": 15,
    "name": "Combo Brutal",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el rival tiene menos vida que tú, juega gratis después de infligir daño. Inflige 8 de daño.",
    "conditions": [
      "Si el rival tiene menos vida que tú, juega gratis después de infligir daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el rival tiene menos vida que tú, juega gratis después de infligir daño. Inflige 8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 15
    }
  },
  {
    "id": "combo_16_combo_desesperado",
    "sourceIndex": 16,
    "name": "Combo Desesperado",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes 5 o menos de vida, después de recibir daño puedes jugar esta carta gratis. Inflige 7 de daño.",
    "conditions": [
      "Si tienes 5 o menos de vida, después de recibir daño puedes jugar esta carta gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes 5 o menos de vida, después de recibir daño puedes jugar esta carta gratis. Inflige 7 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 16
    }
  },
  {
    "id": "combo_17_venganza",
    "sourceIndex": 17,
    "name": "Venganza",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el rival te infligió daño durante su última acción, tu próximo ataque puede activar esta carta gratis. Inflige 6 de daño.",
    "conditions": [
      "Si el rival te infligió daño durante su última acción, tu próximo ataque puede activar esta carta gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el rival te infligió daño durante su última acción, tu próximo ataque puede activar esta carta gratis. Inflige 6 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 17
    }
  },
  {
    "id": "combo_18_combo_de_ki",
    "sourceIndex": 18,
    "name": "Combo de Ki",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has gastado 3 o más dados este turno, juega gratis. Inflige 7 de daño.",
    "conditions": [
      "Si has gastado 3 o más dados este turno, juega gratis."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has gastado 3 o más dados este turno, juega gratis. Inflige 7 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 18
    }
  },
  {
    "id": "combo_19_flujo_de_energia",
    "sourceIndex": 19,
    "name": "Flujo de Energía",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado dos Técnicas este turno, recupera 3 Ki y roba 2 cartas.",
    "conditions": [
      "Si has jugado dos Técnicas este turno, recupera 3 Ki y roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado dos Técnicas este turno, recupera 3 Ki y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 19
    }
  },
  {
    "id": "combo_20_cadena_perfecta",
    "sourceIndex": 20,
    "name": "Cadena Perfecta",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado Ataque -> Técnica -> Ataque consecutivamente, juega gratis. Inflige 10 de daño.",
    "conditions": [
      "Si has jugado Ataque -> Técnica -> Ataque consecutivamente, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado Ataque -> Técnica -> Ataque consecutivamente, juega gratis. Inflige 10 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 20
    }
  },
  {
    "id": "combo_21_rompeguardia",
    "sourceIndex": 21,
    "name": "Rompeguardia",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el rival utilizó una Defensa contra tu ataque anterior, juega gratis. Inflige 8 de daño e ignora 3 de defensa.",
    "conditions": [
      "Si el rival utilizó una Defensa contra tu ataque anterior, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el rival utilizó una Defensa contra tu ataque anterior, juega gratis. Inflige 8 de daño e ignora 3 de defensa."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 21
    }
  },
  {
    "id": "combo_22_ataque_encadenado",
    "sourceIndex": 22,
    "name": "Ataque Encadenado",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de infligir daño con un ataque, tu próximo ataque cuesta 2 menos. Si ese ataque también inflige daño, roba 1 carta.",
    "conditions": [
      "Después de infligir daño con un ataque, tu próximo ataque cuesta 2 menos.",
      "Si ese ataque también inflige daño, roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de infligir daño con un ataque, tu próximo ataque cuesta 2 menos. Si ese ataque también inflige daño, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 22
    }
  },
  {
    "id": "combo_23_combo_devastador",
    "sourceIndex": 23,
    "name": "Combo Devastador",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has infligido al menos 10 de daño este turno, inflige 8 de daño adicionales gratis.",
    "conditions": [
      "Si has infligido al menos 10 de daño este turno, inflige 8 de daño adicionales gratis."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has infligido al menos 10 de daño este turno, inflige 8 de daño adicionales gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 23
    }
  },
  {
    "id": "combo_24_persecucion",
    "sourceIndex": 24,
    "name": "Persecución",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el rival tiene 5 o menos de vida, después de infligirle daño puedes jugar esta carta gratis. Inflige 5 de daño.",
    "conditions": [
      "Si el rival tiene 5 o menos de vida, después de infligirle daño puedes jugar esta carta gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si el rival tiene 5 o menos de vida, después de infligirle daño puedes jugar esta carta gratis. Inflige 5 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 24
    }
  },
  {
    "id": "combo_25_combo_multitudinario",
    "sourceIndex": 25,
    "name": "Combo Multitudinario",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "En Battle Royale: si has atacado a dos jugadores diferentes este turno, inflige 6 de daño a un tercer objetivo.",
    "conditions": [
      "En Battle Royale: si has atacado a dos jugadores diferentes este turno, inflige 6 de daño a un tercer objetivo."
    ],
    "targeting": "TARGET",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "En Battle Royale: si has atacado a dos jugadores diferentes este turno, inflige 6 de daño a un tercer objetivo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 25
    }
  },
  {
    "id": "combo_26_todos_contra_uno",
    "sourceIndex": 26,
    "name": "Todos Contra Uno",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si otro jugador ha atacado al mismo objetivo durante este turno, inflige 8 de daño gratis.",
    "conditions": [
      "Si otro jugador ha atacado al mismo objetivo durante este turno, inflige 8 de daño gratis."
    ],
    "targeting": "OTHER",
    "duration": "TURN",
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si otro jugador ha atacado al mismo objetivo durante este turno, inflige 8 de daño gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 26
    }
  },
  {
    "id": "combo_27_vinculo_de_combate",
    "sourceIndex": 27,
    "name": "Vínculo de Combate",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si un aliado te ha ayudado este turno, tu siguiente ataque inflige +4 de daño y roba 1 carta.",
    "conditions": [
      "Si un aliado te ha ayudado este turno, tu siguiente ataque inflige +4 de daño y roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "DADOS",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si un aliado te ha ayudado este turno, tu siguiente ataque inflige +4 de daño y roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 27
    }
  },
  {
    "id": "combo_28_combo_de_supervivencia",
    "sourceIndex": 28,
    "name": "Combo de Supervivencia",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si comenzaste el turno con 5 o menos de vida y sigues vivo, juega gratis. Recupera 5 de vida y roba 2 cartas.",
    "conditions": [
      "Si comenzaste el turno con 5 o menos de vida y sigues vivo, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "GRATIS",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si comenzaste el turno con 5 o menos de vida y sigues vivo, juega gratis. Recupera 5 de vida y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 28
    }
  },
  {
    "id": "combo_29_combo_infinito",
    "sourceIndex": 29,
    "name": "Combo Infinito",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 7,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado 4 cartas diferentes este turno, puedes jugar esta carta gratis. Realiza una acción adicional inmediatamente.",
    "conditions": [
      "Si has jugado 4 cartas diferentes este turno, puedes jugar esta carta gratis."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "EXTRA_ACTION",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado 4 cartas diferentes este turno, puedes jugar esta carta gratis. Realiza una acción adicional inmediatamente."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 29
    }
  },
  {
    "id": "combo_30_cadena_del_guerrero",
    "sourceIndex": 30,
    "name": "Cadena del Guerrero",
    "cardType": "COMBO",
    "sourceType": "Combo",
    "cost": 8,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has realizado 5 acciones consecutivas sin pasar, juega gratis. Inflige 12 de daño, roba 2 cartas y recupera 3 Ki.",
    "conditions": [
      "Si has realizado 5 acciones consecutivas sin pasar, juega gratis."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "COMBO",
      "GRATIS",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 12,
        "target": "TARGET"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has realizado 5 acciones consecutivas sin pasar, juega gratis. Inflige 12 de daño, roba 2 cartas y recupera 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 6,
      "rowIndex": 30
    }
  },
  {
    "id": "mision_01_entrenamiento_intenso",
    "sourceIndex": 1,
    "name": "Entrenamiento Intenso",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: realiza 3 ataques durante la partida. Recompensa: roba 2 cartas y recupera 2 Ki.",
    "conditions": [
      "Objetivo: realiza 3 ataques durante la partida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: realiza 3 ataques durante la partida. Recompensa: roba 2 cartas y recupera 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 1
    }
  },
  {
    "id": "mision_02_supervivencia",
    "sourceIndex": 2,
    "name": "Supervivencia",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: sobrevive 3 turnos. Recompensa: recupera 8 de vida.",
    "conditions": [
      "Objetivo: sobrevive 3 turnos."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: sobrevive 3 turnos. Recompensa: recupera 8 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 2
    }
  },
  {
    "id": "mision_03_sin_rendirse",
    "sourceIndex": 3,
    "name": "Sin Rendirse",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: sobrevive a un ataque teniendo 3 o menos de vida. Recompensa: recupera 6 de vida y roba 1 carta.",
    "conditions": [
      "Objetivo: sobrevive a un ataque teniendo 3 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: sobrevive a un ataque teniendo 3 o menos de vida. Recompensa: recupera 6 de vida y roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 3
    }
  },
  {
    "id": "mision_04_cadena_de_combate",
    "sourceIndex": 4,
    "name": "Cadena de Combate",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: realiza 3 ataques consecutivos. Recompensa: tu siguiente Ataque cuesta 0.",
    "conditions": [
      "Objetivo: realiza 3 ataques consecutivos."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: realiza 3 ataques consecutivos. Recompensa: tu siguiente Ataque cuesta 0."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 4
    }
  },
  {
    "id": "mision_05_maestro_del_ki",
    "sourceIndex": 5,
    "name": "Maestro del Ki",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: utiliza 5 dados durante la partida. Recompensa: recupera 4 Ki.",
    "conditions": [
      "Objetivo: utiliza 5 dados durante la partida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "DADOS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 4,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: utiliza 5 dados durante la partida. Recompensa: recupera 4 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 5
    }
  },
  {
    "id": "mision_06_golpe_perfecto",
    "sourceIndex": 6,
    "name": "Golpe Perfecto",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige 8 o más de daño con un solo ataque. Recompensa: roba 2 cartas.",
    "conditions": [
      "Objetivo: inflige 8 o más de daño con un solo ataque."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige 8 o más de daño con un solo ataque. Recompensa: roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 6
    }
  },
  {
    "id": "mision_07_defensa_impecable",
    "sourceIndex": 7,
    "name": "Defensa Impecable",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: evita completamente 2 ataques. Recompensa: recupera 5 de vida.",
    "conditions": [
      "Objetivo: evita completamente 2 ataques."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: evita completamente 2 ataques. Recompensa: recupera 5 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 7
    }
  },
  {
    "id": "mision_08_contraataque",
    "sourceIndex": 8,
    "name": "Contraataque",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige daño al rival inmediatamente después de defenderte 2 veces. Recompensa: tu próximo ataque inflige +5 de daño.",
    "conditions": [
      "Objetivo: inflige daño al rival inmediatamente después de defenderte 2 veces."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige daño al rival inmediatamente después de defenderte 2 veces. Recompensa: tu próximo ataque inflige +5 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 8
    }
  },
  {
    "id": "mision_09_adaptacion",
    "sourceIndex": 9,
    "name": "Adaptación",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: juega una carta de 4 tipos diferentes. Recompensa: recupera 3 Ki y roba 2 cartas.",
    "conditions": [
      "Objetivo: juega una carta de 4 tipos diferentes."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: juega una carta de 4 tipos diferentes. Recompensa: recupera 3 Ki y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 9
    }
  },
  {
    "id": "mision_10_sin_descanso",
    "sourceIndex": 10,
    "name": "Sin Descanso",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: realiza una acción durante 4 turnos consecutivos sin pasar. Recompensa: realiza una acción adicional inmediatamente.",
    "conditions": [
      "Objetivo: realiza una acción durante 4 turnos consecutivos sin pasar."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO"
    ],
    "structuredEffects": [
      {
        "type": "EXTRA_ACTION",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: realiza una acción durante 4 turnos consecutivos sin pasar. Recompensa: realiza una acción adicional inmediatamente."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 10
    }
  },
  {
    "id": "mision_11_guerrero_herido",
    "sourceIndex": 11,
    "name": "Guerrero Herido",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige 10 de daño mientras tengas 5 o menos de vida. Recompensa: recupera 10 de vida.",
    "conditions": [
      "Objetivo: inflige 10 de daño mientras tengas 5 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige 10 de daño mientras tengas 5 o menos de vida. Recompensa: recupera 10 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 11
    }
  },
  {
    "id": "mision_12_dominio_del_combate",
    "sourceIndex": 12,
    "name": "Dominio del Combate",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige daño con 3 tipos diferentes de Ataque. Recompensa: tu próximo Ataque cuesta 0 y hace +3 de daño.",
    "conditions": [
      "Objetivo: inflige daño con 3 tipos diferentes de Ataque."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige daño con 3 tipos diferentes de Ataque. Recompensa: tu próximo Ataque cuesta 0 y hace +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 12
    }
  },
  {
    "id": "mision_13_acumulacion_de_poder",
    "sourceIndex": 13,
    "name": "Acumulación de Poder",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: termina un turno sin gastar al menos 2 de tus dados. Recompensa: obtienes +2 Ki en tu próximo turno.",
    "conditions": [
      "Objetivo: termina un turno sin gastar al menos 2 de tus dados."
    ],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: termina un turno sin gastar al menos 2 de tus dados. Recompensa: obtienes +2 Ki en tu próximo turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 13
    }
  },
  {
    "id": "mision_14_golpe_decisivo",
    "sourceIndex": 14,
    "name": "Golpe Decisivo",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: reduce a un enemigo a 5 o menos de vida. Recompensa: roba 3 cartas.",
    "conditions": [
      "Objetivo: reduce a un enemigo a 5 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: reduce a un enemigo a 5 o menos de vida. Recompensa: roba 3 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 14
    }
  },
  {
    "id": "mision_15_cazador",
    "sourceIndex": 15,
    "name": "Cazador",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: sé el jugador que inflija el golpe final a un enemigo. Recompensa: recupera hasta 8 de vida perdida.",
    "conditions": [
      "Objetivo: sé el jugador que inflija el golpe final a un enemigo."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: sé el jugador que inflija el golpe final a un enemigo. Recompensa: recupera hasta 8 de vida perdida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 15
    }
  },
  {
    "id": "mision_16_rivalidad",
    "sourceIndex": 16,
    "name": "Rivalidad",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige daño al mismo personaje durante 3 turnos consecutivos. Recompensa: inflige 7 de daño gratis.",
    "conditions": [
      "Objetivo: inflige daño al mismo personaje durante 3 turnos consecutivos."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige daño al mismo personaje durante 3 turnos consecutivos. Recompensa: inflige 7 de daño gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 16
    }
  },
  {
    "id": "mision_17_venganza",
    "sourceIndex": 17,
    "name": "Venganza",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: después de recibir daño, inflige más daño del que recibiste. Recompensa: roba 2 cartas y recupera 2 Ki.",
    "conditions": [
      "Objetivo: después de recibir daño, inflige más daño del que recibiste."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: después de recibir daño, inflige más daño del que recibiste. Recompensa: roba 2 cartas y recupera 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 17
    }
  },
  {
    "id": "mision_18_poder_desesperado",
    "sourceIndex": 18,
    "name": "Poder Desesperado",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: juega una carta mientras tengas 3 o menos de vida. Recompensa: esa carta cuesta 0 y roba 2 cartas.",
    "conditions": [
      "Objetivo: juega una carta mientras tengas 3 o menos de vida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "GRATIS",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: juega una carta mientras tengas 3 o menos de vida. Recompensa: esa carta cuesta 0 y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 18
    }
  },
  {
    "id": "mision_19_sin_miedo",
    "sourceIndex": 19,
    "name": "Sin Miedo",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: recibe al menos 15 de daño durante la partida y sobrevive. Recompensa: recupera 10 de vida.",
    "conditions": [
      "Objetivo: recibe al menos 15 de daño durante la partida y sobrevive."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: recibe al menos 15 de daño durante la partida y sobrevive. Recompensa: recupera 10 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 19
    }
  },
  {
    "id": "mision_20_combo_de_ki",
    "sourceIndex": 20,
    "name": "Combo de Ki",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: juega 3 Técnicas de Ki durante la partida. Recompensa: tu próxima Técnica cuesta 0 y obtienes +2 Ki.",
    "conditions": [
      "Objetivo: juega 3 Técnicas de Ki durante la partida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "GRATIS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: juega 3 Técnicas de Ki durante la partida. Recompensa: tu próxima Técnica cuesta 0 y obtienes +2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 20
    }
  },
  {
    "id": "mision_21_coleccionista",
    "sourceIndex": 21,
    "name": "Coleccionista",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: ten 7 o más cartas en tu mano. Recompensa: roba 3 cartas y recupera 3 Ki.",
    "conditions": [
      "Objetivo: ten 7 o más cartas en tu mano."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: ten 7 o más cartas en tu mano. Recompensa: roba 3 cartas y recupera 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 21
    }
  },
  {
    "id": "mision_22_maestro_de_la_defensa",
    "sourceIndex": 22,
    "name": "Maestro de la Defensa",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: reduce al menos 15 de daño mediante cartas de Defensa. Recompensa: tu siguiente Defensa se juega gratis.",
    "conditions": [
      "Objetivo: reduce al menos 15 de daño mediante cartas de Defensa."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: reduce al menos 15 de daño mediante cartas de Defensa. Recompensa: tu siguiente Defensa se juega gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 22
    }
  },
  {
    "id": "mision_23_golpe_tras_golpe",
    "sourceIndex": 23,
    "name": "Golpe Tras Golpe",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: inflige daño en 5 acciones consecutivas. Recompensa: inflige 10 de daño gratis.",
    "conditions": [
      "Objetivo: inflige daño en 5 acciones consecutivas."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO",
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: inflige daño en 5 acciones consecutivas. Recompensa: inflige 10 de daño gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 23
    }
  },
  {
    "id": "mision_24_batalla_campal",
    "sourceIndex": 24,
    "name": "Batalla Campal",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: en Battle Royale, inflige daño a 3 jugadores diferentes. Recompensa: roba 3 cartas y recupera 5 de vida.",
    "conditions": [
      "Objetivo: en Battle Royale, inflige daño a 3 jugadores diferentes."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: en Battle Royale, inflige daño a 3 jugadores diferentes. Recompensa: roba 3 cartas y recupera 5 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 24
    }
  },
  {
    "id": "mision_25_el_ultimo_guerrero",
    "sourceIndex": 25,
    "name": "El Último Guerrero",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: en Battle Royale, sobrevive mientras 2 o más jugadores sean eliminados. Recompensa: recupera 10 de vida y 5 Ki.",
    "conditions": [
      "Objetivo: en Battle Royale, sobrevive mientras 2 o más jugadores sean eliminados."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: en Battle Royale, sobrevive mientras 2 o más jugadores sean eliminados. Recompensa: recupera 10 de vida y 5 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 25
    }
  },
  {
    "id": "mision_26_enemigo_jurado",
    "sourceIndex": 26,
    "name": "Enemigo Jurado",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: enfrentándote a un NPC, inflígele 20 de daño. Recompensa: obtén una recompensa adicional del encuentro.",
    "conditions": [
      "Objetivo: enfrentándote a un NPC, inflígele 20 de daño."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: enfrentándote a un NPC, inflígele 20 de daño. Recompensa: obtén una recompensa adicional del encuentro."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 26
    }
  },
  {
    "id": "mision_27_derrota_al_jefe",
    "sourceIndex": 27,
    "name": "Derrota al Jefe",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: en roguelike, derrota a un NPC jefe sin ser derrotado. Recompensa: obtén 2 recompensas en lugar de 1.",
    "conditions": [
      "Objetivo: en roguelike, derrota a un NPC jefe sin ser derrotado."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: en roguelike, derrota a un NPC jefe sin ser derrotado. Recompensa: obtén 2 recompensas en lugar de 1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 27
    }
  },
  {
    "id": "mision_28_superar_el_desafio",
    "sourceIndex": 28,
    "name": "Superar el Desafío",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: derrota a un enemigo con 10 o menos de vida máxima restante. Recompensa: recupera toda tu vida y roba 2 cartas.",
    "conditions": [
      "Objetivo: derrota a un enemigo con 10 o menos de vida máxima restante."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: derrota a un enemigo con 10 o menos de vida máxima restante. Recompensa: recupera toda tu vida y roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 28
    }
  },
  {
    "id": "mision_29_sin_utilizar_curacion",
    "sourceIndex": 29,
    "name": "Sin Utilizar Curación",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: completa 2 turnos consecutivos sin recuperar vida. Recompensa: tu siguiente ataque hace +8 de daño.",
    "conditions": [
      "Objetivo: completa 2 turnos consecutivos sin recuperar vida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: completa 2 turnos consecutivos sin recuperar vida. Recompensa: tu siguiente ataque hace +8 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 29
    }
  },
  {
    "id": "mision_30_leyenda_del_guerrero",
    "sourceIndex": 30,
    "name": "Leyenda del Guerrero",
    "cardType": "MISION",
    "sourceType": "Misión",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Objetivo: completa 5 misiones durante la partida. Recompensa: recupera 10 de vida, 5 Ki, roba 3 cartas y juega tu siguiente carta gratis.",
    "conditions": [
      "Objetivo: completa 5 misiones durante la partida."
    ],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION",
      "GRATIS",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 10,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "MISION",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Objetivo: completa 5 misiones durante la partida. Recompensa: recupera 10 de vida, 5 Ki, roba 3 cartas y juega tu siguiente carta gratis."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 7,
      "rowIndex": 30
    }
  },
  {
    "id": "saga_01_llegada_de_los_saiyan",
    "sourceIndex": 1,
    "name": "Llegada de los Saiyan",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Turno 1: ataques físicos +1 de daño. Turno 2: todos roban 1 carta. Turno 3: ataques físicos +2 de daño. Turno 4: descarta esta Saga.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Turno 1: ataques físicos +1 de daño. Turno 2: todos roban 1 carta. Turno 3: ataques físicos +2 de daño. Turno 4: descarta esta Saga."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 1
    }
  },
  {
    "id": "saga_02_invasion_de_namek",
    "sourceIndex": 2,
    "name": "Invasión de Namek",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: las cartas Namek recuperan +2 de vida. T2: cada jugador roba 1. T3: ataques de Ki cuestan +1. T4: descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: las cartas Namek recuperan +2 de vida. T2: cada jugador roba 1. T3: ataques de Ki cuestan +1. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 2
    }
  },
  {
    "id": "saga_03_conquista_de_freezer",
    "sourceIndex": 3,
    "name": "Conquista de Freezer",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: cada jugador pierde 1 de vida. T2: ataques de Ki +2 de daño. T3: cada jugador descarta 1. T4: el jugador con más vida pierde 3; descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: cada jugador pierde 1 de vida. T2: ataques de Ki +2 de daño. T3: cada jugador descarta 1. T4: el jugador con más vida pierde 3; descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 3
    }
  },
  {
    "id": "saga_04_entrenamiento_extremo",
    "sourceIndex": 4,
    "name": "Entrenamiento Extremo",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: primer Ataque de cada jugador cuesta 1 menos. T2: primera Defensa cuesta 1 menos. T3: Técnicas de Ki cuestan 1 menos. T4: descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: primer Ataque de cada jugador cuesta 1 menos. T2: primera Defensa cuesta 1 menos. T3: Técnicas de Ki cuestan 1 menos. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 4
    }
  },
  {
    "id": "saga_05_torneo_mundial",
    "sourceIndex": 5,
    "name": "Torneo Mundial",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: los ataques no pueden afectar a jugadores que no sean su objetivo. T2: físicos +1 de daño. T3: cada jugador recupera 2 de vida. T4: descarta.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "MULTI_TURN",
    "keywords": [
      "CURACION",
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: los ataques no pueden afectar a jugadores que no sean su objetivo. T2: físicos +1 de daño. T3: cada jugador recupera 2 de vida. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 5
    }
  },
  {
    "id": "saga_06_batalla_por_namek",
    "sourceIndex": 6,
    "name": "Batalla por Namek",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: los Namek recuperan 2 de vida al comienzo del turno. T2: ataques de Ki +1 daño. T3: todos roban 1. T4: todos pierden 2; descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: los Namek recuperan 2 de vida al comienzo del turno. T2: ataques de Ki +1 daño. T3: todos roban 1. T4: todos pierden 2; descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 6
    }
  },
  {
    "id": "saga_07_la_amenaza_artificial",
    "sourceIndex": 7,
    "name": "La Amenaza Artificial",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: primera carta de cada jugador cuesta +1. T2: Habilidades cuestan 1 menos. T3: cada jugador descarta 1. T4: todos pierden 3.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: primera carta de cada jugador cuesta +1. T2: Habilidades cuestan 1 menos. T3: cada jugador descarta 1. T4: todos pierden 3."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 7
    }
  },
  {
    "id": "saga_08_guerra_de_guerreros",
    "sourceIndex": 8,
    "name": "Guerra de Guerreros",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: primer ataque de cada jugador +2 de daño. T2: segundo ataque +2. T3: tercer ataque +3. T4: descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: primer ataque de cada jugador +2 de daño. T2: segundo ataque +2. T3: tercer ataque +3. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 8
    }
  },
  {
    "id": "saga_09_ascenso_del_guerrero",
    "sourceIndex": 9,
    "name": "Ascenso del Guerrero",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: jugador con menos vida recupera 3. T2: ese jugador obtiene +2 Ki. T3: roba 2 cartas. T4: descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: jugador con menos vida recupera 3. T2: ese jugador obtiene +2 Ki. T3: roba 2 cartas. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 9
    }
  },
  {
    "id": "saga_10_planeta_en_peligro",
    "sourceIndex": 10,
    "name": "Planeta en Peligro",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: todos pierden 1 de vida. T2: pierden 2. T3: pierden 3. T4: pierden 4 y la Saga termina.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: todos pierden 1 de vida. T2: pierden 2. T3: pierden 3. T4: pierden 4 y la Saga termina."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 10
    }
  },
  {
    "id": "saga_11_ejercito_de_freezer",
    "sourceIndex": 11,
    "name": "Ejército de Freezer",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: ataques de Ki +1 daño. T2: primer ataque de cada jugador cuesta 1 menos. T3: cada jugador pierde 2 de vida. T4: descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: ataques de Ki +1 daño. T2: primer ataque de cada jugador cuesta 1 menos. T3: cada jugador pierde 2 de vida. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 11
    }
  },
  {
    "id": "saga_12_entrenamiento_en_la_gravedad",
    "sourceIndex": 12,
    "name": "Entrenamiento en la Gravedad",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: cartas cuestan +1. T2: cada jugador obtiene +1 al primer dado. T3: ataques +2 daño. T4: cada jugador roba 2 y descarta 1.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DADOS",
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: cartas cuestan +1. T2: cada jugador obtiene +1 al primer dado. T3: ataques +2 daño. T4: cada jugador roba 2 y descarta 1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 12
    }
  },
  {
    "id": "saga_13_resurreccion",
    "sourceIndex": 13,
    "name": "Resurrección",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: cuando un personaje baje a 0, queda en 1. T2: todos recuperan 3. T3: quienes estén a 5 o menos recuperan 5. T4: descarta.",
    "conditions": [
      "T1: cuando un personaje baje a 0, queda en 1."
    ],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: cuando un personaje baje a 0, queda en 1. T2: todos recuperan 3. T3: quienes estén a 5 o menos recuperan 5. T4: descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 13
    }
  },
  {
    "id": "saga_14_batalla_final",
    "sourceIndex": 14,
    "name": "Batalla Final",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: ataques +1 daño. T2: +2. T3: +3. T4: +4. Después, descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: ataques +1 daño. T2: +2. T3: +3. T4: +4. Después, descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 14
    }
  },
  {
    "id": "saga_15_el_guerrero_legendario",
    "sourceIndex": 15,
    "name": "El Guerrero Legendario",
    "cardType": "SAGA",
    "sourceType": "Saga",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "T1: jugador con menos vida roba 2. T2: ese jugador recupera 5. T3: su siguiente ataque cuesta 0. T4: su siguiente ataque +10. Después, descarta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "MULTI_TURN",
    "keywords": [
      "DESCARTE",
      "GRATIS",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "SAGA",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "T1: jugador con menos vida roba 2. T2: ese jugador recupera 5. T3: su siguiente ataque cuesta 0. T4: su siguiente ataque +10. Después, descarta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 8,
      "rowIndex": 15
    }
  },
  {
    "id": "escenario_01_torneo_mundial",
    "sourceIndex": 1,
    "name": "Torneo Mundial",
    "cardType": "ESCENARIO",
    "sourceType": "Escenario",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Los ataques físicos hacen +1 de daño. Las cartas que afecten a varios objetivos cuestan +1.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ESCENARIO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Los ataques físicos hacen +1 de daño. Las cartas que afecten a varios objetivos cuestan +1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 9,
      "rowIndex": 1
    }
  },
  {
    "id": "escenario_02_planeta_namek",
    "sourceIndex": 2,
    "name": "Planeta Namek",
    "cardType": "ESCENARIO",
    "sourceType": "Escenario",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Todas las cartas que recuperen vida recuperan +2 de vida. Los ataques de Ki cuestan +1.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ESCENARIO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Todas las cartas que recuperen vida recuperan +2 de vida. Los ataques de Ki cuestan +1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 9,
      "rowIndex": 2
    }
  },
  {
    "id": "escenario_03_espacio_exterior",
    "sourceIndex": 3,
    "name": "Espacio Exterior",
    "cardType": "ESCENARIO",
    "sourceType": "Escenario",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Los ataques de Ki cuestan 1 menos. Los ataques físicos cuestan 1 más.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ESCENARIO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Los ataques de Ki cuestan 1 menos. Los ataques físicos cuestan 1 más."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 9,
      "rowIndex": 3
    }
  },
  {
    "id": "escenario_04_campo_de_batalla_destruido",
    "sourceIndex": 4,
    "name": "Campo de Batalla Destruido",
    "cardType": "ESCENARIO",
    "sourceType": "Escenario",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cada vez que un personaje pierda 5 o más de vida de un solo ataque, todos los demás personajes pierden 1 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ESCENARIO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cada vez que un personaje pierda 5 o más de vida de un solo ataque, todos los demás personajes pierden 1 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 9,
      "rowIndex": 4
    }
  },
  {
    "id": "escenario_05_arena_de_supervivencia",
    "sourceIndex": 5,
    "name": "Arena de Supervivencia",
    "cardType": "ESCENARIO",
    "sourceType": "Escenario",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Los jugadores no pueden recuperar más de 5 de vida por turno. Cuando un jugador baja a 5 o menos de vida, roba 2 cartas.",
    "conditions": [
      "Cuando un jugador baja a 5 o menos de vida, roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ESCENARIO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Los jugadores no pueden recuperar más de 5 de vida por turno. Cuando un jugador baja a 5 o menos de vida, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 9,
      "rowIndex": 5
    }
  },
  {
    "id": "equipamiento_01_armadura_saiyan",
    "sourceIndex": 1,
    "name": "Armadura Saiyan",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce en 1 todo daño recibido.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce en 1 todo daño recibido."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 1
    }
  },
  {
    "id": "equipamiento_02_scouter",
    "sourceIndex": 2,
    "name": "Scouter",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno puedes mirar las 2 primeras cartas de tu mazo y reorganizarlas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno puedes mirar las 2 primeras cartas de tu mazo y reorganizarlas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 2
    }
  },
  {
    "id": "equipamiento_03_espada",
    "sourceIndex": 3,
    "name": "Espada",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus ataques físicos hacen +2 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus ataques físicos hacen +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 3
    }
  },
  {
    "id": "equipamiento_04_baston_magico",
    "sourceIndex": 4,
    "name": "Bastón Mágico",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus cartas de Recuperación recuperan +2 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus cartas de Recuperación recuperan +2 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 4
    }
  },
  {
    "id": "equipamiento_05_botas_de_entrenamiento",
    "sourceIndex": 5,
    "name": "Botas de Entrenamiento",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera carta que juegues cada turno cuesta 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera carta que juegues cada turno cuesta 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 5
    }
  },
  {
    "id": "equipamiento_06_guantes_de_combate",
    "sourceIndex": 6,
    "name": "Guantes de Combate",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera vez que inflijas daño físico cada turno, haces +1 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera vez que inflijas daño físico cada turno, haces +1 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 6
    }
  },
  {
    "id": "equipamiento_07_capa_de_guerrero",
    "sourceIndex": 7,
    "name": "Capa de Guerrero",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, reduce en 2 el daño de un ataque.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, reduce en 2 el daño de un ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 7
    }
  },
  {
    "id": "equipamiento_08_armadura_reforzada",
    "sourceIndex": 8,
    "name": "Armadura Reforzada",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 3 de daño del primer ataque que recibas cada turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 3 de daño del primer ataque que recibas cada turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 8
    }
  },
  {
    "id": "equipamiento_09_visor_de_ki",
    "sourceIndex": 9,
    "name": "Visor de Ki",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, puedes mirar los dados disponibles de un rival.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, puedes mirar los dados disponibles de un rival."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 9
    }
  },
  {
    "id": "equipamiento_10_capsula_de_combate",
    "sourceIndex": 10,
    "name": "Cápsula de Combate",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por partida, recupera 5 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "ONCE_PER_GAME",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por partida, recupera 5 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 10
    }
  },
  {
    "id": "equipamiento_11_semilla_senzu",
    "sourceIndex": 11,
    "name": "Semilla Senzu",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por partida, recupera 8 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "ONCE_PER_GAME",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por partida, recupera 8 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 11
    }
  },
  {
    "id": "equipamiento_12_baculo_de_ki",
    "sourceIndex": 12,
    "name": "Báculo de Ki",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera Técnica de Ki que juegues cada turno cuesta 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera Técnica de Ki que juegues cada turno cuesta 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 12
    }
  },
  {
    "id": "equipamiento_13_guantes_de_gravedad",
    "sourceIndex": 13,
    "name": "Guantes de Gravedad",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus ataques físicos que cuesten 4 o más infligen +3 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus ataques físicos que cuesten 4 o más infligen +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 13
    }
  },
  {
    "id": "equipamiento_14_botas_de_velocidad",
    "sourceIndex": 14,
    "name": "Botas de Velocidad",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, después de defenderte, puedes robar 1 carta.",
    "conditions": [
      "Una vez por turno, después de defenderte, puedes robar 1 carta."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, después de defenderte, puedes robar 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 14
    }
  },
  {
    "id": "equipamiento_15_cinturon_de_combate",
    "sourceIndex": 15,
    "name": "Cinturón de Combate",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes 5 o menos de vida, tus ataques hacen +2 de daño.",
    "conditions": [
      "Si tienes 5 o menos de vida, tus ataques hacen +2 de daño."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes 5 o menos de vida, tus ataques hacen +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 15
    }
  },
  {
    "id": "equipamiento_16_armadura_ligera",
    "sourceIndex": 16,
    "name": "Armadura Ligera",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera Defensa que juegues cada turno cuesta 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera Defensa que juegues cada turno cuesta 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 16
    }
  },
  {
    "id": "equipamiento_17_capa_de_invisibilidad",
    "sourceIndex": 17,
    "name": "Capa de Invisibilidad",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por partida, anula completamente un ataque que te tenga como objetivo.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "ONCE_PER_GAME",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por partida, anula completamente un ataque que te tenga como objetivo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 17
    }
  },
  {
    "id": "equipamiento_18_medalla_del_guerrero",
    "sourceIndex": 18,
    "name": "Medalla del Guerrero",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cada vez que completes una Misión, recupera 3 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cada vez que completes una Misión, recupera 3 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 18
    }
  },
  {
    "id": "equipamiento_19_emblema_saiyan",
    "sourceIndex": 19,
    "name": "Emblema Saiyan",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de recibir daño, tu siguiente ataque hace +2 de daño.",
    "conditions": [
      "Después de recibir daño, tu siguiente ataque hace +2 de daño."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de recibir daño, tu siguiente ataque hace +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 19
    }
  },
  {
    "id": "equipamiento_20_emblema_namekiano",
    "sourceIndex": 20,
    "name": "Emblema Namekiano",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera vez que recuperes vida cada turno, recuperas 2 adicionales.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera vez que recuperes vida cada turno, recuperas 2 adicionales."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 20
    }
  },
  {
    "id": "equipamiento_21_emblema_de_freezer",
    "sourceIndex": 21,
    "name": "Emblema de Freezer",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival tenga 5 o menos de vida, tus ataques de Ki hacen +2 de daño contra él.",
    "conditions": [
      "Cuando un rival tenga 5 o menos de vida, tus ataques de Ki hacen +2 de daño contra él."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival tenga 5 o menos de vida, tus ataques de Ki hacen +2 de daño contra él."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 21
    }
  },
  {
    "id": "equipamiento_22_anillo_de_potencia",
    "sourceIndex": 22,
    "name": "Anillo de Potencia",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, puedes convertir un resultado de dado 4 en 5.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, puedes convertir un resultado de dado 4 en 5."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 22
    }
  },
  {
    "id": "equipamiento_23_cristal_de_ki",
    "sourceIndex": 23,
    "name": "Cristal de Ki",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, cuando gastes un dado de 6, recupera 1 Ki.",
    "conditions": [
      "Una vez por turno, cuando gastes un dado de 6, recupera 1 Ki."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DADOS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, cuando gastes un dado de 6, recupera 1 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 23
    }
  },
  {
    "id": "equipamiento_24_guantelete_energetico",
    "sourceIndex": 24,
    "name": "Guantelete Energético",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu primer ataque de Ki cada turno hace +3 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tu primer ataque de Ki cada turno hace +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 24
    }
  },
  {
    "id": "equipamiento_25_botas_de_entrenamiento_pesadas",
    "sourceIndex": 25,
    "name": "Botas de Entrenamiento Pesadas",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus ataques físicos hacen +2 de daño, pero tus Defensas cuestan +1.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus ataques físicos hacen +2 de daño, pero tus Defensas cuestan +1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 25
    }
  },
  {
    "id": "equipamiento_26_armadura_danada",
    "sourceIndex": 26,
    "name": "Armadura Dañada",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 2 de daño. Cuando hayas reducido 10 de daño acumulado, destruye este equipamiento.",
    "conditions": [
      "Cuando hayas reducido 10 de daño acumulado, destruye este equipamiento."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 2 de daño. Cuando hayas reducido 10 de daño acumulado, destruye este equipamiento."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 26
    }
  },
  {
    "id": "equipamiento_27_capa_del_maestro",
    "sourceIndex": 27,
    "name": "Capa del Maestro",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Las cartas de Técnica que cuesten 3 o menos cuestan 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Las cartas de Técnica que cuesten 3 o menos cuestan 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 27
    }
  },
  {
    "id": "equipamiento_28_collar_de_recuperacion",
    "sourceIndex": 28,
    "name": "Collar de Recuperación",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Al comienzo de tu turno, si tienes 5 o menos de vida, recupera 3 de vida.",
    "conditions": [
      "Al comienzo de tu turno, si tienes 5 o menos de vida, recupera 3 de vida."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Al comienzo de tu turno, si tienes 5 o menos de vida, recupera 3 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 28
    }
  },
  {
    "id": "equipamiento_29_guantes_del_combo",
    "sourceIndex": 29,
    "name": "Guantes del Combo",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando completes un Combo, tu siguiente Ataque cuesta 2 menos.",
    "conditions": [
      "Cuando completes un Combo, tu siguiente Ataque cuesta 2 menos."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "COMBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando completes un Combo, tu siguiente Ataque cuesta 2 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 29
    }
  },
  {
    "id": "equipamiento_30_arma_legendaria",
    "sourceIndex": 30,
    "name": "Arma Legendaria",
    "cardType": "EQUIPAMIENTO",
    "sourceType": "Equipamiento",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus ataques hacen +2 de daño. Si un ataque reduce a un rival a 0, puedes robar 3 cartas y recuperar 3 Ki.",
    "conditions": [
      "Si un ataque reduce a un rival a 0, puedes robar 3 cartas y recuperar 3 Ki."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "EQUIPAMIENTO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus ataques hacen +2 de daño. Si un ataque reduce a un rival a 0, puedes robar 3 cartas y recuperar 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 10,
      "rowIndex": 30
    }
  },
  {
    "id": "aliado_01_krilin_apoyo",
    "sourceIndex": 1,
    "name": "Krilin - Apoyo",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera vez que recibas daño cada turno, reduce ese daño en 2.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera vez que recibas daño cada turno, reduce ese daño en 2."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 1
    }
  },
  {
    "id": "aliado_02_piccolo_maestro",
    "sourceIndex": 2,
    "name": "Piccolo - Maestro",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, cuando juegues una Técnica, roba 1 carta.",
    "conditions": [
      "Una vez por turno, cuando juegues una Técnica, roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, cuando juegues una Técnica, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 2
    }
  },
  {
    "id": "aliado_03_gohan_potencial",
    "sourceIndex": 3,
    "name": "Gohan - Potencial",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando tengas 5 o menos de vida, tus ataques hacen +3 de daño.",
    "conditions": [
      "Cuando tengas 5 o menos de vida, tus ataques hacen +3 de daño."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando tengas 5 o menos de vida, tus ataques hacen +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 3
    }
  },
  {
    "id": "aliado_04_bulma_inventora",
    "sourceIndex": 4,
    "name": "Bulma - Inventora",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, descarta 1 carta para robar 2.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DISCARD",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, descarta 1 carta para robar 2."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 4
    }
  },
  {
    "id": "aliado_05_yamcha_interceptor",
    "sourceIndex": 5,
    "name": "Yamcha - Interceptor",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, cuando otro personaje sea atacado, puedes hacer que el ataque te tenga como objetivo.",
    "conditions": [
      "Una vez por turno, cuando otro personaje sea atacado, puedes hacer que el ataque te tenga como objetivo."
    ],
    "targeting": "OTHER",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, cuando otro personaje sea atacado, puedes hacer que el ataque te tenga como objetivo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 5
    }
  },
  {
    "id": "aliado_06_ten_shin_han_disciplina",
    "sourceIndex": 6,
    "name": "Ten Shin Han - Disciplina",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "El primer ataque que juegues cada turno cuesta 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "El primer ataque que juegues cada turno cuesta 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 6
    }
  },
  {
    "id": "aliado_07_chaoz_psiquico",
    "sourceIndex": 7,
    "name": "Chaoz - Psíquico",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, reduce en 2 el resultado de un dado de un rival.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, reduce en 2 el resultado de un dado de un rival."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 7
    }
  },
  {
    "id": "aliado_08_dende_sanador",
    "sourceIndex": 8,
    "name": "Dende - Sanador",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Al comienzo de tu turno, recupera 2 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Al comienzo de tu turno, recupera 2 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 8
    }
  },
  {
    "id": "aliado_09_maestro_roshi_experiencia",
    "sourceIndex": 9,
    "name": "Maestro Roshi - Experiencia",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La primera vez que completes una Misión, roba 3 cartas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "La primera vez que completes una Misión, roba 3 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 9
    }
  },
  {
    "id": "aliado_10_videl_determinacion",
    "sourceIndex": 10,
    "name": "Videl - Determinación",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando recibas daño y sobrevivas con 5 o menos de vida, recupera 2 de vida.",
    "conditions": [
      "Cuando recibas daño y sobrevivas con 5 o menos de vida, recupera 2 de vida."
    ],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando recibas daño y sobrevivas con 5 o menos de vida, recupera 2 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 10
    }
  },
  {
    "id": "aliado_11_trunks_espadachin",
    "sourceIndex": 11,
    "name": "Trunks - Espadachín",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tus ataques físicos hacen +2 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Tus ataques físicos hacen +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 11
    }
  },
  {
    "id": "aliado_12_goten_combate_infantil",
    "sourceIndex": 12,
    "name": "Goten - Combate Infantil",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si has jugado 2 o más cartas este turno, roba 1 carta.",
    "conditions": [
      "Si has jugado 2 o más cartas este turno, roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si has jugado 2 o más cartas este turno, roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 12
    }
  },
  {
    "id": "aliado_13_mr_satan_distraccion",
    "sourceIndex": 13,
    "name": "Mr. Satan - Distracción",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por turno, puedes obligar a un rival a pagar 1 Ki adicional por su próxima carta.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por turno, puedes obligar a un rival a pagar 1 Ki adicional por su próxima carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 13
    }
  },
  {
    "id": "aliado_14_shenron_deseo",
    "sourceIndex": 14,
    "name": "Shenron - Deseo",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Una vez por partida, recupera 8 de vida y roba 3 cartas.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "ONCE_PER_GAME",
    "keywords": [
      "CURACION",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Una vez por partida, recupera 8 de vida y roba 3 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 14
    }
  },
  {
    "id": "aliado_15_vegeta_rival",
    "sourceIndex": 15,
    "name": "Vegeta - Rival",
    "cardType": "ALIADO",
    "sourceType": "Aliado",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cada vez que un rival te haga más daño que tú a él durante una acción, tu próximo ataque obtiene +4 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "PERMANENT",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "ADD_PERMANENT",
        "zone": "ALIADO",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cada vez que un rival te haga más daño que tú a él durante una acción, tu próximo ataque obtiene +4 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 11,
      "rowIndex": 15
    }
  },
  {
    "id": "evento_01_explosion_repentina",
    "sourceIndex": 1,
    "name": "¡Explosión Repentina!",
    "cardType": "EVENTO",
    "sourceType": "Evento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Todos los personajes reciben 3 de daño.",
    "conditions": [],
    "targeting": "ALL",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Todos los personajes reciben 3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 12,
      "rowIndex": 1
    }
  },
  {
    "id": "evento_02_llegada_inesperada",
    "sourceIndex": 2,
    "name": "Llegada Inesperada",
    "cardType": "EVENTO",
    "sourceType": "Evento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Roba 3 cartas y descarta 1.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Roba 3 cartas y descarta 1."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 12,
      "rowIndex": 2
    }
  },
  {
    "id": "evento_03_milagro",
    "sourceIndex": 3,
    "name": "Milagro",
    "cardType": "EVENTO",
    "sourceType": "Evento",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 7 de vida y elimina todos tus Estados negativos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 7,
        "target": "CONTEXT"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 7 de vida y elimina todos tus Estados negativos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 12,
      "rowIndex": 3
    }
  },
  {
    "id": "evento_04_cambio_de_suerte",
    "sourceIndex": 4,
    "name": "Cambio de Suerte",
    "cardType": "EVENTO",
    "sourceType": "Evento",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Repite todos tus dados disponibles. Debes aceptar los nuevos resultados.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Repite todos tus dados disponibles. Debes aceptar los nuevos resultados."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 12,
      "rowIndex": 4
    }
  },
  {
    "id": "evento_05_interferencia",
    "sourceIndex": 5,
    "name": "Interferencia",
    "cardType": "EVENTO",
    "sourceType": "Evento",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Todos los jugadores descartan 1 carta. Después, tú robas 2.",
    "conditions": [],
    "targeting": "ALL",
    "duration": null,
    "keywords": [
      "DESCARTE",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DISCARD",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Todos los jugadores descartan 1 carta. Después, tú robas 2."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 12,
      "rowIndex": 5
    }
  },
  {
    "id": "reaccion_01_esquiva",
    "sourceIndex": 1,
    "name": "¡Esquiva!",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando seas objetivo de un ataque, reduce 5 de daño.",
    "conditions": [
      "Cuando seas objetivo de un ataque, reduce 5 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando seas objetivo de un ataque, reduce 5 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 1
    }
  },
  {
    "id": "reaccion_02_apartarse",
    "sourceIndex": 2,
    "name": "¡Apartarse!",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando otro personaje sea objetivo de un ataque, puedes cambiar el objetivo a otro personaje legal.",
    "conditions": [
      "Cuando otro personaje sea objetivo de un ataque, puedes cambiar el objetivo a otro personaje legal."
    ],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando otro personaje sea objetivo de un ataque, puedes cambiar el objetivo a otro personaje legal."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 2
    }
  },
  {
    "id": "reaccion_03_contraataque",
    "sourceIndex": 3,
    "name": "Contraataque",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de recibir daño, inflige 4 de daño al atacante.",
    "conditions": [
      "Después de recibir daño, inflige 4 de daño al atacante."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de recibir daño, inflige 4 de daño al atacante."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 3
    }
  },
  {
    "id": "reaccion_04_barrera_instantanea",
    "sourceIndex": 4,
    "name": "Barrera Instantánea",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce 7 de daño del ataque actual.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 7,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce 7 de daño del ataque actual."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 4
    }
  },
  {
    "id": "reaccion_05_desvio_de_ki",
    "sourceIndex": 5,
    "name": "Desvío de Ki",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando recibas un ataque de Ki, reduce 5 de daño y el atacante pierde 1 Ki.",
    "conditions": [
      "Cuando recibas un ataque de Ki, reduce 5 de daño y el atacante pierde 1 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "LOSE_KI",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "BLOCK",
        "amount": 5,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando recibas un ataque de Ki, reduce 5 de daño y el atacante pierde 1 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 5
    }
  },
  {
    "id": "reaccion_06_ultimo_segundo",
    "sourceIndex": 6,
    "name": "Último Segundo",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si el ataque fuera a dejarte en 0 de vida, quedas en 1 de vida.",
    "conditions": [
      "Si el ataque fuera a dejarte en 0 de vida, quedas en 1 de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Si el ataque fuera a dejarte en 0 de vida, quedas en 1 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 6
    }
  },
  {
    "id": "reaccion_07_reflejo_perfecto",
    "sourceIndex": 7,
    "name": "Reflejo Perfecto",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Anula completamente un ataque de 6 o menos de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "NEGATE_ATTACK",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Anula completamente un ataque de 6 o menos de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 7
    }
  },
  {
    "id": "reaccion_08_intercepcion_heroica",
    "sourceIndex": 8,
    "name": "Intercepción Heroica",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un aliado sea atacado, recibes tú el ataque y reduces 3 de daño.",
    "conditions": [
      "Cuando un aliado sea atacado, recibes tú el ataque y reduces 3 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "BLOCK",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando un aliado sea atacado, recibes tú el ataque y reduces 3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 8
    }
  },
  {
    "id": "reaccion_09_no_es_suficiente",
    "sourceIndex": 9,
    "name": "No Es Suficiente",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando una Defensa tuya reduzca daño, reduce 2 adicionales.",
    "conditions": [
      "Cuando una Defensa tuya reduzca daño, reduce 2 adicionales."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando una Defensa tuya reduzca daño, reduce 2 adicionales."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 9
    }
  },
  {
    "id": "reaccion_10_ahora",
    "sourceIndex": 10,
    "name": "¡Ahora!",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de que un rival juegue una carta, puedes jugar inmediatamente un Ataque de coste 3 o menos pagando su coste.",
    "conditions": [
      "Después de que un rival juegue una carta, puedes jugar inmediatamente un Ataque de coste 3 o menos pagando su coste."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Después de que un rival juegue una carta, puedes jugar inmediatamente un Ataque de coste 3 o menos pagando su coste."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 10
    }
  },
  {
    "id": "reaccion_11_robo_de_emergencia",
    "sourceIndex": 11,
    "name": "Robo de Emergencia",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando te queden 2 o menos cartas en mano, roba 3 cartas.",
    "conditions": [
      "Cuando te queden 2 o menos cartas en mano, roba 3 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando te queden 2 o menos cartas en mano, roba 3 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 11
    }
  },
  {
    "id": "reaccion_12_resistencia",
    "sourceIndex": 12,
    "name": "Resistencia",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando recibas daño, reduce 4. Si sobrevives con 3 o menos de vida, recupera 2.",
    "conditions": [
      "Cuando recibas daño, reduce 4.",
      "Si sobrevives con 3 o menos de vida, recupera 2."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando recibas daño, reduce 4. Si sobrevives con 3 o menos de vida, recupera 2."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 12
    }
  },
  {
    "id": "reaccion_13_interrupcion",
    "sourceIndex": 13,
    "name": "Interrupción",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cancela el efecto de una carta de Habilidad recién jugada.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cancela el efecto de una carta de Habilidad recién jugada."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 13
    }
  },
  {
    "id": "reaccion_14_romper_combo",
    "sourceIndex": 14,
    "name": "Romper Combo",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival cumpla una condición de Combo, impide que se active.",
    "conditions": [
      "Cuando un rival cumpla una condición de Combo, impide que se active."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "COMBO"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival cumpla una condición de Combo, impide que se active."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 14
    }
  },
  {
    "id": "reaccion_15_ultimo_esfuerzo",
    "sourceIndex": 15,
    "name": "Último Esfuerzo",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando tengas 5 o menos de vida, tu siguiente ataque hace +4 de daño.",
    "conditions": [
      "Cuando tengas 5 o menos de vida, tu siguiente ataque hace +4 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando tengas 5 o menos de vida, tu siguiente ataque hace +4 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 15
    }
  },
  {
    "id": "reaccion_16_desafio_aceptado",
    "sourceIndex": 16,
    "name": "Desafío Aceptado",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival te seleccione como objetivo, recupera 2 Ki y roba 1 carta.",
    "conditions": [
      "Cuando un rival te seleccione como objetivo, recupera 2 Ki y roba 1 carta."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival te seleccione como objetivo, recupera 2 Ki y roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 16
    }
  },
  {
    "id": "reaccion_17_lectura_instantanea",
    "sourceIndex": 17,
    "name": "Lectura Instantánea",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival juegue una carta, mira las 3 primeras cartas de su mazo.",
    "conditions": [
      "Cuando un rival juegue una carta, mira las 3 primeras cartas de su mazo."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival juegue una carta, mira las 3 primeras cartas de su mazo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 17
    }
  },
  {
    "id": "reaccion_18_sacrificio",
    "sourceIndex": 18,
    "name": "Sacrificio",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando otro jugador vaya a recibir daño, puedes recibir hasta 5 de ese daño tú.",
    "conditions": [
      "Cuando otro jugador vaya a recibir daño, puedes recibir hasta 5 de ese daño tú."
    ],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando otro jugador vaya a recibir daño, puedes recibir hasta 5 de ese daño tú."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 18
    }
  },
  {
    "id": "reaccion_19_ruptura_de_barrera",
    "sourceIndex": 19,
    "name": "Ruptura de Barrera",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival juegue una Defensa, esa Defensa reduce 3 menos de daño.",
    "conditions": [
      "Cuando un rival juegue una Defensa, esa Defensa reduce 3 menos de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival juegue una Defensa, esa Defensa reduce 3 menos de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 19
    }
  },
  {
    "id": "reaccion_20_todavia_no",
    "sourceIndex": 20,
    "name": "¡Todavía No!",
    "cardType": "REACCION",
    "sourceType": "Reacción",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando fueras a ser eliminado, quedas a 1 de vida. Después, roba 2 cartas y recupera 3 Ki.",
    "conditions": [
      "Cuando fueras a ser eliminado, quedas a 1 de vida."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 3,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando fueras a ser eliminado, quedas a 1 de vida. Después, roba 2 cartas y recupera 3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 13,
      "rowIndex": 20
    }
  },
  {
    "id": "estado_01_aturdido",
    "sourceIndex": 1,
    "name": "Aturdido",
    "cardType": "ESTADO",
    "sourceType": "Estado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "La próxima carta que juegue cuesta +2 Ki. Después, elimina este Estado.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "ESTADO",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "APPLY_STATUS_FROM_CARD",
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "La próxima carta que juegue cuesta +2 Ki. Después, elimina este Estado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 14,
      "rowIndex": 1
    }
  },
  {
    "id": "estado_02_debilitado",
    "sourceIndex": 2,
    "name": "Debilitado",
    "cardType": "ESTADO",
    "sourceType": "Estado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Sus ataques hacen -2 de daño. Al final de su próximo turno, elimina este Estado.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "APPLY_STATUS_FROM_CARD",
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Sus ataques hacen -2 de daño. Al final de su próximo turno, elimina este Estado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 14,
      "rowIndex": 2
    }
  },
  {
    "id": "estado_03_quemado",
    "sourceIndex": 3,
    "name": "Quemado",
    "cardType": "ESTADO",
    "sourceType": "Estado",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Pierde 2 de vida al comienzo de cada turno. Se elimina después de recibir una carta de Recuperación.",
    "conditions": [
      "Se elimina después de recibir una carta de Recuperación."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "APPLY_STATUS_FROM_CARD",
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Pierde 2 de vida al comienzo de cada turno. Se elimina después de recibir una carta de Recuperación."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 14,
      "rowIndex": 3
    }
  },
  {
    "id": "estado_04_agotado",
    "sourceIndex": 4,
    "name": "Agotado",
    "cardType": "ESTADO",
    "sourceType": "Estado",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Su próximo turno comienza con 1 dado menos. Después, elimina este Estado.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "APPLY_STATUS_FROM_CARD",
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Su próximo turno comienza con 1 dado menos. Después, elimina este Estado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 14,
      "rowIndex": 4
    }
  },
  {
    "id": "estado_05_sellado",
    "sourceIndex": 5,
    "name": "Sellado",
    "cardType": "ESTADO",
    "sourceType": "Estado",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "El personaje no puede utilizar Habilidades ni Técnicas durante su próxima acción.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_ACTION",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "APPLY_STATUS_FROM_CARD",
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "El personaje no puede utilizar Habilidades ni Técnicas durante su próxima acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 14,
      "rowIndex": 5
    }
  },
  {
    "id": "racial_saiyan_01_espiritu_saiyan",
    "sourceIndex": 1,
    "name": "Espíritu Saiyan",
    "cardType": "RACIAL",
    "sourceType": "Racial Saiyan",
    "cost": 3,
    "rarity": null,
    "raceRestriction": "SAIYAN",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes menos del 50% de tu vida, tus ataques hacen +3 de daño este turno.",
    "conditions": [
      "Si tienes menos del 50% de tu vida, tus ataques hacen +3 de daño este turno."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Si tienes menos del 50% de tu vida, tus ataques hacen +3 de daño este turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 15,
      "rowIndex": 1
    }
  },
  {
    "id": "racial_saiyan_02_orgullo_del_guerrero",
    "sourceIndex": 2,
    "name": "Orgullo del Guerrero",
    "cardType": "RACIAL",
    "sourceType": "Racial Saiyan",
    "cost": 2,
    "rarity": null,
    "raceRestriction": "SAIYAN",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de recibir daño, recupera 2 Ki y roba 1 carta.",
    "conditions": [
      "Después de recibir daño, recupera 2 Ki y roba 1 carta."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de recibir daño, recupera 2 Ki y roba 1 carta."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 15,
      "rowIndex": 2
    }
  },
  {
    "id": "racial_saiyan_03_instinto_de_combate",
    "sourceIndex": 3,
    "name": "Instinto de Combate",
    "cardType": "RACIAL",
    "sourceType": "Racial Saiyan",
    "cost": 4,
    "rarity": null,
    "raceRestriction": "SAIYAN",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de derrotar a un enemigo, puedes realizar inmediatamente otra acción.",
    "conditions": [
      "Después de derrotar a un enemigo, puedes realizar inmediatamente otra acción."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "EXTRA_ACTION",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de derrotar a un enemigo, puedes realizar inmediatamente otra acción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 15,
      "rowIndex": 3
    }
  },
  {
    "id": "racial_saiyan_04_ultima_oportunidad_saiyan",
    "sourceIndex": 4,
    "name": "Última Oportunidad Saiyan",
    "cardType": "RACIAL",
    "sourceType": "Racial Saiyan",
    "cost": 5,
    "rarity": null,
    "raceRestriction": "SAIYAN",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si tienes 5 o menos de vida, recupera 7 de vida y tu próximo ataque hace +5 de daño.",
    "conditions": [
      "Si tienes 5 o menos de vida, recupera 7 de vida y tu próximo ataque hace +5 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 7,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si tienes 5 o menos de vida, recupera 7 de vida y tu próximo ataque hace +5 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 15,
      "rowIndex": 4
    }
  },
  {
    "id": "racial_saiyan_05_voluntad_indomable",
    "sourceIndex": 5,
    "name": "Voluntad Indomable",
    "cardType": "RACIAL",
    "sourceType": "Racial Saiyan",
    "cost": 6,
    "rarity": null,
    "raceRestriction": "SAIYAN",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Si fueras a ser eliminado, quedas en 1 de vida. Después, recupera 5 de vida. Una vez por partida.",
    "conditions": [
      "Si fueras a ser eliminado, quedas en 1 de vida."
    ],
    "targeting": "SELF",
    "duration": "ONCE_PER_GAME",
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 5,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Si fueras a ser eliminado, quedas en 1 de vida. Después, recupera 5 de vida. Una vez por partida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 15,
      "rowIndex": 5
    }
  },
  {
    "id": "racial_freezer_01_crueldad",
    "sourceIndex": 1,
    "name": "Crueldad",
    "cardType": "RACIAL",
    "sourceType": "Racial Freezer",
    "cost": 3,
    "rarity": null,
    "raceRestriction": "FREEZER",
    "nature": null,
    "range": null,
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Si el objetivo tiene menos vida que tú, inflige +3 de daño.",
    "conditions": [
      "Si el objetivo tiene menos vida que tú, inflige +3 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Si el objetivo tiene menos vida que tú, inflige +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 16,
      "rowIndex": 1
    }
  },
  {
    "id": "racial_freezer_02_tirania",
    "sourceIndex": 2,
    "name": "Tiranía",
    "cardType": "RACIAL",
    "sourceType": "Racial Freezer",
    "cost": 4,
    "rarity": null,
    "raceRestriction": "FREEZER",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Su próxima carta cuesta +3 Ki.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Su próxima carta cuesta +3 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 16,
      "rowIndex": 2
    }
  },
  {
    "id": "racial_freezer_03_muerte_desde_las_sombras",
    "sourceIndex": 3,
    "name": "Muerte desde las Sombras",
    "cardType": "RACIAL",
    "sourceType": "Racial Freezer",
    "cost": 3,
    "rarity": null,
    "raceRestriction": "FREEZER",
    "nature": null,
    "range": null,
    "damage": 5,
    "rulesText": "Inflige 5 de daño a un personaje que tenga 10 o menos de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño a un personaje que tenga 10 o menos de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 16,
      "rowIndex": 3
    }
  },
  {
    "id": "racial_freezer_04_dominacion",
    "sourceIndex": 4,
    "name": "Dominación",
    "cardType": "RACIAL",
    "sourceType": "Racial Freezer",
    "cost": 5,
    "rarity": null,
    "raceRestriction": "FREEZER",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Hasta tu próximo turno, cuando recupere vida, recupera 3 menos.",
    "conditions": [
      "Hasta tu próximo turno, cuando recupere vida, recupera 3 menos."
    ],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Hasta tu próximo turno, cuando recupere vida, recupera 3 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 16,
      "rowIndex": 4
    }
  },
  {
    "id": "racial_freezer_05_emperador_galactico",
    "sourceIndex": 5,
    "name": "Emperador Galáctico",
    "cardType": "RACIAL",
    "sourceType": "Racial Freezer",
    "cost": 6,
    "rarity": null,
    "raceRestriction": "FREEZER",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Todos los rivales pierden 2 de vida y descartan 1 carta. Por cada rival afectado, recuperas 1 de vida.",
    "conditions": [],
    "targeting": "ALL_ENEMIES",
    "duration": null,
    "keywords": [
      "DESCARTE"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "DISCARD",
        "amount": 1,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Todos los rivales pierden 2 de vida y descartan 1 carta. Por cada rival afectado, recuperas 1 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 16,
      "rowIndex": 5
    }
  },
  {
    "id": "racial_namek_01_regeneracion_namekiana",
    "sourceIndex": 1,
    "name": "Regeneración Namekiana",
    "cardType": "RACIAL",
    "sourceType": "Racial Namek",
    "cost": 3,
    "rarity": null,
    "raceRestriction": "NAMEK",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 6 de vida y elimina un Estado negativo.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 6 de vida y elimina un Estado negativo."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 17,
      "rowIndex": 1
    }
  },
  {
    "id": "racial_namek_02_sabiduria_namekiana",
    "sourceIndex": 2,
    "name": "Sabiduría Namekiana",
    "cardType": "RACIAL",
    "sourceType": "Racial Namek",
    "cost": 2,
    "rarity": null,
    "raceRestriction": "NAMEK",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira las 4 primeras cartas de tu mazo. Añade una Técnica o Recuperación a tu mano.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira las 4 primeras cartas de tu mazo. Añade una Técnica o Recuperación a tu mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 17,
      "rowIndex": 2
    }
  },
  {
    "id": "racial_namek_03_fusion_espiritual",
    "sourceIndex": 3,
    "name": "Fusión Espiritual",
    "cardType": "RACIAL",
    "sourceType": "Racial Namek",
    "cost": 4,
    "rarity": null,
    "raceRestriction": "NAMEK",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 3 de vida y recupera 2 Ki.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 3,
        "target": "CONTEXT"
      },
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 3 de vida y recupera 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 17,
      "rowIndex": 3
    }
  },
  {
    "id": "racial_namek_04_guardian_de_namek",
    "sourceIndex": 4,
    "name": "Guardián de Namek",
    "cardType": "RACIAL",
    "sourceType": "Racial Namek",
    "cost": 4,
    "rarity": null,
    "raceRestriction": "NAMEK",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Reduce en 3 el próximo daño que recibas. Si reduces todo el daño, roba 2 cartas.",
    "conditions": [
      "Si reduces todo el daño, roba 2 cartas."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Reduce en 3 el próximo daño que recibas. Si reduces todo el daño, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 17,
      "rowIndex": 4
    }
  },
  {
    "id": "racial_namek_05_poder_ancestral",
    "sourceIndex": 5,
    "name": "Poder Ancestral",
    "cardType": "RACIAL",
    "sourceType": "Racial Namek",
    "cost": 6,
    "rarity": null,
    "raceRestriction": "NAMEK",
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 8 de vida, roba 2 cartas y elimina todos tus Estados negativos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION",
      "ESTADO",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 8,
        "target": "CONTEXT"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "CLEANSE_STATUS",
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 8 de vida, roba 2 cartas y elimina todos tus Estados negativos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 17,
      "rowIndex": 5
    }
  },
  {
    "id": "poder_01_teletransportacion",
    "sourceIndex": 1,
    "name": "Teletransportación",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando seas objetivo de un ataque, puedes pagar 4 Ki para anularlo completamente.",
    "conditions": [
      "Cuando seas objetivo de un ataque, puedes pagar 4 Ki para anularlo completamente."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DEFENSA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Cuando seas objetivo de un ataque, puedes pagar 4 Ki para anularlo completamente."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 1
    }
  },
  {
    "id": "poder_02_control_mental",
    "sourceIndex": 2,
    "name": "Control Mental",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Su próxima carta de Habilidad debe tenerte a ti como objetivo, si es posible.",
    "conditions": [
      "Su próxima carta de Habilidad debe tenerte a ti como objetivo, si es posible."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Su próxima carta de Habilidad debe tenerte a ti como objetivo, si es posible."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 2
    }
  },
  {
    "id": "poder_03_sentido_del_ki",
    "sourceIndex": 3,
    "name": "Sentido del Ki",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Mira la mano de un rival y sus dados disponibles.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Mira la mano de un rival y sus dados disponibles."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 3
    }
  },
  {
    "id": "poder_04_velocidad_sobrehumana",
    "sourceIndex": 4,
    "name": "Velocidad Sobrehumana",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Después de resolver una Defensa, puedes realizar inmediatamente una acción adicional.",
    "conditions": [
      "Después de resolver una Defensa, puedes realizar inmediatamente una acción adicional."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "EXTRA_ACTION",
        "amount": 1,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Después de resolver una Defensa, puedes realizar inmediatamente una acción adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 4
    }
  },
  {
    "id": "poder_05_fuerza_descomunal",
    "sourceIndex": 5,
    "name": "Fuerza Descomunal",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu próximo ataque físico ignora 5 puntos de Defensa y hace +3 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Tu próximo ataque físico ignora 5 puntos de Defensa y hace +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 5
    }
  },
  {
    "id": "poder_06_regeneracion_extrema",
    "sourceIndex": 6,
    "name": "Regeneración Extrema",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Recupera 6 de vida al comienzo de cada uno de tus próximos 2 turnos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CURACION"
    ],
    "structuredEffects": [
      {
        "type": "HEAL",
        "amount": 6,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Recupera 6 de vida al comienzo de cada uno de tus próximos 2 turnos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 6
    }
  },
  {
    "id": "poder_07_absorcion_de_energia",
    "sourceIndex": 7,
    "name": "Absorción de Energía",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Cuando un rival juegue una Técnica de Ki, recuperas 2 Ki.",
    "conditions": [
      "Cuando un rival juegue una Técnica de Ki, recuperas 2 Ki."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "GAIN_KI",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Cuando un rival juegue una Técnica de Ki, recuperas 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 7
    }
  },
  {
    "id": "poder_08_duplicacion",
    "sourceIndex": 8,
    "name": "Duplicación",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Copia el efecto de la última carta que hayas jugado, pero debes pagar nuevamente su coste.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Copia el efecto de la última carta que hayas jugado, pero debes pagar nuevamente su coste."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 8
    }
  },
  {
    "id": "poder_09_barrido_energetico",
    "sourceIndex": 9,
    "name": "Barrido Energético",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Todos los rivales pierden 2 Ki.",
    "conditions": [],
    "targeting": "ALL_ENEMIES",
    "duration": null,
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "LOSE_KI",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Todos los rivales pierden 2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 9
    }
  },
  {
    "id": "poder_10_presencia_intimidante",
    "sourceIndex": 10,
    "name": "Presencia Intimidante",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta tu próximo turno, los ataques contra ti cuestan +2 Ki.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta tu próximo turno, los ataques contra ti cuestan +2 Ki."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 10
    }
  },
  {
    "id": "poder_11_percepcion_absoluta",
    "sourceIndex": 11,
    "name": "Percepción Absoluta",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Durante este turno, puedes ver las cartas que roba un rival antes de que las añada a su mano.",
    "conditions": [
      "Durante este turno, puedes ver las cartas que roba un rival antes de que las añada a su mano."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Durante este turno, puedes ver las cartas que roba un rival antes de que las añada a su mano."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 11
    }
  },
  {
    "id": "poder_12_robo_de_habilidad",
    "sourceIndex": 12,
    "name": "Robo de Habilidad",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un Equipamiento o Poder de un rival. Puedes utilizar su efecto durante un turno.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un Equipamiento o Poder de un rival. Puedes utilizar su efecto durante un turno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 12
    }
  },
  {
    "id": "poder_13_control_de_gravedad",
    "sourceIndex": 13,
    "name": "Control de Gravedad",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Elige un rival. Su próximo turno comienza con 1 dado menos.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Elige un rival. Su próximo turno comienza con 1 dado menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 13
    }
  },
  {
    "id": "poder_14_aumento_repentino",
    "sourceIndex": 14,
    "name": "Aumento Repentino",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Tu próximo ataque obtiene +5 de daño, pero después pierdes 3 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Tu próximo ataque obtiene +5 de daño, pero después pierdes 3 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 14
    }
  },
  {
    "id": "poder_15_aura_protectora",
    "sourceIndex": 15,
    "name": "Aura Protectora",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta tu próximo turno, la primera vez que fueras a recibir daño, reduces todo el daño a 0.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "NEXT_TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta tu próximo turno, la primera vez que fueras a recibir daño, reduces todo el daño a 0."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 15
    }
  },
  {
    "id": "poder_16_instinto_preciso",
    "sourceIndex": 16,
    "name": "Instinto Preciso",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Puedes repetir uno de tus dados una vez. Debes aceptar el nuevo resultado.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Puedes repetir uno de tus dados una vez. Debes aceptar el nuevo resultado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 16
    }
  },
  {
    "id": "poder_17_dominio_del_combate",
    "sourceIndex": 17,
    "name": "Dominio del Combate",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Durante este turno, la primera vez que juegues cada tipo de carta, cuesta 1 menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Durante este turno, la primera vez que juegues cada tipo de carta, cuesta 1 menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 17
    }
  },
  {
    "id": "poder_18_liberacion_total",
    "sourceIndex": 18,
    "name": "Liberación Total",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Utiliza todos tus dados restantes. Por cada dado utilizado, tu próximo ataque obtiene +1 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Utiliza todos tus dados restantes. Por cada dado utilizado, tu próximo ataque obtiene +1 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 18
    }
  },
  {
    "id": "poder_19_ultimo_poder",
    "sourceIndex": 19,
    "name": "Último Poder",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Solo si tienes 3 o menos de vida: tu próxima carta cuesta 0 y su efecto numérico se duplica.",
    "conditions": [
      "Solo si tienes 3 o menos de vida: tu próxima carta cuesta 0 y su efecto numérico se duplica."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "GRATIS"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Solo si tienes 3 o menos de vida: tu próxima carta cuesta 0 y su efecto numérico se duplica."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 19
    }
  },
  {
    "id": "poder_20_poder_incontenible",
    "sourceIndex": 20,
    "name": "Poder Incontenible",
    "cardType": "PODER",
    "sourceType": "Poder",
    "cost": 7,
    "rarity": null,
    "raceRestriction": null,
    "nature": null,
    "range": null,
    "damage": null,
    "rulesText": "Hasta el final del turno, tus ataques hacen +5 de daño y tus Defensas reducen +3. Al terminar, pierdes 5 de vida.",
    "conditions": [],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Hasta el final del turno, tus ataques hacen +5 de daño y tus Defensas reducen +3. Al terminar, pierdes 5 de vida."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 18,
      "rowIndex": 20
    }
  },
  {
    "id": "tecnica_clasica_01_final_flash",
    "sourceIndex": 1,
    "name": "Final Flash",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 10,
    "rulesText": "Inflige 10 de daño e ignora 3 de Defensa. Si gastas un dado de 6, hace +2 de daño.",
    "conditions": [
      "Si gastas un dado de 6, hace +2 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DADOS",
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 10,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 10 de daño e ignora 3 de Defensa. Si gastas un dado de 6, hace +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 1
    }
  },
  {
    "id": "tecnica_clasica_02_makankosappo",
    "sourceIndex": 2,
    "name": "Makankōsappō",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño e ignora completamente Barreras de Ki de 4 o menos.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño e ignora completamente Barreras de Ki de 4 o menos."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 2
    }
  },
  {
    "id": "tecnica_clasica_03_genki_dama",
    "sourceIndex": 3,
    "name": "Genki-dama",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 8,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 15,
    "rulesText": "Inflige 15 de daño. Antes debes colocar esta carta como Carga; necesitas pasar una acción para cargarla.",
    "conditions": [
      "Antes debes colocar esta carta como Carga; necesitas pasar una acción para cargarla."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 15,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 15 de daño. Antes debes colocar esta carta como Carga; necesitas pasar una acción para cargarla."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 3
    }
  },
  {
    "id": "tecnica_clasica_04_masenko",
    "sourceIndex": 4,
    "name": "Masenko",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño. Si tienes menos vida que el objetivo, hace +3 de daño.",
    "conditions": [
      "Si tienes menos vida que el objetivo, hace +3 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño. Si tienes menos vida que el objetivo, hace +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 4
    }
  },
  {
    "id": "tecnica_clasica_05_galick_gun",
    "sourceIndex": 5,
    "name": "Galick Gun",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 8,
    "rulesText": "Inflige 8 de daño. Puedes pagar hasta 2 Ki adicionales: por cada Ki adicional, +2 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 8,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 8 de daño. Puedes pagar hasta 2 Ki adicionales: por cada Ki adicional, +2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 5
    }
  },
  {
    "id": "tecnica_clasica_06_big_bang_attack",
    "sourceIndex": 6,
    "name": "Big Bang Attack",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño. Si el objetivo tiene una Barrera, destruye primero la Barrera y después inflige 4 de daño.",
    "conditions": [
      "Si el objetivo tiene una Barrera, destruye primero la Barrera y después inflige 4 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño. Si el objetivo tiene una Barrera, destruye primero la Barrera y después inflige 4 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 6
    }
  },
  {
    "id": "tecnica_clasica_07_death_beam",
    "sourceIndex": 7,
    "name": "Death Beam",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. No puede ser redirigido y las defensas que reduzcan 2 o menos no tienen efecto.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. No puede ser redirigido y las defensas que reduzcan 2 o menos no tienen efecto."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 7
    }
  },
  {
    "id": "tecnica_clasica_08_death_ball",
    "sourceIndex": 8,
    "name": "Death Ball",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 7,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 12,
    "rulesText": "Inflige 12 de daño. Si derrota al objetivo, roba 2 cartas.",
    "conditions": [
      "Si derrota al objetivo, roba 2 cartas."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 12,
        "target": "TARGET"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 12 de daño. Si derrota al objetivo, roba 2 cartas."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 8
    }
  },
  {
    "id": "tecnica_clasica_09_destructo_disc",
    "sourceIndex": 9,
    "name": "Destructo Disc",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño e ignora hasta 5 puntos de Defensa.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño e ignora hasta 5 puntos de Defensa."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 9
    }
  },
  {
    "id": "tecnica_clasica_10_taiyoken",
    "sourceIndex": 10,
    "name": "Taiyōken",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": null,
    "rulesText": "No hace daño. Aplica Aturdido al objetivo. Si ya está Aturdido, en su lugar pierde su próxima reacción.",
    "conditions": [
      "Si ya está Aturdido, en su lugar pierde su próxima reacción."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI",
      "REACCION"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "No hace daño. Aplica Aturdido al objetivo. Si ya está Aturdido, en su lugar pierde su próxima reacción."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 10
    }
  },
  {
    "id": "tecnica_clasica_11_sokidan",
    "sourceIndex": 11,
    "name": "Sokidan",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño. Después de jugarlo puedes cambiar su objetivo a otro personaje legal.",
    "conditions": [
      "Después de jugarlo puedes cambiar su objetivo a otro personaje legal."
    ],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño. Después de jugarlo puedes cambiar su objetivo a otro personaje legal."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 11
    }
  },
  {
    "id": "tecnica_clasica_12_hellzone_grenade",
    "sourceIndex": 12,
    "name": "Hellzone Grenade",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": null,
    "rulesText": "Coloca 4 proyectiles sobre el objetivo. Al comienzo de tu próximo turno, explotan e infligen 2 de daño cada uno.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": "NEXT_TURN",
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "RULE_TEXT",
        "text": "Coloca 4 proyectiles sobre el objetivo. Al comienzo de tu próximo turno, explotan e infligen 2 de daño cada uno."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 12
    }
  },
  {
    "id": "tecnica_clasica_13_special_beam_cannon",
    "sourceIndex": 13,
    "name": "Special Beam Cannon",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 9,
    "rulesText": "Inflige 9 de daño. Si el objetivo tiene más de 10 de vida, ignora 5 de Defensa.",
    "conditions": [
      "Si el objetivo tiene más de 10 de vida, ignora 5 de Defensa."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 9,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 9 de daño. Si el objetivo tiene más de 10 de vida, ignora 5 de Defensa."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 13
    }
  },
  {
    "id": "tecnica_clasica_14_galactic_donut",
    "sourceIndex": 14,
    "name": "Galactic Donut",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño y aplica Sellado. Si el objetivo ya está Sellado, inflige 5 de daño adicional.",
    "conditions": [
      "Si el objetivo ya está Sellado, inflige 5 de daño adicional."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño y aplica Sellado. Si el objetivo ya está Sellado, inflige 5 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 14
    }
  },
  {
    "id": "tecnica_clasica_15_burning_attack",
    "sourceIndex": 15,
    "name": "Burning Attack",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 7,
    "rulesText": "Inflige 7 de daño. Si derrota al objetivo, todos los demás enemigos reciben 2 de daño.",
    "conditions": [
      "Si derrota al objetivo, todos los demás enemigos reciben 2 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 7,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 7 de daño. Si derrota al objetivo, todos los demás enemigos reciben 2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 15
    }
  },
  {
    "id": "tecnica_clasica_16_super_ghost_kamikaze_attack",
    "sourceIndex": 16,
    "name": "Super Ghost Kamikaze Attack",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 6,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": null,
    "rulesText": "Crea 3 fantasmas. Al comienzo de tus próximos 3 turnos, uno ataca al objetivo e inflige 3 de daño.",
    "conditions": [],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Crea 3 fantasmas. Al comienzo de tus próximos 3 turnos, uno ataca al objetivo e inflige 3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 16
    }
  },
  {
    "id": "tecnica_clasica_17_ki_blast",
    "sourceIndex": 17,
    "name": "Ki Blast",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 1,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño. Si es tu primera acción del turno, cuesta 0.",
    "conditions": [
      "Si es tu primera acción del turno, cuesta 0."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "GRATIS",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño. Si es tu primera acción del turno, cuesta 0."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 17
    }
  },
  {
    "id": "tecnica_clasica_18_barrier",
    "sourceIndex": 18,
    "name": "Barrier",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "CERCANIA",
    "damage": null,
    "rulesText": "Crea una Barrera de 8. Si un rival te ataca con Físico + Cercanía mientras está activa, recibe 2 de daño.",
    "conditions": [
      "Si un rival te ataca con Físico + Cercanía mientras está activa, recibe 2 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Crea una Barrera de 8. Si un rival te ataca con Físico + Cercanía mientras está activa, recibe 2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 18
    }
  },
  {
    "id": "tecnica_clasica_19_wolf_fang_fist",
    "sourceIndex": 19,
    "name": "Wolf Fang Fist",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño tres veces. Si los tres golpes hacen daño, aplica Debilitado.",
    "conditions": [
      "Si los tres golpes hacen daño, aplica Debilitado."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño tres veces. Si los tres golpes hacen daño, aplica Debilitado."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 19
    }
  },
  {
    "id": "tecnica_clasica_20_dynamite_kick",
    "sourceIndex": 20,
    "name": "Dynamite Kick",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño. Si el objetivo tiene una Barrera, la destruye antes de calcular el daño restante.",
    "conditions": [
      "Si el objetivo tiene una Barrera, la destruye antes de calcular el daño restante."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño. Si el objetivo tiene una Barrera, la destruye antes de calcular el daño restante."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 20
    }
  },
  {
    "id": "tecnica_clasica_21_afterimage",
    "sourceIndex": 21,
    "name": "Afterimage",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. Si recibiste daño durante la acción anterior del rival, puedes evitar su próximo ataque.",
    "conditions": [
      "Si recibiste daño durante la acción anterior del rival, puedes evitar su próximo ataque."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. Si recibiste daño durante la acción anterior del rival, puedes evitar su próximo ataque."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 21
    }
  },
  {
    "id": "tecnica_clasica_22_meteor_combination",
    "sourceIndex": 22,
    "name": "Meteor Combination",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 2,
    "rulesText": "Inflige 2 de daño cuatro veces. Por cada golpe que atraviese una Defensa, el siguiente hace +1 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 2 de daño cuatro veces. Por cada golpe que atraviese una Defensa, el siguiente hace +1 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 22
    }
  },
  {
    "id": "tecnica_clasica_23_drunken_fist",
    "sourceIndex": 23,
    "name": "Drunken Fist",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Lanza un dado: con 5-6, inflige 4 adicional; con 1-2, recibes 2 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "DADOS",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Lanza un dado: con 5-6, inflige 4 adicional; con 1-2, recibes 2 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 23
    }
  },
  {
    "id": "tecnica_clasica_24_headbutt",
    "sourceIndex": 24,
    "name": "Headbutt",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño. Si el objetivo tiene 5 o menos de vida, aplica Aturdido.",
    "conditions": [
      "Si el objetivo tiene 5 o menos de vida, aplica Aturdido."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño. Si el objetivo tiene 5 o menos de vida, aplica Aturdido."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 24
    }
  },
  {
    "id": "tecnica_clasica_25_giant_swing",
    "sourceIndex": 25,
    "name": "Giant Swing",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 4,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 5,
    "rulesText": "Inflige 5 de daño. En Battle Royale puedes lanzar al objetivo contra otro personaje: ambos reciben 2 de daño adicional.",
    "conditions": [],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 5,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 2,
        "target": "CONTEXT"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 5 de daño. En Battle Royale puedes lanzar al objetivo contra otro personaje: ambos reciben 2 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 25
    }
  },
  {
    "id": "tecnica_clasica_26_meteor_crash",
    "sourceIndex": 26,
    "name": "Meteor Crash",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño. Si has realizado otro ataque físico este turno, inflige 3 de daño adicional.",
    "conditions": [
      "Si has realizado otro ataque físico este turno, inflige 3 de daño adicional."
    ],
    "targeting": "SELF",
    "duration": "TURN",
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño. Si has realizado otro ataque físico este turno, inflige 3 de daño adicional."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 26
    }
  },
  {
    "id": "tecnica_clasica_27_dragon_fist",
    "sourceIndex": 27,
    "name": "Dragon Fist",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 7,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 12,
    "rulesText": "Inflige 12 de daño e ignora 5 de Defensa. Si tienes 5 o menos de vida, hace +3 de daño.",
    "conditions": [
      "Si tienes 5 o menos de vida, hace +3 de daño."
    ],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 12,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 12 de daño e ignora 5 de Defensa. Si tienes 5 o menos de vida, hace +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 27
    }
  },
  {
    "id": "tecnica_clasica_28_arm_breaker",
    "sourceIndex": 28,
    "name": "Arm Breaker",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 3,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 4,
    "rulesText": "Inflige 4 de daño y aplica Debilitado. Si el objetivo ya está Debilitado, inflige +3 de daño.",
    "conditions": [
      "Si el objetivo ya está Debilitado, inflige +3 de daño."
    ],
    "targeting": "TARGET",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "FISICO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 4,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 4 de daño y aplica Debilitado. Si el objetivo ya está Debilitado, inflige +3 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 28
    }
  },
  {
    "id": "tecnica_clasica_29_rolling_satan_punch",
    "sourceIndex": 29,
    "name": "Rolling Satan Punch",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 2,
    "rarity": null,
    "raceRestriction": null,
    "nature": "FISICO",
    "range": "CERCANIA",
    "damage": 3,
    "rulesText": "Inflige 3 de daño. Lanza un dado: con 5-6, roba 2 cartas; con 1, recibes 1 de daño.",
    "conditions": [],
    "targeting": "SELF",
    "duration": null,
    "keywords": [
      "CERCANIA",
      "DADOS",
      "FISICO",
      "ROBO"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 3,
        "target": "TARGET"
      },
      {
        "type": "DRAW",
        "amount": 2,
        "target": "SELF"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 3 de daño. Lanza un dado: con 5-6, roba 2 cartas; con 1, recibes 1 de daño."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 29
    }
  },
  {
    "id": "tecnica_clasica_30_sokidan_persecucion",
    "sourceIndex": 30,
    "name": "Sokidan: Persecución",
    "cardType": "TECNICA",
    "sourceType": "Técnica clásica",
    "cost": 5,
    "rarity": null,
    "raceRestriction": null,
    "nature": "KI",
    "range": "DISTANCIA",
    "damage": 6,
    "rulesText": "Inflige 6 de daño. Si el objetivo esquiva o evita el ataque, puedes redirigirlo inmediatamente a otro personaje.",
    "conditions": [
      "Si el objetivo esquiva o evita el ataque, puedes redirigirlo inmediatamente a otro personaje."
    ],
    "targeting": "OTHER",
    "duration": null,
    "keywords": [
      "DISTANCIA",
      "KI"
    ],
    "structuredEffects": [
      {
        "type": "DAMAGE",
        "amount": 6,
        "target": "TARGET"
      },
      {
        "type": "RULE_TEXT",
        "text": "Inflige 6 de daño. Si el objetivo esquiva o evita el ataque, puedes redirigirlo inmediatamente a otro personaje."
      }
    ],
    "upgrade": null,
    "source": {
      "document": "CATALOGO_COMPLETO_CARTAS.docx",
      "tableIndex": 19,
      "rowIndex": 30
    }
  }
]