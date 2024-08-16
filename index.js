
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

//routes


//routing
app.get('/', (req, res) =>{
    res.send("hii, i am working");
})


const server = app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
  });
  