# Fonctionnalité DMP (Dossier Médical Partagé)

## Vue d'ensemble

Cette fonctionnalité permet aux médecins de demander l'autorisation d'accéder au Dossier Médical Partagé (DMP) de leurs patients lors des consultations. Le système gère le cycle complet de la demande, de l'envoi à la réponse du patient.

## Fonctionnalités principales

### 1. Demande d'accès DMP
- **Bouton dans l'agenda** : Les médecins peuvent demander l'accès DMP directement depuis leur planning
- **Bouton dans la gestion des patients** : Accès rapide depuis la liste des patients
- **Bouton dans les détails du patient** : Demande contextuelle lors de la consultation
- **Actions rapides** : Accès depuis le dashboard principal

### 2. Gestion des demandes
- **Écran dédié** : Interface complète pour gérer toutes les demandes DMP
- **Filtrage par statut** : Toutes, En attente, Approuvées, Refusées
- **Actions contextuelles** : Annuler, Renvoyer selon le statut
- **Historique complet** : Suivi de toutes les demandes

### 3. Statuts des demandes
- **En attente** : Demande envoyée, en attente de réponse du patient
- **Approuvée** : Le patient a accepté l'accès
- **Refusée** : Le patient a refusé l'accès
- **Expirée** : La demande a expiré (non répondue dans les délais)

## Architecture technique

### Composants créés

#### 1. `DMPRequestButton` (`app/components/DMPRequestButton.js`)
Composant réutilisable pour les boutons de demande DMP.

**Props :**
- `patientName` : Nom du patient
- `patientId` : ID du patient
- `style` : Styles personnalisés
- `textStyle` : Styles du texte
- `iconSize` : Taille de l'icône (défaut: 16)
- `showText` : Afficher le texte (défaut: true)
- `onRequestSent` : Callback après envoi

#### 2. `dmpService` (`app/services/dmpService.js`)
Service centralisé pour gérer les demandes DMP.

**Méthodes principales :**
- `requestDMPAccess(doctorId, patientId, reason, consultationId)` : Envoyer une demande
- `checkRequestStatus(requestId)` : Vérifier le statut d'une demande
- `getDoctorRequests(doctorId)` : Obtenir l'historique des demandes
- `cancelRequest(requestId)` : Annuler une demande
- `sendNotification(patientId, message)` : Envoyer une notification

#### 3. `DMPManagement` (`app/screens/DMPManagement/index.js`)
Écran complet de gestion des demandes DMP.

**Fonctionnalités :**
- Liste des demandes avec filtrage
- Détails complets de chaque demande
- Actions contextuelles (annuler, renvoyer)
- Interface responsive et intuitive

### Intégrations

#### Dashboard du médecin (`app/screens/DoctorDashboard/index.js`)
- Bouton "Gestion DMP" dans les actions rapides
- Bouton DMP dans chaque élément de l'agenda
- Navigation vers l'écran de gestion

#### Gestion des patients (`app/screens/PatientManagement/index.js`)
- Bouton DMP dans les actions rapides de chaque patient
- Bouton "Demander DMP" dans les détails du patient
- Intégration avec le service DMP

## Flux utilisateur

### 1. Demande d'accès DMP
```
Médecin → Sélectionne un patient → Clique sur "Demander DMP" → 
Confirme la demande → Demande envoyée au patient → 
Notification envoyée au patient
```

### 2. Réponse du patient
```
Patient → Reçoit notification → Ouvre l'app → 
Voit la demande DMP → Accepte/Refuse → 
Médecin reçoit notification de la réponse
```

### 3. Gestion des demandes
```
Médecin → Accède à "Gestion DMP" → 
Voit toutes ses demandes → Filtre par statut → 
Effectue des actions (annuler, renvoyer)
```

## Configuration et personnalisation

### Couleurs et thème
Les couleurs sont cohérentes avec le système de thème de l'application :
- **Bleu (#2196F3)** : Couleur principale pour les boutons DMP
- **Orange (#FF9800)** : Statut "En attente"
- **Vert (#4CAF50)** : Statut "Approuvée"
- **Rouge (#F44336)** : Statut "Refusée"
- **Gris (#9E9E9E)** : Statut "Expirée"

### Messages et textes
Tous les textes sont en français et peuvent être facilement internationalisés :
- Messages de confirmation
- Labels des boutons
- Textes d'erreur
- Descriptions des statuts

## Sécurité et confidentialité

### Gestion des autorisations
- Chaque demande nécessite l'autorisation explicite du patient
- Les demandes expirent automatiquement après un délai défini
- Les médecins ne peuvent voir que leurs propres demandes
- Traçabilité complète des accès

### Conformité RGPD
- Consentement explicite du patient requis
- Droit de retrait à tout moment
- Limitation de la durée de conservation
- Transparence sur l'utilisation des données

## API et intégration backend

### Endpoints nécessaires
```javascript
// Envoyer une demande DMP
POST /api/dmp/request
{
  doctorId: string,
  patientId: string,
  reason: string,
  consultationId?: string
}

// Vérifier le statut d'une demande
GET /api/dmp/status/:requestId

// Obtenir l'historique des demandes
GET /api/dmp/doctor/:doctorId/requests

// Annuler une demande
PUT /api/dmp/cancel/:requestId

// Envoyer une notification
POST /api/notifications/send
{
  patientId: string,
  message: string,
  type: 'dmp_request'
}
```

### Structure de données
```javascript
// Demande DMP
{
  id: string,
  doctorId: string,
  patientId: string,
  reason: string,
  consultationId?: string,
  status: 'pending' | 'approved' | 'rejected' | 'expired',
  requestDate: string,
  responseDate?: string,
  urgency: 'normal' | 'urgent'
}
```

## Tests et validation

### Tests unitaires recommandés
- Validation des props du composant DMPRequestButton
- Tests des méthodes du service dmpService
- Validation des états de l'écran DMPManagement

### Tests d'intégration
- Flux complet de demande DMP
- Intégration avec le système de notifications
- Gestion des erreurs réseau

## Déploiement et maintenance

### Variables d'environnement
```bash
# URL de l'API DMP
DMP_API_URL=https://api.medlink.fr/dmp

# Délai d'expiration des demandes (en heures)
DMP_REQUEST_EXPIRY_HOURS=72

# URL des notifications
NOTIFICATION_API_URL=https://api.medlink.fr/notifications
```

### Monitoring
- Suivi des demandes DMP envoyées
- Taux de réponse des patients
- Temps de réponse moyen
- Erreurs d'envoi de notifications

## Évolutions futures

### Fonctionnalités prévues
1. **Demandes groupées** : Demander l'accès DMP pour plusieurs patients
2. **Templates de raisons** : Raisons prédéfinies pour les demandes
3. **Notifications push** : Notifications en temps réel
4. **Intégration DMP réelle** : Connexion avec le vrai système DMP français
5. **Rapports et statistiques** : Analytics sur l'utilisation des demandes DMP

### Améliorations UX
1. **Interface drag & drop** : Réorganisation des demandes
2. **Recherche avancée** : Filtrage par date, patient, raison
3. **Export des données** : Export CSV/PDF des demandes
4. **Mode hors ligne** : Gestion des demandes sans connexion

## Support et documentation

### Contact
Pour toute question sur cette fonctionnalité, contactez l'équipe de développement.

### Documentation technique
- [Guide d'intégration API](./API_INTEGRATION.md)
- [Guide de déploiement](./DEPLOYMENT.md)
- [Guide de sécurité](./SECURITY.md) 