/* Active Travel & Logistics — site behaviour */
(function () {
  'use strict';

  /* ---------- Mobile navigation drawer ---------- */
  var page = document.getElementById('page');
  var drawer = document.getElementById('mobile-menu');
  var openBtn = document.querySelector('.site-header .menu-btn');
  var panel = drawer && drawer.querySelector('.drawer__panel');
  var closeTimer;

  function isOpen() { return drawer && !drawer.hidden; }

  function openDrawer() {
    clearTimeout(closeTimer);
    drawer.hidden = false;
    // Force a reflow so the slide-in transition runs from the off-screen state
    void drawer.offsetWidth;
    drawer.classList.add('is-open');
    openBtn.setAttribute('aria-expanded', 'true');
    page.inert = true;
    document.documentElement.style.overflow = 'hidden';
    drawer.querySelector('.drawer__close').focus();
  }

  function closeDrawer(restoreFocus) {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    openBtn.setAttribute('aria-expanded', 'false');
    page.inert = false;
    document.documentElement.style.overflow = '';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    closeTimer = setTimeout(function () { drawer.hidden = true; }, reduced ? 0 : 280);
    if (restoreFocus) openBtn.focus();
  }

  if (drawer && openBtn && panel) {
    openBtn.addEventListener('click', openDrawer);

    drawer.addEventListener('click', function (e) {
      if (e.target.closest('[data-drawer-close]')) closeDrawer(true);
      // Nav links: close and let the browser follow the #anchor
      else if (e.target.closest('a')) closeDrawer(false);
    });

    document.addEventListener('keydown', function (e) {
      if (!isOpen()) return;
      if (e.key === 'Escape') { closeDrawer(true); return; }
      if (e.key === 'Tab') {
        // Keep focus inside the panel (backup for browsers without `inert`)
        var items = panel.querySelectorAll('a[href], button:not([disabled])');
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });

    // Close if the page grows to desktop width (menu button hidden by the container query)
    new ResizeObserver(function () {
      if (isOpen() && getComputedStyle(openBtn).display === 'none') closeDrawer(false);
    }).observe(page);
  }

  /* ---------- Contact form → WhatsApp ---------- */
  var form = document.getElementById('booking-form');
  var status = document.getElementById('form-status');

  if (form) {
    var dateInput = form.elements.date;
    if (dateInput) {
      var now = new Date();
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset()); // local date, not UTC
      dateInput.min = now.toISOString().slice(0, 10);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var number = (form.dataset.whatsapp || '').replace(/\D/g, '');
      var f = form.elements;
      var lines = ['Hello Active Travel, I would like to make a booking request.', ''];
      [
        ['Name', f.name.value],
        ['Phone / WhatsApp', f.phone.value],
        ['Email', f.email.value],
        ['Service', f.service.value],
        ['From → To', f.route.value],
        ['Travel date', f.date.value],
        ['Message', f.message.value]
      ].forEach(function (row) {
        var value = row[1].trim();
        if (value) lines.push(row[0] + ': ' + value);
      });

      var url = 'https://wa.me/' + number + '?text=' + encodeURIComponent(lines.join('\n'));

      // Open via a temporary link so it counts as a user-initiated new tab
      var link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      link.remove();

      status.textContent = 'WhatsApp is opening with your request — press Send there to deliver it to our team.';
    });
  }

  /* ---------- Pre-fill the form from service / destination links ---------- */
  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-service], [data-route]');
    if (!link || !form) return;
    if (link.dataset.service) form.elements.service.value = link.dataset.service;
    if (link.dataset.route && !form.elements.route.value) {
      var to = link.dataset.route;
      form.elements.route.value = (to === 'Mogadishu' ? '' : 'Mogadishu ') + '→ ' + to;
    }
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
