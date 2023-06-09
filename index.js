const express = require('express')
const { MongoClient } = require('mongodb')

const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
const app = express()
const port = 5000

// middle ware
app.use(cors())
app.use(express.json())


// CONNECTION URL
 const uri = `mongodb+srv://booklet:QqcV1NpG1r7dfybE@spartanduo.uuix98d.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})


async function run() {
  try {
    await client.connect()
    const database = client.db('Booklet')
    const allBookCollection = database.collection('allBooks')
    const userCollection = database.collection('Signup')
    const feedbackCollection = database.collection('feedback')
    console.log('database connected')

    //  ################ feedback API START HERE ######################
    //  ++++++++++++++++  send feedback to the database ++++++++++++++
    app.post('/feedback', async (req, res) => {
      const feedback = req.body
      const result = await feedbackCollection.insertOne(feedback)
      res.json(result)
    })

    // +++++++++++++++++ update data into book collection ++++++++
    app.put('/feedback/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      console.log('updating', id)
      const updatedfeedback = req.body
      console.log(updatedfeedback)
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          uname : updatedfeedback.name,
          mail : updatedfeedback.email,
          message : updatedfeedback.message,
        },
      }
      const result = await feedbackCollection.updateOne(
        filter,
        updateDoc,
        options,
      )
      console.log('updating', id)
      res.json(result)
    })
    

    //  ################ allBook API START HERE ######################

    //  ++++++++++++++++  send allbooks to the database ++++++++++++++
    app.post('/allbooks', async (req, res) => {
      const allBook = req.body
      const result = await allBookCollection.insertOne(allBook)
      res.json(result)
    })

    // +++++++++++++++++ update data into book collection ++++++++
    app.put('/allbook/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      console.log('updating', id)
      const updatedallBook = req.body
      console.log(updatedallBook)
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          bookname : updatedallBook.bookname,
          author_name : updatedallBook.author_name,
          description : updatedallBook.description,
          category : updatedallBook.category,
          url : updatedallBook.url,
          img : updatedallBook.img,
          date : Date.now(),
        },
      }
      const result = await allBookCollection.updateOne(
        filter,
        updateDoc,
        options,
      )
      console.log('updating', id)
      res.json(result)
    })

  
    //  ++++++++++++++++++++ get all allbooks +++++++++++++++++++++++++++
    app.get('/allbook', async (req, res) => {
      const cursor = allBookCollection.find({})
      const allBook = await cursor.toArray()
      res.send(allBook)
    })


    // +++++++++++++++++++ get a single allBook from allBook collection ++++++++
    app.get('/allbook/:id([0-9a-fA-F]{24})', async (req, res) => {
      console.log(req.params.id)
      const id = req.params.id.trim()
      console.log('getting single product', id)
      const query = { _id: ObjectId(id) }
      const allBook = await allBookCollection.findOne(query)
      console.log('single product', allBook)
      res.json(allBook)
    })

    

    // ++++++++++++++++ delete a data from allBook collection +++++++++++++++++
    app.delete('/allbook/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: new ObjectId(id) }
      const result = await allBookCollection.deleteOne(query)
      res.json(result)
    })

    //  ################ allBook API END HERE ######################


    //  ################ user API START HERE ######################

    // ++++++++++++++++  send user to the database ++++++++++++++

    app.post('/signup', async (req, res) => {
      const user = req.body
      const email=user.email
      const name=await userCollection.findOne({email:email})
      if(name){
        res.send({status:"User Already Exist"})
      }
      else{
        const result = await userCollection.insertOne(user)
        res.json(result)
      }
    })

    //  ++++++++++++++++++++ get all Signup +++++++++++++++++++++++++++
    app.get('/Signup', async (req, res) => {
      const cursor = userCollection.find({})
      const user = await cursor.toArray()
      res.send(user)
    })

    // +++++++++++++++++++ get a single user from allBook collection ++++++++
    app.get('/Signup/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: ObjectId(id) }
      const user = await userCollection.findOne(query)
      res.json(user)
    })
    
    app.post('/signin', async (req, res) => {
      const user = req.body
      const email=user.email
      const password=user.password

      const emailcheck=await userCollection.findOne({email:email})
      if(emailcheck){
        const passwordcheck=await userCollection.findOne({password:password})
        if(passwordcheck){
          res.send({status:"Login Successfull",
          isUser:true})
        }
        else{
          res.send({status:"Invalid"})
        }
      }
      else{
        res.send({status:"No Such User"})
      }
    })


  }
  finally {
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Running Booklet app')
})

app.listen(port, () => {
  console.log(`Booklet on port ${port}`)
})
