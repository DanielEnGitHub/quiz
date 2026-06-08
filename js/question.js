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
      "Para copiar un texto o archivo",
      "Para pegar un texto o archivo",
      "Para borrar un texto o archivo",
      "Para deshacer la última acción",
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
      "Para deshacer la última acción",
    ],
    answer: 2,
    topic: "computer",
  },

  //4
  {
    q: "¿Qué signo se muestra al presionar las teclas Shift + 1?",
    options: [
      "Signo de admiración (!)",
      "Signo de pregunta (?)",
      "Signo de igual (=)",
    ],
    answer: 0,
    topic: "computer",
  },

  //5
  {
    q: "¿Qué signo se muestra al presionar las teclas Shift + 8?",
    options: [
      "Signo de apertura de paréntesis (",
      "Signo de cierre de paréntesis )",
      "Signo de interrogación ?",
    ],
    answer: 0,
    topic: "computer",
  },

  //6
  {
    q: "¿Qué signo se muestra al presionar las teclas Shift + 9?",
    options: [
      "Signo de admiración (!)",
      "Signo de cierre de paréntesis )",
      "Signo de interrogación ?",
    ],
    answer: 1,
    topic: "computer",
  },

  //7
  {
    q: "¿Qué signo se muestra al presionar las teclas Shift + 2?",
    options: [
      'Signo de comillas dobles (")',
      "Signo de comillas simples (')",
      "Signo de arroba (@)",
    ],
    answer: 0,
    topic: "computer",
  },

  //8
  {
    q: "¿Se utiliza la tecla Shift para escribir una COMA (,)?",
    options: ["Verdadero", "Falso"],
    answer: 1,
    topic: "computer",
  },

  //9
  {
    q: "¿Se utiliza la tecla Shift para escribir un PUNTO (.)?",
    options: ["Verdadero", "Falso"],
    answer: 1,
    topic: "computer",
  },

  //10
  {
    q: "¿Qué combinación de teclas se utiliza para escribir los DOS PUNTOS (:)?",
    options: ["Shift + Punto", "Shift + Coma", "Alt + Punto", "Alt + Coma"],
    answer: 0,
    topic: "computer",
  },

  //11
  {
    q: "¿Qué combinación de teclas se utiliza para escribir el PUNTO Y COMA (;)?",
    options: ["Shift + Punto", "Shift + Coma", "Alt + Punto", "Alt + Coma"],
    answer: 1,
    topic: "computer",
  },

  //12
  {
    q: "¿Para qué sirve la combinación de teclas Ctrl + G en WORD?",
    options: [
      "Para guardar un documento en Word",
      "Para pegar una imagen",
      "Para copiar una imagen",
      "La respuesta esta en tu corazón",
    ],
    answer: 0,
    topic: "computer",
  },

  //13
  {
    q: "¿Es posible cambiar el tamaño de una imagen en Word?",
    options: [
      "Si, es posible",
      "No, es imposible",
      "Yo solo sé que no sé nada",
    ],
    answer: 0,
    topic: "computer",
  },

  //14
  {
    q: "¿Cómo se escribe el signo de INTERROGACIÓN de APERTURA (¿)?",
    options: [
      "Con la tecla que está al lado de BORRAR",
      "Shift + ?",
      "Shift + 1",
      "No se puede",
    ],
    answer: 0,
    topic: "computer",
  },

  {
    q: "¿Qué combinación de teclas se usa para copiar una imagen o texto?",
    options: ["Ctrl + C", "Shift + C", "Alt + C"],
    answer: 0,
    topic: "computer",
  },
];

const principiante = [
  //1
  {
    q: "¿Para qué sirve Microsoft Word?",
    options: [
      "Para escribir y hacer documentos",
      "Para escuchar música",
      "Para jugar videojuegos",
    ],
    answer: 0,
    topic: "word",
  },

  //2
  {
    q: "¿De qué color es el ícono de Word?",
    options: ["Rojo", "Azul", "Verde"],
    answer: 1,
    topic: "word",
  },

  //3
  {
    q: "¿Qué puedes hacer con las letras en Word?",
    options: [
      "Cambiar su color y tamaño",
      "Hacer que se muevan solas",
      "Pintarlas con crayones",
    ],
    answer: 0,
    topic: "word",
  },

  //4
  {
    q: "¿Dónde se escribe el texto en Word?",
    options: [
      "En una hoja en blanco",
      "En una calculadora",
      "En una ventana de internet",
    ],
    answer: 0,
    topic: "word",
  },

  //5
  {
    q: "¿Para qué sirve el mouse?",
    options: [
      "Para mover el puntero y hacer clic",
      "Para escuchar música",
      "Para escribir letras",
    ],
    answer: 0,
    topic: "computer",
  },

  //6
  {
    q: "¿Para qué sirve el teclado?",
    options: [
      "Para escribir letras y números",
      "Para mover el puntero",
      "Para ver videos",
    ],
    answer: 0,
    topic: "computer",
  },

  //7
  {
    q: "¿Para qué sirve la pantalla?",
    options: [
      "Para ver lo que hacemos en la computadora",
      "Para escribir letras",
      "Para guardar los trabajos",
    ],
    answer: 0,
    topic: "computer",
  },

  //8
  {
    q: "¿Para qué sirve la CPU (torre)?",
    options: [
      "Es el cerebro de la computadora",
      "Es una bocina",
      "Es una impresora",
    ],
    answer: 0,
    topic: "computer",
  },

  //10
  {
    q: "¿Cómo se cambia el color de las letras en Word?",
    options: [
      "Seleccionando el texto y eligiendo un color",
      "Con el botón de borrar",
      "Con el teclado numérico",
    ],
    answer: 0,
    topic: "word",
  },

  //11
  {
    q: "¿Cómo se cambia el tamaño de las letras en Word?",
    options: [
      "Seleccionando el texto y cambiando el número del tamaño",
      "Haciendo doble clic en el ratón",
      "Apagando la computadora",
    ],
    answer: 0,
    topic: "word",
  },

  //15
  {
    q: "¿Qué podemos hacer con la opción 'Insertar imagen' en Word?",
    options: [
      "Poner dibujos o fotos en el documento",
      "Borrar letras",
      "Cambiar el fondo de la computadora",
    ],
    answer: 0,
    topic: "word",
  },

  {
    q: "Para qué sirve el menu de windows?",
    options: [
      "Para jugar",
      "Para buscar programas o juegos",
      "Para mover el mouse",
    ],
    answer: 1,
    topic: "word",
  },
];

const segundo = [
  //1
  {
    q: "¿Dónde podemos cambiar el tamaño de la letra?",
    options: [
      "En la pestaña Inicio",
      "En la pestaña Insertar",
      "En la pestaña Diseño",
    ],
    answer: 0,
    topic: "computer",
  },
  {
    q: "¿Qué color tiene el logotipo de Word?",
    options: ["Verde", "Azul", "Rojo", "Amarillo"],
    answer: 1,
    topic: "computer",
  },
  //5
  {
    q: "¿Se puede cambiar el color de la letra en Word?",
    options: ["Verdadero", "Falso"],
    answer: 0,
    topic: "computer",
  },

  {
    q: "¿Qué icono se utlizamos para cambiar el color a una letra?",
    options: ["Una letra A con color debajo", "Un borrador", "Un clip"],
    answer: 0,
    topic: "computer",
  },
  //10
  {
    q: "¿Dónde se cambia el color de fondo de la hoja?",
    options: ["En Diseño", "En Insertar", "En Revisar"],
    answer: 0,
    topic: "computer",
  },

  //12
  {
    q: "¿Se pueden poner bordes en una hoja de Word?",
    options: ["Verdadero", "Falso"],
    answer: 0,
    topic: "computer",
  },
  //13
  {
    q: "¿Qué hace la tecla Enter?",
    options: ["Borra el texto", "Hace un salto de línea", "Cierra el programa"],
    answer: 1,
    topic: "computer",
  },
  //16
  {
    q: "¿Qué sucede si cambiamos el tamaño de letra de 12 a 20?",
    options: [
      "La letra se hace más pequeña",
      "La letra se hace más grande",
      "El texto desaparece",
    ],
    answer: 1,
    topic: "computer",
  },
  //17
  {
    q: "Según la imagen, ¿Para que sirve la siguiente opción de Word?",
    options: [
      "Cambiar el tamaño de la letra",
      "Cambiar el estilo de la letra",
      "Cambiar el tamaño de la hoja",
    ],
    img: "img/medio/01.png",
    answer: 1,
    topic: "computer",
  },
  //19
  {
    q: "¿Se pueden mezclar varios colores en una misma palabra?",
    options: ["Verdadero", "Falso"],
    answer: 0,
    topic: "computer",
  },
  {
    q: "¿Cuales son pasos para insertar una tabla en Word?",
    options: [
      "Ir a la pestaña Insertar, seleccionar tabla y elegir el número de filas y columnas",
      "No sé puede hacer una tabla en Word",
      "No recuerdo",
      "No sé vio en clase",
    ],
    img: "img/medio/10.png",
    answer: 0,
    topic: "computer",
  },

  {
    q: "¿Cómo se llama el siguiente programa?",
    options: ["Excel", "Clash Royale", "Word", "Free Fire"],
    img: "img/questions/word.jpg",
    answer: 2,
    topic: "computer",
  },

  {
    q: "¿Para que sirve Word?",
    options: [
      "Para hacer jugar",
      "Para hacer ver películas",
      "Para escribir documentos",
    ],
    img: "img/questions/word.jpg",
    answer: 2,
    topic: "computer",
  },

  {
    q: "¿Para qué sirve el botón CERRAR en una ventana de Windows?",
    options: [
      "Para cerrar una ventana o programa",
      "Para abrir un juego",
      "Para oclutar una ventana o programa",
    ],
    img: "img/questions/cerrar.png",
    answer: 0,
    topic: "computer",
  },

  {
    q: "¿Para qué sirve el botón MAXIMIZAR en una ventana de Windows?",
    options: [
      "Para agrandar o hacer pequeña una ventana o programa",
      "Para abrir un juego",
      "Para oclutar una ventana o programa",
    ],
    img: "img/questions/maximizar.png",
    answer: 0,
    topic: "computer",
  },

  {
    q: "¿Para qué sirve el botón MINIMIZAR en una ventana de Windows?",
    options: [
      "Para ocultar una ventana o programa",
      "Para agrandar o hacer pequeña una ventana o programa",
      "No sé, tengo hambre",
    ],
    img: "img/questions/minimizar.png",
    answer: 0,
    topic: "computer",
  },
];

const principiantes = principiante;
const intermedio = segundo;
const avanzado = examen;

// Registro de bancos de preguntas disponibles
// Para agregar más: "Nombre visible": nombreDelArray
const QUESTION_SETS = {
  "2do": principiantes,
  "3ro y 4to": intermedio,
  "5to y 6to": avanzado,
};
