(() => {
  const body = document.body;
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const setNav = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    body.classList.toggle('nav-open', open);
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => setNav(toggle.getAttribute('aria-expanded') !== 'true'));
    nav.addEventListener('click', (e) => { if (e.target.closest('a')) setNav(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) { setNav(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', (mq) => { if (mq.matches) setNav(false); });
  }

  const header = document.querySelector('[data-header]');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const items = document.querySelectorAll('.reveal');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    items.forEach((el) => io.observe(el));
  }

  // Static preview build: the enquiry form isn't active yet, so explain instead of submitting.
  const demoForm = document.querySelector('[data-demo-form]');
  const demoNote = document.querySelector('[data-demo-note]');
  if (demoForm && demoNote) {
    demoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      demoNote.hidden = false;
      demoNote.focus();
    });
  }

  const firstError = document.querySelector('.field.has-error input, .field.has-error select, .field.has-error textarea');
  const focusTarget = firstError || document.querySelector('[data-focus]');
  if (focusTarget) focusTarget.focus();
})();
