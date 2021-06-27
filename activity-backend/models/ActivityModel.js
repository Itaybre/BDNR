module.exports = {
    fields:{
        type : "text",
        title : "text",
        user_id : "int",
        date : "timestamp",
        photo_url: "text",
        photo_comment: "text",
        publication_text: "text",
        manual: "boolean",
        manual_type: "text",
        duration: "int",
        distance: "int",
        description: "text",
        effort: "int",
        speed: "text",
        cadence: "text",
        calories: "int"
    },
    key:["user_id"]
}