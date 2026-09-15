# Card Engine

Las cartas conservan su texto literal en `rulesText`. Cada una contiene efectos estructurados (`DAMAGE`, `HEAL`, `STATUS` o `RULE_TEXT`). El motor paga Ki, valida raza y aplica handlers reutilizables. `RULE_TEXT` cubre reglas de misión, saga, escenario, permanente, reacción y manipulación que permanecen representadas sin alterar el texto fuente y están disponibles a la UI/motor para resolución contextual.
