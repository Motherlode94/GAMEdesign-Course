// ========================================
// EXERCICES COMPLETS - Unity, Web, Python IA
// ========================================

const EXERCISES = {
    // ==================== EXERCICES UNITY ====================
    
    'unity-1': {
        description: 'Créer un script qui affiche un compteur dans la console Unity.',
        tasks: [
            'Créer une variable privée <code>int compteur = 0</code>',
            'Dans Update(), incrémenter le compteur',
            'Afficher le compteur avec Debug.Log() tous les 60 frames'
        ],
        hints: [
            'Utilise le modulo (%) pour afficher tous les 60 frames : if (compteur % 60 == 0)',
            'compteur++ est équivalent à compteur = compteur + 1'
        ],
        placeholder: '// Écris ton code ici...',
        starter: 'using UnityEngine;\n\npublic class CompteurScript : MonoBehaviour\n{\n    private int compteur = 0;\n    \n    void Update()\n    {\n        // Ton code ici\n    }\n}',
        requiredKeywords: ['compteur++', 'Debug.Log'],
        solution: `using UnityEngine;

public class CompteurScript : MonoBehaviour
{
    private int compteur = 0;
    
    void Update()
    {
        compteur++;
        
        if (compteur % 60 == 0)
        {
            Debug.Log("Compteur: " + compteur);
        }
    }
}`,
        solutionExplanation: 'On incrémente le compteur à chaque frame, mais on affiche seulement tous les 60 frames pour éviter de spammer la console.'
    },
    
    'unity-2': {
        description: 'Normaliser le mouvement pour éviter la vitesse diagonale plus rapide.',
        tasks: [
            'Créer un vecteur direction à partir des inputs',
            'Vérifier si la magnitude est supérieure à 0.1',
            'Normaliser le vecteur avant de l\'appliquer'
        ],
        hints: [
            'direction.magnitude retourne la longueur du vecteur',
            'direction.normalized retourne un vecteur de longueur 1',
            'Sans normalisation, la diagonale = √2 ≈ 1.41x plus rapide'
        ],
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
        requiredKeywords: ['magnitude', 'normalized'],
        solution: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    
    void Update()
    {
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        
        if (direction.magnitude > 0.1f)
        {
            direction = direction.normalized;
        }
        
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        solutionExplanation: 'La normalisation garantit que le vecteur a une longueur de 1, évitant ainsi le mouvement diagonal 41% plus rapide.'
    },
    
    'unity-3': {
        description: 'Créer un système de vie avec soin et blocage de mouvement.',
        tasks: [
            'Ajouter une touche H pour soigner (+20 vie, max 100)',
            'Empêcher le mouvement si isDead == true',
            'Afficher un message quand on se soigne'
        ],
        hints: [
            'Input.GetKeyDown(KeyCode.H) détecte la touche H',
            'Mathf.Clamp(vie, 0, 100) limite la vie',
            'Utilise return pour sortir de Update() si mort'
        ],
        starter: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    public float vitesse = 5f;
    public int vie = 100;
    public bool isDead = false;
    
    void Update()
    {
        // Système de soin
        
        // Vérifier la mort
        
        // Empêcher le mouvement si mort
        
        // Déplacement
        float h = Input.GetAxis("Horizontal");
        float v = Input.GetAxis("Vertical");
        Vector3 direction = new Vector3(h, 0, v);
        transform.Translate(direction * vitesse * Time.deltaTime);
    }
}`,
        requiredKeywords: ['KeyCode.H', 'vie +=', 'isDead', 'return'],
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
        solutionExplanation: 'Le return arrête l\'exécution de Update(), empêchant le code de déplacement de s\'exécuter si le joueur est mort.'
    },
    
    'unity-4': {
        description: 'Ajouter un cooldown aux attaques de l\'ennemi.',
        tasks: [
            'Créer une variable nextAttackTime',
            'Vérifier si Time.time >= nextAttackTime',
            'Mettre à jour nextAttackTime après attaque'
        ],
        hints: [
            'Time.time donne le temps depuis le début du jeu',
            'nextAttackTime = Time.time + délai',
            'L\'attaque se produit seulement si assez de temps s\'est écoulé'
        ],
        starter: `using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public Transform cible;
    public float vitesse = 3f;
    public float distanceAttaque = 2f;
    public float cooldownAttaque = 2f;
    
    // Ajoute la variable nextAttackTime ici
    
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
            if (Time.time >= nextAttackTime)
            {
                Debug.Log("Attaque!");
                nextAttackTime = Time.time + cooldownAttaque;
            }
        }
    }
}`,
        solutionExplanation: 'Time.time est comparé à nextAttackTime. Si le temps est venu, on attaque et on définit le prochain moment d\'attaque.'
    },
    
    'unity-5': {
        description: 'Créer un système de saut avec détection du sol.',
        tasks: [
            'Ajouter une variable isGrounded',
            'Détecter la touche Espace pour sauter',
            'Appliquer une force verticale seulement si au sol'
        ],
        hints: [
            'Utilise Input.GetKeyDown(KeyCode.Space) pour le saut',
            'isGrounded doit être true pour pouvoir sauter',
            'OnCollisionEnter/Exit pour détecter le sol'
        ],
        placeholder: '// Crée un système de saut',
        starter: `using UnityEngine;

public class PlayerJump : MonoBehaviour
{
    public float forceSaut = 10f;
    private bool isGrounded = true;
    private Rigidbody rb;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
    
    void Update()
    {
        // Ton code de saut ici
    }
    
    void OnCollisionEnter(Collision collision)
    {
        // Détecte le sol
    }
    
    void OnCollisionExit(Collision collision)
    {
        // Quitte le sol
    }
}`,
        requiredKeywords: ['KeyCode.Space', 'isGrounded', 'AddForce'],
        solution: `using UnityEngine;

public class PlayerJump : MonoBehaviour
{
    public float forceSaut = 10f;
    private bool isGrounded = true;
    private Rigidbody rb;
    
    void Start()
    {
        rb = GetComponent<Rigidbody>();
    }
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && isGrounded)
        {
            rb.AddForce(Vector3.up * forceSaut, ForceMode.Impulse);
            isGrounded = false;
        }
    }
    
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = true;
        }
    }
    
    void OnCollisionExit(Collision collision)
    {
        if (collision.gameObject.CompareTag("Ground"))
        {
            isGrounded = false;
        }
    }
}`,
        solutionExplanation: 'On vérifie si le joueur est au sol avant de permettre le saut. OnCollisionEnter/Exit mettent à jour isGrounded.'
    },
    
    'unity-6': {
        description: 'Créer un système de collecte d\'objets avec score.',
        tasks: [
            'Détecter les collisions avec des objets collectables',
            'Augmenter un score',
            'Détruire l\'objet collecté',
            'Afficher le score dans la console'
        ],
        hints: [
            'Utilise OnTriggerEnter pour détecter les collectables',
            'collision.gameObject.CompareTag("Collectable")',
            'Destroy(collision.gameObject) pour supprimer',
            'Utilise une variable static pour le score global'
        ],
        starter: `using UnityEngine;

public class ItemCollector : MonoBehaviour
{
    public static int score = 0;
    
    void OnTriggerEnter(Collider other)
    {
        // Ton code ici
    }
}`,
        requiredKeywords: ['OnTriggerEnter', 'CompareTag', 'Destroy', 'score++'],
        solution: `using UnityEngine;

public class ItemCollector : MonoBehaviour
{
    public static int score = 0;
    
    void OnTriggerEnter(Collider other)
    {
        if (other.CompareTag("Collectable"))
        {
            score++;
            Debug.Log("Score: " + score);
            Destroy(other.gameObject);
        }
    }
}`,
        solutionExplanation: 'OnTriggerEnter détecte quand le joueur entre en contact avec un objet. Si c\'est un collectable, on augmente le score et on le détruit.'
    },
    
    'unity-7': {
        description: 'Créer une caméra qui suit le joueur avec smooth.',
        tasks: [
            'Récupérer la référence au joueur',
            'Calculer l\'offset entre caméra et joueur',
            'Utiliser Vector3.Lerp pour un suivi lisse',
            'Mettre à jour dans LateUpdate()'
        ],
        hints: [
            'LateUpdate() est appelé après Update(), idéal pour les caméras',
            'Vector3.Lerp(a, b, t) interpole entre a et b',
            'offset = transform.position - cible.position au départ',
            't (smoothSpeed) entre 0.01 et 0.3 pour un bon résultat'
        ],
        starter: `using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform cible;
    public float smoothSpeed = 0.125f;
    private Vector3 offset;
    
    void Start()
    {
        // Calculer l'offset initial
    }
    
    void LateUpdate()
    {
        // Suivre le joueur avec smooth
    }
}`,
        requiredKeywords: ['offset', 'Lerp', 'LateUpdate'],
        solution: `using UnityEngine;

public class CameraFollow : MonoBehaviour
{
    public Transform cible;
    public float smoothSpeed = 0.125f;
    private Vector3 offset;
    
    void Start()
    {
        offset = transform.position - cible.position;
    }
    
    void LateUpdate()
    {
        Vector3 positionDesiree = cible.position + offset;
        Vector3 positionLisse = Vector3.Lerp(transform.position, positionDesiree, smoothSpeed);
        transform.position = positionLisse;
    }
}`,
        solutionExplanation: 'Lerp crée un mouvement progressif. LateUpdate() assure que la caméra se met à jour APRÈS le mouvement du joueur.'
    },
    
    'unity-8': {
        description: 'Créer un système de tir avec projectiles.',
        tasks: [
            'Détecter la touche de tir (Espace)',
            'Instancier un projectile',
            'Donner une vélocité au projectile',
            'Ajouter un cooldown entre les tirs'
        ],
        hints: [
            'Instantiate(prefab, position, rotation) crée un objet',
            'GetComponent<Rigidbody>().velocity pour la vélocité',
            'Utilise le même système de cooldown que l\'ennemi',
            'transform.forward donne la direction devant'
        ],
        starter: `using UnityEngine;

public class PlayerShoot : MonoBehaviour
{
    public GameObject projectilePrefab;
    public Transform pointTir;
    public float vitesseProjectile = 20f;
    public float cooldownTir = 0.5f;
    private float prochainTir = 0f;
    
    void Update()
    {
        // Ton code de tir ici
    }
}`,
        requiredKeywords: ['Instantiate', 'velocity', 'Time.time'],
        solution: `using UnityEngine;

public class PlayerShoot : MonoBehaviour
{
    public GameObject projectilePrefab;
    public Transform pointTir;
    public float vitesseProjectile = 20f;
    public float cooldownTir = 0.5f;
    private float prochainTir = 0f;
    
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.Space) && Time.time >= prochainTir)
        {
            // Créer le projectile
            GameObject projectile = Instantiate(projectilePrefab, pointTir.position, pointTir.rotation);
            
            // Donner la vélocité
            Rigidbody rb = projectile.GetComponent<Rigidbody>();
            rb.velocity = pointTir.forward * vitesseProjectile;
            
            // Mettre à jour le cooldown
            prochainTir = Time.time + cooldownTir;
            
            // Détruire après 3 secondes
            Destroy(projectile, 3f);
        }
    }
}`,
        solutionExplanation: 'Instantiate crée une copie du prefab. On lui donne une vélocité dans la direction du tir. Destroy(objet, délai) le supprime après X secondes.'
    },

    // ==================== EXERCICES WEB ====================
    
    'web-1': {
        description: 'Créer un canvas et dessiner un carré animé.',
        tasks: [
            'Créer un canvas HTML5 de 800x600',
            'Obtenir le contexte 2D',
            'Dessiner un carré qui se déplace',
            'Utiliser requestAnimationFrame pour l\'animation'
        ],
        hints: [
            'clearRect(0, 0, width, height) efface le canvas',
            'fillRect(x, y, width, height) dessine un rectangle',
            'x += vitesse pour déplacer'
        ],
        starter: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 300;

function gameLoop() {
    // Ton code ici
    
    requestAnimationFrame(gameLoop);
}

gameLoop();`,
        requiredKeywords: ['clearRect', 'fillRect', 'x +='],
        solution: `const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let x = 0;
let y = 300;

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#6366f1';
    ctx.fillRect(x, y, 50, 50);
    
    x += 2;
    if (x > canvas.width) x = -50;
    
    requestAnimationFrame(gameLoop);
}

gameLoop();`,
        solutionExplanation: 'On efface le canvas, dessine le carré, déplace x, et recommence. RequestAnimationFrame crée une boucle fluide à 60 FPS.'
    },
    
    'web-2': {
        description: 'Créer un joueur contrôlable avec les flèches.',
        tasks: [
            'Créer un objet player avec position',
            'Gérer les événements keydown et keyup',
            'Déplacer le joueur selon les touches',
            'Limiter aux bords du canvas'
        ],
        hints: [
            'keys[e.key] = true dans keydown',
            'keys[e.key] = false dans keyup',
            'Math.max(0, ...) et Math.min(max, ...) pour limites'
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
    // Déplacement
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
        requiredKeywords: ['keydown', 'keyup', 'ArrowLeft', 'Math.max'],
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
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    
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
        solutionExplanation: 'On stocke l\'état des touches dans keys. Update() vérifie et applique le mouvement. Math.max/min empêchent de sortir.'
    },
    
    'web-3': {
        description: 'Ajouter des collisions entre joueur et obstacles.',
        tasks: [
            'Créer des obstacles sur le canvas',
            'Implémenter une fonction checkCollision()',
            'Détecter si le joueur touche un obstacle',
            'Afficher "Game Over" en cas de collision'
        ],
        hints: [
            'Collision AABB : rect1.x < rect2.x + rect2.width && ...',
            'Créer un tableau d\'obstacles',
            'Vérifier collision dans update()',
            'Arrêter le jeu si collision'
        ],
        starter: `const obstacles = [
    {x: 200, y: 200, width: 60, height: 60},
    {x: 500, y: 300, width: 60, height: 60}
];

function checkCollision(rect1, rect2) {
    // Ton code de collision ici
}

function update() {
    // Mouvement du joueur
    
    // Vérifier collisions
    obstacles.forEach(obstacle => {
        if (checkCollision(player, obstacle)) {
            // Game Over
        }
    });
}`,
        requiredKeywords: ['checkCollision', 'rect1.x <', '&&'],
        solution: `const obstacles = [
    {x: 200, y: 200, width: 60, height: 60, color: '#ef4444'},
    {x: 500, y: 300, width: 60, height: 60, color: '#ef4444'}
];

let gameOver = false;

function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

function update() {
    if (gameOver) return;
    
    // Mouvement du joueur
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    
    // Limites
    player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
    player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));
    
    // Vérifier collisions
    obstacles.forEach(obstacle => {
        if (checkCollision(player, obstacle)) {
            gameOver = true;
            alert('Game Over!');
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner obstacles
    obstacles.forEach(obs => {
        ctx.fillStyle = obs.color;
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    });
    
    // Dessiner joueur
    ctx.fillStyle = gameOver ? '#gray' : '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    if (gameOver) {
        ctx.fillStyle = 'red';
        ctx.font = '48px Arial';
        ctx.fillText('GAME OVER', canvas.width/2 - 150, canvas.height/2);
    }
}`,
        solutionExplanation: 'AABB (Axis-Aligned Bounding Box) détecte si deux rectangles se chevauchent en vérifiant leurs bords.'
    },
    
    'web-4': {
        description: 'Créer un système de score avec collectables.',
        tasks: [
            'Créer des objets à collecter',
            'Détecter collision joueur-collectable',
            'Augmenter le score',
            'Supprimer l\'objet collecté',
            'Afficher le score'
        ],
        hints: [
            'Array.splice(index, 1) supprime un élément',
            'forEach avec index : collectables.forEach((c, i) => ...)',
            'ctx.fillText(text, x, y) affiche du texte'
        ],
        starter: `let score = 0;
const collectables = [
    {x: 100, y: 100, width: 20, height: 20},
    {x: 300, y: 200, width: 20, height: 20},
    {x: 600, y: 400, width: 20, height: 20}
];

function update() {
    // Mouvement
    
    // Vérifier collisions avec collectables
}

function draw() {
    // Dessiner tout
    
    // Afficher score
}`,
        requiredKeywords: ['score++', 'splice', 'fillText'],
        solution: `let score = 0;
const collectables = [
    {x: 100, y: 100, width: 20, height: 20, color: '#fbbf24'},
    {x: 300, y: 200, width: 20, height: 20, color: '#fbbf24'},
    {x: 600, y: 400, width: 20, height: 20, color: '#fbbf24'},
    {x: 700, y: 150, width: 20, height: 20, color: '#fbbf24'}
];

function update() {
    // Mouvement du joueur
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    
    // Vérifier collisions avec collectables
    for (let i = collectables.length - 1; i >= 0; i--) {
        if (checkCollision(player, collectables[i])) {
            score += 10;
            collectables.splice(i, 1);
        }
    }
    
    // Victoire si tous collectés
    if (collectables.length === 0) {
        alert('Bravo ! Score final : ' + score);
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner collectables
    collectables.forEach(c => {
        ctx.fillStyle = c.color;
        ctx.fillRect(c.x, c.y, c.width, c.height);
    });
    
    // Dessiner joueur
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Afficher score
    ctx.fillStyle = 'white';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 10, 30);
}`,
        solutionExplanation: 'On parcourt les collectables à l\'envers (pour pouvoir supprimer sans bug d\'index). Splice supprime l\'élément du tableau.'
    },
    
    'web-5': {
        description: 'Ajouter un système de particules simples.',
        tasks: [
            'Créer une classe Particle',
            'Générer des particules à la position du joueur',
            'Animer les particules (fade out)',
            'Supprimer les particules mortes'
        ],
        hints: [
            'Particule : {x, y, vx, vy, life, maxLife}',
            'life -= deltaTime pour fade',
            'alpha = life / maxLife pour transparence'
        ],
        starter: `const particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Ajoute propriétés ici
    }
    
    update() {
        // Animation
    }
    
    draw(ctx) {
        // Dessin
    }
}

function createParticles(x, y, count) {
    // Créer plusieurs particules
}

function updateParticles() {
    // Mettre à jour et nettoyer
}`,
        requiredKeywords: ['Particle', 'life', 'globalAlpha'],
        solution: `const particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.life = 1;
        this.maxLife = 1;
        this.size = Math.random() * 5 + 2;
        this.color = \`hsl(\${Math.random() * 360}, 100%, 50%)\`;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.02;
    }
    
    draw(ctx) {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);
        ctx.globalAlpha = 1;
    }
    
    isDead() {
        return this.life <= 0;
    }
}

function createParticles(x, y, count = 10) {
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(x, y));
    }
}

function updateParticles() {
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        
        if (particles[i].isDead()) {
            particles.splice(i, 1);
        }
    }
}

function drawParticles(ctx) {
    particles.forEach(p => p.draw(ctx));
}

// Dans le gameLoop
function update() {
    // ... mouvement joueur ...
    
    // Créer particules quand on bouge
    if (keys['ArrowLeft'] || keys['ArrowRight'] || keys['ArrowUp'] || keys['ArrowDown']) {
        if (Math.random() < 0.3) {  // 30% de chance
            createParticles(player.x + player.width/2, player.y + player.height/2, 2);
        }
    }
    
    updateParticles();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawParticles(ctx);
    
    // Dessiner joueur
    ctx.fillStyle = '#10b981';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}`,
        solutionExplanation: 'Les particules ont une vélocité aléatoire et perdent de la vie. GlobalAlpha contrôle la transparence pour un fade out élégant.'
    },

    // ==================== EXERCICES PYTHON IA ====================
    
    'python-1': {
        description: 'Créer une IA qui prend des décisions aléatoires.',
        tasks: [
            'Créer une classe IAAleatoire qui hérite de GameAI',
            'Override prendre_decision()',
            'Retourner une action aléatoire parmi les possibles'
        ],
        hints: [
            'import random',
            'random.choice(liste) choisit un élément au hasard',
            'Appelle obtenir_actions_possibles() de la classe parente'
        ],
        placeholder: '# Crée ton IA aléatoire',
        starter: `import random

class GameAI:
    def __init__(self, nom="IA"):
        self.nom = nom
        self.score = 0
    
    def obtenir_actions_possibles(self, etat_jeu):
        return ['haut', 'bas', 'gauche', 'droite']
    
    def prendre_decision(self, etat_jeu):
        # À override
        pass

class IAAleatoire(GameAI):
    # Ton code ici
    pass`,
        requiredKeywords: ['class IAAleatoire', 'prendre_decision', 'random.choice'],
        solution: `import random

class GameAI:
    def __init__(self, nom="IA"):
        self.nom = nom
        self.score = 0
    
    def obtenir_actions_possibles(self, etat_jeu):
        return ['haut', 'bas', 'gauche', 'droite']
    
    def prendre_decision(self, etat_jeu):
        pass

class IAAleatoire(GameAI):
    def __init__(self, nom="IA_Random"):
        super().__init__(nom)
    
    def prendre_decision(self, etat_jeu):
        actions = self.obtenir_actions_possibles(etat_jeu)
        return random.choice(actions)

# Test
ia = IAAleatoire("MonIA")
etat = {}
for i in range(5):
    action = ia.prendre_decision(etat)
    print(f"Action choisie : {action}")`,
        solutionExplanation: 'L\'IA hérite de GameAI et override prendre_decision() pour retourner une action aléatoire via random.choice().'
    },
    
    'python-2': {
        description: 'Implémenter l\'heuristique euclidienne pour A*.',
        tasks: [
            'Créer une fonction heuristique_euclidienne()',
            'Calculer la distance avec sqrt((x1-x2)² + (y1-y2)²)',
            'Tester avec différents points'
        ],
        hints: [
            'import math',
            'math.sqrt() pour racine carrée',
            '** 2 pour mettre au carré',
            'Retourner un float'
        ],
        starter: `import math

def heuristique_euclidienne(pos1, pos2):
    # Ton code ici
    pass

# Tests
print(heuristique_euclidienne((0, 0), (3, 4)))  # Devrait donner 5.0
print(heuristique_euclidienne((0, 0), (1, 1)))  # Devrait donner ~1.41`,
        requiredKeywords: ['math.sqrt', '** 2', 'pos1[0]'],
        solution: `import math

def heuristique_euclidienne(pos1, pos2):
    """Distance euclidienne entre deux points"""
    dx = pos1[0] - pos2[0]
    dy = pos1[1] - pos2[1]
    return math.sqrt(dx**2 + dy**2)

# Tests
print(f"Distance (0,0) à (3,4) : {heuristique_euclidienne((0, 0), (3, 4))}")  # 5.0
print(f"Distance (0,0) à (1,1) : {heuristique_euclidienne((0, 0), (1, 1))}")  # 1.414...
print(f"Distance (5,5) à (8,9) : {heuristique_euclidienne((5, 5), (8, 9))}")  # 5.0`,
        solutionExplanation: 'La distance euclidienne est la ligne droite entre deux points. Utilisée pour les mouvements libres (pas de grille).'
    },
    
    'python-3': {
        description: 'Créer un arbre de décision pour un PNJ marchand.',
        tasks: [
            'Créer des nœuds de décision',
            'Arbre : vérifie relation avec joueur',
            'Actions : vendre, acheter, refuser, offrir quête'
        ],
        hints: [
            'Utilise la classe NoeudDecision',
            'Conditions : est_ami, a_argent, a_objets',
            'Feuilles : actions finales'
        ],
        starter: `class NoeudDecision:
    def __init__(self, question=None, oui=None, non=None, action=None):
        self.question = question
        self.oui = oui
        self.non = non
        self.action = action
    
    def evaluer(self, etat):
        if self.action:
            return self.action
        if self.question(etat):
            return self.oui.evaluer(etat)
        else:
            return self.non.evaluer(etat)

# Crée l'arbre pour un marchand
def construire_arbre_marchand():
    # Ton code ici
    pass`,
        requiredKeywords: ['NoeudDecision', 'question', 'action'],
        solution: `class NoeudDecision:
    def __init__(self, question=None, oui=None, non=None, action=None):
        self.question = question
        self.oui = oui
        self.non = non
        self.action = action
    
    def evaluer(self, etat):
        if self.action:
            return self.action
        if self.question(etat):
            return self.oui.evaluer(etat)
        else:
            return self.non.evaluer(etat)

def construire_arbre_marchand():
    # Fonctions de conditions
    def est_ami(etat):
        return etat.get('relation', 0) >= 50
    
    def a_argent(etat):
        return etat.get('argent', 0) >= 100
    
    def a_objets(etat):
        return len(etat.get('inventaire', [])) > 0
    
    # Actions finales
    vendre = NoeudDecision(action="VENDRE")
    acheter = NoeudDecision(action="ACHETER")
    refuser = NoeudDecision(action="REFUSER")
    offrir_quete = NoeudDecision(action="OFFRIR_QUETE")
    
    # Sous-arbre si ami
    noeud_ami = NoeudDecision(
        question=a_argent,
        oui=vendre,
        non=offrir_quete
    )
    
    # Sous-arbre si pas ami
    noeud_pas_ami = NoeudDecision(
        question=a_objets,
        oui=acheter,
        non=refuser
    )
    
    # Racine
    arbre = NoeudDecision(
        question=est_ami,
        oui=noeud_ami,
        non=noeud_pas_ami
    )
    
    return arbre

# Test
marchand = construire_arbre_marchand()

# Scénario 1 : Ami avec argent
etat1 = {'relation': 60, 'argent': 150}
print(f"Ami avec argent : {marchand.evaluer(etat1)}")  # VENDRE

# Scénario 2 : Pas ami mais a objets
etat2 = {'relation': 20, 'inventaire': ['épée']}
print(f"Pas ami avec objets : {marchand.evaluer(etat2)}")  # ACHETER

# Scénario 3 : Ami sans argent
etat3 = {'relation': 70, 'argent': 10}
print(f"Ami sans argent : {marchand.evaluer(etat3)}")  # OFFRIR_QUETE`,
        solutionExplanation: 'L\'arbre vérifie d\'abord la relation, puis adapte le comportement. Un ami se voit proposer des services, un étranger est traité commercialement.'
    },
    
    'python-4': {
        description: 'Implémenter epsilon-greedy pour Q-Learning.',
        tasks: [
            'Créer la méthode choisir_action()',
            'Avec probabilité epsilon : action aléatoire',
            'Sinon : meilleure action selon Q-table'
        ],
        hints: [
            'random.random() retourne float entre 0 et 1',
            'np.argmax(q_table[etat]) donne meilleure action',
            'random.randint(0, nb_actions-1) pour aléatoire'
        ],
        starter: `import numpy as np
import random

class QLearningAgent:
    def __init__(self, nb_etats, nb_actions, epsilon=0.1):
        self.nb_etats = nb_etats
        self.nb_actions = nb_actions
        self.epsilon = epsilon
        self.q_table = np.zeros((nb_etats, nb_actions))
    
    def choisir_action(self, etat):
        # Ton code epsilon-greedy ici
        pass

# Test
agent = QLearningAgent(10, 4, epsilon=0.2)
agent.q_table[5] = [1.0, 0.5, 3.0, 0.2]  # État 5 avec valeurs

# Test sur 100 essais
actions = [agent.choisir_action(5) for _ in range(100)]
print(f"Action 2 (meilleure) choisie {actions.count(2)} fois sur 100")`,
        requiredKeywords: ['epsilon', 'random.random', 'np.argmax'],
        solution: `import numpy as np
import random

class QLearningAgent:
    def __init__(self, nb_etats, nb_actions, epsilon=0.1):
        self.nb_etats = nb_etats
        self.nb_actions = nb_actions
        self.epsilon = epsilon
        self.q_table = np.zeros((nb_etats, nb_actions))
    
    def choisir_action(self, etat):
        """Epsilon-greedy : explore ou exploite"""
        if random.random() < self.epsilon:
            # Exploration : action aléatoire
            return random.randint(0, self.nb_actions - 1)
        else:
            # Exploitation : meilleure action
            return np.argmax(self.q_table[etat])

# Test
agent = QLearningAgent(10, 4, epsilon=0.2)
agent.q_table[5] = [1.0, 0.5, 3.0, 0.2]

# Test sur 1000 essais
actions = [agent.choisir_action(5) for _ in range(1000)]
print(f"Action 2 (meilleure) : {actions.count(2)} fois (~800)")
print(f"Actions aléatoires : {1000 - actions.count(2)} fois (~200)")
print(f"Exploration rate : {(1000 - actions.count(2))/1000:.1%}")`,
        solutionExplanation: 'Avec epsilon=0.2, on explore 20% du temps (action aléatoire) et on exploite 80% du temps (meilleure action). Essentiel pour trouver de nouvelles stratégies.'
    }
};
