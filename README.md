# BNJ Frontend - Application d'Onboarding

## Stack Technique

### Frontend
- **Nuxt 4** - Framework Vue.js full-stack
- **Vue 3** - Framework JavaScript progressif
- **TypeScript** - Typage statique pour JavaScript
- **Nuxt UI** - Bibliothèque de composants UI pour Nuxt
- **Tailwind CSS** - Framework CSS utilitaire

### Gestion d'État et Validation
- **Pinia** - Store de gestion d'état pour Vue
- **Zod** - Validation de schémas TypeScript

### Internationalisation
- **@nuxtjs/i18n** - Module i18n pour Nuxt
- Langues supportées : Français (par défaut)

### Intégrations API
- **Hunter.io API** - Enrichissement automatique des informations d'entreprise

## Installation

### Prérequis
- Node.js 18.x ou supérieur
- npm, pnpm, yarn ou bun

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd app
```

2. **Installer les dépendances**
```bash
# yarn
yarn install
```

3. **Configuration des variables d'environnement**
Copier le fichier `.env.example` vers `.env` et configurer les variables :

```bash
cp .env.example .env
```

Éditer le fichier `.env` :
```env
# Hunter.io API Key (pour l'enrichissement des données entreprise)
NUXT_HUNTER_API_KEY=votre_cle_api_hunter
```

Pour obtenir une clé API Hunter.io : https://hunter.io/api

4. **Démarrer le serveur de développement**
```bash
# yarn
yarn dev
```

L'application sera accessible sur `http://localhost:3000` et sur https://test-bnj-lafatra.vercel.app/welcome/company-details

## Structure du Projet

```
app/
├── assets/              # Assets statiques (images, CSS, etc.)
│   ├── css/            # Fichiers CSS globaux
│   └── img/            # Images et icônes
├── components/          # Composants Vue réutilisables
│   ├── Preview.vue     # Composant de prévisualisation
│   └── Upload.vue      # Composant d'upload de fichiers
├── composables/         # Composables Vue
│   ├── useFileValidation.ts      # Validation de fichiers
│   └── useOnboardingAutoFill.ts  # Auto-remplissage onboarding
├── i18n/               # Internationalisation
│   └── locales/        # Fichiers de traduction
│       └── fr.json     # Traductions françaises
├── layouts/            # Layouts de l'application
│   └── welcome.vue     # Layout pour le parcours d'onboarding
├── pages/              # Pages de l'application (routing automatique)
│   └── welcome/        # Pages du parcours d'onboarding
│       ├── personal-details.vue    # Détails personnels
│       └── company-details.vue     # Détails de l'entreprise
├── server/             # API serveur Nuxt
│   └── api/
│       └── company/
│           └── enrich.post.ts     # Endpoint d'enrichissement entreprise
├── services/           # Services métier
│   └── companyExtractor.ts        # Extraction d'infos entreprise
├── stores/             # Stores Pinia
│   └── onboarding.ts              # Store du processus d'onboarding
├── utils/              # Utilitaires
│   └── initials.ts                # Génération d'initiales
├── nuxt.config.ts      # Configuration Nuxt
└── package.json        # Dépendances du projet
```

## Fonctionnalités

### 1. Onboarding Personnel
- **Upload de photo de profil**
  - Support des formats : PNG, JPEG
  - Validation de taille (max 5MB)
  - Prévisualisation en temps réel
  - Génération automatique d'initiales en fallback

- **Formulaire de données personnelles**
  - Prénom
  - Nom
  - Adresse email avec validation

### 2. Onboarding Entreprise
- **Upload de logo d'entreprise**
  - Support des formats : PNG, JPEG
  - Icône par défaut si aucun logo
  - Prévisualisation en temps réel

- **Auto-remplissage intelligent**
  - Extraction automatique du nom de domaine depuis l'email
  - Enrichissement des données via Hunter.io API
  - Récupération automatique de :
    - Nom de l'entreprise
    - Description
    - Secteur d'activité
    - Adresse du siège social

- **Formulaire de données entreprise**
  - Nom de l'entreprise (requis)
  - Logo
  - Description
  - Site internet
  - Adresse du siège social
  - Secteur d'activité

### 3. Prévisualisation en Temps Réel
- Aperçu dynamique de l'interface utilisateur
- Mise en surbrillance du formulaire actif
- Affichage des données saisies en temps réel
- Avatar avec photo ou initiales
- Logo d'entreprise ou icône par défaut

### 4. Validation de Formulaires
- Validation de schéma avec Zod
- Messages d'erreur personnalisés et internationalisés
- Validation de fichiers (type, taille)
- Validation d'email
- Champs requis marqués clairement

### 5. Sécurité
- **Protection des clés API**
  - Appels API côté serveur uniquement
  - Clés API stockées dans les variables d'environnement
  - Pas d'exposition des secrets côté client

### 6. Internationalisation (i18n)
- Support multilingue avec @nuxtjs/i18n
- Langue par défaut : Français
- Traductions pour :
  - Interface utilisateur
  - Messages de validation
  - Placeholders de formulaires
- Facilité d'ajout de nouvelles langues