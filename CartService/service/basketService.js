var client = null

async function add(userId, customerId, vaccine_customer_Info) {
    return await client.hSet(`basket: ${userId}`, customerId, JSON.stringify(vaccine_customer_Info))
};

async function getAll(userId) {
    return await client.hGetAll(`basket: ${userId}`)

};

async function remove(userId, customerId) {
    return await client.hDel(`basket: ${userId}`, customerId)
};
async function update(userId, customerId, data){
    return await client.hSet (`basket: ${userId}`, customerId, JSON.stringify(data))
}
async function removeAll(userId) {
    return await client.del(`basket: ${userId}`)
};

module.exports = (_client) => {
    if (!_client) {
        throw new Error("Missing redis client object")
    }
    client = _client

    return {
        add,
        getAll,
        remove,
        update,
        removeAll
    };
}