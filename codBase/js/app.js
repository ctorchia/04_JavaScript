///// Patrón Modulo /////

var calculadora = {

  pantalla: document.getElementById("display"),
	valorPantalla: "0",
	operacion: "",
	valor1: 0,
	valor2: 0,
	valor3: 0,
	resultado: 0,
	auxTeclaIgual: false,

  inicializar: (function(){
    this.asignarEventosFormatoBotones(".tecla");
		this.asignarEventosaFuncion();
  }),

  ///////// Asignar eventos a botones //////////

  	asignarEventosFormatoBotones: function(selector){
  		var x = document.querySelectorAll(selector);
  		for (var i = 0; i<x.length;i++) {
  			x[i].onmousedown = this.eventoAchicaBoton;
  			x[i].onmouseup = this.eventoVuelveBoton;
  		};
  	},

  	eventoAchicaBoton: function(event){
  		calculadora.AchicaBoton(event.target);
  	},

  	eventoVuelveBoton: function(event){
  		calculadora.AumentaBoton(event.target);
  	},

////////////// Movimiento de botones //////////////

    	AchicaBoton: function(boton){
    		var x = boton.id;
    		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
    			boton.style.width = "28%";
    			boton.style.height = "62px";
    		} else if(x=="mas") {
    			boton.style.width = "88%";
    			boton.style.height = "98%";
    		} else {
    		boton.style.width = "21%";
    		boton.style.height = "62px";
    		}
    	},

    	AumentaBoton: function(boton){
    		var x = boton.id;
    		if (x=="1" || x=="2" || x=="3" || x=="0" || x=="igual" || x=="punto" ) {
    			boton.style.width = "29%";
    			boton.style.height = "63px";
    		} else if(x=="mas") {
    			boton.style.width = "90%";
    			boton.style.height = "100%";
    		} else {
    		boton.style.width = "22%";
    		boton.style.height = "63px";
    		}
    	},

//////////// Asignar Escuchadores //////////////////////////////////////

asignarEventosaFuncion: function(){
  document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
  document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
  document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
  document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
  document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
  document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
  document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
  document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
  document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
  document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
  document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
  document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
  document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
  document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
  document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
  document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
  document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
  document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
},
///////// Funcion tecla ON ///////////////////////////////////////
borrarVisor: function(){
  this.valorPantalla = "0";
  this.operacion = "";
  this.valor1 = 0;
  this.valor2 = 0;
  this.valor3 = 0;
  this.resultado = 0;
  this.auxTeclaIgual = false;
  this.refrescarVisor();
},
//////// Funcion tecla Signo ////////////////////////////////////////
cambiarSigno: function(){
  if (this.valorPantalla !="0") {
    if (this.valorPantalla.charAt(0)=="-") {
    var aux = this.valorPantalla.slice(1);
    }	else {
    var aux = "-" + this.valorPantalla;
    }
  this.valorPantalla = aux;
  this.refrescarVisor();
  }
},
///////// Funcion tecla Decimal ///////////////////////////////////////
ingresoDecimal: function(){
  if (this.valorPantalla.indexOf(".")== -1) {
    if (this.valorPantalla == ""){
      this.valorPantalla = this.valorPantalla + "0.";
    } else {
      this.valorPantalla = this.valorPantalla + ".";
    }
    this.refrescarVisor();
  }
},
/////////// Funcion teclas de Numeros /////////////////////////////////////
ingresoNumero: function(valor){
  if (this.valorPantalla.length < 8) {

    if (this.valorPantalla=="0") {
      this.valorPantalla = "";
      this.valorPantalla = this.valorPantalla + valor;
    } else {
      this.valorPantalla = this.valorPantalla + valor;
    }
  this.refrescarVisor();
  }
},
////////// Funcion teclas de Operaciones //////////////////////////////////////
ingresoOperacion: function(oper){
  this.valor1 = parseFloat(this.valorPantalla);
  this.valorPantalla = "";
  this.operacion = oper;
  this.auxTeclaIgual = false;
  this.refrescarVisor();
},
/////////// Funcion tecla Igual /////////////////////////////////////
verResultado: function(){

  if(!this.auxTeclaIgual){
    this.valor2 = parseFloat(this.valorPantalla);
    this.valor3 = this.valor2;
    this.realizarOperacion(this.valor1, this.valor2, this.operacion);

  } else {
    this.realizarOperacion(this.valor1, this.valor3, this.operacion);
  }

  this.valor1 = this.resultado;
  this.valorPantalla = "";

  if (this.resultado.toString().length < 9){
    this.valorPantalla = this.resultado.toString();
  } else {
    this.valorPantalla = this.resultado.toString().slice(0,8) + "...";
  }

  this.auxTeclaIgual = true;
  this.refrescarVisor();
},
///////////// Funcion que realiza el cálculo ///////////////////////////////////
realizarOperacion: function(valor1, valor2, operacion){
  switch(operacion){
    case "+":
      this.resultado = eval(valor1 + valor2);
    break;
    case "-":
      this.resultado = eval(valor1 - valor2);
    break;
    case "*":
      this.resultado = eval(valor1 * valor2);
    break;
    case "/":
      this.resultado = eval(valor1 / valor2);
    break;
    }
},
//////// Actualizar Visor ////////////////////////////////////////
refrescarVisor: function(){
  this.pantalla.innerHTML = this.valorPantalla;
}

};

calculadora.inicializar();
