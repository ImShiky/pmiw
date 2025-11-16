// =========================================
// TP FINAL – Mini Juego Web (Opción A1 - Laberinto más complejo)
// Laberintos por matriz, 3 niveles, 3 vidas, menús y pantallas
// Autor: Juan Rodrigo Yane, Yanira Del Pilar Gómez Romero
// JUAN : TPFINALPARTE1 : https://www.youtube.com/watch?v=a3nr9_nVs8I&t=2s
// JUAN : TPFINALPARTE2 : https://www.youtube.com/watch?v=pNjy_6NCbNA&t=5s
// YANIRA : TPFINALPARTE1 : https://www.youtube.com/watch?v=eTnkx2vh3nA
// YANIRA : TPFINALPARTE2 : https://www.youtube.com/watch?v=9t8LMatme_0&t=1s
// Resolución: 640x480
// =========================================

let CELL = 40; // tamaño de celda -> 16x12 grid (640x480)
let COLS = 16;
let ROWS = 12;

let paredes = [];
let balas = [];
let enemigos = [];
let jugador;
let salida;
let juego;

let niveles = []; // matrices de niveles
let nivelActual = 0;

// Estados globales del menú
// "menu", "instrucciones", "jugando", "nivelCompletado", "gameover", "victoria"
let estadoGlobal = "menu";
//IMAGENES
let imgJugador, imgEnemigo, imgPared, imgSalida, imgBala;
//SONIDOS
let sndEscape, sndVictoria, sndGameover;

function preload() {
  // IMÁGENES (desde carpeta data/)
  imgJugador = loadImage('data/jugador.png');
  imgEnemigo = loadImage('data/enemigo.png');
  imgPared   = loadImage('data/pared.png');
  imgSalida  = loadImage('data/salida.png');

  // SONIDOS (desde carpeta data/)
  sndEscape   = loadSound('data/escape.mp3');
  sndVictoria = loadSound('data/victoria.mp3');
  sndGameover = loadSound('data/gameover.mp3');
}

// -----------------------------------------
// SETUP
// -----------------------------------------
function setup() {
  createCanvas(COLS * CELL, ROWS * CELL);
  prepararNiveles();
  iniciarNivel(0); // inicia en nivel 0 en modo preparación (no comienza hasta que presiones jugar)
}

// -----------------------------------------
// Dibujo principal
// -----------------------------------------
function draw() {
  background(20);

  if (estadoGlobal === "menu") {
    drawMenu();
    return;
  }

  if (estadoGlobal === "instrucciones") {
    drawInstrucciones();
    return;
  }

  if (estadoGlobal === "gameover") {
    drawGameOver();
    return;
  }

  if (estadoGlobal === "victoria") {
    drawVictoria();
    return;
  }

  if (estadoGlobal === "nivelCompletado") {
    drawNivelCompletado();
    return;
  }

  // jugando
  if (estadoGlobal === "jugando") {
    // actualizar
    jugador.mover();
    for (let e of enemigos) e.update();
    for (let b of balas) b.update();

    // chequear colisiones balas - jugador
    for (let b of balas) {
      if (b.viva && b.golpeaJugador()) {
        b.viva = false;
        perderVida();
      }
    }
    // chequear victoria en nivel
  if (salida.jugadorGano()) {
    if (nivelActual < niveles.length - 1) {
      if (sndEscape && !sndEscape.isPlaying()) sndEscape.play();
      estadoGlobal = "nivelCompletado";
    } else {
      if (sndVictoria && !sndVictoria.isPlaying()) sndVictoria.play();
      estadoGlobal = "victoria";
    }
  }

// chequear derrota
if (jugador.vidas <= 0) {
  if (sndGameover && !sndGameover.isPlaying()) sndGameover.play();
  estadoGlobal = "gameover";
  return; // frena el juego
}

    // chequear colisión enemigo jugador (contacto)
    for (let e of enemigos) {
      if (e.colisionaJugador()) {
        perderVida();
      }
    }

    // limpiar balas muertas
    balas = balas.filter(b => b.viva);

    // dibujar
    drawGrid(); // paredes creadas desde la matriz
    salida.draw();
    for (let b of balas) b.draw();
    for (let e of enemigos) e.draw();
    jugador.draw();
    drawHUD();

    // chequear victoria en nivel
    if (salida.jugadorGano()) {
      if (nivelActual < niveles.length - 1) {
        estadoGlobal = "nivelCompletado";
      } else {
        estadoGlobal = "victoria";
      }
    }
  }
}

// -----------------------------------------
// PREPARAR MATRICES DE NIVELES (OPCIÓN A1)
// 0 = libre, 1 = pared, 2 = salida (solo marcador)
// -----------------------------------------
function prepararNiveles() {
  // Nivel 0 (fácil) - laberinto más ancho y complejo pero jugable
  niveles.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,1,0,0,0,0,0,0,2,1],
    [1,0,1,1,1,0,0,1,0,1,1,1,1,0,0,1],
    [1,0,1,0,1,0,0,1,0,1,0,0,1,0,0,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,1,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,1,1,1,0,1,1,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);

  // Nivel 1 (medio) - incremento de pasillos anchos y ramificaciones
  niveles.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,0,0,0,0,1,0,0,0,1,0,0,2,1],
    [1,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,1,0,0,0,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,1,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,0,1,1,1,0,1,1,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);

  // Nivel 2 (difícil) - rutas más estrechas, más paredes pero aún jugable
  niveles.push([
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,1,1,0,0,0,1,0,1,1,0,0,0,2,1],
    [1,0,0,1,0,1,0,1,0,0,1,0,1,0,0,1],
    [1,1,0,1,0,1,0,1,1,0,1,0,1,1,0,1],
    [1,0,0,0,0,1,0,0,0,0,1,0,0,1,0,1],
    [1,0,1,1,0,1,1,1,1,0,1,1,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1],
    [1,0,1,0,1,1,1,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1],
    [1,1,1,1,1,0,1,1,0,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
  ]);
}

// -----------------------------------------
// INICIAR UN NIVEL (limpia arrays y crea objetos)
// -----------------------------------------
function iniciarNivel(index) {
  nivelActual = index;
  paredes = [];
  balas = [];
  enemigos = [];

  let mat = niveles[index];

  // crear paredes desde la matriz
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      let v = mat[r][c];
      if (v === 1) {
        paredes.push(new Pared(c * CELL, r * CELL, CELL, CELL));
      } else if (v === 2) {
        // salida
        salida = new Salida(c * CELL, r * CELL);
      }
    }
  }

  // crear jugador en celda inicial (1,1)
  jugador = new Jugador(CELL + (CELL - 30) / 2, CELL + (CELL - 30) / 2);
  jugador.vidas = 3; // 3 vidas por nivel (puedes cambiar si querés mantener entre niveles)

  // Enemigos según nivel (dificultad)
  if (index === 0) {
    // 1 enemigo lento
    enemigos.push(new Enemigo(14 * CELL + 4, 10 * CELL + 4, 1.0, 1500));
  } else if (index === 1) {
    // 2 enemigos, velocidad media
    enemigos.push(new Enemigo(14 * CELL + 4, 10 * CELL + 4, 1.2, 1100));
    enemigos.push(new Enemigo(8 * CELL + 4, 9 * CELL + 4, 1.2, 1100));
  } else if (index === 2) {
    // 3 enemigos, rápidos y disparo más frecuente
    enemigos.push(new Enemigo(14 * CELL + 4, 10 * CELL + 4, 1.6, 900));
    enemigos.push(new Enemigo(8 * CELL + 4, 9 * CELL + 4, 1.5, 900));
    enemiesSpawnRandom(1); // uno más aleatorio
  }

  // dejar el estado en menú de instrucciones para que el jugador apriete "JUGAR"
  estadoGlobal = "instrucciones";
}

// helper para crear un enemigo en una celda libre (aleatorio)
function enemiesSpawnRandom(n) {
  let attempts = 0;
  while (n > 0 && attempts < 200) {
    attempts++;
    let c = floor(random(1, COLS - 1));
    let r = floor(random(1, ROWS - 1));
    // chequear que en la matriz no haya pared y que no sea la salida y que no esté muy cerca del jugador
    if (niveles[nivelActual][r][c] === 0) {
      let ex = c * CELL + 4;
      let ey = r * CELL + 4;
      let d = dist(ex, ey, jugador.x, jugador.y);
      if (d > CELL * 3) {
        enemigos.push(new Enemigo(ex, ey, 1.4, 1000));
        n--;
      }
    }
  }
}

// -----------------------------------------
// DIBUJOS DE PANTALLAS
// -----------------------------------------
function drawMenu() {
  fill(255);
  textAlign(CENTER);
  textSize(36);
  text("ESCAPE DEL SÚBMARINO ", width / 2, 100);

  textSize(16);
  text("TP Final2 - Video Juego Web (Etapa 2)", width / 2, 140);
  text("Autor: Yanira del Pilar Gomez Romero y Juan Rodrigo Yane", width / 2, 160);

  textSize(14);
  text("Click para JUGAR", width / 2, 230);
  text("Click derecho para INSTRUCCIONES", width / 2, 260);

  // Mostrar niveles disponibles y cómo seleccionar con teclas 1-3
  text("Presiona 1 / 2 / 3 para elegir nivel (actual: " + (nivelActual + 1) + ")", width / 2, 320);
  text("Si cambias de nivel, presiona Click para iniciar ese nivel.", width / 2, 350);
}

function drawInstrucciones() {
  fill(255);
  textAlign(LEFT);
  textSize(18);
  text("INSTRUCCIONES", 20, 40);

  textSize(14);
  let y = 70;
  text("- Usa W A S D para moverte.", 20, y); y += 22;
  text("- Evita los enemigos y sus disparos.", 20, y); y += 22;
  text("- Llega a la casilla marcada para completar el nivel.", 20, y += 22);
  text("- Tienes 3 vidas. Al perder todas, GAME OVER.", 20, y += 22);
  text("- Niveles: 1 Fácil, 2 Medio, 3 Difícil.", 20, y += 22);
  text("", 20, y += 20);
  text("Click para comenzar nivel " + (nivelActual + 1), 20, y += 30);
  text("Volver al menú: presiona ESC", 20, y += 25);
}

function drawGameOver() {
  fill(255, 50, 50);
  textAlign(CENTER);
  textSize(48);
  text("GAME OVER", width / 2, height / 2 - 20);
  textSize(18);
  text("Click para volver al menú", width / 2, height / 2 + 20);
}

function drawNivelCompletado() {
  fill(0, 200, 0);
  textAlign(CENTER);
  textSize(36);
  text("¡NIVEL COMPLETADO!", width / 2, height / 2 - 20);
  textSize(16);
  text("Click para continuar al siguiente nivel", width / 2, height / 2 + 20);
}

function drawVictoria() {
  fill(0, 255, 150);
  textAlign(CENTER);
  textSize(44);
  text("¡VICTORIA!", width / 2, height / 2 - 20);
  textSize(18);
  text("Completaste todos los niveles", width / 2, height / 2 + 10);
  text("Click para volver al menú", width / 2, height / 2 + 40);
}

// -----------------------------------------
// DIBUJAR LA GRILLA (paredes)
// -----------------------------------------
function drawGrid() {
  for (let p of paredes) p.draw();
}

// -----------------------------------------
// HUD (vidas, nivel, instrucciones pequeñas)
// -----------------------------------------
function drawHUD() {
  fill(255);
  textSize(14);
  textAlign(LEFT);
  text("Vidas: " + jugador.vidas, 10, 18);
  text("Nivel: " + (nivelActual + 1), 120, 18);
  textAlign(RIGHT);
  text("TP Final - Escape", width - 10, 18);
}

// -----------------------------------------
// MOUSE / TECLAS
// -----------------------------------------
function mousePressed() {
  if (typeof userStartAudio === 'function') {
    userStartAudio();
  }
  if (estadoGlobal === "menu") {
    // inicia el nivel seleccionado
    iniciarNivel(nivelActual);
    estadoGlobal = "instrucciones";
    return;
  }

  if (estadoGlobal === "instrucciones") {
    // empieza a jugar
    estadoGlobal = "jugando";
    return;
  }

  if (estadoGlobal === "nivelCompletado") {
    // avanzar al siguiente nivel
    iniciarNivel(nivelActual + 1);
    estadoGlobal = "instrucciones";
    return;
  }

  if (estadoGlobal === "gameover" || estadoGlobal === "victoria") {
    // volver al menú principal
    estadoGlobal = "menu";
    return;
  }
}

function keyPressed() {
  // seleccionar nivel con 1,2,3 desde el menú
  if (estadoGlobal === "menu") {
    if (key === '1') {
      nivelActual = 0;
      iniciarNivel(0);
    } else if (key === '2') {
      nivelActual = 1;
      iniciarNivel(1);
    } else if (key === '3') {
      nivelActual = 2;
      iniciarNivel(2);
    }
  }

  // volver al menu con ESC
  if (keyCode === ESCAPE) {
    estadoGlobal = "menu";
  }
}

// -----------------------------------------
// REDUCIR VIDA y reiniciar posicion jugador
// -----------------------------------------
function perderVida() {
  // proteger llamada múltiple rápida
  if (estadoGlobal !== "jugando") return;

  jugador.vidas--;
  if (jugador.vidas <= 0) {
    estadoGlobal = "gameover";
    return;
  }

  // reiniciar posición del jugador en la celda inicial
  jugador.x = CELL + (CELL - jugador.w) / 2;
  jugador.y = CELL + (CELL - jugador.h) / 2;

  // opcional: limpiar balas en pantalla para dar un respiro
  balas = [];
}

// =====================================================
// CLASES
// =====================================================

// ----------- Pared -----------
class Pared {
  constructor(x, y, w, h) {
    this.x = x; this.y = y; this.w = w; this.h = h;
  }

  draw() {
    image(imgPared, this.x, this.y, this.w, this.h);
  }

  colisiona(obj) {
    return !(obj.x + obj.w < this.x ||
             obj.x > this.x + this.w ||
             obj.y + obj.h < this.y ||
             obj.y > this.y + this.h);
  }
}

// ----------- Jugador -----------
class Jugador {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = 30; this.h = 30;
    this.vel = 2.6;
    this.vidas = 3;
  }

  mover() {
    let px = this.x;
    let py = this.y;

    let movX = 0;
    let movY = 0;

    if (keyIsDown(87)) movY -= this.vel; // W
    if (keyIsDown(83)) movY += this.vel; // S
    if (keyIsDown(65)) movX -= this.vel; // A
    if (keyIsDown(68)) movX += this.vel; // D

    // eje X
    this.x += movX;
    for (let p of paredes) if (p.colisiona(this)) this.x = px;

    // eje Y
    this.y += movY;
    for (let p of paredes) if (p.colisiona(this)) this.y = py;
  }

  draw() {
    image(imgJugador, this.x, this.y, this.w, this.h);
  }
}

// ----------- Enemigo -----------
class Enemigo {
  // x,y: posición; vel: velocidad; delay: ms entre disparos
  constructor(x, y, vel = 1.4, delay = 1200) {
    this.x = x; this.y = y;
    this.w = 28; this.h = 28;
    this.vel = vel;
    this.tiempoDisparo = 0;
    this.delay = delay;
    this.recentlyHit = 0; // para no chocar múltiples frames seguidos
  }

  update() {
    // perseguir al jugador (movimiento por ejes)
    let dx = jugador.x - this.x;
    let dy = jugador.y - this.y;
    let dist = sqrt(dx * dx + dy * dy) || 0.0001;

    if (dist > 0.5) {
      let mx = (dx / dist) * this.vel;
      let my = (dy / dist) * this.vel;

      let px = this.x;
      let py = this.y;

      this.x += mx;
      for (let p of paredes) if (p.colisiona(this)) this.x = px;

      this.y += my;
      for (let p of paredes) if (p.colisiona(this)) this.y = py;
    }

    // disparar hacia el jugador según delay
    if (millis() > this.tiempoDisparo + this.delay) {
      balas.push(new Bala(this.x + this.w / 2 - 5, this.y + this.h / 2 - 5, jugador.x + jugador.w / 2, jugador.y + jugador.h / 2));
      this.tiempoDisparo = millis();
    }
  }

  draw() {
    image(imgEnemigo, this.x, this.y, this.w, this.h);
  }

  colisionaJugador() {
    // colisión aabb
    return !(this.x + this.w < jugador.x ||
             this.x > jugador.x + jugador.w ||
             this.y + this.h < jugador.y ||
             this.y > jugador.y + jugador.h);
  }
}

// ----------- Bala -----------
class Bala {
  constructor(x, y, tx, ty) {
    this.x = x; this.y = y;
    this.w = 10; this.h = 10;
    let dx = tx - x;
    let dy = ty - y;
    let dist = sqrt(dx*dx + dy*dy) || 0.0001;
    this.vx = (dx / dist) * 4.2;
    this.vy = (dy / dist) * 4.2;
    this.viva = true;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // colisión con paredes
    for (let p of paredes) {
      if (p.colisiona(this)) {
        this.viva = false;
      }
    }

    // fuera de pantalla
    if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) this.viva = false;
  }

  draw() {
    fill(255, 200, 0);
    rect(this.x, this.y, this.w, this.h);
  }

  golpeaJugador() {
    return !(this.x + this.w < jugador.x ||
             this.x > jugador.x + jugador.w ||
             this.y + this.h < jugador.y ||
             this.y > jugador.y + jugador.h);
  }
}

// ----------- Salida -----------
class Salida {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.w = CELL; this.h = CELL;
  }

  draw() {
    fill(0, 200, 0);
    rect(this.x, this.y, this.w, this.h);
    fill(255);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("SALIDA", this.x + this.w/2, this.y + this.h/2);
  }

  jugadorGano() {
    return !(jugador.x + jugador.w < this.x ||
             jugador.x > this.x + this.w ||
             jugador.y + jugador.h < this.y ||
             jugador.y > this.y + this.h);
  }
}
