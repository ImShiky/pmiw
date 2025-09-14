function mouseClicked(){ //EVENTO DE CLICK PEDIDO POR LA CONSIGNA
  if (verificacion_color == true) //IF PEDIDO POR LA CONSIGNA
  verificacion_color = false;
  else verificacion_color = true; //ELSE PEDIDO POR LA CONSIGNA
}
function keyPressed(){
  if (key == 'c'){ //EVENTO DE TECLA PEDIDO POR LA CONSIGNA
    if (verificacion_color == true)
      verificacion_color = false;
    else verificacion_color = true;
    blanco = color(0,200,57);
    negro = color(0,0,0);
    blanco2 = color(255, 179, 67);
    negro2 = color(0,0,0);
    blanco3 = color(137,182,231);
    negro3 = color(0,0,0);
  }
  if (key == 'r'){ //FUNCIÓN QUE RENICIA DE NUEVO A LA OBRA INICIAL (PEDIDA EN LA CONSIGNA)
  verificacion_color = false;
  negro = 0;
  blanco = 255;
  negro2 = 0;
  blanco2 = 255;
  negro3 = 0;
  blanco3 = 255;
  }
}
