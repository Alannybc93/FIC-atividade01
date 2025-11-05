const menuBtn = document.getElementById('menuBtn');
const nav = document.querySelector('.nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
  });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      nav.classList.remove('active');
      menuBtn.textContent = '☰';
    }
  });
});

// Atualizar ano automaticamente nos footers
const currentYear = new Date().getFullYear();
document.querySelectorAll('[id*="ano"]').forEach(element => {
  element.textContent = currentYear;
});

// Formulário de contato com validação melhorada
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validação mais robusta
    if (!name || !email || !message) {
      showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Por favor, insira um e-mail válido.', 'error');
      return;
    }
    
    // Simulação de envio
    showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
    contactForm.reset();
  });
}

// Validação de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sistema de notificação
function showNotification(message, type = 'info') {
  // Remove notificação anterior se existir
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  // Cria nova notificação
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">✕</button>
  `;
  
  // Estilos da notificação
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#3742fa'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: slideIn 0.3s ease;
    max-width: 400px;
  `;
  
  // Botão de fechar
  const closeBtn = notification.querySelector('.notification-close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  
  closeBtn.addEventListener('click', () => {
    notification.remove();
  });
  
  document.body.appendChild(notification);
  
  // Remove automaticamente após 5 segundos
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}

// Preview de imagem no formulário
const photoInput = document.getElementById('photo');
if (photoInput) {
  photoInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      const fileName = this.files[0].name;
      showNotification(`Foto selecionada: ${fileName}`, 'info');
      
      // Opcional: criar preview da imagem
      createImagePreview(this.files[0]);
    }
  });
}

function createImagePreview(file) {
  // Remove preview anterior se existir
  const existingPreview = document.querySelector('.image-preview');
  if (existingPreview) {
    existingPreview.remove();
  }
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    preview.innerHTML = `
      <img src="${e.target.result}" alt="Preview" />
      <button class="remove-preview">✕</button>
    `;
    
    preview.style.cssText = `
      position: relative;
      margin-top: 1rem;
      max-width: 200px;
    `;
    
    preview.querySelector('img').style.cssText = `
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 10px;
      border: 2px solid var(--accent1);
    `;
    
    preview.querySelector('.remove-preview').style.cssText = `
      position: absolute;
      top: -10px;
      right: -10px;
      background: #ff4757;
      color: white;
      border: none;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      cursor: pointer;
      font-size: 0.8rem;
    `;
    
    preview.querySelector('.remove-preview').addEventListener('click', () => {
      preview.remove();
      photoInput.value = '';
    });
    
    photoInput.parentNode.appendChild(preview);
  };
  
  reader.readAsDataURL(file);
}

// Animação de scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Efeito de digitação no hero (opcional)
function initTypingEffect() {
  const heroTitle = document.querySelector('.hero-text h1');
  if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
      if (i < originalText.length) {
        heroTitle.innerHTML += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      }
    }
    
    // Inicia o efeito quando a página carrega
    setTimeout(typeWriter, 1000);
  }
}

// Inicializa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  initTypingEffect();
});

// Adiciona estilos CSS para as animações
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification {
    animation: slideIn 0.3s ease;
  }
`;
document.head.appendChild(style);