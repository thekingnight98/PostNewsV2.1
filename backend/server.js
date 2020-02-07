const express = require('express');

const cors = require('cors');

// ต่อ base
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000



app.use(cors());
app.use(express.json());



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo database connect successfully');
});

const newsrouter = require('./routes/postnews');


app.use('/news', newsrouter);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})