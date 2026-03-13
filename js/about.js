/* Animated Typography – Hero Title Char Split */
    (function initCharAnimation() {
        var solidEl = document.querySelector('.title-solid');
        if (!solidEl) return;
        var solidText = solidEl.textContent;
        solidEl.textContent = '';
        var charIndex = 0;
        Array.from(solidText).forEach(function (char) {
            if (char === ' ') {
                solidEl.appendChild(document.createTextNode('\u00A0'));
            } else {
                var span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                span.style.animationDelay = (0.1 + charIndex * 0.06) + 's';
                solidEl.appendChild(span);
                charIndex++;
            }
        });

        var outlineEl = document.querySelector('.title-outline');
        if (!outlineEl) return;
        var outlineText = outlineEl.textContent;
        outlineEl.textContent = '';
        Array.from(outlineText).forEach(function (char) {
            if (char === ' ') {
                outlineEl.appendChild(document.createTextNode('\u00A0'));
            } else {
                var span = document.createElement('span');
                span.className = 'char';
                span.textContent = char;
                span.style.animationDelay = (0.35 + charIndex * 0.06) + 's';
                outlineEl.appendChild(span);
                charIndex++;
            }
        });
    }());

    /* Parallax – Hero Content */
    (function initParallax() {
        var heroContent = document.querySelector('.hero-content');
        if (!heroContent) return;
        window.addEventListener('scroll', function () {
            heroContent.style.transform = 'translateY(' + (window.scrollY * 0.18) + 'px)';
        }, { passive: true });
    }());

    /* Accordion */
    (function initAccordion() {
        document.querySelectorAll('.accordion-header').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var content = this.nextElementSibling;
                var isOpen = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', String(!isOpen));
                this.classList.toggle('active', !isOpen);
                content.style.maxHeight = isOpen ? null : content.scrollHeight + 'px';
            });
        });
    }());

    /* Lavalampen Blob Animation */
    (function () {
        var section = document.getElementById('mainblob');
        var blobs = [
            document.querySelector('.blob--1'),
            document.querySelector('.blob--2'),
            document.querySelector('.blob--3')
        ];

        if (!section || !blobs[0]) return;

        var configs = [
            { xFreq: 0.000155, yFreq: 0.000095, xAmp: 0.55, yAmp: 0.60, rFreq: 0.000135, phase: 0.0 },
            { xFreq: 0.000105, yFreq: 0.000190, xAmp: 0.50, yAmp: 0.55, rFreq: 0.000205, phase: 2.1 },
            { xFreq: 0.000220, yFreq: 0.000125, xAmp: 0.45, yAmp: 0.50, rFreq: 0.000165, phase: 4.3 }
        ];

        function radii(t, freq) {
            var s = Math.sin(t * freq);
            var c = Math.cos(t * freq * 1.3);
            var a = Math.round(50 + s * 18);
            var b = 100 - a;
            var d = Math.round(50 + c * 14);
            var e = 100 - d;
            var f = Math.round(50 + Math.sin(t * freq * 0.7) * 16);
            var g = 100 - f;
            var h = Math.round(50 + Math.cos(t * freq * 1.7) * 12);
            var i = 100 - h;
            return a + '% ' + b + '% ' + d + '% ' + e + '% / ' + f + '% ' + g + '% ' + h + '% ' + i + '%';
        }

        function tick(t) {
            var sw = section.offsetWidth;
            var sh = section.offsetHeight;

            blobs.forEach(function (blob, idx) {
                var cfg  = configs[idx];
                var bw   = blob.offsetWidth;
                var bh   = blob.offsetHeight;
                var maxX = sw - bw;
                var maxY = sh - bh;
                var tt   = t + cfg.phase * 1000;
                var x    = ((Math.sin(tt * cfg.xFreq) + 1) / 2) * maxX;
                var y    = ((Math.cos(tt * cfg.yFreq) + 1) / 2) * maxY;
                blob.style.transform    = 'translate(' + Math.round(x) + 'px, ' + Math.round(y) + 'px)';
                blob.style.borderRadius = radii(tt, cfg.rFreq);
            });

            requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }());


    /* Typing Dots – Intro Heading */
    (function initTypingDots() {
        var el = document.querySelector('.typing-dots');
        if (!el) return;
        var states = ['.', '..', '...'];
        var idx = 0;
        el.textContent = states[idx];
        setInterval(function () {
            idx = (idx + 1) % states.length;
            el.textContent = states[idx];
        }, 520);
    }());