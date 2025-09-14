//Buenas profesor, representé lo más fiel posible a la obra, el degrade que me pediste lo intenté hacer pero no pude, intenté algo como if(deg1<255) deg+=25; if(deg2<129); deg2+=20, y así sucesivamente, pero no supe como aplicarlo. Y el for anidado me dijiste que no lo haga porque no era posible en esta obra, aclarando eso gracias profe, ojalá verlo en el próximo cuatrimestre
//Juan Rodrigo Yane 122951/8
// LINK DEL VIDEO : https://www.youtube.com/watch?v=eFZr2K_1htE

let posx = 400;
let posy = 0;
let negro = 0;
let blanco = 255;
let negro2 = 0;
let blanco2 = 255;
let negro3 = 0;
let blanco3 = 255;
let oparts;
let colorActual;
let verificacion_color = false;

function preload(){
  oparts = loadImage("data/opart.jpg");
}

function setup(){
  createCanvas(800, 400); //TAMAÑO PEDIDO SEGÚN LA CONSIGNA
  noFill();
  stroke(0);
}

function draw(){
  background(255);
  ilusion();
  image(oparts, 0, 0, 400, 400); //IMAGÉN A LA IZQUIERDA PEDIDA EN LA CONSIGNA
}
