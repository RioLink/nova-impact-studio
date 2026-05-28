document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const menu = document.querySelector('.menu');

  burger?.addEventListener('click', () => {
    menu?.classList.toggle('open');
    burger.setAttribute('aria-expanded', menu?.classList.contains('open') ? 'true' : 'false');
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: .14 });

  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  document.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.tab;
      document.querySelectorAll('[data-tab]').forEach((item) => item.classList.toggle('active', item === btn));
      document.querySelectorAll('[data-panel]').forEach((panel) => panel.classList.toggle('active', panel.dataset.panel === key));
    });
  });

  document.querySelectorAll('.faq-item button').forEach((btn) => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item?.classList.toggle('open');
    });
  });

  document.querySelectorAll('.magnetic').forEach((el) => {
    el.addEventListener('mousemove', (event) => {
      const rect = el.getBoundingClientRect();
      const x = (event.clientX - rect.left - rect.width / 2) * .08;
      const y = (event.clientY - rect.top - rect.height / 2) * .08;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  document.querySelectorAll('.contact-form .btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = 'Запит підготовлено';
      setTimeout(() => {
        btn.textContent = original || 'Надіслати запит';
      }, 1800);
    });
  });

  const passInput = document.querySelector('#user_pass');
  document.querySelector('.wp-eye')?.addEventListener('click', () => {
    if (!(passInput instanceof HTMLInputElement)) return;
    passInput.type = passInput.type === 'password' ? 'text' : 'password';
  });

  const loginForm = document.querySelector('[data-wp-login-form]');
  const loginError = document.querySelector('#login_error');
  const userLogin = document.querySelector('#user_login');

  loginForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    loginError?.removeAttribute('hidden');
    loginForm.classList.remove('has-error');
    window.setTimeout(() => loginForm.classList.add('has-error'), 0);
    if (userLogin instanceof HTMLInputElement) userLogin.focus();
  });

  const lostModal = document.querySelector('#lostpassword-modal');
  const lostLink = document.querySelector('[data-lost-password]');
  const lostInput = document.querySelector('#lost_user_login');
  const lostMessage = document.querySelector('.wp-modal-message');

  const closeLostModal = () => {
    lostModal?.setAttribute('hidden', '');
    lostModal?.setAttribute('aria-hidden', 'true');
  };

  lostLink?.addEventListener('click', (event) => {
    event.preventDefault();
    lostModal?.removeAttribute('hidden');
    lostModal?.setAttribute('aria-hidden', 'false');
    lostMessage?.setAttribute('hidden', '');
    if (lostInput instanceof HTMLInputElement) lostInput.focus();
  });

  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', closeLostModal);
  });

  document.querySelector('[data-reset-submit]')?.addEventListener('click', () => {
    lostMessage?.removeAttribute('hidden');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lostModal && !lostModal.hasAttribute('hidden')) {
      closeLostModal();
    }
  });
});
