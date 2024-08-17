const Book = require('../models/book.model');
const Borrow = require('../models/borrow.model');
const User = require('../models/user.model');

const borrow_book = async (req, res) => {

    const book_id = req.params.id;
    const user_id = req.user._id;

    if (!book_id) {
        return res.status(400).json({ error: 'Book ID is required' });
    }

    try {

        const book = await Book.findById(book_id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({ message: 'Book is not available' });
        }

        const borrow = new Borrow({
            user: user_id,
            book: book_id,
            borrowDate: new Date()
        });
        await borrow.save();

        book.availableCopies--;
        await book.save();

        const user = await User.findByIdAndUpdate(user_id, { $push: { borrow_history: borrow._id } }, { new: true });

        res.status(201).json({ message: 'Book borrowed successfully', borrow });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error borrowing book' });
    }
}

const return_book = async (req, res) => {

    const borrow_id  = req.params.id;
    const user_id = req.user._id;

    try {
        const borrow = await Borrow.findById(borrow_id);
        if (!borrow) {
            return res.status(404).json({ message: 'Borrow record not found' });
        }

        if (borrow.user.toString() !== user_id.toString()) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const borrow_update = await Borrow.findByIdAndUpdate(borrow_id, {$set:{ returned: true, returnDate:new Date() }}, { new: true });

        const book = await Book.findOne({_id:borrow.book});
        book.availableCopies++;
        await book.save();

        res.status(200).json({ message: 'Book returned successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error returning book'
        });
    }
}

const borrow_history = async (req, res) => {
        const user_id  = req.user._id;

        try {
          const borrows = await Borrow.find({ user: user_id })
            .populate('book') 
            .sort('-createdAt'); 
            console.log(borrows);

          res.status(200).json({data:borrows, message:" data fetched succesfully"});

        } catch (error) {
          console.error(error.message);
          res.status(500).json({ error: 'Error fetching borrow history' });
        }
      
}

module.exports = {

    borrow_book,
    return_book,
    borrow_history,

}