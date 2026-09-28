// ============================================================
// objetos3.js - Ejercicio completo: array de productos
// ============================================================

const productos = [
  { nombre: "Notebook",    categoria: "Computacion",  precio: 850000,  stock: 3  },
  { nombre: "Mouse",       categoria: "Perifericos",  precio: 25000,   stock: 0  },
  { nombre: "Teclado",     categoria: "Perifericos",  precio: 45000,   stock: 8  },
  { nombre: "Monitor",     categoria: "Computacion",  precio: 320000,  stock: 2  },
  { nombre: "Webcam",      categoria: "Perifericos",  precio: 75000,   stock: 0  },
  { nombre: "Auriculares", categoria: "Audio",        precio: 60000,   stock: 12 },
  { nombre: "Parlantes",   categoria: "Audio",        precio: 95000,   stock: 4  },
  { nombre: "SSD 1TB",     categoria: "Almacenamiento", precio: 180000, stock: 6 },
  { nombre: "Pendrive",    categoria: "Almacenamiento", precio: 12000,  stock: 3 },
  { nombre: "Impresora",   categoria: "Computacion",  precio: 130000,  stock: 1  },
];

// ------------------------------------------------------------
// 1. Mostrar todos los productos
// ------------------------------------------------------------
console.log("1. Todos los productos:");
console.table(productos);

// ------------------------------------------------------------
// 2. Mostrar solamente los nombres
// ------------------------------------------------------------
const nombres = productos.map((p) => p.nombre);
console.log("\n2. Nombres:", nombres);

// ------------------------------------------------------------
// 3. Productos con precio mayor a $100.000
// ------------------------------------------------------------
const caros = productos.filter((p) => p.precio > 100000);
console.log("\n3. Precio > $100.000:");
caros.forEach((p) => console.log(`   ${p.nombre}: $${p.precio}`));

// ------------------------------------------------------------
// 4. Productos que tengan stock (stock > 0)
// ------------------------------------------------------------
const conStock = productos.filter((p) => p.stock > 0).map((p) => p.nombre);
console.log("\n4. Con stock:", conStock);

// ------------------------------------------------------------
// 5. Calcular el valor total del stock
//    valor = precio * stock de cada producto, sumados
// ------------------------------------------------------------
const valorTotalStock = productos.reduce(
  (acc, p) => acc + p.precio * p.stock, 0
);
console.log("\n5. Valor total del stock: $" + valorTotalStock.toLocaleString("es-AR"));

// ------------------------------------------------------------
// 6. Producto mas caro
// ------------------------------------------------------------
const masCaro = productos.reduce((mejor, p) =>
  p.precio > mejor.precio ? p : mejor
);
console.log(`\n6. Producto mas caro: ${masCaro.nombre} ($${masCaro.precio})`);

// ------------------------------------------------------------
// 7. Producto mas barato
// ------------------------------------------------------------
const masBarato = productos.reduce((menor, p) =>
  p.precio < menor.precio ? p : menor
);
console.log(`\n7. Producto mas barato: ${masBarato.nombre} ($${masBarato.precio})`);

// ------------------------------------------------------------
// 8. Productos de la categoria "Perifericos"
// ------------------------------------------------------------
const perifericos = productos
  .filter((p) => p.categoria === "Perifericos")
  .map((p) => p.nombre);
console.log("\n8. Categoria Perifericos:", perifericos);

// ------------------------------------------------------------
// 9. Nuevo arreglo solo con nombre y precio
// ------------------------------------------------------------
const nombreYPrecio = productos.map(({ nombre, precio }) => ({ nombre, precio }));
console.log("\n9. Solo nombre y precio:");
console.log(nombreYPrecio);

// ------------------------------------------------------------
// 10. Ordenar productos por precio (menor a mayor)
// ------------------------------------------------------------
const ordenadosPorPrecio = [...productos]
  .sort((a, b) => a.precio - b.precio)
  .map((p) => `${p.nombre}: $${p.precio}`);
console.log("\n10. Ordenados por precio (asc):");
ordenadosPorPrecio.forEach((item) => console.log("   ", item));

// ------------------------------------------------------------
// 11. Cuantos productos tienen stock menor a 5
// ------------------------------------------------------------
const stockBajo = productos.filter((p) => p.stock < 5);
console.log(`\n11. Productos con stock < 5: ${stockBajo.length}`);
stockBajo.forEach((p) => console.log(`    ${p.nombre} (stock: ${p.stock})`));

// ------------------------------------------------------------
// 12. Precio promedio de los productos
// ------------------------------------------------------------
const sumaPrecio  = productos.reduce((acc, p) => acc + p.precio, 0);
const precioPromedio = Math.round(sumaPrecio / productos.length);
console.log("\n12. Precio promedio: $" + precioPromedio.toLocaleString("es-AR"));

// ------------------------------------------------------------
// 13. Agrupar productos por categoria
//     reduce() construye un objeto { categoria: [nombres...] }
// ------------------------------------------------------------
const porCategoria = productos.reduce((acc, p) => {
  if (!acc[p.categoria]) acc[p.categoria] = [];
  acc[p.categoria].push(p.nombre);
  return acc;
}, {});

console.log("\n13. Agrupados por categoria:");
Object.entries(porCategoria).forEach(([cat, items]) =>
  console.log(`   ${cat}: ${items.join(", ")}`)
);
