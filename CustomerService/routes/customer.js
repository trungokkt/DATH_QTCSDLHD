var express = require('express');
var router = express.Router();
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
var config = require('../db/config');
const { v4: uuidv4 } = require('uuid');
const Uuid = require('cassandra-driver').types.Uuid;
const cassandra = require('cassandra-driver');
const auth = require('../middleware/auth');

const client = new cassandra.Client({
    contactPoints: [process.env.CASSANDRA_HOST || 'localhost'],
    localDataCenter: 'datacenter1',
    keyspace: 'dath_qtcsdlhd'
});

/* GET customer */
router.post('/login', async function (req, res, next) {
    try {
        console.log(req.body)

        const { username, password } = req.body;
        const query = 'SELECT * FROM account WHERE username = ?';
        const result = await client.execute(query, [username], { prepare: true });
        const user = result.first();

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            throw new Error({
                error: 'Invalid login credentials'
            })
        }
        const token = jwt.sign({ _id: user.username, user_type: user.user_type }, config.JWT_KEY, { expiresIn: '90d' })
        const responsive = {
            status: "Login success",
            token: token,
        }
        res.send(
            responsive
        );
    } catch (error) {
        res.status(400).send(error);
    }
});
/* POST create customer account */
router.post('/signup', async function (req, res, next) {
    try {
        console.log(req.body)
        const customerid = uuidv4()
        const username = req.body.username
        const password = await bcrypt.hash(req.body.password, 8)
        const address = req.body.address || ""
        const fullname = req.body.fullname || ""
        const gender = req.body.gender || ""
        const phone = req.body.phone || ""
        const email = req.body.email || ""
        const user_type = req.body.user_type || 1
        const bod = req.body.bod || "1970-1-1"
        const relationship = "Bản thân"

        const query = 'SELECT * FROM account WHERE username = ?';
        const result = await client.execute(query, [username], { prepare: true });
        if (result.rows[0]) {
            throw new Error("Tài khoản đã tồn tại")
        }

        const queries = [
            {
                query: 'insert into account(username, password, user_type) values(?,?,?)',
                params: [username, password, user_type]
            }, {
                query: 'insert into customer(customerid, username, address, fullname, gender, phone, email, bod, relationship) values(?,?,?,?,?,?,?,?,?)',
                params: [customerid, username, address, fullname, gender, phone, email, bod, relationship]
            }
        ];

        await client.batch(queries, { prepare: true })
        res.send({ status: "Tạo thành công" })
    } catch (error) {
        res.status(400).send(error)
    }
});
/* GET customer */
router.get('/me', auth, async function (req, res, next) {
    try {
        const query = "select * from customer where username = ? and relationship = 'Bản thân' ALLOW FILTERING";
        const result = await client.execute(query, [req.username], { prepare: true });
        const user = result.first();
        res.send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});

/* POST create customer child */
router.post('/create', auth, async function (req, res, next) {
    //try {
        const customerid = req.body.customerid;
        const address = req.body.address || ""
        const fullname = req.body.fullname
        const email = req.body.email || ""
        const gender = req.body.gender || "Nam"
        const phone = req.body.phone
        const relationship = req.body.relationship
        const username = req.username
        const bod = req.body.bod
        const queryCheck = 'SELECT * FROM customer WHERE customerid = ?';
        const resultCheck = await client.execute(queryCheck, [customerid], { prepare: true });
        if (resultCheck.first()) {
            return res.send(resultCheck.first())
        }
        console.log(resultCheck)


        console.log(customerid, address, bod, email, fullname, gender, phone, relationship, username)
        const query = 'insert into customer(customerid, address, bod, email, fullname, gender, phone, relationship, username) values(?,?,?,?,?,?,?,?,?)';
        client.execute(query, [customerid, address, bod, email, fullname, gender, phone, relationship, username], { prepare: true })
            .then(result => res.send(req.body));
    //} catch (error) {
    //    res.status(400).send(error)
    //}
});

/* GET customer from user  để bên đưang ki tiêm dùng*/
router.get('/', auth, function (req, res, next) {
    try {
        const username = req.username

        const query = "select * from customer where username = ? ALLOW FILTERING";

        client.execute(query, [username])
            .then(result => {
                if (!result.rows[0]) {
                    throw new Error()
                }
                res.send(
                    result.rows
                )
            });
    } catch (error) {
        res.status(400).send(error)
    }
});
router.delete('/', function (req, res, next) {
    try {
        const customerid = req.body.customerid || req.query.customerid
        if (!customerid) {
            throw new Error()
        }
        const query = 'DELETE FROM customer WHERE customerid=? IF EXISTS;';

        client.execute(query, [customerid])
            .then(result => {
                if (!result.rows[0]) {
                    throw new Error()
                }
                res.send({
                    customer: result.rows[0]
                })
            });
    } catch (error) {
        res.status(400).send(error)
    }
});
module.exports = router;
