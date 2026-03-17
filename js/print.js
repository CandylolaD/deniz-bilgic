(function () {
        var section  = document.getElementById('mainblob');
        var blobs    = [
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
    })();


    /* Goldener Schnitt – Hero Hintergrundanimation */
    (function () {
        'use strict';

        var canvas = document.getElementById('goldenCanvas');
        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        var GW = 144, GH = 89;
        var DURATION = 7200;

        var SQUARES = [
            [55, 0,  89],
            [0,  34, 55],
            [0,  0,  34],
            [34, 0,  21],
            [42, 21, 13],
            [34, 26, 8 ],
            [34, 21, 5 ],
            [39, 21, 3 ],
            [40, 24, 2 ],
            [39, 25, 1 ],
            [39, 24, 1 ]
        ];

        var PI = Math.PI;
        var ARCS = [
            [55, 0,  89, 0,        PI / 2   ],
            [55, 34, 55, PI / 2,   PI       ],
            [34, 34, 34, PI,       PI * 3/2 ],
            [34, 21, 21, PI * 3/2, PI * 2   ],
            [42, 21, 13, 0,        PI / 2   ],
            [42, 26, 8,  PI / 2,   PI       ],
            [39, 26, 5,  PI,       PI * 3/2 ],
            [39, 24, 3,  PI * 3/2, PI * 2   ],
            [40, 24, 2,  0,        PI / 2   ],
            [40, 25, 1,  PI / 2,   PI       ],
            [40, 25, 1,  PI,       PI * 3/2 ]
        ];

        var ARC_LENGTHS = ARCS.map(function (a) { return a[2] * PI / 2; });
        var TOTAL_LEN   = ARC_LENGTHS.reduce(function (s, l) { return s + l; }, 0);

        var scale = 1, offX = 0, offY = 0, cssW = 0, cssH = 0;
        var animT0 = null;
        var isComplete = false;

        function setup() {
            var dpr  = window.devicePixelRatio || 1;
            var rect = canvas.getBoundingClientRect();
            cssW = rect.width;
            cssH = rect.height;
            if (cssW === 0 || cssH === 0) return false;
            var pw = Math.round(cssW * dpr);
            var ph = Math.round(cssH * dpr);
            if (canvas.width !== pw || canvas.height !== ph) {
                canvas.width  = pw;
                canvas.height = ph;
            }
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            scale = cssH / GH;
            offX  = cssW - GW * scale;
            offY  = 0;
            return true;
        }

        function tc(gx, gy) { return [offX + gx * scale, offY + gy * scale]; }

        function ease(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }

        function getColors() {
            var dark = document.body.getAttribute('data-theme') === 'dark';
            return {
                line:   dark ? 'rgba(255,215,0,0.55)' : 'rgba(30,107,255,0.55)',
                spiral: dark ? 'rgba(255,215,0,0.75)' : 'rgba(30,107,255,0.80)'
            };
        }

        function applyFlip() {
            var midX = offX + GW * scale / 2;
            ctx.transform(-1, 0, 0, 1, 2 * midX, 0);
        }

        function drawOuterRect(p) {
            if (p <= 0) return;
            var lw = Math.max(0.5, scale * 0.13);
            var tl = tc(0, 0), br = tc(GW, GH);
            var x0 = tl[0], y0 = tl[1], x1 = br[0], y1 = br[1];
            var W = x1 - x0, H = y1 - y0;
            var perim  = 2 * (W + H);
            var target = perim * Math.min(1, p);
            var col    = getColors();
            ctx.save();
            applyFlip();
            ctx.strokeStyle = col.line;
            ctx.lineWidth   = lw;
            ctx.beginPath();
            ctx.moveTo(x0, y0);
            var corners = [[x1, y0], [x1, y1], [x0, y1], [x0, y0]];
            var prev = [x0, y0], drawn = 0;
            for (var i = 0; i < corners.length; i++) {
                var dx  = corners[i][0] - prev[0];
                var dy  = corners[i][1] - prev[1];
                var seg = Math.sqrt(dx * dx + dy * dy);
                if (drawn + seg <= target) {
                    ctx.lineTo(corners[i][0], corners[i][1]);
                    drawn += seg;
                    prev = corners[i];
                } else {
                    var f = (target - drawn) / seg;
                    ctx.lineTo(prev[0] + dx * f, prev[1] + dy * f);
                    break;
                }
            }
            ctx.stroke();
            ctx.restore();
        }

        function drawGridSquares(op) {
            if (op <= 0) return;
            var lw  = Math.max(0.5, scale * 0.13);
            var col = getColors();
            ctx.save();
            applyFlip();
            ctx.globalAlpha = op;
            ctx.strokeStyle = col.line;
            ctx.lineWidth   = lw;
            for (var i = 0; i < SQUARES.length; i++) {
                var sq = SQUARES[i];
                var pt = tc(sq[0], sq[1]);
                ctx.strokeRect(pt[0], pt[1], sq[2] * scale, sq[2] * scale);
            }
            ctx.restore();
        }

        function drawSpiral(p) {
            if (p <= 0) return;
            var lw     = Math.max(0.5, scale * 0.13);
            var target = TOTAL_LEN * p;
            var col    = getColors();
            var a0     = ARCS[0];
            var pt0    = tc(a0[0], a0[1]);
            ctx.save();
            applyFlip();
            ctx.strokeStyle = col.spiral;
            ctx.lineWidth   = lw;
            ctx.lineCap     = 'round';
            ctx.lineJoin    = 'round';
            ctx.beginPath();
            ctx.moveTo(pt0[0] + a0[2] * scale * Math.cos(a0[3]), pt0[1] + a0[2] * scale * Math.sin(a0[3]));
            var drawn = 0;
            for (var i = 0; i < ARCS.length && drawn < target; i++) {
                var a    = ARCS[i];
                var len  = ARC_LENGTHS[i];
                var rem  = target - drawn;
                var frac = Math.min(1, rem / len);
                var endA = a[3] + (a[4] - a[3]) * frac;
                var pt   = tc(a[0], a[1]);
                ctx.arc(pt[0], pt[1], a[2] * scale, a[3], endA, false);
                drawn += len * frac;
            }
            ctx.stroke();
            ctx.restore();
        }

        function draw(t) {
            ctx.clearRect(0, 0, cssW, cssH);
            drawOuterRect(Math.min(1, t / 0.28));
            drawGridSquares(Math.max(0, Math.min(1, (t - 0.18) / 0.37)));
            drawSpiral(Math.max(0, Math.min(1, (t - 0.42) / 0.58)));
        }

        function renderFrame(ts) {
            if (!animT0) animT0 = ts;
            var raw = Math.min(1, (ts - animT0) / DURATION);
            var t   = ease(raw);
            if (!setup()) {
                if (raw < 1) requestAnimationFrame(renderFrame);
                return;
            }
            draw(t);
            if (raw < 1) {
                requestAnimationFrame(renderFrame);
            } else {
                isComplete = true;
            }
        }

        function redrawStatic() {
            if (!isComplete) return;
            if (!setup()) return;
            draw(1);
        }

        window.addEventListener('resize', function () {
            if (isComplete) redrawStatic();
        }, { passive: true });

        document.getElementById('themeBtn').addEventListener('click', function () {
            setTimeout(redrawStatic, 60);
        });

        requestAnimationFrame(renderFrame);
    }());

    /* Projektdaten */
    var projects = {
        magazin: [
            { title: "MAGAZIN: \"MUSE\"", subtitle: "Fiktive Magazin Gestaltung", desc: "Cover, Seiten-Layout & Typografie", contextLabel: "Gestaltungsziel nach festen Vorgaben", story: "<p>Konzeption und Gestaltung eines fiktiven Magazins f\u00fcr eine Musikschule mit Fokus auf Layout, Typografie und visuelle Hierarchie.<br>Das Design wurde zielgruppenorientiert entwickelt und spiegelt die Vielfalt der Musikrichtungen wie Klassik, Pop und Jazz wider.</p><p>Der Projektumfang umfasst die Gestaltung des Magazinlayouts, Coverdesign, Inhaltsseiten sowie ein konsistentes Farb- und Typografiekonzept.</p><p>Ziel war die Entwicklung eines modernen und klar strukturierten Editorial Designs, das sowohl gestalterisch als auch funktional \u00fcberzeugt.</p><p>Software: Adobe InDesign, Adobe Photoshop</p><h4>Design-Begr\u00fcndung: Muse Musikmagazin</h4><ul><li><strong>Zielgruppen-Fokus:</strong> Modernes und klar strukturiertes Layout f\u00fcr eine intuitive Nutzerf\u00fchrung und hohe Funktionalit\u00e4t.</li><li><strong>Genre-Visualisierung:</strong> Ein konsistentes Farb- und Typografiekonzept spiegelt die Vielfalt von Klassik, Pop und Jazz wider, ohne den roten Faden zu verlieren.</li><li><strong>Visuelle Hierarchie:</strong> Bewusster Einsatz von Wei\u00dfraum und starker Typografie, um komplexe Inhalte (Inhaltsseiten, Editorial) schnell erfassbar zu machen.</li><li><strong>Professionalit\u00e4t:</strong> Kombination aus Adobe InDesign und Photoshop f\u00fcr ein hochwertiges, druckreifes Finish (Print Design).</li></ul>", imgs: ["assets/images/magazin/1vorschaubild.png", "assets/images/magazin/2magazin.png", "assets/images/magazin/3ersteseite.png", "assets/images/magazin/4seite.png", "assets/images/magazin/5seite.png", "assets/images/magazin/6seite.png", "assets/images/magazin/7mockup.png", "assets/images/magazin/8mockup.png", "assets/images/magazin/9typo.png"] },
            { title: "Surfermagazin \"Wave\"", subtitle: "Fiktive Magazin Gestaltung", desc: "Magazin-Cover, Layout & Typografie", contextLabel: "Gestaltungsziel nach festen Vorgaben", story: "<p>Gestaltung eines fiktiven Buch-Cover zum Thema Altered Beast mit Schwerpunkt auf Bildwirkung, Layout und Typografie.<br>Es wurden drei unterschiedliche Covervarianten entwickelt: illustrativ, fotografisch und typografisch.</p><p>Der Fokus lag auf einer dynamischen Gestaltung, klarer visueller Struktur und einer modernen Editorial-Umsetzung passend zur Zielgruppe.</p><p>Software: Adobe InDesign, Adobe Photoshop</p><h4>Magazin-Cover (Hawaii)</h4><ul><li><strong>Fotografisch:</strong> VW-Bully und wei\u00dfer Rand f\u00fcr einen aufger\u00e4umten Surfer-Look. Farben aus dem Foto sorgen f\u00fcr Harmonie.</li><li><strong>Typografisch:</strong> Fokus auf \u201eAloha\u201c-Schriftzug mit Blumenmuster, um sofortiges Urlaubs- und Postkarten-Feeling zu wecken.</li><li><strong>Illustrativ:</strong> Tiki-Maske vor dunklem Sonnenuntergang, um die Mystik und Spannung der einheimischen Kultur zu betonen.</li></ul>", imgs: ["assets/images/magazin/wave/wave.webp", "assets/images/magazin/wave/wave_01.webp", "assets/images/magazin/wave/wave_02.webp", "assets/images/magazin/wave/wave_03.webp","assets/images/magazin/wave/wave_04.webp","assets/images/magazin/wave/wave_05.webp" ] },
            { title: "Altered Beast", subtitle: "Buch Cover Design", desc: "Buch-Cover, Layout & Typografie", contextLabel: "Handgezeichnete Illustration", story: "<p>Diese Arbeit ist inspiriert vom klassischen Arcade-Spiel Altered Beast.</p><p>Die Illustration wurde zun\u00e4chst traditionell skizziert und anschlie\u00dfend digital in Adobe Photoshop ausgearbeitet.</p><p>Das Projekt ist eine freie, fiktive Konzeptarbeit und dient der Weiterentwicklung meiner F\u00e4higkeiten</p><p>Software: Adobe Photoshop</p><h4>Design-Begr\u00fcndung</h4><ul><li><strong>Fokus Bestie:</strong> Fokus auf das Wilde und Monstr\u00f6se durch scharfe Z\u00e4hne, Krallen und einen energetischen Blauverlauf.</li><li><strong>Helden-Transformation:</strong> Visualisierung der \u201ezwei Seiten einer Medaille\u201c durch einen Kalt-Warm-Kontrast: Blaugrau\u202fRoyalblau f\u00fcr die heroische menschliche Seite und warme Gelb-\u202fRott\u00f6ne f\u00fcr die Bestie.</li><li><strong>Typografie:</strong> Verwendung einer antik anmutenden Schriftart und Kupfer-Optik um das antike Setting im antiken zu unterstreichen.</li><li><strong>Zielgruppen-Look:</strong> Umsetzung in einem kraftvollen \u201e\u00d6lgem\u00e4lde-Look\u201c, um Retrogamer und Sammler innerhalb der SEGA Forever-Kollektion anzusprechen.</li></ul>", imgs: ["assets/images/cover/altered_Beast/Beast_Vorschau.webp", "assets/images/cover/altered_Beast/alrered_beast_cover.webp", "assets/images/cover/altered_Beast/altered_beast_02.webp", "assets/images/cover/altered_Beast/altered_beast_cover_03.webp","assets/images/cover/altered_Beast/aussenwerbung_01.webp","assets/images/cover/altered_Beast/aussenwerbung_02.webp","assets/images/cover/altered_Beast/cover_stappel.webp","assets/images/cover/altered_Beast/kapitel_01_02.webp","assets/images/cover/altered_Beast/kapitel_01.webp","assets/images/cover/altered_Beast/kapitel_02_02.webp","assets/images/cover/altered_Beast/kapitel_02.webp","assets/images/cover/altered_Beast/magazine_mockup_01.webp","assets/images/cover/altered_Beast/Abschluss_12_Deniz_Bilgic Kopie-1.png","assets/images/cover/altered_Beast/Beast Prime Kopie.png","assets/images/cover/altered_Beast/Entwurf Logos AB Kopie 2.png"] },
        ],
        logos: [
            { title: "Pur Biomarkt", subtitle: "Logo Design", desc: "Fiktive Markenentwicklung", contextLabel: "Branding / Logo Design", story: "<p>Konzeption und Gestaltung eines fiktiven Logos zur Entwicklung einer klaren und modernen Markenidentität.<br>Der Fokus lag auf Wiedererkennbarkeit, Formensprache, Typografie und vielseitiger Einsetzbarkeit in Print- und Digitalmedien.<br>Der gesamte Designprozess – von der Ideenfindung über Skizzen bis zur finalen digitalen Umsetzung, wurde eigenständig durchgeführt<br><br>Software: Adobe Illustrator, Adobe Photoshop</p>", imgs: ["assets/images/logos/bio-markt/vorschau-bio.webp","assets/images/logos/bio-markt/P30C771 Kopie.webp", "assets/images/logos/bio-markt/pur_biomarkt-lineart-29.webp","assets/images/logos/bio-markt/pur_biomarkt-lineart-27.webp","assets/images/logos/bio-markt/pur_biomarkt-lineart_Zeichenfläche 1 Kopie 22.webp","assets/images/logos/bio-markt/pur_biomarkt-lineart_Zeichenfläche 1 Kopie 20.webp","assets/images/logos/bio-markt/pur_biomarkt-lineart_Zeichenfläche 1 Kopie 18.webp",] },
            { title: "Tierschutzverein", subtitle: "Logo Design", desc: "Rebranding Tierschutzverein", contextLabel: "Branding / Logo Design", story: "Organisch und roh.", imgs: ["assets/images/logos/tierschutz/REBRANDING Vorschau.webp", "assets/images/logos/tierschutz/logo_groß_01.webp", "assets/images/logos/tierschutz/logo_hase-entwicklung_01.webp", "assets/images/logos/tierschutz/logo_hase-entwicklung_02.webp","assets/images/logos/tierschutz/tassen_logo.webp","assets/images/logos/tierschutz/tassen.webp","assets/images/logos/tierschutz/visitenkarten_01.webp","assets/images/logos/tierschutz/website_mockup.webp","assets/images/logos/tierschutz/sticker.webp","assets/images/logos/tierschutz/keychain_01.webp"] },
            { title: "Black Angus", subtitle: "Logo Design", desc: "Logo rebranding Steak & Burgerhouse", contextLabel: "Branding / Logo Design", story: "<p>Konzeption und Screendesign für den Webauftritt eines gehobenen Steak &amp; Burgerhouses. Ziel des Projekts war die Entwicklung eines modernen „Mobile First“-Interfaces, das Appetit weckt und eine intuitive Reservierung ermöglicht.</p><h4>Warum das Design so gewählt wurde</h4><ul><li><strong>Hochwertige Bildsprache:</strong> Der Einsatz kontrastreicher Food-Fotografie steht im Fokus, um die Qualität der Produkte unmittelbar erlebbar zu machen.</li><li><strong>Farbspektrum:</strong> Dunkle Hintergründe in Kombination mit warmen Akzenttönen (z. B. Gold oder Rostrot) unterstreichen den exklusiven Charakter des Restaurants.</li><li><strong>Typografisches Konzept:</strong> Eine Mischung aus markanten Serif-Schriften für Headlines und klaren Sans-Serif-Schriften für den Lesetext sorgt für eine elegante visuelle Hierarchie.</li><li><strong>User Experience (UX):</strong> Die Gestaltung folgt einem klaren Raster, das eine einfache Navigation und schnelle Orientierung zwischen Menükarte, Standort und Buchungssystem garantiert.</li><li><strong>Atmosphäre:</strong> Durch gezielte Lichteffekte und Texturen im Design wird das Ambiente des Gastraums digital übersetzt, um beim Nutzer Vorfreude auf den Besuch zu wecken.</li></ul><p>Software: Adobe Photoshop / Adobe Illustrator</p>", imgs: ["assets/images/logos/blackangus/Bulllogo_Vorschau.webp", "assets/images/logos/blackangus/Bulllogo_trans.webp", "assets/images/logos/blackangus/Bulllogo .webp", "assets/images/logos/blackangus/black angus 2 Kopie.webp","assets/images/logos/blackangus/set_2 Kopie 3.webp","assets/images/logos/blackangus/black angus 2 Kopie.webp","assets/images/logos/blackangus/angus3 Kopie.webp"] }
        ],
        poster: [
            { title: "Traum", subtitle: "Plakatgestaltung", desc: "Plakatgestaltung \u2013 TRAUM", contextLabel: "Digitale Plakatgestaltung", story: "<p>Dieses Plakat ist eine visuelle Auseinandersetzung mit dem Thema Tr\u00e4ume und Unterbewusstsein. Ziel war es, eine surreale, fast architektonische Tiefe zu schaffen, die den Betrachter in eine andere Ebene zieht.</p><p>Software: Adobe Photoshop</p><h4>Warum das Design so gew\u00e4hlt wurde</h4><ul><li><strong>Zentralperspektive:</strong> Die symmetrische Fluchtlinie erzeugt eine starke Sogwirkung und symbolisiert den Weg in die eigene Traumwelt.</li><li><strong>Licht &amp; Kontrast:</strong> Die leuchtenden, wei\u00dfen Monolithen vor dem dunklen Sternenhimmel stehen f\u00fcr Klarheit inmitten des Unbekannten.</li><li><strong>Farbakzent:</strong> Der vertikale Regenbogen-Lichtstrahl bricht die monochrome Dunkelheit auf und verleiht dem Ganzen eine magische, energetische Note.</li><li><strong>Typografie:</strong> Der Schriftzug \u201eTRAUM\u201c ist in einer sehr feinen, modernen Sans-Serif gehalten, um die Leichtigkeit und Fl\u00fcchtigkeit eines Traumes zu unterstreichen.</li><li><strong>Textur:</strong> Ein feines digitales Rauschen (Noise) wurde hinzugef\u00fcgt, um dem digitalen Design eine organische, fast greifbare Atmosph\u00e4re zu verleihen.</li></ul>", imgs: ["assets/images/cover/traum/traum_plakat.webp","assets/images/cover/traum/traum_plakat.webp"] },
            { title: "Fluid Color Abstract", subtitle: "Digital Art", desc: "Digital Art \u2013 Fluid Color Abstract", contextLabel: "Digitale Illustration", story: "<p>Diese Arbeit ist ein Experiment mit digitalen organischen Formen und dynamischen Farbverl\u00e4ufen. Ziel war es, durch flie\u00dfende Bewegungen eine energetische und moderne \u00c4sthetik zu schaffen.</p><p>Software: Adobe Illustrator (oder Photoshop / digitale Zeichenwerkzeuge)</p><h4>Warum das Design so gew\u00e4hlt wurde</h4><ul><li><strong>Fluide Formen:</strong> Die geschwungene S-Form erzeugt eine starke Dynamik und vermittelt ein Gef\u00fchl von Bewegung und Flexibilit\u00e4t.</li><li><strong>Farbdynamik:</strong> Der Verlauf von strahlendem Gelb \u00fcber Orange zu sattem Magenta schafft einen hohen Kontrast und eine lebendige Ausstrahlung.</li><li><strong>Hintergrundwahl:</strong> Das k\u00fchle Blau im Hintergrund l\u00e4sst die warmen Farben der Form plastisch hervortreten und verst\u00e4rkt den Fokus auf das zentrale Element.</li><li><strong>3D-Effekt:</strong> Durch die gezielte Abstufung der Farbt\u00f6ne entsteht eine r\u00e4umliche Tiefe, die die Grafik wie ein greifbares, dreidimensionales Objekt wirken l\u00e4sst.</li><li><strong>Minimalismus:</strong> Der Verzicht auf Text oder weitere Elemente lenkt die volle Aufmerksamkeit auf das Spiel zwischen Form und Farbe.</li></ul>", imgs: ["assets/images/cover/fluid/Fluid Color Abstract_vorschau.png","assets/images/cover/fluid/Fluid Color Abstract_04.png"] },
             { title: "Alptraum", subtitle: "Plakatgestaltung", desc: "Plakatgestaltung \u2013 ALPTRAUM", contextLabel: "Digitale Plakatgestaltung", story: "<p>Dieses Plakat wurde als Werbemittel für eine fiktive Ausstellung im Museum für Naturkunde Berlin konzipiert. Ziel war es, eine düstere, bedrohliche Atmosphäre zu schaffen, die das Unbehagen eines Albtraums visuell greifbar macht.</p><p>Software: Adobe Photoshop</p><h4>Warum das Design so gew\u00e4hlt wurde</h4><ul><li><strong>Fokus auf das Unheimliche:</strong>Die Reduktion auf Augen und Reißzähne vor schwarzem Hintergrund nutzt die Urangst vor dem Unbekannten in der Dunkelheit </li><li><strong>Symbolik:</strong>Das dritte Auge und die schlangenähnliche, grüne Zunge verleihen der Kreatur eine surreale und giftige Ausstrahlung.</li><li><strong>Farbakzent:</strong>Das aggressive Rot der Typografie und der glühende Gelb-Orange-Verlauf der Augen bilden einen harten Kontrast zum tiefschwarzen Hintergrund.</li><li><strong>Typografie:</strong>Die gewählte Schriftart mit ihren spitzen, dornenartigen Ausläufern unterstreicht den gefährlichen und „mörderischen“ Charakter des Motivs.</li><li><strong>Rahmung:</strong>Der unregelmäßige rote Rand wirkt wie eine Begrenzung des Grauens und fokussiert den Blick des Betrachters direkt auf das Zentrum der Bestie.</li></ul>", imgs: ["assets/images/cover/traum/alptraum_plakat.webp", "assets/images/cover/traum/alptraum_plakat.webp"] },
           
        ]
    };

    /* Grid Renderer – Magazin */
    var magGrid = document.getElementById('grid-magazin');
    projects.magazin.forEach(function (p, i) {
        var card = document.createElement('article');
        card.className = 'mag-card hover-target';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', p.title + ' \u2013 ' + p.desc);
        card.onclick    = function () { openModal('magazin', i); };
        card.onkeydown  = function (e) { if (e.key === 'Enter' || e.key === ' ') openModal('magazin', i); };
        card.innerHTML  =
            '<figure class="mag-img-wrap"><img src="' + p.imgs[0] + '" alt="' + p.title + ' Vorschau" loading="lazy"></figure>' +
            '<div class="mag-info"><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
        magGrid.appendChild(card);
    });

    /* Grid Renderer – Logos */
    var logoGrid = document.getElementById('grid-logos');
    projects.logos.forEach(function (p, i) {
        var card = document.createElement('article');
        card.className = 'logo-card hover-target';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', p.title + ' \u2013 ' + p.desc);
        card.onclick    = function () { openModal('logos', i); };
        card.onkeydown  = function (e) { if (e.key === 'Enter' || e.key === ' ') openModal('logos', i); };
        card.innerHTML  =
            '<figure class="logo-img-wrap"><img src="' + p.imgs[0] + '" alt="' + p.title + ' Logo" loading="lazy"></figure>' +
            '<div class="logo-info"><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
        logoGrid.appendChild(card);
    });

    /* Grid Renderer – Poster */
    var posterGrid = document.getElementById('grid-poster');
    projects.poster.forEach(function (p, i) {
        var card = document.createElement('article');
        card.className = 'poster-card hover-target';
        card.setAttribute('role', 'listitem');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', p.title + ' \u2013 ' + p.desc);
        card.onclick    = function () { openModal('poster', i); };
        card.onkeydown  = function (e) { if (e.key === 'Enter' || e.key === ' ') openModal('poster', i); };
        card.innerHTML  =
            '<img src="' + p.imgs[0] + '" alt="' + p.title + ' Poster" style="width:100%;height:100%;object-fit:contain;" loading="lazy">' +
            '<div class="poster-overlay"><h3>' + p.title + '</h3><p>' + p.desc + '</p></div>';
        posterGrid.appendChild(card);
    });

    /* Modal Logik */
    var modal         = document.getElementById('projectModal');
    var currentImages = [];
    var currentIndex  = 0;

    function openModal(category, index) {
        var p = projects[category][index];
        currentImages = p.imgs.length > 1 ? p.imgs.slice(1) : p.imgs;
        currentIndex  = 0;
        document.getElementById('mTitle').innerText  = p.title;
        document.getElementById('mDesc').innerText   = p.desc;
        document.getElementById('mStory').innerHTML  = p.story;
        var subtitleEl = document.getElementById('mSubtitle');
        var contextLabelEl = document.getElementById('mContextLabel');
        if (p.subtitle) {
            subtitleEl.textContent = p.subtitle;
            subtitleEl.style.display = '';
        } else {
            subtitleEl.textContent = '';
            subtitleEl.style.display = 'none';
        }
        if (p.contextLabel) {
            contextLabelEl.textContent = p.contextLabel;
            contextLabelEl.style.display = '';
        } else {
            contextLabelEl.textContent = '';
            contextLabelEl.style.display = 'none';
        }
        updateMainSlide();
        buildStripGallery();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.getElementById('closeModalBtn').focus();
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    function updateMainSlide() {
        var container = document.getElementById('mainSlideInjector');
        container.innerHTML = '<img src="' + currentImages[currentIndex] + '" class="main-img active" alt="Projektbild ' + (currentIndex + 1) + ' von ' + currentImages.length + '" loading="lazy">';
        document.getElementById('slideCounter').innerText = (currentIndex + 1) + ' / ' + currentImages.length;
    }

    function changeSlide(dir) {
        currentIndex += dir;
        if (currentIndex < 0) currentIndex = currentImages.length - 1;
        if (currentIndex >= currentImages.length) currentIndex = 0;
        updateMainSlide();
    }

    /* Laufende Strip Gallery */
    function buildStripGallery() {
        var marquee = document.getElementById('stripMarquee');
        marquee.innerHTML = '';
        var imagesToRender = currentImages.concat(currentImages, currentImages);
        imagesToRender.forEach(function (src, idx) {
            var img = document.createElement('img');
            img.src       = src;
            img.className = 'strip-img hover-target';
            img.alt       = 'Projektbild Vorschau ' + (idx + 1);
            img.loading   = 'lazy';
            img.setAttribute('role', 'listitem');
            var realIndex = idx % currentImages.length;
            img.onclick   = function () { currentIndex = realIndex; updateMainSlide(); };
            marquee.appendChild(img);
        });
    }

    /* Zoom */
    var zoomOverlay = document.getElementById('zoomOverlay');
    var zoomImg     = document.getElementById('zoomImg');
    var cursorEl    = document.querySelector('.cursor');

    document.getElementById('mainSlideContainer').addEventListener('click', function () {
        zoomImg.src = currentImages[currentIndex];
        zoomOverlay.classList.add('active');
        if (cursorEl) cursorEl.style.display = 'none';
    });

    document.getElementById('closeZoomBtn').addEventListener('click', closeZoom);
    zoomOverlay.addEventListener('click', function (e) {
        if (e.target === zoomOverlay || e.target === zoomImg) closeZoom();
    });

    function closeZoom() {
        zoomOverlay.classList.remove('active');
        if (cursorEl) cursorEl.style.display = 'block';
    }

    document.getElementById('closeModalBtn').addEventListener('click', closeModal);
    document.getElementById('prevBtn').addEventListener('click', function () { changeSlide(-1); });
    document.getElementById('nextBtn').addEventListener('click', function () { changeSlide(1); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (zoomOverlay.classList.contains('active')) closeZoom();
            else if (modal.classList.contains('active')) closeModal();
        }
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowRight') changeSlide(1);
            if (e.key === 'ArrowLeft')  changeSlide(-1);
        }
    });

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

    /* Tilt Effect – Projekt Cards */
    (function initTilt() {
        document.querySelectorAll('.mag-card, .logo-card, .poster-card').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = this.getBoundingClientRect();
                var rotX = (((e.clientY - rect.top)  / rect.height) - 0.5) * -12;
                var rotY = (((e.clientX - rect.left) / rect.width)  - 0.5) * 12;
                this.style.transition = 'transform 0.05s ease';
                this.style.transform  = 'perspective(900px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) translateZ(6px)';
            });
            card.addEventListener('mouseleave', function () {
                this.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.2, 1)';
                this.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
    }());