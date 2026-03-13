(function () {

    /* Custom Cursor */
    var cursor = document.querySelector('.cursor');

    if (cursor) {
        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top  = e.clientY + 'px';
        });

        document.querySelectorAll('.hover-target').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); });
            el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); });
        });
    }

    /* Sticky Navigation */
    var navbar  = document.getElementById('navbar');
    var heroEl  = document.getElementById('hero');
    var backTop = document.querySelector('.back-to-top');

    function onScroll() {
        var threshold = heroEl ? heroEl.offsetHeight - 100 : 200;
        if (window.scrollY > threshold) {
            if (navbar)  navbar.classList.add('visible');
            if (backTop) backTop.classList.add('visible');
        } else {
            if (navbar)  navbar.classList.remove('visible');
            if (backTop) backTop.classList.remove('visible');
        }

        /* Scroll Reveal */
        document.querySelectorAll('.reveal').forEach(function (el) {
            if (el.getBoundingClientRect().top < window.innerHeight * 0.9) {
                el.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    /* Hamburger Menu */
    var hamburger = document.getElementById('hamburger');
    var navLinks  = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            var isOpen = navLinks.classList.toggle('active');
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

    /* Theme Toggle */
    var themeBtn       = document.getElementById('themeBtn');
    var themeColorMeta = document.querySelector('meta[name="theme-color"]');

    function updateThemeColor() {
        if (themeColorMeta) {
            themeColorMeta.setAttribute('content', '#1e6bff');
        }
    }

    var savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function () {
            var current = document.body.getAttribute('data-theme');
            var next    = current === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
            updateThemeColor();
        });
    }

    updateThemeColor();

    /* Scroll Reveal – IntersectionObserver */
    if ('IntersectionObserver' in window) {
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        document.querySelectorAll('.reveal').forEach(function (el) {
            revealObserver.observe(el);
        });
    }

}());