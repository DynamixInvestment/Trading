# Dynamix Investment · Journal de trading

Site statique (GitHub Pages) + base de données Google Sheets (Apps Script) + relevé PDF.

## Contenu
- `index.html` : le site (saisie, stats, courbe, relevé PDF)
- `logo.png` : ton logo (affiché sur le site et dans le PDF)
- `apps-script/Code.gs` : le backend Google Sheets

## 1. Google Sheet + Apps Script
1. Crée un Google Sheet vide (ex. « Journal Dynamix »).
2. Menu **Extensions → Apps Script**, supprime le code existant et colle le contenu de `apps-script/Code.gs`.
3. Remplace `CHANGE_MOI` par ton mot de passe personnel (ligne 3).
4. **Déployer → Nouveau déploiement → Application Web** :
   - Exécuter en tant que : **Moi**
   - Qui a accès : **Tout le monde**
5. Autorise l’accès quand Google le demande, puis copie l’**URL de l’application Web** (finit par `/exec`).

L’onglet `Trades` se crée tout seul au premier chargement.

## 2. Configurer le site
Dans `index.html`, remplace `COLLER_ICI_URL_APPS_SCRIPT` par l’URL copiée (en gardant les guillemets).

## 3. Mettre en ligne sur GitHub
1. Crée un dépôt GitHub et envoie-y `index.html` et `logo.png` (le dossier `apps-script` est facultatif, il est déjà dans ton Google Sheet).
2. **Settings → Pages → Branch : main / (root) → Save**.
3. Ton site sera accessible sur `https://TON-PSEUDO.github.io/NOM-DU-DEPOT/`.

## Utilisation
- Connecte-toi avec ton mot de passe, saisis tes trades chaque jour.
- **Relevé PDF** : choisis les dates « Du / Au », clique sur « Télécharger le relevé ».
- Si tu modifies `Code.gs`, fais **Déployer → Gérer les déploiements → Modifier → Nouvelle version**.

## Sécurité
Le mot de passe protège l’accès aux données, mais il est vérifié côté Apps Script : ne le réutilise pas ailleurs. Garde le dépôt GitHub sans données (elles sont uniquement dans ton Google Sheet).
