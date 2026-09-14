/* auth.js
   -----------------------------------------------------------------------
   Autenticación de Ecos de Ki con Firebase Auth.

   Objetivos de esta versión:
   - Email/contraseña y registro con Firebase.
   - Acceso rápido Admin 1 / Admin 2 mediante Auth anónimo cuando está habilitado.
   - Si Auth anónimo no está habilitado, los botones Admin siguen permitiendo
     probar el modo local/solitario (sin acceso a Firestore/multijugador).
   - Transición robusta Login -> Menú incluso si game.js todavía está terminando
     de inicializarse.
   - Errores de Firebase visibles y comprensibles (dominio no autorizado,
     proveedor deshabilitado, API key, red, credenciales...).
   - Persistencia con fallback si el navegador bloquea localStorage/IndexedDB.
*/
import { auth } from "./firebase-init.js";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInAnonymously,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  inMemoryPersistence
} from "firebase/auth";

(function(){
  'use strict';

  var modo = 'login';
  var yaResueltoInicial = false;
  var transitionToken = 0;

  var MENSAJES_ERROR = {
    'auth/invalid-email': 'El correo no es válido.',
    'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
    'auth/user-not-found': 'No existe ninguna cuenta con ese correo.',
    'auth/wrong-password': 'Contraseña incorrecta.',
    'auth/invalid-credential': 'Correo o contraseña incorrectos.',
    'auth/email-already-in-use': 'Ya existe una cuenta con ese correo.',
    'auth/weak-password': 'La contraseña debe tener al menos 6 caracteres.',
    'auth/too-many-requests': 'Demasiados intentos. Prueba de nuevo en unos minutos.',
    'auth/network-request-failed': 'Error de conexión con Firebase. Revisa tu red e inténtalo de nuevo.',
    'auth/unauthorized-domain': 'Este dominio no está autorizado en Firebase Authentication.',
    'auth/operation-not-allowed': 'Este método de inicio de sesión no está habilitado en Firebase Authentication.',
    'auth/admin-restricted-operation': 'El acceso anónimo está deshabilitado en Firebase Authentication.',
    'auth/app-not-authorized': 'Esta aplicación o dominio no está autorizado para usar Firebase Authentication.',
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.': 'La clave pública de Firebase no es válida.',
    'auth/internal-error': 'Firebase devolvió un error interno. Inténtalo de nuevo.'
  };

  function $(id){ return document.getElementById(id); }

  function init(){
    var form = $('loginForm');
    if(form) form.addEventListener('submit', handleFormSubmit);

    var tabLogin = $('tabLogin');
    if(tabLogin) tabLogin.addEventListener('click', function(){ setModo('login'); });

    var tabRegister = $('tabRegister');
    if(tabRegister) tabRegister.addEventListener('click', function(){ setModo('register'); });

    var quick1 = $('quickAdmin1');
    if(quick1) quick1.addEventListener('click', function(e){ loginRapido(e, 1); });

    var quick2 = $('quickAdmin2');
    if(quick2) quick2.addEventListener('click', function(e){ loginRapido(e, 2); });

    var logoutBtn = $('logoutBtn');
    if(logoutBtn) logoutBtn.addEventListener('click', logout);

    var logoutBattleBtn = $('logoutBattleBtn');
    if(logoutBattleBtn) logoutBattleBtn.addEventListener('click', logout);

    // Diagnóstico disponible desde la consola del navegador.
    window.ECOS_FIREBASE_STATUS = {
      projectId: auth && auth.app && auth.app.options ? auth.app.options.projectId : null,
      authDomain: auth && auth.app && auth.app.options ? auth.app.options.authDomain : null,
      host: window.location.hostname,
      origin: window.location.origin,
      initialized: true
    };

    onAuthStateChanged(auth, handleAuthStateChanged, function(err){
      console.error('[Auth] onAuthStateChanged falló:', err);
      mostrarError(formatearError(err));
    });
  }

  function setModo(nuevoModo){
    modo = nuevoModo;
    var tabLogin = $('tabLogin');
    var tabRegister = $('tabRegister');
    var confirmInput = $('registerPassConfirm');
    var submitBtn = $('loginSubmitBtn');
    var passInput = $('loginPass');

    if(tabLogin) tabLogin.classList.toggle('active', modo === 'login');
    if(tabRegister) tabRegister.classList.toggle('active', modo === 'register');
    if(confirmInput){
      confirmInput.classList.toggle('hidden', modo !== 'register');
      confirmInput.required = (modo === 'register');
      if(modo !== 'register') confirmInput.value = '';
    }
    if(passInput) passInput.setAttribute('autocomplete', modo === 'register' ? 'new-password' : 'current-password');
    if(submitBtn) submitBtn.textContent = modo === 'register' ? 'Crear cuenta' : 'Iniciar sesión';
    ocultarError();
  }

  function setBusy(busy){
    var submit = $('loginSubmitBtn');
    var quick1 = $('quickAdmin1');
    var quick2 = $('quickAdmin2');
    [submit, quick1, quick2].forEach(function(btn){
      if(btn) btn.disabled = !!busy;
    });
    if(submit){
      if(busy) submit.dataset.previousText = submit.textContent;
      submit.textContent = busy ? 'Conectando…' : (submit.dataset.previousText || (modo === 'register' ? 'Crear cuenta' : 'Iniciar sesión'));
    }
  }

  function mostrarError(mensaje){
    var el = $('authError');
    if(!el) return;
    el.textContent = mensaje;
    el.classList.remove('hidden');
  }

  function ocultarError(){
    var el = $('authError');
    if(!el) return;
    el.classList.add('hidden');
    el.textContent = '';
  }

  function formatearError(err){
    var code = err && err.code ? err.code : '';
    var base = MENSAJES_ERROR[code] || 'No se pudo completar la operación con Firebase.';
    if(code === 'auth/unauthorized-domain' || code === 'auth/app-not-authorized'){
      base += ' Añade "' + window.location.hostname + '" en Firebase Console → Authentication → Settings → Authorized domains.';
    }
    if(code === 'auth/operation-not-allowed' || code === 'auth/admin-restricted-operation'){
      base += ' Activa el proveedor correspondiente en Firebase Console → Authentication → Sign-in method.';
    }
    if(err && err.message) console.error('[Auth]', code || 'sin-código', err.message);
    return base;
  }

  async function aplicarPersistencia(remember){
    var preferida = remember ? browserLocalPersistence : browserSessionPersistence;
    try {
      await setPersistence(auth, preferida);
    } catch(err){
      console.warn('[Auth] La persistencia elegida no está disponible. Se usará memoria temporal.', err);
      await setPersistence(auth, inMemoryPersistence);
    }
  }

  async function handleFormSubmit(e){
    if(e && typeof e.preventDefault === 'function') e.preventDefault();
    ocultarError();

    var emailInput = $('loginUser');
    var passInput = $('loginPass');
    var confirmInput = $('registerPassConfirm');
    var rememberInput = $('rememberUser');

    var email = (emailInput && emailInput.value.trim()) || '';
    var pass = (passInput && passInput.value) || '';
    var remember = !!(rememberInput && rememberInput.checked);

    if(!email || !pass){
      mostrarError('Introduce correo y contraseña.');
      return;
    }

    if(modo === 'register'){
      var confirm = (confirmInput && confirmInput.value) || '';
      if(pass !== confirm){
        mostrarError('Las contraseñas no coinciden.');
        return;
      }
    }

    setBusy(true);
    try {
      await aplicarPersistencia(remember);
      var credential = modo === 'register'
        ? await createUserWithEmailAndPassword(auth, email, pass)
        : await signInWithEmailAndPassword(auth, email, pass);

      // onAuthStateChanged seguirá siendo la fuente real de sesión, pero
      // hacemos la transición también aquí para que el usuario no quede
      // bloqueado visualmente si el callback tarda unas décimas.
      if(credential && credential.user){
        aplicarUsuarioFirebase(credential.user);
        abrirMenuSeguro();
      }
    } catch(err){
      mostrarError(formatearError(err));
    } finally {
      setBusy(false);
    }
  }

  async function loginRapido(e, numero){
    if(e && typeof e.preventDefault === 'function') e.preventDefault();
    ocultarError();
    setBusy(true);

    try {
      await aplicarPersistencia(false);
      var credential = await signInAnonymously(auth);
      if(credential && credential.user){
        aplicarUsuarioFirebase(credential.user, 'Admin ' + numero);
        window.CURRENT_USER.quickAdmin = numero;
        abrirMenuSeguro();
      }
    } catch(err){
      // Los accesos Admin son herramientas de prueba. Si Firebase Anonymous
      // no está habilitado, dejamos probar el modo solitario sin bloquear la UI.
      // Firestore/multijugador sigue requiriendo una sesión Firebase real.
      console.warn('[Auth] Acceso anónimo no disponible; entrando en modo local de prueba.', err);
      window.CURRENT_USER = {
        uid: 'local-admin-' + numero,
        name: 'Admin ' + numero,
        quickAdmin: numero,
        isLocalTest: true,
        firebaseAuthenticated: false
      };
      mostrarAvisoLocal('Admin ' + numero);
      abrirMenuSeguro();
    } finally {
      setBusy(false);
    }
  }

  function mostrarAvisoLocal(nombre){
    console.warn('[Auth] ' + nombre + ' está usando sesión local. El modo multijugador requiere Firebase Auth.');
  }

  function aplicarUsuarioFirebase(user, forcedName){
    var previo = window.CURRENT_USER || {};
    window.CURRENT_USER = previo;
    window.CURRENT_USER.uid = user.uid;
    window.CURRENT_USER.name = forcedName
      || previo.name
      || user.displayName
      || (user.isAnonymous ? 'Invitado' : (user.email ? user.email.split('@')[0] : 'Jugador'));
    window.CURRENT_USER.email = user.email || null;
    window.CURRENT_USER.isAnonymous = !!user.isAnonymous;
    window.CURRENT_USER.isLocalTest = false;
    window.CURRENT_USER.firebaseAuthenticated = true;
  }

  function abrirMenuSeguro(){
    var myToken = ++transitionToken;
    var intentos = 0;

    function intentar(){
      if(myToken !== transitionToken) return;
      intentos += 1;
      if(window.Game && typeof window.Game.showMainMenu === 'function'){
        window.Game.showMainMenu();
        return;
      }
      if(intentos < 60){
        window.setTimeout(intentar, 50);
        return;
      }

      // Último fallback: nunca dejamos al usuario atrapado en Login por un
      // problema de orden de carga de scripts.
      var screens = document.querySelectorAll('.screen');
      for(var i=0;i<screens.length;i++) screens[i].classList.add('hidden');
      var menu = $('menuScreen');
      if(menu) menu.classList.remove('hidden');
      var nameEl = $('menuHeroName');
      if(nameEl) nameEl.textContent = (window.CURRENT_USER && window.CURRENT_USER.name) || 'Jugador';
      console.warn('[Auth] Game.showMainMenu no estuvo disponible; se aplicó transición visual de emergencia.');
    }

    intentar();
  }

  async function logout(){
    transitionToken += 1;
    if(window.CURRENT_USER && window.CURRENT_USER.isLocalTest){
      window.CURRENT_USER = null;
      if(window.Game && typeof window.Game.resetJuego === 'function') window.Game.resetJuego('login');
      else mostrarLoginFallback();
      return;
    }
    try {
      await signOut(auth);
    } catch(err){
      console.error('Error al cerrar sesión:', err);
      mostrarError(formatearError(err));
    }
  }

  function mostrarLoginFallback(){
    var screens = document.querySelectorAll('.screen');
    for(var i=0;i<screens.length;i++) screens[i].classList.add('hidden');
    var login = $('loginScreen');
    if(login) login.classList.remove('hidden');
  }

  function handleAuthStateChanged(user){
    if(user){
      aplicarUsuarioFirebase(user);
      var form = $('loginForm');
      if(form) form.reset();
      ocultarError();
      abrirMenuSeguro();
    } else {
      // No machacar una sesión Admin local creada como fallback.
      if(window.CURRENT_USER && window.CURRENT_USER.isLocalTest){
        yaResueltoInicial = true;
        return;
      }
      window.CURRENT_USER = null;
      if(yaResueltoInicial){
        if(window.Game && typeof window.Game.resetJuego === 'function') window.Game.resetJuego('login');
        else mostrarLoginFallback();
      }
    }
    yaResueltoInicial = true;
  }

  window.EcosAuth = {
    logout: logout,
    getStatus: function(){
      return {
        firebaseUser: auth.currentUser ? {
          uid: auth.currentUser.uid,
          email: auth.currentUser.email,
          anonymous: auth.currentUser.isAnonymous
        } : null,
        currentUser: window.CURRENT_USER || null,
        projectId: auth.app.options.projectId,
        authDomain: auth.app.options.authDomain,
        host: window.location.hostname
      };
    }
  };

  // En módulos, DOMContentLoaded normalmente aún no ha ocurrido, pero este
  // guard hace que funcione también si el script se inyecta o carga tarde.
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();

})();
