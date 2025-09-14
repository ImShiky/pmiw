function ilusion() { //FUNCIÓN QUE NO RETORNA UN VALOR, ya que no es un no es un void draw ni setup, ya que no devuelve ningún resultado con RETURN
  push();
  noStroke();
  let vof = 0;
  let rectx=0;
  let recty=0;
  translate(400,0);
  for (let i = 1; i <11; i ++){
    push();
    if (verificacion_color == false) {
      if(espar(vof)) fill(negro); else fill(blanco);
    }
      else {
        if(espar(vof)) fill(blanco); else fill(negro);
      }
    vof ++;
    let tam = map(i,1,10,400,200);//400/i; //MAP PEDIDO POR LAS CONSIGNA
    rectx = map(i,1,11,0,150);
    recty = map(i,1,11,0,100);
    rect(rectx,recty,tam,tam);
    pop();
  }
  pop();
  //SEGUNDO FOR
  push();
  noStroke();
  translate(514,75);
    for (let i = 1; i <11; i ++){
      push();
      if (verificacion_color == false) {
        if(espar(vof)) fill(negro2); else fill(blanco2);
      }
        else {
          if(espar(vof)) fill(blanco2); else fill(negro2);
        }
      vof ++;
      let tam = map(i,1,10,230,86);
      rectx = map(i,1,11,0,40);
      recty = map(i,1,11,0,100);
      rect(rectx,recty,tam,tam);
      pop();
    }
    pop();
    //TERCER FOR
  push();
  noStroke();
  translate(550,168);
    for (let i = 1; i <16; i ++){
      push();
      if (verificacion_color == false) {
        if(espar(vof)) fill(negro3); else fill(blanco3);
      }
        else {
          if(espar(vof)) fill(blanco3); else fill(negro3);
        }
      vof ++;
      let tam = map(i,1,10,80,35);
      rectx = map(i,1,11,0,5);
      recty = map(i,1,11,0,30);
      rect(rectx,recty,tam,tam);
      pop();
    }
    pop();
  }

function espar(num) {
  if (num % 2 == 0) return true;
  else return false;
}
