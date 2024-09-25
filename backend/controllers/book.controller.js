import mongoose from 'mongoose';
import Book from "../models/book.model.js";

export const getBooks = async (req,res) =>{
    try {
        const books = await Book.find({});
        res.status(200).json({success: true, data: books});

    } catch (error) {
        console.log("error in fetching book records: ", error.message);
        res.status(404).json({success:false, message: "Book not found"});
    }
};

export const createBook = async (req,res) => {
    const book = req.body; // user will send this body

    if(!book.title){
        return res.status(400).json({success: false, message : "Please Provide Title of the Book"});
    }

    const newBook = new Book(book);

    try {
        await newBook.save();
        res.status(201).json({success: true, data: newBook});

    } catch (error) {
        console.log("Error in Creating New Book Record: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});

    }
};

export const updateBook = async (req,res) => {
    const { id } = req.params; // user will send this body
    const book = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Book not found"});
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id,book,{new : true});
        res.status(200).json({success: true, data: updatedBook});
    } catch (error) {
        console.log("Error in Updating Book Record: ", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const deleteBook = async (req,res) => {
    const { id } = req.params; // user will send this body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false, message: "Book not found"});
    }

    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Book Deleted"});

    } catch (error) {
        console.log("Error in Deleting Book Record: ", error.message);
        res.status(500).json({success:false, message: "Server error"});

    }
};