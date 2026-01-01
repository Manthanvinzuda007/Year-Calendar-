        const canvas = document.getElementById('bg-canvas');
        const ctx = canvas.getContext('2d');
        const page = document.getElementById('calendar-page');
        const overlay = document.getElementById('fest-overlay');
        const grid = document.getElementById('calendar-grid');
        const monthTitle = document.getElementById('month-display');
        const clockEl = document.getElementById('realtime-clock');

        let currentMonth = 0;
        let currentYear = 2026;
        let isSeasonalOn = true;
        let isMotionOn = true;
        let isPreviewMode = false;
        let particles = [];
        let animationFrame;
        let activeTheme = 'winter';
        let globalTime = 0;

        const specialDays = {
            "0-1": { name: "New Year", sub: "Fresh Beginnings • 2026", color: "#fdfcf8", accent: "#ffb300", anim: "newyear" },
            "0-13": { name: "Lohri", sub: "Harvest Warmth • Rising Embers", color: "#fff3e0", accent: "#ff5722", anim: "lohri" },
            "0-14": { name: "Uttarayan", sub: "Makar Sankranti • Sky of Kites", color: "#e3f2fd", accent: "#03a9f4", anim: "kites" },
            "0-23": { name: "Basant Panchami", sub: "Saraswati Puja • Yellow Bloom", color: "#fffde7", accent: "#fbc02d", anim: "petals" },
            "0-26": { name: "Republic Day", sub: "Red Fort • Constitution Pride", color: "#fdfcf8", accent: "#ff9933", anim: "republic" },
            "1-15": { name: "Mahashivratri", sub: "Midnight Devotion • Lord Shiva", color: "#1a1a2e", accent: "#9c27b0", anim: "shiva", dark: true },
            "2-3": { name: "Holika Dahan", sub: "Victory of Good • Fire Sparks", color: "#fff3e0", accent: "#ff7043", anim: "lohri" },
            "2-4": { name: "Holi", sub: "Festival of Colors", color: "#fff5f8", accent: "#e91e63", anim: "holi" },
            "2-19": { name: "Ugadi", sub: "Gudi Padwa • New Growth", color: "#f1f8e9", accent: "#43a047", anim: "growth" },
            "2-23": { name: "Shaheed Diwas", sub: "Respect • Courage • Sacrifice", color: "#121212", accent: "#757575", anim: "martyr", dark: true },
            "2-26": { name: "Ram Navami", sub: "Dharma • Lord Ram Aura", color: "#fff8e1", accent: "#fb8c00", anim: "ram" },
            "3-14": { name: "Ambedkar Jayanti", sub: "Equality • Constitution", color: "#f0f4ff", accent: "#000080", anim: "ambedkar" },
            "3-14-B": { name: "Baisakhi", sub: "Golden Harvest Joy", color: "#fffde7", accent: "#fbc02d", anim: "harvest" },
            "3-19": { name: "Akshaya Tritiya", sub: "Golden Prosperity", color: "#fdfcf8", accent: "#ffd700", anim: "newyear" },
            "6-16": { name: "Rath Yatra", sub: "Chariot of Devotion", color: "#fff3e0", accent: "#e65100", anim: "rath" },
            "6-29": { name: "Guru Purnima", sub: "Wisdom • Moonlight Guidance", color: "#f5f5f5", accent: "#607d8b", anim: "guru" },
            "7-15": { name: "Independence", sub: "Freedom • 15 August", color: "#fdfcf8", accent: "#138808", anim: "independence" },
            "7-17": { name: "Nag Panchami", sub: "Sacred Nature • Belief", color: "#f1f8e9", accent: "#2e7d32", anim: "growth" },
            "7-26": { name: "Onam", sub: "Pookalam • Boat Rhythm", color: "#f1f8e9", accent: "#2e7d32", anim: "onam" },
            "7-28": { name: "Raksha Bandhan", sub: "Emotional Bond • Rakhi", color: "#fff9f0", accent: "#ff6d00", anim: "rakhi" },
            "8-4": { name: "Janmashtami", sub: "Midnight Blue • Lord Krishna", color: "#0d47a1", accent: "#ffd600", anim: "shiva", dark: true },
            "8-14": { name: "Ganesh Chaturthi", sub: "Lord Ganesha • Festive Glow", color: "#fff3e0", accent: "#e64a19", anim: "ganesha" },
            "9-2": { name: "Gandhi Jayanti", sub: "Peace • Charkha Spirit", color: "#fdfcf8", accent: "#757575", anim: "gandhi" },
            "9-20": { name: "Dussehra", sub: "Victory of Good", color: "#fff3e0", accent: "#f4511e", anim: "ram" },
            "9-29": { name: "Karva Chauth", sub: "Moonlight Faith & Love", color: "#1a1a1a", accent: "#f06292", anim: "guru", dark: true },
            "10-8": { name: "Diwali", sub: "The Festival of Lights", color: "#1a1a1a", accent: "#ffd700", anim: "diwali", dark: true },
            "10-14": { name: "Children's Day", sub: "Innocence • Clean Joy", color: "#fdfcf8", accent: "#03a9f4", anim: "kids" },
            "10-15": { name: "Chhath Puja", sub: "Spiritual Calm • Sun Worship", color: "#fff8e1", accent: "#ff6f00", anim: "chhath" },
            "11-25": { name: "Christmas", sub: "Warm Joy • Winter Glow", color: "#fdfcf8", accent: "#c62828", anim: "snow" }
        };

        const seasons = [
            { id: 'winter', months: [11, 0, 1], color: '#f0f4f8' },
            { id: 'summer', months: [2, 3, 4], color: '#fff9e6' },
            { id: 'monsoon', months: [5, 6, 7, 8], color: '#e8f1f2' },
            { id: 'festive', months: [9, 10], color: '#fdfcf8' }
        ];

        class Particle {
            constructor(type) { this.reset(type); }
            reset(type) {
                this.type = type;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.opacity = Math.random() * 0.4;
                this.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-ui').trim();
                this.angle = Math.random() * Math.PI * 2;

                if (type === 'newyear' || type === 'kids') {
                    this.color = `hsl(${Math.random() * 360}, 60%, 60%)`;
                    this.vy = -Math.random() * 2;
                } else if (type === 'monsoon') {
                    this.vy = 8 + Math.random() * 4;
                    this.vx = 0.5;
                    this.color = '#78909c';
                } else if (type === 'lohri') {
                    this.vy = -1.5 - Math.random() * 3;
                    this.vx = (Math.random() - 0.5) * 1;
                    this.color = '#ff7043';
                    this.x = canvas.width / 2 + (Math.random() - 0.5) * 150;
                    this.y = canvas.height;
                } else if (type === 'kites') {
                    this.size = 18;
                    this.vx = -1.8 - Math.random();
                    this.vy = Math.sin(Math.random() * 10) * 0.5;
                    this.x = canvas.width + 100;
                    this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
                } else if (type === 'diwali' || type === 'martyr' || type === 'petals') {
                    this.size = type === 'petals' ? 6 : 10;
                    this.opacity = 0.8;
                    this.vy = type === 'petals' ? 1.2 : -0.4;
                    this.vx = Math.sin(this.angle) * 0.5;
                    this.color = type === 'diwali' ? '#ffd700' : (type === 'petals' ? '#fff176' : '#ffffff');
                } else if (type === 'holi') {
                    this.size = 60 + Math.random() * 60;
                    this.opacity = 0.04;
                    this.color = `hsl(${Math.random() * 360}, 60%, 75%)`;
                }
            }

            update() {
                if (!isMotionOn) return;
                this.x += this.vx; this.y += this.vy;
                if (this.type === 'petals') this.angle += 0.02;
                if (this.y > canvas.height + 100) this.y = -100;
                if (this.y < -100) this.y = canvas.height + 100;
                if (this.x > canvas.width + 100) this.x = -100;
                if (this.x < -100) this.x = canvas.width + 100;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                if (this.type === 'kites') {
                    ctx.translate(this.x, this.y); ctx.rotate(Math.PI/4 + Math.sin(globalTime/20)*0.1);
                    ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
                    ctx.strokeStyle = '#fff'; ctx.lineWidth = 0.5; ctx.strokeRect(-this.size/2, -this.size/2, this.size, this.size);
                } else if (this.type === 'diwali' || this.type === 'martyr') {
                    const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 18);
                    g.addColorStop(0, this.color); g.addColorStop(1, 'transparent');
                    ctx.fillStyle = g; ctx.arc(this.x, this.y, 18, 0, Math.PI*2); ctx.fill();
                } else if (this.type === 'petals') {
                    ctx.translate(this.x, this.y); ctx.rotate(this.angle);
                    ctx.ellipse(0, 0, this.size, this.size/2, 0, 0, Math.PI*2); ctx.fill();
                } else {
                    ctx.arc(this.x, this.y, this.size, 0, Math.PI*2); ctx.fill();
                }
                ctx.restore();
            }
        }

        function drawSilhouettes(type) {
            ctx.save();
            const w = canvas.width; const h = canvas.height;
            const pulse = Math.sin(globalTime / 30) * 0.01;
            ctx.globalAlpha = 0.04 + pulse;

            if (type === 'republic' || type === 'independence') {
                ctx.fillStyle = '#a52a2a';
                ctx.beginPath(); ctx.moveTo(w*0.3, h); ctx.lineTo(w*0.3, h*0.6);
                ctx.lineTo(w*0.35, h*0.55); ctx.lineTo(w*0.65, h*0.55);
                ctx.lineTo(w*0.7, h*0.6); ctx.lineTo(w*0.7, h); ctx.fill();
                
                // Animated Ashoka Chakra
                ctx.globalAlpha = 0.1;
                ctx.strokeStyle = '#000080'; ctx.lineWidth = 1;
                ctx.translate(w/2, h*0.75); ctx.rotate(globalTime / 100);
                ctx.beginPath(); ctx.arc(0, 0, 20, 0, Math.PI*2); ctx.stroke();
                for(let i=0; i<24; i++) { ctx.rotate(Math.PI/12); ctx.moveTo(0,0); ctx.lineTo(20,0); ctx.stroke(); }
            } else if (type === 'ganesha') {
                ctx.fillStyle = '#e64a19';
                ctx.beginPath(); ctx.arc(w/2, h*0.6 + Math.sin(globalTime/40)*5, 65, 0, Math.PI*2); ctx.fill();
                ctx.fillRect(w/2-25, h*0.6, 50, 90);
            } else if (type === 'ram') {
                ctx.strokeStyle = '#fb8c00'; ctx.lineWidth = 3;
                const glow = Math.abs(Math.sin(globalTime/20)) * 10;
                ctx.shadowBlur = glow; ctx.shadowColor = '#fb8c00';
                ctx.beginPath(); ctx.arc(w/2, h/2, 160, Math.PI*0.8, Math.PI*1.2); ctx.stroke();
                // Arrow
                ctx.beginPath(); ctx.moveTo(w/2 - 160, h/2); ctx.lineTo(w/2 - 20, h/2); ctx.stroke();
            } else if (type === 'gandhi') {
                ctx.strokeStyle = '#333'; ctx.lineWidth = 1.5;
                // Charkha Frame
                ctx.strokeRect(w/2 - 100, h*0.7, 200, 5);
                // Rotating Wheel
                ctx.translate(w/2 + 60, h*0.65); ctx.rotate(globalTime / 60);
                ctx.beginPath(); ctx.arc(0, 0, 40, 0, Math.PI*2); ctx.stroke();
                for(let i=0; i<8; i++) { ctx.rotate(Math.PI/4); ctx.moveTo(0,0); ctx.lineTo(40,0); ctx.stroke(); }
            } else if (type === 'chhath' || type === 'growth') {
                const sunY = h*0.7 + Math.sin(globalTime/50)*10;
                const grad = ctx.createRadialGradient(w/2, sunY, 0, w/2, sunY, 120);
                grad.addColorStop(0, 'rgba(255, 111, 0, 0.2)'); grad.addColorStop(1, 'transparent');
                ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(w/2, sunY, 120, 0, Math.PI*2); ctx.fill();
            }
            ctx.restore();
        }

        function createParticles(theme) {
            particles = []; activeTheme = theme;
            const count = (theme === 'holi' || theme === 'winter') ? 40 : 100;
            for(let i=0; i<count; i++) particles.push(new Particle(theme));
        }

        function animate() {
            globalTime++;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Summer Heat Shimmer Effect
            if (activeTheme === 'summer' && isMotionOn) {
                ctx.save();
                ctx.globalAlpha = 0.05;
                for(let i=0; i<5; i++) {
                    ctx.fillStyle = `rgba(255, 235, 59, ${0.1 * Math.sin(globalTime/20 + i)})`;
                    ctx.fillRect(0, canvas.height * (0.2 * i) + Math.sin(globalTime/10)*20, canvas.width, 40);
                }
                ctx.restore();
            }

            if (activeTheme !== 'winter' && activeTheme !== 'summer') drawSilhouettes(activeTheme);
            particles.forEach(p => { p.update(); p.draw(); });
            animationFrame = requestAnimationFrame(animate);
        }

        function applyTheme(dateObj, isPreview = false) {
            const m = dateObj.getMonth(); const d = dateObj.getDate();
            const fest = specialDays[`${m}-${d}`];
            isPreviewMode = isPreview;

            if (isPreview && fest) {
                document.body.classList.add('preview-active');
                overlay.classList.add('active');
                document.getElementById('btn-reset').style.display = 'block';
                document.getElementById('fest-name').innerText = fest.name;
                document.getElementById('fest-sub').innerText = fest.sub;
                document.body.style.backgroundColor = fest.color;
                document.documentElement.style.setProperty('--accent-ui', fest.accent);
                document.documentElement.style.setProperty('--text-main', fest.dark ? '#ffffff' : '#333333');
                createParticles(fest.anim);
            } else {
                const s = seasons.find(s => s.months.includes(m));
                document.body.classList.remove('preview-active');
                overlay.classList.remove('active');
                document.getElementById('btn-reset').style.display = 'none';
                document.body.style.backgroundColor = s.color;
                document.documentElement.style.setProperty('--accent-ui', '#e07a5f');
                document.documentElement.style.setProperty('--text-main', '#333333');
                createParticles(isSeasonalOn ? s.id : 'minimal');
            }
        }

        function exitFestMode() { applyTheme(new Date(currentYear, currentMonth, 1), false); }

        function renderCalendar() {
            const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
            monthTitle.innerText = months[currentMonth]; clockEl.innerText = `LIVE • 1 ${months[currentMonth].toUpperCase()} 2026`;
            grid.innerHTML = '';
            ['S', 'M', 'T', 'W', 'T', 'F', 'S'].forEach(l => {
                const d = document.createElement('div'); d.className = 'text-[10px] text-gray-400 tracking-widest pb-4'; d.innerText = l; grid.appendChild(d);
            });
            const first = new Date(currentYear, currentMonth, 1).getDay();
            const total = new Date(currentYear, currentMonth + 1, 0).getDate();
            for(let i=0; i<first; i++) grid.appendChild(document.createElement('div'));
            for(let d=1; d<=total; d++) {
                const cell = document.createElement('div'); const special = specialDays[`${currentMonth}-${d}`];
                cell.className = 'date-cell'; cell.innerText = d; if (special) cell.classList.add('is-special');
                cell.onclick = () => special ? applyTheme(new Date(2026, currentMonth, d), true) : exitFestMode();
                grid.appendChild(cell);
            }
        }

        function turnPage(dir) {
            page.classList.add('page-flip-exit');
            setTimeout(() => {
                currentMonth += dir; if(currentMonth>11){currentMonth=0;currentYear++;} if(currentMonth<0){currentMonth=11;currentYear--;}
                renderCalendar(); applyTheme(new Date(currentYear, currentMonth, 1), false);
                page.classList.remove('page-flip-exit'); page.classList.add('page-flip-enter');
                setTimeout(() => page.classList.remove('page-flip-enter'), 50);
            }, 500);
        }

        function resetToToday() { currentMonth = 0; currentYear = 2026; renderCalendar(); applyTheme(new Date(2026, 0, 1), true); }
        function toggleSeasonal() { isSeasonalOn = !isSeasonalOn; document.getElementById('btn-season').innerText = `Seasonal: ${isSeasonalOn?'On':'Off'}`; applyTheme(new Date(currentYear, currentMonth, 1), false); }
        function toggleMotion() { isMotionOn = !isMotionOn; document.getElementById('btn-motion').innerText = `Motion: ${isMotionOn?'On':'Off'}`; }

        window.onresize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.onload = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; resetToToday(); animate(); };
