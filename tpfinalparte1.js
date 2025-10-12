// ===============================
// TP FINAL - 20.000 Leguas (p5.js)
// Juan Rodrigo Yane / Yanira Gómez Romero
// ===============================
// VIDEO DE YANIRA DEL PILAR GOMEZ ROMERO : https://www.youtube.com/watch?v=AMLD0Z1RN74
// VIDEO DE JUAN RODRIGO YANE : https://www.youtube.com/watch?v=a3nr9_nVs8I

let slides = [];
let textos = [];
let currentSlide = 1;
let totalSlides = 27;
let botones = [];
let alphaTexto = 0; // transparencia del texto
let alphaVelocidad = 5; // velocidad de fade-in

// --- Sonidos ---
let sonidoBueno, sonidoMalo, sonidoNeutral;

function preload() {
  // Cargar las imágenes
  for (let i = 1; i <= totalSlides; i++) {
    slides[i] = loadImage(`data/slide${i}.png`);
  }
  sonidoBueno    = loadSound('data/sonidofinalbueno.mp3');
  sonidoMalo     = loadSound('data/sonidofinalmalo.mp3');
  sonidoNeutral  = loadSound('data/sonidofinalneutral.mp3');
}

function setup() {
  createCanvas(640, 480);
  textAlign(CENTER, CENTER);
  textSize(20);
  noStroke();
  cargarTextos(); // inicializa los textos
}

function draw() {
  background(0);

  // Mostrar imagen
  if (slides[currentSlide]) {
    image(slides[currentSlide], 0, 0, width, height);
  }

  // Mostrar texto narrativo
  mostrarTexto();

  // Mostrar botones interactivos (antes de dibujarlos, limpiamos botones)
  // para evitar acumulación de rects viejos
  botones = []; //
  mostrarBotones();
}

// ===============================
// SISTEMA DE TEXTO NARRATIVO
// =============================== Acá va toda la lógica de ltexto
function mostrarTexto() {
  if (!textos[currentSlide]) return; // si no hay texto, no muestra nada

  fill(0, 150); // fondo oscuro para mejorar lectura
  rect(0, height - 60, width, 120);

  fill(255, alphaTexto);
  textSize(18);
  text(textos[currentSlide], 10, 400, width - 40, 100);

  // efecto de aparición suave
  if (alphaTexto < 255) alphaTexto += alphaVelocidad;
}

function cargarTextos() {
  textos[1] = "Bienvenido a la aventura alternativa de '20.000 Leguas de Viaje Submarino'.";
  textos[2] = "Un profesor recibe un misterioso llamado: una criatura desconocida acecha el mar...";
  textos[3] = "En el barco rumbo al viaje, el profesor, su alumno y un marinero se preparan para la expedición.";
  textos[4] = "Entre la niebla, una silueta gigantesca emerge del agua... ¿una criatura?";
  textos[5] = "El profesor cae al mar, su asistente lo rescata. Descubren que la criatura es un submarino.";
  textos[6] = "Dentro del submarino, el enigmático Capitán Nemo los obliga a unirse a su tripulación.";
  textos[7] = "Nemo les muestra el funcionamiento del submarino y los misterios de las profundidades marinas.";
  textos[8] = "Equipados con trajes acuáticos, los protagonistas exploran un mundo submarino lleno de vida y peligro.";
  textos[9] = "Un choque con un glaciar deja al submarino inmóvil. Los protagonistas planean escapar.";
  textos[10] = "Durante la huida, encuentran una isla en medio del océano y deciden refugiarse allí.";
  textos[11] = "Pero la isla está habitada por caníbales. Deben regresar rápidamente al submarino.";
  textos[12] = "En medio del escape los protagonistas suben al bote mientras que a lo lejos se avecina cientos de canibales queriendo atraparlos a como de lugar.";
  textos[13] = "El general se da cuenta, del intento de escape de los protas, y les recomienda que no lo sigan haciendo, ya que cualquier intento será en vano.";
  textos[14] = "El profesor y sus acompañantes se resignan al escape.";
  textos[15] = "Hasta que 2 barcos de guerra interceptan el submarino y lo hunden.";
  textos[16] = "El general obliga a su tripulación, hundirse junto al submarino y descansar en paz.";
  textos[17] = "En la celda, el profesor y sus acompañantes deben decidir: ¿esperar su destino o intentar escapar?";
  textos[18] = "Deciden escapar. Usando una ganzúa improvisada, logran abrir la puerta.";
  textos[19] = "Corren por los pasillos del submarino, el caos los rodea.";
  textos[20] = "Suben a la superficie justo cuando el submarino explota en las profundidades.";
  textos[21] = "Has sobrevivido. Final bueno.";
  textos[22] = "El profesor y sus compañeros deciden quedarse junto a Nemo.";
  textos[23] = "El Capitán presiona la palanca. El submarino se autodestruye lentamente.";
  textos[24] = "El mar se traga los restos del Nautilus. Final malo.";
  textos[25] = "El profesor rechaza la expedición y continúa con su vida cotidiana.";
  textos[26] = "Has evitado el peligro, pero también la gloria. Final neutral.";
  textos[27] = "Créditos — Juan Rodrigo Yane & Yanira Gómez Romero — Comisión 5.";
}

// ===============================
// BOTONES INTERACTIVOS Y LÓGICA
// ===============================
function mostrarBotones() {
  fill(255);
  textSize(18);

  // reset de transparencia al cambiar de slide
  if (frameCount % 2 === 0 && alphaTexto < 255) alphaTexto += 2;

  if (currentSlide === 1) {
    boton("INICIAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(2));
  } else if (currentSlide === 2) {
    boton("IR A LA AVENTURA", width / 2 - 150, height - 160, 140, 40, () => cambiarSlide(3));
    boton("RECHAZAR", width / 2 + 20, height - 160, 120, 40, () => cambiarSlide(25));
  } else if (currentSlide === 25) {
    boton("CONTINUAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(26));
  } else if (currentSlide === 26) {
    boton("CRÉDITOS", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(27));
  } else if (currentSlide === 27) {
    boton("REINICIAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(1));
  } else if (currentSlide === 17) {
    boton("QUEDARSE", width / 2 - 150, height - 160, 140, 40, () => cambiarSlide(22));
    boton("ESCAPAR", width / 2 + 20, height - 160, 120, 40, () => cambiarSlide(18));
  } else if (currentSlide >= 3 && currentSlide < 17) {
    boton("CONTINUAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(currentSlide + 1));
  } else if ([18, 19, 20].includes(currentSlide)) {
    boton("CONTINUAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(currentSlide + 1));
  } else if (currentSlide === 21) {
    boton("CRÉDITOS", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(27));
  } else if ([22, 23].includes(currentSlide)) {
    boton("CONTINUAR", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(currentSlide + 1));
  } else if (currentSlide === 24) {
    boton("CRÉDITOS", width / 2 - 60, height - 160, 120, 40, () => cambiarSlide(27));
  }
}

function boton(texto, x, y, w, h, accion) {
  let dentro = mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
  fill(dentro ? "#1E90FF" : "rgba(0,0,0,150)");
  rect(x, y, w, h, 10);
  fill(255);
  text(texto, x + w / 2, y + h / 2);
  // guardo el botón actual para que mousePressed lo entienda
  botones.push({ x, y, w, h, accion });
}

function mousePressed() {
  for (let b of botones) {
    if (mouseX > b.x && mouseX < b.x + b.w && mouseY > b.y && mouseY < b.y + b.h) {
      b.accion();
      break;
    }
  }
  // NO hace falta 'botones = []' aqui porque lo limpiamos al inicio del draw()
}

// Cambiar slide y reproducir/parar audios según final
function cambiarSlide(nuevo) {
  // Detener posibles sonidos previos
  if (sonidoBueno && sonidoBueno.isPlaying()) sonidoBueno.stop();
  if (sonidoMalo && sonidoMalo.isPlaying()) sonidoMalo.stop();
  if (sonidoNeutral && sonidoNeutral.isPlaying()) sonidoNeutral.stop();

  currentSlide = nuevo;
  alphaTexto = 0; // reinicia el fade-in del texto

  // reproducir sonido según slides finales
  if (currentSlide === 21) { // final bueno
    if (sonidoBueno) sonidoBueno.play();
  } else if (currentSlide === 24) { // final malo
    if (sonidoMalo) sonidoMalo.play();
  } else if (currentSlide === 26) { // final neutral
    if (sonidoNeutral) sonidoNeutral.play();
  }
}
