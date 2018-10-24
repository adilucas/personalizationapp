const { Router } = require('express');

const userIds = Router();

/**
 * GET /userid
 * Returns all mappings
 */
userIds.get('/', async (req, res, next) => {
    let client;

    try {
        client = await req.MongoClient.connect(req.DatabaseURI, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: 'MongoDB Internal Error: Cannot connect' });
    }

    const db = await client.db();
    const docs = await db.collection('userid').find().toArray();

    return res.status(200).json({ docs });
});

/**
 * GET /userid/<id>
 * Returns particular mapping for given userId
 */
userIds.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    let client;

    try {
        client = await req.MongoClient.connect(req.DatabaseURI, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: 'MongoDB Internal Error: Cannot connect'
        });
    }

    const db = await client.db();
    const element = await db.collection('userid').findOne({ userId: id });

    return res.status(200).json(element);
});

/**
 * POST /userid
 * Adds new mapping
 */
userIds.post('/', async (req, res, next) => {
    let data = req.body;

    if (!data.userId || !data.category) {
        return res.status(400).json({ error: 'Wrong params' });
    }

    let client;

    try {
        client = await req.MongoClient.connect(req.DatabaseURI, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: 'MongoDB Internal Error: Cannot connect'
        });
    }

    const db = await client.db();
    const element = await db.collection('userid').insertOne({
        userId: data.userId,
        category: data.category
    });

    if (element.insertedCount === 0) {
        return res.status(500).json({ error: "Internal error. Nothing added" });
    }

    return res.status(200).json({
        element: data,
        count: element.insertedCount,
        _id: element.insertedId,
        status: "ADDED"
    });
});

/**
 * DELETE /userid/<id>
 * Removes one mapping of given id
 */
userIds.delete('/:id', async (req, res, next) => {
    let { id } = req.params;
    let client;

    try {
        client = await req.MongoClient.connect(req.DatabaseURI, {
            useNewUrlParser: true
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({
            message: 'MongoDB Internal Error: Cannot connect'
        });
    }

    const db = await client.db();
    const element = await db.collection('userid').findOneAndDelete({
        userId: id
    });

    if (element.ok) {
        return res.status(202).json({
            status: "DELETED"
        });
    } else {
        return res.status(500).json({ error: "Could'nt remove element. Try again" });
    }
});

process.on('unhandledRejection', (e) => {
    console.log(e);
})

module.exports = userIds;