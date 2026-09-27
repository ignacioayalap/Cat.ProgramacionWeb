// ============================================================
// a4_2.js - Ejercicio: every() sobre array de empleados
// ============================================================
// every() recorre el array y devuelve TRUE solo si TODOS
// los elementos cumplen la condicion dada. En cuanto encuentra
// uno que no la cumple, detiene la ejecucion y retorna FALSE.
// ============================================================

const empleados = [
  { nombre: "Ana",   departamento: "IT",        salario: 850000, experiencia: 4 },
  { nombre: "Luis",  departamento: "Ventas",    salario: 650000, experiencia: 3 },
  { nombre: "Marta", departamento: "IT",        salario: 900000, experiencia: 5 },
  { nombre: "Pedro", departamento: "Marketing", salario: 600000, experiencia: 2 },
];

const departamentosValidos = ["IT", "Ventas", "Marketing"];

// ------------------------------------------------------------
// CONDICION 1: Todos tienen nombre (no vacio, no undefined)
// ------------------------------------------------------------
const todosConNombre = empleados.every(
  (emp) => emp.nombre && emp.nombre.trim() !== ""
);
console.log("1. Todos tienen nombre:", todosConNombre);

// ------------------------------------------------------------
// CONDICION 2: Todos tienen salario mayor a $500.000
// ------------------------------------------------------------
const todosConSalarioValido = empleados.every(
  (emp) => emp.salario > 500000
);
console.log("2. Todos con salario > $500.000:", todosConSalarioValido);

// ------------------------------------------------------------
// CONDICION 3: Todos pertenecen a un departamento valido
// Se usa includes() para verificar si el departamento del
// empleado esta dentro de la lista de departamentos validos.
// ------------------------------------------------------------
const todosEnDeptValido = empleados.every(
  (emp) => departamentosValidos.includes(emp.departamento)
);
console.log("3. Todos en departamento valido:", todosEnDeptValido);

// ------------------------------------------------------------
// CONDICION 4: Si son de IT, tienen al menos 2 anos de experiencia
// Si el empleado NO es de IT, la condicion se ignora (true).
// Si ES de IT, se verifica que experiencia >= 2.
// ------------------------------------------------------------
const itConExperiencia = empleados.every(
  (emp) => emp.departamento !== "IT" || emp.experiencia >= 2
);
console.log("4. IT con al menos 2 anos de experiencia:", itConExperiencia);

// ------------------------------------------------------------
// VERIFICACION GLOBAL: Todas las condiciones juntas en un solo every()
// ------------------------------------------------------------
const todosValidos = empleados.every(
  (emp) =>
    emp.nombre &&
    emp.nombre.trim() !== "" &&
    emp.salario > 500000 &&
    departamentosValidos.includes(emp.departamento) &&
    (emp.departamento !== "IT" || emp.experiencia >= 2)
);

console.log("\n--- RESULTADO FINAL ---");
console.log(
  todosValidos
    ? "Todos los empleados cumplen con todos los requisitos."
    : "Al menos un empleado NO cumple con los requisitos."
);
