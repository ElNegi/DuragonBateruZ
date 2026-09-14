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
    this.archetype = opts.archetype || '';
    this.trait = opts.trait || '';
    this.phases = Array.isArray(opts.phases) ? JSON.parse(JSON.stringify(opts.phases)) : [];
    this.statusResistances = Array.isArray(opts.statusResistances) ? opts.statusResistances.slice() : [];
    this.phaseIndex = 0;
    this.phaseName = '';
    this.rageBonus = 0;
    this.chargedBonus = 0;
    this.counter = 0;
    this.objective = opts.objective || null;
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
    this.engagementObjective = null;
    this.cardRuntime = null;
    this.sagaAct = 1;
    this.mapNodes = [];
    this.currentNodeIndex = 0;
  }

  var RACE_EMOJI = { Saiyan: '🥊', Freezer: '🧊', Namek: '🌱' };
  function raceEmoji(race){ return RACE_EMOJI[race] || '👤'; }
  function raceColorClass(raza){ return (raza || 'neutral').toString().toLowerCase(); }

  var INTENT_ICON = { ataque:'⚔️', bloqueo:'🛡️', cura:'💚', carga:'💢', drenaje:'🔻', estado:'☣️', rompeguardia:'💥', furia:'🔥', contra:'↩️' };
  var INTENT_LABEL = { ataque:'Ataca por', bloqueo:'Se protege por', cura:'Se cura por', carga:'Carga', drenaje:'Drena', estado:'Estado', rompeguardia:'Rompeguardia', furia:'Furia', contra:'Contraataque' };

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
    var clone = (window.CardBalance && window.CardBalance.cloneCard) ? window.CardBalance.cloneCard : function(c){ return c; };
    var active = pool.slice(0, 4).concat(neutral.slice(0, 4)).map(clone);
    var bench = pool.slice(4, 6).concat(neutral.slice(4, 6)).map(clone);
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
      if(window.CardBalance) window.CardBalance.annotateCard(carta);
      var el = document.createElement('div');
      el.className = 'deck-row rarity-' + ((carta.rareza || 'Comun').toLowerCase());
      var info = document.createElement('div'); info.className = 'deck-row-info';
      var title = document.createElement('div'); title.className = 'deck-row-title';
      var rarityTxt = window.CardBalance ? window.CardBalance.formatRarity(carta) : '';
      title.textContent = carta.nombre + (rarityTxt ? '  ' + rarityTxt : '');
      var meta = document.createElement('div'); meta.className = 'deck-row-meta';
      var extraMeta = [];
      if(carta.naturaleza) extraMeta.push(carta.naturaleza);
      if(carta.alcance) extraMeta.push(carta.alcance);
      if(carta.rondaMinima && carta.rondaMinima > 1) extraMeta.push('Ronda ' + carta.rondaMinima + '+');
      meta.textContent = carta.clase + ' · ' + carta.raza + (extraMeta.length ? ' · ' + extraMeta.join(' · ') : '') + ' · Coste ' + carta.costo;
      var effect = document.createElement('div'); effect.className = 'deck-row-effect'; effect.textContent = carta.efecto || '';
      info.appendChild(title); info.appendChild(meta); info.appendChild(effect);
      var btn = document.createElement('button'); btn.className = 'deck-row-btn';
      btn.type = 'button';
      btn.textContent = fromActive ? '→ Banquillo' : '→ Activo';
      btn.addEventListener('click', function(){
        if(fromActive) self.moverABanquillo(carta); else self.moverAActivo(carta);
      });
      var actions = document.createElement('div'); actions.className = 'deck-row-actions';
      actions.appendChild(btn);
      var sell = document.createElement('button'); sell.className = 'deck-row-btn deck-row-btn--sell'; sell.type = 'button';
      var sellValue = window.CardBalance ? window.CardBalance.getSalvageValue(carta) : Math.max(5, Math.round((carta.costo || 1) * 3));
      sell.textContent = '💰 +' + sellValue;
      sell.title = 'Retirar esta carta de la colección y recibir oro';
      sell.addEventListener('click', function(){ self.venderCarta(carta, fromActive, sellValue); });
      actions.appendChild(sell);
      el.appendChild(info); el.appendChild(actions);
      return el;
    }

    if(active.length === 0){ activeList.innerHTML = '<div class="deck-empty">Sin cartas activas.</div>'; }
    else active.forEach(function(c){ activeList.appendChild(row(c, true)); });

    if(bench.length === 0){ benchList.innerHTML = '<div class="deck-empty">Banquillo vacío.</div>'; }
    else bench.forEach(function(c){ benchList.appendChild(row(c, false)); });
  };

  Game.prototype.venderCarta = function(carta, fromActive, valor){
    var user = window.CURRENT_USER || {};
    var list = fromActive ? (user.activeDeck || []) : (user.bench || []);
    if(fromActive && list.length <= 8){
      this.actualizarLog('El mazo activo debe conservar al menos 8 cartas.');
      this.showStatusBanner('Mínimo 8 cartas activas');
      return;
    }
    var idx = list.indexOf(carta);
    if(idx === -1) return;
    list.splice(idx,1);
    user.gold = (user.gold || 0) + (valor || 0);
    this.actualizarLog('Retiraste ' + carta.nombre + ' y recibiste ' + valor + ' de oro.');
    this.renderDeckScreen();
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
    var activeNode=this.mapNodes.find(function(n){return n.estado==='disponible'||n.estado==='in-progress';}) || this.mapNodes[this.currentNodeIndex||0];
    var saga=window.Engagement&&activeNode?window.Engagement.getSaga(activeNode.acto):null;
    var heading=document.getElementById('mapHeading'); if(heading)heading.textContent=saga?(saga.icon+' Acto '+activeNode.acto+' · '+saga.name):'Sendero de la Caverna';
    var completedCount = this.mapNodes.filter(function(n){ return n.estado === 'completado' || n.estado === 'omitido'; }).length;
    if(progressEl) progressEl.textContent = 'Nodo ' + (completedCount + 1) + ' / ' + this.mapNodes.length;

    this.mapNodes.forEach(function(n, idx){
      var el = document.createElement('button');
      el.className = 'map-node node-type-' + n.tipo.toLowerCase();
      el.dataset.index = idx;
      if(n.branchGroup) el.classList.add('route-choice');
      if(n.estado === 'bloqueado') el.classList.add('locked');
      else if(n.estado === 'completado') el.classList.add('completed');
      else if(n.estado === 'omitido') el.classList.add('omitted');
      else el.classList.add('available');

      var orb = document.createElement('div'); orb.className = 'node-orb';
      orb.textContent = NODE_EMOJI[n.tipo] || '❔';
      var label = document.createElement('div'); label.className = 'node-label';
      label.textContent = (idx + 1) + '. ' + n.tipo + (n.routeLabel ? ' · ' + n.routeLabel : '');
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
    if(node.branchGroup && window.seleccionarRamaMapa) window.seleccionarRamaMapa(this.mapNodes, idx);

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
    if(window.completarNodoMapa) window.completarNodoMapa(this.mapNodes, idx);
    else {
      this.mapNodes[idx].estado = 'completado';
      if(this.mapNodes[idx + 1]) this.mapNodes[idx + 1].estado = 'disponible';
    }
    this.actualizarLog('Nodo ' + (idx + 1) + ' completado. La ruta avanza.');
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
    if(window.CardEngine && carta && carta.importada){
      window.CardEngine.improveCard(carta);
      this.actualizarLog(carta.nombre + ' ha sido mejorada (+' + ((carta.mejorada || 0) * 25) + '% a sus valores base compatibles).');
    } else {
      carta.valorEfecto = Math.round(carta.valorEfecto * 1.25);
      if(carta.tipoEfecto === 'ataque') carta.efecto = 'Inflige ' + carta.valorEfecto + ' de daño (mejorada)';
      else if(carta.tipoEfecto === 'defensa') carta.efecto = 'Bloquea ' + carta.valorEfecto + ' de daño (mejorada)';
      else if(carta.tipoEfecto === 'cura') carta.efecto = 'Cura ' + carta.valorEfecto + ' HP (mejorada)';
      this.actualizarLog(carta.nombre + ' ha sido mejorada.');
    }
    this.handleNodeCompletion();
    this.initMap();
  };

  // ---- Tienda: comprar cartas con oro --------------------------------
  // Segunda pasada: ofertas ponderadas por rareza/progreso/raza, protección
  // frente a duplicados y un refresco limitado de tienda.
  Game.prototype.progresoExpedicion = function(){
    if(window.CardBalance) return window.CardBalance.progressFromNode(this.currentNodeIndex || 0, (this.mapNodes || []).length || 35);
    return Math.max(0, Math.min(1, (this.currentNodeIndex || 0) / Math.max(1, ((this.mapNodes || []).length || 35) - 1)));
  };

  Game.prototype.generarOfertaTienda = function(node){
    var user = window.CURRENT_USER || {};
    var owned = (user.activeDeck || []).concat(user.bench || []);
    var progress = this.progresoExpedicion();
    if(window.CardBalance){
      node.oferta = window.CardBalance.pickCards({
        race: user.race,
        count: 3,
        progress: progress,
        source: 'shop',
        owned: owned
      });
    } else {
      var pool = ((window.CARD_POOL && window.CARD_POOL[user.race]) || []).concat((window.CARD_POOL && window.CARD_POOL.Neutral) || []);
      node.oferta = shuffle(pool.slice()).slice(0, 3);
    }
    return node.oferta;
  };

  Game.prototype.abrirTienda = function(node){
    var user = window.CURRENT_USER;
    if(!Array.isArray(node.oferta)) this.generarOfertaTienda(node);
    var progress = this.progresoExpedicion();
    var opciones = (node.oferta || []).map(function(carta){
      if(window.CardBalance) window.CardBalance.annotateCard(carta);
      var precio = window.CardBalance ? window.CardBalance.getPrice(carta, progress) : (carta.costo * 8 + 10);
      var rareza = window.CardBalance ? window.CardBalance.formatRarity(carta) + ' · ' : '';
      var tipo = carta.tipoCatalogo || carta.clase || '';
      var tags = [tipo, carta.naturaleza, carta.alcance].filter(Boolean).join(' · ');
      return {
        label: rareza + carta.nombre + ' — ' + precio + ' 💰\n' + tags + ' · Coste ' + carta.costo + '\n' + (carta.efecto || ''),
        action: function(s){ s.comprarCarta(node, carta, precio); }
      };
    });

    var refreshes = node.refreshes || 0;
    if(refreshes < 2){
      var refreshPrice = 10 + refreshes * 8;
      opciones.push({ label: '🔄 Renovar ofertas — ' + refreshPrice + ' 💰', action: function(s){ s.refrescarTienda(node, refreshPrice); } });
    }
    opciones.push({ label: 'Salir de la tienda', action: function(s){ s.handleNodeCompletion(); s.initMap(); } });

    var act = Math.min(3, Math.floor(progress * 3) + 1);
    this.showEventScreen({
      icon: '🛒', title: 'Tienda · Acto ' + act,
      desc: 'Oro: ' + (user.gold || 0) + ' 💰 · Las ofertas mejoran conforme avanzas. Las cartas de tu raza y estilo tienen más probabilidad de aparecer.',
      options: opciones
    });
  };

  Game.prototype.refrescarTienda = function(node, precio){
    var user = window.CURRENT_USER || {};
    if((user.gold || 0) < precio){
      this.actualizarLog('No tienes suficiente oro para renovar la tienda.');
      this.abrirTienda(node);
      return;
    }
    user.gold -= precio;
    node.refreshes = (node.refreshes || 0) + 1;
    node.oferta = null;
    this.generarOfertaTienda(node);
    this.actualizarLog('Renovaste las ofertas de la tienda por ' + precio + ' de oro.');
    this.abrirTienda(node);
  };

  Game.prototype.comprarCarta = function(node, carta, precio){
    var user = window.CURRENT_USER;
    if((user.gold || 0) < precio){
      this.actualizarLog('No tienes suficiente oro para ' + carta.nombre + '.');
      this.abrirTienda(node);
      return;
    }
    // Antes se descontaba el oro incluso con mazo y banquillo llenos.
    if(user.activeDeck.length >= 16 && user.bench.length >= 4){
      this.actualizarLog('Mazo y banquillo llenos. Libera un hueco antes de comprar.');
      this.showStatusBanner('Colección llena: 16 + 4');
      this.abrirTienda(node);
      return;
    }

    user.gold -= precio;
    var copy = (window.CardBalance && window.CardBalance.cloneCard) ? window.CardBalance.cloneCard(carta) : carta;
    if(user.activeDeck.length < 16) user.activeDeck.push(copy);
    else user.bench.push(copy);
    node.oferta = (node.oferta || []).filter(function(c){ return c !== carta; });
    this.actualizarLog('Compraste ' + carta.nombre + ' por ' + precio + ' de oro.');
    this.abrirTienda(node);
  };

  // ---- Evento: encuentro narrativo aleatorio -------------------------
  Game.prototype.abrirEvento = function(node){
    var user = window.CURRENT_USER || {};
    var self = this;
    if(!node.eventoId){
      var ids=['gravedad','namekiano','capsula','rival','radar','tormenta'];
      node.eventoId=ids[Math.floor(Math.random()*ids.length)];
    }
    function terminar(msg){ if(msg) self.actualizarLog(msg); self.handleNodeCompletion(); self.initMap(); }
    var cfg={icon:'❓',title:'Evento',desc:'',options:[]};
    if(node.eventoId==='gravedad'){
      cfg.icon='🏋️'; cfg.title='Cámara de Gravedad'; cfg.desc='Una cámara abandonada todavía funciona. El entrenamiento puede hacerte más fuerte, pero no será gratis.';
      cfg.options=[
        {label:'Entrenar al límite — pierde 12 HP, Daño Base +1',action:function(){ user.hp=Math.max(1,(user.hp||1)-12); user.baseDamage=(user.baseDamage||2)+1; terminar('Entrenamiento extremo: Daño Base +1.'); }},
        {label:'Entrenamiento técnico — 20 💰 y mejora una carta',action:function(s){ if((user.gold||0)<20){s.showStatusBanner('Necesitas 20 de oro');s.abrirEvento(node);return;} user.gold-=20; s.abrirMejoraCartaEvento(node); }},
        {label:'No arriesgarse',action:function(){ terminar('Decidiste conservar fuerzas.'); }}
      ];
    } else if(node.eventoId==='namekiano'){
      cfg.icon='🌱'; cfg.title='Guerrero herido'; cfg.desc='Un Namekiano herido pide ayuda. Puedes compartir recursos o seguir tu camino.';
      cfg.options=[
        {label:'Ayudar — recupera 18 HP',action:function(){ var a=user.hp||0; user.hp=Math.min(user.maxHp||100,a+18); terminar('Ayudaste al guerrero y recuperaste '+(user.hp-a)+' HP.'); }},
        {label:'Compartir una Senzu simbólica — 15 💰, recibe una carta de apoyo',action:function(s){ if((user.gold||0)<15){s.showStatusBanner('Necesitas 15 de oro');s.abrirEvento(node);return;} user.gold-=15; var owned=(user.activeDeck||[]).concat(user.bench||[]); var picks=window.CardBalance?window.CardBalance.pickCards({race:user.race,count:1,progress:s.progresoExpedicion(),source:'event',owned:owned}):[]; if(picks[0])s.aceptarRecompensaCarta(picks[0]); terminar('Tu ayuda fue recompensada.'); }},
        {label:'Seguir adelante',action:function(){ terminar(); }}
      ];
    } else if(node.eventoId==='capsula'){
      cfg.icon='🧰'; cfg.title='Cápsula sellada'; cfg.desc='Una cápsula de Capsule Corp. sigue cerrada. Forzarla puede darte un gran botín... o activar su defensa.';
      cfg.options=[
        {label:'Forzar la cápsula',action:function(s){ if(Math.random()<0.62){ user.gold=(user.gold||0)+35; var picks=window.CardBalance?window.CardBalance.pickCards({race:user.race,count:1,progress:s.progresoExpedicion()+.1,source:'eliteReward',owned:(user.activeDeck||[]).concat(user.bench||[])}):[]; if(picks[0])s.aceptarRecompensaCarta(picks[0]); terminar('La cápsula contenía 35 de oro y una carta.'); } else { user.hp=Math.max(1,(user.hp||1)-14); terminar('La defensa de la cápsula explotó: -14 HP.'); }}},
        {label:'Vender la ubicación — +18 💰',action:function(){ user.gold=(user.gold||0)+18; terminar('Vendiste la ubicación de la cápsula.'); }},
        {label:'Ignorarla',action:function(){ terminar(); }}
      ];
    } else if(node.eventoId==='rival'){
      cfg.icon='🥋'; cfg.title='Rival misterioso'; cfg.desc='Un guerrero te reta a un intercambio de golpes. No busca matarte; quiere comprobar tu determinación.';
      cfg.options=[
        {label:'Aceptar — pierde 10 HP y obtén una carta de mayor rareza',action:function(s){ user.hp=Math.max(1,(user.hp||1)-10); var picks=window.CardBalance?window.CardBalance.pickCards({race:user.race,count:1,progress:Math.min(1,s.progresoExpedicion()+.22),source:'eliteReward',owned:(user.activeDeck||[]).concat(user.bench||[])}):[]; if(picks[0])s.aceptarRecompensaCarta(picks[0]); terminar('El rival reconoce tu fuerza.'); }},
        {label:'Entrenar juntos — paga 25 💰, Daño Base +1',action:function(s){ if((user.gold||0)<25){s.showStatusBanner('Necesitas 25 de oro');s.abrirEvento(node);return;} user.gold-=25; user.baseDamage=(user.baseDamage||2)+1; terminar('El entrenamiento con tu rival aumenta tu Daño Base.'); }},
        {label:'Rechazar el duelo',action:function(){ terminar(); }}
      ];
    } else if(node.eventoId==='radar'){
      cfg.icon='🐉'; cfg.title='Señal del Radar'; cfg.desc='El radar detecta una anomalía cercana. Investigar consume tiempo, pero las señales de este tipo suelen esconder algo especial.';
      cfg.options=[
        {label:'Investigar — paga 20 💰 y elige entre 3 cartas',action:function(s){ if((user.gold||0)<20){s.showStatusBanner('Necesitas 20 de oro');s.abrirEvento(node);return;} user.gold-=20; var picks=window.CardBalance?window.CardBalance.pickCards({race:user.race,count:3,progress:Math.min(1,s.progresoExpedicion()+.18),source:'eliteReward',owned:(user.activeDeck||[]).concat(user.bench||[])}):[]; var opts=picks.map(function(c){return {label:(window.CardBalance?window.CardBalance.formatRarity(c)+' · ':'')+c.nombre+' — '+(c.efecto||''),action:function(ss){ss.aceptarRecompensaCarta(c);terminar('Encontraste una técnica gracias al radar.');}};}); opts.push({label:'Cancelar investigación',action:function(){terminar();}}); s.showEventScreen({icon:'🐉',title:'Hallazgo del Radar',desc:'Elige una recompensa.',options:opts}); }},
        {label:'Vender los datos — +15 💰',action:function(){user.gold=(user.gold||0)+15;terminar();}},
        {label:'Continuar',action:function(){terminar();}}
      ];
    } else {
      cfg.icon='🌩️'; cfg.title='Tormenta de Ki'; cfg.desc='Una tormenta de energía distorsiona tus sentidos. Puedes atravesarla o esperar a que pase.';
      cfg.options=[
        {label:'Atravesarla — 50% +30 💰 / 50% -12 HP',action:function(){if(Math.random()<.5){user.gold=(user.gold||0)+30;terminar('Atravesaste la tormenta y encontraste 30 de oro.');}else{user.hp=Math.max(1,(user.hp||1)-12);terminar('La tormenta te golpeó: -12 HP.');}}},
        {label:'Meditar — recupera 10 HP',action:function(){var a=user.hp||0;user.hp=Math.min(user.maxHp||100,a+10);terminar('Meditaste durante la tormenta.');}},
        {label:'Esperar',action:function(){terminar();}}
      ];
    }
    this.showEventScreen(cfg);
  };

  // Variante de mejora usada por eventos: no completa el nodo hasta elegir.
  Game.prototype.abrirMejoraCartaEvento = function(node){
    var user=window.CURRENT_USER||{}, self=this;
    var opciones=(user.activeDeck||[]).map(function(carta){return {label:'Mejorar '+carta.nombre+' ('+(carta.efecto||'')+')',action:function(s){ if(window.CardEngine&&carta.importada)window.CardEngine.improveCard(carta);else if(typeof carta.valorEfecto==='number')carta.valorEfecto=Math.round(carta.valorEfecto*1.25); s.actualizarLog(carta.nombre+' ha sido mejorada por el evento.'); s.handleNodeCompletion(); s.initMap(); }};});
    opciones.push({label:'Cancelar y recuperar 20 💰',action:function(s){ var u=window.CURRENT_USER||{}; u.gold=(u.gold||0)+20; s.abrirEvento(node); }});
    this.showEventScreen({icon:'✨',title:'Entrenamiento técnico',desc:'Elige una carta para mejorar permanentemente.',options:opciones});
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
          if(window.CardBalance) window.CardBalance.annotateCard(carta);
          li.textContent = carta.nombre + ' — ' + (window.CardBalance ? window.CardBalance.formatRarity(carta) + ' · ' : '') + carta.clase +
            (carta.naturaleza ? ' · ' + carta.naturaleza : '') +
            (carta.alcance ? ' · ' + carta.alcance : '') +
            (carta.rondaMinima > 1 ? ' · Ronda ' + carta.rondaMinima + '+' : '') +
            ' · Coste ' + carta.costo;
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
    var currentNode=(this.mapNodes&&this.mapNodes[this.currentNodeIndex])||{};
    this.sagaAct=currentNode.acto||1;
    this.enemigo = new Enemy(enemyOpts);
    if(this.sagaAct===3) this.enemigo.rageBonus=(this.enemigo.rageBonus||0)+1;
    this.players = [this.jugador, this.enemigo]; // compat. con render()/renderHand()
    this.round = 1;
    this.combateActivo = true;
    // Cada combate empieza con un runtime limpio para Sagas/Escenarios/flags
    // de cartas. Evita que un permanente del encuentro anterior se filtre.
    this.cardRuntime = null;
    this.jugador.specialization = user.specialization || null;
    if(window.Engagement){
      window.Engagement.resetCombat(this.jugador);
      window.Engagement.initObjective(this, this.enemigo.objective || null);
    }

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
      var traitEl=document.getElementById('enemyTraitBadge');
      if(traitEl){
        var enemyStatuses=(window.CardEngine&&window.CardEngine.runtime)?(window.CardEngine.runtime(enemy).statuses||[]).map(function(st){return st.name+(st.stacks>1?'×'+st.stacks:'');}):[];
        var resist=(enemy.statusResistances||[]).length?'Resiste primero: '+enemy.statusResistances.join(', '):'';
        var traitText=[enemy.archetype,enemy.phaseName,enemy.trait,enemyStatuses.length?'Estados: '+enemyStatuses.join(', '):'',resist].filter(Boolean).join(' · ');
        traitEl.textContent=traitText; traitEl.classList.toggle('hidden',!traitText);
      }
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
        var self = this;
        var puedeJugarAlguna = (player.hand || []).some(function(c){
          var ctx = self.crearContextoCarta(player, c, 0);
          var coste = window.CardEngine ? window.CardEngine.getEffectiveCost(c, player, ctx) : c.costo;
          var val = window.CardEngine ? window.CardEngine.canPlay(c, player, self.enemigo, ctx) : {ok:true};
          return val.ok && (player.energy || 0) >= coste;
        });
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
    this.renderEngagementHUD();
  };

  Game.prototype.renderHand = function(player){
    var handEl = document.getElementById('hand');
    if(!handEl) return;
    handEl.innerHTML = '';
    player = player || this.jugador;
    if(!player) return;
    var self = this;

    (player.hand || []).forEach(function(cardObj, idx){
      if(window.CardBalance) window.CardBalance.annotateCard(cardObj);
      var c = document.createElement('div'); c.className = 'card';
      c.dataset.handIndex = idx;
      c.classList.add('tipo-' + raceColorClass(cardObj.raza));
      if(cardObj.rareza) c.classList.add('rarity-' + cardObj.rareza.toLowerCase());
      var ctxPreview = self.crearContextoCarta(player, cardObj, 0);
      var costeReal = window.CardEngine
        ? window.CardEngine.getEffectiveCost(cardObj, player, ctxPreview)
        : cardObj.costo;
      var validacion = window.CardEngine
        ? window.CardEngine.canPlay(cardObj, player, self.enemigo, ctxPreview)
        : { ok:true };
      if((player.energy || 0) < costeReal || !validacion.ok) c.classList.add('no-energy');
      if(!validacion.ok) c.title = validacion.reason || 'No puedes jugar esta carta ahora';

      var title = document.createElement('div'); title.className = 'title'; title.textContent = cardObj.nombre || 'Carta';
      var meta = document.createElement('div'); meta.className = 'meta';
      var metaParts = [];
      if(window.CardBalance) metaParts.push(window.CardBalance.formatRarity(cardObj));
      metaParts.push(cardObj.clase || cardObj.tipoCarta || '');
      if(cardObj.naturaleza) metaParts.push(cardObj.naturaleza);
      if(cardObj.alcance) metaParts.push(cardObj.alcance);
      if(cardObj.rondaMinima && cardObj.rondaMinima > 1) metaParts.push('R' + cardObj.rondaMinima + '+');
      meta.textContent = metaParts.filter(Boolean).join(' · ');
      var desc = document.createElement('div'); desc.className = 'desc'; desc.textContent = cardObj.efecto || '';
      if(!validacion.ok){
        var hint = document.createElement('div'); hint.className = 'card-rule-hint'; hint.textContent = validacion.reason || 'Condición no cumplida';
        desc.appendChild(document.createElement('br')); desc.appendChild(hint);
      }
      var costRow = document.createElement('div'); costRow.className = 'cost-row';
      var pip = document.createElement('span'); pip.className = 'cost-pip'; pip.textContent = costeReal;
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
      var vals=(player && player.dice || []); var counts={}; vals.forEach(function(v){counts[v]=(counts[v]||0)+1;});
      vals.forEach(function(v){
        var el = document.createElement('div'); el.className = 'die' + ((counts[v]||0)>=2 ? ' resonant' : '');
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
    var insight=document.getElementById('diceInsight');
    if(insight && player && window.Engagement){
      var ds=window.Engagement.state(player); insight.textContent=ds.resonance ? '🎲 Resonancia: '+ds.resonance : '🎲 Busca parejas o escaleras para obtener bonificaciones';
    }
  };

  Game.prototype.sumDice = function(player){
    player = player || this.jugador;
    if(!player || !Array.isArray(player.dice)) return 0;
    return player.dice.reduce(function(acc, v){ return acc + (typeof v === 'number' ? v : 0); }, 0);
  };

  // Construye un contexto común para el motor ampliado de cartas.
  // Mantiene el motor original aislado: solo las cartas importadas usan
  // CardEngine; las cartas base siguen pasando por resolverEfecto().
  Game.prototype.crearContextoCarta = function(player, carta, paidCost){
    var self = this;
    return {
      player: player || this.jugador,
      target: this.enemigo,
      targets: this.enemigo ? [this.enemigo] : [],
      host: this,
      round: this.round,
      paidCost: paidCost || 0,
      log: function(msg){ self.actualizarLog(msg); },
      onKill: function(target){
        if(window.CardEngine && player){
          var rt = window.CardEngine.runtime(player);
          if(target && target.boss) rt.once.bossKilled = true;
        }
      },
      damageOthers: function(amount, primaryTarget, attacker){
        // En solitario, "todos los demás" incluye al jugador y no hay
        // más enemigos simultáneos. El daño nunca baja de 0.
        if(player && player !== primaryTarget){
          player.health = Math.max(0, player.health - (amount || 0));
          self.actualizarLog(player.name + ' recibe ' + (amount || 0) + ' de daño colateral.');
        }
      }
    };
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
    var info = window.Engagement ? window.Engagement.intentInfo(intento) : {icon:INTENT_ICON[intento.tipo]||'❔',label:(INTENT_LABEL[intento.tipo]||'Actúa por')+' '+(intento.valor||'')};
    if(iconEl) iconEl.textContent = info.icon;
    if(valueEl) valueEl.textContent = info.label;
    el.classList.remove('hidden');
  };

  // Inicia el turno del jugador: lanza sus dados reales y roba 1 carta
  // (salvo en el primerísimo turno del combate, donde el reparto
  // inicial ya llenó la mano). El intent del enemigo ya fue calculado
  // por mostrarIntent()/ejecutarPatronEnemigo() antes de esta llamada.
  Game.prototype.startPlayerTurn = function(skipDraw){
    var player = this.jugador;
    if(!player) return;

    // Regla central del juego: ronda 1 = 1 dado, ronda 2 = 2 dados,
    // ... hasta un máximo absoluto de 6 dados dentro de cada combate.
    if(window.CardEngine){
      player.diceCount = window.CardEngine.getDiceCountForRound(this.round, player);
    } else {
      player.diceCount = Math.max(1, Math.min(6, this.round));
    }

    this.lanzarDados(player);
    if(window.CardEngine){
      window.CardEngine.onTurnStart(player, this.crearContextoCarta(player, null, 0));
    }
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
    this.ejecutarPatronEnemigo();
    if(!this.combateActivo) return; // el combate ya se resolvió (victoria/derrota)
    if(window.CardEngine){
      window.CardEngine.onTurnEnd(this.jugador, this.crearContextoCarta(this.jugador, null, 0));
      if(this.jugador.health <= 0){
        this.resolverFinCombate(false);
        return;
      }
    }
    this.round++;
    this.mostrarIntent();
    this.startPlayerTurn(false);
  };

  // Ejecuta el movimiento del enemigo que ya estaba telegrafiado en
  // pantalla y avanza su índice de patrón de forma cíclica.
  Game.prototype._recibirAtaqueEnemigo = function(enemigo,jugador,baseDamage,opts){
    opts=opts||{};
    var damage=Math.max(0,(baseDamage||0)+(enemigo.rageBonus||0)+(enemigo.chargedBonus||0));
    enemigo.chargedBonus=0;
    var ctxIncoming=this.crearContextoCarta(jugador,null,0);
    if(window.CardEngine){ var mitigacion=window.CardEngine.beforeIncomingDamage(jugador,enemigo,damage,ctxIncoming); damage=mitigacion.damage; }
    if(jugador.shield>0 && damage>0){
      var usable=jugador.shield;
      if(opts.breakGuard) usable=Math.ceil(usable*.5);
      var bloqueado=Math.min(usable,damage);
      damage=Math.max(0,damage-bloqueado);
      jugador.shield=Math.max(0,jugador.shield-bloqueado);
      if(bloqueado>0)this.actualizarLog(jugador.name+' bloqueó '+bloqueado+' de daño'+(opts.breakGuard?' (Rompeguardia)':'')+'.');
    }
    var hpAntes=jugador.health; jugador.health=Math.max(0,jugador.health-damage); var real=Math.max(0,hpAntes-jugador.health);
    this.actualizarLog(enemigo.name+(opts.breakGuard?' usa Rompeguardia':' ataca')+' — inflige '+real+' daño a '+jugador.name+'.');
    if(window.CardEngine)window.CardEngine.afterIncomingDamage(jugador,enemigo,real,ctxIncoming);
    return real;
  };

  Game.prototype.ejecutarPatronEnemigo = function(){
    var enemigo=this.enemigo, jugador=this.jugador;
    if(!enemigo||!jugador)return;
    var movimiento=enemigo.intentoActual(), tipo=movimiento.tipo, valor=movimiento.valor||0;
    if(tipo==='ataque') this._recibirAtaqueEnemigo(enemigo,jugador,valor,{});
    else if(tipo==='rompeguardia') this._recibirAtaqueEnemigo(enemigo,jugador,valor,{breakGuard:true});
    else if(tipo==='bloqueo'){ enemigo.shield=(enemigo.shield||0)+valor; this.actualizarLog(enemigo.name+' se protege y gana '+valor+' de escudo.'); }
    else if(tipo==='cura'){ var antes=enemigo.health; enemigo.health=Math.min(enemigo._maxHealth,enemigo.health+valor); this.actualizarLog(enemigo.name+' se regenera y cura '+(enemigo.health-antes)+' HP.'); }
    else if(tipo==='carga'){ enemigo.chargedBonus=(enemigo.chargedBonus||0)+valor; this.actualizarLog(enemigo.name+' concentra Ki: su próximo ataque obtiene +'+valor+' daño.'); }
    else if(tipo==='drenaje'){ var drenado=Math.min(jugador.energy||0,valor); jugador.energy=Math.max(0,(jugador.energy||0)-drenado); this.actualizarLog(enemigo.name+' drena '+drenado+' de tu energía.'); }
    else if(tipo==='estado'){ if(window.CardEngine)window.CardEngine.addStatus(jugador,movimiento.estado||'Quemado',this.crearContextoCarta(jugador,null,0)); else this.actualizarLog(enemigo.name+' intenta aplicar '+(movimiento.estado||'un estado')+'.'); }
    else if(tipo==='furia'){ enemigo.rageBonus=(enemigo.rageBonus||0)+valor; this.actualizarLog(enemigo.name+' entra en Furia: sus ataques obtienen +'+valor+' daño durante el combate.'); }
    else if(tipo==='contra'){ enemigo.counter=valor; this.actualizarLog(enemigo.name+' adopta una postura de contraataque ('+valor+' daño).'); }
    if(jugador.health<=0){ this.resolverFinCombate(false); return; }
    enemigo.avanzarPatron(); this.render();
  };

  // ------------------------------------------------------------------
  // Jugar una carta: valida energía real, la resta del Total, mueve la
  // carta a descarte y resuelve su efecto contra el enemigo.
  // ------------------------------------------------------------------
  Game.prototype.jugarCarta = function(carta, cardEl){
    var player = this.jugador;
    if(!this.combateActivo || !player || !carta) return false;
    if(!Array.isArray(player.hand) || player.hand.indexOf(carta) === -1) return false;

    var ctx = this.crearContextoCarta(player, carta, 0);
    var costeReal = carta.costo;
    if(window.CardEngine){
      var puede = window.CardEngine.canPlay(carta, player, this.enemigo, ctx);
      if(!puede.ok){
        this.actualizarLog(carta.nombre + ' — ' + (puede.reason || 'No puede jugarse ahora') + '.');
        this.showStatusBanner(puede.reason || 'Condición no cumplida');
        if(cardEl){
          cardEl.classList.add('invalid');
          setTimeout(function(){ cardEl.classList.remove('invalid'); }, 500);
        }
        return false;
      }
      costeReal = window.CardEngine.getEffectiveCost(carta, player, ctx);
    }

    if((player.energy || 0) < costeReal){
      this.actualizarLog(player.name + ' — Energía insuficiente para jugar ' + carta.nombre + '.');
      this.showStatusBanner('Energía insuficiente');
      if(cardEl){
        cardEl.classList.add('invalid');
        setTimeout(function(){ cardEl.classList.remove('invalid'); }, 500);
      }
      return false;
    }

    player.energy -= costeReal;

    var idx = player.hand.indexOf(carta);
    player.hand.splice(idx, 1);
    player.discard = player.discard || [];
    player.discard.push(carta);

    var enemyHpBefore=this.enemigo ? this.enemigo.health : 0;
    if(window.CardEngine && carta.importada){
      ctx.paidCost = costeReal;
      window.CardEngine.resolve(carta, ctx);
      if(this.enemigo && this.enemigo.health <= 0 && this.combateActivo){
        this.resolverFinCombate(true);
      }
      if(player.health <= 0 && this.combateActivo){
        this.resolverFinCombate(false);
      }
    } else {
      this.resolverEfecto(player, this.enemigo, carta);
      var dealt=Math.max(0,enemyHpBefore-(this.enemigo?this.enemigo.health:enemyHpBefore));
      if(window.CardEngine && window.CardEngine.recordExternalPlay) window.CardEngine.recordExternalPlay(carta,player,costeReal,dealt,ctx);
      if(window.Engagement) window.Engagement.afterCardPlayed(carta,player,ctx,dealt);
      if(this.enemigo && this.enemigo.health<=0 && this.combateActivo) this.resolverFinCombate(true);
      if(player.health<=0 && this.combateActivo) this.resolverFinCombate(false);
    }
    if(window.Engagement && this.enemigo) window.Engagement.checkEnemyPhase(this.enemigo,ctx);
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
      if(window.Engagement) damage=window.Engagement.modifyOutgoingDamage(player,opponent,carta,damage,this.crearContextoCarta(player,carta,carta.costo));
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

    } else if(tipo === 'defensa'){
      player.shield = (player.shield || 0) + valor;
      this.actualizarLog(player.name + ' usa ' + carta.nombre + ' y gana ' + valor + ' de escudo.');
    } else if(tipo === 'cura'){
      var antes = player.health;
      var healValue=window.Engagement?window.Engagement.modifyHeal(player,valor,this.crearContextoCarta(player,carta,carta.costo),carta):valor;
      var tope = player._maxHealth || (player.health + healValue);
      player.health = Math.min(tope, player.health + healValue);
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
    var basicCtx=this.crearContextoCarta(player,null,0);
    if(window.Engagement) damage=window.Engagement.modifyOutgoingDamage(player,enemigo,{nombre:'Golpe Básico',tipoCatalogo:'Ataque',clase:'Ataque',naturaleza:'Físico',alcance:'Cercanía'},damage,basicCtx);
    if(enemigo.shield > 0){
      var bloqueado = Math.min(enemigo.shield, damage);
      damage = Math.max(0, damage - enemigo.shield);
      enemigo.shield = Math.max(0, enemigo.shield - bloqueado);
      if(bloqueado > 0) this.actualizarLog(enemigo.name + ' bloqueó ' + bloqueado + ' de daño con su escudo.');
    }
    var hpAntesBasico=enemigo.health;
    enemigo.health = Math.max(0, enemigo.health - damage);
    var realBasico=Math.max(0,hpAntesBasico-enemigo.health);
    this.actualizarLog(player.name + ' lanza un Golpe Básico - Inflige ' + realBasico + ' daño a ' + enemigo.name + '.');
    if(window.Engagement){ window.Engagement.afterBasicAttack(player,basicCtx,realBasico); window.Engagement.checkEnemyPhase(enemigo,basicCtx); }

    if(enemigo.health <= 0){
      this.resolverFinCombate(true);
      return true;
    }
    this.render();
    return true;
  };

  Game.prototype.renderEngagementHUD = function(){
    if(!window.Engagement || !this.jugador) return;
    var hud=window.Engagement.getHud(this.jugador,this,this.round);
    var flow=document.getElementById('flowIndicator'); if(flow){
      var sts=(window.CardEngine&&window.CardEngine.runtime)?(window.CardEngine.runtime(this.jugador).statuses||[]).map(function(st){return st.name+(st.stacks>1?'×'+st.stacks:'');}):[];
      flow.textContent='🔥 Flujo '+hud.flow+(hud.flowChain?' · '+hud.flowChain:'')+(sts.length?' · ☣️ '+sts.join(', '):'');
    }
    var name=document.getElementById('awakeningName'); if(name)name.textContent=hud.awakened?hud.awakeningName+' · '+hud.awakeningTurns+'T':hud.awakeningName;
    var val=document.getElementById('awakeningValue'); if(val)val.textContent=hud.awakened?'ACTIVO':hud.awakening+'%';
    var fill=document.getElementById('awakeningFill'); if(fill)fill.style.width=(hud.awakened?100:hud.awakening)+'%';
    var box=fill&&fill.parentElement&&fill.parentElement.parentElement; if(box)box.classList.toggle('is-active',hud.awakened);
    var btn=document.getElementById('awakeningBtn'); if(btn){btn.disabled=hud.awakened||hud.awakening<100;btn.textContent=hud.awakened?'✨ '+hud.awakeningTurns+'T':'✨ Despertar';}
    var sagaEl=document.getElementById('combatSaga'); if(sagaEl){var sg=window.Engagement.getSaga(this.sagaAct);sagaEl.textContent=sg.icon+' '+sg.name+' — '+sg.desc;}
    var obj=document.getElementById('combatObjective');
    if(obj){ var st=window.Engagement.objectiveStatus(this,this.jugador,this.round,false); obj.textContent=st?'🎯 '+st.text:'🎯 Combate libre'; obj.classList.toggle('is-complete',!!(st&&st.done)); }
  };

  Game.prototype.activarDespertar = function(){
    if(!window.Engagement||!this.jugador||!this.combateActivo)return;
    var res=window.Engagement.activateAwakening(this.jugador,this.crearContextoCarta(this.jugador,null,0));
    if(!res.ok)this.showStatusBanner(res.reason||'No disponible'); else this.showStatusBanner('✨ '+res.name);
    this.render();
  };

  Game.prototype.ofrecerEspecializacion = function(done){
    var user=window.CURRENT_USER||{};
    if(!window.Engagement || user.specialization){ if(done)done(); return false; }
    var specs=window.Engagement.getSpecializations(user.race);
    if(!specs.length){if(done)done();return false;}
    var self=this;
    this.showEventScreen({icon:'🌟',title:'Camino del Guerrero',desc:'Tu primera gran victoria define cómo evolucionará tu estilo. Elige una especialización permanente para esta expedición.',options:specs.map(function(sp){return {label:sp.icon+' '+sp.name+'\n'+sp.desc,action:function(s){user.specialization=sp.id;if(s.jugador)s.jugador.specialization=sp.id;s.actualizarLog('Especialización elegida: '+sp.name+'.');if(done)done();}};})});
    return true;
  };

  // ---- Recompensa de cartas tras combate -----------------------------
  // Los combates normales pueden ofrecer un mini-draft; Élites y Jefes lo
  // garantizan y elevan la rareza. Así el catálogo amplio entra en la
  // expedición de forma gradual en vez de inundar la tienda desde el nodo 1.
  Game.prototype.aceptarRecompensaCarta = function(carta){
    var user = window.CURRENT_USER || {};
    user.activeDeck = user.activeDeck || [];
    user.bench = user.bench || [];
    var copy = (window.CardBalance && window.CardBalance.cloneCard) ? window.CardBalance.cloneCard(carta) : carta;
    if(user.activeDeck.length < 16){
      user.activeDeck.push(copy);
      this.actualizarLog('Recompensa obtenida: ' + carta.nombre + ' → mazo activo.');
      return;
    }
    if(user.bench.length < 4){
      user.bench.push(copy);
      this.actualizarLog('Recompensa obtenida: ' + carta.nombre + ' → banquillo.');
      return;
    }
    var oro = window.CardBalance ? window.CardBalance.getSalvageValue(carta) : 15;
    user.gold = (user.gold || 0) + oro;
    this.actualizarLog('Colección llena: ' + carta.nombre + ' se convierte en ' + oro + ' de oro.');
  };

  Game.prototype.ofrecerRecompensaCartas = function(tipo){
    if(!window.CardBalance) return false;
    var chance = tipo === 'boss' ? 1 : (tipo === 'elite' ? 1 : (this._objectiveCompleted ? 0.68 : 0.38));
    if(Math.random() > chance) return false;

    var user = window.CURRENT_USER || {};
    var source = tipo === 'boss' ? 'bossReward' : (tipo === 'elite' ? 'eliteReward' : 'normalReward');
    var count = tipo === 'normal' ? 2 : 3;
    var progress = this.progresoExpedicion ? this.progresoExpedicion() : 0;
    var owned = (user.activeDeck || []).concat(user.bench || []);
    var picks = window.CardBalance.pickCards({ race:user.race, count:count, progress:progress, source:source, owned:owned });
    if(!picks.length) return false;

    var self = this;
    var skipGold = tipo === 'boss' ? 30 : (tipo === 'elite' ? 20 : 10);
    var options = picks.map(function(carta){
      window.CardBalance.annotateCard(carta);
      var tags = [carta.tipoCatalogo || carta.clase, carta.naturaleza, carta.alcance].filter(Boolean).join(' · ');
      return {
        label: window.CardBalance.formatRarity(carta) + ' · ' + carta.nombre + '\n' + tags + ' · Coste ' + carta.costo + (carta.rondaMinima > 1 ? ' · Ronda ' + carta.rondaMinima + '+' : '') + '\n' + (carta.efecto || ''),
        action: function(s){
          s.aceptarRecompensaCarta(carta);
          s.handleNodeCompletion();
          s.initMap();
        }
      };
    });
    options.push({
      label: '💰 Renunciar a la carta y tomar ' + skipGold + ' de oro',
      action: function(s){
        user.gold = (user.gold || 0) + skipGold;
        s.actualizarLog('Renunciaste a la recompensa de carta y recibiste ' + skipGold + ' de oro.');
        s.handleNodeCompletion();
        s.initMap();
      }
    });

    var title = tipo === 'boss' ? 'Recompensa de Jefe' : (tipo === 'elite' ? 'Recompensa de Élite' : 'Botín de Combate');
    var icon = tipo === 'boss' ? '👑' : (tipo === 'elite' ? '💎' : '🃏');
    this.showEventScreen({
      icon: icon, title: title,
      desc: 'Elige 1 carta. Las rarezas altas aparecen con mayor frecuencia al avanzar por la expedición.',
      options: options
    });
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
    if(this.sagaAct===3) recompensa+=10;
    user.gold = (user.gold || 0) + recompensa;
    this.actualizarLog(this.jugador.name + ' gana ' + recompensa + ' de oro.' + (this.sagaAct===3?' (bonificación de Saga)':'') + (this.enemigo.boss ? ' ¡HP máximo +10!' : ''));

    this._objectiveCompleted=false;
    if(window.Engagement){
      var objectiveResult=window.Engagement.objectiveStatus(this,this.jugador,this.round,true);
      if(objectiveResult && objectiveResult.done){
        this._objectiveCompleted=true;
        user.gold=(user.gold||0)+objectiveResult.rewardGold;
        this.actualizarLog('🎯 Objetivo opcional completado: +'+objectiveResult.rewardGold+' de oro y mejor botín.');
      } else if(objectiveResult){ this.actualizarLog('Objetivo opcional no completado: '+objectiveResult.progress+'.'); }
    }

    this.showStatusBanner(this._objectiveCompleted ? '¡Victoria + Objetivo!' : '¡Victoria!');
    var tipoRecompensa = this.enemigo.boss ? 'boss' : (this.enemigo.elite ? 'elite' : 'normal');
    function continuarRecompensa(){
      if(!self.ofrecerRecompensaCartas(tipoRecompensa)){
        self.handleNodeCompletion(); self.initMap();
      }
    }
    setTimeout(function(){
      if(self.enemigo.boss && !user.specialization) self.ofrecerEspecializacion(continuarRecompensa);
      else continuarRecompensa();
    },260);
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
    this.engagementObjective = null;
    this.cardRuntime = null;
    this.sagaAct = 1;

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
    var awakeningBtn = document.getElementById('awakeningBtn');
    if(awakeningBtn) awakeningBtn.addEventListener('click', function(){ window.Game.activarDespertar(); });
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
