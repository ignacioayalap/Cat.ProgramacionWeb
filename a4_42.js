// ============================================================
// a4_42.js - Ejercicio: suma de filas y columnas de una matriz
// ============================================================

const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// ------------------------------------------------------------
// SUMA DE CADA FILA
// map() recorre cada fila (que es un array).
// Por cada fila, reduce() suma todos sus elementos desde 0.
// Resultado: un nuevo array donde cada posicion es la suma de esa fila.
// ------------------------------------------------------------
const sumaFilas = matriz.map((fila) => fila.reduce((acc, num) => acc + num, 0));

console.log("Suma de filas:   ", sumaFilas); // [6, 15, 24]

// ------------------------------------------------------------
// SUMA DE CADA COLUMNA
// Se itera por indice de columna (0, 1, 2).
// Para cada columna j, se suman los elementos matriz[0][j],
// matriz[1][j], matriz[2][j], ... usando map() + reduce().
//
// matriz[0].map((_, j) => ...) genera un array con tantos
// elementos como columnas tiene la matriz (usamos _ porque
// el valor de la celda no importa, solo el indice j).
// ------------------------------------------------------------
const sumaColumnas = matriz[0].map((_, j) =>
  matriz.reduce((acc, fila) => acc + fila[j], 0)
);

console.log("Suma de columnas:", sumaColumnas); // [12, 15, 18]
