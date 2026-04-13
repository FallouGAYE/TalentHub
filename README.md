# 🚀 TalentHub

TalentHub est une plateforme web fullstack inspirée de LinkedIn et Indeed.  
Elle permet aux utilisateurs de créer un profil professionnel, publier du contenu, interagir avec une communauté et postuler à des offres d'emploi.
(Encours de dev )
---

## ✨ Features

### 🔐 Authentification
- Inscription et connexion
- Authentification sécurisée avec JWT
- Gestion des rôles :
  - USER
  - RECRUITER

---

### 👤 Profils
- Création et modification du profil
- Informations :
  - nom
  - titre
  - bio
  - localisation
  - avatar
- Consultation du profil utilisateur

---

### 📰 Réseau social
- Création de posts
- Feed personnalisé
- Like des posts
- Commentaires
- Follow / Unfollow utilisateurs

---

### 💼 Emploi
- Publication d'offres (recruteur)
- Consultation des offres
- Postuler à une offre
- Gestion des candidatures

---

### 📚 API & Documentation
- API REST complète
- Documentation avec Swagger :
http://localhost:3001/api/docs

---

## 🧱 Stack technique

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Swagger

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios

---

## 🏗️ Architecture

TalentHub/
├── backend/
│   └── talenthub-backend/
├── frontend/
│   └── talenthub-frontend/
└── README.md

---

## Installation

### 1. Cloner le projet

git clone https://github.com/FallouGAYE/TalentHub.git
cd TalentHub

---

### 2. Backend

cd backend/talenthub-backend
npm install

Créer un fichier .env :

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/talenthub?schema=public"
JWT_SECRET="supersecret"
PORT=3001

Lancer Prisma :

npx prisma migrate dev
npx prisma generate

Démarrer le serveur :

npm run start:dev

Backend :
http://localhost:3001

---

### 3. Frontend

cd ../../frontend/talenthub-frontend
npm install
npm run dev

Frontend :
http://localhost:3000

---

## Endpoints principaux

### Auth
- POST /auth/register
- POST /auth/login
- GET /auth/me

### Profiles
- GET /profiles/me
- PATCH /profiles/me

### Posts
- POST /posts
- GET /posts/feed
- POST /posts/:id/like

### Comments
- POST /posts/:id/comments

### Jobs
- POST /jobs
- GET /jobs
- POST /jobs/:id/apply

---

## Fonctionnalités implémentées

- Authentification complète (JWT)
- Gestion des rôles
- Profils utilisateurs
- Feed dynamique
- Likes & commentaires
- Follow / unfollow
- Offres d'emploi
- Candidatures

---

##  Améliorations possibles

- Pagination du feed
- Notifications
- Upload d’image (avatar)
- Recherche utilisateurs / jobs
- Messages privés
- Déploiement cloud
---

## Objectif du projet

Ce projet a été réalisé pour :

- pratiquer une architecture fullstack moderne
- concevoir une API REST sécurisée
- gérer des rôles utilisateurs
- connecter frontend et backend
- construire une application réaliste type startup

---

## Auteur

Fallou Gaye

---


