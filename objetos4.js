// ============================================================
// objetos4.js - Ejercicio: inspeccion y busqueda recursiva de objetos
// ============================================================

const empleado = {
  nombre: "Ana",
  edad: 35,
  activo: true,

  direccion: {
    ciudad: "Mendoza",
    pais: "Argentina",
  },

  habilidades: ["JavaScript", "Java", "SQL"],

  salario: 850000,

  saludar() {
    return `Hola, soy ${this.nombre}`;
  },
};

// ============================================================
// EJERCICIO 1: inspeccionarObjeto(obj)
// ============================================================
// Object.entries(obj) devuelve pares [clave, valor] de todas
// las propiedades propias del objeto.
//
// Para cada propiedad se detecta el tipo con typeof:
//   - "function"  → es un metodo
//   - "object"    → puede ser null, un array o un objeto plano
//   - otros       → string, number, boolean, etc.
//
// Array.isArray() se usa para distinguir arrays de objetos,
// ya que typeof [] === "object" (comportamiento de JavaScript).
// ============================================================

function inspeccionarObjeto(obj) {
  console.log("========== INSPECCION DEL OBJETO ==========\n");

  for (const [clave, valor] of Object.entries(obj)) {
    console.log(`Propiedad: ${clave}`);

    if (typeof valor === "function") {
      // Es un metodo del objeto
      console.log("Tipo: function");
      console.log("Metodo detectado");

    } else if (Array.isArray(valor)) {
      // Es un array (verificar ANTES de typeof === "object")
      console.log("Tipo: array");
      console.log(`Cantidad de elementos: ${valor.length}`);

    } else if (typeof valor === "object" && valor !== null) {
      // Es un objeto anidado
      console.log("Tipo: object");
      console.log("Valor: [objeto]");

    } else {
      // Tipos primitivos: string, number, boolean
      console.log(`Tipo: ${typeof valor}`);
      console.log(`Valor: ${valor}`);
    }

    console.log(); // linea en blanco entre propiedades
  }

  console.log("============================================");
}

inspeccionarObjeto(empleado);

// ============================================================
// EJERCICIO 2: buscarPropiedad(objeto, nombre)
// ============================================================
// Recorre el objeto recursivamente buscando una clave.
//
// Para cada clave del objeto:
//   1. Si la clave coincide con el nombre buscado → retorna el valor.
//   2. Si el valor es un objeto (no array, no null) →
//      llama a si misma recursivamente sobre ese sub-objeto.
//   3. Si la busqueda recursiva encontro algo → lo retorna.
//   4. Si no se encontro en ninguna parte → retorna undefined.
// ============================================================

function buscarPropiedad(objeto, nombre) {
  // Recorrer todas las claves del objeto actual
  for (const clave in objeto) {
    // Caso base: la clave coincide con lo que buscamos
    if (clave === nombre) {
      return objeto[clave];
    }

    // Si el valor es un objeto anidado (no array, no null), buscar dentro
    const valor = objeto[clave];
    if (typeof valor === "object" && valor !== null && !Array.isArray(valor)) {
      const encontrado = buscarPropiedad(valor, nombre);
      if (encontrado !== undefined) return encontrado;
    }
  }

  return undefined; // no se encontro la propiedad
}

console.log("\n========== BUSQUEDA RECURSIVA ==========\n");

// Propiedad en el nivel raiz
const nombre = buscarPropiedad(empleado, "nombre");
console.log(`buscarPropiedad(empleado, "nombre")  → ${nombre}`);

// Propiedad dentro de un objeto anidado (direccion.ciudad)
const ciudad = buscarPropiedad(empleado, "ciudad");
console.log(`buscarPropiedad(empleado, "ciudad")  → ${ciudad}`);

// Propiedad dentro de un objeto anidado (direccion.pais)
const pais = buscarPropiedad(empleado, "pais");
console.log(`buscarPropiedad(empleado, "pais")    → ${pais}`);

// Propiedad que no existe
const telefono = buscarPropiedad(empleado, "telefono");
console.log(`buscarPropiedad(empleado, "telefono")→ ${telefono}`);

console.log("\n=========================================");
