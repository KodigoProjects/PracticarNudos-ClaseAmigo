// Lista de nudos inicial
const nudosOriginal = [
    "Cote o media malla",
    "Nudo llano",
    "Nudo falso",
    "Lazo corredizo",
    "Doble lazo",
    "Dos medios cotes",
    "Ballestrinque",
    "As de guía o potreados"
];

let nudos = [...nudosOriginal]; // Clonamos la lista para evitar modificar la original
let nudoActual = '';
let tiempo = 0;
let tiemposNudos = [];
let intervalId;
let tiempoIniciado = false;
let detenido = false;
let finalizado = false;
let practicaIniciada = false;

// Mostrar lista de nudos
function mostrarListaNudos() {
    const lista = document.getElementById('listaNudos');
    lista.innerHTML = '';
    nudosOriginal.forEach(nudo => {
        const li = document.createElement('li');
        li.textContent = nudo;
        lista.appendChild(li);
    });
}

// Reiniciar todos los estados y variables
function reiniciarEstados() {
    nudos = [...nudosOriginal];
    nudoActual = '';
    tiempo = 0;
    tiemposNudos = [];
    tiempoIniciado = false;
    detenido = false;
    finalizado = false;
    practicaIniciada = false;
    clearInterval(intervalId);
    document.getElementById('resultadosLista').innerHTML = ''; // Limpiar los resultados al iniciar de nuevo
}

// Mostrar un nudo aleatorio
function mostrarNudoAleatorio() {
    const randomIndex = Math.floor(Math.random() * nudos.length);
    nudoActual = nudos[randomIndex];
    nudos.splice(randomIndex, 1);
    document.getElementById('nudoActual').textContent = nudoActual;
    tiempo = 0;
    document.getElementById('contador').textContent = tiempo;
}

// Actualizar el contador
function actualizarContador() {
    if (!detenido && !finalizado) {
        tiempo++;
        document.getElementById('contador').textContent = tiempo;
    }
}

// Cambiar al siguiente nudo
function siguienteNudo() {
    if (finalizado) return;
    if (tiempoIniciado) {
        registrarTiempo();
    }

    clearInterval(intervalId);
    if (nudos.length === 0) {
        terminarPractica();
    } else {
        mostrarNudoAleatorio();
        intervalId = setInterval(actualizarContador, 1000);
    }
    tiempoIniciado = true;
    detenido = false;
    document.getElementById('reanudarButton').style.display = 'none';
}

// Registrar el tiempo del nudo actual
function registrarTiempo() {
    const resultadoLista = document.getElementById('resultadosLista');
    const li = document.createElement('li');
    li.textContent = `${nudoActual}: ${tiempo} segundos`;
    resultadoLista.appendChild(li);
    tiemposNudos.push({ nudo: nudoActual, tiempo });
}

// Iniciar la práctica
function iniciarPractica() {
    reiniciarEstados(); // Reiniciar todo al iniciar de nuevo
    document.getElementById('preInicio').style.display = 'none';
    document.getElementById('practica').style.display = 'block';
    siguienteNudo();
    practicaIniciada = true;
}

// Detener la práctica
function detenerPractica() {
    detenido = true;
    clearInterval(intervalId);
    document.getElementById('reanudarButton').style.display = 'inline-block';
}

// Reanudar la práctica
function reanudarPractica() {
    detenido = false;
    intervalId = setInterval(actualizarContador, 1000);
    document.getElementById('reanudarButton').style.display = 'none';
}

// Terminar la práctica
function terminarPractica() {
    finalizado = true;
    clearInterval(intervalId);
    document.getElementById('practica').style.display = 'none';
    document.getElementById('reiniciarButton').style.display = 'inline-block';
    mostrarBotonLista(); // Mostrar el botón para ver la lista de nudos
}

// Mostrar el botón de ver la lista
function mostrarBotonLista() {
    const botonVerLista = document.createElement('button');
    botonVerLista.textContent = 'Ver Lista de Nudos';
    botonVerLista.onclick = function () {
        reiniciarEstados(); // Asegurarse de que todo se reinicie
        mostrarListaNudos(); // Mostrar la lista nuevamente
        document.getElementById('preInicio').style.display = 'block'; // Volver a la vista de inicio
        document.getElementById('reiniciarButton').style.display = 'none'; // Ocultar el botón de reiniciar
        document.getElementById('resultados').lastChild.remove(); // Eliminar el botón "Ver Lista"
    };
    document.getElementById('resultados').appendChild(botonVerLista);
}

// Reiniciar la práctica
function reiniciarPractica() {
    reiniciarEstados();
    document.getElementById('resultadosLista').innerHTML = ''; // Limpiar los resultados
    document.getElementById('reiniciarButton').style.display = 'none';
    document.getElementById('resultados').lastChild.remove(); // Eliminar el botón "Ver Lista" después de reiniciar
    iniciarPractica();
}

// Evento para cambiar de nudo al presionar una tecla
document.addEventListener('keydown', function () {
    if (practicaIniciada && !finalizado) siguienteNudo();
});

// Llamar a mostrar la lista de nudos cuando la página se carga
window.onload = mostrarListaNudos;
