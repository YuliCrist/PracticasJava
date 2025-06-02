const apiButton = document.getElementById("apiButton");
const apiData = document.getElementById("apiData");
const base_experience = document.getElementById("base_experience");

const callAPI = () => {
    fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            apiData.innerText = JSON.stringify(data);
            base_experience.innerText = `Experiencia Base= ${JSON.stringify(data.base_experience)}`
        })
        .catch(error => {
            console.error("Error al llamar a la API:", error);
        });
};
apiButton.addEventListener("click", callAPI);

function buscar() {
  const texto = document.getElementById("cajaBusqueda").value.toLowerCase(); // nombre del Pokémon
  const resultado = document.getElementById("resultado");
  const imagen = document.getElementById("imagenResultado");
  const base_experience = document.getElementById("base_experience");

  resultado.innerText = `Buscaste: "${texto}"`;

  fetch(`https://pokeapi.co/api/v2/pokemon/${texto}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Pokémon no encontrado");
      }
      return res.json();
    })
    .then(data => {
      const sprite = data.sprites.front_default;
      imagen.src = sprite;
      imagen.style.display = "block";
      base_experience.innerText = `Experiencia Base: ${data.base_experience}`;
    })
    .catch(error => {
      resultado.innerText = `Error: ${error.message}`;
      imagen.style.display = "none";
      base_experience.innerText = "";
    });
}

cajaBusqueda.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        buscar();
    }
});

function enviar_formulario(){
//Obtiene el radio seleccionado
var radio=document.querySelector('input[name=radio]:checked').value;
//Obtiene los checks seleccionados
let checkboxes = document.querySelectorAll('input[name="check"]:checked');
let check_seleccionaados = [];

checkboxes.forEach((checkbox)=>{
check_seleccionaados.push(checkbox.value);
});
//Obtiene el select seleccionado
var select = document.getElementById("select").value;

alert(radio + "\n"+ check_seleccionaados + "\n"+ select);
}

function sumar(){
    var n1 = parseInt(document.getElementById("n1").value);
    var n2 = parseInt(document.getElementById("n2").value);
    var n3 = parseInt(document.getElementById("n3").value);
    var suma = n1+n2+n3;
    document.getElementById("total").value = suma;
}

function obtener_texto1(){
    var a = document.getElementById("sumar").value;
    alert(a)
}
function obtener_texto2(){
    var a = document.getElementById("h2").textContent;
    alert(a)
}

function agregar(){ //sustituye lo que hay dentro del div
    document.getElementById("div1").innerHTML = "Hola <input type='text'>";
}
function aumentar(){ //aumenta lo que ya hay
    document.getElementById("div1").append("<br> asdf ");   
}
function eliminar(){ //eliminar todo el div
document.getElementById("div1").remove();
}
function vaciar(){ //vaciar el div
document.getElementById("div1").innerHTML = ""; //Vaciar el div
}
function aumentar_con_html(){ //Permite aumentar utilizando innerHTML
    document.getElementById("div1").innerHTML += "Hola <input type='text'>";
}
//css
document.getElementById("cambiar_fondo").addEventListener("click", function () {
  document.getElementById("midiv").style.background = "#72a6e0";
});

document.getElementById("cambiar_color").addEventListener("click", function () {
  document.getElementById("midiv").style.color = "white";
});

document.getElementById("borde").addEventListener("click", function () {
  document.getElementById("midiv").style.border = "3px solid black";
});

document.getElementById("negrita").addEventListener("click", function () {
  document.getElementById("midiv").style.fontWeight = "bold";
});

document.getElementById("clase").addEventListener("click", function () {
  document.getElementById("midiv").classList.add("miestilo");
});

document.getElementById("quitar_clase").addEventListener("click", function () {
  document.getElementById("midiv").classList.remove("miestilo");
});

document.querySelector("#asdfg").onclick = () => {
  const nombre = "Juan";
  alert("Bienvenido, " + nombre);
};
