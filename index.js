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
    const childrenCollection = database.collection('Childrens')
    const literaryCollection = database.collection('literaryfiction')
    const userCollection = database.collection('users')
    const instructorCollection = database.collection('instructors')
    console.log('database connected')

    //  ################ children API START HERE ######################

    //  ++++++++++++++++  send childrens to the database ++++++++++++++
    app.post('/childrens', async (req, res) => {
      const children = req.body
      const result = await childrenCollection.insertOne(children)
      res.json(result)
    })

    // +++++++++++++++++ update data into products collection ++++++++
    app.put('/childrens/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      console.log('updating', id)
      const updatedchildren = req.body
      console.log(updatedchildren)
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          image : updatedchildren.image,
          title : updatedchildren.title,
          price : updatedchildren.price,
          totalClass : updatedchildren.totalClass,
          totalSheet : updatedchildren.totalSheet,
          totalHours : updatedchildren.totalHours,
          totalStudent : updatedchildren.totalStudent,
          
        },
      }
      const result = await childrenCollection.updateOne(
        filter,
        updateDoc,
        options,
      )
      console.log('updating', id)
      res.json(result)
    })

  
    //  ++++++++++++++++++++ get all childrens +++++++++++++++++++++++++++
    app.get('/childrens', async (req, res) => {
      const cursor = childrenCollection.find({})
      const children = await cursor.toArray()
      res.send(children)
    })


    // +++++++++++++++++++ get a single children from children collection ++++++++
    app.get('/childrens/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: ObjectId(id) }
      const children = await childrenCollection.findOne(query)
      res.json(children)
    })

    

    // ++++++++++++++++ delete a data from children collection +++++++++++++++++
    app.delete('/childrens/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: new ObjectId(id) }
      const result = await childrenCollection.deleteOne(query)
      res.json(result)
    })

    //  ################ children API END HERE ######################

    //  ################ literaryfiction API START HERE ######################

    //  ++++++++++++++++  send literaryfiction to the database ++++++++++++++
    app.post('/literaryfiction', async (req, res) => {
      const literaryfiction = req.body
      const result = await literaryCollection.insertOne(literaryfiction)
      res.json(result)
    })

    // +++++++++++++++++ update data into products collection ++++++++
    app.put('/literaryfiction/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      console.log('updating', id)
      const updatedliteraryfiction = req.body
      console.log(updatedliteraryfiction)
      const filter = { _id: new ObjectId(id) }
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          image : updatedliteraryfiction.image,
          title : updatedliteraryfiction.title,
          price : updatedliteraryfiction.price,
          totalClass : updatedliteraryfiction.totalClass,
          totalSheet : updatedliteraryfiction.totalSheet,
          totalHours : updatedliteraryfiction.totalHours,
          totalStudent : updatedliteraryfiction.totalStudent,

        },
      }
      const result = await literaryCollection.updateOne(
        filter,
        updateDoc,
        options,
      )
      console.log('updating', id)
      res.json(result)
    })


    //  ++++++++++++++++++++ get all literaryfiction +++++++++++++++++++++++++++
    app.get('/literaryfiction', async (req, res) => {
      const cursor = literaryCollection.find({})
      const literaryfiction = await cursor.toArray()
      res.send(literaryfiction)
    })


    // +++++++++++++++++++ get a single literaryfiction from literaryfiction collection ++++++++
    app.get('/literaryfiction/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: ObjectId(id) }
      const literaryfiction = await literaryCollection.findOne(query)
      res.json(literaryfiction)
    })


    // ++++++++++++++++ delete a data from literaryfiction collection +++++++++++++++++
    app.delete('/literaryfiction/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: new ObjectId(id) }
      const result = await literaryCollection.deleteOne(query)
      res.json(result)
    })

    //  ################ literaryfiction API END HERE ######################


    //  ################ user API START HERE ######################

    // ++++++++++++++++  send user to the database ++++++++++++++

    app.post('/users', async (req, res) => {
      const user = req.body
      const result = await userCollection.insertOne(user)
      res.json(result)
    })

    //  ++++++++++++++++++++ get all users +++++++++++++++++++++++++++
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find({})
      const user = await cursor.toArray()
      res.send(user)
    })

    // +++++++++++++++++++ get a single user from children collection ++++++++
    app.get('/users/:id([0-9a-fA-F]{24})', async (req, res) => {
      const id = req.params.id.trim()
      const query = { _id: ObjectId(id) }
      const user = await userCollection.findOne(query)
      res.json(user)
    })

    
    //  ################ INSTRUCTOR API START HERE ################


    
    // ++++++++++++++ send instructor info to the databse +++++++++++++++

    app.post('/instructors', async(req,res)=>{
      const instrutor = req.body;
      const result = await instructorCollection.insertOne(instrutor); 
      res.json(result);
    })

     // ++++++++++++++++++ get all instructors+++++++++++++++++

    app.get('/instructors', async (req,res)=>{
      const cursor = instructorCollection.find({})
      const instrutor = await cursor.toArray()
      res.send(instrutor);
    })

  //  ++++++++++++++++++++ update instructor into instructor collection +++++++++
    app.put('/instructors/:id([0-9a-fA-F]{24})', async(req,res)=>{
      const id = req.params.id.trim();
      const updateInstrutor = req.body;
      const filter = {_id: new ObjectId(id)}
      const options = {upsert:true}
      const updateDoc ={
        $set : {
          image : updateInstrutor.image,
          name  : updateInstrutor.name,
          designation : updateInstrutor.designation,
          institute : updateInstrutor.institute,
          facebook : updateInstrutor.facebook,
          github : updateInstrutor.github,
          linkedin : updateInstrutor.linkedin
        },
      }
      const result = await instructorCollection.updateOne(
        filter,
        updateDoc,
        options,
      )
      console.log('updating', id)
      res.json(result)
    })
   

  // +++++++++++++++++++  get a single instructor information from instructores collection ++++++++++++++
    app.get('/instructors/:id([0-9a-fA-F]{24})', async(req,res)=>{
      const id = req.params.id.trim()
      const query = {_id: ObjectId(id)}
      const instrutor = await instructorCollection.findOne(query)
      res.json(instrutor)
    })
    // +++++++++++++ delete a instructor information from instructor collection +++++
    app.delete('/instructors/:id([0-9a-fA-F]{24})', async(req,res)=>{
      const id = req.params.id.trim();
      const query = {_id : ObjectId(id)}
      const result = await instructorCollection.deleteOne(query)
      res.json(result)
    })
    //  ################ INSTRUCTOR API START HERE ################
  } finally {
  }
}
run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Running CPS app')
})

app.listen(port, () => {
  console.log(`CPS on port ${port}`)
})
