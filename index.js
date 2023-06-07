const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Node api is running')
  });

  const users =[
    {id:1, name: "Sabana", email: 'sabana@gmail.com' },
    {id:2, name: "Sabnoor", email: 'sabanoor@gmail.com' },
    {id:3, name: "Sabila", email: 'sabila@gmail.com' },
];

//username: hasan-on
//password: 6x1QSvCbl3qsuf4r





const uri = "mongodb+srv://hasan-on:6x1QSvCbl3qsuf4r@cluster0.3ycwlgh.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const userCollection = await client.db("simpleDb").collection('users');
    // const user = {name: 'jony', email:'jony@gmail.com'}
    // const result = await userCollection.insertOne(user)
    // console.log(result);

    app.get('/users', async (req, res)=>{
      const cursor = userCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    })

    app.post('/users', async (req, res)=>{
      const user = req.body;
      user.id = users.length + 1;
      // users.push(user)
      const result = await userCollection.insertOne(user)
      console.log(result);
      user._id = result.insertedId;
      res.send(user);
  })
    
  } 
  finally {
    // await client.close();
  }
}
run().catch(console.dir);





// app.get('/users', (req, res)=>{
//   if(req.query.name){
//     const search = req.query.name;

//     console.log(req.query.name);
//     const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
//     res.send(filtered);
//   }
//   else{
//     res.send(users)
//   }
    
// });

// app.post('/users', (req, res)=>{
//     const user = req.body;
//     user.id = users.length + 1;
//     users.push(user)
//     console.log(req.body)
//     res.send(user);
// })
  

  app.listen(port, () => {
    console.log(`Node api is running on port ${port}`)
  })