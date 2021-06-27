module.exports = {
    fields:{
        activityId : "uuid",
        sensorType : "int",
        value: "int",
        date: "timestamp"
    },
    key:["activityId", "date"],
    clustering_order: {"date": "desc"},
}