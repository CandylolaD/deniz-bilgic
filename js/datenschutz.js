/* Datenschutz Page */
(function () {

    const navbar = document.getElementById('navbar');
    const backToTop = document.querySelector('.back-to-top');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const themeBtn = document.getElementById('themeBtn');
    const hoverTargets = document.querySelectorAll('.hover-target');
    const cursor = document.querySelector('.cursor');
    const reveals = document.querySelectorAll('.reveal:not(.active)');

    function onScroll() {
        const y = window.scrollY;

        if (navbar) {
            if (y > 80) navbar.classList.add('visible');
            else navbar.classList.remove('visible');
        }

        if (backToTop) {
            if (y > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        }

        reveals.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            const isOpen = navLinks.classList.toggle('active');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            const current = document.body.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    if (cursor) {
        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        hoverTargets.forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); });
            el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

})();