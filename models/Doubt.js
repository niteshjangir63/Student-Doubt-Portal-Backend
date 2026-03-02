const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "answered"],
            default: "pending",
        },
        studentName: {
            type: String,
            required: true,
        },
        studentId: {
            type: String,
            required: true,
        },
        teacherName: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Doubt", doubtSchema);