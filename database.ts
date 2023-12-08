import { Database } from 'sqlite3';

const db = new Database(':memory:');

db.serialize(function() {
  db.run("CREATE TABLE users (id INT, name TEXT)");
});