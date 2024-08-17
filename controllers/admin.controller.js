const Borrow = require('../models/borrow.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

const most_borrowed_book = async( req, res) =>{
    try {
        const max_borrowed_books = await Borrow.aggregate([
          {
            $group: {
              _id: '$book',
              count: { $sum: 1 }
            }
          },
          {
            $lookup: {
              from: 'book',
              localField: 'book',
              foreignField: '_id',
              as: 'book'
            }
          },
          {
            $unwind: '$book'
          },
          {
            $project: {
              bookId: '$_id',
              title: '$book.title',
              author: '$book.author',
              borrowCount: '$count'
            }
          },
          {
            $sort: { borrowCount: -1 }
          },
          {
            $limit: 10 
          }
        ]);
        console.log(max_borrowed_books)
        res.status(200).json({message: "succesfully fetched data", data: max_borrowed_books});

      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error fetching most borrowed books' });

      }
}

const active_members = async( req, res ) => {
    try {
        const most_active_members = await Borrow.aggregate([
          {
            $group: {
              _id: '$user',
              borrowCount: { $sum: 1 }
            }
          },
          {
            $lookup: {
              from: 'user',
              localField: 'user',
              foreignField: '_id',
              as: 'user'
            }
          },
          // {
          //   $unwind: '$user'
          // },
          // {
          //   $project: {
          //     userId: '$_id',
          //     name: '$user.name',
          //     borrowCount: '$count'
          //   }
          // },
          // {
          //   $sort: { borrowCount: -1 }
          // },
          // {
          //   $limit: 10 
          // }
        ]);
    
        res.json({message:" data succesfully fetched", data: most_active_members});

      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error fetching most active members' });
      }
}

const book_availability = async(req, res) => {
    try {
        const borrowed_books_data = await Borrow.aggregate([
          // {
          //   $match: { returned: false }
          // },
          // {
          //   $group: {
          //     _id: '$book',
          //     count: { $sum: 1 }
          //   }
          // },
          {
            $lookup: {
              from: 'book',
              localField: 'book',
              foreignField: '_id',
              as: 'book'
            }
          },
          // {
          //   $unwind: '$book'
          // },
          // {
          //   $project: {
          //     bookId: '$_id',
          //     title: '$book.title',
          //     borrowCount: '$count',
          //     availableCopies: '$book.availableCopies'
          //   }
          // }
        ]);
    
        
        console.log(borrowed_books_data)
        res.json({message: "data fetched successfully", data: borrowed_books_data });

      } catch (error) {

        console.error(error);
        res.status(500).json({ error: 'Error fetching book availability' });

      }
}

module.exports = {
    most_borrowed_book,
    active_members,
    book_availability
}