# SPIN ROOM

Page d'accueil d'un disquaire en ligne imaginaire, vinyles neufs et d'occasion, construite en HTML, CSS et JavaScript, sans librairie.

**[Voir la démo en ligne](https://charlesdev-web.github.io/spin-room/)** · **[Lancer la visite guidée](https://charlesdev-web.github.io/spin-room/?tour)**

![Aperçu de SPIN ROOM](apercu.jpg)



https://github.com/user-attachments/assets/8c3ca5e1-8df1-4fe0-a63c-24d3b9902a8c





> Projet de démonstration pour mon portfolio. Les artistes, les albums, les prix et les pochettes sont fictifs ; les pochettes ont été générées en code pour le projet.

## Ce que fait la page

- **Un bac à vinyles en 3D** : les pochettes forment une rangée en perspective qu'on feuillette au glisser (souris, trackpad ou doigt), au clic ou avec les flèches du clavier.
- **Le disque mis en avant** se redresse, avance, et son vinyle sort de la pochette en tournant. L'étiquette du disque reprend la pochette ; quelques albums ont un vinyle coloré.
- **La scène réagit** à la position de la souris et défile toute seule à l'arrivée, jusqu'à la première interaction.
- **Une sélection du moment** avec étiquettes Neuf / Occasion, note d'état et prix.
- **Un menu plein écran** sur téléphone.
- **Un mode visite guidée** (`?tour` à la fin de l'adresse) qui parcourt la page tout seul, pratique pour enregistrer une vidéo de présentation.

## Technique

- HTML, CSS et JavaScript « vanilla », dans un seul fichier, sans framework ni dépendance.
- 3D réalisée en **CSS** (`perspective`, `transform-style: preserve-3d`, `translate3d`), animée en JavaScript avec `requestAnimationFrame` et un lissage des mouvements.
- Polices **Fraunces** (titres) et **Inter** (textes) hébergées dans le projet, sans appel à un service externe.
- Responsive (ordinateur et téléphone), navigation au clavier, respect du réglage « réduire les animations ».
- Publication avec **GitHub Pages**.

## Lancer le projet

Aucune installation : télécharger le dépôt et ouvrir `index.html` dans un navigateur.

Pour ajouter un disque : déposer une image carrée JPG dans `pochettes/`, puis ajouter une ligne à la liste `disques` dans `index.html`.

## Prochaines étapes

- Page catalogue avec filtres par genre et par état
- Fiches produits
- Panier

---

Réalisé par [charlesdev-web](https://github.com/charlesdev-web), en reconversion vers l’informatique.
