const express = require('express');
require('dotenv').config();
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 7890;

app.use(morgan('dev'));

app.use(express.json());

const userRoute = require('./routes/userRoutes');
app.use('/api/v1', userRoute)

const postRoutes = require('./routes/postRoutes');
app.use('/api/v1/post', postRoutes)

const commentRoutes = require('./routes/commentRoutes');
app.use('/api/v1/comment', commentRoutes);


app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})