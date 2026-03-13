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

    /* Projekt-Daten */
    var projects = [
        {
            title: 'Monochrome Studios',
            story: 'Ein Streetwear-Label aus Berlin, das auf Minimalismus setzt. Die Herausforderung: Eine Identität zu schaffen, die trotz Reduktion laut ist.',
            desc: 'Das Design nutzt ausschließlich Schwarz und Weiß. Die Typografie ist der Held. Wir haben ein dynamisches Logo entwickelt, das sich auf verschiedenen Kleidungsstücken anpasst.',
            images: [
                'https://images.unsplash.com/photo-1634942537034-2531766767d1?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1200&q=80'
            ]
        },
        {
            title: 'Urban Roast',
            story: 'Kaffee ist Handwerk. Urban Roast brauchte ein Rebranding, das die rohe Atmosphäre der Rösterei einfängt.',
            desc: 'Wir kombinierten industrielle Texturen mit warmen Goldtönen. Die Verpackungen erzählen die Geschichte der Herkunftsländer. Das Design ist haptisch durch Prägungen erlebbar.',
            images: [
                'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80',
                'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80'
            ]
        }
    ];

    var curProj    = 0;
    var curSlide   = 0;
    var modal      = document.getElementById('project-modal');
    var mainImg    = document.getElementById('main-slide');
    var stripTrack = document.getElementById('strip-track');

    function openProject(idx) {
        curProj  = idx;
        curSlide = 0;
        var p = projects[idx];
        document.getElementById('m-title').textContent = p.title;
        document.getElementById('m-story').textContent = p.story;
        document.getElementById('m-desc').textContent  = p.desc;
        updateSlide();
        stripTrack.innerHTML = '';
        var loopImgs = p.images.concat(p.images, p.images);
        loopImgs.forEach(function (src, i) {
            var realIdx = i % p.images.length;
            var img = document.createElement('img');
            img.src       = src;
            img.className = 'strip-thumb hover-target';
            img.alt       = 'Projektbild ' + (realIdx + 1);
            img.loading   = 'lazy';
            img.onclick   = function () { curSlide = realIdx; updateSlide(); };
            stripTrack.appendChild(img);
        });
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.getElementById('m-title').focus();
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
        if (mainImg.classList.contains('zoomed')) toggleZoom(mainImg);
    }

    function changeSlide(dir) {
        var p = projects[curProj];
        curSlide += dir;
        if (curSlide < 0) curSlide = p.images.length - 1;
        if (curSlide >= p.images.length) curSlide = 0;
        updateSlide();
    }

    function updateSlide() {
        mainImg.style.opacity = 0;
        setTimeout(function () {
            mainImg.src = projects[curProj].images[curSlide];
            mainImg.alt = 'Projektbild ' + (curSlide + 1) + ' von ' + projects[curProj].images.length;
            mainImg.style.opacity = 1;
        }, 200);
    }

    function toggleZoom(el) {
        el.classList.toggle('zoomed');
    }

    document.addEventListener('keydown', function (e) {
        if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
        if (modal.classList.contains('open') && e.key === 'ArrowRight') changeSlide(1);
        if (modal.classList.contains('open') && e.key === 'ArrowLeft') changeSlide(-1);
    });

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

