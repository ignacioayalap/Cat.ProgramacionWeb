// ============================================================
// a4_3.js - Ejercicio: cubos de pares + agrupacion por departamento
// ============================================================

// ============================================================
// EJERCICIO 1: Cubos de los numeros pares
// ============================================================
// filter() filtra los pares, map() eleva al cubo cada uno.
// Un numero es par si el resto de dividirlo por 2 es 0 (% 2 === 0).
// El cubo de un numero n es: n * n * n  (o bien  n ** 3)
// ============================================================

const numeros = [3, 6, 9, 12, 15, 18];

const cubosDePares = numeros
  .filter((n) => n % 2 === 0)   // paso 1: conservar solo los pares   [6, 12, 18]
  .map((n) => n ** 3);           // paso 2: elevar al cubo cada uno    [216, 1728, 5832]

console.log("Numeros originales:", numeros);
console.log("Cubos de los pares:", cubosDePares);

// ============================================================
// EJERCICIO 2: Agrupar empleados por departamento
// ============================================================
// reduce() recorre el array acumulando un resultado.
// Aqui el acumulador es un objeto donde cada clave es un
// departamento y su valor es un array con los empleados de ese dpto.
//
// Para cada empleado:
//   - Si la clave del departamento ya existe en el objeto, se agrega
//     el empleado al array existente con push().
//   - Si NO existe, se inicializa con un array vacio [] y luego
//     se agrega el empleado.
// ============================================================

const empleados = [
  { nombre: "Ana",   departamento: "Ventas"    },
  { nombre: "Luis",  departamento: "IT"        },
  { nombre: "Marta", departamento: "Ventas"    },
  { nombre: "Pedro", departamento: "IT"        },
  { nombre: "Sofia", departamento: "Marketing" },
];

const agrupadosPorDepartamento = empleados.reduce((acumulador, emp) => {
  const dpto = emp.departamento;

  // Si el departamento no existe como clave, lo inicializa con []
  if (!acumulador[dpto]) {
    acumulador[dpto] = [];
  }

  // Agrega el empleado al array del departamento correspondiente
  acumulador[dpto].push(emp.nombre);

  return acumulador;
}, {}); // el acumulador comienza como un objeto vacio

console.log("\nEmpleados agrupados por departamento:");
console.log(agrupadosPorDepartamento);
