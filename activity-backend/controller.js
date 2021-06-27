var models = require('express-cassandra');

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
    }
);

const addActiviy = (req, res, next) => {
    var activity = new models.instance.Activity({
        type : "other",
        title : "text",
        user_id     : 2,
        date : Date.now(),
            photo_url: "text",
            photo_comment: "text"
    });
    var activiyByType = new models.instance.ActivityByType({
        type : "text",
        title : "text",
        user_id     : 2,
        date : Date.now(),
            photo_url: "text",
            photo_comment: "text"
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
        res.json({message: "POST new activity 2"}); 
    });
    
}

const getActivities = (req, res, next)  => {

    var userId = req.query.userId
    userId = parseInt(userId)

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
    var type = req.query.type
    userId = parseInt(userId)

    models.instance.ActivityByType.find({user_id: userId}, function(err, activities){
        if(err) {
            console.log(err);
            return;
        }
        res.json({collection: activities})
    });
}


module.exports = { addActiviy, getActivities, getActivitiesByType };