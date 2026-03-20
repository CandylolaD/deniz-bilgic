(function () {

    /* Custom Cursor */
    var cursor = document.querySelector('.cursor');

    if (cursor && window.matchMedia('(pointer: fine)').matches) {

        cursor.innerHTML = '<svg viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 2L18 11L10 13L6 22L2 2Z" fill="var(--cursor-color)" stroke="var(--bg-color)" stroke-width="1.2" stroke-linejoin="round"/></svg>';

        var TRAIL_COUNT = 8;
        var trails = [];
        var positions = [];
        var mouseX = -200, mouseY = -200;

        for (var i = 0; i < TRAIL_COUNT; i++) {
            var dot = document.createElement('div');
            dot.className = 'cursor-trail';
            var size = Math.round(6 - i * 0.55);
            dot.style.width  = size + 'px';
            dot.style.height = size + 'px';
            dot.style.opacity = (0.55 - i * 0.065).toFixed(2);
            document.body.appendChild(dot);
            trails.push(dot);
            positions.push({ x: -200, y: -200 });
        }

        document.addEventListener('mousemove', function (e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = e.clientX + 'px';
            cursor.style.top  = e.clientY + 'px';
        });

        (function animateTrail() {
            for (var j = 0; j < TRAIL_COUNT; j++) {
                var prev = j === 0 ? { x: mouseX, y: mouseY } : positions[j - 1];
                positions[j].x += (prev.x - positions[j].x) * (0.28 - j * 0.022);
                positions[j].y += (prev.y - positions[j].y) * (0.28 - j * 0.022);
                trails[j].style.left = positions[j].x + 'px';
                trails[j].style.top  = positions[j].y + 'px';
            }
            requestAnimationFrame(animateTrail);
        }());

        document.querySelectorAll('.hover-target').forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursor.classList.add('hovered'); });
            el.addEventListener('mouseleave', function () { cursor.classList.remove('hovered'); });
        });

        document.addEventListener('mousedown', function () { cursor.style.transform = 'scale(0.85)'; });
        document.addEventListener('mouseup',   function () { cursor.style.transform = 'scale(1)'; });
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