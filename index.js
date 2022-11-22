const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const port = process.env.PORT || 5000;
//midlewares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.nbna82s.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run(){
    try {
        const productsCollection = client.db('noushinsGallery').collection('products');
        
        //create product
        app.post('/products', async(req, res)=> {
            const product = req.body;
            console.log(product);
            const result = await productsCollection.insertOne(product);
            res.send(result);
        })

    } catch (error) {
        console.log(eror);
    }
    finally{

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res)=> {
res.send(`Noushin's Gallery Server is Running`)
});
app.listen(port, ()=> {
    console.log(`Noushin's Gallery Server is Running on port ${port}`);
})