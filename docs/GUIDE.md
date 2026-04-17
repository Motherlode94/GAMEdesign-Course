# 🎮 GUIDE RAPIDE - GameDev Academy

## 🚀 Démarrage en 3 Étapes

### 1️⃣ Installation (30 secondes)
```bash
# Télécharge tous les fichiers dans un dossier
# Double-clique sur index.html
# C'est tout ! 🎉
```

### 2️⃣ Navigation
- **Unity C#** : 6 chapitres progressifs
- **Jeux HTML5** : 4 modules web
- **Exercices** : Pratique interactive

### 3️⃣ Apprentissage
1. Clique sur une carte de cours
2. Lis le code et les explications
3. Va dans "Exercices"
4. Écris ton code
5. Clique "Vérifier"
6. Regarde la correction si besoin

---

## ⌨️ Raccourcis Clavier Super Utiles

| Raccourci | Action |
|-----------|--------|
| `Ctrl + S` | Sauvegarder la progression |
| `Ctrl + Enter` | Vérifier l'exercice |
| `Échap` | Fermer le modal |
| `Tab` | Indentation dans le code |

---

## 💡 Astuces Pro

### 📝 Pour les Exercices
- ✅ Ton code est **sauvegardé automatiquement**
- ✅ Tu peux **fermer le navigateur** sans perdre ton travail
- ✅ Utilise le bouton **"Réinitialiser"** pour recommencer
- ✅ La **correction** est toujours disponible
- ✅ Tu peux **copier** n'importe quel bloc de code

### 🎯 Pour la Progression
- Les cours consultés ont un badge **✓**
- Les exercices réussis sont marqués **"Complété"**
- Ta progression est **sauvegardée dans le navigateur**
- Tu peux tout réinitialiser avec `resetProgress()` dans la console

### 🔍 Pour Apprendre Efficacement
1. **Lis le code** avant les explications (essaie de comprendre seul)
2. **Tape le code toi-même** au lieu de copier/coller
3. **Modifie les valeurs** pour voir ce qui change
4. **Fais TOUS les exercices** (c'est là que tu apprends vraiment)
5. **Consulte les bonnes pratiques** dans chaque chapitre
6. **Évite les erreurs courantes** listées dans les cours

---

## 📚 Plan d'Apprentissage Recommandé

### 🟢 Niveau Débutant (1-2 semaines)
**Unity C#**
- ✅ Chapitre 1 : Scripts de base
- ✅ Chapitre 2 : Déplacement simple
- ✅ Chapitre 3 : Système de vie basique

**Jeux HTML5**
- ✅ Module 1 : Canvas et game loop
- ✅ Module 2 : Inputs clavier

**Objectif** : Créer un carré qui se déplace et peut perdre de la vie

### 🟡 Niveau Intermédiaire (2-3 semaines)
**Unity C#**
- ✅ Chapitre 4 : IA ennemie
- ✅ Chapitre 5 : Comportements complexes
- ✅ Reprendre les chapitres 1-3 avec les exercices avancés

**Jeux HTML5**
- ✅ Module 3 : Collisions
- ✅ Module 4 : IA simple

**Objectif** : Créer un mini-jeu avec joueur, ennemis et collisions

### 🔴 Niveau Avancé (3-4 semaines)
**Unity C#**
- ✅ Chapitre 6 : Véhicules
- ✅ Tous les exercices avancés
- ✅ Créer ton propre mini-projet

**Jeux HTML5**
- ✅ Tous les modules avec exercices avancés
- ✅ Combiner plusieurs systèmes

**Objectif** : Créer un prototype de jeu complet

---

## 🎨 Personnalisation

### Changer les Couleurs
Dans `style.css`, ligne 1-10 :
```css
:root {
    --primary: #6366f1;      /* Bleu principal */
    --secondary: #8b5cf6;    /* Violet secondaire */
    --success: #10b981;      /* Vert succès */
}
```

### Ajouter un Cours
Dans `courses.js` :
```javascript
UNITY_COURSES['7'] = {
    title: 'Mon Nouveau Cours',
    code: '// Code ici',
    explanation: 'Explications...',
    exercises: ['Exercice 1', 'Exercice 2']
};
```

### Ajouter un Exercice
Dans `exercises.js` :
```javascript
EXERCISES['unity-5'] = {
    description: 'Description',
    tasks: ['Tâche 1', 'Tâche 2'],
    requiredKeywords: ['mot1', 'mot2'],
    solution: '// Solution',
    solutionExplanation: 'Pourquoi ça marche'
};
```

---

## 🐛 Résolution de Problèmes

### Le site ne se charge pas
- Vérifie que tous les fichiers sont dans le même dossier
- Ouvre avec un navigateur récent (Chrome, Firefox, Edge)
- Vérifie la console (F12) pour les erreurs

### Ma progression a disparu
- Tu as peut-être vidé le cache du navigateur
- La progression est stockée dans `localStorage`
- Utilise toujours le même navigateur

### Les exercices ne se vérifient pas
- Vérifie que tu as bien écrit les mots-clés requis
- Les noms sont sensibles à la casse : `Debug.Log` ≠ `debug.log`
- Regarde la console (F12) pour plus d'infos

### Le code ne se sauvegarde pas
- La sauvegarde est automatique toutes les 30s
- Ou utilise `Ctrl + S`
- Vérifie que localStorage est activé dans ton navigateur

---

## 📊 Suivre ta Progression

### Dans la Console (F12)
```javascript
// Voir ta progression
console.log(AppState.completedExercises);

// Voir ton code sauvegardé
console.log(AppState.userCode);

// Réinitialiser tout
resetProgress();
```

### Statistiques
Le site affiche automatiquement :
- Nombre d'exercices complétés
- Cours consultés
- Dernière visite
- Code sauvegardé

---

## 🎓 Ressources Externes

### Pour Unity
- [Documentation officielle](https://docs.unity3d.com/)
- [Unity Learn](https://learn.unity.com/)
- [Brackeys YouTube](https://www.youtube.com/@Brackeys)
- [Unity Manual](https://docs.unity3d.com/Manual/index.html)

### Pour le Web
- [MDN Web Docs](https://developer.mozilla.org/)
- [Canvas Tutorial](https://developer.mozilla.org/fr/docs/Web/API/Canvas_API/Tutorial)
- [JavaScript.info](https://javascript.info/)

### Pour le C#
- [Microsoft C# Guide](https://learn.microsoft.com/fr-fr/dotnet/csharp/)
- [C# Yellow Book](http://www.csharpcourse.com/)

---

## 💪 Défis Bonus

Une fois que tu maîtrises les bases :

### 🎮 Défis Unity
1. Créer un système de score
2. Ajouter des power-ups
3. Créer un menu principal
4. Sauvegarder avec PlayerPrefs
5. Ajouter des sons

### 🌐 Défis Web
1. Ajouter des niveaux
2. Créer un système de vies
3. Implémenter un high score
4. Ajouter des particules
5. Créer un écran de game over

---

## 🤝 Contribution

Tu veux améliorer le site ?

1. **Ajoute des cours** : Suis la structure existante
2. **Crée des exercices** : Plus il y en a, mieux c'est
3. **Améliore les explications** : Clarté = apprentissage
4. **Corrige des bugs** : Ouvre la console et signale

---

## 📞 Support

### Problème Technique
1. Ouvre la console du navigateur (F12)
2. Cherche les erreurs en rouge
3. Vérifie que tous les fichiers sont présents

### Question sur le Code
- Les explications sont dans chaque cours
- Utilise les indices dans les exercices
- Regarde la correction pour comprendre

### Amélioration ou Suggestion
- Note tes idées
- Teste ce qui existe déjà
- Propose des améliorations concrètes

---

## 🎉 Félicitations !

Tu as maintenant tous les outils pour apprendre le game development efficacement.

**N'oublie pas** :
- 🔥 La pratique > la théorie
- 💪 L'échec = apprentissage
- 🚀 Petit à petit = grand résultat
- 🎮 S'amuser en apprenant

**Bon code et bon jeu ! 🎮✨**

---

*Guide créé le 05/02/2026*
*Version du site : 2.0*
