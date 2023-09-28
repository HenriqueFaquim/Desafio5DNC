const mongoose = require('mongoose')

const BooksSchema = mongoose.Schema(
{
    id:{
        type: Number,
        required: true,
        unique: true,
    },
    title:{
        type: String,
        required: true,
    },
    pages:{
        type: Number,
        required: false,
    },
    ISBN:{
        type: Number,
        required: false,
    },
    editora:{
        type: String,
        required: false,
    }
}
);

const Book = mongoose.model('Book', BooksSchema);

module.exports = Book