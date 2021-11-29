//Selectores
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const ciudad = document.querySelector("#ciudad");
const pais = document.querySelector("#pais");

//Event listeners
window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

//Hacer consulta de datos ciudad
function buscarClima(e) {
  e.preventDefault();
  // Validar datos
  if (ciudad.value === "" || pais.value === "") {
    imprimirError("Ambos campos son obligatorios");
    return;
  }
  // Consultar la API
  consultarAPI(ciudad.value, pais.value);
}

// Imprimir error en pantalla
function imprimirError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    const alerta = document.createElement("div");
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );
    alerta.innerHTML = `
    <strong class="font-bold">Error!</strong>
    <span class="block">${mensaje}</strong>
    `;
    container.appendChild(alerta);
    setTimeout(function () {
      alerta.remove();
    }, 3000);
  }
}

//Consultar datos en el API
function consultarAPI(ciudad, pais) {
  const APIkey = "d81947d3ad0c86d99c906ce384aa4597";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIkey}`;
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      limpiarHtml();
      if (res.cod === "404") {
        imprimirError("Ciudad no encontrada");
        return;
      }
      //Imprimir en el Html
      imprimirTemperatura(res);
    });
}

function imprimirTemperatura(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinToCelcius(temp);
  const tempMax = kelvinToCelcius(temp_max);
  const tempMin = kelvinToCelcius(temp_min);

  const ciudad = document.createElement("p");
  ciudad.classList.add("text-2xl");
  ciudad.innerHTML = `Temperatura en ${name}`;

  const actual = document.createElement("p");
  actual.classList.add("font-bold", "text-6xl");
  actual.innerHTML = `${centigrados} &#8451;`;

  const tempmax = document.createElement("p");
  tempmax.classList.add("text-xl");
  tempmax.innerHTML = `Temp máxima: ${tempMax} &#8451;`;

  const tempmin = document.createElement("p");
  tempmin.classList.add("text-xl");
  tempmin.innerHTML = `Temp mínima: ${tempMin} &#8451;`;

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");

  resultadoDiv.appendChild(ciudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempmax);
  resultadoDiv.appendChild(tempmin);
  resultado.appendChild(resultadoDiv);
}

//Helpers
function kelvinToCelcius(grados) {
  return parseInt(grados - 273.15);
}
function limpiarHtml() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}
