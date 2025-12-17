require('dotenv').config();
const { Client } = require('pg');

const connectionString = process.env.DATABASE_URL;
const client = new Client({ connectionString });

// Génération de 300 matières supplémentaires
const matieres = [];

// INFORMATIQUE - 40 articles supplémentaires (INFO-021 à INFO-060)
for(let i = 21; i <= 60; i++) {
  matieres.push({
    code: `INFO-${String(i).padStart(3, '0')}`,
    designation: `Matériel informatique avancé ${i}`,
    type: 'DURABLE',
    categorie: 'INFORMATIQUE',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 400000) + 15000,
    seuilAlerte: Math.floor(Math.random() * 12) + 3
  });
}

// MOBILIER - 35 articles supplémentaires (MOB-051 à MOB-085)
for(let i = 51; i <= 85; i++) {
  matieres.push({
    code: `MOB-${String(i).padStart(3, '0')}`,
    designation: `Mobilier professionnel ${i}`,
    type: 'DURABLE',
    categorie: 'MOBILIER',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 180000) + 20000,
    seuilAlerte: Math.floor(Math.random() * 8) + 2
  });
}

// PAPETERIE - 50 articles supplémentaires (FOUR-081 à FOUR-130)
for(let i = 81; i <= 130; i++) {
  matieres.push({
    code: `FOUR-${String(i).padStart(3, '0')}`,
    designation: `Fourniture bureau ${i}`,
    type: 'CONSOMMABLE',
    categorie: 'PAPETERIE',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 8000) + 800,
    seuilAlerte: Math.floor(Math.random() * 25) + 15
  });
}

// PRODUITS ENTRETIEN - 30 articles supplémentaires (ENT-051 à ENT-080)
for(let i = 51; i <= 80; i++) {
  matieres.push({
    code: `ENT-${String(i).padStart(3, '0')}`,
    designation: `Produit nettoyage ${i}`,
    type: 'CONSOMMABLE',
    categorie: 'PRODUIT_ENTRETIEN',
    unite: 'LITRE',
    valeurUnitaire: Math.floor(Math.random() * 12000) + 2500,
    seuilAlerte: Math.floor(Math.random() * 18) + 12
  });
}

// ÉQUIPEMENTS - 30 articles supplémentaires (EQUIP-046 à EQUIP-075)
for(let i = 46; i <= 75; i++) {
  matieres.push({
    code: `EQUIP-${String(i).padStart(3, '0')}`,
    designation: `Équipement technique ${i}`,
    type: 'DURABLE',
    categorie: 'EQUIPEMENT',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 280000) + 25000,
    seuilAlerte: Math.floor(Math.random() * 6) + 2
  });
}

// MATÉRIEL MÉDICAL - 25 articles supplémentaires (MED-031 à MED-055)
for(let i = 31; i <= 55; i++) {
  matieres.push({
    code: `MED-${String(i).padStart(3, '0')}`,
    designation: `Matériel santé ${i}`,
    type: 'CONSOMMABLE',
    categorie: 'MATERIEL_MEDICAL',
    unite: 'BOITE',
    valeurUnitaire: Math.floor(Math.random() * 45000) + 4000,
    seuilAlerte: Math.floor(Math.random() * 12) + 8
  });
}

// VÉHICULES - 20 articles supplémentaires (VEH-011 à VEH-030)
for(let i = 11; i <= 30; i++) {
  matieres.push({
    code: `VEH-${String(i).padStart(3, '0')}`,
    designation: `Pièce auto ${i}`,
    type: 'CONSOMMABLE',
    categorie: 'VEHICULE',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 95000) + 6000,
    seuilAlerte: Math.floor(Math.random() * 8) + 4
  });
}

// AUTRES - 20 articles supplémentaires (AUT-016 à AUT-035)
for(let i = 16; i <= 35; i++) {
  matieres.push({
    code: `AUT-${String(i).padStart(3, '0')}`,
    designation: `Matériel électrique ${i}`,
    type: 'DURABLE',
    categorie: 'AUTRE',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 450000) + 15000,
    seuilAlerte: Math.floor(Math.random() * 8) + 3
  });
}

// CUISINE - 20 articles supplémentaires (CUIS-011 à CUIS-030)
for(let i = 11; i <= 30; i++) {
  matieres.push({
    code: `CUIS-${String(i).padStart(3, '0')}`,
    designation: `Équipement restauration ${i}`,
    type: 'DURABLE',
    categorie: 'EQUIPEMENT',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 380000) + 35000,
    seuilAlerte: Math.floor(Math.random() * 4) + 2
  });
}

// SPORT - 20 articles supplémentaires (SPORT-011 à SPORT-030)
for(let i = 11; i <= 30; i++) {
  matieres.push({
    code: `SPORT-${String(i).padStart(3, '0')}`,
    designation: `Matériel sportif ${i}`,
    type: 'CONSOMMABLE',
    categorie: 'EQUIPEMENT',
    unite: 'PIECE',
    valeurUnitaire: Math.floor(Math.random() * 48000) + 6000,
    seuilAlerte: Math.floor(Math.random() * 8) + 6
  });
}

async function main() {
  console.log('🌱 Ajout de 300 matières supplémentaires pour CROUS Ziguinchor...\n');

  await client.connect();

  let count = 0;
  for (const matiere of matieres) {
    try {
      await client.query(
        `INSERT INTO "Matiere" (code, designation, type, categorie, unite, "valeurUnitaire", "seuilAlerte", actif, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, $6, $7, true, NOW(), NOW())`,
        [matiere.code, matiere.designation, matiere.type, matiere.categorie, matiere.unite, matiere.valeurUnitaire, matiere.seuilAlerte]
      );
      count++;
      if (count % 50 === 0) {
        console.log(`✅ ${count} matières insérées...`);
      }
    } catch (error) {
      console.error(`❌ Erreur pour ${matiere.code}:`, error.message);
    }
  }

  console.log(`\n🎉 Seeding supplémentaire terminé ! ${count} nouvelles matières insérées sur ${matieres.length}`);
  console.log(`\n📊 Total dans la base : ${160 + count} articles`);

  await client.end();
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
  });
