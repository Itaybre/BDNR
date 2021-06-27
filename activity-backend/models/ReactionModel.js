module.exports = {
    fields:{
        activityId : "uuid",
        reactionUser : "uuid",
        text: "text",
        isKudos: "boolean",
        date: "timestamp"
    },
    key:["activityId", "date"]
}