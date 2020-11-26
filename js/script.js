console.log("Bienvenido a la máquina de vending");
var vending = document.getElementById("vending");
var monedas = document.getElementById("monedas");
var error = document.getElementById("error");

var productos=[
    producto = {
        nombre: "platano",
        precio: .90,
        tipo: "fruta",
        src: "images/platano.svg"
    },
    producto = {
        nombre: "burger",
        precio: .90,
        tipo: "comida",
        src: "images/burger.svg"
    },
    producto = {
        nombre: "coca-cola",
        precio: 1.50,
        tipo: "refresco",
        src: "images/coke.svg"
    },
    producto = {
        nombre: "sandwitch",
        precio: 3.50,
        tipo: "comida",
        src: "images/sandwich.svg"
    },
    producto = {
        nombre: "donut",
        precio: 1.80,
        tipo: "refresco",
        src: "images/donut1.svg"
    },        
    producto = {
        nombre: "bolsa de patatas",
        precio: 1.60,
        tipo: "comida",
        src: "images/patatas.svg"
    },    
    producto = {
        nombre: "burrito",
        precio: 1.50,
        tipo: "comida",
        src: "images/burrito.svg"
    }    
];

var maquina=[];
iniciarMaquina();
verInstrucciones();

function iniciarMaquina(){
    for(i=0;i<12;i++){
        var muelle=[];
        for(j=0;j<4;j++){
            var aleatorio=Math.round(Math.random()*6);
            muelle[j]=productos[aleatorio];
        }
        maquina[i]=muelle;
    }
    reponerMaquina();
}

function reponerMaquina(){
    var muelles = document.getElementsByClassName("muelle");
    for(i=0;i<muelles.length;i++){
        document.getElementsByClassName("muelle")[i].innerHTML="";
        var p = document.createElement("img");
        if(maquina[i].length>0){
            p.setAttribute("src",maquina[i][0].src);
            document.getElementsByClassName("muelle")[i].appendChild(p);
        }
    }
}

function comprarProducto(muelle, total=0){
    var producto = maquina[muelle][0];
    if(producto==undefined){
        console.log("Ese producto no existe");
        error.play();
    }else {
        var vueltas = (total - producto.precio).toFixed(2);
        if(vueltas<0){
            console.log("Le faltan ", vueltas," euros")
            monedas.play();
        }else{
            console.log("Producto comprado: ", producto);
            console.log("Sus vueltas son: ", vueltas);
            maquina[muelle].shift();
            vending.play();
            var p = document.createElement("img");
            p.setAttribute("src",producto.src);
            document.getElementById("producto").innerHTML="";
            document.getElementById("producto").appendChild(p);
            reponerMaquina();

        }
    }
}

function verProducto(muelle){
    return maquina[muelle][0];
}

function verProductosMuelle(muelle){
    return maquina[muelle];
}

function verInstrucciones(){
    console.log("INSTRUCCIONES");
    console.log("iniciarMaquina() => Para iniciar máquina");
    console.log("verProducto(2) => Para ver el detalle del producto muelle 2");
    console.log("verProductosMuelle(2) => Para ver todos los productos del muelle 2");
    console.log("comprarProducto(2,5) => Comprar el producto del muelle 2 con 5€");
    
}

/////OPCIONAL BOTONERA
//window.onload=function(){
    var botones=document.getElementsByClassName("boton");
    for(var c=0;c<botones.length;c++){
        botones[0].addEventListener("click", function(){
            comprarProducto(c,8); 
        });
    }
//}
