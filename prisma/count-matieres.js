require('dotenv').config();
const { Client } = require('pg');

(async () => {
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  
  const result = await client.query('SELECT COUNT(*) as total FROM "Matiere"');
  const total = result.rows[0].total;
  
  console.log('\n📊 ========================================');
  console.log(`   TOTAL MATIÈRES: ${total} articles`);
  console.log('========================================\n');
  
  // Détail par catégorie
  const byCategorie = await client.query('SELECT categorie, COUNT(*) as count FROM "Matiere" GROUP BY categorie ORDER BY count DESC');
  console.log('📦 Répartition par catégorie:');
  byCategorie.rows.forEach(row => {
    console.log(`   - ${row.categorie}: ${row.count} articles`);
  });
  
  await client.end();
})();
