var models = require('express-cassandra');

const connect = () => {
models.setDirectory(__dirname + '/models').bind(
    {
        clientOptions: {
            contactPoints: ['127.0.0.1'],
            localDataCenter: 'datacenter1',
            protocolOptions: { port: 9042 },
            keyspace: 'mykeyspace',
            queryOptions: {consistency: models.consistencies.one}
        },
        ormOptions: {
            defaultReplicationStrategy : {
                class: 'SimpleStrategy',
                replication_factor: 1
            },
            migration: 'safe'
        }
    },
    function(err) {
        if(err) throw err;
    },
    console.log('Connected')
);
}

const addActiviy = (req, res, next) => {
    var toInsert = req.body
    var activity = new models.instance.Activity({
        activity_id: models.uuidFromString(toInsert.activity_id),
        type : toInsert.type,
        title : toInsert.title,
        user_id : models.uuidFromString(toInsert.user_id),
        date : Date.now(),
        photo_url: toInsert.photo_url,
        photo_comment: toInsert.photo_comment
    });
    var activiyByType = new models.instance.ActivityByType({
        activity_id: models.uuidFromString(toInsert.activity_id),
        type : toInsert.type,
        title : toInsert.title,
        user_id : models.uuidFromString(toInsert.user_id),
        date : Date.now(),
        photo_url: toInsert.photo_url,
        photo_comment: toInsert.photo_comment
    });

    activity.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log('save 1')
    });
    activiyByType.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log('save 2')
        res.json({message: "Saved activity"}); 
    });
    
}

const getActivities = (req, res, next)  => {

    var userId = req.query.userId
    userId = models.uuidFromString(userId)

    models.instance.Activity.find({user_id: userId}, function(err, activities){
        if(err) {
            console.log(err);
            return;
        }
        res.json({collection: activities})
    });
}

const getActivitiesByType = (req, res, next)  => {

    var userId = req.query.userId
    userId = models.uuidFromString(userId)
    var type = req.query.type

    models.instance.ActivityByType.find({user_id: userId, type: type}, function(err, activities){
        if(err) {
            console.log(err);
            return;
        }
        res.json({collection: activities})
    });
}

const addReaction = (req, res, next) => {
    var toInsert = req.body
    var reaction = new models.instance.Reaction({
        activityId : models.uuidFromString(toInsert.activityId),
        reactionUser : models.uuidFromString(toInsert.reactionUser),
        text: toInsert.text,
        isKudos: toInsert.isKudos,
        date: Date.now()
    });

    reaction.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log("reaction saved")
        res.json({message : "reaction saved"})
    });
}

const getReactions = (req, res, next) => {
    var activityId = req.query.activityId
    activityId =  models.uuidFromString(activityId)

    models.instance.Reaction.find({activityId: activityId}, function(err, reactions){
        if(err) {
            console.log(err);
            return;
        }
        res.json({collection: reactions})
    });
}

const addGPSInfo = (req, res, next) => {
    var toInsert = req.body
    var gps = new models.instance.Sensor({
        activityId : models.uuidFromString(toInsert.activityId),
        sensorType : toInsert.sensorType,
        value: toInsert.value,
        date: Date.now()
    });

    gps.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        console.log("gps saved")
        res.json({message : "gps saved"})
    });
}

const getGPSInfo = (req, res, next) => {
    var activityId = req.query.activityId
    activityId = models.uuidFromString(activityId),
    models.instance.Sensor.find({activityId: activityId}, function(err, GPSs){
        if(err) {
            console.log(err);
            return;
        }
        res.json({collection: GPSs})
    });
}


module.exports = { connect, addActiviy, getActivities, getActivitiesByType, getReactions, addReaction, getGPSInfo, addGPSInfo};