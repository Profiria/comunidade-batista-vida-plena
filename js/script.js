// 1. MENU HAMBÚRGUER (Abre e fecha a lista no celular)
const menuToggle = document.getElementById('menu-toggle')
  || document.getElementById('hamburger')
  || document.querySelector('.hamburger');

const navMenu = document.getElementById('nav-menu')
  || document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Bônus: fecha a gaveta ao tocar em um link
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

  // 2. LÓGICA DO CARROSSEL (Apenas na index.html)
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let currentSlide = 0;
    let slideInterval;

    // Criar indicadores (dots) dinamicamente
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlides() {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === currentSlide);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlides();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlides();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlides();
      resetTimer();
    }

    function resetTimer() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 5000);
    }

    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    // Iniciar rotação automática
    slideInterval = setInterval(nextSlide, 5000);
  }
});

// 3. FUNÇÃO DE COPIAR A CHAVE PIX (Página contribuicao.html)
function copiarPix() {
  const chaveInput = document.getElementById('chavePix');
  const btnText = document.getElementById('btnText');

  if (!chaveInput) return;

  chaveInput.select();
  chaveInput.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(chaveInput.value).then(() => {
    if (btnText) {
      btnText.innerText = "Chave Copiada!";
      setTimeout(() => {
        btnText.innerText = "Copiar Chave PIX";
      }, 3000);
    }
  }).catch(err => {
    console.error("Erro ao copiar chave PIX: ", err);
  });
}
