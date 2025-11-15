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
  copiarAlPortapapeles("jorssmx.24@gmail.com", "confirmation-email");
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

// Función para confirmar la navegación; respeta clic medio y Ctrl/Cmd+clic
function confirmarSalida(url, mensaje = "¿Estás seguro de que deseas visitar el enlace?", event) {
  const e = event || window.event;
  // Si es clic medio o está presionando Ctrl/Cmd, permitir el comportamiento por defecto (abrir nueva pestaña)
  if (e && (e.button === 1 || e.ctrlKey || e.metaKey)) {
    return true;
  }
  // Para clic izquierdo normal, preguntar confirmación; true permite la navegación, false la cancela
  const confirmacion = window.confirm(mensaje);
  return confirmacion;
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
  const containers = document.querySelectorAll('.cubo-container');
  if (!containers.length) {
    console.error('No se encontraron contenedores de cubos');
    return;
  }

  containers.forEach((container) => {
    const cube = container.querySelector('.cube');
    if (!cube) return;

    let isDragging = false;
    let startX, startY;
    let rotateX = 0, rotateY = 0;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    function startDrag(e) {
      if (isMobile && !container.contains(e.target)) return;

      const touch = e.touches ? e.touches[0] : e;
      isDragging = true;
      startX = touch.clientX;
      startY = touch.clientY;
      cube.style.cursor = 'grabbing';

      // Escuchar el movimiento en la ventana mientras se arrastra este cubo
      window.addEventListener('mousemove', onDrag);
      window.addEventListener('mouseup', stopDrag);
      window.addEventListener('touchmove', onDrag);
      window.addEventListener('touchend', stopDrag);
    }

    function onDrag(e) {
      if (!isDragging) return;

      const touch = e.touches ? e.touches[0] : e;
      const deltaX = touch.clientX - startX;
      const deltaY = touch.clientY - startY;

      rotateY += deltaX * 0.5;
      rotateX = Math.max(-90, Math.min(90, rotateX - deltaY * 0.5));

      cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      startX = touch.clientX;
      startY = touch.clientY;
    }

    function stopDrag() {
      isDragging = false;
      cube.style.cursor = 'grab';

      window.removeEventListener('mousemove', onDrag);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchmove', onDrag);
      window.removeEventListener('touchend', stopDrag);
    }

    // Eventos por contenedor para iniciar el arrastre de cada cubo de forma independiente
    container.addEventListener('mousedown', startDrag);
    container.addEventListener('touchstart', startDrag, { passive: true });

    // Cursor inicial
    cube.style.cursor = 'grab';
  });
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
function irAProyecto(element, event) {
  const span = element.querySelector('span');
  const enlace = span ? span.getAttribute('data-enlace') : null;
  if (!enlace) {
    console.error("No se encontró un enlace para este proyecto.");
    return;
  }

  const e = event || window.event;
  if (e && (e.button === 1 || e.ctrlKey || e.metaKey)) {
    window.open(enlace, '_blank');
    return;
  }

  if (confirmarSalida(enlace, undefined, e)) {
    window.location.href = enlace;
  }
}

// Funcion para que no se propague el click del boton dentro del contenedor
function handleGitHubClick(event) {
  event.stopPropagation();
  if (event.button === 1 || event.ctrlKey || event.metaKey) {
    return true;
  }
  const confirmacion = confirm("¿Deseas visitar este enlace de GitHub?");
  if (!confirmacion) {
    event.preventDefault();
  }
}

// Abrir proyectos en nueva pestaña con clic medio en cualquier zona del proyecto
document.addEventListener('auxclick', function(e) {
  if (e.button !== 1) return;
  const card = e.target.closest('.proyecto');
  if (!card) return;
  const span = card.querySelector('span');
  const enlace = span ? span.getAttribute('data-enlace') : null;
  if (enlace) {
    window.open(enlace, '_blank');
  }
});


// (confirmarSalida unificada arriba)

// para el cambio de idioma en este caso de español a inglés y viceversa
const texts = {
  es: {
    // parte de la barra fija
    sobreMi: "Sobre mí",
    habilidades: "Habilidades",
    proyectos: "Proyectos",
    educacion: "Educación y Experiencia",
    contacto: "Contacto",

     // titulos
    sobreMiTitle: "¡HOLA!, SOY JORGE SÁNCHEZ",
    habilidadesTitle: "HABILIDADES",
    proyectosTitle: "PROYECTOS",
    educacionTitle: "EDUCACIÓN Y EXPERIENCIA",
    contactoTitle: "CONTÁCTAME",

    //subtitulos
    certificadosTitle: "CERTIFICADOS:",
    sitioTitle: "ESTE SITIO ESTÁ DESARROLLADO CON:",

    // texto
    sobreMiText: "Soy un desarrollador apasionado por convertir ideas en experiencias digitales. Disfruto diseñar y construir aplicaciones móviles y web con código claro y eficiente. Siempre estoy en busca de nuevos retos para seguir evolucionando como profesional del software.",
    sobreMiText2: "Me encanta rodearme de personas que también comparten esta pasión por la tecnología, aprender de ellas y, a su vez, ayudarlas cuando lo necesiten. Siempre estoy dispuesto a colaborar y crecer en comunidad, porque creo que el aprendizaje es más enriquecedor cuando se comparte.",
    FCienciasText: "2018-2025 Licenciatura en Ciencias de la Computación (Facultad de Ciencias), Universidad Nacional Autónoma de México (UNAM), Investigación Científica, C.U., Coyoacán, 04510 Ciudad de México, CDMX.",
    IcatText: "Servicio Social - 2025 – Actualidad, Instituto de Ciencias Aplicadas y Tecnología (ICAT), Cto. Exterior S/N, C.U., Coyoacán, 04510 Ciudad de México, CDMX.",
    actual1materiasText: "Estoy a una matería para poder titularme.",
    

    // texto proyectos
    textFacultad: "Todo lo que hice en la Facultad",
    textGato: "Juego del Gato",
    textMemorama: "Juego del Memorama",
    textNotas: "App de Notas",

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
    educacionTitle: "EDUCATION AND EXPERIENCE",
    contactoTitle: "CONTACT ME",

    //subtitulos
    certificadosTitle: "CERTIFICATES:",
    sitioTitle: "THIS SITE IS DEVELOPED WITH:",

    // texto 
    sobreMiText: "I am a developer passionate about turning ideas into digital experiences. I enjoy designing and building mobile and web applications with clean, efficient code. I am always seeking new challenges to keep evolving as a software professional.",
    sobreMiText2: "I love being surrounded by people who share this passion for technology, learning from them, and in turn, helping them when they need it. I'm always willing to collaborate and grow within a community because I believe learning is more enriching when shared.",
    currentStatus: "I am currently taking the last three courses required to complete the credits for my degree. However, I am eager to gain work experience and start applying the knowledge I have acquired.",
    cchText: "2015-2018 College of Sciences and Humanities Vallejo Campus (CCH Vallejo), National Autonomous University of Mexico (UNAM), Av. 100 Metros, Av Fortuna Esq, Magdalena de las Salinas, Gustavo A. Madero, 07760 Mexico City.",
    FCienciasText: "2018-2025 Bachelor's Degree in Computer Science (Faculty of Sciences), National Autonomous University of Mexico (UNAM), Scientific Research, University City (C.U.), Coyoacán, 04510 Mexico City, CDMX.",
    IcatText: "2025-2028 Service Social, Institute of Applied Sciences and Technology (ICAT), Cto. Exterior S/N, C.U., Coyoacán, 04510 Mexico City, CDMX.",
    actual1materiasText: "I am one subject away from graduating.",

    // texto proyectos
    textFacultad: "Everything I did in the Faculty",
    textGato: "Cat Game",
    textMemorama: "Memorama game",
    textNotas: "Notes app",

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





  
  
  
  
  
  
  