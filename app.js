// URL de la hoja de Google Sheets en formato CSV
const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSH8j5rR_nhM4ThLosHUS_pv67bK9wqQgSYi9Qxs1-9F0eGiWpWg2-DYNak8L8bBf0Gc9ST4b34aQvo/pub?gid=0&single=true&output=csv';

// Variables globales para manejar las tarjetas y puntuaciones
let tarjetas = [];
let tarjetaActual = 0;
let puntuaciones = [0, 0, 0, 0]; // Puntuaciones de los jugadores

// Función para cargar las tarjetas desde Google Sheets
fetch(sheetURL)
  .then(response => response.text())
  .then(data => {
    // Convertir el CSV a un array de objetos
    const rows = data.split('\n').map(row => row.split(','));
    // Convertir las filas en objetos con propiedades
    tarjetas = rows.slice(1).map(row => ({
      categoria: row[0],
      texto: row[1],
      solucion: row[2]
    }));
    mostrarTarjeta(); // Mostrar la primera tarjeta
  })
  .catch(error => console.error('Error al cargar la hoja de Google Sheets:', error));

// Mostrar la tarjeta actual
function mostrarTarjeta() {
  const tarjeta = tarjetas[tarjetaActual];
  document.getElementById('categoria').innerText = tarjeta.categoria;
  document.getElementById('texto').innerText = tarjeta.texto;
  document.getElementById('solucion').innerText = `Solución: ${tarjeta.solucion}`;
}

// Función para pasar a la siguiente tarjeta aleatoria
document.getElementById('siguiente').addEventListener('click', function() {
  tarjetaActual = Math.floor(Math.random() * tarjetas.length);
  mostrarTarjeta();
});

// Función para manejar la puntuación
document.querySelectorAll('.punto').forEach((button, index) => {
  button.addEventListener('click', () => {
    puntuaciones[index]++;
    button.innerText = `Jugador ${index + 1}: ${puntuaciones[index]}`;
  });
});

// Reiniciar las puntuaciones cada vez que se carga la página
window.onload = function() {
  puntuaciones = [0, 0, 0, 0];
  document.querySelectorAll('.punto').forEach((button, index) => {
    button.innerText = `Jugador ${index + 1}: 0`;
  });
};

