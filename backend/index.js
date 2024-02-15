const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://chetanohri2000:myCluster@cluster0.ds9cbjg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function fetchData() {
    try {
        await client.connect();

        // Access your specific database and collection
        const database = client.db("myDb");
        const collection = database.collection("myCollection");

        // Fetch all documents in the collection
        const documents = await collection.find({}).toArray();
        return documents;
    }
    catch(err)
    { console.log(err);}
}

module.exports = fetchData;
