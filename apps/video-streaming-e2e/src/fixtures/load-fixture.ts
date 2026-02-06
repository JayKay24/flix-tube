import { MongoClient, ObjectId } from 'mongodb';
import { readFile } from 'fs/promises';
import { join } from 'path';

// Connection details (use environment variables with defaults)
const MONGO_URL = process.env.DB_URL || 'mongodb://localhost:4000';
const DB_NAME = process.env.DBNAME || 'video-streaming';
const COLLECTION_NAME = 'videos';

async function loadFixture() {
  console.log(`Connecting to MongoDB at ${MONGO_URL}...`);
  const client = new MongoClient(MONGO_URL);

  try {
    await client.connect();
    console.log('Successfully connected to MongoDB.');

    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);

    // Read the fixture file
    const filePath = join(__dirname, 'videos.json');
    console.log(`Reading fixture data from ${filePath}...`);
    const fileContent = await readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);

    // Transform the data to use MongoDB's ObjectId
    const documents = data.map(item => ({
      ...item,
      _id: new ObjectId(item._id),
    }));

    // Clear the collection
    console.log(`Clearing collection: ${COLLECTION_NAME}...`);
    await collection.deleteMany({});

    // Insert the new data
    console.log(`Inserting ${documents.length} document(s) into ${COLLECTION_NAME}...`);
    await collection.insertMany(documents);

    console.log('Fixture data loaded successfully.');

  } catch (err) {
    console.error('An error occurred while loading the fixture:', err);
    process.exit(1);
  } finally {
    await client.close();
    console.log('MongoDB connection closed.');
  }
}

loadFixture();
