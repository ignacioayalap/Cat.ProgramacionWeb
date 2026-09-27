// ============================================================
// a2.js - Ejercicio: filter() y map() sobre array de productos
// ============================================================

// Lista de productos de la tienda
const productos = [
  { nombre: "Notebook",    precio: 1200, stock: 5  },
  { nombre: "Mouse",       precio: 25,   stock: 0  },
  { nombre: "Teclado",     precio: 45,   stock: 10 },
  { nombre: "Monitor",     precio: 350,  stock: 3  },
  { nombre: "Webcam",      precio: 80,   stock: 0  },
  { nombre: "Auriculares", precio: 60,   stock: 8  },
];

// ------------------------------------------------------------
// PASO 1: filter() - solo productos con stock disponible (stock > 0)
// filter() recorre el array y devuelve un nuevo array
// con los elementos que cumplan la condicion indicada.
// ------------------------------------------------------------
const productosConStock = productos.filter((producto) => producto.stock > 0);

// ------------------------------------------------------------
// PASO 2: map() - nuevo array con solo nombre y precio
// map() recorre el array y transforma cada elemento
// segun la funcion que le pasemos, devolviendo un nuevo array.
// ------------------------------------------------------------
const resumen = productosConStock.map((producto) => ({
  nombre: producto.nombre,
  precio: producto.precio,
}));

// ------------------------------------------------------------
// PASO 3: Mostrar el resultado por consola
// ------------------------------------------------------------
console.log("Productos con stock disponible (nombre y precio):");
console.log(resumen);

// ------------------------------------------------------------
// EXTRA: Version encadenada (misma logica en una sola expresion)
// Es muy comun en JavaScript encadenar filter() y map()
// directamente sobre el array original.
// ------------------------------------------------------------
const resumenEncadenado = productos
  .filter((producto) => producto.stock > 0)
  .map((producto) => ({ nombre: producto.nombre, precio: producto.precio }));

console.log("\nVersion encadenada (mismo resultado):");
console.log(resumenEncadenado);
