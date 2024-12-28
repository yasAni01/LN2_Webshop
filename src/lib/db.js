import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("WebShop"); // select database



//////////////////////////////////////////
// Items
//////////////////////////////////////////

// Get all Items
async function getItems() {
  let Items = [];
  try {
    const collection = db.collection("Items");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    Items = await collection.find(query).toArray();
    Items.forEach((item) => {
      item._id = item._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return Items;
}

// Get item by id
async function getitem(id) {
  let item = null;
  try {
    const collection = db.collection("Items");
    const query = { _id: new ObjectId(id) }; // filter by id
    item = await collection.findOne(query);

    if (!item) {
      console.log("No item with id " + id);
      // TODO: errorhandling
    } else {
      item._id = item._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return item;
}

// create item
// Example item object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createitem(item) {
  item.poster = "/images/placeholder.jpg"; // default poster
  item.actors = [];
  item.watchlist = false;
  try {
    const collection = db.collection("Items");
    const result = await collection.insertOne(item);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update item
// Example item object:
/* 
{ 
  _id: "6630e72c95e12055f661ff13",
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten",
  actors: [
    "Lena Herzog",
    "Maximilian Schröder",
    "Sophia Neumann"
  ],
  poster: "/images/Altura.png",
  watchlist: false
} 
*/
// returns: id of the updated item or null, if item could not be updated
async function updateitem(item) {
  try {
    let id = item._id;
    delete item._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("Items");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: item });

    if (result.matchedCount === 0) {
      console.log("No item with id " + id);
      // TODO: errorhandling
    } else {
      console.log("item with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete item by id
// returns: id of the deleted item or null, if item could not be deleted
async function deleteitem(id) {
  try {
    const collection = db.collection("Items");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No item with id " + id);
    } else {
      console.log("item with id " + id + " has been successfully deleted.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// export all functions so that they can be used in other files
export default {
  getItems,
  getitem,
  createitem,
  updateitem,
  deleteitem,
};
