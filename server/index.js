const express = require('express')
var cors = require('cors');

const PicoDB = require('picodb');
const db = PicoDB();

const app = express();

app.use(cors());
app.use(express.json())

const port = 3000

const isValidIpv4 = ( value) =>{
  if(value.length >=7 && value.length <= 15 &&  
      /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(value)){
      return true
  }
  return false;

}

app.post('/gateway/create', async (req, res) => {
  const gateway = req.body;

  try{
    const elements = await db.find({serial: gateway.serial}).toArray();
    if(elements.length > 0 || gateway.devices.length > 10){
      res.status(500).send({message: 'Element exist or maximum devices by gateway exceeded'});
      return;
    }

    if(!isValidIpv4(gateway.ipv4)){
      res.status(500).send({message: 'Address ipv4 not valid'});
      return;
    }
    const items = await db.insertOne(gateway);
    res.status(201).send(items[0]);
  }
  catch(error){
    res.status(500).send({message: 'System fail'});
  }
});

app.get('/gateway/list', async (req, res) => {

  try{
    const items = await db.find({}).toArray();
    res.status(200).send(items);
  }
  catch(error){
    res.status(500).send({message: 'System fail'});
  }
});

app.post('/gateway/remove', async (req, res) => {
  const gateway = req.body; 

  try{

    const num = await db.deleteOne({ _id: gateway._id });

    if(num == 1){
      res.status(200).send(gateway);
    }
    else{
      res.status(500).send({message: 'Can not remove item. Item not found'});
    }
  }
  catch(error){
    res.status(500).send({message: 'System fail'});
  }
});

app.post('/gateway/update', async (req, res) => {
  const gateway = req.body;

  try{
    if( gateway.devices.length > 10){
      res.status(500).send({message: 'Maximum devices by gateway exceeded'});
      return;
    }

    if(!isValidIpv4(gateway.ipv4)){
      res.status(500).send({message: 'Address ipv4 not valid'});
      return;
    }
    const doc = await db.updateOne({ _id: gateway._id }, gateway);

    res.status(200).send(doc[0]);
  }
  catch(error){
    res.status(500).send({message: 'System fail'});
  }
  
});

app.post('/gateway/detail', async (req, res) => {
  const gateway = req.body;
  try{
    const items = await db.find({ _id: gateway._id}).toArray();

    res.status(200).send(items[0]);
  }
  catch(error){
    res.status(500).send({message: 'System fail'});
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
