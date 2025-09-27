// === Año automático en el footer ===
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// === Inicialización general al cargar el DOM ===
document.addEventListener('DOMContentLoaded', () => {
  // --- Galería (GLightbox) ---
  if (window.GLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }

  // --- ScrollSpy: init + refresh ---
  const body = document.body;

  // Asegura que el offset del data-API sea 90 (coincide con CSS: scroll-margin-top: 90px)
  if (body.getAttribute('data-bs-offset') !== '90') {
    body.setAttribute('data-bs-offset', '90');
  }

  // Usa la instancia creada por data-attributes o créala si no existe
  let ss = (window.bootstrap && bootstrap.ScrollSpy)
    ? bootstrap.ScrollSpy.getInstance(body)
    : null;

  if (window.bootstrap && bootstrap.ScrollSpy && !ss) {
    ss = new bootstrap.ScrollSpy(body, { target: '#mainNav', offset: 90 });
  }

  const refreshScrollSpy = () => { try { ss && ss.refresh(); } catch (e) {} };

  // Recalcula al terminar de cargar (imágenes/fuentes) y al redimensionar
  window.addEventListener('load', refreshScrollSpy);
  window.addEventListener('resize', refreshScrollSpy);

  // Si la navbar cambia altura al hacer scroll, refresca de forma contenida
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    setTimeout(() => { refreshScrollSpy(); ticking = false; }, 250);
  });

  // --- Skip-link: enfocar <main> al usarlo ---
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', () => {
      document.getElementById('main-content')?.focus();
    });
  }

  // --- Cerrar menú móvil al hacer clic en un enlace ---
  document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbar = document.getElementById('navbarNav');
      const bsCollapse = window.bootstrap ? bootstrap.Collapse.getInstance(navbar) : null;
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // --- (Opcional) Suavizar el scroll para anclas internas ---
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Si quieres actualizar la URL sin saltos visibles:
          // history.pushState(null, '', id);
        }
      }
    });
  });
});

// === Navbar: aplicar estilo al hacer scroll (sombra/altura) ===
document.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 10) nav.classList.add('navbar-scrolled');
  else nav.classList.remove('navbar-scrolled');
});