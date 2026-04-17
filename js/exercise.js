// Données des cours Web
const WEB_COURSES = {
    '1': {
        title: 'Module 1 : Canvas et Game Loop',
        intro: 'Apprends à créer un canvas HTML5 et à mettre en place une boucle de jeu.',
        code: `<!DOCTYPE html>
<html>
<head>
    <style>
        canvas {
            border: 2px solid black;
            display: block;
            margin: 20px auto;
            background: #f0f0f0;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let x = 400;
        let y = 300;
        
        function gameLoop() {
            // Effacer le canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner un carré
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(x, y, 50, 50);
            
            // Déplacer le carré
            x += 1;
            if (x > canvas.width) x = 0;
            
            // Rappeler la fonction
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
    </script>
</body>
</html>`,
        explanation: `
            <p><strong>canvas</strong> : Élément HTML pour dessiner en 2D.</p>
            <p><strong>getContext('2d')</strong> : Obtient le contexte de dessin 2D.</p>
            <p><strong>clearRect</strong> : Efface une zone du canvas.</p>
            <p><strong>fillRect</strong> : Dessine un rectangle rempli.</p>
            <p><strong>requestAnimationFrame</strong> : Appelle une fonction à chaque frame (environ 60 FPS).</p>
        `,
        exercises: [
            'Change la couleur du carré',
            'Fais bouger le carré dans une autre direction (y au lieu de x)',
            'Ajoute un deuxième carré d\'une autre couleur'
        ]
    },
    
    '2': {
        title: 'Module 2 : Joueur et Inputs',
        intro: 'Gère les entrées clavier pour contrôler un personnage.',
        code: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    speed: 5
};

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function update() {
    // Déplacement
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    
    // Limites du canvas
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();`,
        explanation: `
            <p><strong>const player = {}</strong> : Objet JavaScript pour stocker les données du joueur.</p>
            <p><strong>keys[e.key]</strong> : Stocke l'état des touches (pressées ou non).</p>
            <p><strong>keydown/keyup</strong> : Événements déclenchés quand on appuie/relâche une touche.</p>
            <p><strong>Math.max / Math.min</strong> : Limite les valeurs pour garder le joueur dans le canvas.</p>
        `,
        exercises: [
            'Ajoute une touche Espace pour courir (vitesse x2)',
            'Affiche la position du joueur à l\'écran avec <code>ctx.fillText()</code>',
            'Ajoute une traînée : dessine plusieurs carrés semi-transparents derrière le joueur'
        ]
    },
    
    '3': {
        title: 'Module 3 : Collisions et Physique',
        intro: 'Détecte les collisions entre objets et ajoute de la physique simple.',
        code: `function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

const player = {
    x: 100,
    y: 100,
    width: 40,
    height: 40,
    vx: 0,
    vy: 0,
    gravity: 0.5,
    jumpPower: -12,
    onGround: false
};

const platform = {
    x: 200,
    y: 400,
    width: 400,
    height: 20
};

function update() {
    // Gravité
    player.vy += player.gravity;
    player.y += player.vy;
    
    // Collision avec la plateforme
    if (checkCollision(player, platform)) {
        player.y = platform.y - player.height;
        player.vy = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
    
    // Saut
    if (keys[' '] && player.onGround) {
        player.vy = player.jumpPower;
    }
    
    // Déplacement horizontal
    if (keys['ArrowLeft']) player.vx = -5;
    else if (keys['ArrowRight']) player.vx = 5;
    else player.vx *= 0.8; // Friction
    
    player.x += player.vx;
}`,
        explanation: `
            <p><strong>checkCollision</strong> : Détecte si deux rectangles se chevauchent (AABB).</p>
            <p><strong>vx, vy</strong> : Vélocité (vitesse) en X et Y.</p>
            <p><strong>gravity</strong> : Accélération vers le bas.</p>
            <p><strong>onGround</strong> : Booléen pour savoir si le joueur touche le sol.</p>
            <p><strong>vx *= 0.8</strong> : Friction pour ralentir progressivement.</p>
        `,
        exercises: [
            'Ajoute plusieurs plateformes dans un tableau',
            'Crée un mur : empêche le joueur de passer à travers',
            'Ajoute un double saut : permets un 2ème saut en l\'air'
        ]
    },
    
    '4': {
        title: 'Module 4 : Ennemis et AI Simple',
        intro: 'Crée des ennemis avec des comportements basiques.',
        code: `class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 2;
        this.state = 'patrol';
        this.direction = 1;
        this.patrolDistance = 200;
        this.startX = x;
        this.detectionRange = 150;
    }
    
    update(player) {
        const distance = Math.sqrt(
            Math.pow(this.x - player.x, 2) + 
            Math.pow(this.y - player.y, 2)
        );
        
        if (distance < this.detectionRange) {
            // Poursuite
            this.state = 'chase';
            if (player.x > this.x) this.x += this.speed;
            if (player.x < this.x) this.x -= this.speed;
            if (player.y > this.y) this.y += this.speed;
            if (player.y < this.y) this.y -= this.speed;
        } else {
            // Patrouille
            this.state = 'patrol';
            this.x += this.speed * this.direction;
            
            if (this.x > this.startX + this.patrolDistance) {
                this.direction = -1;
            } else if (this.x < this.startX - this.patrolDistance) {
                this.direction = 1;
            }
        }
    }
    
    draw(ctx) {
        ctx.fillStyle = this.state === 'chase' ? '#ef4444' : '#f59e0b';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

const enemies = [
    new Enemy(300, 200),
    new Enemy(500, 350)
];

function update() {
    enemies.forEach(enemy => {
        enemy.update(player);
    });
}`,
        explanation: `
            <p><strong>class Enemy</strong> : Crée un modèle réutilisable pour les ennemis.</p>
            <p><strong>constructor</strong> : Fonction appelée quand on crée un nouvel ennemi.</p>
            <p><strong>state</strong> : État du comportement ('patrol' ou 'chase').</p>
            <p><strong>Math.sqrt / Math.pow</strong> : Calcule la distance euclidienne entre deux points.</p>
            <p><strong>direction</strong> : Sens de la patrouille (1 = droite, -1 = gauche).</p>
        `,
        exercises: [
            'Ajoute un état "attack" : si l\'ennemi touche le joueur, le joueur perd de la vie',
            'Crée différents types d\'ennemis : lent mais fort, rapide mais faible',
            'Ajoute un cooldown : l\'ennemi ne peut attaquer que toutes les 2 secondes'
        ]
    }
};

// Données des exercices
const EXERCISES = {
    'unity-1': {
        description: 'Crée un script qui affiche un compteur dans la console Unity.',
        tasks: [
            'Créer une variable privée <code>int compteur = 0</code>',
            'Dans Update(), incrémenter le compteur',
            'Afficher le compteur avec Debug.Log()'
        ],
        hints: [
            'N\'oublie pas le using UnityEngine au début',
            'La classe doit hériter de MonoBehaviour',
            'compteur++ est la même chose que compteur = compteur + 1'
        ],
        placeholder: '// Écris ton code ici...\nusing UnityEngine;\n\npublic class CompteurScript : MonoBehaviour\n{\n    \n}',
        starter: 'using UnityEngine;\n\npublic class CompteurScript : MonoBehaviour\n{\n    private int compteur = 0;\n    \n    void Update()\n    {\n        // Ton code ici\n    }\n}',
        requiredKeywords: ['compteur++', 'Debug.Log'],
        solution: `using UnityEngine;

public class CompteurScript : MonoBehaviour
{
    private int compteur = 0;
    
    void Update()
    {
        compteur++;
        Debug.Log("Compteur: " + compteur);
    }
}`,
        solutionExplanation: 'On incrémente le compteur à chaque frame avec <code>compteur++</code>, puis on l\'affiche dans la console. Attention : cela va afficher beaucoup de messages car Update est appelé 60 fois par seconde !'
    },
    
    'unity-2': {
        description: 'Empêche le joueur d\'aller plus vite en diagonale en normalisant le vecteur de direction.',
        tasks: [
            'Reprendre le script PlayerController du chapitre 2',
            'Après avoir créé le Vector3 direction, le normaliser',
            'Tester en jeu : le joueur devrait avoir la même vitesse dans toutes les directions'
        ],
        hints: [
            'direction.normalized retourne un vecteur de longueur 1',
            'Multiplier par normalized empêche la vitesse diagonale d\'être √2 fois plus rapide',
            'Tu peux aussi utiliser direction = direction.normalized;'
        ],
        placeholder: '// Modifie le script PlayerController...',
        starter: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    
    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        
        // Normalise la direction ici
        
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        requiredKeywords: ['normalized'],
        solution: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    
    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        
        // Normaliser pour éviter la vitesse diagonale
        if (direction.magnitude > 0.1f)
        {
            direction = direction.normalized;
        }
        
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        solutionExplanation: 'On vérifie d\'abord si le vecteur n\'est pas nul (magnitude > 0.1) pour éviter un warning, puis on le normalise. Cela garantit que la vitesse est constante quelle que soit la direction.'
    },
    
    'unity-3': {
        description: 'Ajoute un système de soin et empêche le mouvement quand le joueur est mort.',
        tasks: [
            'Ajouter une touche H pour soigner (+20 vie, max 100)',
            'Empêcher le joueur de bouger si isDead == true',
            'Afficher "Soigné!" dans la console quand on appuie sur H'
        ],
        hints: [
            'Utilise Input.GetKeyDown(KeyCode.H) pour détecter la touche H',
            'Mathf.Clamp(vie, 0, 100) limite la vie entre 0 et 100',
            'Ajoute une condition au début de Update pour vérifier isDead'
        ],
        starter: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    public int vie = 100;
    public bool isDead = false;
    
    void Update()
    {
        // Empêcher le mouvement si mort
        
        // Système de soin
        
        // Déplacement (code existant)
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        requiredKeywords: ['KeyCode.H', 'vie +=', 'if (isDead)'],
        solution: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    public int vie = 100;
    public bool isDead = false;
    
    void Update()
    {
        // Système de soin
        if (Input.GetKeyDown(KeyCode.H) && !isDead)
        {
            vie += 20;
            vie = Mathf.Clamp(vie, 0, 100);
            Debug.Log("Soigné! Vie: " + vie);
        }
        
        // Vérifier la mort
        if (vie <= 0)
        {
            isDead = true;
            Debug.Log("Game Over");
        }
        
        // Empêcher le mouvement si mort
        if (isDead) return;
        
        // Déplacement
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        solutionExplanation: 'On utilise <code>return</code> pour sortir de la fonction Update si le joueur est mort, ce qui empêche le code de déplacement de s\'exécuter. Le soin est limité à 100 avec Mathf.Clamp.'
    },
    
    'unity-4': {
        description: 'Ajoute un système de cooldown pour que l\'ennemi ne puisse attaquer qu\'une fois toutes les 2 secondes.',
        tasks: [
            'Créer une variable <code>float nextAttackTime = 0f</code>',
            'Vérifier si <code>Time.time >= nextAttackTime</code> avant d\'attaquer',
            'Après une attaque, définir <code>nextAttackTime = Time.time + 2f</code>'
        ],
        hints: [
            'Time.time donne le temps écoulé depuis le début du jeu',
            'Le cooldown de 2 secondes est ajouté au temps actuel',
            'L\'attaque ne se produit que si assez de temps s\'est écoulé'
        ],
        starter: `using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public Transform cible;
    public float vitesse = 3f;
    public float distanceAttaque = 2f;
    
    // Ajoute la variable de cooldown ici
    
    void Update()
    {
        float distance = Vector3.Distance(transform.position, cible.position);
        
        if (distance > distanceAttaque)
        {
            transform.LookAt(cible);
            transform.Translate(Vector3.forward * vitesse * Time.deltaTime);
        }
        else
        {
            // Ajoute le système de cooldown ici
            Debug.Log("Attaque!");
        }
    }
}`,
        requiredKeywords: ['nextAttackTime', 'Time.time', '>='],
        solution: `using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public Transform cible;
    public float vitesse = 3f;
    public float distanceAttaque = 2f;
    public float cooldownAttaque = 2f;
    private float nextAttackTime = 0f;
    
    void Update()
    {
        float distance = Vector3.Distance(transform.position, cible.position);
        
        if (distance > distanceAttaque)
        {
            transform.LookAt(cible);
            transform.Translate(Vector3.forward * vitesse * Time.deltaTime);
        }
        else
        {
            // Attaque avec cooldown
            if (Time.time >= nextAttackTime)
            {
                Debug.Log("Attaque!");
                
                // Infliger des dégâts au joueur
                PlayerHealth playerHealth = cible.GetComponent<PlayerHealth>();
                if (playerHealth != null)
                {
                    playerHealth.vie -= 5;
                }
                
                nextAttackTime = Time.time + cooldownAttaque;
            }
        }
    }
}`,
        solutionExplanation: 'Time.time compare le temps actuel avec nextAttackTime. Si assez de temps s\'est écoulé, l\'attaque se produit et on définit le prochain moment d\'attaque possible. GetComponent permet d\'accéder au script PlayerHealth du joueur.'
    },
    
    'web-1': {
        description: 'Crée un canvas et fais apparaître un carré qui se déplace automatiquement.',
        tasks: [
            'Créer un canvas HTML5 de 800x600',
            'Obtenir le contexte 2D',
            'Dans la game loop, dessiner un carré qui se déplace de gauche à droite'
        ],
        hints: [
            'document.getElementById pour récupérer le canvas',
            'clearRect pour effacer le canvas à chaque frame',
            'fillRect pour dessiner un rectangle'
        ],
        starter: `<!DOCTYPE html>
<html>
<body>
    <canvas id="gameCanvas" width="800" height="600"></canvas>
    
    <script>
        // Récupère le canvas
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let x = 0;
        
        function gameLoop() {
            // Ton code ici
            
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
    </script>
</body>
</html>`,
        requiredKeywords: ['clearRect', 'fillRect', 'x +='],
        solution: `<!DOCTYPE html>
<html>
<body>
    <canvas id="gameCanvas" width="800" height="600" style="border: 2px solid black;"></canvas>
    
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        
        let x = 0;
        let y = 300;
        
        function gameLoop() {
            // Effacer le canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Dessiner un carré
            ctx.fillStyle = '#6366f1';
            ctx.fillRect(x, y, 50, 50);
            
            // Déplacer le carré
            x += 2;
            
            // Recommencer quand il sort de l'écran
            if (x > canvas.width) {
                x = -50;
            }
            
            requestAnimationFrame(gameLoop);
        }
        
        gameLoop();
    </script>
</body>
</html>`,
        solutionExplanation: 'On efface le canvas à chaque frame avec clearRect, puis on dessine le carré à sa nouvelle position. x += 2 déplace le carré de 2 pixels vers la droite à chaque frame. Quand il sort de l\'écran, on le repositionne à gauche.'
    },
    
    'web-2': {
        description: 'Crée un joueur contrôlable avec les flèches du clavier.',
        tasks: [
            'Créer un objet player avec x, y, width, height et speed',
            'Gérer les événements keydown et keyup',
            'Déplacer le joueur selon les touches pressées',
            'Limiter le joueur aux bords du canvas'
        ],
        hints: [
            'Utilise un objet keys pour stocker l\'état des touches',
            'Math.max et Math.min pour les limites',
            'Vérifie plusieurs touches simultanément (WASD + flèches)'
        ],
        starter: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    speed: 5
};

const keys = {};

// Ajoute les événements clavier ici

function update() {
    // Déplacement selon les touches
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();`,
        requiredKeywords: ['keydown', 'keyup', 'keys[', 'ArrowLeft'],
        solution: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 400,
    y: 300,
    width: 40,
    height: 40,
    speed: 5
};

const keys = {};

document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

function update() {
    // Déplacement
    if (keys['ArrowLeft'] || keys['a']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s']) player.y += player.speed;
    
    // Limites du canvas
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner le joueur
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Afficher la position
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText(\`Position: (\${Math.round(player.x)}, \${Math.round(player.y)})\`, 10, 20);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();`,
        solutionExplanation: 'On stocke l\'état des touches dans un objet keys. À chaque frame, on vérifie quelles touches sont pressées et on déplace le joueur en conséquence. Math.max et Math.min empêchent le joueur de sortir du canvas.'
    }
};