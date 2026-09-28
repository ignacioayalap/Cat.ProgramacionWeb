// ============================================================
// a4_44.js - Ejercicio: aplanar una matriz 3D y ordenarla
// ============================================================
// flat(profundidad) convierte arrays anidados en uno solo.
//   flat(1) → aplana 1 nivel de anidamiento
//   flat(2) → aplana 2 niveles de anidamiento
//   flat(Infinity) → aplana todos los niveles sin importar la profundidad
// ============================================================

const matriz3D = [
  [ [3, 1], [4, 1] ],
  [ [5, 9], [2, 6] ],
  [ [5, 3], [8, 9] ],
];

console.log("Matriz 3D original:");
console.log(matriz3D);

// ------------------------------------------------------------
// PASO 1: Aplanar la matriz 3D a un array de un solo nivel
// La matriz tiene 3 niveles de anidamiento (array > array > numeros),
// por eso se usa flat(2) para eliminar los 2 niveles de corchetes.
// Alternativa segura: flat(Infinity) sin importar la profundidad.
// ------------------------------------------------------------
const aplanado = matriz3D.flat(2);

console.log("\nArray aplanado (flat(2)):");
console.log(aplanado); // [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 8, 9]

// ------------------------------------------------------------
// PASO 2: Ordenar el array de menor a mayor
// sort() sin funcion comparadora ordena como strings (¡bug comun!).
// Con (a, b) => a - b se ordena numericamente de MENOR a MAYOR.
// Con (a, b) => b - a se ordena de MAYOR a MENOR.
// ------------------------------------------------------------
const ordenadoAsc  = [...aplanado].sort((a, b) => a - b);
const ordenadoDesc = [...aplanado].sort((a, b) => b - a);

console.log("\nOrdenado de menor a mayor:", ordenadoAsc);
console.log("Ordenado de mayor a menor:", ordenadoDesc);

// ------------------------------------------------------------
// VERSION ENCADENADA (todo en una sola expresion)
// ------------------------------------------------------------
const resultado = matriz3D.flat(Infinity).sort((a, b) => a - b);

console.log("\nVersion encadenada flat(Infinity) + sort:");
console.log(resultado);
