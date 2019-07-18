### Prérequis (Certains composants peuvent être directement disponibles depuis le centre de téléchargement de Windows 10)

- Installer **Git** : https://gitforwindows.org/
- Installer **Ruby** *(Nécessaire pour compiler les fichiers .scss -> .css)* : https://rubyinstaller.org/downloads/
- Installer **NodeJS** : https://nodejs.org/en/download/
- Installer **Visual Studio Code** : https://code.visualstudio.com/download
  - Installer les composants de développement JAVA *(Nécessaire pour lancer l'application)*
- Installer **MongoDB** : https://www.mongodb.com/download-center/community
  - Si vous souhaitez visualiser les données dans la base, il vous faudra MongoDB Compass Community. L'installateur précédent peut l'installer automatiquement, vérifiez que la case est cochée lors de l'installation de MongoDB.
- Installer l'extension Chrome **"Advanced Rest Client"** pour appeler vos services REST directement : https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo?hl=fr

### Préparation de l'environnement de développement

Se placer dans le dossier où vous souhaitez travailler et ouvrir la console Git (Clic-droit : "Git Bash Here")
  - Cloner le dossier de travail avec la commande : ```git clone <URL>```
  - Se déplacer dans le dossier projet nouvellement créé "Trombinoscope" et lancer la commande : ```npm install```
  - Puis la commande : ```npm run build```
  - Et enfin, vérifier que ça fonctionne avec ```npm start```

### Ouvrir Visual Studio Code

  - Importer le projet
  - Ouvrir le fichier TrombinoscopeApplication.java et appuyer sur le petit bouton "Run" au dessus de la méthode ```main```
  *(S'il n'apparaît pas c'est que les composants JAVA n'ont pas été installés. L'IDE devrait les proposer automatiquement normalement)*
    - Vérifier que l'application démarre sans erreurs.
  - Allez sur l'onglet "Terminal" et lancez la commande suivante : 
    ```sass --watch src\main\resources\static\css\main.scss:src\main\resources\static\css\main.css```
    Cette ligne de commande va compiler votre fichier main.scss et le transformer en un fichier main.css. Le fichier main.scss importe tous vos fichiers .scss. Le fichier main.css généré est utilisé par l'application.
    La commande tourne en tâche de fond et chaque fois que vous modifiez un fichier .scss il recompile automatiquement vous permettant de visualiser vos changements directement sur l'application après avoir ctrl + F5
    
### Accéder à l'application

  - Ouvrir un navigateur et se connecter à l'adresse : http://localhost:8080
  Vous devriez arriver sur une page avec seulement une barre de menu et un bouton en bas de page.
  
### Charger les données dans la base

  - L'application possède un dossier SQL qui contient un script d'initialisation. Ce script charge la base avec des données statiques *(Postes, clients, compétences ...)*
  
