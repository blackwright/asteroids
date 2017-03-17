# [asteroids](https://blackwright.github.io/asteroids/index.html)

The classic game implemented with JavaScript and HTML5 canvas. [Play it here.](https://blackwright.github.io/asteroids/index.html)

Use your arrow keys to accelerate/rotate and hit space to fire.

![Screenshot](https://github.com/blackwright/asteroids/blob/master/screenshots/asteroids1.jpg?raw=true)

### Gameplay Details

- Shoot asteroids and stay alive to increase your score.
- Dodge asteroids, but be careful - your inertia is conserved in space!
- Large asteroids will break apart into smaller asteroids when shot.
- Both your ship and the asteroids wrap around the edges of the play area.
- Additional asteroids spawn over time.

![Screenshot](https://github.com/blackwright/asteroids/blob/master/screenshots/asteroids2.jpg?raw=true)

### Technical Notes

- All moving objects inherit properties from a single prototype.
- JavaScript organized with revealing modules and return object stubs in MVC style.
- Modules passed as arguments via dependency injection.
- Event handlers attached with jQuery.
- Reset button restarts the game by reinitializing modules.
- Keypresses tracked in object for smoother gameplay.
