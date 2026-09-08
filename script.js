document.addEventListener('DOMContentLoaded', () => {

  /* ---- Ano no rodapé ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Menu mobile ---- */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Destaque do link ativo ao rolar a página ---- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[data-nav]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  /* ---- Entrada única da etiqueta no hero ---- */
  const heroTag = document.getElementById('heroTag');
  if (heroTag) {
    requestAnimationFrame(() => {
      setTimeout(() => heroTag.classList.add('in'), 150);
    });
  }

  /* ---- Botões de copiar (WhatsApp / e-mail) ---- */
  document.querySelectorAll('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy');
      const originalLabel = button.textContent;

      try {
        await navigator.clipboard.writeText(value);
        button.textContent = 'Copiado!';
      } catch (err) {
        button.textContent = 'Não copiou';
      }

      setTimeout(() => { button.textContent = originalLabel; }, 1800);
    });
  });

});
