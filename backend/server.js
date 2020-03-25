const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');

// ต่อ base
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000



app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 100000, }));



const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Mongo database connect successfully');
});

const newsrouter = require('./routes/postnews');
// const User = require('./routes/user.route')


app.use('/news', newsrouter);
// app.use('/api', User)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})