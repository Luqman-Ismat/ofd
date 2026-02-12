document.addEventListener('DOMContentLoaded', () => {
    initVOCChart();
    renderHoQ();
    setupInteractions();
});

// 1. Voice of Customer Chart (ECharts)
function initVOCChart() {
    const chartDom = document.getElementById('vocChart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
        backgroundColor: 'transparent',
        title: {
            text: 'Requirement Importance',
            textStyle: { color: '#fff', fontSize: 14 }
        },
        tooltip: { trigger: 'axis' },
        grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
        xAxis: {
            type: 'value',
            splitLine: { lineStyle: { color: '#333' } },
            axisLabel: { color: '#888' }
        },
        yAxis: {
            type: 'category',
            data: ['Price', 'Sound', 'Voice Rec', 'Setup', 'Connectivity', 'Volume', 'Design'],
            axisLabel: { color: '#ddd' }
        },
        series: [
            {
                name: 'Rank Score',
                type: 'bar',
                data: [11, 10, 9, 8, 6, 5, 4],
                itemStyle: { color: '#D4FF00' },
                barWidth: '50%'
            }
        ]
    };
    myChart.setOption(option);

    window.addEventListener('resize', () => myChart.resize());
}

// 2. Render Mega HoQ (Full Structure)
function renderHoQ() {
    // Top Headers (Technical Requirements)
    const engChars = [
        "Wattage capacity", "Processor speed", "Wi-Fi and Bluetooth",
        "Processor reliability and Software stability", "Amplifier capability",
        "Microphone sensitivity and voice recognition algorithms", "Device dimensions",
        "Exterior materials, finishes, and aesthetic design", "Exterior color and finish options",
        "Material selection and internal components", "Price is proportional to product quality"
    ];

    // Left Headers
    const custReqs = [
        "Sound Quality", "Ease of setup", "Connectivity", "Proper Func",
        "Volume Levels", "Voice Rec", "Compact Size", "Appealing",
        "Color Variety", "Lightweight", "Price point"
    ];

    // Core Data (0=None, 1=Weak, 3=Mod, 9=Strong)
    const matrixData = [
        [9, 0, 0, 3, 9, 3, 0, 0, 0, 9, 9],
        [0, 3, 9, 3, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 9, 9, 0, 0, 0, 0, 0, 0, 0],
        [0, 9, 1, 9, 3, 9, 0, 0, 0, 0, 3],
        [1, 0, 0, 0, 9, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 9, 0, 0, 0, 1, 1],
        [3, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
        [3, 0, 0, 0, 0, 0, 3, 9, 9, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 9, 9, 0, 0],
        [1, 0, 0, 0, 0, 0, 1, 0, 0, 9, 0],
        [0, 3, 0, 9, 1, 9, 0, 0, 0, 0, 9]
    ];

    // Right: Competitive Data (G=Good, F=Fair, P=Poor) - Mocked for demo
    const compData = [
        ['G', 'G', 'G'], ['F', 'G', 'F'], ['F', 'G', 'G'], ['G', 'G', 'G'],
        ['G', 'G', 'G'], ['G', 'P', 'G'], ['G', 'G', 'G'], ['P', 'G', 'G'],
        ['G', 'G', 'G'], ['G', 'G', 'G'], ['G', 'P', 'G']
    ];

    // Bottom section: Our Importance Ratings (from QFD calculation)
    const importanceRatings = [43, 174, 133, 318, 167, 243, 14, 50, 45, 111, 230];

    // Target Values (desired specs)
    const techTargets = [
        "15 W", "At least 1.6GHz", "2.4/5 GHz and Bluetooth 5.0", "Regular Software Updates",
        "Has DSP", "At least 3 far-field microphones", "Max Dimension: 100mm",
        "Plastic and fabric", "At least 4 options", "Durable", "Price Range: $40-$60"
    ];

    // Technical Evaluation: Google, Apple, Amazon (per technical requirement)
    const techEvalGoogle = [15, "1.4", "—", "Yes", "Yes", 3, "98mm", "Plastic and fabric", 4, "Yes", "$99"];
    const techEvalApple = [20, "1.6", "—", "Yes", "Yes", 4, "99mm", "Plastic and fabric", 5, "Yes", "$49"];
    const techEvalAmazon = [15, "2", "—", "Yes", "Yes", 4, "100mm", "Plastic and fabric", 4, "Yes", "$49.99"];

    // --- RENDER ---

    // 1. Engineering Headers (Top)
    const headerContainer = document.getElementById('engHeaders');
    // Place a spacer for the first column (Customer Reqs width)
    headerContainer.innerHTML = '<div style="opacity:0"></div>';

    engChars.forEach(char => {
        // Use WRAPPER structure for hover effects without layout shift
        headerContainer.innerHTML += `
            <div class="eng-header-wrapper">
                <div class="eng-header-content">${char}</div>
            </div>`;
    });

    // Right: Competitor column headers (Google, Apple, Amazon)
    headerContainer.innerHTML += '<div class="comp-names-header"><span>Google</span><span>Apple</span><span>Amazon</span></div>';

    // 2. Main Grid (Left, Center, Right)
    const custCol = document.getElementById('custReqsCol');
    const matrixCore = document.getElementById('matrixCore');
    const assessCol = document.getElementById('custAssessCol');

    // Clear
    custCol.innerHTML = ''; matrixCore.innerHTML = ''; assessCol.innerHTML = '';

    custReqs.forEach((req, r) => {
        // Left: Customer Req
        custCol.innerHTML += `<div>${req}</div>`;

        // Center: Relationships
        engChars.forEach((char, c) => {
            const val = matrixData[r][c];
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';

            if (val > 0) {
                const symbol = val === 9 ? '●' : val === 3 ? '○' : '△';
                const sClass = val === 9 ? 'hoq-strong' : val === 3 ? 'hoq-moderate' : 'hoq-weak';
                // Add drill-down click
                cell.setAttribute('onclick', `showContext('${req}', '${char}', ${val})`);
                cell.innerHTML = `<span class="hoq-symbol ${sClass}">${symbol}</span>`;

                // Hover logic
                cell.addEventListener('mouseenter', () => {
                    const logicBox = document.getElementById('logicText');
                    logicBox.innerHTML =
                        `<strong style="color:var(--accent)">${req}</strong> ↔ <strong style="color:#fff">${char}</strong>` +
                        `<br><span style="color:#888; font-size:0.9rem;">Relationship Strength: ${val} (${val === 9 ? 'Strong' : val === 3 ? 'Moderate' : 'Weak'})</span>`;
                });
            }
            matrixCore.appendChild(cell);
        });

        // Right: Assessment
        const compRow = document.createElement('div');
        compRow.className = 'assess-cell-row';
        compRow.style.display = 'contents'; // Use grid from parent

        compData[r].forEach(grade => {
            const acell = document.createElement('div');
            acell.className = 'assess-cell';
            acell.innerText = grade;
            acell.title = grade === 'G' ? 'Good Performance' : grade === 'F' ? 'Fair Performance' : 'Poor Performance';
            if (grade === 'G') acell.style.color = '#4ade80'; // Green
            if (grade === 'F') acell.style.color = '#facc15'; // Yellow
            if (grade === 'P') acell.style.color = '#f87171'; // Red
            assessCol.appendChild(acell);
        });
    });

    // 3. Bottom Section: Importance Ratings, Target Values, Technical Evaluation
    const techContainer = document.getElementById('techTargets');
    techContainer.innerHTML = '';

    // Row 1: Our Importance Ratings
    techContainer.innerHTML += '<div class="tech-target-item tech-label">Our Importance Ratings</div>';
    importanceRatings.forEach(val => {
        techContainer.innerHTML += `<div class="tech-target-item tech-value">${val}</div>`;
    });
    techContainer.innerHTML += '<div class="tech-target-item tech-spacer"></div>';

    // Row 2: Target Values
    techContainer.innerHTML += '<div class="tech-target-item tech-label">Target Values</div>';
    techTargets.forEach(target => {
        techContainer.innerHTML += `<div class="tech-target-item tech-value">${target}</div>`;
    });
    techContainer.innerHTML += '<div class="tech-target-item tech-spacer"></div>';

    // Row 3: Technical Evaluation - Google
    techContainer.innerHTML += '<div class="tech-target-item tech-label">Google</div>';
    techEvalGoogle.forEach(v => {
        techContainer.innerHTML += `<div class="tech-target-item tech-value">${v}</div>`;
    });
    techContainer.innerHTML += '<div class="tech-target-item tech-spacer"></div>';

    // Row 4: Technical Evaluation - Apple
    techContainer.innerHTML += '<div class="tech-target-item tech-label">Apple</div>';
    techEvalApple.forEach(v => {
        techContainer.innerHTML += `<div class="tech-target-item tech-value">${v}</div>`;
    });
    techContainer.innerHTML += '<div class="tech-target-item tech-spacer"></div>';

    // Row 5: Technical Evaluation - Amazon
    techContainer.innerHTML += '<div class="tech-target-item tech-label">Amazon</div>';
    techEvalAmazon.forEach(v => {
        techContainer.innerHTML += `<div class="tech-target-item tech-value">${v}</div>`;
    });
    techContainer.innerHTML += '<div class="tech-target-item tech-spacer"></div>';

    // 5. Roof (SVG Correlation Matrix)
    const roofContainer = document.getElementById('hoqRoof');
    roofContainer.innerHTML = ''; // Clear

    // Create Wrapper in Col 2 (Matches Grid Layout in CSS)
    const roofWrapper = document.createElement('div');
    roofWrapper.className = 'roof-svg-wrapper';
    roofContainer.appendChild(roofWrapper);

    // Geometry Constants
    const COL_W = 55; // Matches CSS --hoq-col-width
    const NUM_COLS = engChars.length;
    const TOTAL_W = NUM_COLS * COL_W;
    const ROOF_H = (TOTAL_W / 2) + 30;

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${TOTAL_W} ${ROOF_H}`);
    svg.style.overflow = "visible";

    // Base Y is the bottom of the SVG viewbox
    const BASE_Y = ROOF_H;

    // Draw Grid Logic
    for (let i = 0; i < NUM_COLS; i++) {
        for (let j = i + 1; j < NUM_COLS; j++) {
            // Visualize correlations between Col i and Col j
            const xi = (i * COL_W) + (COL_W / 2);
            const xj = (j * COL_W) + (COL_W / 2);

            const cx = (xi + xj) / 2;
            const cy = BASE_Y - ((xj - xi) / 2);

            const halfDiag = COL_W / 2;

            const pts = `
                ${cx},${cy - halfDiag}
                ${cx + halfDiag},${cy}
                ${cx},${cy + halfDiag}
                ${cx - halfDiag},${cy}
            `;

            const diamond = document.createElementNS(svgNS, "polygon");
            diamond.setAttribute("points", pts);
            diamond.setAttribute("fill", "#050505");
            diamond.setAttribute("stroke", "#222");
            diamond.setAttribute("stroke-width", "1");
            svg.appendChild(diamond);

            // Mock Correlations
            const diff = j - i;
            let symbol = '';
            if (diff === 1 && Math.random() > 0.4) symbol = '+';
            if (diff === 2 && Math.random() > 0.7) symbol = '-';
            if (diff > 5 && Math.random() > 0.9) symbol = '+';

            if (symbol) {
                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", cx);
                text.setAttribute("y", cy + 4);
                text.setAttribute("text-anchor", "middle");
                text.setAttribute("fill", symbol === '+' ? "#fff" : "var(--accent)");
                text.setAttribute("font-weight", "bold");
                text.setAttribute("font-size", "12");
                text.textContent = symbol;
                svg.appendChild(text);

                if (symbol === '-') {
                    diamond.setAttribute("stroke", "var(--accent)");
                }

                // Add tooltips
                const title = document.createElementNS(svgNS, "title");
                title.textContent = symbol === '+' ? "Positive Correlation" : "Negative Correlation";
                text.appendChild(title);
            }
        }
    }

    // Add Label - moved way up to avoid overlap
    const roofLabel = document.createElementNS(svgNS, "text");
    roofLabel.setAttribute("x", TOTAL_W / 2);
    roofLabel.setAttribute("y", 15);
    roofLabel.setAttribute("text-anchor", "middle");
    roofLabel.setAttribute("fill", "#444");
    roofLabel.setAttribute("font-size", "10");
    roofLabel.setAttribute("letter-spacing", "3");
    roofLabel.textContent = "CORRELATION MATRIX";
    svg.appendChild(roofLabel);

    roofWrapper.appendChild(svg);
}

// 3. Interactions & Animations
function setupInteractions() {
    // Glitch Text
    const glitches = document.querySelectorAll('.glitch-text');
    setInterval(() => {
        glitches.forEach(g => {
            if (Math.random() > 0.95) {
                g.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
                setTimeout(() => g.style.transform = 'none', 100);
            }
        });
    }, 2000);

    // Scroll Observer (Reveal Animations)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    // Target sections and cards
    // Target sections and cards
    const revealElements = document.querySelectorAll('section, .comp-card, .strategy-card, .hero-header, .hero-meta, .text-col, .visual-col, .section-header, .hoq-mega-container');
    revealElements.forEach((el, index) => {
        el.classList.add('reveal-on-scroll');
        // Simple stagger for groups not manually set
        if (!el.style.transitionDelay && index % 3 !== 0) {
            // el.style.transitionDelay = '0.1s'; 
        }
        observer.observe(el);
    });

    // Active Navigation Highlight - scroll-based (more reliable)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200; // Check 200px from top

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // Manual smooth scroll
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function showContext(req, char, val) {
    const logicBox = document.getElementById('logicText');
    logicBox.style.borderColor = '#fff';
    setTimeout(() => logicBox.style.borderColor = 'var(--accent)', 300);
    logicBox.innerHTML = `<span style="color:var(--accent)">[LOCKED SELECTION]</span> <br> 
    Focusing on <strong>${char}</strong> is critical to satisfying <strong>${req}</strong>. This relationship has a weight of ${val}.`;
}
