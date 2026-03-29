# Gestion de Commandes - Roulotte

Ce projet est une application web pour gérer les pré-commandes d'une roulotte. Elle permet aux clients de commander et au personnel de gérer les stocks.

## Étape 1 : Tester sur mon ordinateur (Local)

Pour voir le site et travailler dessus avant de le montrer au monde :

1. Ouvre un terminal dans le dossier du projet.
2. Installe les outils : `npm install`
3. Lance le serveur : `npm start`
4. Accède au site sur : `http://localhost:3000`

---

## Étape 2 : Mettre le site en ligne (Internet)

Pour que n'importe qui puisse commander avec son téléphone, il faut sortir le site de l'ordinateur.

### La méthode recommandée : **https://www.google.com/search?q=Render.com**

1. **Créer un compte GitHub** et y envoyer le dossier du projet.
2. **Créer un compte sur https://www.google.com/search?q=Render.com** et cliquer sur "New Web Service".
3. **Lier le projet GitHub** à Render.
4. **Paramètres à entrer :**
        - **Build Command :** `npm install`
        - **Start Command :** `npm start`


5. Une fois terminé, Render te donnera une adresse finit par `.onrender.com`. **C'est votre lien officiel !**

---

## Accès aux pages (Une fois en ligne)

| Utilisateur   | URL d'accès                                                        | Rôle                              |
| **Client**    | `https://ton-site.onrender.com/`                                   | Passer une commande.              |
| **Personnel** | `https://ton-site.onrender.com/staff-roulotte-personnel-2026.html` | Voir les commandes et les stocks. |

> [!CAUTION]
> **Sécurité :** Ne partagez jamais le lien "Personnel" aux clients. C'est là que se trouve la gestion des stocks.

---

## Fonctionnement technique

* **Serveur :** Node.js (gère les échanges entre client et personnel).
* **Base de données :** `orders.json` (sauvegarde les commandes).
* **Note importante :** Sur les hébergeurs gratuits comme Render, le fichier `orders.json` se remet à zéro si le serveur redémarre. Pour une utilisation réelle sur le long terme, il faudra envisager une base de données externe.
