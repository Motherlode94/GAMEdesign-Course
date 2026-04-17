# 🎮 GameDev Academy - Version Complète

Site web interactif pour apprendre Unity C# et le développement de jeux HTML5

## 📁 Structure du Projet

```
gamedev-academy/
├── index.html                  # Page principale
├── css/
│   └── style.css              # Styles complets avec animations
├── js/
│   ├── script.js              # Version de base (fonctionnelle)
│   ├── script-enhanced.js     # Version améliorée (recommandée)
│   ├── courses.js             # Cours de base
│   ├── courses-enhanced.js    # Cours enrichis (recommandés)
│   └── exercises.js           # Exercices interactifs
└── docs/
    ├── README.md              # Documentation complète
    ├── GUIDE.md               # Guide d'utilisation rapide
    └── CHANGELOG.md           # Liste des améliorations
```

## 🚀 Installation Rapide

### Option 1 : Simple (30 secondes)
1. Télécharge tout le dossier `gamedev-academy`
2. Double-clique sur `index.html`
3. C'est prêt ! 🎉

### Option 2 : Serveur local (Recommandé pour développement)
```bash
# Avec Python 3
cd gamedev-academy
python -m http.server 8000

# Puis ouvre http://localhost:8000
```

## 🎯 Deux Versions Disponibles

### Version Standard (Prête à l'emploi)
- `js/script.js` + `js/courses.js`
- Fonctionnalités de base
- Parfait pour commencer

### Version Enhanced (Recommandée) ⭐
- `js/script-enhanced.js` + `js/courses-enhanced.js`
- Sauvegarde automatique de la progression
- Notifications et animations
- Raccourcis clavier
- Cours enrichis et détaillés

**Pour activer la version Enhanced :**
Modifie `index.html` ligne 296-298 :
```html
<!-- Remplacer -->
<script src="js/courses.js"></script>
<script src="js/script.js"></script>

<!-- Par -->
<script src="js/courses-enhanced.js"></script>
<script src="js/script-enhanced.js"></script>
```

## ✨ Fonctionnalités

### 📚 Contenu Éducatif
- **6 Chapitres Unity C#** : Scripts, déplacement, vie, IA, comportements, véhicules
- **4 Modules Jeux HTML5** : Canvas, inputs, collisions, IA
- **Exercices Interactifs** : Vérification automatique + corrections détaillées

### 🎨 Interface
- Design moderne et responsive
- Animations fluides
- Navigation intuitive
- Mode mobile optimisé

### 💾 Version Enhanced
- Sauvegarde automatique LocalStorage
- Progression persistante
- Indicateurs de complétion
- Raccourcis clavier (Ctrl+S, Ctrl+Enter, Échap)
- Notifications élégantes
- Célébrations de réussite 🎉

## 📖 Documentation

- **[README.md](docs/README.md)** - Installation et configuration complète
- **[GUIDE.md](docs/GUIDE.md)** - Guide d'utilisation rapide
- **[CHANGELOG.md](docs/CHANGELOG.md)** - Historique des versions

## 🎓 Plan d'Apprentissage Recommandé

### Semaine 1-2 : Bases
- Chapitre 1-2 (Unity)
- Module 1-2 (Web)
- Tous les exercices débutants

### Semaine 3-4 : Intermédiaire
- Chapitre 3-5 (Unity)
- Module 3-4 (Web)
- Exercices intermédiaires

### Semaine 5-6 : Avancé
- Chapitre 6 (Unity)
- Exercices avancés
- Mini-projet personnel

## 🔧 Personnalisation

### Changer les Couleurs
Dans `css/style.css` :
```css
:root {
    --primary: #6366f1;      /* Couleur principale */
    --secondary: #8b5cf6;    /* Couleur secondaire */
}
```

### Ajouter un Cours
Dans `js/courses.js` ou `js/courses-enhanced.js`

### Ajouter un Exercice
Dans `js/exercises.js`

## 🐛 Dépannage

### Le site ne charge pas
- Vérifie que tous les fichiers sont présents
- Utilise un navigateur récent (Chrome, Firefox, Edge)
- Ouvre la console (F12) pour voir les erreurs

### Les scripts ne fonctionnent pas
- Vérifie les chemins dans `index.html`
- Les fichiers JS doivent être dans le dossier `js/`
- Le CSS doit être dans le dossier `css/`

## 💻 Compatibilité

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ❌ IE11 non supporté

## 📊 Statistiques

| Métrique | Valeur |
|----------|--------|
| Chapitres Unity | 6 |
| Modules Web | 4 |
| Exercices | 6+ |
| Taille totale | ~100 KB |
| Dépendances | 0 |
| Temps de chargement | < 1s |

## 🤝 Contribution

Pour améliorer le site :
1. Ajoute des cours dans la même structure
2. Crée des exercices supplémentaires
3. Améliore les explications
4. Corrige les bugs

## 📜 Licence

Projet éducatif libre d'utilisation pour l'apprentissage personnel.

## 🎉 Prochaines Améliorations

- [ ] Syntax highlighting (Prism.js)
- [ ] Mode sombre
- [ ] Export de code en .cs/.js
- [ ] Plus d'exercices
- [ ] Système de badges
- [ ] Graphique de progression

---

**Créé avec ❤️ pour faciliter l'apprentissage du game development**

*Version 2.0 - Dernière mise à jour : 05/02/2026*

## 🚀 Démarrage Rapide

```bash
# Télécharge le projet
# Ouvre index.html dans ton navigateur
# Commence par le Chapitre 1 Unity
# Fais les exercices
# Profite ! 🎮
```

**Questions ? Consulte [GUIDE.md](docs/GUIDE.md) pour plus de détails !**
