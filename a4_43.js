// ============================================================
// a4_43.js - Ejercicio: diagonales de una matriz cuadrada (n x n)
// ============================================================
// Diagonal principal:  elementos donde fila === columna  → [i][i]
// Diagonal secundaria: elementos donde fila + columna === n-1 → [i][n-1-i]
// ============================================================

// Funcion que recibe cualquier matriz cuadrada n x n
function analizarDiagonales(matriz) {
  const n = matriz.length;

  // ----------------------------------------------------------
  // DIAGONAL PRINCIPAL: recorre i de 0 a n-1 y toma [i][i]
  // map() sobre los indices genera el array de elementos.
  // ----------------------------------------------------------
  const diagPrincipal = matriz.map((fila, i) => fila[i]);

  // ----------------------------------------------------------
  // DIAGONAL SECUNDARIA: recorre i de 0 a n-1 y toma [i][n-1-i]
  // n-1-i "espeja" el indice de columna (0→2, 1→1, 2→0 para n=3).
  // ----------------------------------------------------------
  const diagSecundaria = matriz.map((fila, i) => fila[n - 1 - i]);

  // ----------------------------------------------------------
  // SUMA DE AMBAS DIAGONALES
  // Se suman todos los elementos de ambas diagonales.
  // Si n es impar, el elemento central se cuenta dos veces
  // (pertenece a ambas diagonales), por eso se resta una vez.
  // ----------------------------------------------------------
  const sumaPrincipal  = diagPrincipal.reduce((acc, val) => acc + val, 0);
  const sumaSecundaria = diagSecundaria.reduce((acc, val) => acc + val, 0);

  // Elemento central: solo existe si n es impar → [n/2][n/2]
  const centroSumado = n % 2 !== 0 ? matriz[Math.floor(n / 2)][Math.floor(n / 2)] : 0;
  const sumaAmbas = sumaPrincipal + sumaSecundaria - centroSumado;

  return { diagPrincipal, diagSecundaria, sumaPrincipal, sumaSecundaria, sumaAmbas };
}

// ------------------------------------------------------------
// EJEMPLO 1: Matriz 3 x 3
// ------------------------------------------------------------
const matriz3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const resultado3 = analizarDiagonales(matriz3);
console.log("=== Matriz 3x3 ===");
console.log("Diagonal principal: ", resultado3.diagPrincipal);  // [1, 5, 9]
console.log("Diagonal secundaria:", resultado3.diagSecundaria); // [3, 5, 7]
console.log("Suma principal:     ", resultado3.sumaPrincipal);  // 15
console.log("Suma secundaria:    ", resultado3.sumaSecundaria); // 15
console.log("Suma ambas:         ", resultado3.sumaAmbas);      // 25 (5 no se cuenta doble)

// ------------------------------------------------------------
// EJEMPLO 2: Matriz 4 x 4
// ------------------------------------------------------------
const matriz4 = [
  [ 1,  2,  3,  4],
  [ 5,  6,  7,  8],
  [ 9, 10, 11, 12],
  [13, 14, 15, 16],
];

const resultado4 = analizarDiagonales(matriz4);
console.log("\n=== Matriz 4x4 ===");
console.log("Diagonal principal: ", resultado4.diagPrincipal);  // [1, 6, 11, 16]
console.log("Diagonal secundaria:", resultado4.diagSecundaria); // [4, 7, 10, 13]
console.log("Suma principal:     ", resultado4.sumaPrincipal);  // 34
console.log("Suma secundaria:    ", resultado4.sumaSecundaria); // 34
console.log("Suma ambas:         ", resultado4.sumaAmbas);      // 68 (sin elemento central)
