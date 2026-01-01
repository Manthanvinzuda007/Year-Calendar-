 const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        const wrapper = document.getElementById('main-wrapper');
        const festOverlay = document.getElementById('festival-overlay');
        const gridEl = document.getElementById('calendar-grid');
        const monthNameEl = document.getElementById('month-name');
        
        let currentMonth = 0;
        let currentYear = 2026;
        let isFestivalMode = false;
        let isFestModeGlobal = true;
        let isDarkMode = false;
        let reducedMotion = false;
        let particles = [];
        let animationFrame;

        const festivalData = {
            // JANUARY 2026
            "0-1": { name: "New Year", sub: "Floating Light • Fresh Start", color: "#fdfcf8", accent: "#ffb300", anim: "sunrise" },
            "0-13": { name: "Lohri", sub: "Bonfire Glow • Winter Warmth", color: "#fff3e0", accent: "#ff5722", anim: "bonfire" },
            "0-14": { name: "Makar Sankranti", sub: "Uttarayan • Kites in Sky", color: "#e3f2fd", accent: "#1e88e5", anim: "kites" },
            "0-23": { name: "Basant Panchami", sub: "Saraswati Puja • Yellow Bloom", color: "#fffde7", accent: "#fbc02d", anim: "petals" },
            "0-26": { name: "Republic Day", sub: "Sovereign Pride", color: "#fdfcf8", accent: "#ff9933", anim: "tricolor" },
            
            // FEBRUARY 2026
            "1-15": { name: "Mahashivratri", sub: "Divine Silence • Indigo Night", color: "#1a237e", accent: "#9c27b0", anim: "indigo-night", dark: true },
            
            // MARCH 2026
            "2-3": { name: "Holika Dahan", sub: "Fire Glow • Sparkles", color: "#fff3e0", accent: "#e64a19", anim: "bonfire" },
            "2-4": { name: "Holi", sub: "Pastel Clouds • Festival of Colors", color: "#fff5f8", accent: "#e91e63", anim: "clouds" },
            "2-19": { name: "Gudi Padwa", sub: "Spring Greens • New Energy", color: "#f1f8e9", accent: "#43a047", anim: "growth" },
            "2-26": { name: "Ram Navami", sub: "Golden Rays • Peaceful Devotion", color: "#fff8e1", accent: "#ff8f00", anim: "rays" },
            
            // APRIL 2026
            "3-2": { name: "Hanuman Jayanti", sub: "Strength & Devotion", color: "#fff3e0", accent: "#f4511e", anim: "saffron-aura" },
            "3-14": { name: "Baisakhi", sub: "Harvest Fields • Joy", color: "#fff9c4", accent: "#fbc02d", anim: "harvest" },
            "3-19": { name: "Akshaya Tritiya", sub: "Golden Prosperity", color: "#fffde7", accent: "#ffd700", anim: "bloom" },

            // JULY 2026
            "6-16": { name: "Rath Yatra", sub: "Spiritual Rhythm", color: "#fff3e0", accent: "#e65100", anim: "rhythm" },
            "6-29": { name: "Guru Purnima", sub: "Moonlight • Wisdom", color: "#f5f5f5", accent: "#607d8b", anim: "moonlight" },

            // AUGUST 2026
            "7-15": { name: "Independence Day", sub: "Tricolor Flow", color: "#fdfcf8", accent: "#ff9933", anim: "tricolor-ribbon" },
            "7-26": { name: "Onam", sub: "Floral Rangoli • Harvest", color: "#f1f8e9", accent: "#2e7d32", anim: "floral" },
            "7-28": { name: "Raksha Bandhan", sub: "Bound by Love", color: "#fff8e1", accent: "#ffb300", anim: "threads" },

            // SEPTEMBER 2026
            "8-4": { name: "Janmashtami", sub: "Midnight Blue • Flute Waves", color: "#0d47a1", accent: "#ffd600", anim: "waves", dark: true },
            "8-14": { name: "Ganesh Chaturthi", sub: "Festive Warmth", color: "#fff3e0", accent: "#e64a19", anim: "rays" },

            // OCTOBER 2026
            "9-2": { name: "Gandhi Jayanti", sub: "Khadi • Peaceful Simplicity", color: "#fdfcf8", accent: "#9e9e9e", anim: "minimal" },
            "9-11": { name: "Navratri", sub: "Festive Lights • Rhythm", color: "#fffde7", accent: "#f44336", anim: "glow" },
            "9-20": { name: "Dussehra", sub: "Victory of Light", color: "#fff3e0", accent: "#f4511e", anim: "rays" },

            // NOVEMBER 2026
            "10-8": { name: "Diwali", sub: "The Festival of Lights", color: "#121212", accent: "#ffd700", anim: "diyas", dark: true },
            "10-15": { name: "Chhath Puja", sub: "Rising Sun • Serenity", color: "#fff8e1", accent: "#ff6f00", anim: "sunrise" },

            // DECEMBER 2026
            "11-25": { name: "Christmas", sub: "Cozy Winter Warmth", color: "#f8f9fa", accent: "#c62828", anim: "snow" }
        };

        function initCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        }

        class Particle {
            constructor(theme) { this.reset(theme); }
            reset(theme) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4;
                this.theme = theme;
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-fest').trim();
                
                if (theme === 'kites') {
                    this.x = canvas.width + 100;
                    this.vx = -1.2 - Math.random();
                    this.size = 12;
                } else if (theme === 'diyas' || theme === 'bonfire') {
                    this.vy = -0.5 - Math.random() * 0.5;
                    this.vx = (Math.random() - 0.5) * 0.2;
                } else if (theme === 'snow') {
                    this.vy = 1 + Math.random();
                    this.vx = Math.sin(Math.random()) * 0.5;
                } else if (theme === 'clouds') {
                    this.size = 150 + Math.random() * 150;
                    this.opacity = 0.08;
                    this.vx = 0.3;
                } else if (theme === 'tricolor') {
                    this.color = ['#FF9933', '#FFFFFF', '#138808'][Math.floor(Math.random() * 3)];
                }
            }
            update() {
                if (reducedMotion) return;
                this.x += this.vx;
                this.y += this.vy;
                if (this.y < -100) this.y = canvas.height + 100;
                if (this.y > canvas.height + 100) this.y = -100;
                if (this.x < -100) this.x = canvas.width + 100;
                if (this.x > canvas.width + 100) this.x = -100;
            }
            draw() {
                ctx.beginPath();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                if (this.theme === 'kites') {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(Math.PI / 4);
                    ctx.fillRect(0, 0, this.size, this.size);
                    ctx.restore();
                } else if (this.theme === 'rays' || this.theme === 'sunrise') {
                    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 30);
                    g.addColorStop(0, this.color); g.addColorStop(1, 'transparent');
                    ctx.fillStyle = g;
                    ctx.arc(this.x, this.y, this.size * 30, 0, Math.PI * 2); ctx.fill();
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill();
                }
            }
        }

        function createParticles(theme = 'minimal') {
            particles = [];
            const count = (theme === 'minimal' || reducedMotion) ? 30 : 80;
            for (let i = 0; i < count; i++) particles.push(new Particle(theme));
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => { p.update(); p.draw(); });
            animationFrame = requestAnimationFrame(animate);
        }

        function renderCalendar() {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            monthNameEl.innerText = months[currentMonth];
            gridEl.innerHTML = '';
            
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(l => {
                const d = document.createElement('div');
                d.className = 'day-label'; d.innerText = l;
                gridEl.appendChild(d);
            });

            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) gridEl.appendChild(document.createElement('div'));

            for (let d = 1; d <= totalDays; d++) {
                const cell = document.createElement('div');
                const festKey = `${currentMonth}-${d}`;
                const festival = festivalData[festKey];
                
                cell.className = 'date-cell';
                if (festival && isFestModeGlobal) cell.classList.add('is-festival');
                cell.innerText = d;
                cell.onclick = () => { if (festival && isFestModeGlobal) enterFestivalMode(festival); };
                gridEl.appendChild(cell);
            }
        }

        function enterFestivalMode(fest) {
            isFestivalMode = true;
            wrapper.classList.add('festival-mode');
            festOverlay.classList.add('active');
            document.getElementById('fest-name-display').innerText = fest.name;
            document.getElementById('fest-sub-display').innerText = fest.sub;
            
            document.body.style.backgroundColor = fest.color;
            document.documentElement.style.setProperty('--accent-fest', fest.accent);
            document.documentElement.style.setProperty('--text-main', fest.dark ? '#ffffff' : (isDarkMode ? '#e0e0e0' : '#333333'));
            
            createParticles(fest.anim);
        }

        function exitFestivalMode() {
            isFestivalMode = false;
            wrapper.classList.remove('festival-mode');
            festOverlay.classList.remove('active');
            
            document.body.style.backgroundColor = isDarkMode ? '#121212' : '#fdfcf8';
            document.documentElement.style.setProperty('--accent-fest', isDarkMode ? '#ffd700' : '#e07a5f');
            document.documentElement.style.setProperty('--text-main', isDarkMode ? '#e0e0e0' : '#333333');
            
            createParticles('minimal');
        }

        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            document.body.classList.toggle('dark-mode', isDarkMode);
            if (!isFestivalMode) exitFestivalMode(); // Refresh styles
        }

        function toggleMotion() {
            reducedMotion = !reducedMotion;
            document.getElementById('motion-toggle').innerText = `Motion: ${reducedMotion ? 'Off' : 'On'}`;
            createParticles(isFestivalMode ? 'fest' : 'minimal');
        }

        function toggleFestModeGlobal() {
            isFestModeGlobal = !isFestModeGlobal;
            document.getElementById('fest-mode-toggle').innerText = `Fest Mode: ${isFestModeGlobal ? 'On' : 'Off'}`;
            renderCalendar();
        }

        function changeMonth(dir) {
            currentMonth += dir;
            if (currentMonth > 11) { currentMonth = 0; currentYear++; }
            if (currentMonth < 0) { currentMonth = 11; currentYear--; }
            document.getElementById('year-label').innerText = `INDIAN HERITAGE • ${currentYear}`;
            renderCalendar();
        }

        window.addEventListener('resize', initCanvas);
        window.onload = () => {
            initCanvas();
            renderCalendar();
            animate();
        };
