// Espera a que toda la página cargue para ejecutar el código
window.addEventListener("load", () => {
  // Obtener el elemento canvas y su contexto 2D para dibujar
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  // Función para ajustar el tamaño del canvas al tamaño de la ventana
  function resizeCanvas() {
    canvas.width = window.innerWidth;  // Ancho igual al ancho de la ventana
    canvas.height = window.innerHeight; // Alto igual al alto de la ventana
    ctx.fillStyle = "black"; // Color negro para el fondo
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Rellenar todo el canvas de negro
  }

  resizeCanvas(); // Ajustar tamaño inicial
  window.addEventListener("resize", resizeCanvas); // Ajustar tamaño al cambiar tamaño ventana

  // ----- PARTICULAS -----
  const mouse = { x: undefined, y: undefined }; // Coordenadas del mouse inicialmente indefinidas
  const particles = []; // Array para almacenar las partículas

  // Detecta movimiento del mouse sobre el canvas
  canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect(); // Obtener posición del canvas en la pantalla
    // Calcular posición del mouse relativa al canvas
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;

    // Crear 5 partículas nuevas cada vez que se mueve el mouse
    for (let i = 0; i < 5; i++) {
      particles.push(new Particle());
    }
  });

  // Clase para crear partículas
  class Particle {
    constructor() {
      this.x = mouse.x; // Posición inicial en la posición del mouse
      this.y = mouse.y;
      this.size = Math.random() * 3 + 1; // Tamaño aleatorio entre 1 y 4
      this.speedX = Math.random() * 3 - 1.5; // Velocidad horizontal aleatoria entre -1.5 y 1.5
      this.speedY = Math.random() * 3 - 1.5; // Velocidad vertical aleatoria entre -1.5 y 1.5

      // Colores posibles para las partículas
      const colors = ["skyblue", "pink", "yellow", "violet"];
      this.color = colors[Math.floor(Math.random() * colors.length)];

      // Formas posibles para las partículas
      const shapes = ["circle", "square", "triangle"];
      this.shape = shapes[Math.floor(Math.random() * shapes.length)];
    }

    // Actualiza la posición y tamaño de la partícula
    update() {
      this.x += this.speedX; // Mover según velocidad horizontal
      this.y += this.speedY; // Mover según velocidad vertical
      this.size *= 0.95; // Reducir tamaño gradualmente para efecto de desvanecimiento
    }

    // Dibuja la partícula según su forma y color
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      switch (this.shape) {
        case "circle":
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); // Círculo
          ctx.fill();
          break;
        case "square":
          ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2); // Cuadrado
          break;
        case "triangle":
          ctx.moveTo(this.x, this.y - this.size); // Triángulo
          ctx.lineTo(this.x - this.size, this.y + this.size);
          ctx.lineTo(this.x + this.size, this.y + this.size);
          ctx.closePath();
          ctx.fill();
          break;
      }
    }
  }

  // Función para actualizar y dibujar todas las partículas y eliminar las muy pequeñas
  function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Eliminar partículas cuyo tamaño sea menor a 0.5 para optimizar
      if (particles[i].size < 0.5) {
        particles.splice(i, 1);
        i--; // Ajustar índice tras eliminar
      }
    }
  }

  // ----- ESTRELLAS 3D -----
  const stars = []; // Array para almacenar estrellas 3D
  const numStars = 600; // Número total de estrellas a generar

  // Clase para crear estrellas con efecto 3D
  class Star {
    constructor() {
      this.reset(); // Inicializa posición y propiedades aleatorias
    }

    // Asigna posición y propiedades aleatorias a la estrella
    reset() {
      this.x = Math.random() * canvas.width - canvas.width / 2; // X centrado en el medio del canvas
      this.y = Math.random() * canvas.height - canvas.height / 2; // Y centrado en el medio del canvas
      this.z = Math.random() * canvas.width; // Profundidad aleatoria
      this.prevZ = this.z; // Guarda profundidad previa para cálculo (aunque no se usa en este código)
      this.color = this.getColor(); // Color aleatorio realista
      this.baseSize = Math.random() * 2 + 1; // Tamaño base entre 1 y 3
      this.phase = Math.random() * Math.PI * 2; // Fase inicial para parpadeo
      this.speed = 2 + Math.random() * 2; // Velocidad de acercamiento variable entre 2 y 4
    }

    // Escoge un color para la estrella
    getColor() {
      const realisticColors = ["#ffffff", "#ffe9c4", "#d4fbff", "#fff4e5"];
      return realisticColors[Math.floor(Math.random() * realisticColors.length)];
    }

    // Actualiza posición y fase para parpadeo
    update() {
      this.z -= this.speed; // Mover la estrella hacia adelante (acercándose)
      if (this.z <= 0.1) this.reset(); // Reiniciar si llega muy cerca (efecto infinito)
      this.phase += 0.1; // Incrementar fase para efecto de parpadeo
    }

    // Dibuja la estrella proyectada en 2D con tamaño y parpadeo
    draw() {
      const f = 300 / this.z; // Factor de escala basado en la profundidad z
      const x = this.x * f + canvas.width / 2; // Coordenada x proyectada en el canvas
      const y = this.y * f + canvas.height / 2; // Coordenada y proyectada en el canvas

      // Tamaño de estrella con parpadeo sinusoidal
      const starSize = this.baseSize * f * (1 + 0.5 * Math.sin(this.phase));

      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(x, y, starSize, 0, Math.PI * 2); // Dibuja un círculo
      ctx.fill();
    }
  }

  // Crear todas las estrellas y agregarlas al array
  for (let i = 0; i < numStars; i++) {
    stars.push(new Star());
  }

  // Función para actualizar y dibujar todas las estrellas
  function handleStars() {
    stars.forEach(star => {
      star.update();
      star.draw();
    });
  }

  // ----- ANIMACIÓN -----
  function animate() {
    // Dibuja un fondo negro con transparencia para crear efecto de rastro difuminado
    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    handleStars(); // Actualiza y dibuja estrellas
    handleParticles(); // Actualiza y dibuja partículas

    requestAnimationFrame(animate); // Solicita siguiente cuadro para animación continua
  }

  animate(); // Inicia la animación al cargar la página
});
