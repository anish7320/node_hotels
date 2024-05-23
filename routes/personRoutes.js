const express = require('express');
const router = express.Router();

const person = require('./../models/person');

router.post('/', async (req, res) => {
    try {

        const data = req.body //Assuming the request nody contains the person data

        // create new person document using the mangoose model
        const newPerson = new person(data);
        //save the new person into datbase

        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    }

    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' })
    }
})

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        console.log('data fetches');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // Extract the work type fromthe URL parameter
        if (workType == 'chef' || workType == 'waiter' || workType == 'manager') {

            const response = await person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response)

        } else {

            res.status(404).json({ error: 'Invalid work type' })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; //Extract the id from the url parameter 
        const UpdatedpersonData = req.body; // Updated data for the person

        const response = await person.findByIdAndUpdate(personId, UpdatedpersonData, {
            new: true, // return the Updated document
            runValidators: true, // Run mongoose validation
        })

        if (!response) {
            return res.status(404).json({
                error: 'Person not found'
            });
        }

        console.log('Data updated');
        res.status(200).json(response);

    } catch (error) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

router.delete('/:id', async (req , res)=>{
    try {
        const personId = req.params.id; //Extract the id from the url parameter 

        // Asumming you have a person model
        const response = await person.findByIdAndDelete(personId);
        if (!response) {
            return res.status(404).json({error:'person not found'});
        } 
        console.log('data delete');
        res.status(200).json({message:'person deleted successfully'});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})


module.exports = router;
