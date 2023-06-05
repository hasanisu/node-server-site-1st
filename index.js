const express = require('express')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())
app.get('/', (req, res) => {
    res.send('Node api is running')
  });

  const users =[
    {id:1, name: "Sabana", email: 'sabana@gmail.com' },
    {id:2, name: "Sabnoor", email: 'sabanoor@gmail.com' },
    {id:3, name: "Sabila", email: 'sabila@gmail.com' }
]

app.get('/users', (req, res)=>{
    res.send(users)
})

app.post('/users', (req, res)=>{
    console.log('Post API called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    console.log(req.body)
    res.send(user);
})
  

  app.listen(port, () => {
    console.log(`Node api is running on port ${port}`)
  })