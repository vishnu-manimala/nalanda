
const connect  = require('./database/db.connect');
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser');

require('dotenv').config();

connect();

const PORT = process.env.PORT;

app.use(cookieParser()); 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/auth/register.admin',(req,res)=>{
//     console.log(req.body);
//     res.send(req.body);
// })

//routes
const auth_route = require("./routers/auth.router");
const book_route = require("./routers/book.router");
const borrow_route = require("./routers/borrow.router");
const admin_route = require("./routers/admin.router");

//routing
app.use("/auth", auth_route);
app.use("/book",book_route);
app.use("/borrow",borrow_route);
app.use("/admin",admin_route);

const server = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
  