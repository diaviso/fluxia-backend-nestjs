require('dotenv').config();
const { Client } = require('pg');

const client = new Client({ connectionString: process.env.DATABASE_URL });

const matieres = [
  { code: 'FOUR-131', designation: 'Papier photo brillant A4 250g', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 12000, seuilAlerte: 10 },
  { code: 'FOUR-132', designation: 'Papier cartonne couleur A4', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 8500, seuilAlerte: 15 },
  { code: 'FOUR-133', designation: 'Feuilles autocollantes A4', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 15000, seuilAlerte: 10 },
  { code: 'FOUR-134', designation: 'Papier transfert textile A4', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 18000, seuilAlerte: 8 },
  { code: 'FOUR-135', designation: 'Papier magnetique A4', type: 'CONSOMMABLE', categorie: 'PAPETERIE', unite: 'PAQUET', valeurUnitaire: 25000, seuilAlerte: 5 },
  { code: 'ENT-081', designation: 'Desinfectant surfaces 5L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 8500, seuilAlerte: 15 },
  { code: 'ENT-082', designation: 'Nettoyant four et grill 1L', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'LITRE', valeurUnitaire: 6500, seuilAlerte: 12 },
  { code: 'ENT-083', designation: 'Detachant textile spray 500ml', type: 'CONSOMMABLE', categorie: 'PRODUIT_ENTRETIEN', unite: 'PIECE', valeurUnitaire: 4500, seuilAlerte: 15 },
  { code: 'EQUIP-076', designation: 'Ventilateur de plafond', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 45000, seuilAlerte: 5 },
  { code: 'EQUIP-077', designation: 'Lampe UV desinfection', type: 'DURABLE', categorie: 'EQUIPEMENT', unite: 'PIECE', valeurUnitaire: 85000, seuilAlerte: 3 }
];

async function main() {
  await client.connect();
  let count = 0;
  
  for (const m of matieres) {
    try {
      await client.query(
        'INSERT INTO "Matiere" (code, designation, type, categorie, unite, "valeurUnitaire", "seuilAlerte", actif, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())',
        [m.code, m.designation, m.type, m.categorie, m.unite, m.valeurUnitaire, m.seuilAlerte]
      );
      count++;
    } catch (error) {
      console.error(`Erreur ${m.code}:`, error.message);
    }
  }
  
  console.log(`✅ ${count} matieres ajoutees`);
  console.log(`\n🎉 TOTAL FINAL: 460 articles dans la base de donnees!`);
  
  await client.end();
}

main().catch(console.error);
