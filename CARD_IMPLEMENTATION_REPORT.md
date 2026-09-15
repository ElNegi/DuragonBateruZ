# Card Implementation Report

Las 370 cartas fueron importadas desde el Word sin editar nombres, costes ni texto de efecto. Las cartas numéricas se expresan con handlers DAMAGE, HEAL y STATUS. Las reglas condicionales, permanentes, búsquedas, cambios de objetivo, modificadores y ventanas de reacción se mantienen literalmente en `RULE_TEXT` y se interpretan por los sistemas de combate correspondientes. No se ha inventado contenido; el texto fuente queda preservado como autoridad.
