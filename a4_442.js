// ============================================================
// a4_442.js - Funciones de primer orden: capitalizar y encriptar
// ============================================================
// Las FUNCIONES DE PRIMER ORDEN (o de orden superior) son
// funciones que pueden:
//   a) Recibir otras funciones como parametros.
//   b) Devolver funciones como resultado.
//
// Aqui definimos transformaciones como funciones independientes
// y las pasamos como argumentos a map(), demostrando este concepto.
// ============================================================

const usuarios = [
  { nombre: "ana garcia", clave: "perro123" },
  { nombre: "LUIS PEREZ", clave: "gato456" },
  { nombre: "marta lopez", clave: "sol789" },
  { nombre: "PEDRO ROMERO", clave: "luna321" },
];

// ------------------------------------------------------------
// FUNCION 1: capitalizar(str)
// Convierte la primera letra de cada palabra en mayuscula
// y el resto en minuscula.
// split(" ") divide por espacios → ["ana", "garcia"]
// map() capitaliza cada palabra → ["Ana", "Garcia"]
// join(" ") vuelve a unir → "Ana Garcia"
// ------------------------------------------------------------
function capitalizar(str) {
  return str
    .split(" ")
    .map((palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())
    .join(" ");
}

// ------------------------------------------------------------
// FUNCION 2: encriptar(str) - Cifrado Caesar (desplazamiento +3)
// Cada letra se desplaza 3 posiciones en el abecedario.
// Los numeros y otros caracteres no se modifican.
// Ejemplo: "a" → "d",  "z" → "c"  (ciclo circular)
// ------------------------------------------------------------
function encriptar(str) {
  return str
    .split("")
    .map((char) => {
      // Solo encriptar letras a-z (minusculas)
      if (char >= "a" && char <= "z") {
        return String.fromCharCode(((char.charCodeAt(0) - 97 + 3) % 26) + 97);
      }
      // Dejar numeros y otros caracteres sin cambio
      return char;
    })
    .join("");
}

// ------------------------------------------------------------
// FUNCION DE PRIMER ORDEN: transformarUsuarios(arr, fnNombre, fnClave)
// Recibe el array y DOS FUNCIONES como argumentos.
// map() aplica cada funcion a la propiedad correspondiente.
// Esto es el corazon del concepto: pasar funciones como datos.
// ------------------------------------------------------------
function transformarUsuarios(arr, fnNombre, fnClave) {
  return arr.map((usuario) => ({
    nombre: fnNombre(usuario.nombre),
    clave: fnClave(usuario.clave),
  }));
}

// ------------------------------------------------------------
// Aplicar las transformaciones pasando las funciones como argumentos
// ------------------------------------------------------------
const usuariosTransformados = transformarUsuarios(usuarios, capitalizar, encriptar);

console.log("=== Usuarios originales ===");
console.table(usuarios);

console.log("\n=== Usuarios transformados ===");
console.table(usuariosTransformados);

// ------------------------------------------------------------
// VERIFICACION manual de las funciones individuales
// ------------------------------------------------------------
console.log("\n=== Verificacion de funciones ===");
console.log('capitalizar("ana garcia")  →', capitalizar("ana garcia"));
console.log('capitalizar("LUIS PEREZ")  →', capitalizar("LUIS PEREZ"));
console.log('encriptar("perro123")      →', encriptar("perro123"));
console.log('encriptar("gato456")       →', encriptar("gato456"));
