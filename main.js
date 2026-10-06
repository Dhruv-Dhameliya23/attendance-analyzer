// Attendance Analyzer — Production Client Security & Page Interactions
(function() {
  'use strict';

  // =========================================================================
  // Client Security: Disable Inspect, DevTools Shortcuts & Context Menu
  // (Mirrors the core extension integrity & tamper-protection engine)
  // =========================================================================
  try {
    const handleContextMenu = function (e) {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return; // Allow text selection / copy in inputs
      }
      e.preventDefault();
      e.stopPropagation();
      if (typeof e.stopImmediatePropagation === 'function') {
        e.stopImmediatePropagation();
      }
      return false;
    };

    const handleKeyDown = function (e) {
      const key = (e.key || '').toUpperCase();
      const keyCode = e.keyCode || e.which;
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      // F12
      if (key === 'F12' || keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof e.stopImmediatePropagation === 'function') {
          e.stopImmediatePropagation();
        }
        return false;
      }

      // Ctrl+Shift+I / J / C / K / P / E / M (DevTools, Console, Inspect Element, Firefox tools, Command palette)
      if (isCtrlOrCmd && e.shiftKey) {
        if (
          key === 'I' || keyCode === 73 ||
          key === 'J' || keyCode === 74 ||
          key === 'C' || keyCode === 67 ||
          key === 'K' || keyCode === 75 ||
          key === 'P' || keyCode === 80 ||
          key === 'E' || keyCode === 69 ||
          key === 'M' || keyCode === 77
        ) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') {
            e.stopImmediatePropagation();
          }
          return false;
        }
      }

      // Ctrl+U (View Source) or Ctrl+S (Save Page)
      if (isCtrlOrCmd && !e.shiftKey && !e.altKey) {
        if (key === 'U' || keyCode === 85 || key === 'S' || keyCode === 83) {
          e.preventDefault();
          e.stopPropagation();
          if (typeof e.stopImmediatePropagation === 'function') {
            e.stopImmediatePropagation();
          }
          return false;
        }
      }
    };

    window.addEventListener('contextmenu', handleContextMenu, true);
    document.addEventListener('contextmenu', handleContextMenu, true);
    window.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keydown', handleKeyDown, true);
  } catch (secErr) {
    console.warn('Attendance Analyzer: DevTools protection initialization:', secErr);
  }

})();

document.addEventListener('DOMContentLoaded', () => {
  // Live Token Attendance Calculator Sandbox with Usage Lock & Trial Counter
  const conductedInput = document.getElementById('calc-conducted');
  const attendedInput = document.getElementById('calc-attended');
  const targetBtns = document.querySelectorAll('.calc-target-btn');
  const pctDisplay = document.getElementById('calc-result-pct');
  const badgeDisplay = document.getElementById('calc-result-badge');
  const leavesDisplay = document.getElementById('calc-result-leaves');
  const missedDisplay = document.getElementById('calc-result-missed');
  const recoveryDisplay = document.getElementById('calc-result-recovery');
  const trialCountDisplay = document.getElementById('calc-trial-count');
  const lockedOverlay = document.getElementById('calc-locked-overlay');
  const resetBtn = document.getElementById('btn-calc-reset');
  const calcGrid = document.getElementById('calc-grid');

  if (conductedInput && attendedInput && pctDisplay) {
    let currentTarget = 75;
    const MAX_TRIES = 20;
    const STORAGE_KEY_HOME_TOKENS = 'caa_home_calc_tokens_used';

    const safeHomeTokens = {};
    const getHomeTokensUsed = () => {
      try {
        return parseInt(localStorage.getItem(STORAGE_KEY_HOME_TOKENS) || '0', 10);
      } catch (e) {
        return parseInt(safeHomeTokens[STORAGE_KEY_HOME_TOKENS] || '0', 10);
      }
    };
    const setHomeTokensUsed = (val) => {
      try {
        localStorage.setItem(STORAGE_KEY_HOME_TOKENS, String(val));
      } catch (e) {
        safeHomeTokens[STORAGE_KEY_HOME_TOKENS] = String(val);
      }
    };

    let isInitialized = false;

    const getRemainingTries = () => Math.max(0, MAX_TRIES - getHomeTokensUsed());

    const updateTrialBadge = () => {
      const remainingTries = getRemainingTries();
      if (trialCountDisplay) {
        if (remainingTries > 0) {
          trialCountDisplay.textContent = `Token Sandbox · ${remainingTries} ${remainingTries === 1 ? 'Token' : 'Tokens'} Left`;
        } else {
          trialCountDisplay.textContent = 'Token Limit Reached · 0 Left';
        }
      }
    };

    const lockCalculator = () => {
      if (lockedOverlay) {
        lockedOverlay.style.display = 'flex';
      }
      if (calcGrid) {
        calcGrid.classList.add('calc-blurred');
      }
    };

    const unlockCalculator = () => {
      setHomeTokensUsed(0);
      updateTrialBadge();
      if (lockedOverlay) {
        lockedOverlay.style.display = 'none';
      }
      if (calcGrid) {
        calcGrid.classList.remove('calc-blurred');
      }
      conductedInput.value = '60';
      attendedInput.value = '52';
      targetBtns.forEach((b, idx) => b.classList.toggle('active', idx === 0));
      currentTarget = 75;
      calculate(false);
    };

    const recordUserAction = () => {
      if (!isInitialized) return;
      let used = getHomeTokensUsed();
      if (used < MAX_TRIES) {
        used++;
        setHomeTokensUsed(used);
        updateTrialBadge();
        if (used >= MAX_TRIES) {
          setTimeout(lockCalculator, 300);
        }
      } else {
        lockCalculator();
      }
    };

    const calculate = (countAsUse = false) => {
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

      pctDisplay.innerHTML = `${pct.toFixed(2)}<span class="pct-unit">%</span>`;
      missedDisplay.textContent = missed + (missed === 1 ? ' class' : ' classes');

      if (pct >= 85) {
        badgeDisplay.className = 'calc-badge-safe';
        badgeDisplay.textContent = 'Excellent Standing';
        pctDisplay.style.color = '#22c55e'; // Bright neon green
      } else if (pct >= 75) {
        badgeDisplay.className = 'calc-badge-safe';
        badgeDisplay.textContent = 'Safe Standing';
        pctDisplay.style.color = '#38bdf8'; // Bright electric blue
      } else if (pct >= 70) {
        badgeDisplay.className = 'calc-badge-warning';
        badgeDisplay.textContent = 'Warning (<75%)';
        pctDisplay.style.color = '#fbbf24'; // Bright golden yellow
      } else {
        badgeDisplay.className = 'calc-badge-danger';
        badgeDisplay.textContent = 'Critical Shortage';
        pctDisplay.style.color = '#ff4d4f'; // Bright electric red
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

      if (countAsUse) {
        recordUserAction();
      }
    };

    targetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (remainingTries <= 0) return;
        targetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentTarget = parseFloat(btn.getAttribute('data-target')) || 75;
        calculate(true);
      });
    });

    conductedInput.addEventListener('input', () => {
      if (remainingTries <= 0) return;
      calculate(true);
    });

    attendedInput.addEventListener('input', () => {
      if (remainingTries <= 0) return;
      calculate(true);
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', unlockCalculator);
    }

    calculate(false);
    isInitialized = true;
    updateTrialBadge();
  }

  // Screenshot Showcase Slider with Touch Swipe & Fullscreen Lightbox Zoom
  const sliderTrack = document.getElementById('slider-track');
  const prevBtn = document.getElementById('slider-prev-btn');
  const nextBtn = document.getElementById('slider-next-btn');
  const dots = document.querySelectorAll('.slider-dot');
  const counter = document.getElementById('slider-counter');
  const sliderContainer = document.getElementById('screenshot-slider');
  const slideItems = document.querySelectorAll('.slide-item');

  // Lightbox Elements
  const lightbox = document.getElementById('showcase-lightbox');
  const lightboxOverlay = document.getElementById('lightbox-overlay');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxThumbnails = document.querySelectorAll('.lightbox-thumb');
  const lightboxViewport = document.getElementById('lightbox-viewport');

  const slideData = [
    { src: 'assets/9.png', title: 'Attendance Analyzer Official Banner', duration: 1800 },
    { src: 'assets/1.png', title: 'Attendance Analyzer Main Dashboard', duration: 3800 },
    { src: 'assets/2.png', title: 'Safe Leaves & Absence Planner', duration: 3800 },
    { src: 'assets/3.png', title: 'Yellow & Blue Claim Simulation', duration: 3800 },
    { src: 'assets/4.png', title: 'Subject Recovery & Target Settings', duration: 3800 },
    { src: 'assets/5.png', title: 'Detailed Attendance Matrix & Metrics', duration: 3800 },
    { src: 'assets/6.png', title: 'Smart Concession & Leave Modeling', duration: 3800 },
    { src: 'assets/7.png', title: 'Real-Time Insights & Safe Bunk Limits', duration: 3800 },
    { src: 'assets/8.png', title: 'Comprehensive Performance Breakdown', duration: 3800 }
  ];

  if (sliderTrack && dots.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    let autoSlideTimer = null;
    let isLightboxOpen = false;
    let isDragSwiping = false;

    const stopAutoSlide = () => {
      if (autoSlideTimer) {
        clearTimeout(autoSlideTimer);
        autoSlideTimer = null;
      }
    };

    const scheduleNextAutoSlide = () => {
      stopAutoSlide();
      if (!isLightboxOpen) {
        const slideDelay = (slideData[currentSlide] && slideData[currentSlide].duration) || 3800;
        autoSlideTimer = setTimeout(() => {
          nextSlide();
        }, slideDelay);
      }
    };

    const updateSlider = (index, resetTimer = true) => {
      currentSlide = (index + totalSlides) % totalSlides;
      sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
      });

      if (counter) {
        counter.textContent = `Slide ${currentSlide + 1} of ${totalSlides}`;
      }

      if (resetTimer) {
        scheduleNextAutoSlide();
      }
    };

    const nextSlide = () => updateSlider(currentSlide + 1);
    const prevSlide = () => updateSlider(currentSlide - 1);

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
      });
    }

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIndex = parseInt(dot.getAttribute('data-index'), 10) || 0;
        updateSlider(targetIndex);
      });
    });

    // Auto-advance with dynamic per-slide duration
    scheduleNextAutoSlide();

    // -------------------------------------------------------------
    // Touchscreen Swipe Gestures for Main Slider
    // -------------------------------------------------------------
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide);
      sliderContainer.addEventListener('mouseleave', scheduleNextAutoSlide);

      let touchStartX = 0;
      let touchStartY = 0;
      let touchStartTime = 0;

      sliderContainer.addEventListener('touchstart', (e) => {
        stopAutoSlide();
        isDragSwiping = false;
        if (e.touches && e.touches[0]) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          touchStartTime = Date.now();
        }
      }, { passive: true });

      sliderContainer.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
          const moveX = e.touches[0].clientX;
          const moveY = e.touches[0].clientY;
          if (Math.abs(moveX - touchStartX) > 12) {
            isDragSwiping = true;
          }
        }
      }, { passive: true });

      sliderContainer.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const touchEndX = e.changedTouches[0].clientX;
          const touchEndY = e.changedTouches[0].clientY;
          const deltaX = touchEndX - touchStartX;
          const deltaY = touchEndY - touchStartY;
          const timeElapsed = Date.now() - touchStartTime;

          // Horizontal swipe detected (threshold: 35px or fast flick)
          if ((Math.abs(deltaX) > 35 || (Math.abs(deltaX) > 20 && timeElapsed < 220)) && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
              nextSlide(); // Swiped left -> next
            } else {
              prevSlide(); // Swiped right -> prev
            }
          }
        }
        setTimeout(() => {
          isDragSwiping = false;
        }, 80);
        scheduleNextAutoSlide();
      }, { passive: true });
    }

    // -------------------------------------------------------------
    // Click-to-Zoom Fullscreen Lightbox Modal
    // -------------------------------------------------------------
    let lightboxCurrentIndex = 0;

    const updateLightbox = (index) => {
      lightboxCurrentIndex = (index + totalSlides) % totalSlides;
      const data = slideData[lightboxCurrentIndex] || slideData[0];

      if (lightboxImg) {
        lightboxImg.src = data.src;
        lightboxImg.alt = data.title;
        lightboxImg.classList.remove('zoomed');
      }
      if (lightboxCounter) {
        lightboxCounter.textContent = `${lightboxCurrentIndex + 1} / ${totalSlides}`;
      }
      if (lightboxTitle) {
        lightboxTitle.textContent = data.title;
      }

      lightboxThumbnails.forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === lightboxCurrentIndex);
      });

      // Synchronize underlying slider index
      updateSlider(lightboxCurrentIndex, false);
    };

    const openLightbox = (index) => {
      isLightboxOpen = true;
      stopAutoSlide();
      updateLightbox(index);
      if (lightbox) {
        if (lightbox.parentElement !== document.body) {
          document.body.appendChild(lightbox);
        }
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('lightbox-open');
      }
    };

    const closeLightbox = () => {
      isLightboxOpen = false;
      if (lightboxImg) {
        lightboxImg.classList.remove('zoomed');
      }
      if (lightbox) {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lightbox-open');
      }
      scheduleNextAutoSlide();
    };

    // Click on the fullscreen image to toggle magnification zoom (1.38x)
    if (lightboxImg) {
      lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.classList.toggle('zoomed');
      });
    }

    const nextLightbox = () => updateLightbox(lightboxCurrentIndex + 1);
    const prevLightbox = () => updateLightbox(lightboxCurrentIndex - 1);

    // Open lightbox when clicking on any slide
    slideItems.forEach((item) => {
      item.addEventListener('click', (e) => {
        if (isDragSwiping) return; // Prevent opening if it was a touch swipe drag
        const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
        openLightbox(idx);
      });
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const idx = parseInt(item.getAttribute('data-index'), 10) || 0;
          openLightbox(idx);
        }
      });
    });

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', nextLightbox);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', prevLightbox);

    // Thumbnail strip clicks
    lightboxThumbnails.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const idx = parseInt(thumb.getAttribute('data-index'), 10) || 0;
        updateLightbox(idx);
      });
    });

    // Keyboard navigation for Lightbox
    window.addEventListener('keydown', (e) => {
      if (!isLightboxOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextLightbox();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        prevLightbox();
      }
    });

    // Touchscreen Swiping inside Fullscreen Lightbox
    if (lightboxViewport) {
      let lbTouchStartX = 0;
      let lbTouchStartY = 0;

      lightboxViewport.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches[0]) {
          lbTouchStartX = e.touches[0].clientX;
          lbTouchStartY = e.touches[0].clientY;
        }
      }, { passive: true });

      lightboxViewport.addEventListener('touchend', (e) => {
        if (e.changedTouches && e.changedTouches[0]) {
          const lbTouchEndX = e.changedTouches[0].clientX;
          const lbTouchEndY = e.changedTouches[0].clientY;
          const deltaX = lbTouchEndX - lbTouchStartX;
          const deltaY = lbTouchEndY - lbTouchStartY;

          if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) {
              nextLightbox(); // Swiped left -> next
            } else {
              prevLightbox(); // Swiped right -> prev
            }
          }
        }
      }, { passive: true });
    }
  }

  // Apple-grade Scroll Reveal Animations
  if ('IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll(
      '.feature-card, .policy-highlight-card, .calculator-card, .faq-item, .hero-actions, .badge-pill'
    );

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.12
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      // Subtle stagger delay for grouped cards
      el.style.transitionDelay = `${(index % 4) * 60}ms`;
      revealObserver.observe(el);
    });
  }
});

