(function () {
        var section  = document.getElementById('portfolio');
        var blobs    = [
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
    })();
 
(function () {
    var fills = document.querySelectorAll('.skill-fill');
    if (!fills.length) return;

    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                var el = entry.target;
                var w = el.getAttribute('data-width');
                el.style.width = w + '%';
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(function (fill) { observer.observe(fill); });
})();

(function () {
    var STORAGE_KEY = 'cookie_notice_seen';
    var banner = document.getElementById('cookie-banner');
    var acceptBtn = document.getElementById('cookie-accept');

    if (!banner || !acceptBtn) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    banner.removeAttribute('hidden');

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            banner.classList.add('cookie-visible');
        });
    });

    function dismiss() {
        banner.classList.remove('cookie-visible');
        banner.classList.add('cookie-hide');
        localStorage.setItem(STORAGE_KEY, '1');
        banner.addEventListener('transitionend', function () {
            banner.setAttribute('hidden', '');
        }, { once: true });
    }

    acceptBtn.addEventListener('click', dismiss);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && banner.classList.contains('cookie-visible')) {
            dismiss();
        }
    });
})();