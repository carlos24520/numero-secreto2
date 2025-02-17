let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
const numeroMaximo = 10;
const maxIntentos = 3;

function generarNumeroSecreto() {
    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));
    
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function asignarTextoElemento(elemento, texto) {
    const elementoHTML = document.querySelector(elemento);
    if (elementoHTML) {
        elementoHTML.textContent = texto;
    }
}

function limpiarCaja() {
    const valorCaja = document.getElementById('valorUsuario');
    if (valorCaja) {
        valorCaja.value = '';
    }
}

function verificarIntento() {
    const valorCaja = document.getElementById("valorUsuario");
    const numeroDeUsuario = parseInt(valorCaja.value);
    
    if (isNaN(numeroDeUsuario)) {
        asignarTextoElemento('p', 'Por favor, ingresa un número válido.');
        return;
    }
    
    intentos++;
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Acertaste el número secreto en ${intentos} intento(s)!`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (intentos >= maxIntentos) {
            asignarTextoElemento('p', `¡Agotaste tus intentos! El número secreto era ${numeroSecreto}.`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            const mensaje = numeroDeUsuario > numeroSecreto ? 'El número secreto es menor.' : 'El número secreto es mayor.';
            asignarTextoElemento('p', `${mensaje} Te quedan ${maxIntentos - intentos} intento(s).`);
        }
    }
    
    limpiarCaja();
}

function condicionesIniciales() {
    asignarTextoElemento('h1', 'Juego del Numero Secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}. Tienes ${maxIntentos} intentos.`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales();
}

// Inicializar el juego al cargar la página
document.addEventListener("DOMContentLoaded", condicionesIniciales);