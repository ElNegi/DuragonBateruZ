/* multiplayer.js
   ===========================================================================
   MODO MULTIJUGADOR COOPERATIVO — 2 jugadores, dispositivos/cuentas distintas
   ===========================================================================

   Arquitectura general
   ---------------------------------------------------------------------------
   - Cada partida cooperativa vive en un documento de Firestore:
       rooms/{codigoDeSala}
     El "código de sala" (6 caracteres) ES el ID del documento: sirve a la
     vez de identificador y de código de invitación fácil de compartir.
   - Todos los clientes (los 2 jugadores) se suscriben al documento con
     onSnapshot: cualquier cambio de estado (mapa, combate, turnos) se ve
     reflejado en tiempo real en ambos dispositivos, sin necesidad de un
     servidor de juego propio.
   - Todas las mutaciones de estado compartido (unirse a la sala, jugar una
     carta, terminar turno, avanzar de nodo…) se hacen con runTransaction,
     para evitar condiciones de carrera cuando ambos jugadores escriben
     casi al mismo tiempo (p. ej. los dos pulsan "Terminar" a la vez).
   - Cada jugador conserva su propia mano/mazo/dados/energía dentro de
     combat.players[uid]; los enemigos (combat.enemies[]) son un recurso
     COMPARTIDO por el que compiten/cooperan ambos jugadores.
   - El combate es de "turnos simultáneos": en cada ronda, ambos jugadores
     pueden jugar cartas en el orden que quieran contra los mismos
     enemigos; cuando AMBOS han pulsado "Terminar", se resuelve de golpe
     la IA de todos los enemigos (con patrón fijo, igual que en solitario)
     y se abre la siguiente ronda.

   Requisitos de Firestore (ver también firestore.rules adjunto)
   ---------------------------------------------------------------------------
   - Es necesario tener Firestore habilitado en el proyecto Firebase
     "dragonlike-3f51d" (Firestore Database → Crear base de datos).
   - Hay que desplegar las reglas de seguridad de firestore.rules para que
     solo los 2 jugadores de una sala puedan leer/escribir su documento.
   - Limitación conocida: Firestore no tiene presencia de conexión nativa
     (eso sí lo tiene Realtime Database). Si un jugador cierra la pestaña
     a mitad de combate, su compañero lo verá como "desconectado" solo si
     ha pulsado "Salir de la partida" explícitamente; si simplemente cierra
     el navegador, la sala queda a la espera de su turno. Es una limitación
     aceptable para un MVP; una mejora futura sería añadir un timeout de
     turno o migrar la presencia a Realtime Database.
   ===========================================================================
*/
import { db } from "./firebase-init.js";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  runTransaction,
  serverTimestamp
} from "firebase/firestore";

(function(){

  var CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // sin I/O/0/1 (ambiguos)
  var MAX_NODOS = 35;
  var MAZO_ACTIVO_MAX = 16;

  // Todas las pantallas del juego (solitario + multijugador), para poder
  // ocultarlas todas de golpe al cambiar de pantalla desde este módulo.
  var TODAS_LAS_PANTALLAS = [
    'loginScreen','menuScreen','raceScreen','mapScreen','deckScreen','eventScreen','gameScreen',
    'mpHubScreen','mpLobbyScreen','mpMapScreen','mpEventScreen','mpBattleScreen'
  ];

  function showScreenMP(id){
    TODAS_LAS_PANTALLAS.forEach(function(sid){
      var el = document.getElementById(sid);
      if(el) el.classList.toggle('hidden', sid !== id);
    });
  }

  function raceEmoji(race){
    return { Saiyan:'🥊', Freezer:'🧊', Namek:'🌱' }[race] || '👤';
  }
  function raceColorClass(raza){ return (raza || 'neutral').toString().toLowerCase(); }
  var INTENT_ICON = { ataque:'⚔️', bloqueo:'🛡️', cura:'💚' };
  var NODE_EMOJI = { Combate:'⚔️', Elite:'💀', Jefe:'👑', Tienda:'🛒', Descanso:'🔥', Evento:'❓' };

  function shuffle(arr){
    for(var i=arr.length-1;i>0;i--){
      var j = Math.floor(Math.random()*(i+1));
      var tmp = arr[i]; arr[i]=arr[j]; arr[j]=tmp;
    }
    return arr;
  }
  function entry(text){ return { text: text, time: Date.now() }; }
  function generarCodigoSala(){
    var code = '';
    for(var i=0;i<6;i++) code += CODE_CHARS[Math.floor(Math.random()*CODE_CHARS.length)];
    return code;
  }

  // ------------------------------------------------------------------
  // Estado local (no compartido) de este cliente.
  // ------------------------------------------------------------------
  var state = {
    roomCode: null,
    unsubscribe: null,
    room: null,               // último snapshot recibido de la sala
    selectedEnemyId: null,    // objetivo de ataque elegido localmente
    pendingJoinCode: null
  };

  function miUid(){
    return window.CURRENT_USER && window.CURRENT_USER.uid;
  }

  // ==================================================================
  // 0) HUB — crear / unirse
  // ==================================================================
  function abrirHub(){
    if(!window.CURRENT_USER || !miUid()){
      alert('Debes iniciar sesión antes de jugar en multijugador.');
      return;
    }
    ocultarErrorHub();
    var input = document.getElementById('mpJoinCodeInput');
    if(input && state.pendingJoinCode){ input.value = state.pendingJoinCode; }
    showScreenMP('mpHubScreen');
  }

  function mostrarErrorHub(msg){
    var el = document.getElementById('mpHubError');
    if(!el) return;
    el.textContent = msg;
    el.classList.remove('hidden');
  }
  function ocultarErrorHub(){
    var el = document.getElementById('mpHubError');
    if(!el) return;
    el.classList.add('hidden');
    el.textContent = '';
  }

  function jugadorLobbyInicial(user){
    return {
      uid: user.uid,
      name: user.name || 'Jugador',
      race: null,
      ready: false,
      // Estadísticas de expedición (se rellenan al iniciar la partida):
      hp: null, maxHp: null, gold: 0, baseDamage: 2, diceCount: 1,
      activeDeck: [], bench: []
    };
  }

  async function crearSala(){
    var user = window.CURRENT_USER;
    ocultarErrorHub();
    try{
      var code = generarCodigoSala();
      var roomRef = doc(db, 'rooms', code);
      var existing = await getDoc(roomRef);
      if(existing.exists()){ return crearSala(); } // colisión de código: reintenta

      var players = {};
      players[user.uid] = jugadorLobbyInicial(user);

      await setDoc(roomRef, {
        code: code,
        hostUid: user.uid,
        status: 'lobby',
        playerOrder: [user.uid],
        players: players,
        mapNodes: null,
        currentNodeIndex: 0,
        combat: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      entrarASala(code);
    } catch(err){
      console.error('Error creando sala:', err);
      mostrarErrorHub('No se pudo crear la sala. Inténtalo de nuevo.');
    }
  }

  async function unirseASala(codeRaw){
    var user = window.CURRENT_USER;
    var code = (codeRaw || '').trim().toUpperCase();
    ocultarErrorHub();
    if(!code){ mostrarErrorHub('Introduce un código de sala.'); return; }

    var roomRef = doc(db, 'rooms', code);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        if(!snap.exists()) throw new Error('not-found');
        var room = snap.data();
        var uids = Object.keys(room.players || {});
        if(uids.indexOf(user.uid) !== -1) return; // ya estaba dentro, solo reconecta
        if(room.status !== 'lobby') throw new Error('not-joinable');
        if(uids.length >= 2) throw new Error('full');

        var players = room.players || {};
        players[user.uid] = jugadorLobbyInicial(user);
        var order = (room.playerOrder || []).concat([user.uid]);
        tx.update(roomRef, { players: players, playerOrder: order, updatedAt: serverTimestamp() });
      });
      entrarASala(code);
    } catch(err){
      console.error('Error uniéndose a la sala:', err);
      if(err.message === 'not-found') mostrarErrorHub('No existe ninguna sala con ese código.');
      else if(err.message === 'full') mostrarErrorHub('Esa sala ya tiene 2 jugadores.');
      else if(err.message === 'not-joinable') mostrarErrorHub('Esa partida ya ha comenzado.');
      else mostrarErrorHub('No se pudo unir a la sala. Revisa el código.');
    }
  }

  // ==================================================================
  // 1) SUSCRIPCIÓN A LA SALA — motor central de sincronización
  // ==================================================================
  function entrarASala(code){
    if(state.unsubscribe) state.unsubscribe();
    state.roomCode = code;
    var roomRef = doc(db, 'rooms', code);
    state.unsubscribe = onSnapshot(roomRef, function(snap){
      if(!snap.exists()){
        // El host (u otro proceso) borró la sala.
        salirDeSalaLocal();
        window.Game && window.Game.showMainMenu();
        return;
      }
      state.room = snap.data();
      renderSegunEstado();
    }, function(err){
      console.error('Error de sincronización con la sala:', err);
    });
  }

  function salirDeSalaLocal(){
    if(state.unsubscribe) state.unsubscribe();
    state.unsubscribe = null;
    state.roomCode = null;
    state.room = null;
    state.selectedEnemyId = null;
  }

  // Punto único de "salir de la partida": vuelve al Menú Principal sin
  // borrar la sala (el compañero puede seguir jugando o esperando).
  function salirDeLaPartida(){
    salirDeSalaLocal();
    var drawers = ['mpGameMenuDrawer','mpLogDrawer'];
    drawers.forEach(function(id){ var el = document.getElementById(id); if(el) el.classList.add('hidden'); });
    ['mpGameMenuScrim','mpLogScrim'].forEach(function(id){ var el = document.getElementById(id); if(el) el.classList.add('hidden'); });
    window.Game && window.Game.showMainMenu();
  }

  function renderSegunEstado(){
    var room = state.room;
    if(!room) return;
    if(room.status === 'lobby') renderLobby(room);
    else if(room.status === 'map') renderMapaMP(room);
    else if(room.status === 'combat') renderCombateMP(room);
  }

  // ==================================================================
  // 2) LOBBY — elección de raza + "Listo" + arranque (host)
  // ==================================================================
  function renderLobby(room){
    showScreenMP('mpLobbyScreen');
    var codeEl = document.getElementById('mpRoomCodeText');
    if(codeEl) codeEl.textContent = room.code;

    var listEl = document.getElementById('mpPlayersList');
    if(listEl){
      listEl.innerHTML = '';
      (room.playerOrder || []).forEach(function(uid){
        var p = room.players[uid];
        if(!p) return;
        var row = document.createElement('div');
        row.className = 'mp-player-row' + (p.ready ? ' is-ready' : '');
        row.innerHTML =
          '<span class="mp-player-avatar">' + (p.race ? raceEmoji(p.race) : '❔') + '</span>' +
          '<span class="mp-player-name">' + p.name + (uid === room.hostUid ? ' (Anfitrión)' : '') + '</span>' +
          '<span class="mp-player-state">' + (p.race ? p.race : 'Eligiendo raza…') + (p.ready ? ' · Listo ✅' : '') + '</span>';
        listEl.appendChild(row);
      });
      if((room.playerOrder || []).length < 2){
        var waitingRow = document.createElement('div');
        waitingRow.className = 'mp-player-row mp-player-row--empty';
        waitingRow.textContent = 'Esperando a un segundo jugador…';
        listEl.appendChild(waitingRow);
      }
    }

    var meRoom = room.players[miUid()] || {};
    var raceContainer = document.getElementById('mpRaceOptionsLobby');
    if(raceContainer){
      raceContainer.innerHTML = '';
      (window.RACES || []).forEach(function(r){
        var el = document.createElement('button');
        el.type = 'button';
        el.className = 'race-card mp-race-card' + (meRoom.race === r.nombre ? ' selected' : '');
        el.innerHTML =
          '<div class="race-avatar">' + raceEmoji(r.nombre) + '</div>' +
          '<div class="race-name">' + r.nombre + '</div>' +
          '<div class="race-desc">' + r.ventaja + '</div>';
        el.addEventListener('click', function(){ elegirRazaLobby(r.nombre); });
        raceContainer.appendChild(el);
      });
    }

    var readyBtn = document.getElementById('mpReadyBtn');
    if(readyBtn){
      readyBtn.disabled = !meRoom.race;
      readyBtn.textContent = meRoom.ready ? 'Cancelar "Listo"' : 'Listo';
    }

    var uids = Object.keys(room.players || {});
    var todosListos = uids.length === 2 && uids.every(function(u){ return room.players[u].ready; });
    var startBtn = document.getElementById('mpStartBtn');
    if(startBtn) startBtn.classList.toggle('hidden', !(todosListos && miUid() === room.hostUid));

    var statusEl = document.getElementById('mpLobbyStatus');
    if(statusEl){
      if(uids.length < 2) statusEl.textContent = 'Comparte el código o el enlace de invitación con tu compañero.';
      else if(!todosListos) statusEl.textContent = 'Elige raza y pulsa "Listo" para continuar.';
      else statusEl.textContent = (miUid() === room.hostUid) ? 'Todos listos — ¡inicia la expedición!' : 'Todos listos — esperando a que el anfitrión inicie la partida.';
    }
  }

  async function elegirRazaLobby(race){
    var roomRef = doc(db, 'rooms', state.roomCode);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var p = room.players[miUid()];
        if(!p) return;
        p.race = race;
        p.ready = false;
        room.players[miUid()] = p;
        tx.update(roomRef, { players: room.players, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
  }

  async function alternarListo(){
    var roomRef = doc(db, 'rooms', state.roomCode);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var p = room.players[miUid()];
        if(!p || !p.race) return;
        p.ready = !p.ready;
        room.players[miUid()] = p;
        tx.update(roomRef, { players: room.players, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
  }

  function construirMazoInicial(race){
    var pool = (window.CARD_POOL && window.CARD_POOL[race]) || [];
    var neutral = (window.CARD_POOL && window.CARD_POOL.Neutral) || [];
    return {
      activeDeck: pool.slice(0,4).concat(neutral.slice(0,4)),
      bench: pool.slice(4,6).concat(neutral.slice(4,6))
    };
  }

  // Solo el anfitrión puede iniciar: genera el mapa compartido y las
  // estadísticas de expedición de ambos jugadores en una sola escritura.
  async function iniciarExpedicionMP(){
    var roomRef = doc(db, 'rooms', state.roomCode);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        if(room.hostUid !== miUid()) return;
        var uids = Object.keys(room.players || {});
        if(uids.length !== 2 || !uids.every(function(u){ return room.players[u].race && room.players[u].ready; })) return;

        uids.forEach(function(u){
          var p = room.players[u];
          var mazo = construirMazoInicial(p.race);
          p.activeDeck = mazo.activeDeck;
          p.bench = mazo.bench;
          p.maxHp = 100;
          p.hp = 100;
          p.gold = 50;
          p.baseDamage = 2;
          p.diceCount = 1;
          room.players[u] = p;
        });

        var mapNodes = window.generarMapa ? window.generarMapa(MAX_NODOS) : [];
        if(mapNodes[0]) mapNodes[0].estado = 'disponible';

        tx.update(roomRef, {
          status: 'map',
          mapNodes: mapNodes,
          currentNodeIndex: 0,
          players: room.players,
          updatedAt: serverTimestamp()
        });
      });
    } catch(err){ console.error(err); }
  }

  // ==================================================================
  // 3) MAPA COOPERATIVO
  // ==================================================================
  function renderMapaMP(room){
    showScreenMP('mpMapScreen');
    var me = room.players[miUid()] || {};
    var partnerUid = (room.playerOrder || []).filter(function(u){ return u !== miUid(); })[0];
    var partner = partnerUid ? room.players[partnerUid] : null;

    var nameEl = document.getElementById('mpMapHeroName'); if(nameEl) nameEl.textContent = me.name || 'Jugador';
    var raceEl = document.getElementById('mpMapHeroRace'); if(raceEl) raceEl.textContent = me.race || '—';
    var avatarEl = document.getElementById('mpMapHeroAvatar'); if(avatarEl) avatarEl.textContent = raceEmoji(me.race);
    var goldEl = document.getElementById('mpMapHeroGold'); if(goldEl) goldEl.textContent = '💰 ' + (me.gold || 0);
    var hpEl = document.getElementById('mpMapHeroHp'); if(hpEl) hpEl.textContent = '❤️ ' + (me.hp != null ? me.hp : '—') + '/' + (me.maxHp || '—');

    var partnerBar = document.getElementById('mpPartnerBar');
    if(partnerBar){
      partnerBar.innerHTML = partner
        ? ('<span class="mp-partner-avatar">' + raceEmoji(partner.race) + '</span>' +
           '<span class="mp-partner-name">' + partner.name + '</span>' +
           '<span class="mp-partner-hp">❤️ ' + (partner.hp != null ? partner.hp : '—') + '/' + (partner.maxHp || '—') + '</span>')
        : '<span class="mp-partner-name">Compañero desconectado</span>';
    }

    var container = document.getElementById('mpMapNodes');
    var progressEl = document.getElementById('mpMapProgress');
    var nodes = room.mapNodes || [];
    var completedCount = nodes.filter(function(n){ return n.estado === 'completado'; }).length;
    if(progressEl) progressEl.textContent = 'Nodo ' + (completedCount + 1) + ' / ' + nodes.length;

    if(container){
      container.innerHTML = '';
      nodes.forEach(function(n, idx){
        var el = document.createElement('button');
        el.className = 'map-node node-type-' + n.tipo.toLowerCase();
        if(n.estado === 'bloqueado') el.classList.add('locked');
        else if(n.estado === 'completado') el.classList.add('completed');
        else if(n.estado === 'in-progress') el.classList.add('available');
        else el.classList.add('available');

        var orb = document.createElement('div'); orb.className = 'node-orb'; orb.textContent = NODE_EMOJI[n.tipo] || '❔';
        var label = document.createElement('div'); label.className = 'node-label'; label.textContent = (idx + 1) + '. ' + n.tipo;
        var stateTag = document.createElement('div'); stateTag.className = 'node-state-tag';
        stateTag.textContent = (n.estado === 'in-progress' ? 'en curso' : n.estado) + (n.acto ? ' · Acto ' + n.acto : '');

        el.appendChild(orb); el.appendChild(label); el.appendChild(stateTag);
        el.addEventListener('click', function(){ onNodeClickMP(idx, n); });
        container.appendChild(el);
      });
    }
  }

  function onNodeClickMP(idx, node){
    if(node.estado !== 'disponible' && node.estado !== 'in-progress') return;
    if(node.tipo === 'Combate' || node.tipo === 'Elite' || node.tipo === 'Jefe'){
      iniciarCombateMP(idx);
    } else if(node.tipo === 'Descanso'){
      abrirNodoEspecialMP(idx, node, {
        title: 'Hoguera de Descanso', icon: '🔥',
        desc: 'Ambos jugadores pueden descansar junto a la hoguera y recuperar HP antes de continuar.',
        options: [{ label: 'Descansar (cura 30% del HP máx.)', action: 'descanso' }]
      });
    } else if(node.tipo === 'Tienda'){
      abrirNodoEspecialMP(idx, node, {
        title: 'Tienda Itinerante', icon: '🛒',
        desc: 'Cada jugador gasta su propio oro — las compras no afectan a tu compañero.',
        options: [
          { label: 'Poción de Vida — 20 oro (+25 HP)', action: 'pocion' },
          { label: 'Entrenamiento — 40 oro (+1 Daño Base permanente)', action: 'entrenamiento' }
        ]
      });
    } else if(node.tipo === 'Evento'){
      abrirNodoEspecialMP(idx, node, {
        title: 'Encuentro Misterioso', icon: '❓',
        desc: 'Un suceso inesperado afecta a ambos exploradores por igual.',
        options: [{ label: 'Investigar', action: 'evento' }]
      });
    }
  }

  function abrirNodoEspecialMP(idx, node, cfg){
    showScreenMP('mpEventScreen');
    var titleEl = document.getElementById('mpEventTitle'); if(titleEl) titleEl.textContent = cfg.title;
    var iconEl = document.getElementById('mpEventIcon'); if(iconEl) iconEl.textContent = cfg.icon;
    var descEl = document.getElementById('mpEventDesc'); if(descEl) descEl.textContent = cfg.desc;
    var optsEl = document.getElementById('mpEventOptions');
    if(optsEl){
      optsEl.innerHTML = '';
      cfg.options.forEach(function(opt){
        var btn = document.createElement('button');
        btn.type = 'button'; btn.className = 'btn-primary';
        btn.textContent = opt.label;
        btn.addEventListener('click', function(){ resolverNodoEspecialMP(idx, opt.action); });
        optsEl.appendChild(btn);
      });
    }
  }

  async function resolverNodoEspecialMP(idx, accion){
    var roomRef = doc(db, 'rooms', state.roomCode);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var uid = miUid();
        var p = room.players[uid];
        var uids = Object.keys(room.players);

        if(accion === 'descanso'){
          // Efecto compartido: cura a AMBOS jugadores un 30% de su HP máx.
          uids.forEach(function(u){
            var pl = room.players[u];
            pl.hp = Math.min(pl.maxHp, pl.hp + Math.round(pl.maxHp * 0.3));
            room.players[u] = pl;
          });
        } else if(accion === 'pocion'){
          if(p.gold >= 20){ p.gold -= 20; p.hp = Math.min(p.maxHp, p.hp + 25); room.players[uid] = p; }
        } else if(accion === 'entrenamiento'){
          if(p.gold >= 40){ p.gold -= 40; p.baseDamage = (p.baseDamage || 2) + 1; room.players[uid] = p; }
        } else if(accion === 'evento'){
          // Evento simple: 60% de probabilidad de encontrar oro, 40% de sufrir daño leve — afecta a ambos.
          var bueno = Math.random() < 0.6;
          uids.forEach(function(u){
            var pl = room.players[u];
            if(bueno) pl.gold = (pl.gold || 0) + 15;
            else pl.hp = Math.max(1, pl.hp - 8);
            room.players[u] = pl;
          });
        }

        var mapNodes = room.mapNodes.slice();
        mapNodes[idx].estado = 'completado';
        if(mapNodes[idx+1]) mapNodes[idx+1].estado = 'disponible';

        tx.update(roomRef, { players: room.players, mapNodes: mapNodes, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
    volverAlMapaMP();
  }

  function volverAlMapaMP(){
    showScreenMP('mpMapScreen');
  }

  // ==================================================================
  // 4) COMBATE COOPERATIVO — 2 jugadores vs X enemigos
  // ==================================================================
  function generarEnemigosParaNodoMP(node, totalNodos){
    var cantidad = (node.tipo === 'Jefe') ? 1 : 2; // Combate/Elite: 2 enemigos en equipo
    var enemigos = [];
    for(var i=0;i<cantidad;i++){
      var base = window.pickEnemyForNode(node, totalNodos);
      if(i > 0 && node.tipo === 'Combate'){ base.health = Math.max(6, Math.round(base.health * 0.8)); }
      enemigos.push({
        id: 'e' + i + '_' + Date.now().toString(36) + Math.floor(Math.random()*999),
        name: base.name + (cantidad > 1 ? ' ' + String.fromCharCode(65 + i) : ''),
        race: base.race,
        health: base.health,
        maxHealth: base.health,
        shield: 0,
        pattern: base.pattern,
        patternIndex: 0,
        elite: !!base.elite,
        boss: !!base.boss
      });
    }
    return enemigos;
  }

  function rollDiceForCombatPlayer(p){
    var count = Math.max(1, p.diceCount || 1);
    var dice = [];
    for(var i=0;i<count;i++) dice.push(1 + Math.floor(Math.random()*6));
    p.dice = dice;
    p.energy = dice.reduce(function(a,b){ return a+b; }, 0);
  }

  function drawCardForCombatPlayer(p){
    if(!p.deck) p.deck = [];
    if(!p.hand) p.hand = [];
    if(p.deck.length === 0){
      if(p.discard && p.discard.length){
        p.deck = shuffle(p.discard.slice());
        p.discard = [];
      } else {
        return; // sin cartas disponibles, ronda sin robo para este jugador
      }
    }
    p.hand.push(p.deck.pop());
  }

  async function iniciarCombateMP(idx){
    var roomRef = doc(db, 'rooms', state.roomCode);
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var node = room.mapNodes[idx];
        if(!node || (node.estado !== 'disponible' && node.estado !== 'in-progress')) return;
        node.estado = 'in-progress';

        var enemigos = generarEnemigosParaNodoMP(node, room.mapNodes.length);
        var uids = room.playerOrder;
        var combatPlayers = {};
        uids.forEach(function(uid){
          var p = room.players[uid];
          var mazoBarajado = shuffle((p.activeDeck || []).slice());
          var mano = mazoBarajado.splice(Math.max(0, mazoBarajado.length - 4), 4);
          var cp = {
            name: p.name, race: p.race,
            health: p.hp, maxHealth: p.maxHp,
            shield: 0, energy: 0, dice: [],
            diceCount: p.diceCount || 1,
            baseDamage: p.baseDamage != null ? p.baseDamage : 2,
            deck: mazoBarajado, hand: mano, discard: [],
            endedTurn: false
          };
          rollDiceForCombatPlayer(cp);
          combatPlayers[uid] = cp;
        });

        var mapNodes = room.mapNodes.slice(); mapNodes[idx] = node;

        tx.update(roomRef, {
          status: 'combat',
          currentNodeIndex: idx,
          mapNodes: mapNodes,
          combat: {
            enemies: enemigos,
            round: 1,
            players: combatPlayers,
            log: [entry('¡Comienza el combate cooperativo contra ' + enemigos.map(function(e){return e.name;}).join(' y ') + '!')]
          },
          updatedAt: serverTimestamp()
        });
      });
    } catch(err){ console.error(err); }
  }

  // Escribe en room.players el resultado final (HP/oro persistentes) y
  // desbloquea/reintenta el nodo. Se llama SIEMPRE desde dentro de una
  // transacción activa (recibe `tx` y el `room` ya leído).
  function finalizarCombateEnTransaccion(tx, roomRef, room, combat, victoria){
    var uids = Object.keys(combat.players);
    uids.forEach(function(u){
      var cp = combat.players[u];
      var rp = room.players[u];
      rp.hp = Math.max(victoria ? 1 : 1, Math.max(0, cp.health));
      if(victoria){
        var recompensa = 15 + Math.floor(Math.random()*10);
        if(combat.enemies.some(function(e){ return e.elite; })) recompensa += 25;
        if(combat.enemies.some(function(e){ return e.boss; })){
          recompensa += 60;
          rp.maxHp = (rp.maxHp || 100) + 10;
          rp.hp = rp.maxHp;
        }
        rp.gold = (rp.gold || 0) + recompensa;
      } else {
        rp.hp = 1; // derrota del equipo: se reintenta el nodo con 1 HP, no game over duro
      }
      room.players[u] = rp;
    });

    var idx = room.currentNodeIndex;
    var mapNodes = room.mapNodes.slice();
    if(victoria){
      mapNodes[idx].estado = 'completado';
      if(mapNodes[idx+1]) mapNodes[idx+1].estado = 'disponible';
    } else {
      mapNodes[idx].estado = 'disponible';
    }

    tx.update(roomRef, {
      status: 'map',
      mapNodes: mapNodes,
      players: room.players,
      combat: null,
      updatedAt: serverTimestamp()
    });
  }

  async function jugarCartaMP(handIndex){
    var roomRef = doc(db, 'rooms', state.roomCode);
    var uid = miUid();
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var combat = room.combat;
        if(!combat) return;
        var p = combat.players[uid];
        if(!p || p.endedTurn || p.health <= 0) return;
        var carta = p.hand[handIndex];
        if(!carta) return;
        if((p.energy || 0) < carta.costo) return;

        p.energy -= carta.costo;
        p.hand.splice(handIndex, 1);
        p.discard = p.discard || [];
        p.discard.push(carta);

        var log = combat.log || [];
        aplicarEfectoCartaMP(carta, p, combat, log);
        combat.players[uid] = p;
        combat.log = log.slice(-40);

        var victoria = combat.enemies.every(function(e){ return e.health <= 0; });
        var derrotaTotal = Object.keys(combat.players).every(function(u){ return combat.players[u].health <= 0; });

        if(victoria) return finalizarCombateEnTransaccion(tx, roomRef, room, combat, true);
        if(derrotaTotal) return finalizarCombateEnTransaccion(tx, roomRef, room, combat, false);
        tx.update(roomRef, { combat: combat, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
  }

  function aplicarEfectoCartaMP(carta, p, combat, log){
    var tipo = carta.tipoEfecto;
    var valor = typeof carta.valorEfecto === 'number' ? carta.valorEfecto : 0;
    if(tipo === 'ataque'){
      var objetivo = combat.enemies.find(function(e){ return e.id === state.selectedEnemyId && e.health > 0; })
                  || combat.enemies.find(function(e){ return e.health > 0; });
      if(objetivo){
        var dmg = (p.baseDamage || 0) + valor;
        if(objetivo.shield > 0){
          var bloqueado = Math.min(objetivo.shield, dmg);
          dmg = Math.max(0, dmg - objetivo.shield);
          objetivo.shield = Math.max(0, objetivo.shield - bloqueado);
          if(bloqueado > 0) log.push(entry(objetivo.name + ' bloqueó ' + bloqueado + ' de daño.'));
        }
        objetivo.health = Math.max(0, objetivo.health - dmg);
        log.push(entry(p.name + ' usa ' + carta.nombre + ' — inflige ' + dmg + ' daño a ' + objetivo.name + '.'));
      }
    } else if(tipo === 'defensa'){
      p.shield = (p.shield || 0) + valor;
      log.push(entry(p.name + ' usa ' + carta.nombre + ' y gana ' + valor + ' de escudo.'));
    } else if(tipo === 'cura'){
      var antes = p.health;
      p.health = Math.min(p.maxHealth, p.health + valor);
      log.push(entry(p.name + ' usa ' + carta.nombre + ' y cura ' + (p.health - antes) + ' HP.'));
    }
  }

  async function golpeBasicoMP(){
    var roomRef = doc(db, 'rooms', state.roomCode);
    var uid = miUid();
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var combat = room.combat;
        if(!combat) return;
        var p = combat.players[uid];
        if(!p || p.endedTurn || p.health <= 0) return;

        var objetivo = combat.enemies.find(function(e){ return e.id === state.selectedEnemyId && e.health > 0; })
                    || combat.enemies.find(function(e){ return e.health > 0; });
        var log = combat.log || [];
        if(objetivo){
          var dmg = p.baseDamage != null ? p.baseDamage : 2;
          if(objetivo.shield > 0){
            var bloqueado = Math.min(objetivo.shield, dmg);
            dmg = Math.max(0, dmg - objetivo.shield);
            objetivo.shield = Math.max(0, objetivo.shield - bloqueado);
            if(bloqueado > 0) log.push(entry(objetivo.name + ' bloqueó ' + bloqueado + ' de daño.'));
          }
          objetivo.health = Math.max(0, objetivo.health - dmg);
          log.push(entry(p.name + ' lanza un Golpe Básico — inflige ' + dmg + ' daño a ' + objetivo.name + '.'));
        }
        combat.log = log.slice(-40);

        var victoria = combat.enemies.every(function(e){ return e.health <= 0; });
        if(victoria) return finalizarCombateEnTransaccion(tx, roomRef, room, combat, true);
        tx.update(roomRef, { combat: combat, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
  }

  async function terminarTurnoMP(){
    var roomRef = doc(db, 'rooms', state.roomCode);
    var uid = miUid();
    try{
      await runTransaction(db, async function(tx){
        var snap = await tx.get(roomRef);
        var room = snap.data();
        var combat = room.combat;
        if(!combat) return;
        if(combat.players[uid]) combat.players[uid].endedTurn = true;

        var uids = Object.keys(combat.players);
        var todosTerminaron = uids.every(function(u){ return combat.players[u].endedTurn || combat.players[u].health <= 0; });
        if(!todosTerminaron){
          tx.update(roomRef, { combat: combat, updatedAt: serverTimestamp() });
          return;
        }

        // -------- Resolución de la IA de TODOS los enemigos --------
        var log = combat.log || [];
        combat.enemies.forEach(function(enemy){
          if(enemy.health <= 0) return;
          var mov = enemy.pattern[enemy.patternIndex % enemy.pattern.length];
          if(mov.tipo === 'ataque'){
            var vivos = uids.filter(function(u){ return combat.players[u].health > 0; });
            if(vivos.length === 0) return;
            // Objetiva al jugador con menos HP (el más amenazado del equipo).
            vivos.sort(function(a,b){ return combat.players[a].health - combat.players[b].health; });
            var objetivo = combat.players[vivos[0]];
            var dmg = mov.valor;
            if(objetivo.shield > 0){
              var bloqueado = Math.min(objetivo.shield, dmg);
              dmg = Math.max(0, dmg - objetivo.shield);
              objetivo.shield = Math.max(0, objetivo.shield - bloqueado);
              if(bloqueado > 0) log.push(entry(objetivo.name + ' bloqueó ' + bloqueado + ' de daño.'));
            }
            objetivo.health = Math.max(0, objetivo.health - dmg);
            log.push(entry(enemy.name + ' ataca a ' + objetivo.name + ' — inflige ' + dmg + ' daño.'));
          } else if(mov.tipo === 'bloqueo'){
            enemy.shield = (enemy.shield || 0) + mov.valor;
            log.push(entry(enemy.name + ' se protege y gana ' + mov.valor + ' de escudo.'));
          } else if(mov.tipo === 'cura'){
            var antes = enemy.health;
            enemy.health = Math.min(enemy.maxHealth, enemy.health + mov.valor);
            log.push(entry(enemy.name + ' se regenera ' + (enemy.health - antes) + ' HP.'));
          }
          enemy.patternIndex = (enemy.patternIndex + 1) % enemy.pattern.length;
        });

        var derrotaTotal = uids.every(function(u){ return combat.players[u].health <= 0; });
        combat.log = log.slice(-40);
        if(derrotaTotal){
          return finalizarCombateEnTransaccion(tx, roomRef, room, combat, false);
        }

        // -------- Nueva ronda --------
        combat.round = (combat.round || 1) + 1;
        uids.forEach(function(u){
          var p = combat.players[u];
          if(p.health <= 0) return;
          p.endedTurn = false;
          drawCardForCombatPlayer(p);
          rollDiceForCombatPlayer(p);
        });

        tx.update(roomRef, { combat: combat, updatedAt: serverTimestamp() });
      });
    } catch(err){ console.error(err); }
  }

  // ------------------------------------------------------------------
  // Render de combate
  // ------------------------------------------------------------------
  function renderCombateMP(room){
    showScreenMP('mpBattleScreen');
    var combat = room.combat;
    if(!combat) return;
    var uid = miUid();
    var me = combat.players[uid];
    var partnerUid = Object.keys(combat.players).filter(function(u){ return u !== uid; })[0];
    var partner = partnerUid ? combat.players[partnerUid] : null;

    var turnLabel = document.getElementById('mpTurnLabel');
    if(turnLabel) turnLabel.textContent = 'Ronda ' + combat.round;

    // -------- Enemigos (fila superior, objetivo seleccionable) --------
    var enemyRow = document.getElementById('mpEnemyRow');
    if(enemyRow){
      var vivos = combat.enemies.filter(function(e){ return e.health > 0; });
      if(!state.selectedEnemyId || !vivos.some(function(e){ return e.id === state.selectedEnemyId; })){
        state.selectedEnemyId = vivos[0] ? vivos[0].id : null;
      }
      enemyRow.innerHTML = '';
      combat.enemies.forEach(function(en){
        var card = document.createElement('button');
        card.type = 'button';
        card.className = 'mp-enemy-card' + (en.health <= 0 ? ' is-dead' : '') + (en.id === state.selectedEnemyId ? ' selected' : '');
        var pct = Math.max(0, Math.min(100, Math.round((en.health / en.maxHealth) * 100)));
        var intento = en.pattern[en.patternIndex % en.pattern.length];
        card.innerHTML =
          '<div class="mp-enemy-portrait">' + (en.boss ? '👑' : (en.elite ? '💀' : (raceEmoji(en.race)==='👤'?'👹':raceEmoji(en.race)))) + '</div>' +
          '<div class="mp-enemy-name">' + en.name + (en.shield > 0 ? ' 🛡️' + en.shield : '') + '</div>' +
          '<div class="hp-track hp-track--enemy mp-enemy-hp"><div class="hp-fill" style="width:' + pct + '%"></div></div>' +
          '<div class="mp-enemy-hp-text">' + Math.max(0, en.health) + '/' + en.maxHealth + '</div>' +
          (en.health > 0 ? '<div class="mp-enemy-intent">' + (INTENT_ICON[intento.tipo]||'❔') + ' ' + intento.valor + '</div>' : '<div class="mp-enemy-intent">💀 Derrotado</div>');
        if(en.health > 0){
          card.addEventListener('click', function(){ state.selectedEnemyId = en.id; renderCombateMP(state.room); });
        } else {
          card.disabled = true;
        }
        enemyRow.appendChild(card);
      });
    }

    // -------- Aliados (yo + compañero) --------
    var alliesRow = document.getElementById('mpAlliesRow');
    if(alliesRow){
      alliesRow.innerHTML = '';
      [ [uid, me, true], [partnerUid, partner, false] ].forEach(function(pair){
        var pUid = pair[0], p = pair[1], soyYo = pair[2];
        if(!p) return;
        var pct = Math.max(0, Math.min(100, Math.round((p.health / p.maxHealth) * 100)));
        var card = document.createElement('div');
        card.className = 'mp-ally-card' + (soyYo ? ' is-me' : '') + (p.health <= 0 ? ' is-down' : '');
        card.innerHTML =
          '<div class="mp-ally-avatar">' + raceEmoji(p.race) + '</div>' +
          '<div class="mp-ally-info">' +
            '<div class="mp-ally-name">' + p.name + (soyYo ? ' (tú)' : '') + '</div>' +
            '<div class="hp-track hp-track--player mp-ally-hp"><div class="hp-fill" style="width:' + pct + '%"></div></div>' +
            '<div class="mp-ally-hp-text">' + Math.max(0,p.health) + (p.shield>0 ? ' 🛡️'+p.shield : '') + '/' + p.maxHealth + '</div>' +
          '</div>' +
          '<div class="mp-ally-status">' + (p.health <= 0 ? '💀 Caído' : (p.endedTurn ? '✅ Esperando' : '⏳ En turno')) + '</div>';
        alliesRow.appendChild(card);
      });
    }

    // -------- Mano, dados, energía (solo del jugador local) --------
    var handEl = document.getElementById('mpHand');
    if(handEl && me){
      handEl.innerHTML = '';
      var puedoJugar = !me.endedTurn && me.health > 0;
      (me.hand || []).forEach(function(carta, idx){
        var c = document.createElement('div');
        c.className = 'card tipo-' + raceColorClass(carta.raza);
        if(!puedoJugar || (me.energy||0) < carta.costo) c.classList.add('no-energy');
        c.innerHTML =
          '<div class="title">' + carta.nombre + '</div>' +
          '<div class="meta">' + (carta.clase || '') + '</div>' +
          '<div class="desc">' + (carta.efecto || '') + '</div>' +
          '<div class="cost-row"><span class="cost-pip">' + carta.costo + '</span></div>';
        if(puedoJugar){
          c.addEventListener('click', function(){ jugarCartaMP(idx); });
        }
        handEl.appendChild(c);
      });
    }
    var handLabel = document.getElementById('mpHandLabel');
    if(handLabel) handLabel.textContent = me && me.endedTurn ? 'Tu mano (turno terminado — esperando a tu compañero)' : (me && me.health<=0 ? 'Has caído en combate' : 'Tu mano');

    var diceEl = document.getElementById('mpDice');
    if(diceEl && me){
      diceEl.innerHTML = '';
      (me.dice || []).forEach(function(v){
        var d = document.createElement('div'); d.className = 'die'; d.textContent = v;
        diceEl.appendChild(d);
      });
    }
    var totalEl = document.getElementById('mpDiceTotal');
    if(totalEl) totalEl.textContent = 'Energía: ' + (me ? (me.energy||0) : 0);
    var fillEl = document.getElementById('mpEnergyFill');
    if(fillEl && me){
      var maxPosible = Math.max(1, (me.diceCount||1) * 6);
      fillEl.style.width = Math.max(0, Math.min(100, Math.round(((me.energy||0)/maxPosible)*100))) + '%';
    }

    var basicBtn = document.getElementById('mpBasicStrikeBtn');
    if(basicBtn && me){
      var puedeJugarAlguna = (me.hand||[]).some(function(c){ return (me.energy||0) >= c.costo; });
      var mostrar = !me.endedTurn && me.health > 0 && !puedeJugarAlguna;
      basicBtn.classList.toggle('hidden', !mostrar);
      basicBtn.textContent = '🥊 Golpe Básico (+' + (me.baseDamage!=null?me.baseDamage:0) + ')';
    }

    var endBtn = document.getElementById('mpEndTurnBtn');
    var endLabel = document.getElementById('mpEndTurnLabel');
    if(endBtn){
      endBtn.disabled = !me || me.endedTurn || me.health <= 0;
      if(endLabel) endLabel.textContent = (me && me.endedTurn) ? 'Esperando…' : 'Terminar';
    }

    // -------- Registro de combate --------
    var logEl = document.getElementById('mpCombatLog');
    if(logEl){
      logEl.innerHTML = '';
      (combat.log || []).forEach(function(l){
        var d = document.createElement('div');
        d.textContent = '[' + new Date(l.time).toLocaleTimeString() + '] ' + l.text;
        logEl.appendChild(d);
      });
      logEl.scrollTop = logEl.scrollHeight;
    }
  }

  // ==================================================================
  // 5) Compartir / invitar
  // ==================================================================
  function enlaceInvitacion(code){
    return location.origin + location.pathname + '?room=' + code;
  }

  function copiarEnlaceInvitacion(){
    if(!state.roomCode) return;
    var link = enlaceInvitacion(state.roomCode);
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(link).then(function(){
        var btn = document.getElementById('mpCopyLinkBtn');
        if(btn){ var original = btn.textContent; btn.textContent = '✅ Enlace copiado'; setTimeout(function(){ btn.textContent = original; }, 1500); }
      }).catch(function(){ prompt('Copia el enlace de invitación:', link); });
    } else {
      prompt('Copia el enlace de invitación:', link);
    }
  }

  // ==================================================================
  // 6) Listeners de UI
  // ==================================================================
  document.addEventListener('DOMContentLoaded', function(){
    var params = new URLSearchParams(location.search);
    if(params.get('room')) state.pendingJoinCode = params.get('room').toUpperCase();

    var backBtn = document.getElementById('mpHubBackBtn');
    if(backBtn) backBtn.addEventListener('click', function(){ window.Game && window.Game.showMainMenu(); });

    var createBtn = document.getElementById('mpCreateBtn');
    if(createBtn) createBtn.addEventListener('click', crearSala);

    var joinBtn = document.getElementById('mpJoinBtn');
    if(joinBtn) joinBtn.addEventListener('click', function(){
      var input = document.getElementById('mpJoinCodeInput');
      unirseASala(input ? input.value : '');
    });

    var leaveLobbyBtn = document.getElementById('mpLeaveLobbyBtn');
    if(leaveLobbyBtn) leaveLobbyBtn.addEventListener('click', salirDeLaPartida);

    var copyLinkBtn = document.getElementById('mpCopyLinkBtn');
    if(copyLinkBtn) copyLinkBtn.addEventListener('click', copiarEnlaceInvitacion);

    var readyBtn = document.getElementById('mpReadyBtn');
    if(readyBtn) readyBtn.addEventListener('click', alternarListo);

    var startBtn = document.getElementById('mpStartBtn');
    if(startBtn) startBtn.addEventListener('click', iniciarExpedicionMP);

    var exitMapBtn = document.getElementById('mpExitToMenuMap');
    if(exitMapBtn) exitMapBtn.addEventListener('click', salirDeLaPartida);
    var exitEventBtn = document.getElementById('mpExitToMenuEvent');
    if(exitEventBtn) exitEventBtn.addEventListener('click', salirDeLaPartida);
    var backFromEventBtn = document.getElementById('mpBackToMapFromEvent');
    if(backFromEventBtn) backFromEventBtn.addEventListener('click', volverAlMapaMP);

    var endTurnBtn = document.getElementById('mpEndTurnBtn');
    if(endTurnBtn) endTurnBtn.addEventListener('click', terminarTurnoMP);
    var basicStrikeBtn = document.getElementById('mpBasicStrikeBtn');
    if(basicStrikeBtn) basicStrikeBtn.addEventListener('click', golpeBasicoMP);

    var menuBtn = document.getElementById('mpMenuBtn');
    var gameMenuDrawer = document.getElementById('mpGameMenuDrawer');
    var gameMenuScrim = document.getElementById('mpGameMenuScrim');
    if(menuBtn) menuBtn.addEventListener('click', function(){
      if(gameMenuDrawer) gameMenuDrawer.classList.remove('hidden');
      if(gameMenuScrim) gameMenuScrim.classList.remove('hidden');
    });
    if(gameMenuScrim) gameMenuScrim.addEventListener('click', function(){
      gameMenuDrawer.classList.add('hidden'); gameMenuScrim.classList.add('hidden');
    });
    var exitBattleBtn = document.getElementById('mpExitToMenuBattle');
    if(exitBattleBtn) exitBattleBtn.addEventListener('click', salirDeLaPartida);
    var exitBattleQuickBtn = document.getElementById('mpExitBattleBtn');
    if(exitBattleQuickBtn) exitBattleQuickBtn.addEventListener('click', salirDeLaPartida);

    var logBtn = document.getElementById('mpLogToggleBtn');
    var logDrawer = document.getElementById('mpLogDrawer');
    var logScrim = document.getElementById('mpLogScrim');
    if(logBtn) logBtn.addEventListener('click', function(){
      if(!logDrawer) return;
      var abrir = logDrawer.classList.contains('hidden');
      logDrawer.classList.toggle('hidden', !abrir);
      if(logScrim) logScrim.classList.toggle('hidden', !abrir);
    });
    if(logScrim) logScrim.addEventListener('click', function(){
      logDrawer.classList.add('hidden'); logScrim.classList.add('hidden');
    });
  });

  // API pública
  window.Multiplayer = {
    abrirHub: abrirHub,
    crearSala: crearSala,
    unirseASala: unirseASala,
    salirDeLaPartida: salirDeLaPartida
  };

})();
