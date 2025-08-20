// Año automático en el footer
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});

// Galería (GLightbox)
document.addEventListener('DOMContentLoaded', () => {
  if (window.GLightbox) {
    GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      zoomable: true
    });
  }
});

// 1) Navbar: aplicar estilo al hacer scroll
document.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (!nav) return;
  if (window.scrollY > 10) nav.classList.add('navbar-scrolled');
  else nav.classList.remove('navbar-scrolled');
});

// 2) Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll('#navbarNav .nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.getElementById('navbarNav');
    const bsCollapse = bootstrap.Collapse.getInstance(navbar);
    if (bsCollapse) bsCollapse.hide();
  });
});

// 3) (Opcional) Suavizar el scroll para anclas internas
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});
