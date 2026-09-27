// ============================================================
// a4_4.js - Ejercicio: buscar el numero mas repetido de un arreglo
// ============================================================
// Estrategia:
//   1. reduce()  → construir un objeto de frecuencias { numero: cantidad }
//   2. Object.entries() + reduce() → encontrar la clave con mayor valor
// ============================================================

const numeros = [4, 2, 7, 2, 4, 4, 9, 7, 2, 4, 1, 7, 4];

console.log("Arreglo original:", numeros);

// ------------------------------------------------------------
// PASO 1: Contar la frecuencia de cada numero con reduce()
// El acumulador es un objeto donde:
//   - la CLAVE es el numero encontrado
//   - el VALOR es la cantidad de veces que aparece
// Si la clave no existe aun, se inicializa en 0 y luego se suma 1.
// ------------------------------------------------------------
const frecuencias = numeros.reduce((acc, num) => {
  acc[num] = (acc[num] || 0) + 1;
  return acc;
}, {});

console.log("\nFrecuencia de cada numero:", frecuencias);

// ------------------------------------------------------------
// PASO 2: Encontrar el numero con mayor frecuencia
// Object.entries(frecuencias) convierte el objeto en un array de pares:
//   [ ["4", 5], ["2", 3], ["7", 3], ["9", 1], ["1", 1] ]
// Luego reduce() compara frecuencias y se queda con la mayor.
// ------------------------------------------------------------
const [masRepetido, veces] = Object.entries(frecuencias).reduce(
  (mejor, actual) => (actual[1] > mejor[1] ? actual : mejor)
);

console.log(
  `\nEl numero mas repetido es: ${masRepetido} (aparece ${veces} veces)`
);
