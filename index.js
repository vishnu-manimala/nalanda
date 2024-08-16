
const connect  = require('./database/db.connect');
const express = require('express');
const app = express();
const cors = require("cors");

require('dotenv').config();

connect();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/auth/register.admin',(req,res)=>{
//     console.log(req.body);
//     res.send(req.body);
// })
//routes
const auth_route = require("./routers/auth.router");


//routing
app.use("/auth", auth_route);


const server = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
  