Nalanda Library Management System API Documentation

Nalanda is a backend system designed to manage library operations efficiently. It provides a robust API for interacting with library data, including book management, user accounts, and borrowing/returning books. It is hosted in AWS EC2. 

This documentation outlines the endpoints, request/response formats, and authentication mechanisms for the Nalanda API.


Authentication

  1. Login (POST https://nalanda-18pz.onrender.com/auth/login)

      Description: Authenticates a user with their email and password.
      Request Body:
          email (string): User's email address.
          password (string): User's password.
      Response:
          Success (200 OK):
          accessToken: (string) JWT access token for authorized requests.
          refreshToken: (string) Long-lived token for refreshing access token.

          Failure (401 Unauthorized): Invalid credentials or other authentication errors.
                  
      
  2. Register (POST https://nalanda-18pz.onrender.com/auth/register)
      
      Description: Creates a new user account.
      Request Body:
          name (string): User's full name.
          email (string): User's email address.
          password (string): User's password.
          role (string):  "member" | "user".
     
      Response:
          Success (201 Created): 
          message: "Registration successful"
          Failure (500): server error.
         
  3. Refresh token (POST https://nalanda-18pz.onrender.com/auth/refreshtoken)

      Description: to recreate a accesstoken if the sending refresh token is valid otherwise it will send an error messgae which says login again.
     
      Request Body:
          send refresh token in cookies.

      Response:
          Success (200 OK): new accestoken is returned
          accessToken: (string) JWT access token for authorized requests.
          

          Failure (403 ): Invalid credentials or other authentication errors so login again.


User Actions (Requires Authentication) https://nalanda-18pz.onrender.com

  1. Borrow Book  (POST https://nalanda-18pz.onrender.com/borrow/book)
          Description: Borrows a book for a user.
          Path Parameters:
              bookId (string): ID of the book to borrow.
              Authorization: Bearer token
     
          Response:
              Success (200 OK):
              message: "Book borrowed successfully"
              
              Failure (400 Bad Request): Book unavailable or other errors.
              Failure (401 Unauthorized): Unauthorized access.
              Failure (404 Not Found): Book not found in db.
              Failure (500 internal server error): internal server error.
     
  3. Return Book  (POST https://nalanda-18pz.onrender.com/borrow/return)
        Description: Returns a borrowed book.
        Path Parameters:
            borrowId (string): ID of the borrow record.
            Authorization: Bearer token
        Response:
            Success (200 OK):
            message: "Book returned successfully"
            Failure (400 Bad Request): Invalid borrow ID or other errors.
            Failure (401 Unauthorized): Unauthorized access.
            Failure (404 Not Found): Book not found in db.
            Failure (500 internal server error): internal server error.
     
  5. Borrow history  (POST https://nalanda-18pz.onrender.com/borrow/history)
            Description: Retrieves a list of books borrowed by the authenticated user.
            Authorization: Bearer token
            Response:
              Success (200 OK):
              Array of borrow records, each containing book details and borrow/return dates.
              Failure (401 Unauthorized): Unauthorized access.﻿
              Failure (500 internal server error): internal server error.

Book Management (Admin Only) - https://nalanda-18pz.onrender.com/book/

  1. Add Book (POST https://nalanda-18pz.onrender.com/book/add)

              Description: Adds a new book to the library.
              Request Body:
                  title (string): Book title.
                  author (string): Book author.
                  isbn (number): Book ISBN.
                  publicationDate (string): Book publication date (format: DD/MM/YYYY).
                  genre (string): Book genre.
                  availableCopies (number): Number of available copies.
                  Authorization: Bearer token.
     
              Response:
                  Success (201 Created):
                  Success message
                  Failure (400 Bad Request): Invalid or missing data in request body.
                  Failure (401 Unauthorized): Unauthorized access.
                  Failure (403 Forbidden): You do not have permission to access this resource. (not admin).

  2. Edit Book (PATCH   https://nalanda-18pz.onrender.com/book/edit/:id)

              Description: Edits an existing book.
              Path Parameters:
                  bookId (string): ID of the book to edit.
   
              Request Body:
                  All fields of book with your changed data
                  Authorization: Bearer token with admin role.
   
              Response:
                  Success (200 OK):
                  Updated book details.
                  Failure (400 Bad Request): Invalid or missing data in request body.
                  Failure (401 Unauthorized): Unauthorized access.
                  Failure (403 Forbidden): Insufficient permissions (not admin).
                  Failure (500 server error): something went wrong.

   
  3. Delete Book (DELETE   (https://nalanda-18pz.onrender.com/book/delete/:id)) 

              Description: Deletes a book from the library.
              Path Parameters:
                  bookId (string): ID of the book to delete.
                  Authorization: Bearer token with admin role.
              Response:
                  Success (204 No Content): Book deleted successfully.
                  Failure (401 Unauthorized): Unauthorized access.
                  Failure (403 Forbidden): Insufficient permissions (not admin).
                  Failure (404 Not Found): Book not found.

   4. List Books (GET https://nalanda-18pz.onrender.com/book/list) - all users can see this list

              Description: Retrieves a list of books with optional filtering and pagination.

              Query Parameters:
                  page (number): Page number.
                  author (string): Filter by author.
                  genre (string): Filter by genre.
                  title (string): Filter by title.
                  Authorization: Bearer token (optional for public book listings).
              Response:
                  Success (200 OK):
                  Array of book objects withrespect to pagination and filter information .
                  Failure (401 Unauthorized): Unauthorized access for restricted book data.
                  Server nerror (500)

    5. Most Borrowed Books (GET https://nalanda-18pz.onrender.com/admin/most_borrowed_book)
            Description: Retrieves a list of the most borrowed books.
            Authorization: Bearer token with admin role.
            Response:
                Success (200 OK):
                Array of objects with book details and borrow count.
                Failure (401 Unauthorized): Unauthorized access.
                Failure (403 Forbidden): Insufficient permissions (not admin).
                Server nerror (500)
       
    6. Most Active Members  (GET https://nalanda-18pz.onrender.com/admin/active_members)

            Description: Retrieves a list of the most active members based on borrow count.
            Authorization: Bearer token with admin role.
            Response:
                Success (200 OK):
                Array of user objects with borrow count.
                Failure (401 Unauthorized): Unauthorized access.
                Failure (403 Forbidden): Insufficient permissions (not admin).
       
    7. Book Availability (GET https://nalanda-18pz.onrender.com/admin/book_availability)

          Description: Retrieves a summary of book availability.
          Authorization: Bearer token with admin role.
          Response:
                Success (200 OK):
                Object with totalBooks, totalBorrowedBooks, and availableBooks counts.
                Failure (401 Unauthorized): Unauthorized access.
                Failure (403 Forbidden): Insufficient permissions (not admin).




