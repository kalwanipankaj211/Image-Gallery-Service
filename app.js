const dotenv = require('dotenv')
dotenv.config();
var express = require('express');
const cors = require('cors');
const yamljs = require('yamljs');   
const swaggerUi = require('swagger-ui-express');
var app = express();
const mongoose = require('mongoose');
const url = process.env.CONNECTION_URL;
var port = process.env.port || 2000;
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes.js')
const auth = require('./middleware/auth');
var corsOptions = {
    origin: 'http://localhost:5200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
  app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/',(req,res)=>{
  res.send(`app started on port ${port}`)
})

mongoose.connect(url,{useNewUrlParser : true,useUnifiedTopology: true })
.then(()=>{
  console.log('Connected to Mongodb');
  return app.listen(port);
})
.then(()=>console.log(`Server is running at port ${port}`))
.catch(err=>console.log(err.message));
const swaggerDocument = yamljs.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users',userRoutes);

app.use((err,req,res,next) =>{
  const status = err.status || 500;
  res.status(status).json({error : { message : err.message}});
})

app.use((req,res ,next) =>{
  const err = new Error('not found');
  err.status = 404;
  next(err);
})


