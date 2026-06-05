// ==================== MC BARBERSHOP - JAVASCRIPT ====================
// Autor: MC BarberShop
// Descripción: Sistema completo de gestión del sitio web
// ====================================================================

console.log('🚀 MC BarberShop - Iniciando aplicación...');

// ==================== VARIABLES GLOBALES ====================
let currentCourse = 'basico';

// ==================== DATOS DE CURSOS ====================
const cursosData = {
  basico: {
    titulo: "Curso Básico",
    descripcion: "Aprende desde cero: manejo de máquinas, degradado clásico y cortes base.",
    precio: "Q1,650",
    badge: "Más Popular",
    whatsapp: "https://wa.me/50245931731?text=Hola,%20vi%20el%20curso%20Básico%20en%20la%20página%20web,%20¡necesito%20más%20información!",
    features: [
      "12 semanas de duración",
      "Prácticas reales",
      "Certificado incluido",
      "Modalidad en línea o presencial"
    ]
  },
  avanzado: {
    titulo: "Curso Avanzado", 
    descripcion: "Mejora tu técnica con fades modernos, figuras y líneas perfectas, mediante tecnificación en clases privadas.",
    precio: "Q1,450",
    badge: "Profesional",
    whatsapp: "https://wa.me/50245931731?text=Hola,%20vi%20el%20curso%20Avanzado%20en%20la%20página%20web,%20¡necesito%20más%20información!",
    features: [
      "10 semanas de duración",
      "4 clases personalizadas",
      "Certificado incluido",
      "Modalidad en línea o presencial"
    ]
  },
  profesional: {
    titulo: "Curso Profesional",
    descripcion: "Todo lo necesario para emprender como barbero profesional.",
    precio: "Q1,550", 
    badge: "Completo",
    whatsapp: "https://wa.me/50245931731?text=Hola,%20vi%20el%20curso%20Profesional%20en%20la%20página%20web,%20¡necesito%20más%20información!",
    features: [
      "12 semanas de duración",
      "5 clases personalizadas",
      "Kit de herramientas incluido",
      "1 clase de colorimetría básica",
      "Modalidad en línea o presencial"
    ]
  },
  colorimetria: {
    titulo: "Curso de Colorimetría",
    descripcion: "Con clases personalizadas en fade, domina el arte del color: fantasy, platinado, pigmentación y uso profesional de productos.",
    precio: "Q2,550",
    badge: "Creativo", 
    whatsapp: "https://wa.me/50245931731?text=Hola,%20vi%20el%20curso%20de%20Colorimetría%20en%20la%20página%20web,%20¡necesito%20más%20información!",
    features: [
      "6 semanas de duración",
      "Kit de herramientas incluido",
      "2 clases personalizadas",
      "2 clases de corte creativo",
      "Modalidad presencial"
    ]
  }
};

// ==================== DATOS DE PRODUCTOS ====================
const productosData = {
  catrin: [
    { nombre: "Catrin Pomada", precio: "Q180", imagen: "productos/catrin1.jpeg", destacado: false },
    { nombre: "Catrin Gel de Crecimiento", precio: "Q195", imagen: "productos/catrin2.jpeg", destacado: true }  
  ],
  agiva: [
    { nombre: "Agiva Orange", precio: "Q60", imagen: "productos/agiva3.jpeg", destacado: false },
    { nombre: "Agiva Yellow", precio: "Q60", imagen: "productos/agiva1.jpeg", destacado: false },
    { nombre: "Agiva Navy Blue", precio: "Q60", imagen: "productos/agiva2.jpeg", destacado: false },
    { nombre: "Agiva Spider Effect", precio: "Q60", imagen: "productos/agiva5.jpeg", destacado: true },
    { nombre: "Agiva Red", precio: "Q60", imagen: "productos/agiva4.jpeg", destacado: false }
  ],
  redone: [
    { nombre: "Red One Blue", precio: "Q140", imagen: "productos/redeone1.jpeg", destacado: false },
    { nombre: "Red One Black", precio: "Q140", imagen: "productos/redone2.jpeg", destacado: false },
    { nombre: "Red One Green", precio: "Q140", imagen: "productos/redone3.jpeg", destacado: true },
    { nombre: "Red One Red", precio: "Q140", imagen: "productos/redone4.jpeg", destacado: true },
    { nombre: "Red One Bright White", precio: "Q140", imagen: "productos/redone5.jpeg", destacado: false },
    { nombre: "Red One Creative Fiber Wax", precio: "Q140", imagen: "productos/redone6.jpeg", destacado: false }
  ]
};

// ======= App State (persistible) =======
window.appState = {
  products: [], // array of { nombre, precio, imagen, destacado, marca, available }
  courses: []   // array of { id, titulo, descripcion, precio, badge, whatsapp }
};

function saveAppState() {
  try {
    localStorage.setItem('mc_app_state_v9', JSON.stringify(window.appState));
  } catch (e) {
    console.warn('No se pudo guardar appState:', e);
  }
}

function loadAppState() {
  const raw = localStorage.getItem('mc_app_state_v9');
  if (raw) {
    try {
      window.appState = JSON.parse(raw);
      return;
    } catch (e) {
      console.warn('Error parseando app state, se re-creará desde defaults');
    }
  }

  // Si no existe en localStorage, construir desde los datos estáticos
  const products = [];
  Object.keys(productosData).forEach(marca => {
    productosData[marca].forEach(p => {
      products.push({
        nombre: p.nombre,
        precio: p.precio,
        imagen: p.imagen,
        destacado: !!p.destacado,
        marca: marca,
        available: p.available !== undefined ? p.available : true
      });
    });
  });

  const courses = Object.keys(cursosData).map(key => ({ id: key, ...cursosData[key] }));

  window.appState.products = products;
  window.appState.courses = courses;
  saveAppState();
}

// Cargar estado al inicio
loadAppState();

// ==================== HEADER Y NAVEGACIÓN ====================
function initHeader() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  // Efecto scroll del header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menú hamburguesa móvil
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
  }

  // Navegación suave a secciones
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (link) {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Cerrar menú móvil si está abierto
        if (navMenu) {
          navMenu.classList.remove('active');
          hamburger.classList.remove('active'); 
          document.body.style.overflow = '';
        }
        
        // Scroll suave con offset del header
        const headerHeight = 80;
        const targetTop = targetElement.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        
        // Si el enlace es a la sección 'conocenos', reiniciar la animación de stats
        if (targetId === '#conocenos') {
          // esperar un poco para que el scroll termine y la sección esté visible
          setTimeout(() => {
            if (typeof window.restartStatsAnimation === 'function') {
              window.restartStatsAnimation();
            }
          }, 600);
        }

        console.log('✅ Navegando a:', targetId);
      }
    }
  });

  console.log('✅ Header inicializado');
}

// ==================== BOTONES DEL HERO ====================
function initHeroButtons() {
  const contactBtn = document.getElementById('contactBtn');
  const galleryBtn = document.getElementById('galleryBtn');

  // Botón de contacto por WhatsApp
  if (contactBtn) {
    contactBtn.onclick = () => {
      window.open('https://wa.me/50245931731?text=Hola,%20vi%20tu%20página%20web%20y%20necesito%20más%20información%20sobre%20tus%20servicios!', '_blank');
      console.log('✅ Botón contacto clickeado');
    };
  }

  // Botón para ir a la galería
  if (galleryBtn) {
    galleryBtn.onclick = () => {
      const gallerySection = document.getElementById('galeria');
      if (gallerySection) {
        const headerHeight = 80;
        const targetTop = gallerySection.offsetTop - headerHeight;
        
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
        
        console.log('✅ Navegando a galería');
      }
    };
  }

  console.log('✅ Botones hero configurados');
}

// ==================== SLIDER DE GALERÍA ====================
function initSlider() {
  const sliderContainer = document.getElementById('slider-container');
  if (!sliderContainer) return;

  console.log('Inicializando slider...');
  
  // Limpiar cualquier animación CSS previa
  sliderContainer.style.animation = 'none';
  
  // Obtener todas las imágenes originales
  const originalSlides = Array.from(sliderContainer.querySelectorAll('.slide'));
  console.log('📸 Imágenes encontradas:', originalSlides.length);
  
  // Duplicar imágenes para efecto infinito
  originalSlides.forEach(slide => {
    const clone = slide.cloneNode(true);
    sliderContainer.appendChild(clone);
  });
  
  // Configuración del slider
  const slideWidth = 345; // 320px imagen + 25px gap
  const totalWidth = slideWidth * originalSlides.length;
  
  let position = 0;
  let isPaused = false;

  // Función de animación
  function animate() {
    if (!isPaused) {
      position -= 0.3; // Velocidad del slider
      
      // Reiniciar cuando llega al final
      if (Math.abs(position) >= totalWidth) {
        position = 0;
      }
      
      sliderContainer.style.transform = `translateX(${position}px)`;
    }
    requestAnimationFrame(animate);
  }
  
  animate();

  // Pausar al pasar el mouse
  sliderContainer.addEventListener('mouseenter', () => isPaused = true);
  sliderContainer.addEventListener('mouseleave', () => isPaused = false);
  
  console.log('✅ Slider configurado con', originalSlides.length, 'imágenes');
}

// ==================== SISTEMA DE CURSOS ====================
function initCourses() {
  const courseTabs = document.querySelectorAll('.course-tab');
  const courseInfo = document.getElementById('info-curso');
  
  if (!courseInfo) return;
  
  console.log('Inicializando cursos...');

  // Evento click en cada pestaña de curso
  courseTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const courseType = tab.dataset.course;
      
      // Si ya está activo, no hacer nada
      if (courseType === currentCourse) return;
      
      // Actualizar pestañas activas
      courseTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Animación de transición suave
      courseInfo.style.transition = 'all 0.4s ease';
      courseInfo.style.opacity = '0.7';
      courseInfo.style.transform = 'translateY(10px)';
      
      // Actualizar contenido después de la animación
      setTimeout(() => {
        updateCourseContent(courseType);
        courseInfo.style.opacity = '1';
        courseInfo.style.transform = 'translateY(0)';
      }, 200);
      
      currentCourse = courseType;
      console.log('📚 Curso cambiado a:', courseType);
    });
  });

  // Función para actualizar el contenido del curso
  function updateCourseContent(courseType) {
    const curso = cursosData[courseType];
    if (!curso) return;

    // Actualizar todos los elementos del curso
    const titulo = courseInfo.querySelector('.curso-titulo');
    const badge = courseInfo.querySelector('.curso-badge');
    const descripcion = courseInfo.querySelector('.curso-descripcion');
    const precio = courseInfo.querySelector('.price-value');
    const whatsappBtn = courseInfo.querySelector('#boton-wsp');
    const featuresDiv = courseInfo.querySelector('#curso-features');

    if (titulo) titulo.textContent = curso.titulo;
    if (badge) badge.innerHTML = `<i class="ri-star-fill"></i> ${curso.badge}`;
    if (descripcion) descripcion.textContent = curso.descripcion;
    if (precio) precio.textContent = curso.precio;
    if (whatsappBtn) whatsappBtn.href = curso.whatsapp;
    if (featuresDiv && curso.features) {
      featuresDiv.innerHTML = curso.features.map((feature, index) => `
        <div class="feature-item"${index === curso.features.length - 1 ? ' style="justify-content: center;"' : ''}>
          <i class="ri-check-double-line"></i>
          <span>${feature}</span>
        </div>
      `).join('');
    }
  }
  
  // Inicializar con el curso básico
  updateCourseContent('basico');
  
  console.log('✅ Cursos configurados');
}

// ==================== SISTEMA DE PRODUCTOS ====================
function initProducts() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productsGrid = document.getElementById('productos-grid');
  
  if (!productsGrid) return;
  
  console.log('Inicializando productos...');

  // Generar todos los productos
  generateProducts();
  
  // Mostrar productos destacados al inicio
  setTimeout(() => {
    filterProducts('all');
  }, 100);
  
  // Configurar botones de filtro
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const filter = btn.dataset.filter;
      
      // Actualizar botones activos
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Filtrar productos
      filterProducts(filter);
      console.log('🔍 Filtro aplicado:', filter);
    });
  });

  // Función para generar HTML de productos
  function generateProducts() {
    // Usar appState.products para renderizar el grid
    const rawProducts = window.appState.products || [];

    // Ordenar productos: Destacados primero (prioridad visual)
    const allProducts = [...rawProducts].sort((a, b) => {
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      return 0;
    });

    const productsHTML = allProducts.map(producto => `
      <div class="producto-card ${producto.marca || ''} ${producto.destacado ? 'destacado' : ''}">
        ${producto.destacado ? '<div class="product-badge">Destacado</div>' : ''}
        <img src="${producto.imagen}" alt="${producto.nombre}" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display:none; width:180px; height:180px; background:#333; border-radius:12px; 
                    align-items:center; justify-content:center; color:#999; margin-bottom:20px;">
          <i class="ri-image-line" style="font-size:3rem;"></i>
        </div>
        <h3>${producto.nombre}</h3>
        <span class="price">${producto.precio}</span>
        <a href="https://wa.me/50245931731?text=Hola,%20vi%20el%20producto%20${encodeURIComponent(producto.nombre)}%20en%20la%20página%20web,%20¡necesito%20más%20información!" 
           target="_blank" class="buy-btn">
          <i class="ri-whatsapp-line"></i>
          <span>Comprar</span>
        </a>
      </div>
    `).join('');

    productsGrid.innerHTML = productsHTML;
    console.log('📦 Productos generados desde appState:', allProducts.length);
  }

  // Función para filtrar productos con animación
  function filterProducts(filter) {
    const products = productsGrid.querySelectorAll('.producto-card');
    
    products.forEach((product, index) => {
      const shouldShow = filter === 'all' 
        ? product.classList.contains('destacado')
        : product.classList.contains(filter);
      
      if (shouldShow) {
        product.style.display = 'block';
        product.style.opacity = '0';
        setTimeout(() => {
          product.style.transition = 'opacity 0.3s ease';
          product.style.opacity = '1';
        }, index * 50); // Delay escalonado
      } else {
        product.style.transition = 'opacity 0.2s ease';
        product.style.opacity = '0';
        setTimeout(() => {
          product.style.display = 'none';
        }, 200);
      }
    });
  }
  
  console.log('✅ Productos configurados');
}

// ==================== ANIMACIÓN DE ESTADÍSTICAS ====================
function initStats() {
  let statsAnimated = false;
  
  // Función para animar números
  function animateNumber(element, target) {
    const format = element.dataset.format || '';

    if (target === 18200) {
      // Animación rápida original para seguidores
      let current = 17900;
      const frames = 1200;
      const increment = (target - 17900) / frames;

      function formatValue(val) {
        const n = Math.floor(val);
        if (format === 'percent') return n + '%';
        if (format === 'plus') return '+' + n;
        return n;
      }

      // Establecer el valor inicial
      element.textContent = formatValue(current);

      function updateNumber() {
        current += increment;
        if (current >= target) {
          if (format === 'percent') element.textContent = target + '%';
          else if (format === 'plus') element.textContent = '+' + target;
          else element.textContent = target;
        } else {
          element.textContent = formatValue(current);
          requestAnimationFrame(updateNumber);
        }
      }

      updateNumber();
    } else {
      // Animación rápida original para los otros stats
      let current = 0;
      const frames = 120;
      const increment = target / frames;

      function formatValue(val) {
        const n = Math.floor(val);
        if (format === 'percent') return n + '%';
        if (format === 'plus') return '+' + n;
        return n;
      }

      function updateNumber() {
        current += increment;
        if (current >= target) {
          if (format === 'percent') element.textContent = target + '%';
          else if (format === 'plus') element.textContent = '+' + target;
          else element.textContent = target;
        } else {
          element.textContent = formatValue(current);
          requestAnimationFrame(updateNumber);
        }
      }

      updateNumber();
    }
  }

  // Observer para detectar cuando las stats son visibles
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsAnimated) {
        statsAnimated = true;
        
        // Animar todos los números
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const target = parseInt(stat.dataset.target);
          animateNumber(stat, target);
        });
        
        console.log('📊 Estadísticas animadas');
      }
    });
  }, { threshold: 0.5 });

  const statsContainer = document.querySelector('.stats-container');
  
  if (statsContainer) {
    observer.observe(statsContainer);
    console.log('✅ Stats configuradas');
  }

  // Exponer una función para reiniciar la animación desde fuera (por ejemplo al
  // hacer click en el enlace "Conócenos"). Reinicia los textos a 0 y lanza
  // nuevamente la animación para cada contador.
  window.restartStatsAnimation = function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const format = stat.dataset.format || '';
      if (format === 'percent') stat.textContent = '0%';
      else if (format === 'plus') stat.textContent = '+0';
      else stat.textContent = '0';
    });

    // Ejecutar animación en cada contador
    statNumbers.forEach(stat => {
      const target = parseInt(stat.dataset.target) || 0;
      animateNumber(stat, target);
    });

    // Marcar como animadas para evitar que el observer duplique la ejecución
    statsAnimated = true;
    console.log('🔁 Estadísticas reiniciadas manualmente');
  };
}

// ==================== CONTROLES DE VIDEO ====================
function initVideo() {
  const videoWrapper = document.querySelector('.video-wrapper');
  if (!videoWrapper) return;
  
  const video = videoWrapper.querySelector('video');
  const playBtn = videoWrapper.querySelector('.play-btn');
  
  if (video && playBtn) {
    // Control de play/pause
    playBtn.addEventListener('click', () => {
      if (video.paused) {
        video.play();
        playBtn.style.opacity = '0';
      } else {
        video.pause();
        playBtn.style.opacity = '1';
      }
    });

    // Eventos del video
    video.addEventListener('play', () => playBtn.style.opacity = '0');
    video.addEventListener('pause', () => playBtn.style.opacity = '1');
    video.addEventListener('ended', () => playBtn.style.opacity = '1');
    
    console.log('✅ Video configurado');
  }
}

// ==================== INICIALIZACIÓN PRINCIPAL ====================
function initApp() {
  console.log('🔧 Inicializando todas las funcionalidades...');
  
  // Inicializar todos los módulos
  initHeader();
  initHeroButtons();
  initSlider(); 
  initCourses();
  initProducts();
  initStats();
  initVideo();
  
  console.log('✅ ¡Aplicación inicializada correctamente!');
}

/* ==================== ADMIN PANEL FUNCIONES ==================== */
let adminLogged = false;
let editingProductIndex = null;
let editingCourseIndex = null;

function openAdminModal() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  // show login
  document.getElementById('adminLogin').style.display = 'block';
  document.getElementById('adminDashboard').style.display = 'none';
  document.getElementById('adminUserInput').value = '';
  document.getElementById('adminPassInput').value = '';
}

function closeAdminModal() {
  const modal = document.getElementById('adminModal');
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
}

function handleAdminLogin() {
  const user = document.getElementById('adminUserInput').value.trim();
  const pass = document.getElementById('adminPassInput').value.trim();
  // Credenciales por defecto (puedes cambiarlas)
  if (user === 'admin' && pass === 'admin123') {
    adminLogged = true;
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('admin-user').textContent = user;
    document.getElementById('admin-user').style.display = 'inline';
    renderAdminDashboard();
  } else {
    alert('Credenciales incorrectas');
  }
}

function handleAdminLogout() {
  adminLogged = false;
  document.getElementById('admin-user').style.display = 'none';
  closeAdminModal();
}

function renderAdminDashboard() {
  // Products list
  const productsList = document.getElementById('productsList');
  productsList.innerHTML = '';
  window.appState.products.forEach((p, idx) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.innerHTML = `<div style="flex:1">${p.nombre} — ${p.precio} ${p.available ? '' : '(no disponible)'}</div>
      <div>
        <button data-idx="${idx}" class="edit-prod">Editar</button>
        <button data-idx="${idx}" class="del-prod">Borrar</button>
      </div>`;
    productsList.appendChild(div);
  });

  // Courses list
  const coursesList = document.getElementById('coursesList');
  coursesList.innerHTML = '';
  window.appState.courses.forEach((c, idx) => {
    const div = document.createElement('div');
    div.className = 'admin-item';
    div.innerHTML = `<div style="flex:1">${c.titulo} — ${c.precio}</div>
      <div>
        <button data-idx="${idx}" class="edit-course">Editar</button>
        <button data-idx="${idx}" class="del-course">Borrar</button>
      </div>`;
    coursesList.appendChild(div);
  });

  // Wire product buttons
  productsList.querySelectorAll('.edit-prod').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.idx);
      editingProductIndex = idx;
      const p = window.appState.products[idx];
      document.getElementById('prodName').value = p.nombre;
      document.getElementById('prodPrice').value = p.precio;
      document.getElementById('prodImage').value = p.imagen;
      document.getElementById('prodAvailable').checked = !!p.available;
    });
  });
  productsList.querySelectorAll('.del-prod').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      if (confirm('Borrar producto?')) {
        window.appState.products.splice(idx,1);
        saveAppState();
        renderAdminDashboard();
        renderProductsGrid();
      }
    });
  });

  // Wire courses buttons
  coursesList.querySelectorAll('.edit-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      editingCourseIndex = idx;
      const c = window.appState.courses[idx];
      document.getElementById('courseName').value = c.titulo;
      document.getElementById('coursePrice').value = c.precio;
      document.getElementById('courseBadge').value = c.badge;
      document.getElementById('courseDesc').value = c.descripcion;
    });
  });
  coursesList.querySelectorAll('.del-course').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      if (confirm('Borrar curso?')) {
        window.appState.courses.splice(idx,1);
        saveAppState();
        renderAdminDashboard();
      }
    });
  });

  // Save product handler
  document.getElementById('saveProduct').onclick = () => {
    const name = document.getElementById('prodName').value.trim();
    const price = document.getElementById('prodPrice').value.trim();
    const image = document.getElementById('prodImage').value.trim();
    const available = document.getElementById('prodAvailable').checked;
    if (!name) return alert('Nombre requerido');
    const obj = { nombre: name, precio: price || '---', imagen: image || '', destacado:false, marca:'admin', available };
    if (editingProductIndex !== null) {
      window.appState.products[editingProductIndex] = obj;
      editingProductIndex = null;
    } else {
      window.appState.products.push(obj);
    }
    saveAppState();
    renderAdminDashboard();
    renderProductsGrid();
  };

  // Save course handler
  document.getElementById('saveCourse').onclick = () => {
    const title = document.getElementById('courseName').value.trim();
    const price = document.getElementById('coursePrice').value.trim();
    const badge = document.getElementById('courseBadge').value.trim();
    const desc = document.getElementById('courseDesc').value.trim();
    if (!title) return alert('Título requerido');
    const obj = { titulo: title, precio: price || '---', badge: badge || '', descripcion: desc || '' };
    if (editingCourseIndex !== null) {
      window.appState.courses[editingCourseIndex] = { id: window.appState.courses[editingCourseIndex].id || ('c'+Date.now()), ...obj };
      editingCourseIndex = null;
    } else {
      window.appState.courses.push({ id: 'c'+Date.now(), ...obj });
    }
    saveAppState();
    renderAdminDashboard();
  };
}

// Render products grid (call after admin changes)
function renderProductsGrid() {
  const productsGrid = document.getElementById('productos-grid');
  if (!productsGrid) return;
  const allProducts = window.appState.products || [];
  const productsHTML = allProducts.map(producto => `
      <div class="producto-card ${producto.marca || ''} ${producto.destacado ? 'destacado' : ''}">
        ${producto.destacado ? '<div class="product-badge">Destacado</div>' : ''}
        <img src="${producto.imagen}" alt="${producto.nombre}" 
             onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
        <div style="display:none; width:180px; height:180px; background:#333; border-radius:12px; 
                    align-items:center; justify-content:center; color:#999; margin-bottom:20px;">
          <i class="ri-image-line" style="font-size:3rem;"></i>
        </div>
        <h3>${producto.nombre}</h3>
        <span class="price">${producto.precio}</span>
        <a href="https://wa.me/50245931731?text=Hola,%20vi%20el%20producto%20${encodeURIComponent(producto.nombre)}%20en%20la%20página%20web,%20¡necesito%20más%20información!" 
           target="_blank" class="buy-btn">
          <i class="ri-whatsapp-line"></i>
          <span>Comprar</span>
        </a>
      </div>
    `).join('');
  productsGrid.innerHTML = productsHTML;
}

// ==================== EVENTOS DE CARGA ====================

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// ==================== EFECTO DE CAMBIO DE FONDO ====================
// Cambiar imagen de fondo con desvanecimiento
const heroBg = document.querySelector('.hero-bg');
const images = ['img/fondo1.jpg', 'img/curso10.jpg', 'img/curso11.jpeg'];
let currentImageIndex = 0;

// Cambiar imagen cada 8 segundos usando transición de opacidad CSS
// para un fade-out / cambio / fade-in más fiable.
function changeHeroImage() {
  if (!heroBg) return;
  // Iniciar fade out
  heroBg.style.opacity = '0';

  // Después de la transición (1s), cambiar imagen y fade in
  setTimeout(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    heroBg.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    heroBg.style.opacity = '1';
  }, 1000); // debe coincidir con transition en CSS
}

// Asegurar imagen inicial y arrancar ciclo
if (heroBg) {
  heroBg.style.backgroundImage = `url('${images[currentImageIndex]}')`;
  // Iniciar el ciclo a los 8s
  setInterval(changeHeroImage, 8000);
}

// Efectos al cargar completamente la página
window.addEventListener('load', () => {
  // Fade in de la página
  document.body.style.transition = 'opacity 0.5s ease';
  document.body.style.opacity = '1';
  
  // Scroll to top
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 50);
  
  console.log('🎉 Página cargada completamente');
});

// ======= Inicializar listeners del panel admin (botones) =======
document.addEventListener('DOMContentLoaded', () => {
  const adminBtn = document.getElementById('adminBtn');
  const adminClose = document.getElementById('adminClose');
  const adminLoginBtn = document.getElementById('adminLoginBtn');
  const adminLogout = document.getElementById('adminLogout');
  const tabProducts = document.getElementById('tabProducts');
  const tabCourses = document.getElementById('tabCourses');

  if (adminBtn) adminBtn.addEventListener('click', openAdminModal);
  if (adminClose) adminClose.addEventListener('click', closeAdminModal);
  if (adminLoginBtn) adminLoginBtn.addEventListener('click', handleAdminLogin);
  if (adminLogout) adminLogout.addEventListener('click', handleAdminLogout);

  if (tabProducts) tabProducts.addEventListener('click', () => {
    document.getElementById('adminProducts').style.display = 'block';
    document.getElementById('adminCourses').style.display = 'none';
    tabProducts.classList.add('active');
    tabCourses.classList.remove('active');
  });
  if (tabCourses) tabCourses.addEventListener('click', () => {
    document.getElementById('adminProducts').style.display = 'none';
    document.getElementById('adminCourses').style.display = 'block';
    tabCourses.classList.add('active');
    tabProducts.classList.remove('active');
  });
});