# CI Demo — GitHub Actions + Deploy SSH

Projet React minimal pour apprendre GitHub Actions.  
Chaque Pull Request déclenche automatiquement un build + déploiement SSH sur la VM.

---

## Structure du projet

```
ci-demo/
├── src/
│   ├── main.jsx
│   └── App.jsx
├── .github/
│   └── workflows/
│       └── deploy-pr.yml   ← le workflow CI/CD
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Setup (à faire une seule fois)

### 1. Générer une clé SSH dédiée (sur ton poste)

```bash
ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/github_actions_key -N ""
```

Deux fichiers sont créés :
- `~/.ssh/github_actions_key`       ← **clé privée** (pour GitHub Secrets)
- `~/.ssh/github_actions_key.pub`   ← **clé publique** (pour la VM)

### 2. Ajouter la clé publique sur la VM

```bash
ssh nkodonou@102.215.93.225 \
  "mkdir -p ~/.ssh && echo '$(cat ~/.ssh/github_actions_key.pub)' >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
```

### 3. Ajouter la clé privée dans GitHub Secrets

1. Va sur ton repo GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Clique **New repository secret**
3. Nom : `SSH_PRIVATE_KEY`
4. Valeur : contenu de `~/.ssh/github_actions_key`  
   ```bash
   cat ~/.ssh/github_actions_key
   ```

### 4. Installer Nginx sur la VM (pour servir les fichiers)

```bash
ssh nkodonou@102.215.93.225 "sudo apt install -y nginx && sudo mkdir -p /var/www/ci-demo && sudo chown -R nkodonou:nkodonou /var/www/ci-demo"
```

Puis configure `/etc/nginx/sites-available/default` pour servir `/var/www/ci-demo`.

---

## 🚀 Utilisation

```bash
# Clone le repo
git clone https://github.com/<ton-user>/ci-demo.git
cd ci-demo

# Crée une branche
git checkout -b ma-feature

# Fais une modif dans src/App.jsx, puis :
git add .
git commit -m "feat: ma modification"
git push origin ma-feature
```

Ensuite ouvre une **Pull Request** sur GitHub → le workflow se déclenche automatiquement.

---

## Ce que fait le workflow (deploy-pr.yml)

| Étape | Action |
|-------|--------|
| `actions/checkout@v4` | Récupère le code de la PR |
| `actions/setup-node@v4` | Installe Node.js 20 |
| `npm install` | Installe les dépendances |
| `npm run build` | Génère le dossier `dist/` |
| `scp` via SSH | Copie `dist/` vers `/var/www/ci-demo/pr-<N>/` sur la VM |
| `github-script` | Poste un commentaire sur la PR avec l'URL de preview |

Chaque PR est déployée dans son propre dossier : `pr-1/`, `pr-2/`, etc.
