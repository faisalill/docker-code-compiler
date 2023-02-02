//write a basic express app that listens on port 3000 or process.end.PORT
const express = require('express');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('It is workgin');
}); 

app.get('/about', (req, res) => {
  const data = req.body
  res.send(data); 
});



const cppRoute = require('./routes/route');
app.use('/execute', cppRoute);


app.listen(process.env.PORT || 3000, () => {
  console.log('Check out the app at http://localhost:3000/execute');
});
