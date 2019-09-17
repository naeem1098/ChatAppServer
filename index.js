const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const socket = require('socket.io');

const {app} = require("./API/app");
// const {verifyToken} = require("./Auth/authentication");
// const {connection} = require('./database/dbConnection');

const server = express();
var Clients = [];
// support parsing of application/json type post data
server.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cors());
server.use('/app', app);

const users = [
    {
        userId: 0,
        username: 'naeem1098',
        email: 'naeem1098@gmail.com',
        password: 'naeem'
    },
    {
        userId: 1,
        username: 'markeet145',
        email: 'markeet145@gmail.com',
        password: 'markeet'
    }
]
server.get('/', (req, res) => {
    res.json({
        message: 'Welcome to my API'
    })
})

server.post('/login', (req, res) => {

    try{
        let email = req.body.email;
        let password = req.body.password;
   
        let foundUser = {};
        foundUser = users.find(user => {
            if(((user.email === email) && (user.password === password))){
                return -1;
            } else {
                return false;
            }
        })

        if (foundUser) {
            jwt.sign({foundUser}, '@nc3Up0Nt!m3', {expiresIn: '1h'}, (err, token) => {
                if(err){
                    console.log(err)
                }
                res.json({
                    token
                })
            })
        } else {
            res.json("Unauthorised User").status(403);
        }
        
    }
    catch(error){
        console.log(error);
    }

})

server.post('/register', (req, res) => {

    var newUser = {
        userId: users.length,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }

    if (users.push(newUser)){
        res.json("New user registered successfully!").status(200);
    } else {
        res.json("An error occured").status(501);
    }

    
})

Server = server.listen(3100, () => console.log("Server is running on port 3100"));



io = socket(Server);

io.on('connection', (client) => {
    
    // console.log(client.id);

    client.on('SEND_MESSAGE', function(data){
        io.emit('RECEIVE_MESSAGE', data);
    })

    client.on('REGISTER_USER', function(data){
        const registerClient = {
            userToken: data,
            clientID: client.id
        }
        Clients.push(registerClient);
        console.log(Clients);
        io.emit('USER_REGISTERED', true);
    })
})
