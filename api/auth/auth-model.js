const db = require('../../data/dbConfig');

async function find() {
    return db('users');
}

async function findBy(filter){
    return await db('users')
    .where(filter)
}

async function findById(id){
    return await db('users')
    .where("id", id)
}

async function add({username, password}){
    const [id] = await db('users').insert({ username, password});
    return findById(id)
}

module.exports = {
    find,
    findBy,
    findById,
    add
}
