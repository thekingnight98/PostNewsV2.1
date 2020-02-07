const mongoose = require('mongoose');

const Schema = mongoose.Schema;


// var tagSchema = mongoose.Schema({
//     text: String
// });

const NewsSchema = new Schema({
    title: { type: String, required: true },
    detail: { type: String, required: true },
    category: { type: String, required: true },
    // file: { type: String, required: true },
    tags: { type: Array, required: true }
}, {
    timestamps: true
});

const PostNews = mongoose.model('News', NewsSchema);

module.exports = PostNews;