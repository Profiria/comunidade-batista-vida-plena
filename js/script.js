// ==========================================================================
// SCRIPT PRINCIPAL UNIFICADO - COMUNIDADE BATISTA VIDA PLENA
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. MENU HAMBÚRGUER (Atende id="hamburger" e id="menu-toggle")
  const hamburger = document.getElementById('hamburger') || document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 2. LÓGICA DO CARROSSEL (index.html)
  const slides = document.querySelectorAll('.carousel-slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  // Só executa se existirem slides na página
  if (slides.length > 0) {
    let currentSlide = 0;
    let slideInterval;

    function updateCarousel() {
      slides.forEach((slide, index) => {
        if (index === currentSlide) {
          slide.classList.add('active');
          slide.style.display = 'flex'; // Força a exibição apenas do slide ativo
        } else {
          slide.classList.remove('active');
          slide.style.display = 'none'; // Esconde os outros para não empilhar
        }
      });

      // Atualiza os pontinhos (se existirem)
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
          if (index === currentSlide) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }

    // Cria os pontinhos dinamicamente se o container existir
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
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
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    // Eventos dos botões (se existirem)
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
      });
    }

    // Executa imediatamente para esconder os outros slides e ativar o primeiro
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
