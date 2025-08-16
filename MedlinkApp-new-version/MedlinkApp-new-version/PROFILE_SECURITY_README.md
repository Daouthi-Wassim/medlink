# Sécurité des Profils Médecins - Documentation

## Vue d'ensemble

Le système de sécurité des profils médecins implémente un contrôle d'accès granulaire basé sur les rôles utilisateur. Chaque type d'utilisateur voit une version différente du même profil, garantissant la protection des informations sensibles tout en permettant l'accès aux données nécessaires.

## Niveaux d'Accès

### 1. Vue Propriétaire (OWN)
**Accès complet** - Le médecin voit son propre profil
- ✅ Toutes les informations personnelles
- ✅ Coordonnées complètes (email, téléphone)
- ✅ Informations financières (frais de consultation)
- ✅ Numéro RPPS complet
- ✅ Formation et certifications complètes
- ✅ Types de consultation détaillés
- ✅ Informations d'assurance
- ✅ Actions de gestion (édition, déconnexion)

### 2. Vue Médecin (DOCTOR)
**Accès professionnel** - Un autre médecin consulte le profil
- ✅ Informations professionnelles complètes
- ✅ Formation et certifications complètes
- ✅ Types de consultation détaillés
- ✅ Informations d'assurance
- 🔒 Email masqué (ex: `d****n@medlink.fr`)
- 🔒 Téléphone masqué (ex: `****5678`)
- 🔒 RPPS masqué (ex: `****8901`)
- 🔒 Frais de consultation cachés
- ✅ Actions de contact

### 3. Vue Patient (PATIENT)
**Accès patient** - Un patient consulte le profil du médecin
- ✅ Informations essentielles pour la prise de RDV
- ✅ Frais de consultation (nécessaire pour le patient)
- ✅ Formation (2 premiers éléments)
- ✅ Certifications (3 premières)
- ✅ Types de consultation
- ✅ Informations d'assurance
- 🔒 Email masqué
- 🔒 Téléphone masqué
- 🔒 RPPS caché
- ✅ Actions de prise de RDV et contact

### 4. Vue Publique (PUBLIC)
**Accès limité** - Vue publique pour la confidentialité maximale
- ✅ Informations de base (nom, spécialité, expérience)
- ✅ Formation (1er élément seulement)
- ✅ Certifications (2 premières)
- 🔒 Email caché
- 🔒 Téléphone caché
- 🔒 RPPS caché
- 🔒 Frais de consultation cachés
- 🔒 Types de consultation cachés
- 🔒 Informations d'assurance cachées
- 🔒 Actions cachées

## Architecture Technique

### Service de Sécurité (`profileSecurityService.js`)

```javascript
class ProfileSecurityService {
  // Détermine le niveau d'accès
  getAccessLevel(viewerRole, profileOwnerRole, isOwnProfile, viewerId, profileOwnerId)
  
  // Filtre les données selon le niveau d'accès
  getFilteredProfileData(fullProfileData, accessLevel)
  
  // Masque les informations sensibles
  maskEmail(email)
  maskPhone(phone)
  maskRPPS(rpps)
  
  // Vérifie les permissions
  hasPermission(accessLevel, informationType)
}
```

### Fonctions de Masquage

- **Email**: `d****n@medlink.fr` (première et dernière lettre visibles)
- **Téléphone**: `****5678` (4 derniers chiffres visibles)
- **RPPS**: `****8901` (4 derniers chiffres visibles)

## Utilisation

### Navigation vers le Profil

```javascript
// Vue propriétaire
navigation.navigate('DoctorProfile', {
  isOwnProfile: true,
  userRole: 'doctor',
  viewerId: '1',
  doctorId: '1'
});

// Vue médecin
navigation.navigate('DoctorProfile', {
  isOwnProfile: false,
  userRole: 'doctor',
  viewerId: '2',
  doctorId: '1'
});

// Vue patient
navigation.navigate('DoctorProfile', {
  isOwnProfile: false,
  userRole: 'patient',
  viewerId: '3',
  doctorId: '1'
});

// Vue publique
navigation.navigate('DoctorProfile', {
  isOwnProfile: false,
  userRole: 'public',
  viewerId: '4',
  doctorId: '1'
});
```

### Démo Interactive

Utilisez l'écran `DoctorProfileSecurityDemo` pour tester les différents niveaux d'accès :

```javascript
navigation.navigate('DoctorProfileSecurityDemo');
```

## Indicateurs Visuels

Chaque vue affiche un indicateur de sécurité en haut de l'écran :

- **Vue Propriétaire**: 🛡️ "Vue complète - Toutes les informations sont visibles"
- **Vue Médecin**: 🛡️ "Vue médecin - Informations professionnelles complètes, données personnelles masquées"
- **Vue Patient**: 🛡️ "Vue patient - Informations essentielles pour la prise de rendez-vous"
- **Vue Publique**: 🛡️ "Vue publique - Informations limitées pour la confidentialité"

## Sécurité et Conformité

### Protection des Données
- Masquage automatique des informations sensibles
- Contrôle d'accès basé sur les rôles
- Respect du principe du moindre privilège
- Indicateurs visuels de niveau de sécurité

### Conformité RGPD
- Minimisation des données (seules les données nécessaires sont affichées)
- Limitation de finalité (accès selon le rôle)
- Intégrité et confidentialité des données

## Configuration

### Ajout de Nouveaux Niveaux d'Accès

1. Ajouter le nouveau niveau dans `profileSecurityService.js` :
```javascript
this.accessLevels.NEW_LEVEL = 'new_level';
```

2. Créer la fonction de filtrage correspondante :
```javascript
getNewLevelViewData(fullProfileData) {
  return {
    ...fullProfileData,
    // Configuration spécifique
  };
}
```

3. Ajouter la logique dans `getAccessLevel()` et `getFilteredProfileData()`

### Personnalisation des Masquages

Modifiez les fonctions de masquage dans `profileSecurityService.js` :

```javascript
maskEmail(email) {
  // Logique de masquage personnalisée
}

maskPhone(phone) {
  // Logique de masquage personnalisée
}
```

## Tests

### Tests Manuels
1. Naviguez vers `DoctorProfileSecurityDemo`
2. Testez chaque niveau d'accès
3. Vérifiez que les informations appropriées sont masquées/affichées
4. Confirmez que les indicateurs de sécurité sont corrects

### Tests Automatisés (à implémenter)
```javascript
// Exemple de test unitaire
test('should mask email for doctor view', () => {
  const maskedEmail = profileSecurityService.maskEmail('doctor@medlink.fr');
  expect(maskedEmail).toBe('d****r@medlink.fr');
});
```

## Évolutions Futures

### Fonctionnalités Prévues
- [ ] Audit trail des accès aux profils
- [ ] Notifications de consultation de profil
- [ ] Gestion des permissions granulaires
- [ ] Intégration avec un système d'authentification avancé
- [ ] Chiffrement des données sensibles

### Améliorations Techniques
- [ ] Cache des données filtrées
- [ ] Optimisation des performances
- [ ] Tests automatisés complets
- [ ] Documentation API

## Support

Pour toute question ou problème lié à la sécurité des profils, consultez :
- La documentation technique
- Les logs d'audit
- L'équipe de développement 