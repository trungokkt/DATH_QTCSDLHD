var axios = require("axios").default
const host = "http://localhost:8000"
const APIService = {
    getAllProduct: async () => {
        const products = await axios({
            url: `${host}/vaccines`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return products.data
    },
    getAllProductByCategory: async (categoryid) => {
        const products = await axios({
            url: `${host}/vaccines/category?categoryid=${categoryid}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return products.data
    },
    getProductByCode: async (code) => {
        const products = await axios({
            url: `${host}/vaccines/code?code=${code}`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return products.data
    },
    getProductByName: async (name) => {
        const products = await axios({
            url: `${host}/vaccines/name`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                keyword: name
            }
        })
        return products.data
    },
    updateProduct: async (vaccine) => {
        const products = await axios({
            url: `${host}/vaccines`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            data: vaccine
        })
        return products.data
    },
    createProduct: async (vaccine) => {
        const products = await axios({
            url: `${host}/vaccines`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: vaccine
        })
        return products.data
    },
    getCategory: async () => {
        const products = await axios({
            url: `${host}/categories`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return products.data
    },
    getCart: async (token) => {

        const Authorization = "Bearer " + token
        const cart = await axios({
            url: `${host}/cart`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            }

        })
        return cart.data
    },
    addCart: async (token, data) => {
        const Authorization = "Bearer " + token
        const cart = await axios({
            url: `${host}/cart`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: data
        })
        return cart.data
    },
    deleteCart: async (token, id) => {
        const Authorization = "Bearer " + token
        const cart = await axios({
            url: `${host}/cart`,
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: { customerId: id }
        })
        return cart.data
    },
    deleteAllCart: async (token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/cart/all`,
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
        })
        return result.data
    },
    updateCart: async (token, data) => {
        console.log(data)
        const Authorization = "Bearer " + token
        const cart = await axios({
            url: `${host}/cart`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: data
        })
        return cart.data
    },
    createOrder: async (token) => {
        const Authorization = "Bearer " + token
        const cart = await axios({
            url: `${host}/order`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
        })
        return cart.data
    },
    updateStatusOrder: async (_id, status, token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/order/status`,
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: {
                _id, status
            }
        })
        return result.data
    },
    updateStatusOrderItem: async (_id, vaccine, token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/order/injected`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: {
                _id, 
                vaccine
            }
        })
        return result.data
    },
    getOrder: async (token) => {
        const Authorization = "Bearer " + token
        const orders = await axios({
            url: `${host}/order`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
        })
        return orders.data
    },
    getAllOrder: async (token) => {
        const Authorization = "Bearer " + token
        const orders = await axios({
            url: `${host}/order/all`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
        })
        return orders.data
    },
    deleteOrderItem: async (_id, token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/order/delete/orderItem`,
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: {
                _id: _id
            }
        })
        return result.data
    },
    deleteOrderItemProduct: async (orderItemId, vaccineId, token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/order/delete/orderItem/product`,
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: {
                orderItemId: orderItemId,
                vaccineId: vaccineId
            }
        })
        return result.data
    },
    setInjectTime: async (orderItemId, vaccineId, inJectTime, token) => {
        const Authorization = "Bearer " + token
        console.log(inJectTime)
        const result = await axios({
            url: `${host}/order/inject-time`,
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
            data: {
                orderItemId: orderItemId,
                vaccineId: vaccineId,
                inJectTime: inJectTime
            }
        })
        return result.data
    },
    getCustomer: async (token) => {
        const Authorization = "Bearer " + token
        const result = await axios({
            url: `${host}/customer`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": Authorization
            },
        })
        return result.data
    }
}
module.exports = APIService