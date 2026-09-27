// ============================================================
// a4_41.js - Ejercicio: filter + sort + reduce sobre estudiantes
// ============================================================

const estudiantes = [
  { nombre: "Ana",   nota: 8 },
  { nombre: "Luis",  nota: 5 },
  { nombre: "Carla", nota: 9 },
  { nombre: "Juan",  nota: 6 },
  { nombre: "Pedro", nota: 4 },
];

// ------------------------------------------------------------
// PARTE 1: Nombres de estudiantes que aprobaron (nota >= 6)
// filter() conserva solo los que aprobaron, luego
// map() extrae unicamente el nombre de cada objeto.
// ------------------------------------------------------------
const aprobados = estudiantes
  .filter((est) => est.nota >= 6)
  .map((est) => est.nombre);

console.log("Estudiantes que aprobaron:", aprobados);

// ------------------------------------------------------------
// PARTE 2: Ordenar el arreglo original por nota de mayor a menor
// sort() ordena en el lugar (modifica el array original).
// Recibe una funcion comparadora: si (b.nota - a.nota) es positivo,
// b va antes que a → orden DESCENDENTE.
// ------------------------------------------------------------
const ordenadosPorNota = [...estudiantes].sort((a, b) => b.nota - a.nota);
// Se usa [...estudiantes] para no mutar el array original

console.log("\nEstudiantes ordenados por nota (mayor a menor):");
ordenadosPorNota.forEach((est) =>
  console.log(`  ${est.nombre}: ${est.nota}`)
);

// ------------------------------------------------------------
// PARTE 3: Promedio general de las notas
// reduce() suma todas las notas acumulandolas en 0.
// Luego se divide por la cantidad de estudiantes.
// ------------------------------------------------------------
const sumaNotas = estudiantes.reduce((acc, est) => acc + est.nota, 0);
const promedio = sumaNotas / estudiantes.length;

console.log(`\nPromedio general de las notas: ${promedio.toFixed(2)}`);
