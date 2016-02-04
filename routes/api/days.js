var express = require('express');
var router = express.Router();
var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurants = require('../../models/restaurant');
var Activity = require('../../models/activity');




router.get('/api/days', function(req, res, next) {
  Day.find({})
  .exec()
  .then(function(dayList){
    res.json(dayList); //Render later on HTML
  })
  .then(null,next);

})


router.get('/api/days/:id', function(req, res, next) {
  Day.findById(req.params.id)
  .exec()
  .then(function(oneDay){
    res.json(oneDay); //We will later render this onto one of the HTML pages
  })
  .then(null,next);
})

router.post('/api/days/', function(req, res, next){
  Day.create(
    {
      number: req.body.number
    }
  )
  .then(function(createdDay){
    res.json(createdDay);
  })
  .then(null,next);
})

router.put('/api/days/:id/hotel', function(req, res, next){

  Hotel.findById(req.body.id).exec()
  .then(function(theHotel){
    
    Day.findById(req.params.id).exec()
    .then(function(day){
      day.hotel.push(theHotel);
      return day.save();
    });

  })
  .then(null, next);
})

router.put('/api/days/:id/restaurant', function(req, res, next){

  Restaurants.findById(req.body.id).exec()
  .then(function(theRestaurant){
    
    Day.findById(req.params.id).exec()
    .then(function(day){
      day.restaurants.push(theRestaurant);
      return day.save();
    });

  })
  .then(null, next);
})

router.put('/api/days/:id/activity', function(req, res, next){

  Activity.findById(req.body.id).exec()
  .then(function(theActivity){
    
    Day.findById(req.params.id).exec()
    .then(function(day){
      day.activities.push(theActivity);
      return day.save();
    });

  })
  .then(null, next);
})



router.delete('/api/days/:id', function(req,res,next){
  //After removing a day, then we need to change day.number
  Day.remove({
    _id: req.params.id
  })
  .then(function(){
    res.send("Day deleted");
  })
  .then(null,next);
});






module.exports = router;
