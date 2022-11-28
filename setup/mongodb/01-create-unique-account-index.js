conn = Mongo();
db = conn.getDB('library');

db.accounts.insertOne({
  _id: ObjectId('633184f42ec069ab607b0b5b'),
  email: 'jeff@example.com',
  password: '$2b$12$gqB.kZtNIbyKcYxStjtVTenCwLcqmUSFN/Yda2rP1znKlTHX6wukq',
  full_name: 'jeff jiang',
  roles: [
    'dev',
    'admin'
  ]
});
db.accounts.insertOne({
  _id: ObjectId('633185412ec069ab607b0b5c'),
  email: 'pheb@example.com',
  password: '$2b$12$BnCFBYWNZI1dpQ3djPS5DuWszH3nc2v6nYPcz8OZpr6LPZSysrJty',
  full_name: 'phebs',
  roles: [
    'pet'
  ]
});
db.accounts.createIndex(
  { email: 1 },
  { unique: true },
);
