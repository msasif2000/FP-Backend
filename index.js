const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000
// middle ware
app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://booklet:QqcV1NpG1r7dfybE@spartanduo.uuix98d.mongodb.net/?retryWrites=true&w=majority`, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

});

const db = mongoose.connection;

db.on('error', (err) => {

    console.log(`Connection error: ${err}`);

});

db.once('open', () => {

    console.log('Connected to MongoDB');

});

app.get('/', (req, res) => {
  res.send('Booklet App is running')
})

app.listen(port, () => {
  console.log(`Booklet  on port ${port}`)
})