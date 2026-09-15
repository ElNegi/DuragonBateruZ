# Arquitectura

El núcleo separa estado, turnos, dados/Ki y recursos. Los sistemas de combate manejan estados, combos, reacciones, transformación e IA. Las cartas son datos en `src/cards/cards.json`; el motor resuelve sus efectos sin condicionales por nombre. UI consume servicios Firebase centralizados. Roguelike, salas y persistencia son módulos independientes.
