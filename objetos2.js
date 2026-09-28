// ============================================================
// objetos2.js - Ejercicio: promedio y aprobados de alumnos
// ============================================================

const alumnos = [
  { nombre: "Ana",   edad: 20, notas: [8, 9, 7]  },
  { nombre: "Pedro", edad: 22, notas: [6, 5, 7]  },
  { nombre: "Luis",  edad: 19, notas: [9, 10, 8] },
];

// ============================================================
// PARTE 1: Calcular el promedio de cada alumno
// ============================================================
// Para cada alumno:
//   - reduce() suma todas sus notas
//   - se divide por la cantidad de notas (notas.length)
//   - toFixed(2) redondea a 2 decimales (devuelve string)
//   - Number() lo convierte de vuelta a numero
// map() genera un nuevo array con el nombre y el promedio calculado.
// ============================================================

const alumnosConPromedio = alumnos.map((alumno) => {
  const sumaNotas = alumno.notas.reduce((acc, nota) => acc + nota, 0);
  const promedio  = Number((sumaNotas / alumno.notas.length).toFixed(2));

  return {
    nombre:   alumno.nombre,
    edad:     alumno.edad,
    notas:    alumno.notas,
    promedio: promedio,
  };
});

console.log("=== Promedio de cada alumno ===");
alumnosConPromedio.forEach((alumno) =>
  console.log(`  ${alumno.nombre}: ${alumno.promedio}`)
);

// ============================================================
// PARTE 2: Buscar los alumnos aprobados (promedio >= 6)
// ============================================================
// filter() sobre el array ya enriquecido con promedios.
// Luego map() extrae solo el nombre para mostrar la lista.
// ============================================================

const aprobados = alumnosConPromedio
  .filter((alumno) => alumno.promedio >= 6)
  .map((alumno) => alumno.nombre);

const reprobados = alumnosConPromedio
  .filter((alumno) => alumno.promedio < 6)
  .map((alumno) => alumno.nombre);

console.log("\n=== Alumnos aprobados (promedio >= 6) ===");
console.log(" ", aprobados.join(", "));

console.log("\n=== Alumnos reprobados (promedio < 6) ===");
console.log(" ", reprobados.length ? reprobados.join(", ") : "ninguno");
