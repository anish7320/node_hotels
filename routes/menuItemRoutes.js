const express = require('express');
const router = express.Router();

const menuItem = require('./../models/menuItem');

router.post('/', async (req, res) => {
    try {
      const data = req.body
  
      const newMenu = new menuItem(data);
  
      const response = await newMenu.save();
  
      console.log('data saved');
      res.status(200).json(response);
  
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' })
    }
  
  })
  
  router.get('/', async (req, res) => {
    try {
      const data = await menuItem.find();
      console.log('data fetches');
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server Error' })
    }
  })

  router.get('/:DishTaste', async (req, res) => {
    try {
        const DishTaste = req.params.DishTaste; // Extract the work type fromthe URL parameter
        if (DishTaste == 'Sweet' || DishTaste == 'Spicy' || DishTaste == 'Sour') {

            const response = await menuItem.find({ taste: DishTaste });
            console.log('response fetched');
            res.status(200).json(response)

        } else {

            res.status(404).json({ error: 'Invalid Dish taste' })

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

router.put('/:id', async (req, res) => {
  try {
      const menuItemId = req.params.id; //Extract the id from the url parameter 
      const UpdatedmenuitemData = req.body; // Updated data for the person

      const response = await menuItem.findByIdAndUpdate(menuItemId,UpdatedmenuitemData, {
          new: true, // return the Updated document
          runValidators: true, // Run mongoose validation
      })

      if (!response) {
          return res.status(404).json({
              error: 'Menu not found'
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
      const menuItemId = req.params.id; //Extract the id from the url parameter 

      // Asumming you have a person model
      const response = await menuItem.findByIdAndDelete(menuItemId);
      if (!response) {
          return res.status(404).json({error:'menu not found'});
      } 
      console.log('data delete');
      res.status(200).json({message:'menuItem deleted successfully'});
  } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal server Error' })
  }
})

// Comment added for testing purpose
module.exports = router;