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
            title: 'Network Orbit',
            story: '<p>Das Projekt umfasst die Logoentwicklung, Farbdefinition, Typografiekonzept sowie die Anwendung des Designs auf verschiedene Geschäftsmaterialien.</p><p>Ziel war die Gestaltung eines konsistenten, professionellen und wiedererkennbaren Markenauftritts.</p><h4>Design-Begründung: Corporate Design Logistik</h4><ul><li><strong>Symbolik der Effizienz:</strong> Das Logo wurde so entwickelt, dass es Dynamik und Schnelligkeit vermittelt, um die Kernkompetenzen eines modernen Logistikunternehmens visuell zu transportieren.</li><li><strong>Farbpsychologie:</strong> Die Wahl eines klaren, technischen Farbschemas unterstreicht die Verlässlichkeit und Professionalität, die im Transportwesen essenziell sind.</li><li><strong>Typografie:</strong> Ein robustes Schriftsatzkonzept garantiert maximale Lesbarkeit auf unterschiedlichsten Skalierungen – von der Visitenkarte bis hin zur Fahrzeugbeschriftung.</li><li><strong>Visuelle Konsistenz:</strong> Durch die Definition von Gestaltungsrastern wird ein einheitlicher Auftritt über alle Geschäftsmaterialien hinweg sichergestellt, was das Markenvertrauen stärkt.</li><li><strong>Strukturierte Hierarchie:</strong> Das Design folgt einer funktionalen Logik, die Informationen klar gliedert und so die Effizienz der Kommunikation erhöht.</li></ul><p>Software: Adobe Illustrator, Adobe InDesign, Adobe Photoshop</p>',
            desc: 'Entwicklung eines vollständigen Corporate Designs für ein fiktives Logistikunternehmen – von der Namensfindung bis zur finalen Gestaltung des Erscheinungsbildes.',
            images: [
                'assets/images/branding/corperate/orbit/network_orbit_logo.webp',
                'assets/images/branding/corperate/orbit/network_orbit_logo.webp','assets/images/branding/corperate/orbit/entwurf_logos.webp','assets/images/branding/corperate/orbit/business_cards_01.webp','assets/images/branding/corperate/orbit/business_card_front.webp','assets/images/branding/corperate/orbit/business_card_02.webp','assets/images/branding/corperate/orbit/briefbogen.webp',
                'assets/images/branding/corperate/orbit/truck_logo.webp'
            ]
        },
        {
            title: 'Deutscher Tierschutzverbund e.V.',
            story: '<h4>Warum das Design so gewählt wurde</h4><ul><li><strong>Symbolik Hase:</strong> Der Hase steht für Schutzbedürftigkeit, Nähe zum Menschen und Naturverbundenheit. Als vertrautes Tier schafft er sofort emotionale Identifikation, ohne visuell zu überladen.</li><li><strong>Farbwahl Grün:</strong>Grün transportiert intuitiv Werte wie Natur, Leben und Verantwortung. Der gewählte Ton wirkt ruhig und vertrauenswürdig statt laut oder aktivistisch.</li><li><strong>Präzise Linienführung:</strong>Die einlinige Illustration sorgt für Klarheit, hohe Wiedererkennbarkeit und eine zeitgemäße, zugängliche Ästhetik.</li><li><strong>Visuelle Einfachheit:</strong>Die Reduktion auf das Wesentliche stärkt die Aussage und verhindert visuelle Überforderung – besonders im sensiblen Kontext des Tierschutzes.</li><li><strong>Skalierbarkeit:</strong> Die Reduktion auf das Wesentliche garantiert eine optimale Erkennbarkeit auf allen Medien, von der Visitenkarte bis hin zum digitalen Header.</li></ul><p>Logo Design Software: Adobe Illustrator</p>',
            desc: 'Deutscher Tierschutzverbund e.V.</p><p>Konzeption und Gestaltung einer persönlichen Markenidentität, die handwerkliche Präzision mit einer modernen, grafischen Formsprache verbindet. Das Logo fungiert als prägnantes, vielseitig einsetzbares Erkennungszeichen im Bereich Tierschutz.',
            images: [
                'assets/images/logos/tierschutz/REBRANDING Vorschau.webp',
                'assets/images/logos/tierschutz/logo_groß_01.webp','assets/images/logos/tierschutz/sticker.webp','assets/images/logos/tierschutz/tassen_logo.webp','assets/images/logos/tierschutz/tassen_logo.webp','assets/images/logos/tierschutz/keychain_01.webp','assets/images/logos/tierschutz/website_mockup.webp',
                'assets/images/logos/tierschutz/visitenkarten_01.webp'
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
        document.getElementById('m-story').innerHTML = p.story;
        document.getElementById('m-desc').innerHTML  = p.desc;
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