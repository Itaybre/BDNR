const express = require('express'); 

const router  = express.Router(); 

const controller = require('./controller'); 

router.post('/activity', controller.addActiviy); 

router.post('/activity', function(request, response){
    var photo = request.body;      
    controller.addPhoto(photo)
});

router.get('/activities', controller.getActivities); 
router.get('/activities/type', controller.getActivitiesByType); 

module.exports = router; 