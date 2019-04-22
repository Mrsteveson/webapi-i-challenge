// implement your API here
// setting requires
const express = require('express');
const db = require('./data/db.js');

//  establishing server
const server = express();
server.use(express.json());

// EndPoints ----CRUD
// Create. Add User **Postman-Tested: Working**
server.post('/api/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user"})
    }

    db
    .insert({ name, bio })
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "There was an error while saving the user to the database."})
    })
})

//Read. Get Users **Postman-Tested: Working**  
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The users information could not be retrieved."});
    })
});

//Read. Get Users by ID **Postman-Tested: Working**
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id

    db
    .findById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user information could not be retrieved."})
    })
})

//Update. Update User **Postman-Tested: Working**
server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user."})
    }

    db
    .update(id, { name, bio })
    .then(update => {
        if(update) {
            res.status(200).json(update)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user information could not be modified."})
    })
})

//Delete. Delete User **Postman-Tested: Working**
server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id; 

    db
    .remove(id)
    .then((id) => {
        if(id) {
            res.status(200).json(id)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: err, message: "The user could not be removed."})
    })
})

// Server Listening on Port 5000.
server.listen(5000, () => {
    console.log('\n*** Server running on port 5000 ***\n')
});