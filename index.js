const express = require('express');
const app = express();
const port = process.env.PORT || 5009;
const cors = require('cors');

// Use as Middleware (cors)
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('User Management server is running')
});

const users = [
    {"id": 1, "name": "Tom", "email": "tom@mail.com"},
    {"id": 2, "name": "Dik", "email": "dik@mail.com"},
    {"id": 3, "name": "Harry", "email": "harry@mail.com"},
];

app.get('/users', (req, res) => {
    res.send(users);
});

app.post('/users', (req, res) => {
    console.log('Post API Hitting Server');
    console.log(req.body);
});

app.listen(port, () => {
    console.log(`User Management server listening on ${port}`)
});
