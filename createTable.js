const Knex = require('knex');
const prompt = require('prompt');

const FIELDS = ['user', 'password', 'database'];

prompt.start();

// Prompt the user for connection details
prompt.get(FIELDS, async (err, config) => {
  if (err) {
    console.error(err);
    return;
  }

  // Connect to the database
  const knex = Knex({client: 'pg', connection: config});

  // Create the "visits" table
  try {
    await knex.schema.createTable('visits', table => {
      table.increments();
      table.timestamp('timestamp');
      table.string('userIp');
    });

    console.log(`Successfully created 'visits' table.`);
    return knex.destroy();
  } catch (err) {
    console.error(`Failed to create 'visits' table:`, err);
    if (knex) {
      knex.destroy();
    }
  }
});