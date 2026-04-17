// Module Pattern pour éviter les conflits de déclaration
// Utilise IIFE (Immediately Invoked Function Expression) pour encapsuler le code

(function(window) {
    'use strict';
    
    // Vérifier si déjà chargé pour éviter la redéclaration
    if (window.PYTHON_AI_COURSES) {
        console.warn('PYTHON_AI_COURSES est déjà chargé. Utilisation de la version existante.');
        return;
    }
    
    // Données des cours Python IA
    const PYTHON_AI_COURSES = {
        '1': {
            title: 'Module 1 : Introduction à l\'IA pour les Jeux',
            intro: 'Découvre les bases de l\'intelligence artificielle appliquée aux jeux vidéo avec Python.',
            code: `# Installation des bibliothèques nécessaires
# pip install numpy pygame

import numpy as np
import random

class GameAI:
    """Classe de base pour une IA de jeu"""
    
    def __init__(self, nom="IA"):
        self.nom = nom
        self.score = 0
        self.historique = []
    
    def prendre_decision(self, etat_jeu):
        """
        Prend une décision basée sur l'état du jeu
        À override dans les classes enfants
        """
        actions_possibles = self.obtenir_actions_possibles(etat_jeu)
        return random.choice(actions_possibles)
    
    def obtenir_actions_possibles(self, etat_jeu):
        """Retourne la liste des actions possibles"""
        return ['haut', 'bas', 'gauche', 'droite']
    
    def evaluer_etat(self, etat_jeu):
        """Évalue la qualité d'un état de jeu"""
        return 0
    
    def apprendre(self, etat, action, recompense, nouvel_etat):
        """Apprend de l'expérience (pour IA avancée)"""
        self.historique.append({
            'etat': etat,
            'action': action,
            'recompense': recompense,
            'nouvel_etat': nouvel_etat
        })

# Exemple d'utilisation
ia = GameAI("MonIA")
etat = {'position': (5, 5), 'objectif': (10, 10)}
action = ia.prendre_decision(etat)
print(f"{ia.nom} choisit l'action : {action}")`,
            explanation: `
            <h4>🤖 Qu'est-ce qu'une IA de jeu ?</h4>
            <p>Une IA de jeu prend des <strong>décisions automatiques</strong> pour contrôler des personnages non-joueurs (PNJ). Elle analyse l'état du jeu et choisit la meilleure action.</p>
            
            <h4>📚 Bibliothèques Python pour l'IA</h4>
            <p><strong>NumPy</strong> : Calculs mathématiques rapides (vecteurs, matrices)</p>
            <p><strong>Pygame</strong> : Création de jeux 2D en Python</p>
            <p><strong>TensorFlow/PyTorch</strong> : Machine Learning avancé (optionnel)</p>
            
            <h4>🏗️ Structure de Base</h4>
            <p><strong>prendre_decision()</strong> : Fonction principale qui choisit une action</p>
            <p><strong>evaluer_etat()</strong> : Évalue si une situation est bonne ou mauvaise</p>
            <p><strong>apprendre()</strong> : Mémorise les expériences pour s'améliorer</p>
            
            <h4>🎯 Types d'IA de Jeu</h4>
            <ul>
                <li><strong>Aléatoire</strong> : Choisit au hasard (simple mais imprévisible)</li>
                <li><strong>Basée sur règles</strong> : Suit des instructions fixes (ex: si joueur proche, attaquer)</li>
                <li><strong>Heuristique</strong> : Utilise des calculs pour estimer la meilleure action</li>
                <li><strong>Machine Learning</strong> : Apprend en jouant (avancé)</li>
            </ul>
        `,
            bestPractices: `
            <h4>✅ Bonnes Pratiques</h4>
            <ul>
                <li><strong>Commencer simple</strong> : IA aléatoire → règles → heuristique → ML</li>
                <li><strong>Séparer logique</strong> : Classe dédiée pour l'IA, pas dans le code du jeu</li>
                <li><strong>Rendre paramétrable</strong> : Difficulté ajustable via variables</li>
                <li><strong>Tester beaucoup</strong> : Observer le comportement sur 1000+ parties</li>
                <li><strong>Ajouter randomness</strong> : IA trop parfaite = pas fun</li>
            </ul>
        `,
            exercises: [
                'Créer une classe IAAleatoire qui hérite de GameAI',
                'Implémenter obtenir_actions_possibles() pour un jeu de plateau (8 directions)',
                'Ajouter un attribut difficulte (1-10) qui influence les décisions',
                'Créer une méthode statistiques() qui affiche le taux de victoire de l\'IA',
                'Implémenter un système de logging pour déboguer les décisions'
            ]
        },
        
        '2': {
            title: 'Module 2 : Pathfinding - A* (A-Star)',
            intro: 'Implémente l\'algorithme A* pour que ton IA trouve le chemin optimal vers une cible.',
            code: `import heapq
import math

class Noeud:
    """Représente une case du terrain"""
    def __init__(self, position, parent=None):
        self.position = position  # (x, y)
        self.parent = parent
        self.g = 0  # Coût depuis le départ
        self.h = 0  # Heuristique vers l'arrivée
        self.f = 0  # g + h
    
    def __lt__(self, autre):
        return self.f < autre.f

def heuristique(pos1, pos2):
    """Distance de Manhattan"""
    return abs(pos1[0] - pos2[0]) + abs(pos1[1] - pos2[1])

def heuristique_euclidienne(pos1, pos2):
    """Distance euclidienne (diagonales autorisées)"""
    return math.sqrt((pos1[0] - pos2[0])**2 + (pos1[1] - pos2[1])**2)

def a_star(grille, depart, arrivee):
    """
    Algorithme A* pour trouver le chemin le plus court
    
    Args:
        grille: Liste 2D (0 = libre, 1 = obstacle)
        depart: Tuple (x, y)
        arrivee: Tuple (x, y)
    
    Returns:
        Liste de positions du chemin, ou None si impossible
    """
    hauteur = len(grille)
    largeur = len(grille[0])
    
    # Créer nœuds de départ et d'arrivée
    noeud_depart = Noeud(depart)
    noeud_arrivee = Noeud(arrivee)
    
    # Listes ouverte (à explorer) et fermée (déjà explorés)
    liste_ouverte = []
    liste_fermee = set()
    
    heapq.heappush(liste_ouverte, noeud_depart)
    
    # Directions possibles (4 ou 8 directions)
    # 4 directions : haut, bas, gauche, droite
    directions = [(0, 1), (0, -1), (1, 0), (-1, 0)]
    # 8 directions : ajouter diagonales
    # directions += [(1, 1), (1, -1), (-1, 1), (-1, -1)]
    
    while liste_ouverte:
        # Prendre le nœud avec le plus petit f
        noeud_actuel = heapq.heappop(liste_ouverte)
        liste_fermee.add(noeud_actuel.position)
        
        # Arrivée atteinte !
        if noeud_actuel.position == arrivee:
            chemin = []
            while noeud_actuel:
                chemin.append(noeud_actuel.position)
                noeud_actuel = noeud_actuel.parent
            return chemin[::-1]  # Inverser le chemin
        
        # Explorer les voisins
        for direction in directions:
            pos_voisin = (
                noeud_actuel.position[0] + direction[0],
                noeud_actuel.position[1] + direction[1]
            )
            
            # Vérifier limites et obstacles
            if (pos_voisin[0] < 0 or pos_voisin[0] >= largeur or
                pos_voisin[1] < 0 or pos_voisin[1] >= hauteur):
                continue
            
            if grille[pos_voisin[1]][pos_voisin[0]] == 1:
                continue  # Obstacle
            
            if pos_voisin in liste_fermee:
                continue
            
            # Créer nœud voisin
            voisin = Noeud(pos_voisin, noeud_actuel)
            voisin.g = noeud_actuel.g + 1
            voisin.h = heuristique(pos_voisin, arrivee)
            voisin.f = voisin.g + voisin.h
            
            # Vérifier si déjà dans liste ouverte avec meilleur score
            if any(n.position == voisin.position and n.f <= voisin.f 
                   for n in liste_ouverte):
                continue
            
            heapq.heappush(liste_ouverte, voisin)
    
    return None  # Pas de chemin trouvé

# Exemple d'utilisation
grille = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0]
]

depart = (0, 0)
arrivee = (4, 4)

chemin = a_star(grille, depart, arrivee)

if chemin:
    print(f"Chemin trouvé : {chemin}")
    print(f"Longueur : {len(chemin)} cases")
else:
    print("Aucun chemin trouvé !")`,
            explanation: `
            <h4>🗺️ Qu'est-ce que l'A* (A-Star) ?</h4>
            <p>Algorithme de <strong>pathfinding</strong> qui trouve le chemin le plus court entre deux points en évitant les obstacles. Utilisé dans 90% des jeux vidéo !</p>
            
            <h4>📐 Comment ça marche ?</h4>
            <p><strong>f = g + h</strong></p>
            <ul>
                <li><strong>g</strong> : Coût réel depuis le départ</li>
                <li><strong>h</strong> : Estimation (heuristique) jusqu'à l'arrivée</li>
                <li><strong>f</strong> : Score total (on explore toujours le nœud avec le plus petit f)</li>
            </ul>
            
            <h4>🧮 Heuristiques</h4>
            <p><strong>Manhattan</strong> : |x1-x2| + |y1-y2| (déplacements 4 directions)</p>
            <p><strong>Euclidienne</strong> : √((x1-x2)² + (y1-y2)²) (diagonales autorisées)</p>
            <p><strong>Chebyshev</strong> : max(|x1-x2|, |y1-y2|) (8 directions, coût diagonal = 1)</p>
            
            <h4>📊 Listes Ouverte et Fermée</h4>
            <p><strong>Liste Ouverte</strong> : Nœuds à explorer (heap/priority queue)</p>
            <p><strong>Liste Fermée</strong> : Nœuds déjà explorés (set pour recherche rapide)</p>
            
            <h4>⚡ Optimisations</h4>
            <ul>
                <li>Utiliser <code>heapq</code> pour la liste ouverte (O(log n))</li>
                <li>Utiliser <code>set</code> pour la liste fermée (O(1) lookup)</li>
                <li>Arrêter dès que l'arrivée est atteinte</li>
                <li>Heuristique admissible (jamais surestimer) garantit le chemin optimal</li>
            </ul>
        `,
            bestPractices: `
            <h4>✅ Bonnes Pratiques A*</h4>
            <ul>
                <li><strong>Choisir bonne heuristique</strong> : Manhattan pour grilles, Euclidienne pour mouvement libre</li>
                <li><strong>Pré-calculer voisins</strong> : Optimiser pour grandes cartes</li>
                <li><strong>Limiter recherche</strong> : Max iterations pour éviter freeze</li>
                <li><strong>Cacher chemins</strong> : Recalculer seulement si obstacles changent</li>
                <li><strong>Lisser chemin</strong> : Post-traitement pour trajectoires naturelles</li>
            </ul>
        `,
            advancedTips: `
            <h4>🚀 Variantes Avancées</h4>
            <ul>
                <li><strong>Jump Point Search (JPS)</strong> : A* ultra-optimisé pour grilles uniformes</li>
                <li><strong>Theta*</strong> : Chemins avec ligne de vue (any-angle pathfinding)</li>
                <li><strong>HPA*</strong> : Hierarchical A* pour très grandes cartes</li>
                <li><strong>D* Lite</strong> : Re-planification dynamique (obstacles mobiles)</li>
            </ul>
        `,
            exercises: [
                'Ajouter support des déplacements en diagonale (8 directions)',
                'Implémenter un coût de terrain variable (sable = 2, route = 0.5)',
                'Créer une visualisation qui anime l\'exploration de A*',
                'Optimiser avec un dictionnaire de positions déjà visitées',
                'Implémenter le lissage de chemin (path smoothing)'
            ]
        },
        
        '3': {
            title: 'Module 3 : Behavior Trees (Arbres de Comportement)',
            intro: 'Crée des IA complexes et modulaires avec des arbres de comportement, la technique utilisée dans Halo et The Sims.',
            code: `from enum import Enum

class Status(Enum):
    """États possibles d'un nœud"""
    SUCCESS = 1
    FAILURE = 2
    RUNNING = 3

class Node:
    """Classe de base pour tous les nœuds"""
    def __init__(self, nom="Node"):
        self.nom = nom
        self.status = None
    
    def tick(self, agent, blackboard):
        """Exécute le nœud et retourne un Status"""
        raise NotImplementedError("À implémenter dans les classes filles")
    
    def reset(self):
        """Réinitialise le nœud"""
        self.status = None

# === NŒUDS COMPOSITES ===

class Sequence(Node):
    """Exécute enfants dans l'ordre. ÉCHEC si un enfant échoue."""
    def __init__(self, nom="Sequence", enfants=None):
        super().__init__(nom)
        self.enfants = enfants or []
    
    def tick(self, agent, blackboard):
        for enfant in self.enfants:
            status = enfant.tick(agent, blackboard)
            
            if status == Status.FAILURE:
                self.status = Status.FAILURE
                return Status.FAILURE
            
            if status == Status.RUNNING:
                self.status = Status.RUNNING
                return Status.RUNNING
        
        self.status = Status.SUCCESS
        return Status.SUCCESS

class Selector(Node):
    """Essaye enfants jusqu'à SUCCÈS. ÉCHEC si tous échouent."""
    def __init__(self, nom="Selector", enfants=None):
        super().__init__(nom)
        self.enfants = enfants or []
    
    def tick(self, agent, blackboard):
        for enfant in self.enfants:
            status = enfant.tick(agent, blackboard)
            
            if status == Status.SUCCESS:
                self.status = Status.SUCCESS
                return Status.SUCCESS
            
            if status == Status.RUNNING:
                self.status = Status.RUNNING
                return Status.RUNNING
        
        self.status = Status.FAILURE
        return Status.FAILURE

class Parallel(Node):
    """Exécute tous les enfants simultanément"""
    def __init__(self, nom="Parallel", enfants=None, seuil_succes=1):
        super().__init__(nom)
        self.enfants = enfants or []
        self.seuil_succes = seuil_succes  # Nb de succès nécessaires
    
    def tick(self, agent, blackboard):
        succes_count = 0
        echec_count = 0
        
        for enfant in self.enfants:
            status = enfant.tick(agent, blackboard)
            
            if status == Status.SUCCESS:
                succes_count += 1
            elif status == Status.FAILURE:
                echec_count += 1
        
        if succes_count >= self.seuil_succes:
            self.status = Status.SUCCESS
            return Status.SUCCESS
        
        if echec_count > len(self.enfants) - self.seuil_succes:
            self.status = Status.FAILURE
            return Status.FAILURE
        
        self.status = Status.RUNNING
        return Status.RUNNING

# === NŒUDS DÉCORATEURS ===

class Inverter(Node):
    """Inverse le résultat de l'enfant"""
    def __init__(self, nom="Inverter", enfant=None):
        super().__init__(nom)
        self.enfant = enfant
    
    def tick(self, agent, blackboard):
        status = self.enfant.tick(agent, blackboard)
        
        if status == Status.SUCCESS:
            return Status.FAILURE
        elif status == Status.FAILURE:
            return Status.SUCCESS
        
        return Status.RUNNING

class Repeater(Node):
    """Répète l'enfant N fois"""
    def __init__(self, nom="Repeater", enfant=None, repetitions=3):
        super().__init__(nom)
        self.enfant = enfant
        self.repetitions = repetitions
        self.compteur = 0
    
    def tick(self, agent, blackboard):
        while self.compteur < self.repetitions:
            status = self.enfant.tick(agent, blackboard)
            
            if status == Status.RUNNING:
                return Status.RUNNING
            
            self.compteur += 1
        
        self.compteur = 0
        return Status.SUCCESS

# === NŒUDS FEUILLES (ACTIONS & CONDITIONS) ===

class Condition(Node):
    """Nœud de condition personnalisé"""
    def __init__(self, nom, fonction_test):
        super().__init__(nom)
        self.fonction_test = fonction_test
    
    def tick(self, agent, blackboard):
        if self.fonction_test(agent, blackboard):
            self.status = Status.SUCCESS
            return Status.SUCCESS
        
        self.status = Status.FAILURE
        return Status.FAILURE

class Action(Node):
    """Nœud d'action personnalisé"""
    def __init__(self, nom, fonction_action):
        super().__init__(nom)
        self.fonction_action = fonction_action
    
    def tick(self, agent, blackboard):
        resultat = self.fonction_action(agent, blackboard)
        
        if resultat is True:
            self.status = Status.SUCCESS
            return Status.SUCCESS
        elif resultat is False:
            self.status = Status.FAILURE
            return Status.FAILURE
        
        self.status = Status.RUNNING
        return Status.RUNNING

# === BLACKBOARD (Mémoire Partagée) ===

class Blackboard:
    """Tableau noir pour partager données entre nœuds"""
    def __init__(self):
        self.data = {}
    
    def set(self, cle, valeur):
        self.data[cle] = valeur
    
    def get(self, cle, defaut=None):
        return self.data.get(cle, defaut)
    
    def has(self, cle):
        return cle in self.data

# === EXEMPLE : IA DE GARDE ===

class Agent:
    def __init__(self):
        self.position = [0, 0]
        self.vie = 100
        self.munitions = 30
        self.cible = None

# Fonctions de condition
def a_detecte_ennemi(agent, bb):
    return bb.get('ennemi_detecte', False)

def est_a_portee(agent, bb):
    return bb.get('distance_ennemi', 100) < 10

def a_munitions(agent, bb):
    return agent.munitions > 0

def vie_basse(agent, bb):
    return agent.vie < 30

# Fonctions d'action
def patrouiller(agent, bb):
    print(f"🚶 {agent.position} Patrouille...")
    agent.position[0] += 1
    return True

def chercher_ennemi(agent, bb):
    print("🔍 Recherche d'ennemis...")
    # Simulation détection
    import random
    if random.random() > 0.7:
        bb.set('ennemi_detecte', True)
        bb.set('distance_ennemi', random.randint(5, 20))
    return True

def approcher_ennemi(agent, bb):
    print("🏃 Approche de l'ennemi...")
    distance = bb.get('distance_ennemi', 100)
    bb.set('distance_ennemi', distance - 2)
    return distance <= 10

def tirer(agent, bb):
    if agent.munitions > 0:
        print("💥 TIRE !")
        agent.munitions -= 1
        return True
    return False

def fuir(agent, bb):
    print("🏃💨 FUITE !")
    agent.position[0] -= 5
    return True

def appeler_renforts(agent, bb):
    print("📞 Appel de renforts !")
    return True

# Construction de l'arbre
arbre_garde = Selector("IA Garde", [
    # 1. Si vie basse → Fuir
    Sequence("Fuite", [
        Condition("Vie basse ?", vie_basse),
        Parallel("Fuir + Renforts", [
            Action("Fuir", fuir),
            Action("Appeler renforts", appeler_renforts)
        ])
    ]),
    
    # 2. Si ennemi détecté → Combattre
    Sequence("Combat", [
        Condition("Ennemi détecté ?", a_detecte_ennemi),
        Selector("Stratégie de combat", [
            # Tirer si à portée et munitions
            Sequence("Tir", [
                Condition("À portée ?", est_a_portee),
                Condition("A munitions ?", a_munitions),
                Action("Tirer", tirer)
            ]),
            # Sinon approcher
            Action("Approcher", approcher_ennemi)
        ])
    ]),
    
    # 3. Sinon → Patrouiller
    Sequence("Patrouille", [
        Action("Chercher", chercher_ennemi),
        Action("Patrouiller", patrouiller)
    ])
])

# Simulation
agent = Agent()
bb = Blackboard()

print("=== SIMULATION BEHAVIOR TREE ===\\n")
for tick in range(10):
    print(f"--- Tick {tick+1} ---")
    arbre_garde.tick(agent, bb)
    print(f"Position: {agent.position}, Vie: {agent.vie}, Munitions: {agent.munitions}\\n")`,
            explanation: `
            <h4>🌳 Qu'est-ce qu'un Behavior Tree ?</h4>
            <p>Système d'IA <strong>modulaire et hiérarchique</strong> utilisé dans les jeux AAA. Permet de créer des comportements complexes en combinant des briques simples.</p>
            
            <h4>🔷 Types de Nœuds</h4>
            <p><strong>Composites</strong> : Contrôlent le flux</p>
            <ul>
                <li><strong>Sequence</strong> : ET logique (tous doivent réussir)</li>
                <li><strong>Selector</strong> : OU logique (un seul doit réussir)</li>
                <li><strong>Parallel</strong> : Exécute plusieurs tâches simultanément</li>
            </ul>
            
            <p><strong>Décorateurs</strong> : Modifient le comportement</p>
            <ul>
                <li><strong>Inverter</strong> : Inverse succès ↔ échec</li>
                <li><strong>Repeater</strong> : Répète N fois</li>
                <li><strong>Succeeder</strong> : Force toujours SUCCESS</li>
            </ul>
            
            <p><strong>Feuilles</strong> : Actions concrètes</p>
            <ul>
                <li><strong>Condition</strong> : Teste un état (retourne SUCCESS/FAILURE)</li>
                <li><strong>Action</strong> : Fait quelque chose (peut retourner RUNNING)</li>
            </ul>
            
            <h4>📋 Le Blackboard</h4>
            <p>Mémoire partagée où tous les nœuds peuvent lire/écrire des données. Permet la communication entre branches de l'arbre.</p>
            
            <h4>🎮 Avantages vs FSM (Finite State Machine)</h4>
            <ul>
                <li>Plus <strong>modulaire</strong> : Réutiliser des sous-arbres</li>
                <li>Plus <strong>lisible</strong> : Structure hiérarchique claire</li>
                <li>Plus <strong>flexible</strong> : Ajouter comportements sans casser l'existant</li>
                <li><strong>Designer-friendly</strong> : Éditable visuellement dans Unreal/Unity</li>
            </ul>
        `,
            bestPractices: `
            <h4>✅ Bonnes Pratiques</h4>
            <ul>
                <li><strong>Garder nœuds atomiques</strong> : Une action = une responsabilité</li>
                <li><strong>Utiliser le Blackboard</strong> : Éviter variables globales</li>
                <li><strong>Nommer clairement</strong> : "Patrouiller zone A", pas "Action1"</li>
                <li><strong>Tester isolément</strong> : Chaque sous-arbre doit fonctionner seul</li>
                <li><strong>Éviter arbres trop profonds</strong> : Max 4-5 niveaux</li>
            </ul>
        `,
            advancedTips: `
            <h4>🚀 Techniques Avancées</h4>
            <ul>
                <li><strong>Dynamic Priority Selector</strong> : Réordonne enfants selon priorités runtime</li>
                <li><strong>Subtree instancing</strong> : Partage de sous-arbres entre agents</li>
                <li><strong>Event-driven nodes</strong> : Réagir à événements jeu</li>
                <li><strong>Animation integration</strong> : Synchroniser BT avec animations</li>
            </ul>
        `,
            exercises: [
                'Créer un nœud UntilFail qui répète jusqu\'à échec',
                'Implémenter un Timeout qui force FAILURE après X secondes',
                'Créer une IA de marchand (accueillir, vendre, négocier)',
                'Ajouter un visualiseur qui affiche l\'arbre en temps réel',
                'Implémenter un système de cooldown pour les actions'
            ]
        },
        
        '4': {
            title: 'Module 4 : Machine Learning - Q-Learning',
            intro: 'Fais apprendre ton IA par l\'expérience avec le Reinforcement Learning !',
            code: `import numpy as np
import random
import pickle

class QLearningAgent:
    """
    Agent qui apprend par Q-Learning
    (Reinforcement Learning)
    """
    
    def __init__(self, nb_etats, nb_actions, alpha=0.1, gamma=0.9, epsilon=0.5):
        """
        Args:
            nb_etats: Nombre d'états possibles
            nb_actions: Nombre d'actions possibles
            alpha: Taux d'apprentissage (0-1)
            gamma: Facteur de discount (importance du futur)
            epsilon: Taux d'exploration (epsilon-greedy)
        """
        self.nb_etats = nb_etats
        self.nb_actions = nb_actions
        self.alpha = alpha      # Learning rate
        self.gamma = gamma      # Discount factor
        self.epsilon = epsilon  # Exploration rate
        
        # Q-Table : [états][actions]
        self.q_table = np.zeros((nb_etats, nb_actions))
        
        # Statistiques
        self.nb_episodes = 0
        self.recompense_totale = 0
    
    def choisir_action(self, etat):
        """
        Stratégie epsilon-greedy
        - Avec probabilité epsilon : exploration (action aléatoire)
        - Sinon : exploitation (meilleure action connue)
        """
        if random.random() < self.epsilon:
            # Exploration
            return random.randint(0, self.nb_actions - 1)
        else:
            # Exploitation
            return np.argmax(self.q_table[etat])
    
    def apprendre(self, etat, action, recompense, nouvel_etat, termine):
        """
        Met à jour la Q-Table selon la formule Q-Learning
        
        Q(s,a) = Q(s,a) + α * [r + γ * max(Q(s',a')) - Q(s,a)]
        """
        # Valeur actuelle
        q_actuel = self.q_table[etat, action]
        
        # Meilleure action future
        if termine:
            q_futur_max = 0  # Pas de futur si terminal
        else:
            q_futur_max = np.max(self.q_table[nouvel_etat])
        
        # Formule Q-Learning
        q_nouveau = q_actuel + self.alpha * (
            recompense + self.gamma * q_futur_max - q_actuel
        )
        
        # Mise à jour
        self.q_table[etat, action] = q_nouveau
        self.recompense_totale += recompense
    
    def nouvel_episode(self):
        """Appelé au début d'un nouvel épisode"""
        self.nb_episodes += 1
        
        # Réduire epsilon au fil du temps (moins d'exploration)
        self.epsilon = max(0.01, self.epsilon * 0.995)
    
    def sauvegarder(self, fichier):
        """Sauvegarde la Q-Table"""
        with open(fichier, 'wb') as f:
            pickle.dump(self.q_table, f)
        print(f"Q-Table sauvegardée dans {fichier}")
    
    def charger(self, fichier):
        """Charge une Q-Table sauvegardée"""
        with open(fichier, 'rb') as f:
            self.q_table = pickle.load(f)
        print(f"Q-Table chargée depuis {fichier}")
    
    def statistiques(self):
        """Affiche les statistiques d'apprentissage"""
        return {
            'episodes': self.nb_episodes,
            'recompense_moyenne': self.recompense_totale / max(1, self.nb_episodes),
            'epsilon': self.epsilon,
            'q_max': np.max(self.q_table),
            'q_min': np.min(self.q_table)
        }

# Exemple : Jeu simple de grille
class JeuGrille:
    """
    Jeu simple : agent doit atteindre l'objectif
    0 = vide, 1 = mur, 2 = objectif, 3 = piège
    """
    def __init__(self, taille=5):
        self.taille = taille
        self.reset()
    
    def reset(self):
        """Réinitialise le jeu"""
        self.grille = np.zeros((self.taille, self.taille))
        
        # Placer agent (coin haut-gauche)
        self.pos_agent = [0, 0]
        
        # Placer objectif (coin bas-droit)
        self.pos_objectif = [self.taille-1, self.taille-1]
        self.grille[self.pos_objectif[0], self.pos_objectif[1]] = 2
        
        # Placer pièges aléatoires
        for _ in range(3):
            x, y = random.randint(0, self.taille-1), random.randint(0, self.taille-1)
            if [x, y] != self.pos_agent and [x, y] != self.pos_objectif:
                self.grille[x, y] = 3
        
        return self.obtenir_etat()
    
    def obtenir_etat(self):
        """Convertit position en ID d'état unique"""
        return self.pos_agent[0] * self.taille + self.pos_agent[1]
    
    def step(self, action):
        """
        Effectue une action
        0=haut, 1=bas, 2=gauche, 3=droite
        
        Returns:
            nouvel_etat, recompense, termine
        """
        # Sauvegarder ancienne position
        ancienne_pos = self.pos_agent.copy()
        
        # Appliquer action
        if action == 0:   # Haut
            self.pos_agent[0] = max(0, self.pos_agent[0] - 1)
        elif action == 1: # Bas
            self.pos_agent[0] = min(self.taille-1, self.pos_agent[0] + 1)
        elif action == 2: # Gauche
            self.pos_agent[1] = max(0, self.pos_agent[1] - 1)
        elif action == 3: # Droite
            self.pos_agent[1] = min(self.taille-1, self.pos_agent[1] + 1)
        
        # Calculer récompense
        case = self.grille[self.pos_agent[0], self.pos_agent[1]]
        
        if self.pos_agent == self.pos_objectif:
            recompense = 100  # Objectif atteint !
            termine = True
        elif case == 3:
            recompense = -50  # Piège !
            termine = True
        elif self.pos_agent == ancienne_pos:
            recompense = -1   # Mur ou bord
            termine = False
        else:
            recompense = -1   # Pénalité de déplacement
            termine = False
        
        return self.obtenir_etat(), recompense, termine

# Entraînement de l'agent
nb_etats = 25  # Grille 5x5
nb_actions = 4  # Haut, Bas, Gauche, Droite

agent = QLearningAgent(nb_etats, nb_actions, alpha=0.1, gamma=0.9, epsilon=0.5)
jeu = JeuGrille(taille=5)

# Entraîner sur 1000 épisodes
for episode in range(1000):
    etat = jeu.reset()
    agent.nouvel_episode()
    
    for step in range(100):  # Max 100 steps par épisode
        action = agent.choisir_action(etat)
        nouvel_etat, recompense, termine = jeu.step(action)
        agent.apprendre(etat, action, recompense, nouvel_etat, termine)
        
        etat = nouvel_etat
        
        if termine:
            break
    
    # Afficher progression tous les 100 épisodes
    if (episode + 1) % 100 == 0:
        stats = agent.statistiques()
        print(f"Épisode {episode+1} - Récompense moyenne: {stats['recompense_moyenne']:.2f}, Epsilon: {stats['epsilon']:.3f}")

# Sauvegarder l'agent entraîné
agent.sauvegarder('agent_grille.pkl')

print("\\nEntraînement terminé !")
print("L'agent a appris à naviguer dans la grille !")`,
            explanation: `
            <h4>🧠 Qu'est-ce que le Q-Learning ?</h4>
            <p>Algorithme de <strong>Reinforcement Learning</strong> où l'agent apprend par <strong>essai-erreur</strong>. Il découvre quelles actions donnent les meilleures récompenses.</p>
            
            <h4>📊 La Q-Table</h4>
            <p>Tableau [états][actions] qui stocke la <strong>valeur Q</strong> = qualité estimée de faire une action dans un état.</p>
            <p>Exemple : Q[état=5, action=droite] = 0.8 signifie qu'aller à droite depuis l'état 5 est une bonne idée.</p>
            
            <h4>🎯 Formule Q-Learning</h4>
            <p><strong>Q(s,a) = Q(s,a) + α * [r + γ * max(Q(s',a')) - Q(s,a)]</strong></p>
            <ul>
                <li><strong>α (alpha)</strong> : Vitesse d'apprentissage (0.1 = lent, 0.9 = rapide)</li>
                <li><strong>γ (gamma)</strong> : Importance du futur (0.9 = voit loin, 0.1 = court terme)</li>
                <li><strong>r</strong> : Récompense immédiate</li>
                <li><strong>max(Q(s',a'))</strong> : Meilleure action possible au prochain état</li>
            </ul>
            
            <h4>⚖️ Exploration vs Exploitation</h4>
            <p><strong>Epsilon-Greedy</strong> : Avec probabilité ε, fait action aléatoire (explore), sinon meilleure action connue (exploite)</p>
            <p><strong>ε élevé</strong> (0.5) : Explore beaucoup au début</p>
            <p><strong>ε faible</strong> (0.01) : Exploite ce qu'il a appris à la fin</p>
            
            <h4>📈 Processus d'Apprentissage</h4>
            <ol>
                <li>Observer l'état actuel</li>
                <li>Choisir une action (epsilon-greedy)</li>
                <li>Exécuter l'action</li>
                <li>Recevoir récompense et nouvel état</li>
                <li>Mettre à jour Q-Table</li>
                <li>Répéter des milliers de fois</li>
            </ol>
        `,
            bestPractices: `
            <h4>✅ Bonnes Pratiques Q-Learning</h4>
            <ul>
                <li><strong>Commencer epsilon haut</strong> : 0.5-1.0 pour explorer</li>
                <li><strong>Decay epsilon</strong> : Réduire progressivement (x0.995 chaque épisode)</li>
                <li><strong>Normaliser récompenses</strong> : Entre -1 et +1 pour stabilité</li>
                <li><strong>Pénaliser le temps</strong> : -1 par step pour encourager efficacité</li>
                <li><strong>Entraîner longtemps</strong> : 10k-100k épisodes minimum</li>
                <li><strong>Sauvegarder souvent</strong> : Checkpoints tous les 1000 épisodes</li>
            </ul>
        `,
            advancedTips: `
            <h4>🚀 Pour Aller Plus Loin</h4>
            <ul>
                <li><strong>Deep Q-Network (DQN)</strong> : Remplacer Q-Table par réseau de neurones</li>
                <li><strong>Experience Replay</strong> : Mémoriser et rejouer anciennes expériences</li>
                <li><strong>Target Network</strong> : Stabiliser l'apprentissage</li>
                <li><strong>Double DQN</strong> : Éviter la surestimation des Q-values</li>
                <li><strong>Prioritized Replay</strong> : Apprendre plus des erreurs importantes</li>
            </ul>
        `,
            exercises: [
                'Modifier les récompenses pour voir l\'impact sur l\'apprentissage',
                'Ajouter un graphique qui montre l\'évolution de la récompense moyenne',
                'Implémenter un mode "test" qui désactive l\'exploration (epsilon=0)',
                'Créer un jeu plus complexe : grille 10x10 avec plusieurs objectifs',
                'Ajouter une visualisation qui montre l\'agent jouer en temps réel'
            ]
        }
    };
    
    // Exposer la constante globalement de manière sécurisée
    window.PYTHON_AI_COURSES = PYTHON_AI_COURSES;
    
    // Confirmation de chargement
    console.log('✅ PYTHON_AI_COURSES chargé avec succès');
    console.log(`📚 ${Object.keys(PYTHON_AI_COURSES).length} modules disponibles`);
    
})(window);