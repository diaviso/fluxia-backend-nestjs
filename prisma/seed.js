// Utiliser le client Prisma généré
const { PrismaClient } = require('../generated/prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding des matières...');

  const matieres = [
    // INFORMATIQUE
    { code: 'INFO-001', designation: 'Ordinateur de bureau HP EliteDesk', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 450000, seuilAlerte: 5, actif: true },
    { code: 'INFO-002', designation: 'Ordinateur portable Dell Latitude', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 550000, seuilAlerte: 3, actif: true },
    { code: 'INFO-003', designation: 'Imprimante laser HP LaserJet Pro', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 180000, seuilAlerte: 2, actif: true },
    { code: 'INFO-004', designation: 'Imprimante multifonction Canon', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 250000, seuilAlerte: 2, actif: true },
    { code: 'INFO-005', designation: 'Scanner de documents Epson', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 120000, seuilAlerte: 1, actif: true },
    { code: 'INFO-006', designation: 'Écran LCD 24 pouces Dell', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 5, actif: true },
    { code: 'INFO-007', designation: 'Clavier sans fil Logitech', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 8500, seuilAlerte: 10, actif: true },
    { code: 'INFO-008', designation: 'Souris optique sans fil', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 15, actif: true },
    { code: 'INFO-009', designation: 'Disque dur externe 2TB', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 5, actif: true },
    { code: 'INFO-010', designation: 'Clé USB 64GB', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 8000, seuilAlerte: 20, actif: true },
    { code: 'INFO-011', designation: 'Câble HDMI 2 mètres', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'INFO-012', designation: 'Multiprise parafoudre 6 prises', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 12000, seuilAlerte: 8, actif: true },
    { code: 'INFO-013', designation: 'Cartouche d\'encre HP noir', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 15, actif: true },
    { code: 'INFO-014', designation: 'Cartouche d\'encre HP couleur', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 42000, seuilAlerte: 15, actif: true },
    { code: 'INFO-015', designation: 'Toner laser HP noir', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 55000, seuilAlerte: 10, actif: true },
    { code: 'INFO-016', designation: 'Câble réseau RJ45 Cat6 - 5m', type: 'CONSOMMABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 20, actif: true },
    { code: 'INFO-017', designation: 'Switch réseau 24 ports', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 180000, seuilAlerte: 2, actif: true },
    { code: 'INFO-018', designation: 'Routeur WiFi TP-Link', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 3, actif: true },
    { code: 'INFO-019', designation: 'Onduleur 1000VA', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 95000, seuilAlerte: 5, actif: true },
    { code: 'INFO-020', designation: 'Webcam HD Logitech', type: 'DURABLE', categorie: 'INFORMATIQUE', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 5, actif: true },

    // MOBILIER
    { code: 'MOB-001', designation: 'Bureau métallique 1m60', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 125000, seuilAlerte: 5, actif: true },
    { code: 'MOB-002', designation: 'Bureau en bois massif 1m80', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 180000, seuilAlerte: 3, actif: true },
    { code: 'MOB-003', designation: 'Chaise de bureau ergonomique', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 65000, seuilAlerte: 10, actif: true },
    { code: 'MOB-004', designation: 'Fauteuil directeur en cuir', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 150000, seuilAlerte: 3, actif: true },
    { code: 'MOB-005', designation: 'Armoire métallique 2 portes', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 95000, seuilAlerte: 5, actif: true },
    { code: 'MOB-006', designation: 'Étagère bibliothèque 5 niveaux', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 75000, seuilAlerte: 5, actif: true },
    { code: 'MOB-007', designation: 'Table de réunion 8 places', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 280000, seuilAlerte: 2, actif: true },
    { code: 'MOB-008', designation: 'Chaise visiteur rembourrée', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 15, actif: true },
    { code: 'MOB-009', designation: 'Classeur à tiroirs 4 niveaux', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 3, actif: true },
    { code: 'MOB-010', designation: 'Porte-manteau sur pied', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },
    { code: 'MOB-011', designation: 'Tableau blanc magnétique 120x90', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 3, actif: true },
    { code: 'MOB-012', designation: 'Corbeille à papier métallique', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 8500, seuilAlerte: 20, actif: true },
    { code: 'MOB-013', designation: 'Caisson mobile 3 tiroirs', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 55000, seuilAlerte: 5, actif: true },
    { code: 'MOB-014', designation: 'Présentoir à magazines', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 3, actif: true },
    { code: 'MOB-015', designation: 'Banc d\'attente 3 places', type: 'DURABLE', categorie: 'MOBILIER', unite: 'PIECE', valeurUnitaire: 120000, seuilAlerte: 3, actif: true },

    // PAPETERIE
    { code: 'FOUR-001', designation: 'Ramette papier A4 80g (500 feuilles)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 50, actif: true },
    { code: 'FOUR-002', designation: 'Ramette papier A3 80g (500 feuilles)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 6500, seuilAlerte: 20, actif: true },
    { code: 'FOUR-003', designation: 'Stylo à bille bleu', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 2500, seuilAlerte: 30, actif: true },
    { code: 'FOUR-004', designation: 'Stylo à bille rouge', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 2500, seuilAlerte: 20, actif: true },
    { code: 'FOUR-005', designation: 'Stylo à bille noir', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 2500, seuilAlerte: 30, actif: true },
    { code: 'FOUR-006', designation: 'Crayon à papier HB', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 1800, seuilAlerte: 20, actif: true },
    { code: 'FOUR-007', designation: 'Gomme blanche', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 200, seuilAlerte: 50, actif: true },
    { code: 'FOUR-008', designation: 'Taille-crayon métallique', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 300, seuilAlerte: 30, actif: true },
    { code: 'FOUR-009', designation: 'Règle plastique 30cm', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 500, seuilAlerte: 30, actif: true },
    { code: 'FOUR-010', designation: 'Agrafeuse de bureau', type: 'DURABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'FOUR-011', designation: 'Boîte d\'agrafes 26/6 (5000 pcs)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 1200, seuilAlerte: 30, actif: true },
    { code: 'FOUR-012', designation: 'Perforatrice 2 trous', type: 'DURABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 8, actif: true },
    { code: 'FOUR-013', designation: 'Classeur à levier dos 8cm', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 2800, seuilAlerte: 40, actif: true },
    { code: 'FOUR-014', designation: 'Chemise à rabat cartonnée', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 30, actif: true },
    { code: 'FOUR-015', designation: 'Pochette plastique perforée A4', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 2500, seuilAlerte: 40, actif: true },
    { code: 'FOUR-016', designation: 'Cahier 200 pages grand format', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 50, actif: true },
    { code: 'FOUR-017', designation: 'Bloc-notes A4 100 feuilles', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 1200, seuilAlerte: 40, actif: true },
    { code: 'FOUR-018', designation: 'Post-it jaune 76x76mm', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 1800, seuilAlerte: 30, actif: true },
    { code: 'FOUR-019', designation: 'Marqueur permanent noir', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 800, seuilAlerte: 30, actif: true },
    { code: 'FOUR-020', designation: 'Marqueur tableau blanc', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 1200, seuilAlerte: 20, actif: true },
    { code: 'FOUR-021', designation: 'Surligneur jaune fluo', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 600, seuilAlerte: 30, actif: true },
    { code: 'FOUR-022', designation: 'Correcteur liquide blanc', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 800, seuilAlerte: 25, actif: true },
    { code: 'FOUR-023', designation: 'Ciseaux de bureau', type: 'DURABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 15, actif: true },
    { code: 'FOUR-024', designation: 'Cutter professionnel', type: 'DURABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 2000, seuilAlerte: 10, actif: true },
    { code: 'FOUR-025', designation: 'Colle liquide 250ml', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 20, actif: true },
    { code: 'FOUR-026', designation: 'Ruban adhésif transparent', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PIECE', valeurUnitaire: 800, seuilAlerte: 30, actif: true },
    { code: 'FOUR-027', designation: 'Trombones 50mm (boîte 100)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 600, seuilAlerte: 25, actif: true },
    { code: 'FOUR-028', designation: 'Pinces à dessin 32mm', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 1200, seuilAlerte: 20, actif: true },
    { code: 'FOUR-029', designation: 'Élastiques assortis (boîte)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'BOITE', valeurUnitaire: 800, seuilAlerte: 15, actif: true },
    { code: 'FOUR-030', designation: 'Enveloppes C4 kraft (paquet 50)', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 20, actif: true },

    // PRODUITS D'ENTRETIEN
    { code: 'ENT-001', designation: 'Eau de javel 5L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 2500, seuilAlerte: 30, actif: true },
    { code: 'ENT-002', designation: 'Détergent liquide vaisselle 5L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 4500, seuilAlerte: 25, actif: true },
    { code: 'ENT-003', designation: 'Savon liquide mains 5L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 5500, seuilAlerte: 20, actif: true },
    { code: 'ENT-004', designation: 'Désinfectant sol 5L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 6500, seuilAlerte: 20, actif: true },
    { code: 'ENT-005', designation: 'Nettoyant vitres 750ml', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 15, actif: true },
    { code: 'ENT-006', designation: 'Désodorisant spray 400ml', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 2000, seuilAlerte: 20, actif: true },
    { code: 'ENT-007', designation: 'Sac poubelle 100L (rouleau 10)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 30, actif: true },
    { code: 'ENT-008', designation: 'Sac poubelle 50L (rouleau 20)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PAQUET', valeurUnitaire: 3000, seuilAlerte: 30, actif: true },
    { code: 'ENT-009', designation: 'Balai en plastique', type: 'DURABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'ENT-010', designation: 'Serpillière microfibre', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 15, actif: true },
    { code: 'ENT-011', designation: 'Seau plastique 10L', type: 'DURABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 2000, seuilAlerte: 10, actif: true },
    { code: 'ENT-012', designation: 'Pelle à poussière métallique', type: 'DURABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 8, actif: true },
    { code: 'ENT-013', designation: 'Gants de ménage (paire)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 20, actif: true },
    { code: 'ENT-014', designation: 'Éponge grattante (paquet 5)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PAQUET', valeurUnitaire: 1200, seuilAlerte: 25, actif: true },
    { code: 'ENT-015', designation: 'Chiffon microfibre (paquet 5)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 15, actif: true },
    { code: 'ENT-016', designation: 'Papier toilette 2 plis (paquet 12)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PAQUET', valeurUnitaire: 4500, seuilAlerte: 40, actif: true },
    { code: 'ENT-017', designation: 'Essuie-mains papier (carton 20)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'CARTON', valeurUnitaire: 18000, seuilAlerte: 15, actif: true },
    { code: 'ENT-018', designation: 'Savon en pain (carton 72)', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'CARTON', valeurUnitaire: 12000, seuilAlerte: 10, actif: true },
    { code: 'ENT-019', designation: 'Insecticide spray 400ml', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'ENT-020', designation: 'Désinfectant mains gel 500ml', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 20, actif: true },

    // ÉQUIPEMENTS
    { code: 'EQUIP-001', designation: 'Climatiseur split 12000 BTU', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 350000, seuilAlerte: 2, actif: true },
    { code: 'EQUIP-002', designation: 'Ventilateur sur pied', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },
    { code: 'EQUIP-003', designation: 'Réfrigérateur 200L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 280000, seuilAlerte: 2, actif: true },
    { code: 'EQUIP-004', designation: 'Micro-ondes 25L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 65000, seuilAlerte: 3, actif: true },
    { code: 'EQUIP-005', designation: 'Bouilloire électrique 2L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 15000, seuilAlerte: 5, actif: true },
    { code: 'EQUIP-006', designation: 'Fontaine à eau', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 2, actif: true },
    { code: 'EQUIP-007', designation: 'Téléphone fixe de bureau', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },
    { code: 'EQUIP-008', designation: 'Calculatrice de bureau', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 8500, seuilAlerte: 10, actif: true },
    { code: 'EQUIP-009', designation: 'Lampe de bureau LED', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 12000, seuilAlerte: 8, actif: true },
    { code: 'EQUIP-010', designation: 'Horloge murale', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 8000, seuilAlerte: 5, actif: true },
    { code: 'EQUIP-011', designation: 'Extincteur 6kg poudre', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 10, actif: true },
    { code: 'EQUIP-012', designation: 'Trousse de premiers secours', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 15000, seuilAlerte: 5, actif: true },
    { code: 'EQUIP-013', designation: 'Projecteur multimédia', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 280000, seuilAlerte: 2, actif: true },
    { code: 'EQUIP-014', designation: 'Écran de projection 200x200', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 95000, seuilAlerte: 2, actif: true },
    { code: 'EQUIP-015', designation: 'Système audio portable', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 120000, seuilAlerte: 2, actif: true },

    // MATÉRIEL MÉDICAL
    { code: 'MED-001', designation: 'Thermomètre digital', type: 'DURABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 8500, seuilAlerte: 5, actif: true },
    { code: 'MED-002', designation: 'Tensiomètre électronique', type: 'DURABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 2, actif: true },
    { code: 'MED-003', designation: 'Stéthoscope', type: 'DURABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 2, actif: true },
    { code: 'MED-004', designation: 'Compresses stériles (boîte 100)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 5500, seuilAlerte: 10, actif: true },
    { code: 'MED-005', designation: 'Pansements adhésifs assortis', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 3500, seuilAlerte: 15, actif: true },
    { code: 'MED-006', designation: 'Gants latex (boîte 100)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 8500, seuilAlerte: 20, actif: true },
    { code: 'MED-007', designation: 'Alcool médical 70° (1L)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'LITRE', valeurUnitaire: 4500, seuilAlerte: 10, actif: true },
    { code: 'MED-008', designation: 'Coton hydrophile 500g', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PAQUET', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'MED-009', designation: 'Bande élastique 10cm', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 15, actif: true },
    { code: 'MED-010', designation: 'Sparadrap 5m', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 20, actif: true },
    { code: 'MED-011', designation: 'Masques chirurgicaux (boîte 50)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 5500, seuilAlerte: 20, actif: true },
    { code: 'MED-012', designation: 'Solution hydroalcoolique 500ml', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 15, actif: true },
    { code: 'MED-013', designation: 'Paracétamol 500mg (boîte 100)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 3500, seuilAlerte: 10, actif: true },
    { code: 'MED-014', designation: 'Sérum physiologique (boîte 40)', type: 'CONSOMMABLE', categorie: 'MATERIEL_MEDICAL', unite: 'BOITE', valeurUnitaire: 4500, seuilAlerte: 10, actif: true },
    { code: 'MED-015', designation: 'Ciseaux médicaux', type: 'DURABLE', categorie: 'MATERIEL_MEDICAL', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 3, actif: true },

    // VÉHICULES
    { code: 'VEH-001', designation: 'Véhicule utilitaire 7 places', type: 'DURABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 12000000, seuilAlerte: 1, actif: true },
    { code: 'VEH-002', designation: 'Motocyclette 125cc', type: 'DURABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 850000, seuilAlerte: 1, actif: true },
    { code: 'VEH-003', designation: 'Huile moteur 5W30 (5L)', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'LITRE', valeurUnitaire: 25000, seuilAlerte: 10, actif: true },
    { code: 'VEH-004', designation: 'Filtre à huile', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 5, actif: true },
    { code: 'VEH-005', designation: 'Filtre à air', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 5, actif: true },
    { code: 'VEH-006', designation: 'Batterie 12V 70Ah', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 65000, seuilAlerte: 3, actif: true },
    { code: 'VEH-007', designation: 'Pneu 195/65 R15', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 8, actif: true },
    { code: 'VEH-008', designation: 'Liquide de frein DOT4 (1L)', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'LITRE', valeurUnitaire: 8500, seuilAlerte: 5, actif: true },
    { code: 'VEH-009', designation: 'Liquide de refroidissement (5L)', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'LITRE', valeurUnitaire: 12000, seuilAlerte: 5, actif: true },
    { code: 'VEH-010', designation: 'Balai d\'essuie-glace', type: 'CONSOMMABLE', categorie: 'VEHICULE', unite: 'PIECE', valeurUnitaire: 5500, seuilAlerte: 5, actif: true },

    // AUTRES
    { code: 'AUT-001', designation: 'Groupe électrogène 10KVA', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 1500000, seuilAlerte: 1, actif: true },
    { code: 'AUT-002', designation: 'Panneau solaire 250W', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 180000, seuilAlerte: 3, actif: true },
    { code: 'AUT-003', designation: 'Batterie solaire 200Ah', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 250000, seuilAlerte: 2, actif: true },
    { code: 'AUT-004', designation: 'Onduleur solaire 3000W', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 450000, seuilAlerte: 2, actif: true },
    { code: 'AUT-005', designation: 'Caméra de surveillance IP', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 5, actif: true },
    { code: 'AUT-006', designation: 'Enregistreur DVR 8 canaux', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 120000, seuilAlerte: 2, actif: true },
    { code: 'AUT-007', designation: 'Câble électrique 2.5mm² (rouleau)', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'METRE', valeurUnitaire: 800, seuilAlerte: 100, actif: true },
    { code: 'AUT-008', designation: 'Interrupteur simple', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 1500, seuilAlerte: 20, actif: true },
    { code: 'AUT-009', designation: 'Prise électrique murale', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 2000, seuilAlerte: 20, actif: true },
    { code: 'AUT-010', designation: 'Ampoule LED 15W', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 30, actif: true },
    { code: 'AUT-011', designation: 'Néon LED 18W 120cm', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 5500, seuilAlerte: 20, actif: true },
    { code: 'AUT-012', designation: 'Rallonge électrique 10m', type: 'CONSOMMABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 8500, seuilAlerte: 10, actif: true },
    { code: 'AUT-013', designation: 'Cadenas de sécurité 50mm', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 10, actif: true },
    { code: 'AUT-014', designation: 'Chaîne antivol 1.5m', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 12000, seuilAlerte: 5, actif: true },
    { code: 'AUT-015', designation: 'Porte-documents en cuir', type: 'DURABLE', categorie: 'AUTRE', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },

    // CUISINE
    { code: 'CUIS-001', designation: 'Gazinière 4 feux industrielle', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 450000, seuilAlerte: 2, actif: true },
    { code: 'CUIS-002', designation: 'Réfrigérateur professionnel 600L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 850000, seuilAlerte: 1, actif: true },
    { code: 'CUIS-003', designation: 'Congélateur coffre 400L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 550000, seuilAlerte: 1, actif: true },
    { code: 'CUIS-004', designation: 'Marmite aluminium 50L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 5, actif: true },
    { code: 'CUIS-005', designation: 'Marmite aluminium 100L', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 3, actif: true },
    { code: 'CUIS-006', designation: 'Assiettes plates (lot 50)', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'LOT', valeurUnitaire: 35000, seuilAlerte: 5, actif: true },
    { code: 'CUIS-007', designation: 'Assiettes creuses (lot 50)', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'LOT', valeurUnitaire: 35000, seuilAlerte: 5, actif: true },
    { code: 'CUIS-008', designation: 'Verres à eau (lot 50)', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'LOT', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },
    { code: 'CUIS-009', designation: 'Couverts inox (lot 100 pièces)', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'LOT', valeurUnitaire: 55000, seuilAlerte: 3, actif: true },
    { code: 'CUIS-010', designation: 'Plateau de service', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 30, actif: true },

    // SPORT
    { code: 'SPORT-001', designation: 'Ballon de football', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 15000, seuilAlerte: 10, actif: true },
    { code: 'SPORT-002', designation: 'Ballon de basketball', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 18000, seuilAlerte: 5, actif: true },
    { code: 'SPORT-003', designation: 'Ballon de volleyball', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 16000, seuilAlerte: 5, actif: true },
    { code: 'SPORT-004', designation: 'Filet de volleyball', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 35000, seuilAlerte: 2, actif: true },
    { code: 'SPORT-005', designation: 'Tapis de gymnastique', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 25000, seuilAlerte: 5, actif: true },
    { code: 'SPORT-006', designation: 'Corde à sauter', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 2500, seuilAlerte: 15, actif: true },
    { code: 'SPORT-007', designation: 'Sifflet d\'arbitre', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 3500, seuilAlerte: 5, actif: true },
    { code: 'SPORT-008', designation: 'Chronomètre digital', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 12000, seuilAlerte: 3, actif: true },
    { code: 'SPORT-009', designation: 'Chasubles d\'entraînement (lot 10)', type: 'CONSOMMABLE', categorie: 'EQUIPEMENT', unite: 'LOT', valeurUnitaire: 25000, seuilAlerte: 3, actif: true },
    { code: 'SPORT-010', designation: 'Pompe à ballon', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 5, actif: true },
  ];

  let count = 0;
  for (const matiere of matieres) {
    try {
      await prisma.matiere.create({
        data: matiere,
      });
      count++;
      if (count % 20 === 0) {
        console.log(`✅ ${count} matières insérées...`);
      }
    } catch (error) {
      console.error(`❌ Erreur pour ${matiere.code}:`, error.message);
    }
  }

  console.log(`\n🎉 Seeding terminé ! ${count} matières insérées sur ${matieres.length}`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
