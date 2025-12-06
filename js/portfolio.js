/* ============================================================
   PAWAN NAYAR PORTFOLIO - COMPLETE JAVASCRIPT
   Extracted from pawan-nayar-resume.html
   ALL FUNCTIONALITY PRESERVED EXACTLY AS ORIGINAL
   ============================================================ */

// --- Particle background animation script ---
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
// Use clientWidth to avoid scrollbar-caused overflow
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let particlesArray;

class Particle {
    constructor(x, y, directionX, directionY, size, color) { this.x = x; this.y = y; this.directionX = directionX; this.directionY = directionY; this.size = size; this.color = color; }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); ctx.fillStyle = this.color; ctx.fill(); }
    update() { if (this.x > canvas.width || this.x < 0) { this.directionX = -this.directionX; } if (this.y > canvas.height || this.y < 0) { this.directionY = -this.directionY; } this.x += this.directionX; this.y += this.directionY; this.draw(); }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 0.5;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * .4) - .2;
        let directionY = (Math.random() * .4) - .2;
        let color = 'rgba(0, 255, 255, 0.4)';
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() { requestAnimationFrame(animate); ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++) { particlesArray[i].update(); } }
window.addEventListener('resize', () => { canvas.width = document.documentElement.clientWidth; canvas.height = document.documentElement.clientHeight; init(); });
init();
animate();

// --- Intersection Observer for scroll animations ---
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); } });
}, { threshold: 0.1 });
revealElements.forEach(el => { observer.observe(el); });

// --- Typewriter effect for the main heading ---
const nameText = "Pawan Nayar";
const nameElement = document.getElementById('name-heading');
let charIndex = 0;
function typeWriter() {
    if (charIndex < nameText.length) {
        nameElement.innerHTML += nameText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 120);
    } else {
         nameElement.innerHTML += '<span class="animate-ping">|</span>';
         setTimeout(() => { const cursor = nameElement.querySelector('span'); if(cursor) cursor.style.display = 'none'; }, 1000);
    }
}
document.addEventListener('DOMContentLoaded', typeWriter);

// --- Accordion functionality ---
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        header.classList.toggle('active');
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
});

// --- Expandable content functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const seeMoreBtns = document.querySelectorAll('.see-more-btn');
    const seeLessBtns = document.querySelectorAll('.see-less-btn');

    seeMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const expandableContent = btn.closest('.expandable-content');
            const previewText = expandableContent.querySelector('.preview-text');
            const fullContent = expandableContent.querySelector('.full-content');

            previewText.style.display = 'none';
            fullContent.classList.remove('hidden');
            fullContent.classList.add('show');
        });
    });

    seeLessBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const expandableContent = btn.closest('.expandable-content');
            const previewText = expandableContent.querySelector('.preview-text');
            const fullContent = expandableContent.querySelector('.full-content');

            fullContent.classList.remove('show');
            setTimeout(() => {
                fullContent.classList.add('hidden');
                previewText.style.display = 'block';
            }, 400);
        });
    });
});

// --- Skill Quiz Functionality ---
const skillBank = [
    {
        skill: "Prompt Engineering",
        icon: "🎨",
        category: { name: "AI Concepts", color: "#F778BA" },
        whatItIs: "The art and science of crafting effective inputs (prompts) to guide Generative AI models toward desired outputs.",
        coreAnalogy: "Like being a great director giving precise instructions to an expert actor (the AI) to get the perfect performance.",
        applications: [
            "Generating specific styles of marketing copy or code.",
            "Creating consistent characters and scenes in AI art.",
            "Extracting structured data from unstructured text using LLMs."
        ],
        knowledgeCheck: {
            questions: [
                {
                    type: "mcq",
                    question: "A key principle of good prompt engineering is:",
                    options: ["Using vague language", "Providing context and constraints", "Making the prompt as short as possible"],
                    answer: "Providing context and constraints"
                },
                {
                    type: "fill_in_the_blank",
                    question: "A technique providing the AI with examples of the desired output format is called ___-shot prompting.",
                    answer: "few"
                }
            ]
        }
    },
    {
        skill: "Knowledge Graphs",
        icon: "🕸️",
        category: { name: "AI Concepts", color: "#F778BA" },
        whatItIs: "A model that organizes information as a network of entities and the relationships between them, enabling a contextual understanding of data.",
        coreAnalogy: "Like a Wikipedia for your data, but where every link understands the relationship between pages, not just that they're connected.",
        applications: [
            "Powering advanced search engines (like Google's info boxes).",
            "Building recommendation systems in e-commerce and media.",
            "Mapping complex networks in fraud detection and scientific research."
        ],
        knowledgeCheck: {
            questions: [
                {
                    type: "mcq",
                    question: "In a Knowledge Graph, real-world objects are represented as:",
                    options: ["Nodes (or Vertices)", "Tables", "Documents"],
                    answer: "Nodes (or Vertices)"
                },
                {
                    type: "mcq",
                    question: "The connections between these objects are called:",
                    options: ["Links", "Rows", "Edges (or Relationships)"],
                    answer: "Edges (or Relationships)"
                }
            ]
        }
    },
    {
        skill: "AI-Driven Learning",
        icon: "🎓",
        category: { name: "EdTech Strategy", color: "#38a169"},
        whatItIs: "Using artificial intelligence to create personalized, adaptive, and efficient educational experiences for learners.",
        coreAnalogy: "Imagine a personal tutor for every student that knows their exact strengths and weaknesses, adjusting the lesson plan in real-time.",
        applications: [
            "Adaptive quizzes that get harder or easier based on answers.",
            "Personalized course recommendations based on career goals.",
            "Automated essay grading and feedback systems."
        ],
        knowledgeCheck: {
            questions: [
                {
                    type: "mcq",
                    question: "What is the primary goal of AI in personalized learning?",
                    options: ["To replace teachers with robots", "To tailor educational content to individual student needs", "To make all tests multiple-choice"],
                    answer: "To tailor educational content to individual student needs"
                }
            ]
        }
    },
    {
        skill: "D3.js",
        icon: "📊",
        category: { name: "Technical", color: "#79C0FF"},
        whatItIs: "A JavaScript library for manipulating documents based on data, allowing you to create powerful and dynamic data visualizations in the browser.",
        coreAnalogy: "It's like giving you a box of LEGOs (SVG, HTML, CSS) and the superpowers to bind them to your data, letting you build any chart or diagram imaginable.",
        applications: [
            "Creating interactive dashboards for business intelligence.",
            "Building custom, animated charts for news articles.",
            "Visualizing complex networks and geographical data."
        ],
        knowledgeCheck: {
            questions: [
                {
                    type: "fill_in_the_blank",
                    question: "D3 stands for Data-Driven ____.",
                    answer: "Documents"
                },
                {
                    type: "mcq",
                    question: "D3 primarily helps you manipulate the:",
                    options: ["Server", "Database", "DOM (Document Object Model)"],
                    answer: "DOM (Document Object Model)"
                }
            ]
        }
    }
];

let currentSkillIndex = 0;
let isQuizActive = false;

function openSkillQuiz() {
    document.getElementById('skillQuizModal').classList.remove('invisible', 'opacity-0');
    document.getElementById('skillQuizModal').classList.add('active');
    loadSkill(0);
}

function closeSkillQuiz() {
    document.getElementById('skillQuizModal').classList.add('invisible', 'opacity-0');
    document.getElementById('skillQuizModal').classList.remove('active');
}

function loadSkill(index) {
    currentSkillIndex = index;
    const skill = skillBank[index];

    document.getElementById('skillCategory').textContent = skill.category.name;
    document.getElementById('skillCategory').style.color = skill.category.color;
    document.getElementById('skillIcon').textContent = skill.icon;
    document.getElementById('skillTitle').textContent = skill.skill;
    document.getElementById('whatItIs').textContent = skill.whatItIs;
    document.getElementById('coreAnalogy').textContent = `"${skill.coreAnalogy}"`;
    document.getElementById('applicationsList').innerHTML = skill.applications.map(app => `<li>${app}</li>`).join('');

    // Reset to details view if quiz was active
    if (isQuizActive) {
        toggleKnowledgeCheck();
    }

    // Update button states
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = index === 0;
    prevBtn.style.opacity = index === 0 ? 0.5 : 1;
    nextBtn.disabled = index === skillBank.length - 1;
    nextBtn.style.opacity = index === skillBank.length - 1 ? 0.5 : 1;
}

function prevSkill() {
    if (currentSkillIndex > 0) {
        loadSkill(currentSkillIndex - 1);
    }
}

function nextSkill() {
    if (currentSkillIndex < skillBank.length - 1) {
        loadSkill(currentSkillIndex + 1);
    }
}

function toggleKnowledgeCheck() {
    isQuizActive = !isQuizActive;
    const detailsView = document.getElementById('detailsView');
    const quizView = document.getElementById('quizView');
    const quizBtn = document.getElementById('quizBtn');

    detailsView.classList.toggle('hidden');
    quizView.classList.toggle('hidden');

    if (isQuizActive) {
        quizBtn.textContent = '📚 View Details';
        quizBtn.style.backgroundColor = '#805ad5';
        buildQuiz();
    } else {
        quizBtn.textContent = '🧠 Knowledge Check';
        quizBtn.style.backgroundColor = '#79C0FF';
    }
}

function buildQuiz() {
    const skill = skillBank[currentSkillIndex];
    const questions = skill.knowledgeCheck.questions;
    let quizHTML = `<div class="space-y-5">`;

    questions.forEach((q, index) => {
        quizHTML += `<div><p class="mb-2 text-sm text-gray-400"><strong>Q${index + 1}:</strong> ${q.question}</p>`;
        if (q.type === 'mcq') {
            quizHTML += `<div class="space-y-2" id="q-${index}-options">`;
            q.options.forEach(option => {
                quizHTML += `<button onclick="selectMCQ(this, ${index})" class="mcq-option w-full text-left p-2 rounded-md text-sm text-gray-300">${option}</button>`;
            });
            quizHTML += `</div>`;
        } else if (q.type === 'fill_in_the_blank') {
            quizHTML += `<input type="text" id="q-${index}-input" class="w-full bg-gray-900 border border-gray-700 rounded-md p-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500">`;
        }
        quizHTML += `</div>`;
    });

    quizHTML += `<button onclick="submitCheck()" class="w-full mt-4 p-2 rounded-lg font-medium text-white transition-colors" style="background-color: #3FB950;">Check Answers</button></div>`;
    document.getElementById('quizView').innerHTML = quizHTML;
}

function selectMCQ(buttonEl, questionIndex) {
    // Deselect other options for the same question
    const optionsContainer = document.getElementById(`q-${questionIndex}-options`);
    optionsContainer.querySelectorAll('.mcq-option').forEach(btn => btn.classList.remove('selected'));
    // Select the clicked option
    buttonEl.classList.add('selected');
}

function submitCheck() {
    const skill = skillBank[currentSkillIndex];
    const questions = skill.knowledgeCheck.questions;
    let score = 0;
    let resultsHTML = '';

    questions.forEach((q, index) => {
        if (q.type === 'mcq') {
            const selectedButton = document.querySelector(`#q-${index}-options .selected`);
            if (selectedButton) {
                const userAnswer = selectedButton.textContent;
                if (userAnswer === q.answer) {
                    score++;
                    selectedButton.classList.add('correct');
                    resultsHTML += `<p><strong>Q${index + 1}:</strong> <span style="color:#3FB950">Correct!</span> The answer is "${q.answer}".</p>`;
                } else {
                    selectedButton.classList.add('incorrect');
                    resultsHTML += `<p><strong>Q${index + 1}:</strong> <span style="color:#F85149">Incorrect.</span> Correct answer is "${q.answer}".</p>`;
                }
            } else {
                resultsHTML += `<p><strong>Q${index + 1}:</strong> Not answered.</p>`;
            }
        } else if (q.type === 'fill_in_the_blank') {
            const inputEl = document.getElementById(`q-${index}-input`);
            const userAnswer = inputEl.value.trim().toLowerCase();
            if (userAnswer === q.answer.toLowerCase()) {
                score++;
                inputEl.style.borderColor = '#3FB950';
                resultsHTML += `<p><strong>Q${index + 1}:</strong> <span style="color:#3FB950">Correct!</span> You got it.</p>`;
            } else {
                inputEl.style.borderColor = '#F85149';
                resultsHTML += `<p><strong>Q${index + 1}:</strong> <span style="color:#F85149">Incorrect.</span> The correct answer is "${q.answer}".</p>`;
            }
        }
    });

    const totalQuestions = questions.length;
    document.getElementById('modalTitle').textContent = `You scored ${score} out of ${totalQuestions}!`;
    document.getElementById('modalBody').innerHTML = resultsHTML;

    const modal = document.getElementById('quizResultModal');
    modal.classList.remove('invisible', 'opacity-0');
    modal.classList.add('active');
}

function closeQuizModal() {
    const modal = document.getElementById('quizResultModal');
    modal.classList.add('invisible', 'opacity-0');
    modal.classList.remove('active');
}

// --- Back to Top Functionality ---
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button based on scroll position
window.addEventListener('scroll', function() {
    const backToTopBtn = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// --- Expandable Sections for Origin Story ---
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const toggleId = sectionId.replace('-section', '-toggle');
    const toggle = document.getElementById(toggleId);

    if (section.style.display === 'none' || section.style.display === '') {
        section.style.display = 'block';
        toggle.textContent = '▲';
        // Smooth scroll into view
        setTimeout(() => {
            section.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        section.style.display = 'none';
        toggle.textContent = '▼';
    }
}

// --- Toast Notification System ---
class ToastNotificationSystem {
    constructor() {
        this.TOAST_PRIORITY = {
            exitIntent: 1,
            linkClicker: 2,
            returner: 3,
            sectionHopper: 4,
            deepReader: 5,
            speedSkimmer: 6,
            mobileHelper: 7,
        };

        this.sessionState = {
            startTime: Date.now(),
            lastToastTime: 0,
            toastQueue: [],
            currentlyVisible: null,
            userPresent: true,
            tabSwitches: 0,
            externalLinksOpened: [],
            shownToasts: [],
            readingScore: 0,
            scrollPattern: [],
            navigationClicks: [],
            scrollVelocities: [],
            isSpeedSkimmer: false,
            isDeepReader: false,
            isMobile: window.innerWidth < 768
        };

        this.lastScrollY = 0;
        this.lastScrollTime = Date.now();
        this.exitIntentFired = false;

        this.init();
    }

    init() {
        this.loadVisitorData();
        this.setupEventListeners();
        this.initializeLinkTracking();
        this.checkReturningVisitor();
    }

    loadVisitorData() {
        const stored = localStorage.getItem('resume_visitor_data');
        this.visitorData = stored ? JSON.parse(stored) : {
            firstVisit: new Date().toISOString(),
            lastVisit: new Date().toISOString(),
            visitCount: 1,
            totalTimeSpent: 0,
            toastsInteracted: [],
            emailCaptured: false,
            email: null,
            externalLinksClicked: 0,
            lastShownToast: null,
            consentGiven: false,
            preferences: {
                noMoreToasts: false,
                preferredContact: 'email'
            }
        };

        // Update visit count and last visit
        if (stored) {
            this.visitorData.visitCount++;
            this.visitorData.lastVisit = new Date().toISOString();
        }
    }

    saveVisitorData() {
        localStorage.setItem('resume_visitor_data', JSON.stringify(this.visitorData));
    }

    setupEventListeners() {
        // Scroll tracking
        window.addEventListener('scroll', this.throttle(() => {
            this.trackScrollBehavior();
        }, 100));

        // Tab visibility
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.sessionState.userPresent = false;
                this.sessionState.tabSwitches++;
            } else {
                this.sessionState.userPresent = true;
                this.handleTabReturn();
            }
        });

        // Exit intent detection
        document.addEventListener('mouseout', (e) => {
            if (!this.exitIntentFired && e.clientY < 10 && e.relatedTarget === null) {
                const timeOnPage = (Date.now() - this.sessionState.startTime) / 1000;
                if (timeOnPage < 8 && this.getScrollDepth() < 0.3) {
                    this.exitIntentFired = true;
                    this.queueToast('exitIntent');
                }
            }
        });

        // Page unload - save data
        window.addEventListener('beforeunload', () => {
            const timeSpent = (Date.now() - this.sessionState.startTime) / 1000;
            this.visitorData.totalTimeSpent += timeSpent;
            this.saveVisitorData();
        });
    }

    trackScrollBehavior() {
        const now = Date.now();
        const currentY = window.scrollY;

        // Record scroll pattern
        this.sessionState.scrollPattern.push({
            y: currentY,
            time: now
        });

        // Keep only last 50 measurements
        if (this.sessionState.scrollPattern.length > 50) {
            this.sessionState.scrollPattern.shift();
        }

        // Calculate velocity
        const distance = Math.abs(currentY - this.lastScrollY);
        const time = (now - this.lastScrollTime) / 1000;
        const velocity = distance / time;

        this.sessionState.scrollVelocities.push(velocity);
        if (this.sessionState.scrollVelocities.length > 10) {
            this.sessionState.scrollVelocities.shift();
        }

        // Speed skimmer detection (more lenient for testing)
        const avgVelocity = this.sessionState.scrollVelocities.reduce((a, b) => a + b, 0) / this.sessionState.scrollVelocities.length;
        const scrollDepth = this.getScrollDepth();
        const timeOnPage = (Date.now() - this.sessionState.startTime) / 1000;

        // Debug logging
        if (scrollDepth > 0.3) {
            console.log('Toast Debug:', {
                avgVelocity: Math.round(avgVelocity),
                scrollDepth: Math.round(scrollDepth * 100) + '%',
                timeOnPage: Math.round(timeOnPage) + 's',
                velocity: Math.round(velocity),
                isMobile: this.sessionState.isMobile
            });
        }

        // Speed skimmer - more lenient thresholds
        if (avgVelocity > 300 && scrollDepth > 0.4 && timeOnPage < 15 && velocity < 50) {
            console.log('Triggering speed skimmer toast');
            this.queueToast('speedSkimmer');
        }

        // Deep reader detection - more lenient
        if (timeOnPage > 20 && scrollDepth > 0.5 && velocity < 50) {
            this.analyzeReadingPattern();
            console.log('Reading score:', this.sessionState.readingScore);
            if (this.sessionState.readingScore > 0.3) {
                console.log('Triggering deep reader toast');
                this.queueToast('deepReader');
            }
        }

        // Mobile reader detection - more lenient
        if (this.sessionState.isMobile && scrollDepth > 0.3 && timeOnPage > 15 && velocity < 50) {
            console.log('Triggering mobile reader toast');
            this.queueToast('mobileReader');
        }


        this.lastScrollY = currentY;
        this.lastScrollTime = now;
    }

    analyzeReadingPattern() {
        const pattern = this.sessionState.scrollPattern;
        let pauseCount = 0;
        let totalPauseTime = 0;

        for (let i = 1; i < pattern.length; i++) {
            const deltaY = Math.abs(pattern[i].y - pattern[i-1].y);
            const deltaTime = pattern[i].time - pattern[i-1].time;

            if (deltaY < 50 && deltaTime > 2000) {
                pauseCount++;
                totalPauseTime += deltaTime;
            }
        }

        const avgPauseTime = totalPauseTime / pauseCount || 0;
        this.sessionState.readingScore = Math.min(1, (pauseCount * avgPauseTime) / 30000);
    }

    getScrollDepth() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        return scrollTop / docHeight;
    }

    initializeLinkTracking() {
        const allLinks = document.querySelectorAll('a[target="_blank"]');

        allLinks.forEach(link => {
            const url = new URL(link.href);
            const isExternal = !url.hostname.includes(window.location.hostname);
            const isTracked = ['github.com', 'linkedin.com', 'portfolio', 'demo', 'live-site', 'pawan-nayar.github.io'].some(pattern =>
                url.hostname.includes(pattern) || link.href.includes(pattern)
            );

            if (isExternal && isTracked) {
                link.addEventListener('click', () => {
                    this.trackExternalLink(url.href, link.dataset.category || 'general');
                });
            }
        });
    }

    trackExternalLink(url, category) {
        const cleanUrl = url.split('?')[0].split('#')[0];

        if (!this.sessionState.externalLinksOpened.includes(cleanUrl)) {
            this.sessionState.externalLinksOpened.push(cleanUrl);
            this.visitorData.externalLinksClicked++;

            if (this.sessionState.externalLinksOpened.length === 2) {
                // Wait for tab return to show link clicker toast
                this.sessionState.pendingLinkClickerToast = true;
            }
        }
    }

    handleTabReturn() {
        if (this.sessionState.pendingLinkClickerToast && this.sessionState.externalLinksOpened.length >= 2) {
            this.queueToast('linkClicker');
            this.sessionState.pendingLinkClickerToast = false;
        }
    }

    checkReturningVisitor() {
        if (this.visitorData.visitCount > 1) {
            const hoursSinceLastVisit = (Date.now() - new Date(this.visitorData.lastVisit).getTime()) / (1000 * 60 * 60);
            if (hoursSinceLastVisit >= 1 && hoursSinceLastVisit <= 24 * 30) {
                setTimeout(() => {
                    this.queueToast('returner');
                }, 1500);
            }
        }
    }

    queueToast(type, data = {}) {
        // Check if already shown this session
        if (this.sessionState.shownToasts.includes(type)) {
            return;
        }

        // Check user preferences
        if (this.visitorData.preferences.noMoreToasts) {
            return;
        }

        const toast = {
            type,
            priority: this.TOAST_PRIORITY[type],
            data,
            timestamp: Date.now()
        };

        // Exit intent overrides everything
        if (type === 'exitIntent') {
            this.dismissCurrentToast();
            this.sessionState.toastQueue = [];
            this.showToast(toast);
            return;
        }

        // Check cooldown
        const timeSinceLastToast = Date.now() - this.sessionState.lastToastTime;

        if (timeSinceLastToast < 30000 && this.sessionState.currentlyVisible) {
            // Add to queue
            this.sessionState.toastQueue.push(toast);
            this.sessionState.toastQueue.sort((a, b) => a.priority - b.priority);
        } else {
            this.showToast(toast);
        }
    }

    showToast(toast) {
        if (!this.sessionState.userPresent) {
            this.sessionState.toastQueue.push({...toast, waitForReturn: true});
            return;
        }

        this.sessionState.currentlyVisible = toast.type;
        this.sessionState.lastToastTime = Date.now();
        this.sessionState.shownToasts.push(toast.type);

        const toastElement = this.createToastElement(toast);
        document.body.appendChild(toastElement);

        // Show with animation
        setTimeout(() => {
            toastElement.classList.add('visible');
        }, 100);

        // Auto-dismiss (except exit intent)
        if (toast.type !== 'exitIntent') {
            const duration = this.getToastDuration(toast.type);
            setTimeout(() => {
                this.dismissToast(toastElement);
            }, duration);
        }
    }

    createToastElement(toast) {
        const container = document.createElement('div');
        container.className = `toast-container ${this.getToastPosition(toast.type)}`;

        const toastEl = document.createElement('div');
        toastEl.className = `toast toast-${toast.type.toLowerCase().replace(/([A-Z])/g, '-$1')}`;

        if (toast.type === 'speedSkimmer') {
            toastEl.classList.add('slide-left');
        }

        toastEl.innerHTML = this.getToastContent(toast);

        // Add backdrop for modal toasts
        if (toast.type === 'exitIntent') {
            const backdrop = document.createElement('div');
            backdrop.className = 'toast-backdrop';
            backdrop.addEventListener('click', () => {
                this.dismissToast(container);
            });
            container.appendChild(backdrop);
            setTimeout(() => backdrop.classList.add('visible'), 100);
        }

        container.appendChild(toastEl);

        // Add event listeners
        this.addToastEventListeners(container, toast);

        return container;
    }

    getToastContent(toast) {
        switch (toast.type) {
            case 'speedSkimmer':
                return `
                    <div>💡 Quick scan? Jump to highlights ↓</div>
                    <button class="toast-btn" onclick="toastSystem.handleToastAction('speedSkimmer', 'highlights')">See Key Projects</button>
                `;

            case 'deepReader':
                return `
                    <div style="margin-bottom: 12px;">📚 Thanks for the time! Want the full story?</div>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <button class="toast-btn" onclick="toastSystem.handleToastAction('deepReader', 'casestudies')">Case Studies & Blog</button>
                        <button class="toast-btn secondary" onclick="toastSystem.handleToastAction('deepReader', 'portfolio')">Download Full Portfolio</button>
                    </div>
                `;

            case 'returner':
                const newContent = this.getNewContentSinceLastVisit();
                return `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
                        <div>🎯 Welcome back! ${newContent}</div>
                        <button class="toast-close" onclick="toastSystem.dismissCurrentToast()">×</button>
                    </div>
                `;

            case 'exitIntent':
                return `
                    <button class="toast-close" onclick="toastSystem.dismissCurrentToast()">×</button>
                    <div style="margin-bottom: 20px;">⚡ Wrong fit? Here's what I'm best at:</div>
                    <div style="text-align: left; margin: 20px 0;">
                        <div style="margin-bottom: 8px;">✓ AI-Powered Learning Systems - 5+ years</div>
                        <div style="margin-bottom: 8px;">✓ Content Engineering at Scale - Adobe, Cadence</div>
                        <div style="margin-bottom: 8px;">✓ 100+ Interactive Prototypes - GitHub Portfolio</div>
                    </div>
                    <div style="display: flex; gap: 12px; justify-content: center;">
                        <button class="toast-btn" onclick="toastSystem.handleToastAction('exitIntent', 'projects')">See Projects</button>
                        <button class="toast-btn secondary" onclick="toastSystem.dismissCurrentToast()">Not Right Now</button>
                    </div>
                `;

            case 'linkClicker':
                const linksCount = this.sessionState.externalLinksOpened.length;
                return `
                    <div class="profile-photo">PN</div>
                    <div style="flex-grow: 1;">
                        <div style="margin-bottom: 8px;">💬 Checked out ${linksCount} projects? Let's talk!</div>
                        <div style="display: flex; gap: 8px;">
                            <button class="toast-btn" onclick="toastSystem.handleToastAction('linkClicker', 'schedule')">Schedule 15min Call</button>
                            <button class="toast-btn secondary" onclick="toastSystem.handleToastAction('linkClicker', 'email')">Send Email</button>
                        </div>
                    </div>
                `;

            case 'mobileReader':
                return `
                    <div>📱 Easier to read later? Get PDF sent to your email</div>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <input type="email" class="email-input" placeholder="your@email.com" id="mobileEmailInput">
                        <button class="toast-btn" onclick="toastSystem.handleToastAction('mobileReader', 'sendPDF')">Send</button>
                    </div>
                `;


            default:
                return '<div>Notification</div>';
        }
    }

    getNewContentSinceLastVisit() {
        // This would be dynamic based on actual content updates
        return "New interactive quiz added | Updated portfolio";
    }

    getToastPosition(type) {
        const positions = {
            speedSkimmer: 'bottom-right',
            deepReader: 'bottom-center',
            returner: 'top-center',
            exitIntent: 'center-modal',
            linkClicker: 'bottom-right',
            mobileReader: 'mobile-bottom',
        };
        return positions[type] || 'bottom-right';
    }

    getToastDuration(type) {
        const durations = {
            speedSkimmer: 4000,
            deepReader: 4000,
            returner: 10000,
            linkClicker: 6000,
            mobileReader: 6000
        };
        return durations[type] || 4000;
    }

    handleToastAction(toastType, action) {
        // Track interaction
        this.visitorData.toastsInteracted.push(toastType);

        switch (action) {
            case 'highlights':
                document.querySelector('#software-content-demos')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'casestudies':
                window.open('https://pawan-nayar.github.io/software-content-demos/', '_blank');
                break;
            case 'portfolio':
                // Trigger PDF download
                this.downloadPortfolio();
                break;
            case 'projects':
                document.querySelector('#software-content-demos')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'schedule':
                window.open('mailto:pnayar@cretorial.com?subject=Let\'s Schedule a Call&body=Hi Pawan, I viewed your portfolio and would like to schedule a 15-minute call.', '_blank');
                break;
            case 'email':
                window.open('mailto:pnayar@cretorial.com?subject=Following up on your portfolio&body=Hi Pawan, I reviewed your work and would like to discuss...', '_blank');
                break;
            case 'sendPDF':
                this.handleEmailCapture();
                break;
        }

        this.dismissCurrentToast();
        this.saveVisitorData();
    }

    handleEmailCapture() {
        const emailInput = document.getElementById('mobileEmailInput');
        const email = emailInput?.value;

        if (email && this.isValidEmail(email)) {
            this.visitorData.emailCaptured = true;
            this.visitorData.email = email;

            // Show success message
            this.showSuccessToast('Sent! Check your inbox 📬');

            // Here you would typically send to your backend
            console.log('Email captured:', email);
        } else {
            alert('Please enter a valid email address');
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    downloadPortfolio() {
        // This would trigger actual PDF generation
        console.log('Portfolio download triggered');
        this.showSuccessToast('Portfolio download started 📄');
    }

    showSuccessToast(message) {
        const container = document.createElement('div');
        container.className = 'toast-container bottom-right';

        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.style.background = 'rgba(34, 84, 61, 0.95)';
        toast.style.border = '1px solid #38a169';
        toast.innerHTML = `<div>${message}</div>`;

        container.appendChild(toast);
        document.body.appendChild(container);

        setTimeout(() => toast.classList.add('visible'), 100);
        setTimeout(() => this.dismissToast(container), 3000);
    }

    addToastEventListeners(container, toast) {
        // Close button
        const closeBtn = container.querySelector('.toast-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.dismissToast(container);
            });
        }
    }

    dismissCurrentToast() {
        const currentToast = document.querySelector('.toast-container');
        if (currentToast) {
            this.dismissToast(currentToast);
        }
    }

    dismissToast(container) {
        const toast = container.querySelector('.toast');
        const backdrop = container.querySelector('.toast-backdrop');

        if (backdrop) {
            backdrop.classList.remove('visible');
        }

        toast.classList.remove('visible');

        setTimeout(() => {
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }

            this.sessionState.currentlyVisible = null;

            // Process queue
            setTimeout(() => {
                this.processQueue();
            }, 30000); // 30s cooldown
        }, 300);
    }

    processQueue() {
        if (this.sessionState.toastQueue.length > 0 && !this.sessionState.currentlyVisible) {
            const nextToast = this.sessionState.toastQueue.shift();
            this.showToast(nextToast);
        }
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
}

// Initialize the toast system
let toastSystem;
document.addEventListener('DOMContentLoaded', () => {
    // Force clear any stuck toast backdrops
    const stuckBackdrops = document.querySelectorAll('.toast-backdrop');
    stuckBackdrops.forEach(backdrop => backdrop.remove());

    // Clear any stuck toast containers
    const stuckToasts = document.querySelectorAll('.toast-container');
    stuckToasts.forEach(toast => toast.remove());

    // DISABLE toast system to prevent floating boxes
    // toastSystem = new ToastNotificationSystem();
    initializeEvolutionMap();
});

// Simple Timeline with D3 Force Simulation
class TimelineEvolution {
    constructor() {
        this.isPlaying = false;
        this.currentYear = 1995;
        this.animationId = null;
        this.hasShownToast = false;
        this.isTabActive = true;

        // Skills data by year
        this.skillsByYear = {
            1995: ["data mining", "instructional design"],
            1996: ["sleepless dedication", "CBT frameworks"],
            1997: ["Bloom taxonomy", "Microsoft projects"],
            1998: ["early mastery", "learning design"],
            1999: ["conviction", "meaning through design"],
            2000: ["publications", "IEEE STC"],
            2001: ["editorial leadership", "cross-BU culture"],
            2002: ["innovation systems", "early multimedia"],
            2003: ["professional authorship", "global publication"],
            2004: ["emerging discipline", "design writing"],
            2005: ["Cadence tutorials", "cross-module learning"],
            2006: ["multimedia demos", "breaking hierarchies"],
            2007: ["user empathy", "measurable impact"],
            2008: ["thought leadership", "humanized knowledge"],
            2009: ["cultural architect", "knowledge empathy"],
            2010: ["Adobe globalization", "SaaS transition"],
            2011: ["ML automation", "community systems"],
            2012: ["experience design", "team scaling"],
            2013: ["creative transformation", "living systems"],
            2014: ["global operational framework", "empathy scale"],
            2015: ["semantic learning", "Go2Words engine"],
            2016: ["machine learning feedback", "community intelligence"],
            2017: ["proactive content", "product empathy"],
            2018: ["vision synthesis", "word-emotion engines"],
            2019: ["personalized learning DNA", "meaning systems"],
            2020: ["LLOS.AI", "BeyondDictionary"],
            2021: ["CMET framework", "microservices learning"],
            2022: ["universal personalization", "lifelong learning OS"],
            2023: ["AI creativity", "learning philosophy"],
            2024: ["learning engineering", "universal systems"],
            2025: ["lifelong learning mastery", "infinite potential"]
        };

        this.activeSkills = [];
        // Mobile: fewer simultaneous skills to prevent overlap
        this.maxSkills = window.innerWidth < 768 ? 2 : 4;
        this.setupVisualization();
        this.setupControls();
        this.setupVisibilityHandling();
        this.setupToastNotification();
    }

    setupVisualization() {
        const container = d3.select('#timelineViz');
        const width = 1000;
        const height = 400;
        const timelineY = height - 40; // Timeline at bottom with 10% margin (40px)
        const textMargin = width * 0.04; // 4% margin for text

        // Mobile detection for larger text
        this.isMobile = window.innerWidth < 768;
        this.skillFontSize = this.isMobile ? 28 : 16.9; // Bigger text on mobile
        this.yearFontSize = this.isMobile ? 20 : 12;

        this.svg = container.append('svg')
            .attr('width', '100%')
            .attr('height', height)
            .attr('viewBox', `0 0 ${width} ${height}`);

        // Background timeline (full length, faded)
        this.svg.append('line')
            .attr('x1', textMargin)
            .attr('y1', timelineY)
            .attr('x2', width - textMargin)
            .attr('y2', timelineY)
            .style('stroke', '#00FFFF')
            .style('stroke-width', '2px')
            .style('opacity', '0.3');

        // Timeline line - make it visible from start
        this.timelineLine = this.svg.append('line')
            .attr('class', 'timeline-line')
            .attr('x1', textMargin)
            .attr('y1', timelineY)
            .attr('x2', textMargin + 50) // Start with some visible length
            .attr('y2', timelineY)
            .style('stroke', '#00FFFF')
            .style('stroke-width', '4px')
            .style('opacity', '1');

        // Year circle
        this.yearCircle = this.svg.append('circle')
            .attr('class', 'year-circle')
            .attr('cx', textMargin)
            .attr('cy', timelineY)
            .attr('r', 8);

        // Year labels container
        this.yearLabelsGroup = this.svg.append('g').attr('class', 'year-labels');

        // Add year markers every 5 years
        for (let year = 1995; year <= 2025; year += 5) {
            const x = textMargin + ((year - 1995) / 30) * (width - 2 * textMargin);

            // Year marker line
            this.svg.append('line')
                .attr('x1', x)
                .attr('y1', timelineY - 5)
                .attr('x2', x)
                .attr('y2', timelineY + 5)
                .attr('stroke', '#00FFFF')
                .attr('stroke-width', 1);

            // Year label
            this.svg.append('text')
                .attr('x', x)
                .attr('y', timelineY + 20)
                .attr('text-anchor', 'middle')
                .attr('fill', '#FFFFFF')
                .attr('font-size', this.yearFontSize + 'px')
                .attr('font-family', 'Inter, sans-serif')
                .text(year);
        }

        // Current year label (dynamic) - initially hidden
        this.currentYearLabel = this.svg.append('text')
            .attr('x', width - textMargin - 20) // Right side with margin
            .attr('y', height * 0.15) // 15% from top
            .attr('text-anchor', 'end')
            .attr('fill', '#00FFFF')
            .attr('font-size', '18px')
            .attr('font-weight', 'bold')
            .attr('font-family', 'Inter, sans-serif')
            .style('opacity', 0) // Start hidden
            .text('1995');

        // Skills container
        this.skillsGroup = this.svg.append('g').attr('class', 'skills-group');

        // Pre-calculated positions within inner grid (10% margins)
        this.innerMargin = 0.1; // 10% margin on all sides
        this.innerWidth = (width - 2 * textMargin) * (1 - 2 * this.innerMargin);
        this.innerHeight = (timelineY - height * 0.15) * (1 - 2 * this.innerMargin);
        this.innerStartX = textMargin + (width - 2 * textMargin) * this.innerMargin;
        this.innerStartY = height * 0.15 + (timelineY - height * 0.15) * this.innerMargin;

        // Pre-calculate 8 fixed positions that never collide
        this.fixedPositions = [
            { x: this.innerStartX + this.innerWidth * 0.2, y: this.innerStartY + this.innerHeight * 0.2 },
            { x: this.innerStartX + this.innerWidth * 0.8, y: this.innerStartY + this.innerHeight * 0.2 },
            { x: this.innerStartX + this.innerWidth * 0.1, y: this.innerStartY + this.innerHeight * 0.5 },
            { x: this.innerStartX + this.innerWidth * 0.9, y: this.innerStartY + this.innerHeight * 0.5 },
            { x: this.innerStartX + this.innerWidth * 0.3, y: this.innerStartY + this.innerHeight * 0.8 },
            { x: this.innerStartX + this.innerWidth * 0.7, y: this.innerStartY + this.innerHeight * 0.8 },
            { x: this.innerStartX + this.innerWidth * 0.5, y: this.innerStartY + this.innerHeight * 0.1 },
            { x: this.innerStartX + this.innerWidth * 0.5, y: this.innerStartY + this.innerHeight * 0.6 }
        ];

        this.positionIndex = 0; // Current position to use
        this.skillQueue = []; // Queue of max 4 skills


        // Store dimensions for use in other methods
        this.width = width;
        this.height = height;
        this.timelineY = timelineY;
        this.textMargin = textMargin;
    }

    setupControls() {
        document.getElementById('playEvolution').addEventListener('click', () => this.play());
        document.getElementById('pauseEvolution').addEventListener('click', () => this.pause());
        document.getElementById('resetEvolution').addEventListener('click', () => this.reset());
    }

    setupVisibilityHandling() {
        // Handle Alt+Tab and window focus changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.isTabActive = false;
                if (this.isPlaying) {
                    this.pause();
                    this.lastPauseTime = Date.now();
                }
            } else {
                this.isTabActive = true;
                // Adjust skill birth times to account for pause duration
                if (this.lastPauseTime) {
                    const pauseDuration = Date.now() - this.lastPauseTime;
                    this.activeSkills.forEach(skill => {
                        skill.birthTime += pauseDuration;
                    });
                    this.lastPauseTime = null;
                }
            }
        });

        window.addEventListener('blur', () => {
            this.isTabActive = false;
            if (this.isPlaying) {
                this.pause();
                this.lastPauseTime = Date.now();
            }
        });

        window.addEventListener('focus', () => {
            this.isTabActive = true;
            // Adjust skill birth times to account for pause duration
            if (this.lastPauseTime) {
                const pauseDuration = Date.now() - this.lastPauseTime;
                this.activeSkills.forEach(skill => {
                    skill.birthTime += pauseDuration;
                });
                this.lastPauseTime = null;
            }
        });
    }

    setupToastNotification() {
        // DISABLED to prevent floating boxes
        // Show toast when timeline section comes into view
        // const observer = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting && !this.hasShownToast) {
        //             this.showToast();
        //             this.hasShownToast = true;
        //         }
        //     });
        // }, { threshold: 0.5 });

        // const timelineContainer = document.querySelector('.evolution-timeline-container');
        // if (timelineContainer) {
        //     observer.observe(timelineContainer);
        // }
    }

    showToast() {
        const toast = document.getElementById('timelineToast');
        const playButton = document.getElementById('playEvolution');

        if (toast) {
            toast.classList.add('visible');

            // Hide toast immediately if user clicks play button
            const hideToastOnPlay = () => {
                toast.classList.remove('visible');
                playButton.classList.remove('pulse');
            };

            playButton.addEventListener('click', hideToastOnPlay, { once: true });

            // Hide toast after 3 seconds
            setTimeout(() => {
                toast.classList.remove('visible');
                // Start pulsing play button after toast disappears
                if (playButton && !this.isPlaying) {
                    playButton.classList.add('pulse');
                }
                // Remove the event listener if timeout completes
                playButton.removeEventListener('click', hideToastOnPlay);
            }, 3000);
        }
    }

    play() {
        if (!this.isPlaying && this.currentYear <= 2025) {
            this.isPlaying = true;

            // Hide CTA and show year
            const cta = document.getElementById('timelineCTA');
            if (cta) {
                cta.style.opacity = '0';
                setTimeout(() => cta.style.display = 'none', 500);
            }

            // Show the year label
            this.currentYearLabel.transition().duration(500).style('opacity', 1);

            // Remove pulse animation when play is clicked
            const playButton = document.getElementById('playEvolution');
            if (playButton) {
                playButton.classList.remove('pulse');
            }
            this.animate();
        }
    }

    pause() {
        this.isPlaying = false;
        if (this.animationId) {
            clearTimeout(this.animationId);
        }
    }

    reset() {
        this.pause();
        this.currentYear = 1995;
        this.activeSkills = [];
        this.updateVisualization();
        this.updateDisplay();
    }

    animate() {
        if (!this.isPlaying) {
            return;
        }

        if (this.currentYear > 2025) {
            document.getElementById('currentPhase').textContent = '✨ Evolution Complete - The Future Awaits';
            this.isPlaying = false;
            return;
        }

        // Remove old skills before adding new ones
        this.removeOldSkills();

        // Add all skills for current year at once
        const yearSkills = this.skillsByYear[this.currentYear] || [];
        yearSkills.forEach(skill => {
            this.addSkill(skill);
        });

        this.updateVisualization();
        this.updateDisplay();

        this.currentYear++;

        // 3 seconds per year (90 seconds total for 30 years)
        this.animationId = setTimeout(() => this.animate(), 3000);
    }

    addSkill(skillText) {
        // If queue is full, remove the oldest
        if (this.skillQueue.length >= this.maxSkills) {
            const oldestSkill = this.skillQueue.shift(); // Remove first (oldest)
            this.activeSkills = this.activeSkills.filter(skill => skill.id !== oldestSkill.id);
        }

        // Get next pre-calculated position
        const position = this.fixedPositions[this.positionIndex % this.fixedPositions.length];
        this.positionIndex++;

        // Create skill at exact pre-calculated position
        const skill = {
            id: Date.now() + Math.random(),
            text: skillText,
            birthYear: this.currentYear,
            birthTime: Date.now(),
            x: position.x,
            y: position.y,
            opacity: 1,
            width: skillText.length * 8 + 20
        };

        // Add to queue and active skills
        this.skillQueue.push(skill);
        this.activeSkills.push(skill);
    }

    removeOldSkills() {
        // Queue system handles removal automatically in addSkill()
        // This function is now just for cleanup and doesn't need to do much

        // Just ensure we never have more than maxSkills (safety check)
        if (this.activeSkills.length > this.maxSkills) {
            this.activeSkills = this.activeSkills.slice(-this.maxSkills);
            this.skillQueue = this.skillQueue.slice(-this.maxSkills);
        }
    }

    updateVisualization() {
        // Update timeline line
        const timelineX = this.textMargin + ((this.currentYear - 1995) / 30) * (this.width - 2 * this.textMargin);
        this.timelineLine.attr('x2', timelineX);
        this.yearCircle.attr('cx', timelineX);

        // Update current year label (stays in top-right)
        this.currentYearLabel
            .text(this.currentYear);


        // Update skill elements (no simulation needed - fixed grid positions)
        const skillElements = this.skillsGroup.selectAll('.skill-text')
            .data(this.activeSkills, d => d.id);

        // Enter new skills
        skillElements.enter()
            .append('text')
            .attr('class', 'skill-text')
            .style('fill', '#00FFFF')
            .style('font-size', this.skillFontSize + 'px') // Responsive size
            .style('font-weight', 'bold')
            .style('font-family', 'Inter, sans-serif')
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .style('user-select', 'none')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .text(d => d.text)
            .style('opacity', 0)
            .transition()
            .duration(500)
            .style('opacity', d => d.opacity);

        // Update existing skills - fixed positions, only opacity changes
        skillElements
            .style('opacity', d => d.opacity)
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .text(d => d.text);

        // Remove exiting skills
        skillElements.exit()
            .transition()
            .duration(300)
            .style('opacity', 0)
            .remove();
    }

    updateDisplay() {
        // No need to update external year display - only using the one in black grid

        const phases = {
            1995: '🔥 The Forge',
            2000: '📝 Voice',
            2005: '🌉 The Bridge',
            2010: '🌍 The Orbit',
            2015: '🧠 The Pattern',
            2020: '✨ The Light'
        };

        let currentPhase = 'Ready to begin...';
        for (const [year, phase] of Object.entries(phases)) {
            if (this.currentYear >= parseInt(year)) {
                currentPhase = phase;
            }
        }

        document.getElementById('currentPhase').textContent = currentPhase;
    }
}

function initializeEvolutionMap() {
    window.timelineViz = new TimelineEvolution();
}

// Mobile device detection and redirect message
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
           (window.innerWidth <= 768);
}

function showMobileMessage() {
    if (document.getElementById('mobileExperienceNotice')) return;

    const banner = document.createElement('div');
    banner.id = 'mobileExperienceNotice';
    banner.style.position = 'fixed';
    banner.style.top = '12px';
    banner.style.left = '50%';
    banner.style.transform = 'translateX(-50%)';
    banner.style.width = 'calc(100% - 2rem)';
    banner.style.maxWidth = '420px';
    banner.style.zIndex = '9999';
    banner.style.background = 'rgba(15, 25, 45, 0.95)';
    banner.style.border = '1px solid rgba(0, 255, 255, 0.3)';
    banner.style.borderRadius = '16px';
    banner.style.padding = '1rem 1.25rem';
    banner.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
    banner.style.backdropFilter = 'blur(10px)';
    banner.style.color = '#E0F2FE';
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    banner.style.gap = '0.35rem';

    banner.innerHTML = `
        <strong style="color:#00FFFF; font-size:1rem;">📱 Mobile Beta</strong>
        <span style="font-size:0.9rem; line-height:1.4;">
            You're viewing the interactive resume on a smaller screen. Animations and visualizations are simplified, but all content is available.
        </span>
        <span style="font-size:0.85rem; color:#9CA3AF;">
            For the full cinematic experience, try it on a desktop. A dedicated mobile build is in progress.
        </span>
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; margin-top:0.35rem;">
            <a href="mailto:pawan@cretorial.com" style="
                background:#00FFFF;
                color:#0a0a1a;
                padding:0.5rem 1rem;
                border-radius:999px;
                font-weight:600;
                text-decoration:none;
                font-size:0.85rem;
            ">📧 Contact</a>
            <button type="button" id="dismissMobileNotice" style="
                background:transparent;
                border:1px solid rgba(0,255,255,0.4);
                color:#E0F2FE;
                padding:0.45rem 1rem;
                border-radius:999px;
                font-size:0.85rem;
            ">Got it</button>
        </div>
    `;

    if (localStorage.getItem('pn_mobile_banner_dismissed') === 'true') {
        return;
    }

    document.body.appendChild(banner);

    banner.querySelector('#dismissMobileNotice')?.addEventListener('click', () => {
        banner.remove();
        localStorage.setItem('pn_mobile_banner_dismissed', 'true');
    });
}

function enableMobileOptimizations() {
    // Make brain visualization static but visible
    const brainSvg = document.getElementById('brainSvg');
    const brainContainer = document.querySelector('.brain-container');
    const bylineText = document.getElementById('brainBylineText');
    const bylineStages = document.getElementById('brainBylineStages');

    if (brainSvg) brainSvg.style.opacity = '1';
    if (brainContainer) brainContainer.classList.add('brain-static');
    if (bylineText) bylineText.style.opacity = '1';
    if (bylineStages) bylineStages.style.opacity = '1';

    document.querySelectorAll('.stage-container').forEach(stage => {
        stage.classList.remove('opacity-0');
    });

    const finalQuote = document.getElementById('finalQuote');
    if (finalQuote) finalQuote.style.opacity = '1';
}

// Check for mobile on page load
document.addEventListener('DOMContentLoaded', () => {
    const mobileView = isMobileDevice();
    if (mobileView) {
        showMobileMessage();
        enableMobileOptimizations();
        // Mobile brain timeline is static with CSS rain effect - no JS needed
    } else {
        setTimeout(() => {
            const mainTitle = document.querySelector('h1');
            if (mainTitle) {
                mainTitle.classList.add('clap-animation');
            }
        }, 500);
        initializeBrainAnimation();
    }
});

// --- Brain Animation System ---
function initializeBrainAnimation() {
    const brainSection = document.querySelector('.brain-philosophy-section');
    if (!brainSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startBrainAnimation();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1 });

    observer.observe(brainSection);
}

function startBrainAnimation() {
    const brainSvg = document.getElementById('brainSvg');
    const brainContainer = document.querySelector('.brain-container');
    const bylineText = document.getElementById('brainBylineText');
    const bylineStages = document.getElementById('brainBylineStages');

    // Step 1: Show brain outline and byline inside (800ms)
    brainSvg.style.opacity = '1';
    brainContainer.classList.add('brain-animate');

    setTimeout(() => {
        bylineText.style.opacity = '1';
        bylineStages.style.opacity = '1';
    }, 400);

    // Step 2: Animate life stages with structured timing (21 seconds total)
    setTimeout(() => {
        animateLifeStages();
    }, 1200);
}

function animateQuote(quote, callback) {
    const text = quote.textContent;
    const words = text.split(' ');
    quote.textContent = '';
    quote.style.opacity = '1';

    let wordIndex = 0;
    const wordInterval = setInterval(() => {
        if (wordIndex < words.length) {
            quote.textContent += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
            wordIndex++;
        } else {
            clearInterval(wordInterval);
            callback();
        }
    }, 150); // Each word appears every 150ms
}

function animateLifeStages() {
    const stages = [
        { container: 'stage1-container', node: 'stage1', path: null, color: 'rgba(255, 182, 193, 1)' },
        { container: 'stage2-container', node: 'stage2', path: 'path1', color: 'rgba(255, 215, 0, 1)' },
        { container: 'stage3-container', node: 'stage3', path: 'path2', color: 'rgba(255, 105, 180, 1)' },
        { container: 'stage4-container', node: 'stage4', path: 'path3', color: 'rgba(0, 191, 255, 1)' },
        { container: 'stage5-container', node: 'stage5', path: 'path4', color: 'rgba(255, 215, 0, 1)' },
        { container: 'stage6-container', node: 'stage6', path: 'path5', color: 'rgba(147, 112, 219, 1)' },
        { container: 'stage7-container', node: 'stage7', path: 'path6', color: 'rgba(186, 85, 211, 1)' }
    ];

    let currentStage = 0;

    function animateNextStage() {
        if (currentStage >= stages.length) {
            // All stages complete - show final quote
            setTimeout(() => {
                showFinalQuote();
            }, 2000);
            return;
        }

        const stage = stages[currentStage];

        // Step 1: Light up neural pathway (if exists)
        if (stage.path) {
            const path = document.getElementById(stage.path);
            path.style.stroke = 'rgba(0, 255, 255, 0.8)';
            path.style.strokeDasharray = '5, 5';
            path.style.animation = 'pathFlow 0.8s ease-out forwards';
        }

        // Step 2: Light up brain node (500ms after path)
        setTimeout(() => {
            const node = document.getElementById(stage.node);
            node.style.fill = stage.color;
            node.style.animation = 'nodeGlow 0.8s ease-out forwards';
        }, stage.path ? 500 : 0);

        // Step 3: Show stage container with number, emoji, and text (800ms after node)
        setTimeout(() => {
            const container = document.getElementById(stage.container);
            container.style.opacity = '1';
            container.style.animation = 'fadeInUp 1s ease-out forwards';
        }, (stage.path ? 500 : 0) + 800);

        // Step 4: Move to next stage after 3 seconds total
        setTimeout(() => {
            currentStage++;
            animateNextStage();
        }, 3000);
    }

    // Start the sequence
    animateNextStage();
}

function showFinalQuote() {
    const finalQuote = document.getElementById('finalQuote');
    const brainOutline = document.getElementById('brainOutline');

    // Enhanced brain glow
    brainOutline.style.stroke = 'rgba(0, 255, 255, 0.9)';
    brainOutline.style.filter = 'drop-shadow(0 0 25px rgba(0, 255, 255, 0.8))';

    // Auto-scroll to ensure quote is visible
    setTimeout(() => {
        finalQuote.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 500);

    // Show final quote with word-by-word animation
    const text = finalQuote.querySelector('p').textContent;
    const words = text.split(' ');
    finalQuote.querySelector('p').textContent = '';
    finalQuote.style.opacity = '1';

    let wordIndex = 0;
    const wordInterval = setInterval(() => {
        if (wordIndex < words.length) {
            finalQuote.querySelector('p').textContent += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
            wordIndex++;
        } else {
            clearInterval(wordInterval);
            // Show footer signature after quote completes
            setTimeout(() => {
                showFooterSignature();
            }, 1500);
        }
    }, 200); // Each word appears every 200ms
}

function showFooterSignature() {
    const footerSignature = document.getElementById('footerSignature');
    footerSignature.style.transition = 'opacity 2s ease-in-out';
    footerSignature.style.opacity = '1';
}
