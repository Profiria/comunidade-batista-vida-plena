// ==========================================================================
// SCRIPT PRINCIPAL UNIFICADO - COMUNIDADE BATISTA VIDA PLENA
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. MENU HAMBÚRGUER (Atende tanto id="hamburger" quanto id="menu-toggle")
  const hamburger = document.getElementById('hamburger') || document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. LÓGICA DO CARROSSEL (Apenas na index.html)
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  // Só executa se o carrossel existir na página atual
  if (slides.length > 0 && prevBtn && nextBtn && dotsContainer) {
    let currentSlide = 0;
    let slideInterval;

    // Cria os pontinhos (dots) de navegação dinamicamente
    dotsContainer.innerHTML = '';
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateCarousel() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateCarousel();
      resetTimer();
    }

    function startTimer() {
      slideInterval = setInterval(nextSlide, 5000); // Troca a cada 5 segundos
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    // Eventos dos botões Anterior / Próximo
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetTimer();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetTimer();
    });

    // Inicia o carrossel automático
    updateCarousel();
    startTimer();
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
