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

router.post('/reaction', controller.addReaction); 

router.post('/reaction', function(request, response){
    var reaction = request.body;      
    controller.addReaction(phoreactionto)
});
router.get('/reaction', controller.getReactions)

router.post('/sensor', controller.addGPSInfo); 

router.post('/sensor', function(request, response){
    var gps = request.body;      
    controller.addGPSInfo(gps)
});

router.get('/sensor', controller.getGPSInfo)

module.exports = router; 