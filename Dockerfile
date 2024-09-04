# Étape 1 : Construction de l'application
FROM node:18 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers du projet
COPY . .

# Construire l'application pour la production
RUN npm run build --prod

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine

# Copier les fichiers construits de l'étape précédente dans le dossier Nginx
COPY --from=build /app/dist/front-deli-vite /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Commande pour démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
