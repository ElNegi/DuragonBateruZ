/* data.js
   Catálogo de cartas y razas.
   -------------------------------------------------------------------------
   CAMBIO DE ARQUITECTURA (ver instrucciones del arquitecto):
   - `costo` ya NO es un array de valores de dado a emparejar; es un número
     único de ENERGÍA. La energía disponible es la suma de los dados
     lanzados (`Total`), y se resta directamente al jugar la carta.
   - Cada carta tiene `clase`: 'Ataque' | 'Defensa' | 'Cura' | 'Transformación'
     (para UI/clasificación) y `tipoEfecto`: 'ataque' | 'defensa' | 'cura'
     (para resolver el efecto en game.js — las Transformaciones usan el
     mismo canal de efecto que su clase dominante, solo que son más
     potentes y exclusivas de su raza).
   - `raza`: 'Saiyan' | 'Freezer' | 'Namek' | 'Neutral'. Las cartas de
     clase 'Transformación' NUNCA son Neutrales: son exclusivas de su raza.
   - Nombres únicos y temáticos (sin generadores "Carta N").
*/
(function(){

  window.CONFIG_ASSETS = {
    razas: {
      Saiyan: 'https://i.imgur.com/G5lR0u4.png',
      Freezer: 'https://i.imgur.com/J3T4z9x.png',
      Namek: 'https://i.imgur.com/8yVn0K6.png'
    },
    nodos: {
      Combate: 'https://cdn-icons-png.flaticon.com/512/1046/1046874.png',
      Tienda: 'https://cdn-icons-png.flaticon.com/512/3081/3081986.png',
      Entrenamiento: 'https://cdn-icons-png.flaticon.com/512/2936/2936968.png',
      Maestro: 'https://cdn-icons-png.flaticon.com/512/3069/3069187.png'
    }
  };

  // Fábrica simple: homogeneiza los campos de cada carta.
  function C(nombre, clase, raza, costo, tipoEfecto, valorEfecto, descripcion){
    var efectoTexto;
    if(tipoEfecto === 'ataque') efectoTexto = descripcion || ('Inflige ' + valorEfecto + ' de daño');
    else if(tipoEfecto === 'defensa') efectoTexto = descripcion || ('Bloquea ' + valorEfecto + ' de daño');
    else if(tipoEfecto === 'cura') efectoTexto = descripcion || ('Cura ' + valorEfecto + ' HP');
    else efectoTexto = descripcion || '';
    return {
      nombre: nombre,
      clase: clase,               // Ataque | Defensa | Cura | Transformación
      tipoCarta: clase,           // alias retro-compatible (usado por UI existente)
      raza: raza,                 // Saiyan | Freezer | Namek | Neutral
      tipo: raza,                 // alias retro-compatible (color de carta en UI)
      costo: costo,               // NÚMERO de energía (ya no array de dados)
      tipoEfecto: tipoEfecto,     // ataque | defensa | cura
      valorEfecto: valorEfecto,
      efecto: efectoTexto
    };
  }

  // ---------------------------------------------------------------------
  // SAIYAN — daño directo, agresivo, transformaciones ofensivas
  // ---------------------------------------------------------------------
  var Saiyan = [
    C('Puñetazo Saiyan',     'Ataque', 'Saiyan', 2, 'ataque', 5),
    C('Patada Giratoria',    'Ataque', 'Saiyan', 3, 'ataque', 7),
    C('Instinto de Combate', 'Defensa','Saiyan', 2, 'defensa', 5),
    C('Grito de Guerra',     'Cura',   'Saiyan', 3, 'cura', 6),
    C('Onda Vital',          'Ataque', 'Saiyan', 4, 'ataque', 9),
    C('Piel de Batalla',     'Defensa','Saiyan', 3, 'defensa', 7),
    C('Oozaru',              'Transformación', 'Saiyan', 5, 'ataque', 12, 'Se transforma y arrasa: inflige 12 de daño'),
    C('Super Saiyan',        'Transformación', 'Saiyan', 6, 'ataque', 14, 'El aura dorada estalla: inflige 14 de daño')
  ];

  // ---------------------------------------------------------------------
  // FREEZER — táctico: control y defensa, daño moderado
  // ---------------------------------------------------------------------
  var Freezer = [
    C('Disparo de Muerte',   'Ataque', 'Freezer', 2, 'ataque', 4),
    C('Rayo Ocular',         'Ataque', 'Freezer', 3, 'ataque', 5),
    C('Campo de Fuerza',     'Defensa','Freezer', 2, 'defensa', 6),
    C('Regeneración Celular','Cura',   'Freezer', 3, 'cura', 8),
    C('Golpe Preciso',       'Ataque', 'Freezer', 3, 'ataque', 5),
    C('Escudo de Energía',   'Defensa','Freezer', 2, 'defensa', 5),
    C('Forma Final',         'Transformación', 'Freezer', 5, 'defensa', 12, 'Alcanza su forma final: bloquea 12 de daño'),
    C('100% de Poder',       'Transformación', 'Freezer', 6, 'ataque', 13, 'Libera todo su poder: inflige 13 de daño')
  ];

  // ---------------------------------------------------------------------
  // NAMEK — soporte y curación, transformaciones defensivas/curativas
  // ---------------------------------------------------------------------
  var Namek = [
    C('Látigo Extensible',       'Ataque', 'Namek', 2, 'ataque', 4),
    C('Cañón Namekiano',         'Ataque', 'Namek', 4, 'ataque', 8),
    C('Escudo de Voluntad',      'Defensa','Namek', 2, 'defensa', 5),
    C('Lágrima de Namek',        'Cura',   'Namek', 2, 'cura', 7),
    C('Agua Sagrada',            'Cura',   'Namek', 4, 'cura', 12),
    C('Regeneración Namekiana',  'Defensa','Namek', 3, 'defensa', 6),
    C('Namekiano Gigante',       'Transformación', 'Namek', 5, 'cura', 16, 'Crece a tamaño gigante y se regenera: cura 16 HP'),
    C('Fusión con el Anciano',   'Transformación', 'Namek', 6, 'defensa', 14, 'Se fusiona con el Anciano: bloquea 14 de daño')
  ];

  // ---------------------------------------------------------------------
  // NEUTRALES — comunes a cualquier raza, nunca Transformación
  // ---------------------------------------------------------------------
  var Neutrales = [
    C('Golpe Rápido',        'Ataque', 'Neutral', 1, 'ataque', 3),
    C('Ataque en Cadena',    'Ataque', 'Neutral', 3, 'ataque', 6),
    C('Barrera Improvisada', 'Defensa','Neutral', 1, 'defensa', 3),
    C('Postura Defensiva',   'Defensa','Neutral', 2, 'defensa', 5),
    C('Senzu',               'Cura',   'Neutral', 3, 'cura', 10),
    C('Vendaje de Combate',  'Cura',   'Neutral', 1, 'cura', 4),
    C('Golpe Certero',       'Ataque', 'Neutral', 2, 'ataque', 4),
    C('Concentración',       'Defensa','Neutral', 2, 'defensa', 4)
  ];

  window.CARD_POOL = {
    Saiyan: Saiyan,
    Freezer: Freezer,
    Namek: Namek,
    Neutral: Neutrales
  };

  // Compatibilidad retro con código que aún lea window.CartasData
  window.CartasData = {
    Rojo: Saiyan, Verde: Namek, Azul: Freezer, Neutrales: Neutrales
  };

  window.RACES = [
    { nombre: 'Saiyan',  ventaja: 'Ataques fuertes y daño directo' },
    { nombre: 'Freezer', ventaja: 'Mazo táctico: control y defensa' },
    { nombre: 'Namek',   ventaja: 'Mejor curación y soporte' }
  ];

})();
