/* game.js
   ---------------------------------------------------------------------
   REESCRITURA — motor de combate tipo Inscryption:

   1) El enemigo YA NO usa cartas ni mano: tiene un `pattern` fijo
      (array cíclico de {tipo:'ataque'|'bloqueo'|'cura', valor}) que
      viene ya escalado desde map.js (pickEnemyForNode).
   2) Al terminar el turno del jugador (botón "Terminar"), el sistema
      EJECUTA el movimiento que estaba telegrafiado y avanza el índice
      del patrón; acto seguido, ANTES de que el jugador vuelva a jugar,
      se calcula y se muestra el aviso (icono + valor) del SIGUIENTE
      movimiento, que quedará visible durante todo el turno del
      jugador para que pueda reaccionar (jugar defensa, curarse, etc.)
      antes de que se resuelva al terminar ese turno.
   3) HP y Oro del jugador son persistentes durante toda la expedición
      (window.CURRENT_USER.hp / .maxHp / .gold), no se resetean en cada
      combate — solo se restauran al elegir raza (nueva partida).
   4) El mapa ahora incluye nodos Élite, Jefe, Descanso, Tienda y
      Evento, cada uno con su propia pantalla/acción.
*/
(function(){

  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    return arr;
  }

  // ------------------------------------------------------------------
  // Player (jugador humano) — conserva mazo, mano, dados y energía.
  // ------------------------------------------------------------------
  // Daño Base de Personaje por defecto (re-tuning): toda carta de
  // ataque inflige Daño Base + Valor Carta, y el Golpe Básico de
  // emergencia inflige exactamente el Daño Base.
  var DAMAGE_BASE_DEFAULT = 2;

  function Player(opts){
    this.name = opts.name || 'Player';
    this.race = opts.race || 'Saiyan';
    this.health = opts.health || 100;
    this._maxHealth = opts.maxHealth || this.health;
    this.shield = 0;
    this.diceCount = 1;
    this.dice = [];
    this.energy = 0;
    this.deck = [];
    this.hand = [];
    this.discard = [];
    this.baseDamage = (opts.baseDamage != null) ? opts.baseDamage : DAMAGE_BASE_DEFAULT;
  }

  // ------------------------------------------------------------------
  // Enemy — SIN cartas, SIN mano, SIN dados. Solo HP y un patrón fijo
  // de movimientos que se telegrafían y ejecutan por turno.
  // ------------------------------------------------------------------
  function Enemy(opts){
    this.name = opts.name || 'Enemigo';
    this.race = opts.race || 'Freezer';
    this.health = opts.health || 50;
    this._maxHealth = opts.health || 50;
    this.shield = 0;
    this.pattern = (opts.pattern && opts.pattern.length) ? opts.pattern : [{ tipo:'ataque', valor:5 }];
    this.patternIndex = 0;
    this.elite = !!opts.elite;
    this.boss = !!opts.boss;
  }
  Enemy.prototype.intentoActual = function(){
    return this.pattern[this.patternIndex % this.pattern.length];
  };
  Enemy.prototype.avanzarPatron = function(){
    this.patternIndex = (this.patternIndex + 1) % this.pattern.length;
  };

  // ------------------------------------------------------------------
  // Game orchestrator
  // ------------------------------------------------------------------
  function Game(){
    this.players = [];       // [jugador, enemigo] — se mantiene por compat. con render()
    this.jugador = null;
    this.enemigo = null;
    this.round = 1;
    this.combateActivo = false;
    this.combatLog = [];
    this.mapNodes = [];
    this.currentNodeIndex = 0;
  }

  var RACE_EMOJI = { Saiyan: '🥊', Freezer: '🧊', Namek: '🌱' };
  function raceEmoji(race){ return RACE_EMOJI[race] || '👤'; }
  function raceColorClass(raza){ return (raza || 'neutral').toString().toLowerCase(); }

  var INTENT_ICON = { ataque: '⚔️', bloqueo: '🛡️', cura: '💚' };
  var INTENT_LABEL = { ataque: 'Ataca por', bloqueo: 'Se protege por', cura: 'Se cura por' };

  // ==================================================================
  // 0) MENÚ PRINCIPAL — punto de entrada tras iniciar sesión
  // ==================================================================
  Game.prototype.showMainMenu = function(){
    var user = window.CURRENT_USER || {};
    var nameEl = document.getElementById('menuHeroName');
    var avatarEl = document.getElementById('menuHeroAvatar');
    if(nameEl) nameEl.textContent = user.name || 'Jugador';
    if(avatarEl) avatarEl.textContent = user.race ? raceEmoji(user.race) : '🥋';

    // Si ya hay una expedición en curso (raza elegida y mazo construido),
    // el botón invita a continuarla en vez de a empezar una nueva.
    var expDesc = document.querySelector('#modeExpedicion .mode-desc');
    var enExpedicion = !!(user.race && user.activeDeck && user.activeDeck.length);
    if(expDesc) expDesc.textContent = enExpedicion
      ? 'Continúa tu expedición en curso (' + user.race + ')'
      : 'Explora la caverna, lucha y construye tu mazo';

    this.showScreen('menu');
  };

  // Modo Expedición: si ya existe una partida en curso, vuelve al mapa;
  // si no, arranca la selección de raza (nueva partida).
  Game.prototype.startExpedicion = function(){
    var user = window.CURRENT_USER || {};
    if(user.race && user.activeDeck && user.activeDeck.length){
      this.initMap();
    } else {
      this.initRaceSelect();
    }
  };

  // Modos aún no implementados: solo informan y mantienen al jugador en
  // el Menú Principal.
  Game.prototype.modoProximamente = function(nombreModo){
    this.showMenuToast(nombreModo + ' — Próximamente');
  };

  Game.prototype.showMenuToast = function(texto){
    var el = document.getElementById('menuToast');
    if(!el) return;
    el.textContent = texto;
    el.classList.remove('hidden');
    if(this._menuToastTimer) clearTimeout(this._menuToastTimer);
    var self = this;
    this._menuToastTimer = setTimeout(function(){ el.classList.add('hidden'); self._menuToastTimer = null; }, 1600);
  };

  // "Salir de la partida": vuelve al Menú Principal en cualquier momento,
  // sin cerrar sesión. Si había un combate activo, se abandona de forma
  // segura (se conserva el HP alcanzado y el nodo vuelve a quedar
  // disponible para reintentarlo).
  Game.prototype.exitToMainMenu = function(){
    if(this.combateActivo){
      if(this.jugador && window.CURRENT_USER){
        window.CURRENT_USER.hp = Math.max(1, this.jugador.health);
      }
      var idx = this.currentNodeIndex || 0;
      if(this.mapNodes && this.mapNodes[idx] && this.mapNodes[idx].estado === 'in-progress'){
        this.mapNodes[idx].estado = 'disponible';
      }
      this.combateActivo = false;
    }
    this.cerrarFicha();
    this.cerrarMenuBatalla();
    var logDrawer = document.getElementById('logDrawer'); if(logDrawer) logDrawer.classList.add('hidden');
    var logScrim = document.getElementById('logScrim'); if(logScrim) logScrim.classList.add('hidden');
    this.showMainMenu();
  };

  // Menú contextual dentro de la batalla (botón ☰): ofrece salir de la
  // partida o cerrar sesión sin tener que abandonar la pantalla actual
  // a ciegas.
  Game.prototype.abrirMenuBatalla = function(){
    var drawer = document.getElementById('gameMenuDrawer');
    var scrim = document.getElementById('gameMenuScrim');
    if(drawer) drawer.classList.remove('hidden');
    if(scrim) scrim.classList.remove('hidden');
  };

  Game.prototype.cerrarMenuBatalla = function(){
    var drawer = document.getElementById('gameMenuDrawer');
    var scrim = document.getElementById('gameMenuScrim');
    if(drawer) drawer.classList.add('hidden');
    if(scrim) scrim.classList.add('hidden');
  };

  // ==================================================================
  // 1) SELECCIÓN DE RAZA — menú visual, una vez por partida
  // ==================================================================
  Game.prototype.initRaceSelect = function(){
    this.showScreen('race');
    this.renderRaceOptions();
  };

  Game.prototype.renderRaceOptions = function(){
    var container = document.getElementById('raceOptions');
    if(!container) return;
    container.innerHTML = '';
    var self = this;
    (window.RACES || []).forEach(function(r){
      var el = document.createElement('button');
      el.type = 'button';
      el.className = 'race-card';
      var avatar = document.createElement('div'); avatar.className = 'race-avatar'; avatar.textContent = raceEmoji(r.nombre);
      var name = document.createElement('div'); name.className = 'race-name'; name.textContent = r.nombre;
      var desc = document.createElement('div'); desc.className = 'race-desc'; desc.textContent = r.ventaja;
      el.appendChild(avatar); el.appendChild(name); el.appendChild(desc);
      el.addEventListener('click', function(){ self.selectRace(r.nombre); });
      container.appendChild(el);
    });
  };

  Game.prototype.selectRace = function(name){
    window.CURRENT_USER = window.CURRENT_USER || {};
    window.CURRENT_USER.name = window.CURRENT_USER.name || 'Admin';
    window.CURRENT_USER.race = name;
    this.buildStarterCollection(name);
    this.actualizarLog('Raza seleccionada: ' + name + '. Mazo inicial listo.');
    this.mapNodes = [];
    this.currentNodeIndex = 0;
    this.initMap();
  };

  // Construye la colección inicial del jugador (mazo activo + banquillo)
  // y sus estadísticas persistentes de expedición: HP máximo, HP actual
  // y Oro.
  Game.prototype.buildStarterCollection = function(race){
    var pool = (window.CARD_POOL && window.CARD_POOL[race]) || [];
    var neutral = (window.CARD_POOL && window.CARD_POOL.Neutral) || [];
    var active = pool.slice(0, 4).concat(neutral.slice(0, 4));
    var bench = pool.slice(4, 6).concat(neutral.slice(4, 6));
    window.CURRENT_USER.activeDeck = active;
    window.CURRENT_USER.bench = bench;
    window.CURRENT_USER.diceCount = 1;
    window.CURRENT_USER.maxHp = 100;   // HP Máximo inicial (sube +10 al vencer un Jefe)
    window.CURRENT_USER.hp = 100;      // HP actual, persistente entre nodos
    window.CURRENT_USER.gold = 50;     // Oro inicial de la expedición
    window.CURRENT_USER.baseDamage = DAMAGE_BASE_DEFAULT; // Daño Base de Personaje, persistente
  };

  // ==================================================================
  // 2) GESTIÓN DE MAZOS — fuera de combate
  // ==================================================================
  Game.prototype.openDeckManager = function(){
    this.showScreen('deck');
    this.renderDeckScreen();
  };

  Game.prototype.renderDeckScreen = function(){
    var user = window.CURRENT_USER || {};
    var active = user.activeDeck || [];
    var bench = user.bench || [];

    var activeCountEl = document.getElementById('activeCount');
    var benchCountEl = document.getElementById('benchCount');
    if(activeCountEl) activeCountEl.textContent = active.length + ' / 16';
    if(benchCountEl) benchCountEl.textContent = bench.length + ' / 4';

    var activeList = document.getElementById('activeDeckList');
    var benchList = document.getElementById('benchDeckList');
    if(!activeList || !benchList) return;
    activeList.innerHTML = '';
    benchList.innerHTML = '';
    var self = this;

    function row(carta, fromActive){
      var el = document.createElement('div'); el.className = 'deck-row';
      var info = document.createElement('div'); info.className = 'deck-row-info';
      var title = document.createElement('div'); title.className = 'deck-row-title'; title.textContent = carta.nombre;
      var meta = document.createElement('div'); meta.className = 'deck-row-meta';
      meta.textContent = carta.clase + ' · ' + carta.raza + ' · Coste ' + carta.costo;
      info.appendChild(title); info.appendChild(meta);
      var btn = document.createElement('button'); btn.className = 'deck-row-btn';
      btn.type = 'button';
      btn.textContent = fromActive ? '→ Banquillo' : '→ Activo';
      btn.addEventListener('click', function(){
        if(fromActive) self.moverABanquillo(carta); else self.moverAActivo(carta);
      });
      el.appendChild(info); el.appendChild(btn);
      return el;
    }

    if(active.length === 0){ activeList.innerHTML = '<div class="deck-empty">Sin cartas activas.</div>'; }
    else active.forEach(function(c){ activeList.appendChild(row(c, true)); });

    if(bench.length === 0){ benchList.innerHTML = '<div class="deck-empty">Banquillo vacío.</div>'; }
    else bench.forEach(function(c){ benchList.appendChild(row(c, false)); });
  };

  Game.prototype.moverABanquillo = function(carta){
    var user = window.CURRENT_USER;
    if(!user || !user.activeDeck || !user.bench) return;
    if(user.bench.length >= 4){ this.actualizarLog('El banquillo está lleno (máx. 4 cartas).'); return; }
    var idx = user.activeDeck.indexOf(carta);
    if(idx === -1) return;
    user.activeDeck.splice(idx, 1);
    user.bench.push(carta);
    this.renderDeckScreen();
  };

  Game.prototype.moverAActivo = function(carta){
    var user = window.CURRENT_USER;
    if(!user || !user.activeDeck || !user.bench) return;
    if(user.activeDeck.length >= 16){ this.actualizarLog('El mazo activo está lleno (máx. 16 cartas).'); return; }
    var idx = user.bench.indexOf(carta);
    if(idx === -1) return;
    user.bench.splice(idx, 1);
    user.activeDeck.push(carta);
    this.renderDeckScreen();
  };

  // ==================================================================
  // Pantallas / UI general
  // ==================================================================
  Game.prototype.showScreen = function(name){
    var login = document.getElementById('loginScreen');
    var menu = document.getElementById('menuScreen');
    var race = document.getElementById('raceScreen');
    var map = document.getElementById('mapScreen');
    var deck = document.getElementById('deckScreen');
    var battle = document.getElementById('gameScreen');
    var event = document.getElementById('eventScreen');
    [login, menu, race, map, deck, battle, event].forEach(function(el){ if(el) el.classList.add('hidden'); });
    var target;
    if(name === 'login') target = login;
    else if(name === 'menu') target = menu;
    else if(name === 'race') target = race;
    else if(name === 'map') target = map;
    else if(name === 'deck') target = deck;
    else if(name === 'event') target = event;
    else target = battle;
    if(target) target.classList.remove('hidden');
  };

  Game.prototype.showStatusBanner = function(text){
    var el = document.getElementById('statusBanner');
    if(!el) return;
    el.textContent = text;
    el.classList.remove('hidden');
    if(this._statusTimer) clearTimeout(this._statusTimer);
    var self = this;
    this._statusTimer = setTimeout(function(){ el.classList.add('hidden'); self._statusTimer = null; }, 1500);
  };

  Game.prototype.actualizarLog = function(mensaje){
    this.combatLog = this.combatLog || [];
    var text = typeof mensaje === 'string' ? mensaje : JSON.stringify(mensaje);
    this.combatLog.push({ text: text, time: Date.now() });
    var container = document.getElementById('combatLog');
    if(!container) return;
    var el = document.createElement('div');
    el.textContent = '[' + (new Date()).toLocaleTimeString() + '] ' + text;
    container.appendChild(el);
    container.scrollTop = container.scrollHeight;
  };

  // ==================================================================
  // Mapa de expedición
  // ==================================================================
  var NODE_EMOJI = { Combate: '⚔️', Elite: '💀', Jefe: '👑', Tienda: '🛒', Descanso: '🔥', Evento: '❓' };

  Game.prototype.initMap = function(){
    if(!this.mapNodes || this.mapNodes.length === 0){
      this.mapNodes = window.generarMapa ? window.generarMapa(35) : [];
      this.currentNodeIndex = 0;
    }
    var user = window.CURRENT_USER || {};
    var nameEl = document.getElementById('mapHeroName');
    var raceEl = document.getElementById('mapHeroRace');
    var avatarEl = document.getElementById('mapHeroAvatar');
    var goldEl = document.getElementById('mapHeroGold');
    var hpEl = document.getElementById('mapHeroHp');
    if(nameEl) nameEl.textContent = user.name || 'Jugador';
    if(raceEl) raceEl.textContent = user.race || '—';
    if(avatarEl) avatarEl.textContent = raceEmoji(user.race);
    if(goldEl) goldEl.textContent = '💰 ' + (user.gold || 0);
    if(hpEl) hpEl.textContent = '❤️ ' + (user.hp != null ? user.hp : '—') + '/' + (user.maxHp || '—');
    var dmgEl = document.getElementById('mapHeroDmg');
    if(dmgEl) dmgEl.textContent = '⚔️ Base +' + (user.baseDamage != null ? user.baseDamage : 2);
    this.showScreen('map');
    this.renderMapa();
  };

  Game.prototype.renderMapa = function(){
    var container = document.getElementById('mapNodes');
    if(!container) return;
    if(!this.mapNodes || this.mapNodes.length === 0){
      this.mapNodes = window.generarMapa ? window.generarMapa(35) : [];
    }
    container.innerHTML = '';
    var self = this;
    var progressEl = document.getElementById('mapProgress');
    var completedCount = this.mapNodes.filter(function(n){ return n.estado === 'completado'; }).length;
    if(progressEl) progressEl.textContent = 'Nodo ' + (completedCount + 1) + ' / ' + this.mapNodes.length;

    this.mapNodes.forEach(function(n, idx){
      var el = document.createElement('button');
      el.className = 'map-node node-type-' + n.tipo.toLowerCase();
      el.dataset.index = idx;
      if(n.estado === 'bloqueado') el.classList.add('locked');
      else if(n.estado === 'completado') el.classList.add('completed');
      else el.classList.add('available');

      var orb = document.createElement('div'); orb.className = 'node-orb';
      orb.textContent = NODE_EMOJI[n.tipo] || '❔';
      var label = document.createElement('div'); label.className = 'node-label';
      label.textContent = (idx + 1) + '. ' + n.tipo;
      var state = document.createElement('div'); state.className = 'node-state-tag';
      state.textContent = n.estado + (n.acto ? ' · Acto ' + n.acto : '');

      el.appendChild(orb); el.appendChild(label); el.appendChild(state);
      el.addEventListener('click', function(){ self.onNodeClick(idx); });
      container.appendChild(el);
    });
  };

  Game.prototype.onNodeClick = function(idx){
    var node = this.mapNodes && this.mapNodes[idx];
    if(!node) return;
    if(node.estado !== 'disponible'){
      this.actualizarLog('Nodo no disponible: ' + node.tipo);
      return;
    }
    this.currentNodeIndex = idx;

    if(node.tipo === 'Combate' || node.tipo === 'Elite' || node.tipo === 'Jefe'){
      node.estado = 'in-progress';
      var enemyData = window.pickEnemyForNode ? window.pickEnemyForNode(node, this.mapNodes.length) : { name:'CPU', race:'Freezer', health:50, pattern:[{tipo:'ataque',valor:5}] };
      this.actualizarLog('Iniciando combate contra ' + enemyData.name + ' (HP ' + enemyData.health + ')' + (node.tipo !== 'Combate' ? ' — nodo ' + node.tipo : ''));
      this.iniciarPartida(enemyData);
    } else if(node.tipo === 'Descanso'){
      this.abrirDescanso(node);
    } else if(node.tipo === 'Tienda'){
      this.abrirTienda(node);
    } else if(node.tipo === 'Evento'){
      this.abrirEvento(node);
    } else {
      this.actualizarLog('Nodo ' + node.tipo + ' seleccionado (acción no implementada)');
    }
  };

  Game.prototype.handleNodeCompletion = function(){
    var idx = this.currentNodeIndex || 0;
    if(!this.mapNodes || !this.mapNodes[idx]) return;
    this.mapNodes[idx].estado = 'completado';
    if(this.mapNodes[idx + 1]) this.mapNodes[idx + 1].estado = 'disponible';
    this.actualizarLog('Nodo ' + (idx + 1) + ' completado. Desbloqueado siguiente nodo.');
    this.renderMapa();
  };

  // ==================================================================
  // 2b) NODOS ESPECIALES — Descanso / Tienda / Evento
  // ==================================================================
  Game.prototype.showEventScreen = function(cfg){
    this.showScreen('event');
    var titleEl = document.getElementById('eventTitle'); if(titleEl) titleEl.textContent = cfg.title;
    var iconEl = document.getElementById('eventIcon'); if(iconEl) iconEl.textContent = cfg.icon;
    var descEl = document.getElementById('eventDesc'); if(descEl) descEl.textContent = cfg.desc;
    var optsEl = document.getElementById('eventOptions');
    if(optsEl){
      optsEl.innerHTML = '';
      var self = this;
      (cfg.options || []).forEach(function(opt){
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'btn-primary';
        btn.textContent = opt.label;
        btn.addEventListener('click', function(){ opt.action(self); });
        optsEl.appendChild(btn);
      });
    }
  };

  // ---- Descanso (Hoguera): curar 20 HP o mejorar una carta ----------
  Game.prototype.abrirDescanso = function(node){
    var self = this;
    this.showEventScreen({
      icon: '🔥', title: 'Hoguera',
      desc: 'Un remanso de calma en la caverna. Puedes curar 20 HP o potenciar una carta de tu mazo activo.',
      options: [
        { label: 'Curar 20 HP', action: function(s){ s.aplicarDescansoCurar(); } },
        { label: 'Mejorar una carta', action: function(s){ s.abrirMejoraCarta(); } },
        { label: 'Salir sin actuar', action: function(s){ s.initMap(); } }
      ]
    });
  };

  Game.prototype.aplicarDescansoCurar = function(){
    var user = window.CURRENT_USER;
    var antes = user.hp;
    user.hp = Math.min(user.maxHp, (user.hp || 0) + 20);
    this.actualizarLog('Descansas junto a la hoguera y recuperas ' + (user.hp - antes) + ' HP.');
    this.handleNodeCompletion();
    this.initMap();
  };

  Game.prototype.abrirMejoraCarta = function(){
    var user = window.CURRENT_USER;
    var self = this;
    var opciones = (user.activeDeck || []).map(function(carta){
      return { label: 'Mejorar ' + carta.nombre + ' (' + carta.efecto + ')', action: function(s){ s.mejorarCarta(carta); } };
    });
    if(opciones.length === 0) opciones.push({ label: 'No hay cartas para mejorar', action: function(s){ s.initMap(); } });
    this.showEventScreen({
      icon: '✨', title: 'Mejorar Carta',
      desc: 'Elige una carta de tu mazo activo para potenciarla permanentemente.',
      options: opciones
    });
  };

  Game.prototype.mejorarCarta = function(carta){
    carta.valorEfecto = Math.round(carta.valorEfecto * 1.25);
    if(carta.tipoEfecto === 'ataque') carta.efecto = 'Inflige ' + carta.valorEfecto + ' de daño (mejorada)';
    else if(carta.tipoEfecto === 'defensa') carta.efecto = 'Bloquea ' + carta.valorEfecto + ' de daño (mejorada)';
    else if(carta.tipoEfecto === 'cura') carta.efecto = 'Cura ' + carta.valorEfecto + ' HP (mejorada)';
    this.actualizarLog(carta.nombre + ' ha sido mejorada.');
    this.handleNodeCompletion();
    this.initMap();
  };

  // ---- Tienda: comprar cartas con oro --------------------------------
  Game.prototype.abrirTienda = function(node){
    var user = window.CURRENT_USER;
    if(!node.oferta){
      var pool = ((window.CARD_POOL && window.CARD_POOL[user.race]) || []).concat((window.CARD_POOL && window.CARD_POOL.Neutral) || []);
      node.oferta = shuffle(pool.slice()).slice(0, 3);
    }
    var self = this;
    var opciones = node.oferta.map(function(carta){
      var precio = carta.costo * 8 + 10;
      return {
        label: carta.nombre + ' — ' + precio + ' 💰 (' + carta.efecto + ')',
        action: function(s){ s.comprarCarta(node, carta, precio); }
      };
    });
    opciones.push({ label: 'Salir de la tienda', action: function(s){ s.handleNodeCompletion(); s.initMap(); } });
    this.showEventScreen({
      icon: '🛒', title: 'Tienda',
      desc: 'Oro disponible: ' + (user.gold || 0) + ' 💰',
      options: opciones
    });
  };

  Game.prototype.comprarCarta = function(node, carta, precio){
    var user = window.CURRENT_USER;
    if((user.gold || 0) < precio){
      this.actualizarLog('No tienes suficiente oro para ' + carta.nombre + '.');
      this.abrirTienda(node);
      return;
    }
    user.gold -= precio;
    if(user.activeDeck.length < 16) user.activeDeck.push(carta);
    else if(user.bench.length < 4) user.bench.push(carta);
    else { this.actualizarLog('Mazo y banquillo llenos: no se pudo añadir ' + carta.nombre + '.'); }
    node.oferta = node.oferta.filter(function(c){ return c !== carta; });
    this.actualizarLog('Compraste ' + carta.nombre + ' por ' + precio + ' de oro.');
    this.abrirTienda(node);
  };

  // ---- Evento: encuentro narrativo aleatorio -------------------------
  Game.prototype.abrirEvento = function(node){
    if(!node.resultado){
      var opciones = [
        { texto: 'Encuentras un manantial de energía vital: recuperas 15 HP.', efecto: function(u){ u.hp = Math.min(u.maxHp, u.hp + 15); } },
        { texto: 'Una emboscada te sorprende entre las rocas: pierdes 10 HP.', efecto: function(u){ u.hp = Math.max(1, u.hp - 10); } },
        { texto: 'Hallas oro perdido entre los escombros: +25 de oro.', efecto: function(u){ u.gold = (u.gold || 0) + 25; } },
        { texto: 'Un maestro errante te entrega una carta especial para tu banquillo.', efecto: function(u){
            var pool = (window.CARD_POOL && window.CARD_POOL[u.race]) || [];
            var carta = pool[Math.floor(Math.random() * pool.length)];
            if(carta && u.bench.length < 4) u.bench.push(carta);
          } }
      ];
      node.resultado = opciones[Math.floor(Math.random() * opciones.length)];
    }
    var self = this;
    this.showEventScreen({
      icon: '❓', title: 'Evento',
      desc: node.resultado.texto,
      options: [{ label: 'Continuar', action: function(s){
        node.resultado.efecto(window.CURRENT_USER);
        s.handleNodeCompletion();
        s.initMap();
      } }]
    });
  };

  // ==================================================================
  // 2c) FICHA TÉCNICA — popup persistente con stats + lista de mazo
  // ==================================================================
  // Disponible tanto en combate como fuera de él: si hay una partida de
  // combate activa se usan las stats "en vivo" del jugador (this.jugador);
  // si no, se cae a los datos persistentes de CURRENT_USER.
  Game.prototype.abrirFicha = function(){
    var user = window.CURRENT_USER || {};
    var player = this.jugador;

    var hp = player ? player.health : (user.hp != null ? user.hp : '—');
    var maxHp = player ? player._maxHealth : (user.maxHp != null ? user.maxHp : '—');
    var baseDmg = player ? player.baseDamage : (user.baseDamage != null ? user.baseDamage : 2);
    var dados = player ? (player.diceCount || 1) : (user.diceCount || 1);

    var statsEl = document.getElementById('fichaStats');
    if(statsEl){
      statsEl.innerHTML = '';
      [
        ['❤️ HP', hp + ' / ' + maxHp],
        ['⚔️ Daño Base', '+' + baseDmg],
        ['🎲 Dados totales', dados]
      ].forEach(function(par){
        var row = document.createElement('div'); row.className = 'ficha-stat-row';
        var k = document.createElement('span'); k.className = 'ficha-stat-key'; k.textContent = par[0];
        var v = document.createElement('span'); v.className = 'ficha-stat-val'; v.textContent = par[1];
        row.appendChild(k); row.appendChild(v);
        statsEl.appendChild(row);
      });
    }

    var listEl = document.getElementById('fichaDeckList');
    if(listEl){
      listEl.innerHTML = '';
      var deck = user.activeDeck || [];
      if(deck.length === 0){
        var vacio = document.createElement('li'); vacio.textContent = 'Mazo activo vacío.';
        listEl.appendChild(vacio);
      } else {
        deck.forEach(function(carta){
          var li = document.createElement('li');
          li.textContent = carta.nombre + ' — ' + carta.clase + ' · Coste ' + carta.costo;
          listEl.appendChild(li);
        });
      }
    }

    var modal = document.getElementById('fichaModal');
    var scrim = document.getElementById('fichaScrim');
    if(modal) modal.classList.remove('hidden');
    if(scrim) scrim.classList.remove('hidden');
  };

  Game.prototype.cerrarFicha = function(){
    var modal = document.getElementById('fichaModal');
    var scrim = document.getElementById('fichaScrim');
    if(modal) modal.classList.add('hidden');
    if(scrim) scrim.classList.add('hidden');
  };

  // ==================================================================
  // 3) COMBATE — patrón fijo de enemigo, telegrafiado con antelación
  // ==================================================================
  Game.prototype.iniciarPartida = function(enemyOpts){
    enemyOpts = enemyOpts || {};
    var user = window.CURRENT_USER || {};
    var playerName = user.name || 'Admin';
    var playerRace = user.race || (window.RACES && window.RACES[0] && window.RACES[0].nombre) || 'Saiyan';

    this.jugador = new Player({ name: playerName, race: playerRace, health: (user.hp != null ? user.hp : 100), maxHealth: user.maxHp || 100, baseDamage: (user.baseDamage != null ? user.baseDamage : DAMAGE_BASE_DEFAULT) });
    this.enemigo = new Enemy(enemyOpts);
    this.players = [this.jugador, this.enemigo]; // compat. con render()/renderHand()
    this.round = 1;
    this.combateActivo = true;

    this.jugador.diceCount = Math.max(1, user.diceCount || 1);

    // Mazo de combate del jugador = copia barajada de su MAZO ACTIVO.
    var playerActive = (user.activeDeck && user.activeDeck.length) ? user.activeDeck : ((window.CARD_POOL && window.CARD_POOL[playerRace]) || []).slice(0, 8);
    this.jugador.deck = shuffle(playerActive.slice());
    this.jugador.hand = [];
    this.jugador.discard = [];

    this.repartoInicial(this.jugador, 4);

    console.log('Combate inicializado. Jugador HP:', this.jugador.health, ' - Enemigo HP:', this.enemigo.health);

    this.showScreen('battle');
    this.mostrarIntent();
    // skipDraw=true: la mano ya tiene sus 4 cartas del reparto inicial.
    this.startPlayerTurn(true);
  };

  Game.prototype.render = function(){
    var turnLabelEl = document.getElementById('turnLabel');
    if(turnLabelEl) turnLabelEl.textContent = 'Ronda ' + this.round;

    var player = this.jugador;
    var enemy = this.enemigo;

    if(enemy){
      var enemyNameEl = document.getElementById('enemyName');
      var nombreConEscudo = enemy.name + ' (' + enemy.race + ')' + (enemy.shield > 0 ? ' 🛡️' + enemy.shield : '');
      if(enemyNameEl) enemyNameEl.textContent = nombreConEscudo;
      var enemyMax = enemy._maxHealth || (enemy._maxHealth = enemy.health);
      var enemyPct = Math.max(0, Math.min(100, Math.round((enemy.health / enemyMax) * 100)));
      var enemyFill = document.getElementById('enemyHpFill');
      if(enemyFill){ enemyFill.style.width = enemyPct + '%'; enemyFill.classList.toggle('low', enemyPct <= 25); }
      var enemyText = document.getElementById('enemyHpText');
      if(enemyText) enemyText.textContent = Math.max(0, enemy.health) + '/' + enemyMax;
      var enemyPortrait = document.getElementById('enemyPortrait');
      if(enemyPortrait) enemyPortrait.textContent = enemy.boss ? '👑' : (enemy.elite ? '💀' : (raceEmoji(enemy.race) === '👤' ? '👹' : raceEmoji(enemy.race)));
    }

    if(player){
      var playerMax = player._maxHealth || (player._maxHealth = player.health);
      var playerPct = Math.max(0, Math.min(100, Math.round((player.health / playerMax) * 100)));
      var playerFill = document.getElementById('playerHpFill');
      if(playerFill){ playerFill.style.width = playerPct + '%'; playerFill.classList.toggle('low', playerPct <= 25); }
      var playerText = document.getElementById('playerHpText');
      if(playerText) playerText.textContent = Math.max(0, player.health) + (player.shield > 0 ? ' 🛡️' + player.shield : '') + '/' + playerMax;
      var playerPortrait = document.getElementById('playerPortrait');
      if(playerPortrait) playerPortrait.textContent = raceEmoji(player.race);
      var deckBadge = document.getElementById('playerDeckBadge');
      if(deckBadge) deckBadge.textContent = '🂠 ' + (player.deck ? player.deck.length : 0);
      var baseDmgChip = document.getElementById('playerBaseDmgChip');
      if(baseDmgChip) baseDmgChip.textContent = '⚔️ Base +' + (player.baseDamage != null ? player.baseDamage : 0);

      // Golpe Básico: aparece SOLO cuando ninguna carta de la mano es
      // jugable con la energía actual, para que el jugador nunca se
      // quede sin poder actuar en su turno.
      var basicBtn = document.getElementById('basicStrikeBtn');
      if(basicBtn){
        var puedeJugarAlguna = (player.hand || []).some(function(c){ return (player.energy || 0) >= c.costo; });
        if(!puedeJugarAlguna){
          basicBtn.textContent = '🥊 Golpe Básico (+' + (player.baseDamage != null ? player.baseDamage : 0) + ')';
          basicBtn.classList.remove('hidden');
        } else {
          basicBtn.classList.add('hidden');
        }
      }
    }

    this.renderHand(this.jugador);
    this.renderDice();
  };

  Game.prototype.renderHand = function(player){
    var handEl = document.getElementById('hand');
    if(!handEl) return;
    handEl.innerHTML = '';
    player = player || this.jugador;
    if(!player) return;
    var self = this;

    (player.hand || []).forEach(function(cardObj, idx){
      var c = document.createElement('div'); c.className = 'card';
      c.dataset.handIndex = idx;
      c.classList.add('tipo-' + raceColorClass(cardObj.raza));
      if((player.energy || 0) < cardObj.costo) c.classList.add('no-energy');

      var title = document.createElement('div'); title.className = 'title'; title.textContent = cardObj.nombre || 'Carta';
      var meta = document.createElement('div'); meta.className = 'meta'; meta.textContent = cardObj.clase || cardObj.tipoCarta || '';
      var desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = cardObj.efecto || '';
      var costRow = document.createElement('div'); costRow.className = 'cost-row';
      var pip = document.createElement('span'); pip.className = 'cost-pip'; pip.textContent = cardObj.costo;
      costRow.appendChild(pip);

      c.appendChild(title); c.appendChild(meta); c.appendChild(desc); c.appendChild(costRow);
      handEl.appendChild(c);
    });

    if(!handEl.dataset.boundClick){
      handEl.dataset.boundClick = '1';
      handEl.addEventListener('click', function(e){
        var cardEl = e.target.closest('.card');
        if(!cardEl) return;
        var idx = parseInt(cardEl.dataset.handIndex, 10);
        if(isNaN(idx)) return;
        if(!self.combateActivo || !self.jugador) return;
        var card = self.jugador.hand[idx];
        if(!card) return;
        self.jugarCarta(card, cardEl);
      });
    }
  };

  Game.prototype.renderDice = function(){
    var diceEl = document.getElementById('dice');
    var player = this.jugador;

    if(diceEl){
      diceEl.innerHTML = '';
      (player && player.dice || []).forEach(function(v){
        var el = document.createElement('div'); el.className = 'die';
        el.textContent = v;
        diceEl.appendChild(el);
      });
    }

    var energy = player ? (player.energy || 0) : 0;
    var totalEl = document.getElementById('diceTotal');
    if(totalEl) totalEl.textContent = 'Energía: ' + energy;

    var fillEl = document.getElementById('energyFill');
    if(fillEl){
      var maxPosible = Math.max(1, (player && player.diceCount || 1) * 6);
      var pct = Math.max(0, Math.min(100, Math.round((energy / maxPosible) * 100)));
      fillEl.style.width = pct + '%';
    }
  };

  Game.prototype.sumDice = function(player){
    player = player || this.jugador;
    if(!player || !Array.isArray(player.dice)) return 0;
    return player.dice.reduce(function(acc, v){ return acc + (typeof v === 'number' ? v : 0); }, 0);
  };

  Game.prototype.lanzarDados = function(player){
    var currentPlayer = player || this.jugador;
    if(!currentPlayer){ console.warn('No hay jugador activo para lanzar dados'); return []; }

    var cantidad = Math.max(1, currentPlayer.diceCount || 1);
    var dice = [];
    for(var i = 0; i < cantidad; i++){ dice.push(Math.floor(Math.random() * 6) + 1); }
    currentPlayer.dice = dice;
    currentPlayer.energy = dice.reduce(function(a, b){ return a + b; }, 0);

    this.renderDice();
    return dice;
  };

  Game.prototype.robarCarta = function(player){
    if(!player) return null;
    if(!player.deck) player.deck = [];
    if(!player.hand) player.hand = [];

    if(player.deck.length === 0){
      if(player.discard && player.discard.length > 0){
        player.deck = shuffle(player.discard.slice());
        player.discard = [];
        this.actualizarLog(player.name + ' barajeó el descarte para reponer el mazo.');
      } else {
        this.actualizarLog('Mazo agotado para ' + player.name);
        return null;
      }
    }

    var card = player.deck.pop();
    player.hand.push(card);
    this.actualizarLog(player.name + ' robó ' + card.nombre + '.');
    this.render();
    return card;
  };

  Game.prototype.repartoInicial = function(player, cantidad){
    for(var i = 0; i < cantidad; i++){
      this.robarCarta(player);
    }
  };

  // Muestra en la UI el próximo movimiento telegrafiado del enemigo
  // (icono + valor), visible durante todo el turno del jugador.
  Game.prototype.mostrarIntent = function(){
    var el = document.getElementById('enemyIntent');
    var iconEl = document.getElementById('intentIcon');
    var valueEl = document.getElementById('intentValue');
    if(!el || !this.enemigo) return;
    var intento = this.enemigo.intentoActual();
    if(iconEl) iconEl.textContent = INTENT_ICON[intento.tipo] || '❔';
    if(valueEl) valueEl.textContent = (INTENT_LABEL[intento.tipo] || 'Actúa por') + ' ' + intento.valor;
    el.classList.remove('hidden');
  };

  // Inicia el turno del jugador: lanza sus dados reales y roba 1 carta
  // (salvo en el primerísimo turno del combate, donde el reparto
  // inicial ya llenó la mano). El intent del enemigo ya fue calculado
  // por mostrarIntent()/ejecutarPatronEnemigo() antes de esta llamada.
  Game.prototype.startPlayerTurn = function(skipDraw){
    var player = this.jugador;
    if(!player) return;
    this.lanzarDados(player);
    if(!skipDraw){
      this.robarCarta(player);
    }
    this.actualizarLog(player.name + ' comienza su turno con ' + player.dice.length + ' dado(s) — Energía: ' + player.energy + '.');
    this.render();
  };

  // Termina el turno del jugador (botón "Terminar"): resuelve el
  // movimiento del enemigo que estaba telegrafiado, avanza su patrón
  // cíclico, y — si el combate sigue en curso — arranca la siguiente
  // ronda mostrando el nuevo aviso.
  Game.prototype.endAction = function(){
    if(!this.combateActivo || !this.jugador || !this.enemigo) return;
    this.round++;
    this.ejecutarPatronEnemigo();
    if(!this.combateActivo) return; // el combate ya se resolvió (victoria/derrota)
    this.mostrarIntent();
    this.startPlayerTurn(false);
  };

  // Ejecuta el movimiento del enemigo que ya estaba telegrafiado en
  // pantalla y avanza su índice de patrón de forma cíclica.
  Game.prototype.ejecutarPatronEnemigo = function(){
    var enemigo = this.enemigo;
    var jugador = this.jugador;
    if(!enemigo || !jugador) return;

    var movimiento = enemigo.intentoActual();
    var tipo = movimiento.tipo;
    var valor = movimiento.valor;

    if(tipo === 'ataque'){
      var damage = valor;
      if(jugador.shield > 0){
        var bloqueado = Math.min(jugador.shield, damage);
        damage = Math.max(0, damage - jugador.shield);
        jugador.shield = Math.max(0, jugador.shield - bloqueado);
        if(bloqueado > 0) this.actualizarLog(jugador.name + ' bloqueó ' + bloqueado + ' de daño con su escudo.');
      }
      jugador.health = Math.max(0, jugador.health - damage);
      this.actualizarLog(enemigo.name + ' ataca - Inflige ' + damage + ' daño a ' + jugador.name + '.');
      if(jugador.health <= 0){
        this.resolverFinCombate(false);
        return;
      }
    } else if(tipo === 'bloqueo'){
      enemigo.shield = (enemigo.shield || 0) + valor;
      this.actualizarLog(enemigo.name + ' se protege y gana ' + valor + ' de escudo.');
    } else if(tipo === 'cura'){
      var antes = enemigo.health;
      enemigo.health = Math.min(enemigo._maxHealth, enemigo.health + valor);
      this.actualizarLog(enemigo.name + ' se regenera y cura ' + (enemigo.health - antes) + ' HP.');
    }

    enemigo.avanzarPatron();
    this.render();
  };

  // ------------------------------------------------------------------
  // Jugar una carta: valida energía real, la resta del Total, mueve la
  // carta a descarte y resuelve su efecto contra el enemigo.
  // ------------------------------------------------------------------
  Game.prototype.jugarCarta = function(carta, cardEl){
    var player = this.jugador;
    if(!this.combateActivo || !player || !carta) return false;
    if(!Array.isArray(player.hand) || player.hand.indexOf(carta) === -1) return false;

    if((player.energy || 0) < carta.costo){
      this.actualizarLog(player.name + ' — Energía insuficiente para jugar ' + carta.nombre + '.');
      this.showStatusBanner('Energía insuficiente');
      if(cardEl){
        cardEl.classList.add('invalid');
        setTimeout(function(){ cardEl.classList.remove('invalid'); }, 500);
      }
      return false;
    }

    player.energy -= carta.costo;

    var idx = player.hand.indexOf(carta);
    player.hand.splice(idx, 1);
    player.discard = player.discard || [];
    player.discard.push(carta);

    this.resolverEfecto(player, this.enemigo, carta);
    this.render();
    return true;
  };

  Game.prototype.resolverEfecto = function(player, opponent, carta){
    var tipo = carta.tipoEfecto || 'otro';
    var valor = typeof carta.valorEfecto === 'number' ? carta.valorEfecto : 0;

    if(tipo === 'ataque'){
      // Re-tuning: Daño Final = Daño Base de Personaje + Valor Carta.
      var base = (player.baseDamage != null ? player.baseDamage : 0);
      var damage = base + valor;
      if(opponent && opponent.shield > 0){
        var bloqueado = Math.min(opponent.shield, damage);
        damage = Math.max(0, damage - opponent.shield);
        opponent.shield = Math.max(0, opponent.shield - bloqueado);
        if(bloqueado > 0) this.actualizarLog(opponent.name + ' bloqueó ' + bloqueado + ' de daño con su escudo.');
      }
      if(opponent){
        opponent.health = Math.max(0, opponent.health - damage);
        this.actualizarLog(player.name + ' usa ' + carta.nombre + ' - Inflige ' + damage + ' daño (' + base + ' base + ' + valor + ' carta) a ' + opponent.name + '.');
      }
      if(opponent && opponent.health <= 0){
        this.resolverFinCombate(true);
      }
    } else if(tipo === 'defensa'){
      player.shield = (player.shield || 0) + valor;
      this.actualizarLog(player.name + ' usa ' + carta.nombre + ' y gana ' + valor + ' de escudo.');
    } else if(tipo === 'cura'){
      var antes = player.health;
      var tope = player._maxHealth || (player.health + valor);
      player.health = Math.min(tope, player.health + valor);
      this.actualizarLog(player.name + ' usa ' + carta.nombre + ' y cura ' + (player.health - antes) + ' HP.');
    }
  };

  // ------------------------------------------------------------------
  // Golpe Básico: acción de emergencia, coste 0 de energía, daño = Daño
  // Base del personaje. Existe para que el jugador NUNCA se quede sin
  // poder actuar cuando no le alcanza la energía para ninguna carta.
  // Puede encadenarse tantas veces como la mano lo permita: no bloquea
  // el turno ni añade esperas artificiales.
  // ------------------------------------------------------------------
  Game.prototype.golpeBasico = function(){
    var player = this.jugador;
    var enemigo = this.enemigo;
    if(!this.combateActivo || !player || !enemigo) return false;

    var damage = player.baseDamage != null ? player.baseDamage : 2;
    if(enemigo.shield > 0){
      var bloqueado = Math.min(enemigo.shield, damage);
      damage = Math.max(0, damage - enemigo.shield);
      enemigo.shield = Math.max(0, enemigo.shield - bloqueado);
      if(bloqueado > 0) this.actualizarLog(enemigo.name + ' bloqueó ' + bloqueado + ' de daño con su escudo.');
    }
    enemigo.health = Math.max(0, enemigo.health - damage);
    this.actualizarLog(player.name + ' lanza un Golpe Básico - Inflige ' + damage + ' daño a ' + enemigo.name + '.');

    if(enemigo.health <= 0){
      this.resolverFinCombate(true);
      return true;
    }
    this.render();
    return true;
  };

  // victoriaJugador=true si el enemigo cayó a 0; false si fue el jugador.
  Game.prototype.resolverFinCombate = function(victoriaJugador){
    this.combateActivo = false;
    var user = window.CURRENT_USER || {};
    var self = this;

    if(!victoriaJugador){
      this.actualizarLog(this.jugador.name + ' ha sido derrotado.');
      user.hp = 0;
      this.showStatusBanner('¡Has perdido!');
      setTimeout(function(){ self.resetJuego(); }, 900);
      return;
    }

    this.actualizarLog(this.enemigo.name + ' ha sido derrotado.');

    // Persistir HP tras la victoria.
    user.hp = Math.max(1, this.jugador.health);

    // Recompensa de oro: más en Élites y mucho más en Jefes.
    var recompensa = 15 + Math.floor(Math.random() * 10);
    if(this.enemigo.elite) recompensa += 25;
    if(this.enemigo.boss){
      recompensa += 60;
      user.maxHp = (user.maxHp || 100) + 10; // sube el HP máximo al vencer un Jefe
      user.hp = user.maxHp; // curación completa tras el Jefe
    }
    user.gold = (user.gold || 0) + recompensa;
    this.actualizarLog(this.jugador.name + ' gana ' + recompensa + ' de oro.' + (this.enemigo.boss ? ' ¡HP máximo +10!' : ''));

    this.handleNodeCompletion();
    this.showStatusBanner('¡Victoria!');
    // Re-tuning: transición al mapa casi inmediata (solo el margen de un
    // frame para que la barra de HP a 0 y el banner alcancen a pintarse).
    setTimeout(function(){ self.initMap(); }, 150);
  };

  // ------------------------------------------------------------------
  // Reset
  // ------------------------------------------------------------------
  // targetScreen: 'login' fuerza volver al login (usado al cerrar
  // sesión). Si se omite y sigue habiendo sesión activa, se vuelve al
  // Menú Principal (usado, p. ej., al perder una expedición).
  Game.prototype.resetJuego = function(targetScreen){
    this.mapNodes = [];
    this.currentNodeIndex = 0;
    this.players = [];
    this.jugador = null;
    this.enemigo = null;
    this.round = 1;
    this.combateActivo = false;
    this.combatLog = [];

    // Conserva el nombre de usuario si la sesión sigue activa; si se
    // pidió explícitamente volver a 'login', se borra del todo.
    var nombreSesion = window.CURRENT_USER && window.CURRENT_USER.name;
    window.CURRENT_USER = (targetScreen !== 'login' && nombreSesion) ? { name: nombreSesion } : null;

    var logEl = document.getElementById('combatLog'); if(logEl) logEl.innerHTML = '';
    var handEl = document.getElementById('hand'); if(handEl) handEl.innerHTML = '';
    var diceEl = document.getElementById('dice'); if(diceEl) diceEl.innerHTML = '';
    var mapEl = document.getElementById('mapNodes'); if(mapEl) mapEl.innerHTML = '';
    var intentEl = document.getElementById('enemyIntent'); if(intentEl) intentEl.classList.add('hidden');
    var basicBtnReset = document.getElementById('basicStrikeBtn'); if(basicBtnReset) basicBtnReset.classList.add('hidden');
    this.cerrarFicha();
    this.cerrarMenuBatalla();

    if(targetScreen === 'login' || !window.CURRENT_USER){
      this.showScreen('login');
    } else {
      this.showMainMenu();
    }
    var turnLabel = document.getElementById('turnLabel'); if(turnLabel) turnLabel.textContent = 'Ronda -';
    console.log('Juego reiniciado por resetJuego().');
  };

  // Instantiate the manager and expose
  window.Game = new Game();
  window.currentGame = window.Game;

  // ------------------------------------------------------------------
  // Listeners globales
  // ------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function(){
    // Menú Principal: selección de modo de juego.
    var modeExpedicion = document.getElementById('modeExpedicion');
    if(modeExpedicion) modeExpedicion.addEventListener('click', function(){ window.Game.startExpedicion(); });
    var modeBattleRoyale = document.getElementById('modeBattleRoyale');
    if(modeBattleRoyale) modeBattleRoyale.addEventListener('click', function(){ window.Game.modoProximamente('Battle Royale'); });
    var modeMultiplayer = document.getElementById('modeMultiplayer');
    if(modeMultiplayer) modeMultiplayer.addEventListener('click', function(){
      if(window.Multiplayer && typeof window.Multiplayer.abrirHub === 'function'){
        window.Multiplayer.abrirHub();
      } else {
        window.Game.modoProximamente('Multijugador');
      }
    });

    // "Salir de la partida": disponible desde mapa, mazo y nodo especial.
    ['exitToMenuMap', 'exitToMenuDeck', 'exitToMenuEvent', 'exitToMenuBattle'].forEach(function(id){
      var btn = document.getElementById(id);
      if(btn) btn.addEventListener('click', function(){ window.Game.exitToMainMenu(); });
    });

    // Menú contextual de la batalla (botón ☰).
    var menuBtn = document.getElementById('menuBtn');
    if(menuBtn) menuBtn.addEventListener('click', function(){ window.Game.abrirMenuBatalla(); });
    var gameMenuScrim = document.getElementById('gameMenuScrim');
    if(gameMenuScrim) gameMenuScrim.addEventListener('click', function(){ window.Game.cerrarMenuBatalla(); });

    var endBtn = document.getElementById('endTurnBtn');
    if(endBtn) endBtn.addEventListener('click', function(){
      window.Game.endAction();
    });

    // Los dados se lanzan automáticamente al inicio de cada turno con
    // el inventario real del jugador; el botón ya no "recarga" energía.
    var rollBtn = document.getElementById('lanzarDadosBtn');
    if(rollBtn) rollBtn.addEventListener('click', function(){
      window.Game.actualizarLog('Los dados ya se lanzaron al inicio de este turno.');
    });

    var openDeckBtn = document.getElementById('openDeckBtn');
    if(openDeckBtn) openDeckBtn.addEventListener('click', function(){ window.Game.openDeckManager(); });

    var backFromDeckBtn = document.getElementById('backToMapFromDeck');
    if(backFromDeckBtn) backFromDeckBtn.addEventListener('click', function(){ window.Game.initMap(); });

    var backFromEventBtn = document.getElementById('backToMapFromEvent');
    if(backFromEventBtn) backFromEventBtn.addEventListener('click', function(){ window.Game.initMap(); });

    var basicStrikeBtn = document.getElementById('basicStrikeBtn');
    if(basicStrikeBtn) basicStrikeBtn.addEventListener('click', function(){ window.Game.golpeBasico(); });

    // Ficha Técnica: accesible desde el mapa y desde la batalla.
    var fichaBtnMap = document.getElementById('fichaBtnMap');
    if(fichaBtnMap) fichaBtnMap.addEventListener('click', function(){ window.Game.abrirFicha(); });
    var fichaBtnBattle = document.getElementById('fichaBtnBattle');
    if(fichaBtnBattle) fichaBtnBattle.addEventListener('click', function(){ window.Game.abrirFicha(); });
    var fichaCloseBtn = document.getElementById('fichaCloseBtn');
    if(fichaCloseBtn) fichaCloseBtn.addEventListener('click', function(){ window.Game.cerrarFicha(); });
    var fichaScrim = document.getElementById('fichaScrim');
    if(fichaScrim) fichaScrim.addEventListener('click', function(){ window.Game.cerrarFicha(); });
  });

  // Drawer del registro de combate
  document.addEventListener('DOMContentLoaded', function(){
    var logBtn = document.getElementById('logToggleBtn');
    var drawer = document.getElementById('logDrawer');
    var scrim = document.getElementById('logScrim');
    function closeDrawer(){ if(drawer) drawer.classList.add('hidden'); if(scrim) scrim.classList.add('hidden'); }
    function openDrawer(){ if(drawer) drawer.classList.remove('hidden'); if(scrim) scrim.classList.remove('hidden'); }
    if(logBtn) logBtn.addEventListener('click', function(){
      if(!drawer) return;
      drawer.classList.contains('hidden') ? openDrawer() : closeDrawer();
    });
    if(scrim) scrim.addEventListener('click', closeDrawer);
  });

})();
