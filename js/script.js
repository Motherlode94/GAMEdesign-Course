// ============================================
// AMÉLIORATIONS AJOUTÉES :
// - Sauvegarde LocalStorage
// - Mode sombre
// - Notifications Toast
// - Raccourcis clavier (Ctrl+S, Ctrl+Enter, Échap)
// - Prism.js pour coloration syntaxique
// - Progression trackée
// ============================================

// === SYSTÈME DE SAUVEGARDE ===
const AppState = {
    completedExercises: new Set(),
    userCode: {},
    isDarkMode: false,
    
    load() {
        try {
            const saved = localStorage.getItem('gamedevAcademy');
            if (saved) {
                const data = JSON.parse(saved);
                this.completedExercises = new Set(data.completedExercises || []);
                this.userCode = data.userCode || {};
                this.isDarkMode = data.isDarkMode || false;
            }
        } catch (e) {
            console.error('Erreur de chargement:', e);
        }
    },
    
    save() {
        try {
            const data = {
                completedExercises: Array.from(this.completedExercises),
                userCode: this.userCode,
                isDarkMode: this.isDarkMode
            };
            localStorage.setItem('gamedevAcademy', JSON.stringify(data));
        } catch (e) {
            console.error('Erreur de sauvegarde:', e);
        }
    },
    
    reset() {
        if (confirm('⚠️ Réinitialiser toute ta progression ?')) {
            localStorage.removeItem('gamedevAcademy');
            location.reload();
        }
    }
};

// === NOTIFICATIONS TOAST ===
function showToast(message, type = 'success', duration = 3000) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = { success: '✅', error: '❌', info: 'ℹ️', warning: '⚠️' };
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// === MODE SOMBRE ===
function toggleDarkMode() {
    AppState.isDarkMode = !AppState.isDarkMode;
    document.body.classList.toggle('dark-mode', AppState.isDarkMode);
    document.getElementById('toggleTheme').textContent = AppState.isDarkMode ? '☀️' : '🌙';
    AppState.save();
    showToast(`Mode ${AppState.isDarkMode ? 'sombre' : 'clair'} activé`, 'info', 2000);
}

// === PROGRESSION ===
function updateProgress() {
    const total = 17;
    const completed = AppState.completedExercises.size;
    const percent = Math.round((completed / total) * 100);
    document.getElementById('progressDisplay').textContent = `${completed}/${total} (${percent}%)`;
}

// === FORMATAGE CODE AVEC PRISM.JS ===
function formatCodeForDisplay(code, language = 'python') {
    code = code.trim();
    const langMap = {
        'python': 'python',
        'csharp': 'csharp',
        'unity': 'csharp',
        'javascript': 'javascript',
        'js': 'javascript'
    };
    const prismLang = langMap[language.toLowerCase()] || 'javascript';
    
    // Utiliser Prism pour colorer
    const highlighted = Prism.highlight(code, Prism.languages[prismLang], prismLang);
    return `<pre class="language-${prismLang}"><code class="language-${prismLang}">${highlighted}</code></pre>`;
}

// === UTILITAIRE ===
function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// === RACCOURCIS CLAVIER ===
document.addEventListener('keydown', (e) => {
    // Ctrl+S : Sauvegarder
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        const textarea = document.getElementById('userCode');
        if (textarea) {
            const exerciseId = textarea.dataset.exerciseId;
            if (exerciseId) {
                AppState.userCode[exerciseId] = textarea.value;
                AppState.save();
                showToast('Code sauvegardé', 'success', 1500);
            }
        }
    }
    
    // Ctrl+Enter : Vérifier
    if (e.ctrlKey && e.key === 'Enter') {
        const checkBtn = document.querySelector('.exercise-actions .btn-primary');
        if (checkBtn) {
            e.preventDefault();
            checkBtn.click();
        }
    }
    
    // Échap : Fermer modales
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(m => m.classList.remove('active'));
    }
});

// === NAVIGATION ===
document.addEventListener('DOMContentLoaded', function() {
    // Charger l'état
    AppState.load();
    updateProgress();
    if (AppState.isDarkMode) {
        document.body.classList.add('dark-mode');
        document.getElementById('toggleTheme').textContent = '☀️';
    }
    
    // Boutons
    document.getElementById('toggleTheme')?.addEventListener('click', toggleDarkMode);
    document.getElementById('resetProgress')?.addEventListener('click', () => AppState.reset());
    
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');
        });
    });
    
    // Course cards Unity
    const courseCards = document.querySelectorAll('[data-chapter]');
    courseCards.forEach(card => {
        card.addEventListener('click', function() {
            openCourseModal(this.getAttribute('data-chapter'));
        });
    });
    
    // Web course cards
    const webCards = document.querySelectorAll('[data-web]');
    webCards.forEach(card => {
        card.addEventListener('click', function() {
            openWebCourseModal(this.getAttribute('data-web'));
        });
    });
    
    // Python AI cards
    const pythonCards = document.querySelectorAll('[data-pythonai]');
    pythonCards.forEach(card => {
        card.addEventListener('click', function() {
            openPythonAICourseModal(this.getAttribute('data-pythonai'));
        });
    });
    
    // Exercise items
    const exerciseItems = document.querySelectorAll('[data-exercise]');
    exerciseItems.forEach(item => {
        item.addEventListener('click', function() {
            openExerciseModal(this.getAttribute('data-exercise'));
        });
    });
    
    // Exercise selector
    const btnSelectors = document.querySelectorAll('.btn-selector');
    btnSelectors.forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            btnSelectors.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.getElementById('unity-exercises').classList.toggle('hidden', type !== 'unity');
            document.getElementById('web-exercises').classList.toggle('hidden', type !== 'web');
            document.getElementById('python-exercises').classList.toggle('hidden', type !== 'python');
        });
    });
    
    // Modal close
    const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) this.classList.remove('active');
        });
    });
    
    // Message de bienvenue
    setTimeout(() => showToast('Bienvenue ! 🎮', 'info', 3000), 500);
});

// === MODALES DE COURS ===
function openCourseModal(chapter) {
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');
    const course = UNITY_COURSES?.[chapter];
    
    if (!course) {
        showToast('Cours non trouvé', 'error');
        return;
    }
    
    modalBody.innerHTML = `
        <div class="course-content">
            <h2>${course.title}</h2>
            ${course.intro ? `<p>${course.intro}</p>` : ''}
            
            <h3>📝 Le Code C#</h3>
            <div class="code-block">${formatCodeForDisplay(course.code, 'csharp')}</div>
            
            <h3>💡 Explication</h3>
            <div class="explanation">${course.explanation}</div>
            
            <h3>🎯 Exercices</h3>
            <ol>${course.exercises.map(ex => `<li>${ex}</li>`).join('')}</ol>
        </div>
    `;
    
    modal.classList.add('active');
}

function openWebCourseModal(module) {
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');
    const course = WEB_COURSES?.[module];
    
    if (!course) {
        showToast('Cours non trouvé', 'error');
        return;
    }
    
    modalBody.innerHTML = `
        <div class="course-content">
            <h2>${course.title}</h2>
            <p>${course.intro}</p>
            
            <h3>📝 Le Code JavaScript</h3>
            <div class="code-block">${formatCodeForDisplay(course.code, 'javascript')}</div>
            
            <h3>💡 Explication</h3>
            <div class="explanation">${course.explanation}</div>
            
            <h3>🎯 Exercices</h3>
            <ol>${course.exercises.map(ex => `<li>${ex}</li>`).join('')}</ol>
        </div>
    `;
    
    modal.classList.add('active');
}

function openPythonAICourseModal(module) {
    const modal = document.getElementById('courseModal');
    const modalBody = document.getElementById('modalBody');
    const course = PYTHON_AI_COURSES?.[module];
    
    if (!course) {
        showToast('Cours non trouvé', 'error');
        return;
    }
    
    modalBody.innerHTML = `
        <div class="course-content">
            <h2>${course.title}</h2>
            <p>${course.intro}</p>
            
            <h3>🐍 Le Code Python</h3>
            <div class="code-block">${formatCodeForDisplay(course.code, 'python')}</div>
            
            <h3>💡 Explications</h3>
            <div class="explanation">${course.explanation}</div>
            
            <h3>🎯 Exercices</h3>
            <ol>${course.exercises.map(ex => `<li>${ex}</li>`).join('')}</ol>
        </div>
    `;
    
    modal.classList.add('active');
}

// === MODAL EXERCICE ===
function openExerciseModal(exerciseId) {
    const modal = document.getElementById('exerciseModal');
    const modalBody = document.getElementById('exerciseModalBody');
    const exercise = EXERCISES?.[exerciseId];
    
    if (!exercise) {
        showToast('Exercice non trouvé', 'error');
        return;
    }
    
    const savedCode = AppState.userCode[exerciseId] || exercise.starter || '';
    
    modalBody.innerHTML = `
        <div class="exercise-content">
            <div class="exercise-instructions">
                <h3>📋 Instructions</h3>
                <p>${exercise.description}</p>
                <ol>${exercise.tasks.map(task => `<li>${task}</li>`).join('')}</ol>
                
                ${exercise.hints ? `
                    <div class="explanation" style="margin-top: 1.5rem;">
                        <strong>💡 Indices :</strong>
                        <ul style="margin-top: 0.5rem;">
                            ${exercise.hints.map(hint => `<li>${hint}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
            </div>
            
            <div class="code-editor">
                <h3>✍️ Ton Code</h3>
                <textarea 
                    class="code-textarea" 
                    id="userCode" 
                    data-exercise-id="${exerciseId}"
                    placeholder="${exercise.placeholder || 'Écris ton code ici...'}"
                >${savedCode}</textarea>
                
                <div class="exercise-actions">
                    <button class="btn btn-primary" onclick="checkExercise('${exerciseId}')">
                        ✓ Vérifier
                    </button>
                    <button class="btn btn-secondary" onclick="showCorrection('${exerciseId}')">
                        💡 Correction
                    </button>
                </div>
                
                <div class="feedback" id="feedback"></div>
                
                <div class="correction-section" id="correction">
                    <h3>✅ Solution</h3>
                    <div class="code-block">${formatCodeForDisplay(exercise.solution, exercise.language || 'csharp')}</div>
                    <div style="margin-top: 1rem;">
                        <strong>Explications :</strong>
                        <p>${exercise.solutionExplanation}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.add('active');
}

// === VÉRIFICATION EXERCICE ===
function checkExercise(exerciseId) {
    const userCode = document.getElementById('userCode')?.value.trim();
    const feedback = document.getElementById('feedback');
    const exercise = EXERCISES?.[exerciseId];
    
    if (!userCode) {
        feedback.className = 'feedback error active';
        feedback.innerHTML = '<h4>❌ Erreur</h4><p>Tu dois écrire du code !</p>';
        showToast('Écris du code d\'abord', 'warning');
        return;
    }
    
    // Sauvegarder
    AppState.userCode[exerciseId] = userCode;
    AppState.save();
    
    let isValid = true;
    let missingElements = [];
    
    if (exercise?.requiredKeywords) {
        exercise.requiredKeywords.forEach(keyword => {
            if (!userCode.includes(keyword)) {
                isValid = false;
                missingElements.push(keyword);
            }
        });
    }
    
    if (isValid) {
        feedback.className = 'feedback success active';
        feedback.innerHTML = '<h4>✅ Excellent !</h4><p>Ton code contient tous les éléments ! 🎉</p>';
        
        if (!AppState.completedExercises.has(exerciseId)) {
            AppState.completedExercises.add(exerciseId);
            AppState.save();
            updateProgress();
            showToast('Exercice complété ! 🎉', 'success');
        }
    } else {
        feedback.className = 'feedback error active';
        feedback.innerHTML = `
            <h4>⚠️ Presque !</h4>
            <p>Il manque : ${missingElements.map(el => `<code>${escapeHtml(el)}</code>`).join(', ')}</p>
        `;
        showToast('Il manque des éléments', 'warning');
    }
}

function showCorrection(exerciseId) {
    const correction = document.getElementById('correction');
    correction.classList.add('active');
    correction.scrollIntoView({ behavior: 'smooth' });
    showToast('Correction affichée', 'info', 2000);
}