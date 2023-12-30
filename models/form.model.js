const mongoose = require('mongoose');
const { ANSWER_TYPES_ENUM } = require('../constant');

const questionsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ANSWER_TYPES_ENUM
    },
    title: {
        type: String,
        required: true
    },
    isRequired: {
        type: Boolean,
        default: false
    },
    options: [String],
});


const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    questions: [questionsSchema],
});

module.exports = mongoose.model('Form', formSchema);
