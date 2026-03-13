 /* Animated Typography – Hero Title Char Split */
    (function initCharAnimation() {
        var solidEl = document.querySelector('.title-solid');
        if (!solidEl) return;
        var text = solidEl.textContent;
        solidEl.textContent = '';
        var charIndex = 0;
        Array.from(text).forEach(function (char) {
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

    /* Netlify Form Submit Handler */
    (function initFormHandler() {
        var form = document.getElementById('contact-form');
        var successMsg = document.getElementById('form-success');
        if (!form) return;

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = new FormData(form);
            fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString()
            }).then(function () {
                form.style.display = 'none';
                successMsg.hidden = false;
            }).catch(function () {
                form.submit();
            });
        });
    }());

    /* Contact Intro – Staggered headline lines */
    (function initIntroLines() {
        var lines = document.querySelectorAll('.headline-line');
        lines.forEach(function (line, i) {
            line.style.transitionDelay = (i * 0.15) + 's';
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
            { xFreq: 0.00031, yFreq: 0.00019, xAmp: 0.55, yAmp: 0.60, rFreq: 0.00027, phase: 0.0 },
            { xFreq: 0.00021, yFreq: 0.00038, xAmp: 0.50, yAmp: 0.55, rFreq: 0.00041, phase: 2.1 },
            { xFreq: 0.00044, yFreq: 0.00025, xAmp: 0.45, yAmp: 0.50, rFreq: 0.00033, phase: 4.3 }
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

