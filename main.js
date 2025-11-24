// Global Communication Guide - Main JavaScript File
// Handles all interactive functionality across the website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initScrollReveal();
    initNavigation();
    initParticleBackground();
    initTypewriter();
    initAssessment();
    initExpandableSections();
    initScenarios();
    initResourceFilters();
    initCounters();
    initDownloadButtons();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Scroll reveal animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
}

// Navigation functionality
function initNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            // Toggle mobile menu (implementation depends on design)
            console.log('Mobile menu toggled');
        });
    }
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Particle background for hero section
function initParticleBackground() {
    const container = document.getElementById('particle-container');
    if (!container) return;
    
    // Simple particle system using p5.js
    new p5((p) => {
        let particles = [];
        
        p.setup = function() {
            const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
            canvas.parent(container);
            
            // Create particles
            for (let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    vx: p.random(-0.5, 0.5),
                    vy: p.random(-0.5, 0.5),
                    size: p.random(1, 3)
                });
            }
        };
        
        p.draw = function() {
            p.clear();
            
            // Update and draw particles
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                
                // Wrap around edges
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
                
                // Draw particle
                p.fill(255, 255, 255, 100);
                p.noStroke();
                p.circle(particle.x, particle.y, particle.size);
            });
        };
        
        p.windowResized = function() {
            p.resizeCanvas(container.offsetWidth, container.offsetHeight);
        };
    });
}

// Typewriter effect for hero text
function initTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (!typedElement) return;
    
    const options = {
        strings: [
            'Master Global Communication',
            'Enhance Professional Skills',
            'Build Stronger Relationships',
            'Navigate Cultural Differences'
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 2000,
        loop: true,
        showCursor: false
    };
    
    new Typed('#typed-text', options);
}

// Assessment functionality
function initAssessment() {
    const startBtn = document.getElementById('start-assessment');
    const modal = document.getElementById('assessment-modal');
    const closeBtn = document.getElementById('close-assessment');
    
    if (startBtn && modal) {
        startBtn.addEventListener('click', function() {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }
    
    // Assessment logic
    const questions = [
        {
            question: "How do you typically handle misunderstandings in cross-cultural communication?",
            options: [
                "I clarify immediately and ask for confirmation",
                "I wait until the end to address concerns",
                "I assume understanding and move forward",
                "I seek feedback from a colleague"
            ],
            correct: 0,
            explanation: "Immediate clarification prevents misunderstandings from escalating and shows respect for clear communication."
        },
        {
            question: "When writing to someone from a high-context culture (like Japan), you should:",
            options: [
                "Be very direct and to the point",
                "Provide context and build relationships",
                "Use technical jargon to show expertise",
                "Keep emails extremely short"
            ],
            correct: 1,
            explanation: "High-context cultures value relationship-building and contextual information in communication."
        },
        {
            question: "What's the best way to handle a customer who is upset about a service issue?",
            options: [
                "Explain why the issue occurred",
                "Immediately offer a solution",
                "Acknowledge their frustration and listen",
                "Transfer them to a supervisor"
            ],
            correct: 2,
            explanation: "Acknowledging emotions and active listening builds trust before problem-solving."
        },
        {
            question: "When scheduling a global meeting, the most important consideration is:",
            options: [
                "Your own convenience",
                "Rotating meeting times fairly",
                "Keeping it short",
                "Having it during business hours"
            ],
            correct: 1,
            explanation: "Rotating meeting times shows respect for all time zones and promotes inclusive collaboration."
        },
        {
            question: "In professional email communication, the subject line should:",
            options: [
                "Be creative and catchy",
                "Include the main point and urgency",
                "Be as short as possible",
                "Use all caps for attention"
            ],
            correct: 1,
            explanation: "Clear, informative subject lines help recipients prioritize and understand the email's purpose."
        }
    ];
    
    let currentQuestion = 0;
    let answers = [];
    
    const nextBtn = document.getElementById('next-question');
    const prevBtn = document.getElementById('prev-question');
    const questionText = document.getElementById('question-text');
    const answerOptions = document.getElementById('answer-options');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                loadQuestion();
            } else {
                showResults();
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentQuestion > 0) {
                currentQuestion--;
                loadQuestion();
            }
        });
    }
    
    function loadQuestion() {
        const question = questions[currentQuestion];
        
        if (questionText) {
            questionText.textContent = question.question;
        }
        
        if (answerOptions) {
            answerOptions.innerHTML = '';
            question.options.forEach((option, index) => {
                const button = document.createElement('button');
                button.className = 'answer-btn w-full text-left p-4 border border-gray-300 rounded-lg hover:border-primary hover:bg-gray-50 transition-all';
                button.textContent = option;
                button.addEventListener('click', () => selectAnswer(index));
                answerOptions.appendChild(button);
            });
        }
        
        if (progressBar) {
            progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${currentQuestion + 1} of ${questions.length}`;
        }
        
        if (prevBtn) {
            prevBtn.disabled = currentQuestion === 0;
        }
    }
    
    function selectAnswer(answerIndex) {
        answers[currentQuestion] = answerIndex;
        
        // Update button styles
        const buttons = document.querySelectorAll('.answer-btn');
        buttons.forEach((btn, index) => {
            if (index === answerIndex) {
                btn.classList.add('border-primary', 'bg-primary', 'text-white');
            } else {
                btn.classList.remove('border-primary', 'bg-primary', 'text-white');
            }
        });
    }
    
    function showResults() {
        const correctAnswers = answers.filter((answer, index) => 
            answer === questions[index].correct
        ).length;
        
        const percentage = Math.round((correctAnswers / questions.length) * 100);
        
        // Determine communication style based on answers
        let style = 'Collaborative Professional';
        if (percentage >= 80) {
            style = 'Global Communication Expert';
        } else if (percentage >= 60) {
            style = 'Cultural Communicator';
        } else if (percentage >= 40) {
            style = 'Developing Professional';
        }
        
        // Hide question content, show results
        document.getElementById('assessment-content').classList.add('hidden');
        document.getElementById('assessment-results').classList.remove('hidden');
        
        // Update results
        document.getElementById('style-result').textContent = style;
        document.getElementById('cultural-score').textContent = `${Math.min(percentage + 15, 95)}%`;
        document.getElementById('professional-score').textContent = `${Math.min(percentage + 20, 98)}%`;
        document.getElementById('clarity-score').textContent = `${Math.max(percentage - 5, 75)}%`;
    }
    
    // Initialize first question
    if (questions.length > 0) {
        loadQuestion();
    }
}

// Expandable sections for guidelines
function initExpandableSections() {
    const expandableBtns = document.querySelectorAll('.expandable-btn');
    
    expandableBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('svg');
            
            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                icon.style.transform = 'rotate(0deg)';
            } else {
                content.classList.add('expanded');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Scenarios functionality
function initScenarios() {
    const scenarioCards = document.querySelectorAll('.scenario-card');
    const modal = document.getElementById('scenario-modal');
    const closeBtn = document.getElementById('close-modal');
    
    const scenarios = {
        email: [
            {
                title: "Cultural Email Sensitivity",
                description: "You're working with a Japanese client who has expressed concern about a project timeline. They haven't been direct about their concerns, but you sense hesitation in their responses. How do you address this situation?",
                options: [
                    "Send a direct email asking them to clearly state their concerns about the timeline",
                    "Schedule a video call to discuss the project timeline and ask open-ended questions about their concerns",
                    "Wait for them to bring up their concerns directly and continue with the current timeline",
                    "Send a detailed email explaining why the timeline is necessary and cannot be changed"
                ],
                correct: 1,
                explanation: "Scheduling a video call shows cultural sensitivity. Japanese business culture often prefers indirect communication and relationship-building. Open-ended questions allow them to express concerns without feeling confrontational."
            }
        ],
        customer: [
            {
                title: "Upset Customer Resolution",
                description: "A customer sends an angry email about a service outage that affected their business operations. They're demanding immediate compensation and threatening to cancel their contract. What's your best initial response?",
                options: [
                    "Explain the technical reasons for the outage and why it happened",
                    "Apologize for the inconvenience and immediately offer compensation",
                    "Acknowledge their frustration, apologize sincerely, and schedule a call to discuss solutions",
                    "Forward the email to your technical team for immediate resolution"
                ],
                correct: 2,
                explanation: "Acknowledging emotions and showing empathy first builds trust. Scheduling a call allows for better understanding of their specific needs and demonstrates commitment to resolution."
            }
        ]
    };
    
    scenarioCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            if (scenarios[category] && scenarios[category].length > 0) {
                loadScenario(scenarios[category][0]);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
    
    function loadScenario(scenario) {
        document.getElementById('scenario-title').textContent = scenario.title;
        document.getElementById('scenario-description').textContent = scenario.description;
        
        const optionsContainer = document.getElementById('response-options');
        optionsContainer.innerHTML = '';
        
        scenario.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'response-option w-full text-left p-4 border border-gray-300 rounded-lg';
            button.textContent = option;
            button.addEventListener('click', () => selectResponse(index, scenario.correct, scenario.explanation));
            optionsContainer.appendChild(button);
        });
        
        // Reset feedback
        document.getElementById('feedback-section').classList.add('hidden');
        document.getElementById('next-scenario').classList.add('hidden');
    }
    
    function selectResponse(selectedIndex, correctIndex, explanation) {
        const options = document.querySelectorAll('.response-option');
        
        options.forEach((option, index) => {
            option.disabled = true;
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
        
        // Show feedback
        const feedbackSection = document.getElementById('feedback-section');
        const feedbackText = document.getElementById('feedback-text');
        
        feedbackText.textContent = explanation;
        feedbackSection.classList.remove('hidden');
        document.getElementById('next-scenario').classList.remove('hidden');
        
        // Update progress
        updateProgress();
    }
    
    function updateProgress() {
        const completedCount = document.getElementById('completed-count');
        const accuracyScore = document.getElementById('accuracy-score');
        const streakCount = document.getElementById('streak-count');
        
        if (completedCount) {
            const current = parseInt(completedCount.textContent) || 0;
            completedCount.textContent = current + 1;
        }
    }
}

// Resource filters and search
function initResourceFilters() {
    const searchInput = document.getElementById('search-input');
    const categoryFilters = document.querySelectorAll('.category-filter');
    const resourceCards = document.querySelectorAll('.resource-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterResources(searchTerm, getActiveCategory());
        });
    }
    
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active filter
            categoryFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.dataset.category;
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            filterResources(searchTerm, category);
        });
    });
    
    function getActiveCategory() {
        const activeFilter = document.querySelector('.category-filter.active');
        return activeFilter ? activeFilter.dataset.category : 'all';
    }
    
    function filterResources(searchTerm, category) {
        resourceCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const cardCategory = card.dataset.category;
            
            const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
            const matchesCategory = category === 'all' || cardCategory === category;
            
            if (matchesSearch && matchesCategory) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        });
    }
}

// Animated counters
function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    }
}

// Download buttons functionality
function initDownloadButtons() {
    const downloadBtns = document.querySelectorAll('.download-btn');
    const downloadModal = document.getElementById('download-modal');
    const closeDownloadModal = document.getElementById('close-download-modal');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const fileType = this.dataset.file;
            
            // Simulate download
            console.log(`Downloading: ${fileType}`);
            
            // Show download confirmation
            if (downloadModal) {
                downloadModal.classList.remove('hidden');
                downloadModal.classList.add('flex');
                document.body.style.overflow = 'hidden';
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    downloadModal.classList.add('hidden');
                    downloadModal.classList.remove('flex');
                    document.body.style.overflow = 'auto';
                }, 3000);
            }
        });
    });
    
    if (closeDownloadModal && downloadModal) {
        closeDownloadModal.addEventListener('click', function() {
            downloadModal.classList.add('hidden');
            downloadModal.classList.remove('flex');
            document.body.style.overflow = 'auto';
        });
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
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

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    console.log('Page loaded in', performance.now(), 'ms');
});