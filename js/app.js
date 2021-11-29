//Selectores
const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");
const ciudad = document.querySelector("#ciudad");
const pais = document.querySelector("#pais");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();
  // Validar datos
  if (ciudad.value === "" || pais.value === "") {
    imprimirError("Ambos campos son obligatorios");
  }
  // Consultar la API
}

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
    }, 2000);
  }
}
