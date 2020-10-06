
const express = require('express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
var uri = "mongodb://volunteer:Qv2hIPG17ZonkDhS@cluster0-shard-00-00.ngcri.mongodb.net:27017,cluster0-shard-00-01.ngcri.mongodb.net:27017,cluster0-shard-00-02.ngcri.mongodb.net:27017/volunteer?ssl=true&replicaSet=atlas-ulchf4-shard-0&authSource=admin&retryWrites=true&w=majority";
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const port = 5000



MongoClient.connect(uri, function(err, client) {
  const projectCollection = client.db("volunteer").collection("works");
      app.post('/addProject',(req, res) => {
        const newBooking = req.body;
        projectCollection.insertOne(newBooking)
        .then(result =>{
          res.send(result.insertCount > 0)
        })
        console.log(newBooking)
      })
      app.get('/bookings',(req,res) =>{
        projectCollection.find({email: req.query.email})
        .toArray((err, documents) => {
          res.send(documents)
        })
      })
    });


    




 app.get('/', (req, res) => {
   res.send('Hello world')
})   
app.listen(5000)