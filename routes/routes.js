const express = require('express');
const LocationModel = require('../models/Locations');
const ViewPointsModel = require('../models/ViewPoints');

const router = express.Router()

//Post Method
router.post('/', async (req, res) => {
    const data = new Film(req.body); // igy nem kell kódban megadni a body tartalmát, hanem csak a requestben
    try{
        const ujFilm = await data.save();
        res.status(201).json({_id: ujFilm._id})
    }
    catch(error){
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/', async (req, res) => {
    try{
        const data = await Film.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})



//Get by ID Method
router.get('/locations/:locationName/viewpoints', async (req, res) => {
    try{
        const data = await LocationModel.find({locationName: req.params.locationName})
        console.log(data[0]);
        const viewpoints = await ViewPointsModel.find({location: data[0]._id});

        if (viewpoints.length !== 0) {
            res.json(viewpoints)
        } else {
            res.status(404).json({message: 'Nincs olyan telefon az adatbázisban, amit ez a gyártó gyártott.'})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/viewpoints/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true, runValidators: true }; 
        // hogy a frissítés utáni dokumentumot kapjuk vissza
        const result = await ViewPointsModel.findByIdAndUpdate(
            id, updatedData, options
        )
        if (result) {
            res.status(200).send(result)
        } else {
            res.status(400).json({ message: `${id} azonosítóval nem létezik telefon!`  })
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/:magyarCim', async (req, res) => {
    try {
        const film = await Film.find({Cim_hu: req.params.magyarCim}) // igy találja meg a magyar cim alapjan, listát ad vissza 
        const id = film[0]._id
        const data = await Film.findByIdAndDelete(id)
        res.send(`A ${data.nev} nevű telefon törölve lett.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;