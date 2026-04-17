// Données des cours Unity - Version améliorée
const UNITY_COURSES = {
    '1': {
        title: 'Chapitre 1 : Introduction aux Scripts Unity',
        intro: 'Un script Unity est une classe C# attachée à un GameObject. Unity appelle automatiquement certaines fonctions comme Start et Update. Comprendre ces fonctions est la base de tout développement Unity.',
        code: `using UnityEngine;

public class ExempleScript : MonoBehaviour
{
    // Variables privées (non visibles dans l'Inspector)
    private int compteur = 0;
    private float tempsEcoule = 0f;
    
    // Variables publiques (modifiables dans l'Inspector)
    public string nomJoueur = "Joueur1";
    public int vieMaximale = 100;
    
    // Awake : Appelé avant Start, utilisé pour l'initialisation
    void Awake()
    {
        Debug.Log("Awake : Initialisation du script");
    }
    
    // Start : Appelé une fois au début
    void Start()
    {
        Debug.Log("Start : Début du jeu");
        Debug.Log("Nom du joueur : " + nomJoueur);
        Debug.Log("Vie maximale : " + vieMaximale);
    }
    
    // Update : Appelé à chaque frame
    void Update()
    {
        compteur++;
        tempsEcoule += Time.deltaTime;
        
        // Affiche tous les 60 frames pour ne pas spammer la console
        if (compteur % 60 == 0)
        {
            Debug.Log("Frame " + compteur + " - Temps écoulé : " + tempsEcoule.ToString("F2") + "s");
        }
    }
    
    // FixedUpdate : Appelé à intervalle fixe (physique)
    void FixedUpdate()
    {
        // Utilisé pour la physique (Rigidbody)
    }
    
    // LateUpdate : Appelé après tous les Update
    void LateUpdate()
    {
        // Utilisé pour les caméras qui suivent le joueur
    }
}`,
        explanation: `
            <h4>📦 Imports et Héritage</h4>
            <p><strong>using UnityEngine;</strong> : Permet d'accéder à toutes les classes Unity (GameObject, Transform, Vector3, etc.)</p>
            <p><strong>MonoBehaviour</strong> : Classe de base obligatoire pour tous les scripts Unity. Elle donne accès aux fonctions de cycle de vie (Start, Update, etc.)</p>
            
            <h4>🔄 Cycle de vie Unity (Order of Execution)</h4>
            <ol>
                <li><strong>Awake()</strong> - Premier appelé, même si le script est désactivé. Utilisé pour les références et l'initialisation critique.</li>
                <li><strong>OnEnable()</strong> - Appelé quand l'objet est activé.</li>
                <li><strong>Start()</strong> - Appelé avant la première frame, après tous les Awake(). Utilisé pour l'initialisation normale.</li>
                <li><strong>FixedUpdate()</strong> - Appelé à intervalle fixe (par défaut 50 fois/seconde). Utilisé pour la physique.</li>
                <li><strong>Update()</strong> - Appelé chaque frame (60-120 fois/seconde). Utilisé pour le gameplay et l'input.</li>
                <li><strong>LateUpdate()</strong> - Appelé après tous les Update(). Utilisé pour les caméras.</li>
                <li><strong>OnDisable()</strong> - Appelé quand l'objet est désactivé.</li>
                <li><strong>OnDestroy()</strong> - Appelé quand l'objet est détruit.</li>
            </ol>
            
            <h4>💾 Types de Variables</h4>
            <p><strong>public</strong> : Visible et modifiable dans l'Inspector Unity. Permet de configurer sans toucher au code.</p>
            <p><strong>private</strong> : Caché de l'Inspector. Utilisé pour les données internes du script.</p>
            <p><strong>[SerializeField] private</strong> : Variable privée mais visible dans l'Inspector (bonne pratique).</p>
            
            <h4>⏱️ Time.deltaTime</h4>
            <p>Temps écoulé depuis la dernière frame (environ 0.016s à 60 FPS). Essentiel pour des mouvements fluides indépendants du framerate.</p>
            
            <h4>🐛 Debug.Log()</h4>
            <p>Affiche des messages dans la Console Unity. Très utile pour déboguer. Supporte la concaténation : <code>"Score : " + score</code></p>
        `,
        bestPractices: `
            <h4>✅ Bonnes Pratiques</h4>
            <ul>
                <li><strong>Nommage</strong> : PascalCase pour les classes (PlayerController), camelCase pour les variables (vitesseMax)</li>
                <li><strong>Commentaires</strong> : Explique le "pourquoi", pas le "quoi"</li>
                <li><strong>Organisation</strong> : Variables en haut, puis fonctions Unity (Awake, Start, Update), puis fonctions custom</li>
                <li><strong>Performance</strong> : Évite les GetComponent() dans Update, stocke les références dans Start()</li>
                <li><strong>Debug</strong> : Utilise Debug.Log() mais supprime-les en production</li>
            </ul>
        `,
        commonErrors: `
            <h4>❌ Erreurs Courantes</h4>
            <ul>
                <li><strong>Oublier MonoBehaviour</strong> : Le script ne s'attachera pas au GameObject</li>
                <li><strong>Nom de classe ≠ nom de fichier</strong> : Unity ne reconnaîtra pas le script</li>
                <li><strong>Oublier using UnityEngine</strong> : Les classes Unity ne seront pas reconnues</li>
                <li><strong>Modifier des variables publiques dans le code</strong> : Elles seront écrasées par l'Inspector</li>
            </ul>
        `,
        exercises: [
            'Créer un script avec 3 variables publiques : nom (string), niveau (int), energie (float)',
            'Dans Start(), afficher toutes les variables dans la console avec Debug.Log()',
            'Créer un compteur qui s\'affiche uniquement toutes les secondes (utilise Time.time)',
            'Ajouter une fonction OnDestroy() qui affiche "Objet détruit" quand l\'objet est supprimé',
            'Créer une variable [SerializeField] private pour comprendre la différence avec public'
        ]
    },
    
    '2': {
        title: 'Chapitre 2 : Le Joueur - Déplacement et Contrôles',
        intro: 'Apprends à créer un contrôleur de joueur robuste avec différents types de mouvements et gestion d\'entrées professionnelle.',
        code: `using UnityEngine;

public class PlayerController : MonoBehaviour
{
    [Header("Paramètres de Mouvement")]
    [SerializeField] private float vitesseMarche = 5f;
    [SerializeField] private float vitesseCourse = 8f;
    [SerializeField] private float acceleration = 10f;
    [SerializeField] private float friction = 8f;
    
    [Header("Paramètres de Rotation")]
    [SerializeField] private float vitesseRotation = 720f; // Degrés par seconde
    [SerializeField] private bool rotationInstantanee = false;
    
    [Header("Debug")]
    [SerializeField] private bool afficherVitesse = false;
    
    // Variables privées
    private Vector3 velocite;
    private float vitesseActuelle;
    private CharacterController controller;
    
    void Awake()
    {
        // Récupérer le CharacterController (si présent)
        controller = GetComponent<CharacterController>();
    }
    
    void Update()
    {
        GererDeplacement();
        
        if (afficherVitesse)
        {
            Debug.Log("Vitesse actuelle : " + vitesseActuelle.ToString("F2") + " m/s");
        }
    }
    
    void GererDeplacement()
    {
        // Récupérer les inputs
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // Déterminer si le joueur court
        bool estEnCourse = Input.GetKey(KeyCode.LeftShift);
        float vitesseCible = estEnCourse ? vitesseCourse : vitesseMarche;
        
        // Créer la direction de mouvement
        Vector3 direction = new Vector3(horizontal, 0f, vertical);
        
        // Normaliser pour éviter le mouvement diagonal plus rapide
        if (direction.magnitude > 1f)
        {
            direction.Normalize();
        }
        
        // Appliquer le mouvement
        if (direction.magnitude > 0.1f)
        {
            // Il y a un input
            vitesseActuelle = Mathf.Lerp(vitesseActuelle, vitesseCible, acceleration * Time.deltaTime);
            
            // Rotation du joueur
            if (rotationInstantanee)
            {
                // Rotation instantanée
                transform.forward = direction;
            }
            else
            {
                // Rotation progressive (plus naturel)
                Quaternion rotationCible = Quaternion.LookRotation(direction);
                transform.rotation = Quaternion.RotateTowards(
                    transform.rotation, 
                    rotationCible, 
                    vitesseRotation * Time.deltaTime
                );
            }
        }
        else
        {
            // Pas d'input : appliquer la friction
            vitesseActuelle = Mathf.Lerp(vitesseActuelle, 0f, friction * Time.deltaTime);
        }
        
        // Déplacer le joueur
        Vector3 deplacement = transform.forward * vitesseActuelle * Time.deltaTime;
        
        if (controller != null)
        {
            // Avec CharacterController (recommandé)
            controller.Move(deplacement);
        }
        else
        {
            // Avec Transform (simple mais moins précis)
            transform.position += deplacement;
        }
    }
    
    // Version alternative : mouvement relatif à la caméra
    void DeplacementRelatifCamera(Camera cam)
    {
        float horizontal = Input.GetAxis("Horizontal");
        float vertical = Input.GetAxis("Vertical");
        
        // Direction relative à la caméra
        Vector3 forward = cam.transform.forward;
        Vector3 right = cam.transform.right;
        
        // Projeter sur le plan horizontal
        forward.y = 0f;
        right.y = 0f;
        forward.Normalize();
        right.Normalize();
        
        // Calculer la direction
        Vector3 direction = forward * vertical + right * horizontal;
        
        if (direction.magnitude > 1f)
        {
            direction.Normalize();
        }
        
        // Appliquer le mouvement (même code qu'au-dessus)
    }
}`,
        explanation: `
            <h4>🎮 Système d'Input Unity</h4>
            <p><strong>Input.GetAxis("Horizontal")</strong> : Retourne une valeur entre -1 et 1. Gère automatiquement A/D, Flèches, et joystick. Avec lissage pour un mouvement fluide.</p>
            <p><strong>Input.GetKey(KeyCode)</strong> : Vérifie si une touche est maintenue enfoncée. Exemples : KeyCode.Space, KeyCode.LeftShift</p>
            <p><strong>Input.GetKeyDown()</strong> : Détecte une pression unique (utile pour sauter, tirer)</p>
            <p><strong>Input.GetKeyUp()</strong> : Détecte le relâchement d'une touche</p>
            
            <h4>📐 Vecteurs et Directions</h4>
            <p><strong>Vector3</strong> : Représente un point ou une direction en 3D (x, y, z)</p>
            <p><strong>direction.magnitude</strong> : Longueur du vecteur (vitesse en diagonale = √2 ≈ 1.41)</p>
            <p><strong>direction.Normalize()</strong> : Réduit la longueur à 1, gardant la direction</p>
            <p><strong>transform.forward</strong> : Direction "devant" l'objet (axe Z bleu)</p>
            <p><strong>transform.right</strong> : Direction "droite" de l'objet (axe X rouge)</p>
            <p><strong>transform.up</strong> : Direction "haut" de l'objet (axe Y vert)</p>
            
            <h4>🔄 Rotation</h4>
            <p><strong>Quaternion</strong> : Représente une rotation 3D (ne pas utiliser directement les angles)</p>
            <p><strong>Quaternion.LookRotation(direction)</strong> : Crée une rotation qui regarde dans cette direction</p>
            <p><strong>Quaternion.RotateTowards()</strong> : Rotation progressive vers une cible</p>
            <p><strong>transform.forward = direction</strong> : Rotation instantanée (pas naturel)</p>
            
            <h4>⚡ Interpolation</h4>
            <p><strong>Mathf.Lerp(a, b, t)</strong> : Interpolation linéaire de a vers b. t entre 0 et 1.</p>
            <p>Utilisé pour : accélération progressive, décélération, animations de valeurs</p>
            <p><strong>acceleration * Time.deltaTime</strong> : Rend l'interpolation indépendante du framerate</p>
            
            <h4>🚶 Transform vs CharacterController</h4>
            <p><strong>Transform.Translate/position</strong> : Simple, direct, mais pas de collisions automatiques</p>
            <p><strong>CharacterController</strong> : Gère collisions, pentes, escaliers. Recommandé pour les personnages</p>
            <p><strong>Rigidbody</strong> : Physique complète (gravité, forces). Pour objets physiques</p>
            
            <h4>🎯 Header Attribute</h4>
            <p><strong>[Header("Titre")]</strong> : Organise l'Inspector avec des titres de section</p>
            <p><strong>[SerializeField]</strong> : Rend une variable privée visible dans l'Inspector (bonne pratique)</p>
            <p><strong>[Range(min, max)]</strong> : Crée un slider dans l'Inspector</p>
        `,
        bestPractices: `
            <h4>✅ Bonnes Pratiques</h4>
            <ul>
                <li><strong>Toujours normaliser les directions</strong> pour éviter le mouvement diagonal plus rapide</li>
                <li><strong>Utiliser CharacterController</strong> pour les personnages (pas Rigidbody sauf si besoin de physique)</li>
                <li><strong>Multiplier par Time.deltaTime</strong> pour tous les mouvements frame-dépendants</li>
                <li><strong>Séparer logique et mouvement</strong> : fonction GererDeplacement() séparée</li>
                <li><strong>Utiliser [SerializeField]</strong> au lieu de public pour encapsulation</li>
                <li><strong>Ajouter du lerp</strong> pour accélération/décélération naturelle</li>
            </ul>
        `,
        commonErrors: `
            <h4>❌ Erreurs Courantes</h4>
            <ul>
                <li><strong>Oublier Time.deltaTime</strong> : Mouvement dépend du framerate (60 FPS ≠ 144 FPS)</li>
                <li><strong>Ne pas normaliser</strong> : Diagonale 41% plus rapide que horizontal/vertical</li>
                <li><strong>GetComponent dans Update</strong> : Très lent ! Stocker dans Awake/Start</li>
                <li><strong>Modifier transform.position avec Rigidbody</strong> : Casse la physique</li>
                <li><strong>Input.GetAxis dans FixedUpdate</strong> : Peut rater des inputs</li>
            </ul>
        `,
        advancedTips: `
            <h4>🚀 Techniques Avancées</h4>
            <ul>
                <li><strong>Coyote Time</strong> : Permet de sauter légèrement après avoir quitté une plateforme</li>
                <li><strong>Input Buffering</strong> : Mémorise un input pendant quelques frames</li>
                <li><strong>Déplacement relatif caméra</strong> : Direction basée sur où regarde la caméra (type Dark Souls)</li>
                <li><strong>Root Motion</strong> : Animations qui contrôlent le mouvement</li>
                <li><strong>Nav Mesh</strong> : Pathfinding automatique pour l'IA</li>
            </ul>
        `,
        exercises: [
            'Empêche le mouvement diagonal d\'être plus rapide en normalisant le vecteur',
            'Ajoute un système de course : LeftShift double la vitesse',
            'Crée une zone de jeu : limite le joueur entre x=-10/+10 et z=-10/+10 avec Mathf.Clamp()',
            'Ajoute une accélération progressive avec Mathf.Lerp au lieu de vitesse instantanée',
            'Implémenter une rotation progressive : le joueur tourne vers sa direction de mouvement',
            'Ajouter un trail renderer qui montre le chemin parcouru',
            'Créer un système de stamina : la course consomme de l\'endurance'
        ]
    },
    
    '3': {
        title: 'Chapitre 3 : Système de Vie et États - Architecture Professionnelle',
        intro: 'Crée un système de santé robuste avec événements, UI, et gestion d\'états. Base pour tout système de combat.',
        code: `using UnityEngine;
using UnityEngine.Events;

public class HealthSystem : MonoBehaviour
{
    [Header("Configuration de Santé")]
    [SerializeField] private int vieMax = 100;
    [SerializeField] private int vieActuelle;
    [SerializeField] private bool invincible = false;
    [SerializeField] private bool peutMourir = true;
    
    [Header("Régénération")]
    [SerializeField] private bool regenerationActive = false;
    [SerializeField] private float regenParSeconde = 5f;
    [SerializeField] private float delaiAvantRegen = 3f;
    private float dernierDegat;
    
    [Header("Invincibilité temporaire")]
    [SerializeField] private float dureeInvincibilite = 1f;
    private float finInvincibilite;
    
    [Header("Événements")]
    public UnityEvent<int, int> OnVieChangee;    // (vieActuelle, vieMax)
    public UnityEvent OnMort;
    public UnityEvent OnDegatsRecus;
    public UnityEvent OnSoins;
    public UnityEvent OnRevive;
    
    // États
    public enum EtatVie
    {
        Vivant,
        Mourant,
        Mort
    }
    
    [Header("Debug")]
    [SerializeField] private EtatVie etatActuel = EtatVie.Vivant;
    
    // Propriétés (encapsulation)
    public int VieActuelle => vieActuelle;
    public int VieMax => vieMax;
    public float PourcentageVie => (float)vieActuelle / vieMax;
    public bool EstMort => etatActuel == EtatVie.Mort;
    public bool EstVivant => etatActuel == EtatVie.Vivant;
    public bool EstInvincible => invincible || Time.time < finInvincibilite;
    
    void Awake()
    {
        // Initialiser la vie
        vieActuelle = vieMax;
        etatActuel = EtatVie.Vivant;
    }
    
    void Update()
    {
        GererRegeneration();
        
        // Touches de test (à supprimer en production)
        if (Input.GetKeyDown(KeyCode.H))
        {
            Soigner(20);
        }
        
        if (Input.GetKeyDown(KeyCode.K))
        {
            RecevoirDegats(15);
        }
    }
    
    public void RecevoirDegats(int montant)
    {
        // Vérifications
        if (EstMort || montant <= 0) return;
        if (EstInvincible)
        {
            Debug.Log("Invincible ! Dégâts bloqués.");
            return;
        }
        
        // Appliquer les dégâts
        vieActuelle -= montant;
        vieActuelle = Mathf.Max(0, vieActuelle);
        
        // Invincibilité temporaire après dégâts
        finInvincibilite = Time.time + dureeInvincibilite;
        dernierDegat = Time.time;
        
        Debug.Log($"Dégâts reçus : {montant}. Vie : {vieActuelle}/{vieMax}");
        
        // Déclencher l'événement
        OnDegatsRecus?.Invoke();
        OnVieChangee?.Invoke(vieActuelle, vieMax);
        
        // Vérifier la mort
        if (vieActuelle <= 0 && peutMourir)
        {
            Mourir();
        }
    }
    
    public void Soigner(int montant)
    {
        if (EstMort || montant <= 0) return;
        
        int ancienneVie = vieActuelle;
        vieActuelle += montant;
        vieActuelle = Mathf.Clamp(vieActuelle, 0, vieMax);
        
        int vieRegagnee = vieActuelle - ancienneVie;
        
        if (vieRegagnee > 0)
        {
            Debug.Log($"Soigné de {vieRegagnee}. Vie : {vieActuelle}/{vieMax}");
            OnSoins?.Invoke();
            OnVieChangee?.Invoke(vieActuelle, vieMax);
        }
    }
    
    public void SoignerCompletement()
    {
        Soigner(vieMax);
    }
    
    public void ModifierVieMax(int nouvelleVieMax)
    {
        float ratio = PourcentageVie;
        vieMax = Mathf.Max(1, nouvelleVieMax);
        vieActuelle = Mathf.RoundToInt(vieMax * ratio);
        
        OnVieChangee?.Invoke(vieActuelle, vieMax);
    }
    
    void GererRegeneration()
    {
        if (!regenerationActive || EstMort) return;
        if (vieActuelle >= vieMax) return;
        
        // Attendre après dégâts avant de régénérer
        if (Time.time - dernierDegat < delaiAvantRegen) return;
        
        float regenCeFrame = regenParSeconde * Time.deltaTime;
        Soigner(Mathf.CeilToInt(regenCeFrame));
    }
    
    void Mourir()
    {
        if (etatActuel == EtatVie.Mort) return;
        
        etatActuel = EtatVie.Mort;
        Debug.Log("💀 MORT !");
        
        OnMort?.Invoke();
        
        // Désactiver les composants (optionnel)
        var controller = GetComponent<PlayerController>();
        if (controller != null)
        {
            controller.enabled = false;
        }
        
        // Effets visuels
        ApplyEffetMort();
    }
    
    public void Revivre()
    {
        if (!EstMort) return;
        
        vieActuelle = vieMax;
        etatActuel = EtatVie.Vivant;
        finInvincibilite = Time.time + dureeInvincibilite;
        
        Debug.Log("✨ Revive !");
        
        OnRevive?.Invoke();
        OnVieChangee?.Invoke(vieActuelle, vieMax);
        
        // Réactiver les composants
        var controller = GetComponent<PlayerController>();
        if (controller != null)
        {
            controller.enabled = true;
        }
    }
    
    void ApplyEffetMort()
    {
        // Désactiver le renderer après quelques secondes
        // StartCoroutine(DesactiverApresDelai(2f));
        
        // Ou changer la couleur
        var renderer = GetComponent<Renderer>();
        if (renderer != null)
        {
            renderer.material.color = Color.red;
        }
    }
    
    // Système de dégâts en pourcentage
    public void RecevoirDegatsEnPourcentage(float pourcentage)
    {
        int degats = Mathf.RoundToInt(vieMax * pourcentage);
        RecevoirDegats(degats);
    }
    
    // Affichage dans l'éditeur
    void OnGUI()
    {
        if (Application.isPlaying)
        {
            GUI.color = Color.white;
            string info = $"Vie: {vieActuelle}/{vieMax} ({PourcentageVie:P0})\\n";
            info += $"État: {etatActuel}\\n";
            info += $"Invincible: {EstInvincible}";
            
            GUI.Label(new Rect(10, 10, 300, 100), info);
        }
    }
}

// BONUS : Script séparé pour affichage UI
public class HealthUI : MonoBehaviour
{
    [SerializeField] private HealthSystem healthSystem;
    [SerializeField] private UnityEngine.UI.Slider healthBar;
    [SerializeField] private TMPro.TextMeshProUGUI healthText;
    
    void Start()
    {
        if (healthSystem != null)
        {
            healthSystem.OnVieChangee.AddListener(MettreAJourUI);
            MettreAJourUI(healthSystem.VieActuelle, healthSystem.VieMax);
        }
    }
    
    void MettreAJourUI(int vieActuelle, int vieMax)
    {
        if (healthBar != null)
        {
            healthBar.maxValue = vieMax;
            healthBar.value = vieActuelle;
        }
        
        if (healthText != null)
        {
            healthText.text = $"{vieActuelle} / {vieMax}";
        }
    }
}`,
        explanation: `
            <h4>🏗️ Architecture Événementielle</h4>
            <p><strong>UnityEvent</strong> : Système d'événements intégré à Unity. Permet la communication entre scripts sans couplage fort.</p>
            <p><strong>OnVieChangee?.Invoke()</strong> : "?" vérifie si des listeners existent avant d'invoquer. Évite les NullReferenceException.</p>
            <p><strong>AddListener()</strong> : Abonne une fonction à un événement. Exemple : OnMort.AddListener(AfficherGameOver);</p>
            
            <h4>📊 Propriétés C#</h4>
            <p><strong>public int VieActuelle => vieActuelle;</strong> : Propriété en lecture seule. Expose une variable privée sans permettre la modification externe.</p>
            <p><strong>get; set;</strong> : Propriété complète avec lecture et écriture. Permet d'ajouter de la logique.</p>
            <p><strong>Avantages</strong> : Encapsulation, validation, calculs à la volée</p>
            
            <h4>🔀 Enum (Énumérations)</h4>
            <p><strong>enum EtatVie</strong> : Type custom avec valeurs fixes. Plus lisible et sûr que des int ou string.</p>
            <p><strong>Usage</strong> : if (etatActuel == EtatVie.Mort) { ... }</p>
            <p><strong>Switch</strong> : Parfait avec enum pour gérer différents états</p>
            
            <h4>⚙️ Encapsulation</h4>
            <p><strong>[SerializeField] private</strong> : Variable visible dans Inspector mais privée dans le code</p>
            <p><strong>Méthodes publiques</strong> : RecevoirDegats(), Soigner() contrôlent l'accès à vieActuelle</p>
            <p><strong>Validation</strong> : Toute modification passe par des méthodes qui valident les données</p>
            
            <h4>⏱️ Invincibilité Temporaire</h4>
            <p><strong>Time.time</strong> : Temps écoulé depuis le début du jeu (en secondes)</p>
            <p><strong>finInvincibilite = Time.time + duree</strong> : Stocke le moment où l'invincibilité se termine</p>
            <p><strong>Time.time < finInvincibilite</strong> : Vérifie si toujours invincible</p>
            
            <h4>🎯 String Interpolation</h4>
            <p><strong>$"Vie : {vieActuelle}/{vieMax}"</strong> : Syntaxe moderne C# pour inclure des variables dans les strings</p>
            <p>Plus lisible que : "Vie : " + vieActuelle + "/" + vieMax</p>
            <p><strong>Format</strong> : {variable:format} exemple {0.5678:F2} affiche 0.57</p>
            
            <h4>🔄 Null Conditional Operator</h4>
            <p><strong>OnMort?.Invoke()</strong> : "?" vérifie si OnMort n'est pas null avant d'appeler Invoke()</p>
            <p>Équivalent à : if (OnMort != null) OnMort.Invoke();</p>
            
            <h4>📈 Pourcentages</h4>
            <p><strong>float PourcentageVie = (float)vieActuelle / vieMax;</strong> : Cast en float pour division décimale</p>
            <p><strong>{PourcentageVie:P0}</strong> : Affiche en pourcentage (50%)</p>
        `,
        bestPractices: `
            <h4>✅ Architecture Professionnelle</h4>
            <ul>
                <li><strong>Séparation des responsabilités</strong> : HealthSystem gère la logique, HealthUI gère l'affichage</li>
                <li><strong>Événements</strong> : Communication loose coupling entre systèmes</li>
                <li><strong>Encapsulation</strong> : Variables privées + méthodes publiques</li>
                <li><strong>Propriétés</strong> : Lecture sans permettre modification externe</li>
                <li><strong>Validation</strong> : Toujours vérifier les valeurs (Mathf.Clamp, Mathf.Max)</li>
                <li><strong>États clairs</strong> : Enum plutôt que booléens multiples</li>
            </ul>
        `,
        commonErrors: `
            <h4>❌ Pièges à Éviter</h4>
            <ul>
                <li><strong>Variables publiques modifiables</strong> : Utilise [SerializeField] private + propriétés</li>
                <li><strong>Pas de validation</strong> : Toujours limiter entre min/max (Mathf.Clamp)</li>
                <li><strong>OnMort.Invoke() sans "?"</strong> : Crash si aucun listener</li>
                <li><strong>Oublier Time.time vs Time.deltaTime</strong> : time = temps total, deltaTime = durée frame</li>
                <li><strong>int division</strong> : 3/2 = 1 (pas 1.5). Utiliser (float)3/2 = 1.5f</li>
            </ul>
        `,
        advancedTips: `
            <h4>🚀 Systèmes Avancés</h4>
            <ul>
                <li><strong>ScriptableObject</strong> : Stocker les stats de santé dans un asset réutilisable</li>
                <li><strong>Armor/Defense</strong> : Réduction de dégâts basée sur une stat de défense</li>
                <li><strong>Dégâts élémentaires</strong> : Feu, Glace, Poison avec résistances</li>
                <li><strong>Shield</strong> : Boucl qui absorbe des dégâts avant la vie</li>
                <li><strong>Coroutines</strong> : Dégâts/soins sur le temps (DoT/HoT)</li>
                <li><strong>Animation Events</strong> : Déclencher effets quand animation de mort se termine</li>
            </ul>
        `,
        exercises: [
            'Ajouter une touche H pour soigner (+20 HP) et K pour dégâts (-15 HP)',
            'Empêcher la vie de dépasser vieMax et de descendre sous 0',
            'Créer un booléen peutSoigner qui empêche les soins si false',
            'Ajouter un système d\'armure : réduit les dégâts de X%',
            'Implémenter un bouclier : absorbe les dégâts avant la vie',
            'Créer un système de régénération : +5 HP/seconde hors combat',
            'Ajouter des effets visuels : clignoter en rouge lors des dégâts',
            'Créer un système de revive : respawn avec 50% HP après 3 secondes'
        ]
    },
    
    '4': {
        title: 'Chapitre 4 : Ennemi - Suivre et Attaquer',
        intro: 'Crée un ennemi qui suit le joueur et l\'attaque quand il est proche.',
        code: `using UnityEngine;

public class EnemyController : MonoBehaviour
{
    public Transform cible;
    public float vitesse = 3f;
    public float distanceAttaque = 2f;
    
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
            Debug.Log("Attaque !");
        }
    }
}`,
        explanation: `
            <p><strong>Transform cible</strong> : Référence vers le Transform du joueur (à assigner dans l'Inspector).</p>
            <p><strong>Vector3.Distance</strong> : Calcule la distance entre deux positions 3D.</p>
            <p><strong>transform.LookAt</strong> : Fait regarder l'ennemi vers la cible.</p>
            <p><strong>Vector3.forward</strong> : Direction "devant" l'objet (axe Z positif).</p>
            <p><strong>else</strong> : Code exécuté si la condition du if est fausse.</p>
        `,
        exercises: [
            'Ajoute un délai entre les attaques avec un <code>float nextAttackTime</code>',
            'Fais perdre de la vie au joueur : <code>cible.GetComponent&lt;PlayerHealth&gt;().vie -= 5;</code>',
            'Ajoute une zone de détection : l\'ennemi ne bouge que si le joueur est à moins de 10 unités'
        ]
    },
    
    '5': {
        title: 'Chapitre 5 : Animal - Fuite et Patrouille',
        intro: 'Crée un animal qui fuit le danger et se promène aléatoirement.',
        code: `using UnityEngine;

public class AnimalController : MonoBehaviour
{
    public Transform danger;
    public float vitesse = 4f;
    public float distanceDetection = 5f;
    
    void Update()
    {
        float distance = Vector3.Distance(transform.position, danger.position);
        
        if (distance < distanceDetection)
        {
            // Fuite
            Vector3 direction = transform.position - danger.position;
            transform.Translate(direction.normalized * vitesse * Time.deltaTime);
        }
        else
        {
            // Idle ou patrouille
            Debug.Log("En sécurité");
        }
    }
}`,
        explanation: `
            <p><strong>transform.position - danger.position</strong> : Calcule le vecteur opposé au danger (direction de fuite).</p>
            <p><strong>direction.normalized</strong> : Réduit le vecteur à une longueur de 1, pour un mouvement constant.</p>
            <p><strong>distance &lt; distanceDetection</strong> : L'animal ne fuit que si le danger est proche.</p>
        `,
        exercises: [
            'Ajoute un mode Idle : si le danger est loin, ne fait rien',
            'Fais marcher l\'animal aléatoirement avec <code>Random.Range(-1f, 1f)</code>',
            'Ajoute une vitesse différente : lent en patrouille (2f), rapide en fuite (6f)'
        ]
    },
    
    '6': {
        title: 'Chapitre 6 : Véhicule - Conduite Simple',
        intro: 'Crée un système de conduite basique avec accélération et rotation.',
        code: `using UnityEngine;

public class VehicleController : MonoBehaviour
{
    public float vitesse = 10f;
    public float rotation = 100f;
    public float vitesseMax = 20f;
    private float vitesseActuelle = 0f;
    
    void Update()
    {
        float v = Input.GetAxis("Vertical");
        float h = Input.GetAxis("Horizontal");
        
        // Accélération
        vitesseActuelle += v * vitesse * Time.deltaTime;
        vitesseActuelle = Mathf.Clamp(vitesseActuelle, -vitesseMax, vitesseMax);
        
        // Mouvement et rotation
        transform.Translate(Vector3.forward * vitesseActuelle * Time.deltaTime);
        
        if (Mathf.Abs(vitesseActuelle) > 0.1f)
        {
            transform.Rotate(0, h * rotation * Time.deltaTime, 0);
        }
        
        // Frein
        if (Input.GetKey(KeyCode.Space))
        {
            vitesseActuelle *= 0.95f;
        }
    }
}`,
        explanation: `
            <p><strong>Mathf.Clamp</strong> : Limite une valeur entre un min et un max.</p>
            <p><strong>Mathf.Abs</strong> : Retourne la valeur absolue (toujours positive).</p>
            <p><strong>transform.Rotate</strong> : Fait tourner l'objet autour d'un axe.</p>
            <p><strong>vitesseActuelle *= 0.95f</strong> : Ralentit progressivement (freinage).</p>
        `,
        exercises: [
            'Empêche la rotation à l\'arrêt (vérifie si vitesseActuelle est proche de 0)',
            'Ajoute une marche arrière limitée à 50% de la vitesse max',
            'Crée un système d\'entrée/sortie du véhicule avec la touche E'
        ]
    }
};