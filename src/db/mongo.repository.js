import {MongoClient} from 'mongodb';

export default class MongoRepository {

    constructor(collectionName, url) {
        this.collection = MongoClient.connect(url)
            .then((db) => db.collection(collectionName));
    }

    insert(object) {
        return this.collection
            .then((collection) => collection.insertOne(object))
            .catch((error) => console.log(`insert error: ${JSON.stringify(error)}`));
    }

    update(object) {
        return this.collection
            .then((collection) => collection.update({_id: object._id}, object, {upsert: true}))
            .catch((error) => console.log(`update error: ${JSON.stringify(error)}`));
    }

    remove(query) {
        return this.collection
            .then((collection) => collection.remove(query))
            .catch((error) => console.log(`remove error: ${JSON.stringify(error)}`));
    }

    findAll() {
        return this.collection
            .then((collection) => collection.find().toArray())
            .catch((error) => console.log(`findall error: ${JSON.stringify(error)}`));
    }

    findOne(query){
        return this.collection
            .then((collection) => collection.findOne(query))
            .catch((error) => console.log(`findOne error: ${JSON.stringify(error)}`));
    }

    drop() {
        return this.collection
            .then((collection) => collection.remove())
            .catch((error) => console.log(`drop error: ${JSON.stringify(error)}`));
    }
}
