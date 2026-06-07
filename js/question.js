const examen = [
  //1
  {
    q: "¿Para qué sirve la combinación de teclas Ctrl + C?",
    options: [
      "Para copiar un texto o archivo",
      "Para pegar un texto o archivo",
      "Para borrar un texto o archivo",
    ],
    answer: 0,
    topic: "computer",
  },

  //2
  {
    q: "¿Para qué sirve la combinación de teclas Ctrl + V?",
    options: [
      "Para copiar un texto",
      "Para pegar un texto",
      "Para deshacer un cambio",
    ],
    answer: 1,
    topic: "computer",
  },

  //3
  {
    q: "¿Para qué sirve la combinación de teclas Ctrl + Z?",
    options: [
      "Para copiar un texto",
      "Para pegar un texto",
      "Para deshacer un cambio",
      "Para borrar algo",
    ],
    answer: 2,
    topic: "computer",
  },

  //4
  {
    q: "¿Qué signo aparece al presionar Shift + 1?",
    options: ["!", "()", "Pegar un texto"],
    answer: 0,
    topic: "computer",
  },

  //5
  {
    q: "¿Qué signo aparece al presionar Shift + 8?",
    options: ["(", ")", "¿"],
    answer: 0,
    topic: "computer",
  },

  //6
  {
    q: "¿Qué signo aparece al presionar Shift + 9?",
    options: [")", "(", "?"],
    answer: 0,
    topic: "computer",
  },

  //7
  {
    q: "¿Qué signo aparece al presionar Shift + 2?",
    options: ['"', "'", "@"],
    answer: 0,
    topic: "computer",
  },

  //8
  {
    q: "¿Para escribir una coma (,) se usa la tecla Shift?",
    options: ["Verdadero", "Falso"],
    answer: 1,
    topic: "computer",
  },

  //9
  {
    q: "¿Para escribir un punto (.) se usa la tecla Shift?",
    options: ["Verdadero", "Falso"],
    answer: 1,
    topic: "computer",
  },

  //10
  {
    q: "¿Cómo se escriben los dos puntos (:)?",
    options: ["Shift + Punto", "Shift + Coma", "Alt + Punto", "Alt + Coma"],
    answer: 0,
    topic: "computer",
  },

  //11
  {
    q: "¿Cómo se escribe el punto y coma (;)?",
    options: ["Shift + Punto", "Shift + Coma", "Alt + Punto", "Alt + Coma"],
    answer: 1,
    topic: "computer",
  },

  //12
  {
    q: "¿Cómo se puede poner una imagen en un documento de Word?",
    options: [
      "Ir a Insertar → Imagen",
      "Ir a Inicio → Imagen",
      "Ir a Archivo → Imagen",
    ],
    answer: 0,
    topic: "computer",
  },

  //13
  {
    q: "¿Se puede cambiar el tamaño de una imagen en Word?",
    options: ["Sí, se puede cambiar", "No, no se puede cambiar"],
    answer: 0,
    topic: "computer",
  },
];

const quiz = examen;

// Registro de bancos de preguntas disponibles
// Para agregar más: "Nombre visible": nombreDelArray
const QUESTION_SETS = {
  "Examen General": examen,
};
