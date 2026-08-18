// Attendance Analyzer — Production Client Security & Page Interactions
(function() {
  'use strict';

  // Disable DevTools shortcuts and inspect combinations
  document.addEventListener('keydown', function(e) {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) ||
      (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's'))
    ) {
      e.preventDefault();
      return false;
    }
  });

  // Suppress context menu inspect
  document.addEventListener('contextmenu', function(e) {
    // allow input field selections but block background right-click
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
    }
  });

  // Clean and silence production console
  if (window.console) {
    try {
      console.clear();
      console.log = function() {};
      console.warn = function() {};
      console.info = function() {};
      console.debug = function() {};
    } catch(err) {}
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');

  if (mobileMenuBtn && sidebar) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 850 && !sidebar.contains(e.target) && e.target !== mobileMenuBtn) {
        sidebar.classList.remove('open');
      }
    });
  }

  // Live Interactive Attendance Calculator Sandbox
  const conductedInput = document.getElementById('calc-conducted');
  const attendedInput = document.getElementById('calc-attended');
  const targetBtns = document.querySelectorAll('.calc-target-btn');
  const pctDisplay = document.getElementById('calc-result-pct');
  const badgeDisplay = document.getElementById('calc-result-badge');
  const leavesDisplay = document.getElementById('calc-result-leaves');
  const missedDisplay = document.getElementById('calc-result-missed');
  const recoveryDisplay = document.getElementById('calc-result-recovery');

  if (conductedInput && attendedInput && pctDisplay) {
    let currentTarget = 75;

    const calculate = () => {
      let conducted = parseInt(conductedInput.value) || 0;
      let attended = parseInt(attendedInput.value) || 0;

      if (conducted <= 0) conducted = 1;
      if (attended < 0) attended = 0;
      if (attended > conducted) {
        attended = conducted;
        attendedInput.value = conducted;
      }

      const missed = conducted - attended;
      const pct = (attended / conducted) * 100;
      const targetRatio = currentTarget / 100;

      pctDisplay.textContent = pct.toFixed(2) + '%';
      missedDisplay.textContent = missed + ' classes';

      if (pct >= 85) {
        badgeDisplay.className = 'calc-badge-safe';
        badgeDisplay.textContent = 'Excellent Standing';
        pctDisplay.style.color = '#16a34a';
      } else if (pct >= 75) {
        badgeDisplay.className = 'calc-badge-safe';
        badgeDisplay.textContent = 'Safe Standing';
        pctDisplay.style.color = '#2563eb';
      } else if (pct >= 70) {
        badgeDisplay.className = 'calc-badge-warning';
        badgeDisplay.textContent = 'Warning (<75%)';
        pctDisplay.style.color = '#d97706';
      } else {
        badgeDisplay.className = 'calc-badge-danger';
        badgeDisplay.textContent = 'Critical Shortage';
        pctDisplay.style.color = '#dc2626';
      }

      if (pct >= currentTarget) {
        const safeLeaves = Math.floor((attended - targetRatio * conducted) / targetRatio);
        leavesDisplay.textContent = safeLeaves + (safeLeaves === 1 ? ' class' : ' classes');
        leavesDisplay.style.color = '#16a34a';
        recoveryDisplay.textContent = '0 (Goal Met)';
        recoveryDisplay.style.color = '#16a34a';
      } else {
        const recoveryNeeded = Math.ceil((targetRatio * conducted - attended) / (1 - targetRatio));
        leavesDisplay.textContent = '0 classes (Shortage)';
        leavesDisplay.style.color = '#dc2626';
        recoveryDisplay.textContent = recoveryNeeded + ' consecutive classes';
        recoveryDisplay.style.color = '#dc2626';
      }
    };

    targetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        targetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTarget = parseFloat(btn.getAttribute('data-target')) || 75;
        calculate();
      });
    });

    conductedInput.addEventListener('input', calculate);
    attendedInput.addEventListener('input', calculate);
    calculate();
  }

  // Automatic Screenshot Showcase Slider
  const sliderTrack = document.getElementById('slider-track');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dots = document.querySelectorAll('.slider-dot');
  const counter = document.getElementById('slider-counter');
  const sliderContainer = document.getElementById('screenshot-slider');

  if (sliderTrack && dots.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoSlideTimer = null;

    const updateSlider = (index) => {
      currentSlide = (index + totalSlides) % totalSlides;
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      if (counter) {
        counter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
      }
    };

    const nextSlide = () => updateSlider(currentSlide + 1);
    const prevSlide = () => updateSlider(currentSlide - 1);

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIndex = parseInt(dot.getAttribute('data-index')) || 0;
        updateSlider(targetIndex);
      });
    });

    const startAutoSlide = () => {
      stopAutoSlide();
      autoSlideTimer = setInterval(nextSlide, 3800);
    };

    const stopAutoSlide = () => {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        autoSlideTimer = null;
      }
    };

    // Auto-advance by timer
    startAutoSlide();

    // Pause on hover
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', startAutoSlide);
      sliderContainer.addEventListener('touchstart', stopAutoSlide, { passive: true });
      sliderContainer.addEventListener('touchend', startAutoSlide, { passive: true });
    }
  }
});

