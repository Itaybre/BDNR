module.exports = {
    fields:{
        activityId : "uuid",
        reactionUser : "uuid",
        text: "text",
        isKudos: "boolean"
    },
    key:["activityId", "isKudos"]
}