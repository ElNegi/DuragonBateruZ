rules_version = '2';

// ============================================================================
// Reglas para el modo Multijugador Cooperativo de "Ecos de Ki".
//
// Cómo desplegarlas:
//   1. Firebase Console → proyecto "dragonlike-3f51d" → Firestore Database
//      → Reglas → pega este archivo → Publicar.
//   O con la CLI (si usas firebase-tools):
//   2. firebase deploy --only firestore:rules
//
// Modelo de seguridad:
//   - Cada sala es un documento en /rooms/{codigoDeSala}.
//   - Solo usuarios autenticados (incluye sesiones anónimas de "Acceso
//     rápido") pueden leer/crear/actualizar salas.
//   - Solo se puede CREAR una sala si el creador se declara a sí mismo
//     como host y como único jugador inicial.
//   - Solo se puede ACTUALIZAR una sala si ya eres uno de los jugadores
//     registrados en ella (antes o después de la escritura — esto permite
//     tanto jugar dentro de la sala como unirte por primera vez).
//   - Nadie puede leer la LISTA de salas (evita "sala-scanning" para
//     colarse en partidas ajenas); solo se puede leer una sala si conoces
//     su código exacto, que es como se implementa la invitación.
//   - No se permite borrar salas desde el cliente (limpieza de salas viejas
//     debería hacerse aparte, p. ej. con una Cloud Function programada).
// ============================================================================

service cloud.firestore {
  match /databases/{database}/documents {

    match /rooms/{roomId} {

      // Leer una sala requiere conocer su ID exacto (no hay "list").
      allow get: if request.auth != null;
      allow list: if false;

      // Crear: el propio usuario debe ser el host y el único jugador.
      allow create: if request.auth != null
                    && request.resource.data.hostUid == request.auth.uid
                    && request.resource.data.status == 'lobby'
                    && request.resource.data.playerOrder.size() == 1
                    && request.resource.data.playerOrder[0] == request.auth.uid;

      // Actualizar: debes ser ya parte de la sala, o estar añadiéndote a
      // ella (caso de unirse por código). No se permite cambiar el host.
      allow update: if request.auth != null
                    && request.resource.data.hostUid == resource.data.hostUid
                    && (request.auth.uid in resource.data.players
                        || request.auth.uid in request.resource.data.players);

      allow delete: if false;
    }
  }
}
