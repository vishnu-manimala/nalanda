Nalanda
﻿

POST
https://nalanda.store/auth/login
https://nalanda.store/auth/login
user or admin can logn using this end point. email and password should be proviuded with this end point in body. the response will be an object .
example.
{    "message": "Login successful",   

"data": {       

"_id": "66c0ddb262076632b61d5072",       

"name": "vijith",  "email": "vijith@gmail.com", 

"password": "$2b$10$x3lotOF71oa664NojoUAgeOagUjMjN4vU6bA9NQ74P1Bp/5qxDbxy",        "role": "admin",        "borrow_history": [],       

"createdAt": "2024-08-17T17:28:18.602Z",       

"__v": 0    }

}

﻿

Body
urlencoded
email
password
POST
https://nalanda.store/auth/register
https://nalanda.store/auth/register
user can register using end point. ens point should conatin the role.
response will be an object.
{    "status": "success",    "message": " successfully registered"}

﻿

Body
urlencoded
name
vijith
should be string

email
vijith@gmail.com
should be string

password
vijith123
should be string

role
admin
either admin or member

POST
https://nalanda.store/auth/refreshtoken
https://nalanda.store/auth/refreshtoken
this end point is used to send refresh token to backend to generate accesstoken in case the access token is expired. refresh token should be added from cookie

﻿

POST
https://nalanda.store/book/add?title&author&isbn&publicationDate&genre&availableCopies
https://nalanda.store/book/add
bearer token should be added to the authorization.

﻿

Authorization
Bearer Token
Token
<token>
Body
urlencoded
title
mathilukal
author
basheer
isbn
4356764323
publicationDate
12/02/1995
genre
novel
availableCopies
23
PATCH
https://nalanda.store/book/edit
https://nalanda.store/book/edit
﻿

Body
urlencoded
title
author
isbn
publicationDate
genre
availableCopies
DELETE
https://nalanda.store/book/delete/id
https://nalanda.store/book/delete/id
﻿https://nalanda.store/book/delete/id this end point is used to delete a book from book data base so the is of the book should be mention as a param. and token should be added in authorization as bearer token.

﻿

GET
https://nalanda.store/book/list
https://nalanda.store/book/list?page&author&genre&tittle
this end point is for retrieving book list from server with pagination adn filter. so these data shoul be sent as query along with the request

﻿

Query Params
page
number

author
string

genre
string

tittle
string

POST
https://nalanda.store/borrow/book/id
https://nalanda.store/borrow/book/id
This end point is for borrow book from nalanda. so the book shoulbd be sent with request as param.

﻿

POST
http://localhost:3000/borrow/return/66bfa43dc41c9fd6939f5efa
http://localhost:3000/borrow/return/66bfa43dc41c9fd6939f5efa
This end point is for returning a book that you borrowed before. the id should be send as param with this request.

﻿

GET
http://localhost:3000/borrow/history
http://localhost:3000/borrow/history
This end point is for requesting borrow history from server. access token should be sent with this reuest as it sends with all the request.

﻿

GET
https://nalanda.store/admin/most_borrowed_book
https://nalanda.store/admin/most_borrowed_book
this end point will get you most borroed book from server.

﻿

GET
https://nalanda.store/admin/active_members
https://nalanda.store/admin/active_members
this end point will get you the most active menvers from server with user datails.

﻿

GET
https://nalanda.store/admin/book_availability
https://nalanda.store/admin/book_availability
This end point is for getting available book from server. token will be sent over request as usual.

﻿

