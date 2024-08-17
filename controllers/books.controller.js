const Book = require('../models/book.model');

const add_book = async(req,res) =>{

     try{
        const { tittle, author, isbn, publicationDate, genre, availableCopies } = req.body;
        console.log(req.body)
        const book_added = await Book.create({
            title: tittle,
            author:author,
            isbn: isbn,
            publicationDate: publicationDate,
            genre: genre,
            availableCopies: availableCopies
        });

        console.log(book_added);
        res.status(200).json({status: "success", message:"book successfully added"});


    }catch(err){
        console.log(err.message);
        res.status(500).json({status: "failed", message:"Something went wrong"});
    }
}

const edit_book = async(req, res) => {
    const book_id = req.params.id;
    const update_data = req.body;

    if(!book_id){
        return res.status(400).json({ error: 'Book ID is required' });
    }

    try{

        const updated_book = await Book.findByIdAndUpdate(book_id, { $set: update_data },{ new: true });
        console.log(updated_book);
        res.status(200).json({status: "success", message:"book successfully updated", data: updated_book });

    } catch(err){

        res.status(500).json({status: "failed", message:"Something went wrong"});

    }
     
}

const delete_book = async( req, res) => {
    const book_id = req.params.id;
    if(!book_id){
        return res.status(400).json({ error: 'Book ID is required' });
    }

    try{
        const book = await Book.findByIdAndUpdate(book_id, { isDeleted: true });
        if (!book) {
          throw new Error('Book not found');
        }

        res.status(200).json({status: "success", message:"book successfully deleted", data: book });

    }catch(err){

        res.status(500).json({status: "failed", message:"Something went wrong"});

    }

}

const list_books = async(req, res)=>{

    const { page, size, title, author, genre } = req.query;

    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(size, 10) || 10,
    };
  
    const filter = {};
    if (title) filter.title = new RegExp(title, 'i');
    if (author) filter.author = new RegExp(author, 'i');
    if (genre) filter.genre = new RegExp(genre, 'i');
    filter.isDeleted = false;
  
    try {
      const books = await Book.aggregate([
        { $match: filter },
        { $sort: { createdAt: -1 } }, 
        { $skip: (options.page - 1) * options.limit },
        { $limit: options.limit }
      ]);
  
      const count = await Book.countDocuments(filter);
  
      res.status(200).json({
        status:"success",
        books,
        currentPage: options.page,
        pageSize: options.limit,
        totalBooks: count
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
}


module.exports = {
    add_book,
    edit_book,
    delete_book,
    list_books
}