/**
 * Attendance Analyzer — Central Navigation Component
 * 
 * Defines all sidebar links, brand metadata, and footer links as variables.
 * Automatically injects/renders the mobile topbar, sidebar, and footer into
 * each page, guaranteeing consistency and eliminating duplicate markup.
 */

(function () {
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

  const isFileProto = typeof window !== 'undefined' && window.location.protocol === 'file:';

  // =========================================================================
  // Clean URL Bar Aesthetic: Always hide .html from URL bar when surfing
  // =========================================================================
  function cleanUrlBar() {
    try {
      if (!isFileProto && window.location.pathname.endsWith('.html')) {
        let cleanPath = window.location.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
        if (!cleanPath) cleanPath = '/';
        window.history.replaceState(null, '', cleanPath + window.location.search + window.location.hash);
      }
    } catch (err) {}
  }
  cleanUrlBar();

  const NAV_CONFIG = {
    brand: {
      name: 'Attendance Analyzer',
      logo: 'assets/icon48.png',
      homeUrl: 'index.html',
      webstoreUrl: 'https://chromewebstore.google.com/detail/gbepkebfijgoafbkbcbjmmjipnhoaifd?utm_source=item-share-cb'
    },
    // Navigation menu items in optimized logical order (optimized for Git / GitHub Pages static hosting)
    menuItems: [
      {
        id: 'home',
        label: 'Home',
        href: 'index.html',
        pageKey: 'index',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`
      },
      {
        id: 'sidepanel',
        label: 'Try Now Here',
        href: 'sidepanel.html',
        pageKey: 'sidepanel',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`
      },
      {
        id: 'browsers',
        label: 'Supported Browsers',
        href: 'browsers.html',
        pageKey: 'browsers',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="4"></circle><line x1="21.17" y1="8" x2="12" y2="8"></line><line x1="3.95" y1="6.06" x2="8.54" y2="14"></line><line x1="10.88" y1="21.94" x2="15.46" y2="14"></line></svg>`
      },
      {
        id: 'install',
        label: 'Join Beta',
        href: 'install.html',
        pageKey: 'install',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>`
      },
      {
        id: 'payment',
        label: 'Support / Donate',
        href: 'payment.html',
        pageKey: 'payment',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>`
      },
      {
        id: 'proof',
        label: 'Proof & Ledger',
        href: 'proof.html',
        pageKey: 'proof',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
      },
      {
        id: 'donation-policy',
        label: 'Donation Policy',
        href: 'donation-policy.html',
        pageKey: 'donation-policy',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
      },
      {
        id: 'advertise',
        label: 'Advertise',
        href: 'advertise.html',
        pageKey: 'advertise',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`
      },
      {
        id: 'updates',
        label: 'Version Control',
        href: 'updates.html',
        pageKey: 'updates',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`
      },
      {
        id: 'faq',
        label: 'FAQ & Docs',
        href: 'faq.html',
        pageKey: 'faq',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`
      },
      {
        id: 'policy',
        label: 'Privacy Policy',
        href: 'policy.html',
        pageKey: 'policy',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`
      }
    ],
    developerCredit: 'Designed &amp; Developed for students by <strong>Dhruv dhameliya</strong>'
  };

  function getCurrentPageKey() {
    const path = window.location.pathname;
    let filename = path.substring(path.lastIndexOf('/') + 1) || 'index';
    filename = filename.split('?')[0].split('#')[0].replace(/\.html$/, '');
    return (!filename || filename === '' || filename === 'index') ? 'index' : filename;
  }

  function renderMobileTopbar() {
    let header = document.querySelector('header.mobile-topbar');
    if (!header) {
      header = document.createElement('header');
      header.className = 'mobile-topbar';
      document.body.insertBefore(header, document.body.firstChild);
    }

    header.innerHTML = `
      <a href="${NAV_CONFIG.brand.homeUrl}" class="mobile-brand-link">
        <img src="${NAV_CONFIG.brand.logo}" alt="Attendance Analyzer" class="brand-icon-img" style="width: 36px; height: 36px; border-radius: 10px;">
        <div class="brand-text-wrap">
          <span class="brand-title-top">Attendance</span>
          <span class="brand-title-bottom">Analyzer</span>
        </div>
      </a>
      <button class="mobile-menu-btn" id="mobile-menu-btn" type="button" aria-label="Toggle navigation menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    `;
  }

  function renderSidebar() {
    let sidebar = document.getElementById('sidebar');
    if (!sidebar) {
      sidebar = document.createElement('aside');
      sidebar.className = 'sidebar';
      sidebar.id = 'sidebar';
      const mainWrapper = document.querySelector('.main-wrapper');
      if (mainWrapper) {
        document.body.insertBefore(sidebar, mainWrapper);
      } else {
        document.body.appendChild(sidebar);
      }
    }

    // Ensure mobile backdrop exists
    let backdrop = document.getElementById('sidebar-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      backdrop.id = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
    }

    const currentKey = getCurrentPageKey();

    const menuHtml = NAV_CONFIG.menuItems.map(item => {
      const isActive = currentKey === item.pageKey || (currentKey === 'index' && item.pageKey === 'index');
      return `
        <li>
          <a href="${item.href}" class="${isActive ? 'active' : ''}">
            ${item.icon}
            ${item.label}
          </a>
        </li>
      `;
    }).join('');

    sidebar.innerHTML = `
      <div class="sidebar-top">
        <a href="${NAV_CONFIG.brand.homeUrl}" class="sidebar-brand">
          <img src="${NAV_CONFIG.brand.logo}" alt="Attendance Analyzer" class="brand-icon-img">
          <div class="brand-text-wrap">
            <span class="brand-title-top">Attendance</span>
            <span class="brand-title-bottom">Analyzer</span>
          </div>
        </a>
      </div>

      <div class="sidebar-menu-scroll">
        <ul class="sidebar-menu">
          ${menuHtml}
        </ul>
      </div>

      <div class="sidebar-bottom">
        <a href="${NAV_CONFIG.brand.webstoreUrl}" target="_blank" rel="noopener" class="btn-sidebar-install">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="12" r="4"></circle>
            <line x1="21.17" y1="8" x2="12" y2="8"></line>
            <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
            <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
          </svg>
          <span>Install Extension</span>
        </a>
      </div>
    `;
  }

  function renderFooter() {
    let footer = document.querySelector('footer.footer');
    if (!footer) {
      const mainWrapper = document.querySelector('.main-wrapper');
      if (mainWrapper) {
        footer = document.createElement('footer');
        footer.className = 'footer';
        mainWrapper.appendChild(footer);
      }
    }

    if (footer) {
      footer.innerHTML = `
        <div class="footer-content">
          <div class="footer-credit">
            ${NAV_CONFIG.developerCredit}
          </div>
          <ul class="footer-links">
            ${NAV_CONFIG.menuItems.filter(m => m.id !== 'install').map(item => `
              <li><a href="${item.href}">${item.label}</a></li>
            `).join('')}
          </ul>
        </div>
      `;
    }
  }

  function initMobileMenuEvents() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    if (!mobileMenuBtn || !sidebar) return;

    const toggleSidebar = (forceState) => {
      const isOpen = forceState !== undefined ? forceState : !sidebar.classList.contains('open');
      sidebar.classList.toggle('open', isOpen);
      if (backdrop) backdrop.classList.toggle('active', isOpen);
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.classList.toggle('sidebar-mobile-open', isOpen);
    };

    // Primary tap / click handler on 3-line hamburger button
    mobileMenuBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleSidebar();
    };

    // Tap backdrop to close
    if (backdrop) {
      backdrop.onclick = (e) => {
        e.preventDefault();
        toggleSidebar(false);
      };
    }

    // Close on navigation link click inside sidebar
    sidebar.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && window.innerWidth <= 850) {
        toggleSidebar(false);
      }
    });

    // Close on click outside sidebar
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 850 && sidebar.classList.contains('open')) {
        if (!sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          toggleSidebar(false);
        }
      }
    });

    // Escape key closes mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        toggleSidebar(false);
      }
    });
  }

  function getDeviceEnvironment() {
    const ua = navigator.userAgent || '';
    const isAndroid = /Android/i.test(ua);
    const isIOS = /iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isMobile = isAndroid || isIOS || /Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(ua) || (window.innerWidth < 850 && 'ontouchstart' in window);

    const isFirefox = /Firefox|FxiOS/i.test(ua);
    const isSafariOnly = /Safari/i.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/i.test(ua);
    const isKiwi = /Kiwi/i.test(ua);
    const isChromium = !isFirefox && !isSafariOnly && (window.chrome !== undefined || /Chrome|Chromium|Edg|OPR|Brave|Vivaldi|Arc/i.test(ua));

    if (isAndroid && !isKiwi) {
      return { supported: false, deviceName: 'Android Mobile', type: 'android' };
    }
    if (isIOS) {
      return { supported: false, deviceName: 'iOS (iPhone / iPad)', type: 'ios' };
    }
    if (isMobile && !isKiwi) {
      return { supported: false, deviceName: 'Mobile Device', type: 'mobile' };
    }
    if (isFirefox) {
      return { supported: false, deviceName: 'Mozilla Firefox', type: 'firefox' };
    }
    if (isSafariOnly) {
      return { supported: false, deviceName: 'Apple Safari', type: 'safari' };
    }
    if (!isChromium) {
      return { supported: false, deviceName: 'Unsupported Browser', type: 'other' };
    }
    return { supported: true, deviceName: 'Desktop Chromium', type: 'desktop_chromium' };
  }

  function isChromiumBrowser() {
    return getDeviceEnvironment().supported;
  }

  let toastDismissTimer = null;

  function showUnsupportedDeviceNotification(env) {
    let existingToast = document.getElementById('caa-device-unsupported-toast');
    if (existingToast) {
      existingToast.remove();
    }
    if (toastDismissTimer) {
      clearTimeout(toastDismissTimer);
      toastDismissTimer = null;
    }

    const toast = document.createElement('div');
    toast.id = 'caa-device-unsupported-toast';
    toast.className = 'caa-device-toast';
    toast.setAttribute('role', 'alert');

    const deviceLabel = env?.deviceName || 'Your Current Device';
    const isMobileDevice = env?.type === 'android' || env?.type === 'ios' || env?.type === 'mobile';

    const titleText = isMobileDevice
      ? `Not Supported on ${deviceLabel}`
      : `Browser Not Supported for Installation`;

    const bodyText = isMobileDevice
      ? `Chrome Web Store extensions cannot be installed on mobile devices. Please open this page on your <strong>Laptop / Desktop (Windows, Mac, Linux)</strong> using Google Chrome, Brave, or Microsoft Edge.`
      : `Extensions require a Chromium browser. Please open this page on <strong>Google Chrome, Brave, Microsoft Edge, or Opera</strong> on your computer.`;

    const browsersPageUrl = isFileProto ? 'browsers.html' : 'browsers';

    toast.innerHTML = `
      <div class="caa-toast-top">
        <div class="caa-toast-badge-wrap">
          <div class="caa-toast-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <div class="caa-toast-title">${titleText}</div>
        </div>
        <button type="button" class="caa-toast-close" id="caa-toast-close-btn" aria-label="Close notification">&times;</button>
      </div>
      <div class="caa-toast-desc">${bodyText}</div>
      <div class="caa-toast-actions">
        <button type="button" class="caa-toast-copy-btn" id="caa-toast-copy-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span id="caa-toast-copy-text">Copy Link for PC</span>
        </button>
        <a href="${browsersPageUrl}" class="caa-toast-info-link">
          <span>Supported Browsers</span>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </a>
      </div>
    `;

    document.body.appendChild(toast);

    // Animation in
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });

    const DISMISS_COOLDOWN_MS = 5 * 60 * 1000; // 5 minutes cooldown
    const DISMISS_STORAGE_KEY = 'caa_device_notice_dismissed_at';

    const recordDismissal = () => {
      try {
        localStorage.setItem(DISMISS_STORAGE_KEY, String(Date.now()));
      } catch (err) {}
    };

    // Close button handler
    const closeBtn = document.getElementById('caa-toast-close-btn');
    if (closeBtn) {
      closeBtn.onclick = () => {
        recordDismissal();
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
      };
    }

    // Copy link button handler with universal HTTP + HTTPS fallback
    const copyBtn = document.getElementById('caa-toast-copy-btn');
    const copyText = document.getElementById('caa-toast-copy-text');
    if (copyBtn) {
      copyBtn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const linkToCopy = window.location.href;

        const onCopied = () => {
          recordDismissal();
          if (copyText) copyText.textContent = '✓ Link Copied!';
          copyBtn.classList.add('copied');
          setTimeout(() => {
            if (copyText) copyText.textContent = 'Copy Link for PC';
            copyBtn.classList.remove('copied');
          }, 2500);
        };

        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(linkToCopy)
            .then(onCopied)
            .catch(() => execCommandCopy(linkToCopy, onCopied));
        } else {
          execCommandCopy(linkToCopy, onCopied);
        }
      };
    }

    function execCommandCopy(text, cb) {
      try {
        const tempInput = document.createElement('textarea');
        tempInput.value = text;
        tempInput.style.position = 'fixed';
        tempInput.style.top = '-9999px';
        tempInput.style.left = '-9999px';
        tempInput.style.opacity = '0';
        tempInput.setAttribute('readonly', '');
        document.body.appendChild(tempInput);
        tempInput.focus();
        tempInput.select();
        tempInput.setSelectionRange(0, 99999);
        const successful = document.execCommand('copy');
        document.body.removeChild(tempInput);
        if (successful) {
          cb();
        } else {
          prompt('Copy website link for your computer:', text);
          cb();
        }
      } catch (err) {
        prompt('Copy website link for your computer:', text);
        cb();
      }
    }

    // Auto dismiss after 10 seconds
    toastDismissTimer = setTimeout(() => {
      if (document.body.contains(toast)) {
        recordDismissal();
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
      }
    }, 10000);
  }

  function initInstallLinkInterception() {
    document.addEventListener('click', (e) => {
      const installLink = e.target.closest('a[href*="chromewebstore.google.com"], .btn-sidebar-install, .btn-store-inline, .btn-install-large, #btn-header-install-ext, .sp-btn-install-full, .sp-btn-install-big, .vc-install-btn');
      if (installLink) {
        const env = getDeviceEnvironment();
        if (!env.supported) {
          e.preventDefault();
          e.stopPropagation();
          showUnsupportedDeviceNotification(env);
        }
      }
    }, true);
  }

  function initNavigation() {
    renderMobileTopbar();
    renderSidebar();

    const onReady = () => {
      renderFooter();
      initMobileMenuEvents();
      initInstallLinkInterception();
      initServiceWorker();
      initInstantPageTransitions();

      // Auto-show top notification for mobile / unsupported devices only if not dismissed in last 5 minutes
      const env = getDeviceEnvironment();
      if (!env.supported) {
        let lastDismissed = 0;
        try {
          lastDismissed = Number(localStorage.getItem('caa_device_notice_dismissed_at') || 0);
        } catch (e) {}

        const elapsed = Date.now() - lastDismissed;
        const FIVE_MINUTES = 5 * 60 * 1000;

        if (elapsed >= FIVE_MINUTES) {
          setTimeout(() => {
            showUnsupportedDeviceNotification(env);
          }, 500);
        }
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', onReady);
    } else {
      onReady();
    }
  }

  // =========================================================================
  // Service Worker Registration for Instant Offline / Cache-First Experience
  // =========================================================================
  function initServiceWorker() {
    if (!isFileProto && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // Register relative service worker so it works on any GitHub Pages /repo/ or custom domain
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            reg.onupdatefound = () => {
              const installingWorker = reg.installing;
              if (installingWorker) {
                installingWorker.onstatechange = () => {
                  if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    console.debug('[CAA SW] Cached assets updated.');
                  }
                };
              }
            };
          })
          .catch((err) => {
            console.debug('[CAA SW] Registration notice:', err);
          });
      });
    }
  }

  // =========================================================================
  // Instant 0ms Page Navigation & In-Memory / Cache-Storage Engine
  // =========================================================================
  const pageCache = new Map();
  let progressBarEl = null;

  function getProgressBar() {
    if (!progressBarEl) {
      progressBarEl = document.getElementById('caa-page-progress-bar');
      if (!progressBarEl) {
        progressBarEl = document.createElement('div');
        progressBarEl.id = 'caa-page-progress-bar';
        document.body.appendChild(progressBarEl);
      }
    }
    return progressBarEl;
  }

  function startProgressBar() {
    const pb = getProgressBar();
    if (pb) {
      pb.classList.remove('done');
      pb.classList.add('loading');
    }
  }

  function finishProgressBar() {
    const pb = getProgressBar();
    if (pb) {
      pb.classList.add('done');
      setTimeout(() => {
        pb.classList.remove('loading', 'done');
      }, 400);
    }
  }

  function normalizeUrl(urlStr) {
    try {
      const parsed = new URL(urlStr, window.location.href);
      return parsed.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '') || '/';
    } catch (e) {
      return urlStr;
    }
  }

  function getFetchUrl(urlStr) {
    try {
      const targetUrl = new URL(urlStr, window.location.href);
      let pathname = targetUrl.pathname;
      if (!pathname.endsWith('.html') && !pathname.endsWith('/') && !pathname.includes('.')) {
        targetUrl.pathname = pathname + '.html';
      } else if (pathname.endsWith('/')) {
        targetUrl.pathname = pathname + 'index.html';
      }
      return targetUrl.href;
    } catch (e) {
      return urlStr;
    }
  }

  function getCleanDisplayPath(urlStr) {
    try {
      const urlObj = new URL(urlStr, window.location.href);
      let clean = urlObj.pathname.replace(/\/index\.html$/, '/').replace(/\.html$/, '');
      if (!clean) clean = '/';
      return clean + urlObj.search + urlObj.hash;
    } catch (e) {
      return urlStr;
    }
  }

  async function prefetchPage(url) {
    if (isFileProto) return null;
    try {
      const targetUrl = new URL(url, window.location.href);
      if (targetUrl.origin !== window.location.origin) return null;

      const key = normalizeUrl(targetUrl.href);
      if (pageCache.has(key)) return pageCache.get(key);

      const fetchUrl = getFetchUrl(targetUrl.href);
      const response = await fetch(fetchUrl, { cache: 'default' });
      if (!response.ok) return null;
      const htmlText = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const mainWrapper = doc.querySelector('.main-wrapper') || doc.querySelector('main') || doc.body;
      const title = doc.title || document.title;

      const cachedData = {
        html: htmlText,
        mainHtml: mainWrapper ? mainWrapper.innerHTML : '',
        title: title
      };

      pageCache.set(key, cachedData);
      return cachedData;
    } catch (e) {
      return null;
    }
  }

  function updateActiveNavLinks() {
    const currentKey = getCurrentPageKey();
    document.querySelectorAll('.sidebar-menu a').forEach(a => {
      const href = a.getAttribute('href') || '';
      let itemKey = href.split('?')[0].split('#')[0].replace(/\.html$/, '').replace(/^\.\//, 'index');
      if (itemKey === '') itemKey = 'index';
      const isActive = (itemKey === currentKey) || (currentKey === 'index' && itemKey === 'index');
      a.classList.toggle('active', isActive);
    });
  }

  function runPageScripts(container) {
    if (typeof window.initBrowserDirectory === 'function' && document.getElementById('br-grid')) {
      try { window.initBrowserDirectory(); } catch (e) {}
    }
    if (typeof window.initFAQ === 'function' && document.querySelector('.faq-section')) {
      try { window.initFAQ(); } catch (e) {}
    }
    if (typeof window.initSidepanelCalculator === 'function' && document.getElementById('sp-calc-app')) {
      try { window.initSidepanelCalculator(); } catch (e) {}
    }
    if (typeof window.initMain === 'function') {
      try { window.initMain(); } catch (e) {}
    }

    if (container) {
      const scripts = container.querySelectorAll('script');
      scripts.forEach(oldScript => {
        if (!oldScript.src) {
          try {
            const fn = new Function(oldScript.textContent);
            fn();
          } catch (err) {
            console.debug('[CAA] Page inline script notice:', err);
          }
        }
      });
    }
  }

  async function navigateTo(targetUrl, pushState = true) {
    if (isFileProto) {
      window.location.href = targetUrl;
      return;
    }

    const urlObj = new URL(targetUrl, window.location.href);
    if (urlObj.origin !== window.location.origin) {
      window.location.href = targetUrl;
      return;
    }

    startProgressBar();

    try {
      const key = normalizeUrl(urlObj.href);
      let pageData = pageCache.get(key);

      if (!pageData) {
        pageData = await prefetchPage(urlObj.href);
      }

      if (!pageData || !pageData.mainHtml) {
        window.location.href = targetUrl;
        return;
      }

      const currentMain = document.querySelector('.main-wrapper');
      if (currentMain) {
        currentMain.innerHTML = pageData.mainHtml;
        currentMain.classList.remove('page-entering');
        void currentMain.offsetWidth; // reflow trigger
        currentMain.classList.add('page-entering');
      }

      if (pageData.title) {
        document.title = pageData.title;
      }

      if (pushState) {
        const cleanUrl = getCleanDisplayPath(urlObj.href);
        window.history.pushState({ path: cleanUrl }, pageData.title, cleanUrl);
      }

      updateActiveNavLinks();
      runPageScripts(currentMain);

      if (urlObj.hash) {
        const hashEl = document.querySelector(urlObj.hash);
        if (hashEl) {
          hashEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'instant' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }

      finishProgressBar();
    } catch (err) {
      finishProgressBar();
      window.location.href = targetUrl;
    }
  }

  function isInternalLink(link) {
    try {
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin) return false;
      const path = url.pathname;
      if (path.endsWith('.zip') || path.endsWith('.crx') || path.endsWith('.pdf') || path.endsWith('.png') || path.endsWith('.jpg') || path.endsWith('.json')) {
        return false;
      }
      return true;
    } catch (e) {
      return false;
    }
  }

  function initInstantPageTransitions() {
    getProgressBar();

    // Cache initial page shell
    const currentKey = normalizeUrl(window.location.href);
    const currentMain = document.querySelector('.main-wrapper');
    if (currentMain) {
      pageCache.set(currentKey, {
        html: document.documentElement.outerHTML,
        mainHtml: currentMain.innerHTML,
        title: document.title
      });
    }

    // Prefetch all menu pages in background during idle time
    const prefetchMenuItems = () => {
      NAV_CONFIG.menuItems.forEach(item => {
        if (item.href && !item.href.startsWith('http') && !item.href.startsWith('//')) {
          prefetchPage(item.href);
        }
      });
    };

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(prefetchMenuItems, { timeout: 3000 });
    } else {
      setTimeout(prefetchMenuItems, 1500);
    }

    // Hover & touch prefetching on all internal links
    document.addEventListener('pointerenter', (e) => {
      const link = e.target.closest('a[href]');
      if (link && isInternalLink(link)) {
        prefetchPage(link.href);
      }
    }, true);

    document.addEventListener('touchstart', (e) => {
      const link = e.target.closest('a[href]');
      if (link && isInternalLink(link)) {
        prefetchPage(link.href);
      }
    }, { passive: true, capture: true });

    // Intercept clicks for 0ms instant transition
    document.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.defaultPrevented) return;
      if (e.button !== 0) return;

      const link = e.target.closest('a[href]');
      if (!link) return;

      if (link.target && link.target !== '_self') return;
      if (link.hasAttribute('download')) return;
      if (!isInternalLink(link)) return;

      const href = link.getAttribute('href');
      if (href.startsWith('#')) return;

      const targetUrl = new URL(link.href, window.location.href);
      if (targetUrl.pathname === window.location.pathname && targetUrl.search === window.location.search) {
        if (targetUrl.hash) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      e.preventDefault();
      navigateTo(link.href, true);
    });

    // Back / forward browser navigation
    window.addEventListener('popstate', () => {
      navigateTo(window.location.href, false);
    });
  }

  // Execute immediately to eliminate layout shift
  initNavigation();

  window.NAV_CONFIG = NAV_CONFIG;
  window.initNavigation = initNavigation;
  window.isChromiumBrowser = isChromiumBrowser;
  window.getDeviceEnvironment = getDeviceEnvironment;
  window.showUnsupportedDeviceNotification = showUnsupportedDeviceNotification;
  window.navigateTo = navigateTo;
  window.prefetchPage = prefetchPage;
})();
