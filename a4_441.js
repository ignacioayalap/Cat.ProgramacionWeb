// ============================================================
// a4_441.js - Ejercicios: Objetos en JavaScript
// ============================================================


// ============================================================
// EJERCICIO 1: Objeto Libro
// ============================================================
// Los metodos dentro de un objeto literal se definen con
// la sintaxis  nombreMetodo() { ... }  o con funcion flecha.
// "this" hace referencia al propio objeto.
// ============================================================

const libro = {
  titulo: "El Principito",
  autor:  "Antoine de Saint-Exupery",
  anio:   1943,

  descripcion() {
    console.log(`"${this.titulo}" de ${this.autor} (${this.anio})`);
  },
};

console.log("=== Libro ===");
libro.descripcion();


// ============================================================
// EJERCICIO 2: Objeto cuentaBancaria
// ============================================================
// depositar() suma al saldo y valida que el monto sea positivo.
// retirar() verifica que haya fondos suficientes antes de restar.
// ============================================================

const cuentaBancaria = {
  titular: "Maria Gomez",
  saldo:   100000,

  depositar(monto) {
    if (monto <= 0) {
      console.log("El monto a depositar debe ser mayor a 0.");
      return;
    }
    this.saldo += monto;
    console.log(`Deposito: +$${monto}. Saldo actual: $${this.saldo}`);
  },

  retirar(monto) {
    if (monto <= 0) {
      console.log("El monto a retirar debe ser mayor a 0.");
      return;
    }
    if (monto > this.saldo) {
      console.log(`Fondos insuficientes. Saldo actual: $${this.saldo}`);
      return;
    }
    this.saldo -= monto;
    console.log(`Retiro: -$${monto}. Saldo actual: $${this.saldo}`);
  },
};

console.log("\n=== Cuenta Bancaria ===");
console.log("Titular:", cuentaBancaria.titular);
cuentaBancaria.depositar(50000);
cuentaBancaria.retirar(30000);
cuentaBancaria.retirar(200000); // fondos insuficientes


// ============================================================
// EJERCICIO 3: Objeto Rectangulo
// ============================================================
// area()      = ancho * alto
// perimetro() = 2 * (ancho + alto)
// ============================================================

const rectangulo = {
  ancho: 8,
  alto:  5,

  area() {
    return this.ancho * this.alto;
  },

  perimetro() {
    return 2 * (this.ancho + this.alto);
  },
};

console.log("\n=== Rectangulo ===");
console.log(`Dimensiones: ${rectangulo.ancho} x ${rectangulo.alto}`);
console.log("Area:       ", rectangulo.area());
console.log("Perimetro:  ", rectangulo.perimetro());


// ============================================================
// EJERCICIO 4: Inventario
// ============================================================
// Object.entries() convierte el objeto en pares [clave, valor],
// lo que permite usar map(), filter() y reduce() sobre el.
// Object.values() devuelve solo los valores (sin las claves).
// ============================================================

const inventario = {
  teclado: { precio: 50000,  stock: 10 },
  mouse:   { precio: 25000,  stock: 20 },
  monitor: { precio: 180000, stock: 5  },
};

// Valor total: precio * stock de cada producto, sumados
const valorTotal = Object.values(inventario).reduce(
  (acc, prod) => acc + prod.precio * prod.stock, 0
);

// Producto mas caro: comparar precios con reduce()
const [productoMasCaro] = Object.entries(inventario).reduce(
  (mejor, actual) => (actual[1].precio > mejor[1].precio ? actual : mejor)
);

// Productos sin stock (stock === 0)
const sinStock = Object.entries(inventario)
  .filter(([, prod]) => prod.stock === 0)
  .map(([nombre]) => nombre);

// Incrementar precio un 15% (se crea un nuevo objeto sin mutar el original)
const inventarioActualizado = Object.fromEntries(
  Object.entries(inventario).map(([nombre, prod]) => [
    nombre,
    { ...prod, precio: Math.round(prod.precio * 1.15) },
  ])
);

console.log("\n=== Inventario ===");
console.log("Valor total del inventario: $" + valorTotal);
console.log("Producto mas caro:          " + productoMasCaro);
console.log("Productos sin stock:        " + (sinStock.length ? sinStock.join(", ") : "ninguno"));
console.log("Precios con +15%:");
Object.entries(inventarioActualizado).forEach(([nombre, prod]) =>
  console.log(`  ${nombre}: $${prod.precio}`)
);


// ============================================================
// EJERCICIO 5: deepEqual(obj1, obj2)
// ============================================================
// Compara dos objetos en profundidad (recursivamente).
// Primero verifica igualdad de tipos primitivos con ===.
// Luego compara la cantidad de claves y, para cada una,
// llama a si misma recursivamente para comparar valores anidados.
// ============================================================

function deepEqual(obj1, obj2) {
  // Si son el mismo valor primitivo (o la misma referencia), son iguales
  if (obj1 === obj2) return true;

  // Si alguno no es objeto (o es null), no son iguales (ya se descarto === arriba)
  if (
    typeof obj1 !== "object" || obj1 === null ||
    typeof obj2 !== "object" || obj2 === null
  ) return false;

  const claves1 = Object.keys(obj1);
  const claves2 = Object.keys(obj2);

  // Deben tener la misma cantidad de propiedades
  if (claves1.length !== claves2.length) return false;

  // Comparar cada propiedad recursivamente
  return claves1.every(
    (clave) => claves2.includes(clave) && deepEqual(obj1[clave], obj2[clave])
  );
}

const a = { x: 10, y: { z: 20 } };
const b = { x: 10, y: { z: 20 } };
const c = { x: 10, y: { z: 99 } };

console.log("\n=== deepEqual ===");
console.log("a vs b (iguales):", deepEqual(a, b)); // true
console.log("a vs c (distintos):", deepEqual(a, c)); // false


// ============================================================
// EJERCICIO 6: merge(obj1, obj2)
// ============================================================
// Fusiona dos objetos de forma recursiva.
// Si una clave existe en ambos objetos Y los dos valores son
// objetos, se llama a merge() sobre esos sub-objetos.
// Si no, el valor de obj2 sobreescribe al de obj1.
// El spread { ...obj1 } crea una copia para no mutar el original.
// ============================================================

function merge(obj1, obj2) {
  const resultado = { ...obj1 }; // copia superficial de obj1

  for (const clave in obj2) {
    const esObjetoEnAmbos =
      typeof obj1[clave] === "object" && obj1[clave] !== null &&
      typeof obj2[clave] === "object" && obj2[clave] !== null;

    if (esObjetoEnAmbos) {
      // Fusionar recursivamente si ambos son objetos
      resultado[clave] = merge(obj1[clave], obj2[clave]);
    } else {
      // Si no, el valor de obj2 gana (o se agrega si no existia)
      resultado[clave] = obj2[clave];
    }
  }

  return resultado;
}

const obj1 = { usuario: { nombre: "Ana", edad: 20 }, activo: true };
const obj2 = { usuario: { ciudad: "Mendoza" } };

console.log("\n=== merge ===");
console.log("obj1:", JSON.stringify(obj1));
console.log("obj2:", JSON.stringify(obj2));
console.log("Resultado:", JSON.stringify(merge(obj1, obj2)));
