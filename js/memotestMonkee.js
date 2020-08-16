//Variables
var path = "img/MonkeeImgs/";
arrayImagenes = new Array(20);
var first = true;
var turno = 0;
var j1=0;
var j2=0;
var pid;
var total=0;	
var ganador=0;

/* Crea el array con el path de la imagen */
function crearImagenes() {
	for (var i=0;i<=19;i++) {
		if(i<=9){
			arrayImagenes[i] = path+i+'.jpg';
		}else{
			j=i-10;
			arrayImagenes[i] = path+j+'.jpg';		
		}
	}
	shuffle(arrayImagenes);
}


/* Shuffle del array */
function shuffle(array) {
	var i=array.length;
	while(i--){
		var j=Math.floor(Math.random() * (i+1));
		var tmp=array[i];
		array[i]=array[j];
		array[j]=tmp;
	}
}

		
/* Ejecuta el juego */	
function jugar(){			
	crearImagenes();
	document.getElementById('memotest').style.display = "block";
	document.getElementById("jugador1").style.color="#03BF35";
	document.getElementById("jugar").style.display="none";
}

function imgcheck(imagen){
	id=imagen.id;
	imagen.src = arrayImagenes[id];

	//turno del jugador
	jugador = tratarjugador(turno);
						
	if(first){	
		prim=imagen;
		first=false;
		pid = prim.id;
		pid.src = arrayImagenes[id];
		imagen.id="si";
	}else{
		//Verifica si son iguales
		if(imagen.id!="si" && arrayImagenes[pid]==arrayImagenes[id]){							
			total++;
			if(jugador==1){
				j1=j1+1;
				document.getElementById("j1").innerHTML = j1;
			}else{
				j2++;
				document.getElementById("j2").innerHTML = j2;
			}
		
			//Si termina el juego
			if(total==10){
				ganador = finjuego(j1,j2);
			}		
			//elimina el onclick si ya fueron encontrados
			imagen.onclick="";
			prim.onclick="";
		}else{
			if(prim.id=="si"){
				prim.id=pid;
				setTimeout(function(){changeimages(imagen)}, 800);
				setTimeout(function(){changeimages(prim)}, 800);							
			}
		}
	
		first=true;
		turno++;
	
		//si no hay ganador
		if(ganador==0){
			jugador=tratarjugador(turno);
		}	
	}
}


var changeimages = function(imagen){
	imagen.src = path+"bg.jpg";
}		
			
function tratarjugador(turno){
	var jugador=turno%2==0?1:2;
	if(jugador==1){
		document.getElementById("jugador1").style.color="#03BF35";
		document.getElementById("jugador2").style.color="black";
	}else{
		document.getElementById("jugador2").style.color="#03BF35";
		document.getElementById("jugador1").style.color="black";
	}
	return jugador;
}
	
function finjuego(j1,j2){
	var ganador;
	if(j1==j2){
	document.getElementById("anotador").innerHTML = "ES UN EMPATE!"; 
	}else{
		if(j1>j2){
			ganador="1";
		}else{
			ganador="2";
		}
	}
	document.getElementById("anotador").innerHTML = "EL GANADOR ES EL JUGADOR "+ganador;
	return ganador;
}
