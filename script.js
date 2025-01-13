// función que hace que se copie el texto 
function copiarAlPortapapeles(texto, confirmationId) {
  navigator.clipboard.writeText(texto).then(() => {
    const confirmation = document.getElementById(confirmationId);
    confirmation.style.display = "inline"; // Mostrar confirmación
    setTimeout(() => {
      confirmation.style.display = "none"; // Ocultar después de 2 segundos
    }, 800);
  }).catch((err) => {
    console.error("Error al copiar: ", err);
    alert("No se pudo copiar el texto.");
  });
}

// Función de copiar para el correo
function copiarCorreo() {
  copiarAlPortapapeles("jorss_@ciencias.unam.mx", "confirmation-email");
}

// Función de copiar para WhatsApp
function copiarWhatsapp() {
  copiarAlPortapapeles("+52 55 78 53 80 65", "confirmation-whatsapp");
}

// Función de copiar para Instagram
function copiarInstagram() {
  copiarAlPortapapeles("https://www.instagram.com/jorssmx", "confirmation-instagram");
}

// Función de copiar para Telegram
function copiarTelegram() {
  copiarAlPortapapeles("https://t.me/jorssmx", "confirmation-telegram");
}

// Función para que al dar click en un link le pregunte al usuario si quiere ir a ese sitio web
function confirmarSalida(url) {
  const confirmacion = window.confirm("¿Estás seguro de que deseas salir de esta página y visitar el enlace?");
  if (confirmacion) {
    window.location.href = url; // Redirige si el usuario confirma
    return true;
  }
  return false; // Detiene la redirección si cancela
}


// para la funcionalidad de los botones de oscuro a claro y viciversa
// Seleccionar botones
const darkModeBtn = document.getElementById('dark-mode-btn');
const lightModeBtn = document.getElementById('light-mode-btn');

// Manejadores de eventos para cambiar el modo
darkModeBtn.addEventListener('click', () => {
  document.body.classList.add('dark-mode');
  document.body.classList.remove('light-mode');
});

lightModeBtn.addEventListener('click', () => {
  document.body.classList.add('light-mode');
  document.body.classList.remove('dark-mode');
});

// Aplicar modo claro por defecto al cargar
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('light-mode');
});

// para el cubo sea funcional es decir rote dependiendo el ratón o el touch
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.cubo-container');
  const cube = document.querySelector('.cube');
  if (!container || !cube) {
    console.error('No se encontró el contenedor o el cubo');
    return;
  }

  let isDragging = false;
  let startX, startY;
  let rotateX = 0, rotateY = 0;

  // Detectar si es móvil (opcional)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Función para iniciar el arrastre
  function startDrag(e) {
    // Solo permitir arrastre en el contenedor en móviles
    if (isMobile && !container.contains(e.target)) return;

    const touch = e.touches ? e.touches[0] : e;
    isDragging = true;
    startX = touch.clientX;
    startY = touch.clientY;
    cube.style.cursor = 'grabbing'; // Cambia el cursor
  }

  // Función para mover el cubo
  function onDrag(e) {
    if (!isDragging) return;

    const touch = e.touches ? e.touches[0] : e;
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    rotateY += deltaX * 0.5;
    rotateX = Math.max(-90, Math.min(90, rotateX - deltaY * 0.5)); // Limita la rotación en X

    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    startX = touch.clientX;
    startY = touch.clientY;
  }

  // Función para detener el arrastre
  function stopDrag() {
    isDragging = false;
    cube.style.cursor = 'grab'; // Vuelve al cursor inicial
  }

  // Eventos generales
  document.addEventListener('mousedown', startDrag);
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);

  document.addEventListener('touchstart', startDrag);
  document.addEventListener('touchmove', onDrag);
  document.addEventListener('touchend', stopDrag);

  // Cursor inicial
  cube.style.cursor = 'grab';
});

// para los certificados de educación para que se puedan abrir y cerrar las fotos 
function verCertificado(element) {
  const modal = document.getElementById('modal');
  const imagenGrande = document.getElementById('imagen-grande');
  const imagenPequena = element.querySelector('img');

  // Cambiar la imagen del modal por la imagen en grande
  const rutaImagenGrande = imagenPequena.src.replace('-miniatura', '');
  imagenGrande.src = rutaImagenGrande;

  // Mostrar el modal
  modal.style.display = 'flex';

  // Agregar evento para cerrar con ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      cerrarModal();
    }
  });

  // Agregar evento para cerrar haciendo clic en cualquier parte de la pantalla
  modal.addEventListener('click', function(event) {
    if (event.target === modal) {
      cerrarModal();
    }
  });
}

function cerrarModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

function escListener(event) {
  if (event.key === 'Escape') cerrarModal();
}

//CAMBIOS

// para la parte de los proyectos que al dar click en la imagen te mande a la página de cierto proyecto
// Función para redirigir al enlace del proyecto
function irAProyecto(element) {
  // Obtén el enlace del atributo 'data-enlace'
  const enlace = element.querySelector('span').getAttribute('data-enlace');
  if (enlace) {
    // Pregunta al usuario si quiere visitar la página
    confirmarSalida(enlace);
  } else {
    console.error("No se encontró un enlace para este proyecto.");
  }
}

// Funcion para que no se propague el click del boton dentro del contenedor
function handleGitHubClick(event) {
  // Prevenir que el clic en el botón GitHub active el evento en el contenedor
  event.stopPropagation(); // Detener la propagación del clic al contenedor
  
  // Preguntar al usuario si desea visitar el enlace
  const confirmacion = confirm("¿Deseas visitar este enlace de GitHub?");
  if (confirmacion) {
    // Redirigir al enlace de GitHub si el usuario acepta
    window.location.href = event.target.href;
  } else {
    // Cancelar la acción si el usuario no acepta
    event.preventDefault();
  }
}


// Función para confirmar antes de redirigir (reutilizamos la existente)
function confirmarSalida(url, mensaje = "¿Estás seguro de que deseas visitar el enlace?") {
  const confirmacion = window.confirm(mensaje);
  if (confirmacion) {
    window.location.href = url;
  }
}

// para el cambio de idioma en este caso de español a inglés y viceversa
const texts = {
  es: {
    // parte de la barra fija
    sobreMi: "Sobre mí",
    habilidades: "Habilidades",
    proyectos: "Proyectos",
    educacion: "Educación",
    contacto: "Contacto",

     // titulos
    sobreMiTitle: "¡HOLA!, SOY JORGE SÁNCHEZ",
    habilidadesTitle: "HABILIDADES",
    proyectosTitle: "PROYECTOS",
    educacionTitle: "EDUCACIÓN",
    contactoTitle: "CONTÁCTAME",

    //subtitulos
    certificadosTitle: "CERTIFICADOS:",
    sitioTitle: "ESTE SITIO ESTÁ DESARROLLADO CON:",

    // texto
    sobreMiText: "Soy un apasionado de la programación y siempre estoy en busca de nuevas formas de mejorar y seguir aprendiendo en este fascinante mundo. Mi interés por la programación comenzó en 2015, durante mi último semestre de bachillerato, cuando tomé una materia de computación. Fue entonces cuando escribí mi primer 'Hola Mundo' en Java. \n\n Me encanta rodearme de personas que también comparten esta pasión por la tecnología, aprender de ellas y, a su vez, ayudarlas cuando lo necesiten. Siempre estoy dispuesto a colaborar y crecer en comunidad, porque creo que el aprendizaje es más enriquecedor cuando se comparte.",
    currentStatus: "Actualmente me encuentro cursando las últimas tres materias necesarias para concluir los créditos de mi carrera. Sin embargo, estoy interesado en adquirir experiencia laboral y comenzar a aplicar los conocimientos adquiridos.",
    cchText: "2015-2018 Colegio de Ciencias y Humanidades Plantel Vallejo (CCH Vallejo), Universidad Nacional Autónoma de México (UNAM), Av. 100 Metros, Av Fortuna Esq, Magdalena de las Salinas, Gustavo A. Madero, 07760 CDMX.",
    FCienciasText: "2018-2025 Licenciatura en Ciencias de la Computación (Facultad de Ciencias), Universidad Nacional Autónoma de México (UNAM), Investigación Científica, C.U., Coyoacán, 04510 Ciudad de México, CDMX.",
    actual3materiasText: "Actualmente sigo estudiando la carrera de Ciencias de la computación en la Facultad de Ciencias de la UNAM, estoy a 3 materias para concluir.",
    

    // texto proyectos
    textFacultad: "Todo lo que hice en la Facultad",
    textGato: "Juego del Gato",
    textMemorama: "Juego del Memorama",

    // botones
    btnDescargar: "Descarga mi CV",
    btnOscuro: "Oscuro",
    btnClaro: "Claro",
    btnEspanol : "Español",
    btnIngles: "Inglés",
    btnCorreo: "Copiar correo",
    btnInstagram: "Copiar Instagram",
    btnWhatsApp: "Copiar WhatsApp",
    btnTelegram: "Copiar Telegram",
    btnArchivos: "Archivos",

    // Add other text elements...
    habilidadesText: "Gira el cubo",
    aparicionCopiado: "✔ Copiado"

  },
  en: {
    // parte de la barra fija
    sobreMi: "About Me",
    habilidades: "Skills",
    proyectos: "Projects",
    educacion: "Education",
    contacto: "Contact",

    // titulos  
    sobreMiTitle: "HELLO!, I'M JORGE SÁNCHEZ",
    habilidadesTitle: "SKILLS",
    proyectosTitle: "PROJECTS",
    educacionTitle: "EDUCATION",
    contactoTitle: "CONTACT ME",

    //subtitulos
    certificadosTitle: "CERTIFICATES:",
    sitioTitle: "THIS SITE IS DEVELOPED WITH:",

    // texto 
    sobreMiText: "I am passionate about programming and always looking for new ways to improve and keep learning in this fascinating world. My interest in programming began in 2015, during my last semester of high school, when I took a computer science course. It was then that I wrote my first 'Hello World' in Java. \n\n I love surrounding myself with people who also share this passion for technology, learning from them, and, in turn, helping them when they need it. I am always willing to collaborate and grow as a community because I believe that learning is more enriching when shared.",
    currentStatus: "I am currently taking the last three courses required to complete the credits for my degree. However, I am eager to gain work experience and start applying the knowledge I have acquired.",
    cchText: "2015-2018 College of Sciences and Humanities Vallejo Campus (CCH Vallejo), National Autonomous University of Mexico (UNAM), Av. 100 Metros, Av Fortuna Esq, Magdalena de las Salinas, Gustavo A. Madero, 07760 Mexico City.",
    FCienciasText: "2018-2025 Bachelor's Degree in Computer Science (Faculty of Sciences), National Autonomous University of Mexico (UNAM), Scientific Research, University City (C.U.), Coyoacán, 04510 Mexico City, CDMX.",
    actual3materiasText: "I am currently studying for a degree in Computer Science at the Faculty of Sciences at UNAM. I have three courses left to complete my studies.",

    // texto proyectos
    textFacultad: "Everything I did in the Faculty",
    textGato: "Cat Game",
    textMemorama: "Memorama game",

    // botones
    btnDescargar: "Download my CV",
    btnOscuro: "Dark",
    btnClaro: "Light",
    btnEspanol : "Spanish",
    btnIngles: "English",
    btnCorreo: "Copy email",
    btnInstagram: "Copy Instagram",
    btnWhatsApp: "Copy WhatsApp",
    btnTelegram: "Copy Telegram",
    btnArchivos: "Files",

    // Add other text elements...
    habilidadesText: "Rotate the cube",
    aparicionCopiado: "✔ Copied"
  }
};

// Función para cambiar el idioma
function changeLanguage(lang) {
  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.getAttribute("data-key");
    if (texts[lang][key]) {
      element.innerText = texts[lang][key];
    }
  });
}

document.getElementById("spanish-btn").addEventListener("click", () => changeLanguage('es'));
document.getElementById("english-btn").addEventListener("click", () => changeLanguage('en'));





  
  
  
  
  
  
  