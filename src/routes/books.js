var express = require('express');
const ConnectToDB = require('../middlewares/ConnectToDB');
const Book = require('../models/BooksSchema');
const handleErrors = require('../functions/handleErrors');
var router = express.Router();

router.post('/create', ConnectToDB, async function(req, res) {
  try {
    let {id, title, pages, ISBN, editora} = req.body;
    const resBD = await Book.create({id, title, pages, ISBN, editora})

    res.status(200).json({
      status: "Okay",
      statusMessage: "The book has been registered successfully.",
      menssage: resBD,
    })

  } catch (error) {
    if(String(error).includes("id_1 dup key")){
      return handleErrors(res, "Error: The ID has already been registered, please choose another one")
    }
    return handleErrors(res,error);
  }
});

router.get('/read', ConnectToDB, async function(req, res) {
  try {
    const resBD = await Book.find();

    res.status(200).json({
      status: "Okay",
      statusMessage: "Below is the list of books.",
      menssage: resBD,
    })

  } catch (error) {
    return handleError(res,error);
  }
});

router.put('/update/:id', ConnectToDB, async function(req, res) {
  try {
    let idBook = req.params.id
    let { title, pages, ISBN, editora } = req.body;
    const book = await Book.findOne({id: idBook});

    //se o livro não existir
    if(!book){
      throw new Error("Livro não encontrado!");
    }
    const resBD = await Book.updateOne({ id: idBook },{ title, pages, ISBN, editora })
    if(resBD?.modifiedCount>0){
    const newbook = await Book.findOne({id: idBook});
    res.status(200).json({
      status: "Okay",
      statusMessage: "The book was successfully changed.",
      menssage: newbook,
    })
  }
  } catch (error) {
    return handleErrors(res,error);
  }
});

router.delete('/delete/:id', ConnectToDB, async function(req, res) {
  try {
    let idBook = req.params.id
    const book = await Book.findOne({ id: idBook });
    if(!book){
      throw new Error("Livro não encontrado!");
    }
    const respDB = await Book.deleteOne({id: idBook});
    res.status(200).json({
      status: "Okay",
      statusMessage: "The book has been successfully deleted.",
      menssage: book,
    })

  } catch (error) {
    return handleErrors(res,error);
  }
});

module.exports = router;
