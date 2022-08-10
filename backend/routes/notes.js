const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');


//Get all the notes using GET : "api/auth/getuser" , Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})


//Add notes using POST : "api/auth/addnotes" , Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 1 }),
    body('description', 'Description must be atleast three characteres').isLength({ min: 3 }),
], async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router