document.addEventListener('DOMContentLoaded', () => {
  // Año automático en el footer
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Galería (GLightbox)
  if (window.GLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }

  // ScrollSpy: init + refresh (coincide con section{ scroll-margin-top: 90px; })
  const body = document.body;
  if (body.getAttribute('data-bs-offset') !== '90') {
    body.setAttribute('data-bs-offset', '90');
  }
  let ss = (window.bootstrap && bootstrap.ScrollSpy)
    ? bootstrap.ScrollSpy.getInstance(body)
    : null;
  if (window.bootstrap && bootstrap.ScrollSpy && !ss) {
    ss = new bootstrap.ScrollSpy(body, { target: '#mainNav', offset: 90 });
  }
  const refreshScrollSpy = () => { try { ss && ss.refresh(); } catch (e) {} };
  window.addEventListener('load', refreshScrollSpy);
  window.addEventListener('resize', refreshScrollSpy);
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    setTimeout(() => { refreshScrollSpy(); ticking = false; }, 250);
  });

  // Skip-link: enfocar <main> al usarlo
  const skip = document.querySelector('.skip-link');
  if (skip) {
    skip.addEventListener('click', () => {
      document.getElementById('main-content')?.focus();
    });
  }

  // Cerrar menú móvil al hacer clic en un enlace
  document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
      const navbar = document.getElementById('navbarNav');
      const bsCollapse = window.bootstrap ? bootstrap.Collapse.getInstance(navbar) : null;
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // Suavizar el scroll para anclas internas
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Si quieres actualizar la URL: history.pushState(null, '', id);
        }
      }
    });
  });
});

// Navbar: sombra y altura al hacer scroll
document.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 10) nav.classList.add('navbar-scrolled');
  else nav.classList.remove('navbar-scrolled');
});
