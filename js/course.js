// ==========================================
// EXEMPLE DE DONNÉES - UNITY COURSES
// ==========================================

const UNITY_COURSES = {
    '1': {
        title: 'Chapitre 1 : Scripts de Base',
        intro: 'Apprends à créer ton premier script Unity et à afficher des messages dans la console.',
        code: `using UnityEngine;

public class HelloWorld : MonoBehaviour
{
    // Start est appelé au début
    void Start()
    {
        Debug.Log("Bonjour Unity !");
        Debug.Log("Mon premier script fonctionne !");
    }
    
    // Update est appelé à chaque frame
    void Update()
    {
        // Ce code s'exécute continuellement
    }
}`,
        explanation: `
            <p><strong>using UnityEngine;</strong> - Importe les fonctions de Unity</p>
            <p><strong>MonoBehaviour</strong> - Classe de base pour tous les scripts Unity</p>
            <p><strong>Start()</strong> - Fonction appelée une fois au début</p>
            <p><strong>Update()</strong> - Fonction appelée à chaque frame (60 fois par seconde)</p>
            <p><strong>Debug.Log()</strong> - Affiche un message dans la console</p>
        `,
        exercises: [
            'Crée un script qui affiche "Bienvenue dans mon jeu !"',
            'Ajoute un compteur qui s\'incrémente dans Update',
            'Affiche le compteur toutes les 60 frames'
        ],
        bestPractices: `
            <ul>
                <li>✅ Nomme tes scripts avec une majuscule (PlayerController, GameManager)</li>
                <li>✅ Le nom du fichier DOIT correspondre au nom de la classe</li>
                <li>✅ Utilise Debug.Log() pour déboguer ton code</li>
                <li>❌ N'oublie pas le ";" à la fin de chaque ligne</li>
            </ul>
        `
    },
    
    '2': {
        title: 'Chapitre 2 : Déplacement du Joueur',
        intro: 'Apprends à déplacer un objet dans Unity avec les touches du clavier.',
        code: `using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public float speed = 5f;
    
    void Update()
    {
        // Récupérer les inputs
        float horizontal = Input.GetAxis("Horizontal"); // A/D ou Flèches
        float vertical = Input.GetAxis("Vertical");     // W/S ou Flèches
        
        // Créer un vecteur de mouvement
        Vector3 movement = new Vector3(horizontal, 0, vertical);
        
        // Déplacer l'objet
        transform.Translate(movement * speed * Time.deltaTime);
    }
}`,
        explanation: `
            <p><strong>public float speed</strong> - Variable visible dans l'inspecteur Unity</p>
            <p><strong>Input.GetAxis()</strong> - Récupère les touches pressées (-1 à 1)</p>
            <p><strong>Vector3</strong> - Un point dans l'espace 3D (x, y, z)</p>
            <p><strong>transform.Translate()</strong> - Déplace l'objet</p>
            <p><strong>Time.deltaTime</strong> - Temps écoulé depuis la dernière frame (pour un mouvement fluide)</p>
        `,
        exercises: [
            'Crée un système de mouvement avec WASD',
            'Ajoute une vitesse de sprint (Shift)',
            'Empêche le joueur d\'aller plus vite en diagonale (normalize)'
        ]
    },
    
    '3': {
        title: 'Chapitre 3 : Système de Vie',
        intro: 'Implémente un système de santé pour ton personnage.',
        code: `using UnityEngine;

public class HealthSystem : MonoBehaviour
{
    public int maxHealth = 100;
    private int currentHealth;
    
    void Start()
    {
        currentHealth = maxHealth;
        Debug.Log("Vie : " + currentHealth + "/" + maxHealth);
    }
    
    public void TakeDamage(int damage)
    {
        currentHealth -= damage;
        Debug.Log("Aïe ! Vie restante : " + currentHealth);
        
        if (currentHealth <= 0)
        {
            Die();
        }
    }
    
    public void Heal(int amount)
    {
        currentHealth += amount;
        if (currentHealth > maxHealth)
        {
            currentHealth = maxHealth;
        }
        Debug.Log("Soigné ! Vie : " + currentHealth);
    }
    
    void Die()
    {
        Debug.Log("Game Over !");
        Destroy(gameObject);
    }
}`,
        explanation: `
            <p><strong>private</strong> - Variable cachée (seulement dans ce script)</p>
            <p><strong>public</strong> - Variable visible partout et dans l'inspecteur</p>
            <p><strong>TakeDamage()</strong> - Fonction publique appelable depuis d'autres scripts</p>
            <p><strong>Destroy(gameObject)</strong> - Détruit cet objet</p>
            <p><strong>if/else</strong> - Conditions pour contrôler le flux du programme</p>
        `,
        exercises: [
            'Ajoute une barre de vie visuelle',
            'Crée un système de régénération automatique',
            'Implémente des potions de soin'
        ]
    },
    
    '4': {
        title: 'Chapitre 4 : IA Ennemie Simple',
        intro: 'Crée une IA qui suit le joueur automatiquement.',
        code: `using UnityEngine;

public class EnemyAI : MonoBehaviour
{
    public Transform player;      // Référence au joueur
    public float speed = 3f;       // Vitesse de l'ennemi
    public float stopDistance = 2f; // Distance d'arrêt
    
    void Update()
    {
        if (player != null)
        {
            // Calculer la distance au joueur
            float distance = Vector3.Distance(transform.position, player.position);
            
            // Si trop loin, se rapprocher
            if (distance > stopDistance)
            {
                // Direction vers le joueur
                Vector3 direction = (player.position - transform.position).normalized;
                
                // Se déplacer
                transform.position += direction * speed * Time.deltaTime;
                
                // Regarder vers le joueur
                transform.LookAt(player);
            }
        }
    }
}`,
        explanation: `
            <p><strong>Transform</strong> - Position, rotation et échelle d'un objet</p>
            <p><strong>Vector3.Distance()</strong> - Calcule la distance entre deux points</p>
            <p><strong>normalized</strong> - Convertit un vecteur en longueur 1 (direction pure)</p>
            <p><strong>LookAt()</strong> - Fait regarder l'objet vers une cible</p>
        `,
        exercises: [
            'Ajoute un rayon de détection (ne suit que si proche)',
            'Crée un système d\'attaque au contact',
            'Implémente un cooldown entre les attaques'
        ]
    },
    
    '5': {
        title: 'Chapitre 5 : Comportements Complexes',
        intro: 'Crée une IA avec plusieurs états (patrouille, poursuite, attaque).',
        code: `using UnityEngine;

public class AdvancedEnemy : MonoBehaviour
{
    public enum State { Patrol, Chase, Attack }
    public State currentState = State.Patrol;
    
    public Transform player;
    public Transform[] patrolPoints;
    public float detectionRange = 10f;
    public float attackRange = 2f;
    public float speed = 3f;
    
    private int currentPatrolIndex = 0;
    
    void Update()
    {
        float distanceToPlayer = Vector3.Distance(transform.position, player.position);
        
        // Machine à états
        switch (currentState)
        {
            case State.Patrol:
                Patrol();
                if (distanceToPlayer < detectionRange)
                    currentState = State.Chase;
                break;
                
            case State.Chase:
                Chase();
                if (distanceToPlayer < attackRange)
                    currentState = State.Attack;
                else if (distanceToPlayer > detectionRange * 1.5f)
                    currentState = State.Patrol;
                break;
                
            case State.Attack:
                Attack();
                if (distanceToPlayer > attackRange)
                    currentState = State.Chase;
                break;
        }
    }
    
    void Patrol()
    {
        if (patrolPoints.Length == 0) return;
        
        Transform targetPoint = patrolPoints[currentPatrolIndex];
        MoveTowards(targetPoint.position);
        
        if (Vector3.Distance(transform.position, targetPoint.position) < 0.5f)
        {
            currentPatrolIndex = (currentPatrolIndex + 1) % patrolPoints.Length;
        }
    }
    
    void Chase()
    {
        MoveTowards(player.position);
    }
    
    void Attack()
    {
        transform.LookAt(player);
        Debug.Log("Attaque !");
    }
    
    void MoveTowards(Vector3 target)
    {
        Vector3 direction = (target - transform.position).normalized;
        transform.position += direction * speed * Time.deltaTime;
    }
}`,
        explanation: `
            <p><strong>enum</strong> - Liste de valeurs possibles (États)</p>
            <p><strong>switch/case</strong> - Sélectionne du code selon une valeur</p>
            <p><strong>State Machine</strong> - Système de comportements multiples</p>
            <p><strong>Arrays []</strong> - Liste d'éléments du même type</p>
        `,
        exercises: [
            'Ajoute un état "Flee" (fuite si vie basse)',
            'Crée des animations pour chaque état',
            'Implémente un système de vision (angle de vue)'
        ]
    },
    
    '6': {
        title: 'Chapitre 6 : Contrôle de Véhicule',
        intro: 'Apprends à créer un contrôleur de voiture simple.',
        code: `using UnityEngine;

public class CarController : MonoBehaviour
{
    public float motorForce = 1500f;
    public float steerAngle = 30f;
    public float brakeForce = 3000f;
    
    public WheelCollider frontLeftWheel;
    public WheelCollider frontRightWheel;
    public WheelCollider rearLeftWheel;
    public WheelCollider rearRightWheel;
    
    private float currentSteerAngle;
    private float currentBrakeForce;
    
    void FixedUpdate()
    {
        GetInput();
        Steer();
        Accelerate();
        UpdateWheelPoses();
    }
    
    void GetInput()
    {
        currentSteerAngle = steerAngle * Input.GetAxis("Horizontal");
        
        if (Input.GetKey(KeyCode.Space))
            currentBrakeForce = brakeForce;
        else
            currentBrakeForce = 0f;
    }
    
    void Steer()
    {
        frontLeftWheel.steerAngle = currentSteerAngle;
        frontRightWheel.steerAngle = currentSteerAngle;
    }
    
    void Accelerate()
    {
        float motor = motorForce * Input.GetAxis("Vertical");
        
        frontLeftWheel.motorTorque = motor;
        frontRightWheel.motorTorque = motor;
        
        ApplyBraking();
    }
    
    void ApplyBraking()
    {
        frontLeftWheel.brakeTorque = currentBrakeForce;
        frontRightWheel.brakeTorque = currentBrakeForce;
        rearLeftWheel.brakeTorque = currentBrakeForce;
        rearRightWheel.brakeTorque = currentBrakeForce;
    }
    
    void UpdateWheelPoses()
    {
        UpdateWheelPose(frontLeftWheel);
        UpdateWheelPose(frontRightWheel);
        UpdateWheelPose(rearLeftWheel);
        UpdateWheelPose(rearRightWheel);
    }
    
    void UpdateWheelPose(WheelCollider collider)
    {
        // Code pour synchroniser les modèles 3D des roues
    }
}`,
        explanation: `
            <p><strong>WheelCollider</strong> - Composant Unity pour les roues physiques</p>
            <p><strong>FixedUpdate()</strong> - Appelé à intervalle fixe (physique)</p>
            <p><strong>motorTorque</strong> - Force appliquée aux roues motrices</p>
            <p><strong>steerAngle</strong> - Angle de direction des roues</p>
            <p><strong>brakeTorque</strong> - Force de freinage</p>
        `,
        exercises: [
            'Ajoute un compteur de vitesse',
            'Crée un système de boost (Nitro)',
            'Implémente un indicateur de collision'
        ]
    }
};

// ==========================================
// EXEMPLE DE DONNÉES - WEB COURSES
// ==========================================

const WEB_COURSES = {
    'canvas': {
        title: 'Module 1 : Canvas & Game Loop',
        intro: 'Apprends à créer un canvas HTML5 et une boucle de jeu.',
        code: `// Récupérer le canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Taille du canvas
canvas.width = 800;
canvas.height = 600;

// Variables du jeu
let player = {
    x: 400,
    y: 300,
    size: 20,
    color: 'blue'
};

// Fonction de dessin
function draw() {
    // Effacer l'écran
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dessiner le joueur
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

// Fonction de mise à jour
function update() {
    // Logique du jeu ici
}

// Boucle de jeu
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Démarrer le jeu
gameLoop();`,
        explanation: `
            <p><strong>canvas</strong> - Élément HTML pour dessiner</p>
            <p><strong>getContext('2d')</strong> - Active le mode 2D</p>
            <p><strong>clearRect()</strong> - Efface une zone du canvas</p>
            <p><strong>fillRect()</strong> - Dessine un rectangle plein</p>
            <p><strong>requestAnimationFrame()</strong> - Boucle optimisée (60 FPS)</p>
        `,
        exercises: [
            'Crée un canvas avec un fond coloré',
            'Dessine plusieurs formes (cercles, triangles)',
            'Anime un carré qui se déplace automatiquement'
        ]
    },
    
    'input': {
        title: 'Module 2 : Gestion des Inputs',
        intro: 'Apprends à détecter les touches du clavier pour contrôler le joueur.',
        code: `const keys = {};

// Détecter les touches pressées
document.addEventListener('keydown', (e) => {
    keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
    keys[e.key] = false;
});

// Variables du joueur
let player = {
    x: 400,
    y: 300,
    speed: 5
};

function update() {
    // Mouvement avec les flèches
    if (keys['ArrowUp']) player.y -= player.speed;
    if (keys['ArrowDown']) player.y += player.speed;
    if (keys['ArrowLeft']) player.x -= player.speed;
    if (keys['ArrowRight']) player.x += player.speed;
    
    // Limites de l'écran
    player.x = Math.max(0, Math.min(canvas.width - 20, player.x));
    player.y = Math.max(0, Math.min(canvas.height - 20, player.y));
}`,
        explanation: `
            <p><strong>addEventListener</strong> - Écoute les événements (clavier, souris)</p>
            <p><strong>keydown/keyup</strong> - Événements des touches</p>
            <p><strong>keys[e.key]</strong> - Stocke l'état de chaque touche</p>
            <p><strong>Math.max/min</strong> - Limite une valeur entre min et max</p>
        `,
        exercises: [
            'Ajoute le contrôle avec WASD',
            'Crée un système de sprint (vitesse double)',
            'Implémente une attaque avec la barre d\'espace'
        ]
    },
    
    'collision': {
        title: 'Module 3 : Détection de Collisions',
        intro: 'Apprends à détecter quand deux objets se touchent.',
        code: `// Fonction de détection de collision (AABB)
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Exemple d'utilisation
let player = { x: 100, y: 100, width: 30, height: 30 };
let enemy = { x: 200, y: 150, width: 30, height: 30 };

function update() {
    if (checkCollision(player, enemy)) {
        console.log("Collision détectée !");
        // Faire quelque chose (dégâts, game over, etc.)
    }
}

// Collision avec cercles (distance)
function checkCircleCollision(circle1, circle2) {
    const dx = circle1.x - circle2.x;
    const dy = circle1.y - circle2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    return distance < circle1.radius + circle2.radius;
}`,
        explanation: `
            <p><strong>AABB</strong> - Axis-Aligned Bounding Box (collision rectangulaire)</p>
            <p><strong>&&</strong> - ET logique (toutes les conditions doivent être vraies)</p>
            <p><strong>Math.sqrt()</strong> - Racine carrée (pour la distance)</p>
            <p><strong>dx, dy</strong> - Différence en x et y entre deux points</p>
        `,
        exercises: [
            'Crée un jeu où le joueur évite des obstacles',
            'Ajoute un système de collecte de pièces',
            'Implémente des murs infranchissables'
        ]
    },
    
    'ai': {
        title: 'Module 4 : IA Simple',
        intro: 'Crée une IA qui suit le joueur intelligemment.',
        code: `class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.size = 20;
    }
    
    // Suivre le joueur
    chasePlayer(player) {
        // Calculer la direction
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Normaliser (direction de longueur 1)
        if (distance > 0) {
            this.x += (dx / distance) * this.speed;
            this.y += (dy / distance) * this.speed;
        }
    }
    
    // Patrouiller entre deux points
    patrol(pointA, pointB, currentTarget) {
        const target = currentTarget === 'A' ? pointA : pointB;
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
            // Changer de cible
            return currentTarget === 'A' ? 'B' : 'A';
        }
        
        this.x += (dx / distance) * this.speed;
        this.y += (dy / distance) * this.speed;
        
        return currentTarget;
    }
    
    draw(ctx) {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}`,
        explanation: `
            <p><strong>class</strong> - Crée un modèle d'objet réutilisable</p>
            <p><strong>constructor</strong> - Initialise un nouvel objet</p>
            <p><strong>this</strong> - Fait référence à l'objet actuel</p>
            <p><strong>Normalisation</strong> - Diviser par la distance = vecteur de longueur 1</p>
        `,
        exercises: [
            'Crée plusieurs ennemis qui patrouillent',
            'Ajoute un rayon de détection (ne chasse que si proche)',
            'Implémente une IA qui fuit quand sa vie est basse'
        ]
    }
};

// ==========================================
// EXEMPLE DE DONNÉES - PYTHON AI COURSES
// ==========================================

const PYTHON_AI_COURSES = {
    'basics': {
        title: 'Module 1 : IA Aléatoire',
        intro: 'Crée une IA qui fait des choix aléatoires (baseline pour comparer).',
        code: `import random

class RandomAI:
    """IA qui fait des choix complètement aléatoires"""
    
    def __init__(self, actions):
        self.actions = actions  # Liste des actions possibles
    
    def choose_action(self, game_state):
        """Choisit une action au hasard"""
        return random.choice(self.actions)

# Exemple d'utilisation
actions = ['haut', 'bas', 'gauche', 'droite']
ai = RandomAI(actions)

# Dans une boucle de jeu
for step in range(10):
    action = ai.choose_action(game_state=None)
    print(f"Step {step}: {action}")`,
        explanation: `
            <p><strong>class</strong> - Crée un type d'objet personnalisé</p>
            <p><strong>__init__</strong> - Constructeur (initialisation)</p>
            <p><strong>self</strong> - Référence à l'instance actuelle</p>
            <p><strong>random.choice()</strong> - Choisit un élément au hasard</p>
            <p><strong>Docstring """</strong> - Documentation de la classe/fonction</p>
        `,
        exercises: [
            'Crée une IA aléatoire pour un jeu de morpion',
            'Ajoute des statistiques (combien de fois chaque action)',
            'Compare avec une IA qui choisit toujours la même action'
        ]
    },
    
    'pathfinding': {
        title: 'Module 2 : Pathfinding A*',
        intro: 'Implémente l\'algorithme A* pour trouver le chemin le plus court.',
        code: `import heapq
import math

class Node:
    def __init__(self, position, parent=None):
        self.position = position
        self.parent = parent
        self.g = 0  # Coût depuis le départ
        self.h = 0  # Heuristique (estimation vers l'arrivée)
        self.f = 0  # Coût total (g + h)
    
    def __lt__(self, other):
        return self.f < other.f

def heuristic(pos1, pos2):
    """Distance euclidienne"""
    dx = pos1[0] - pos2[0]
    dy = pos1[1] - pos2[1]
    return math.sqrt(dx*dx + dy*dy)

def astar(start, goal, obstacles):
    """Algorithme A* pour trouver le chemin"""
    open_list = []
    closed_set = set()
    
    start_node = Node(start)
    goal_node = Node(goal)
    
    heapq.heappush(open_list, start_node)
    
    while open_list:
        current = heapq.heappop(open_list)
        closed_set.add(current.position)
        
        # Objectif atteint
        if current.position == goal:
            path = []
            while current:
                path.append(current.position)
                current = current.parent
            return path[::-1]  # Inverser
        
        # Explorer les voisins
        for dx, dy in [(0,1), (0,-1), (1,0), (-1,0)]:
            new_pos = (current.position[0] + dx, current.position[1] + dy)
            
            if new_pos in obstacles or new_pos in closed_set:
                continue
            
            neighbor = Node(new_pos, current)
            neighbor.g = current.g + 1
            neighbor.h = heuristic(new_pos, goal)
            neighbor.f = neighbor.g + neighbor.h
            
            heapq.heappush(open_list, neighbor)
    
    return None  # Pas de chemin trouvé

# Exemple
start = (0, 0)
goal = (5, 5)
obstacles = {(2, 2), (2, 3), (2, 4)}

path = astar(start, goal, obstacles)
print("Chemin trouvé:", path)`,
        explanation: `
            <p><strong>A*</strong> - Algorithme de recherche de chemin optimal</p>
            <p><strong>g</strong> - Coût réel depuis le départ</p>
            <p><strong>h</strong> - Heuristique (estimation du coût restant)</p>
            <p><strong>f = g + h</strong> - Coût total estimé</p>
            <p><strong>heapq</strong> - File de priorité (toujours le plus petit f en premier)</p>
        `,
        exercises: [
            'Ajoute les mouvements diagonaux',
            'Visualise le chemin avec matplotlib',
            'Compare avec Dijkstra (sans heuristique)'
        ],
        bestPractices: `
            <ul>
                <li>✅ Utilise une bonne heuristique (distance euclidienne ou Manhattan)</li>
                <li>✅ Vérifie que l'heuristique est admissible (ne surestime jamais)</li>
                <li>✅ Utilise un set pour closed_list (recherche en O(1))</li>
                <li>❌ N'oublie pas de vérifier les limites de la grille</li>
            </ul>
        `
    },
    
    'decision': {
        title: 'Module 3 : Arbres de Décision',
        intro: 'Crée une IA qui prend des décisions selon l\'état du jeu.',
        code: `class DecisionTree:
    """Arbre de décision pour un PNJ marchand"""
    
    def __init__(self):
        self.mood = "neutral"
    
    def decide(self, player_gold, player_reputation, time_of_day):
        """Décide de l'action selon le contexte"""
        
        # Nœud racine : Réputation
        if player_reputation < -50:
            return "refuse_service"  # Trop mauvaise réputation
        
        # Branche : Heure de la journée
        if time_of_day == "night":
            if player_gold >= 1000:
                return "special_night_deal"  # Client riche la nuit
            else:
                return "closed"  # Fermé la nuit pour les pauvres
        
        # Branche : Or du joueur
        if player_gold < 10:
            return "mockery"  # Se moque du joueur pauvre
        elif player_gold < 100:
            return "basic_items"  # Objets de base
        elif player_gold < 500:
            return "good_items"  # Bons objets
        else:
            # Sous-branche : Réputation pour les riches
            if player_reputation > 50:
                return "rare_items"  # Objets rares
            else:
                return "good_items"  # Bons objets seulement
    
    def get_dialogue(self, action):
        """Retourne le dialogue selon l'action"""
        dialogues = {
            "refuse_service": "Je ne sers pas les gens comme vous !",
            "closed": "Revenez demain, nous sommes fermés.",
            "mockery": "Haha, vous n'avez même pas de quoi acheter du pain !",
            "basic_items": "Voici ce que je peux vous proposer...",
            "good_items": "J'ai de bonnes affaires pour vous !",
            "rare_items": "Pour un client de votre standing, j'ai des objets uniques...",
            "special_night_deal": "Psst... affaire spéciale de nuit pour vous..."
        }
        return dialogues.get(action, "Bonjour.")

# Test
tree = DecisionTree()

# Scénario 1 : Joueur pauvre
action = tree.decide(player_gold=5, player_reputation=0, time_of_day="day")
print(tree.get_dialogue(action))  # "Haha, vous n'avez même pas..."

# Scénario 2 : Joueur riche et respecté
action = tree.decide(player_gold=600, player_reputation=60, time_of_day="day")
print(tree.get_dialogue(action))  # "Pour un client de votre standing..."`,
        explanation: `
            <p><strong>Arbre de Décision</strong> - Structure de choix basée sur des conditions</p>
            <p><strong>Nœuds</strong> - Points de décision (if/elif/else)</p>
            <p><strong>Feuilles</strong> - Résultats finaux (actions)</p>
            <p><strong>Branches</strong> - Chemins entre nœuds</p>
        `,
        exercises: [
            'Crée un arbre de décision pour un garde (attaque/patrouille/alerte)',
            'Ajoute plus de facteurs (météo, quête en cours, niveau du joueur)',
            'Visualise l\'arbre avec graphviz'
        ],
        advancedTips: `
            <p>💡 <strong>Pour aller plus loin :</strong></p>
            <ul>
                <li>Utilise sklearn.tree pour générer des arbres automatiquement à partir de données</li>
                <li>Implémente des arbres probabilistes (chance de chaque action)</li>
                <li>Combine avec des Behavior Trees (plus modulaire)</li>
            </ul>
        `
    },
    
    'learning': {
        title: 'Module 4 : Q-Learning Basique',
        intro: 'Apprends à créer une IA qui apprend par essai-erreur.',
        code: `import random
import numpy as np

class QLearning:
    """Agent Q-Learning simple"""
    
    def __init__(self, states, actions, learning_rate=0.1, discount=0.9, epsilon=0.1):
        self.states = states
        self.actions = actions
        self.lr = learning_rate      # Taux d'apprentissage
        self.gamma = discount         # Facteur de réduction
        self.epsilon = epsilon        # Taux d'exploration
        
        # Table Q : Q[état][action] = valeur
        self.q_table = np.zeros((states, actions))
    
    def choose_action(self, state):
        """Epsilon-greedy : explore vs exploit"""
        if random.random() < self.epsilon:
            return random.randint(0, self.actions - 1)  # Explorer
        else:
            return np.argmax(self.q_table[state])  # Exploiter
    
    def learn(self, state, action, reward, next_state):
        """Met à jour la table Q"""
        # Q(s,a) = Q(s,a) + α[r + γ max Q(s',a') - Q(s,a)]
        current_q = self.q_table[state][action]
        max_next_q = np.max(self.q_table[next_state])
        
        new_q = current_q + self.lr * (reward + self.gamma * max_next_q - current_q)
        self.q_table[state][action] = new_q

# Exemple : Apprendre à atteindre un objectif
agent = QLearning(states=10, actions=4)  # 10 positions, 4 directions

# Entraînement
for episode in range(1000):
    state = 0  # Position de départ
    total_reward = 0
    
    for step in range(50):
        action = agent.choose_action(state)
        
        # Simuler l'environnement
        next_state = (state + action) % 10
        reward = 10 if next_state == 9 else -1  # +10 si objectif, -1 sinon
        
        agent.learn(state, action, reward, next_state)
        
        state = next_state
        total_reward += reward
        
        if next_state == 9:  # Objectif atteint
            break
    
    if episode % 100 == 0:
        print(f"Épisode {episode}: Récompense = {total_reward}")`,
        explanation: `
            <p><strong>Q-Learning</strong> - Apprentissage par renforcement</p>
            <p><strong>Q-Table</strong> - Stocke la valeur de chaque (état, action)</p>
            <p><strong>Epsilon-Greedy</strong> - Balance exploration/exploitation</p>
            <p><strong>α (alpha)</strong> - Taux d'apprentissage (importance des nouvelles infos)</p>
            <p><strong>γ (gamma)</strong> - Facteur de réduction (importance du futur)</p>
            <p><strong>Reward</strong> - Récompense immédiate d'une action</p>
        `,
        exercises: [
            'Crée un agent qui apprend à naviguer dans un labyrinthe',
            'Ajoute un système de pénalités (murs, ennemis)',
            'Visualise la table Q après entraînement'
        ],
        advancedTips: `
            <p>💡 <strong>Paramètres importants :</strong></p>
            <ul>
                <li><strong>Epsilon trop haut</strong> → L'agent explore trop, n'exploite pas ce qu'il a appris</li>
                <li><strong>Epsilon trop bas</strong> → L'agent se bloque sur une solution sous-optimale</li>
                <li><strong>Learning rate élevé</strong> → Apprentissage rapide mais instable</li>
                <li><strong>Discount proche de 1</strong> → Privilégie les récompenses futures</li>
                <li><strong>Astuce</strong> → Diminuer epsilon au fil du temps (exploration → exploitation)</li>
            </ul>
        `
    }
};