/*
const express=require('express');
const Note=require('../models/note');
const router=express.Router();

router.get('/',(req,res)=>{
    try{
        const notes=Note.getNotes();
        res.send(notes);
    }catch(err){
        res.status(401).send({message: error.message});

    }
});

module.exports=router;
*/
const express = require('express');
const Note = require('../models/note');
const router = express.Router();

router
  .get('/', async (req, res) => {
    try {
      const notes = await Note.getAllNotes();
      res.send(notes);
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/read', async (req, res) => {
    try {
      let note = await Note.read(req.body);
      res.send({...note, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  /*
  .post('/register', async (req, res) => {
    try {
      let user = await User.register(req.body);
      res.send({...user, password: undefined})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  */
  .put('/edit', async (req, res) => {
    try {
      let note = await Note.editNote(req.body);
      res.send({...user, password: undefined});
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })

  .delete('/delete', async (req, res) => {
    try {
      User.deleteNote(req.body);
      res.send({success: "We'll Miss You... :("})
    } catch(err) {
      res.status(401).send({message: err.message})
    }
  })



  
module.exports = router;