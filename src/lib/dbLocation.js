import { MongoClient, ObjectId } from "mongodb"; // See https://www.mongodb.com/docs/drivers/node/current/quick-start/
import { DB_URI } from "$env/static/private";

const client = new MongoClient(DB_URI);

await client.connect();
const db = client.db("WebShop"); // select database



//////////////////////////////////////////
// Locations
//////////////////////////////////////////

// Get all Locations
async function getLocations() {
  let Locations = [];
  try {
    const collection = db.collection("Location");

    // You can specify a query/filter here
    // See https://www.mongodb.com/docs/drivers/node/current/fundamentals/crud/query-document/
    const query = {};

    // Get all objects that match the query
    Locations = await collection.find(query).toArray();
    Locations.forEach((Location) => {
      Location._id = Location._id.toString(); // convert ObjectId to String
    });
  } catch (error) {
    console.log(error);
    // TODO: errorhandling
  }
  return Locations;
}

// Get Location by id
async function getLocation(id) {
  let Location = null;
  try {
    const collection = db.collection("Locations");
    const query = { _id: new ObjectId(id) }; // filter by id
    Location = await collection.findOne(query);

    if (!Location) {
      console.log("No Location with id " + id);
      // TODO: errorhandling
    } else {
      Location._id = Location._id.toString(); // convert ObjectId to String
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return Location;
}

// create Location
// Example Location object:
/* 
{ 
  title: "Das Geheimnis von Altura",
  year: 2024,
  length: "120 Minuten"
} 
*/
async function createLocation(Location) {
  Location.poster = "/images/placeholder.jpg"; // default poster
  Location.actors = [];
  Location.watchlist = false;
  try {
    const collection = db.collection("Locations");
    const result = await collection.insertOne(Location);
    return result.insertedId.toString(); // convert ObjectId to String
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// update Location
// Example Location object:
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
// returns: id of the updated Location or null, if Location could not be updated
async function updateLocation(Location) {
  try {
    let id = Location._id;
    delete Location._id; // delete the _id from the object, because the _id cannot be updated
    const collection = db.collection("Locations");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.updateOne(query, { $set: Location });

    if (result.matchedCount === 0) {
      console.log("No Location with id " + id);
      // TODO: errorhandling
    } else {
      console.log("Location with id " + id + " has been updated.");
      return id;
    }
  } catch (error) {
    // TODO: errorhandling
    console.log(error.message);
  }
  return null;
}

// delete Location by id
// returns: id of the deleted Location or null, if Location could not be deleted
async function deleteLocation(id) {
  try {
    const collection = db.collection("Locations");
    const query = { _id: new ObjectId(id) }; // filter by id
    const result = await collection.deleteOne(query);

    if (result.deletedCount === 0) {
      console.log("No Location with id " + id);
    } else {
      console.log("Location with id " + id + " has been successfully deleted.");
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
  getLocations,
  getLocation,
  createLocation,
  updateLocation,
  deleteLocation,
};
