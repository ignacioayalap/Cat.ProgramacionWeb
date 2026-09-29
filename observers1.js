// ============================================================
// observers1.js - Patron Observer: clase Subject
// ============================================================
// El patron Observer define una relacion 1 a muchos:
// cuando el SUBJECT cambia de estado, notifica automaticamente
// a todos los OBSERVERS suscritos.
//
// Componentes:
//   Subject  → el "emisor" que gestiona la lista de observers
//   Observer → cualquier funcion o objeto que "escucha" al subject
// ============================================================

class Subject {
  // El constructor inicializa la lista de observers como array vacio
  constructor() {
    this._observers = []; // convencion: _ indica propiedad "privada"
  }

  // ----------------------------------------------------------
  // subscribe(observer): agrega un observer a la lista
  // Se evita agregar el mismo observer dos veces con includes().
  // ----------------------------------------------------------
  subscribe(observer) {
    if (this._observers.includes(observer)) {
      console.log("Este observer ya esta suscrito.");
      return;
    }
    this._observers.push(observer);
    console.log(`Observer suscrito. ${this.observerCount}`);
  }

  // ----------------------------------------------------------
  // unsubscribe(observer): elimina un observer de la lista
  // filter() devuelve un nuevo array sin el observer indicado.
  // ----------------------------------------------------------
  unsubscribe(observer) {
    this._observers = this._observers.filter((obs) => obs !== observer);
    console.log(`Observer eliminado. ${this.observerCount}`);
  }

  // ----------------------------------------------------------
  // notify(data): llama a cada observer pasandole los datos
  // Cada observer debe ser una funcion que reciba el dato.
  // ----------------------------------------------------------
  notify(data) {
    console.log(`\nNotificando a ${this._observers.length} observers con: "${data}"`);
    this._observers.forEach((observer) => observer(data));
  }

  // ----------------------------------------------------------
  // get observerCount: propiedad calculada (getter)
  // Un getter se accede como propiedad, sin parentesis:
  //   subject.observerCount  (NO: subject.observerCount())
  // ----------------------------------------------------------
  get observerCount() {
    return `Cantidad de observers: ${this._observers.length}`;
  }
}

// ============================================================
// Uso del Subject: definir observers como funciones simples
// ============================================================

// Cada observer es una funcion que recibe el dato notificado
const observer1 = (data) => console.log(`  [Observer 1] Recibido: ${data}`);
const observer2 = (data) => console.log(`  [Observer 2] Recibido: ${data}`);
const observer3 = (data) => console.log(`  [Observer 3] Recibido: ${data}`);

const subject = new Subject();

// Suscribir los tres observers
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

// Verificar cantidad
console.log("\n" + subject.observerCount); // Cantidad de observers: 3

// Notificar a todos
subject.notify("Evento A");

// Desuscribir observer1
console.log();
subject.unsubscribe(observer1);

// Verificar que quedo en 2
console.log(subject.observerCount); // Cantidad de observers: 2

// Notificar nuevamente (solo observer2 y observer3 reciben)
subject.notify("Evento B");

// Intento de suscribir un observer duplicado
console.log();
subject.subscribe(observer2);
