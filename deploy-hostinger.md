# Déploiement PWA sur Hostinger - Guide Complet

## Étape 1 : Préparation du projet

### 1.1 Nettoyage du projet
Supprimez les fichiers inutiles :
- `node_modules/` (dossier)
- `package.json` et `package-lock.json`
- `force-install.js` (fichier de test)
- `README.md` (optionnel)

### 1.2 Vérification des fichiers PWA essentiels
Assurez-vous d'avoir :
- `index.html` (page principale)
- `sw.js` (service worker)
- `manifest.webmanifest` (manifest PWA)
- `.htaccess` (configuration serveur)
- `favicon.ico` (icône)
- `icons/` (dossier avec toutes les icônes PWA)
- `screenshots/` (captures d'écran)

## Étape 2 : Configuration Hostinger

### 2.1 Type d'hébergement recommandé
- **Hostinger Premium** ou **Business** (recommandé)
- **Hostinger Single** (minimum pour PWA)

### 2.2 Activation SSL/TLS
1. Connectez-vous à Hostinger cPanel
2. Allez dans "SSL/TLS Status"
3. Activez "SSL Certificate" (gratuit avec Let's Encrypt)

## Étape 3 : Upload des fichiers

### Méthode A : File Manager (recommandé)
1. Connectez-vous à cPanel Hostinger
2. Ouvrez "File Manager"
3. Allez dans `public_html/`
4. Créez un dossier pour votre app (ex: `strandpro/`)
5. Upload TOUS les fichiers du projet

### Méthode B : FTP
1. Utilisez FileZilla ou le client FTP de Hostinger
2. Connectez-vous avec vos identifiants FTP
3. Uploadez les fichiers dans `public_html/strandpro/`

## Étape 4 : Configuration finale

### 4.1 Vérification des permissions
Assurez-vous que les permissions sont :
- Dossiers : 755
- Fichiers : 644

### 4.2 Test du manifest
Visitez : `https://votredomaine.com/strandpro/manifest.webmanifest`

### 4.3 Test du service worker
Visitez : `https://votredomaine.com/strandpro/sw.js`

### 4.4 Validation PWA
1. Ouvrez Chrome DevTools
2. Allez dans "Application" 
3. Vérifiez :
   - Manifest valide
   - Service Worker enregistré
   - Pas d'erreurs dans la console

## Étape 5 : Optimisations PWA

### 5.1 Cache-Control
Le `.htaccess` inclus configure déjà :
- Cache statique 1 an
- Cache manifest 1 semaine
- Compression gzip

### 5.2 Performance
- Images optimisées (PNG/WebP)
- CSS/JS minifiés
- Service worker avec stratégie de cache

## Étape 6 : Lancement

### 6.1 Test final
1. Visitez `https://votredomaine.com/strandpro/`
2. Testez l'installation PWA
3. Vérifiez le mode hors-ligne

### 6.2 Soumission aux stores
Optionnel :
- **Google Play Store** (via Trusted Web Activity)
- **Microsoft Store** (PWA)
- **Samsung Galaxy Store** (PWA)

## Étape 7 : Maintenance

### 7.1 Mises à jour
- Modifiez les fichiers via File Manager ou FTP
- Incrémentez la version du cache dans `sw.js`
- Testez les mises à jour du service worker

### 7.2 Monitoring
- Utilisez Google Search Console
- Surveillez les erreurs dans les logs
- Testez régulièrement sur mobile/desktop

## Fichiers à uploader (liste finale) :

```
public_html/strandpro/
|-- index.html
|-- sw.js
|-- manifest.webmanifest
|-- .htaccess
|-- favicon.ico
|-- icons/
|   |-- icon-72x72.png
|   |-- icon-96x96.png
|   |-- icon-128x128.png
|   |-- icon-144x144.png
|   |-- icon-152x152.png
|   |-- icon-192x192.png
|   |-- icon-384x384.png
|   |-- icon-512x512.png
|-- screenshots/
|   |-- desktop-1.png
|   |-- mobile-1.png
```

## URL finale d'accès
`https://votredomaine.com/strandpro/`

## Support Hostinger
- Live chat 24/7
- Base de connaissances
- Tutoriels vidéo
- Support technique par ticket
