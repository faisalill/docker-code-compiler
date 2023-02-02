//write a basic express app that listens on port 3000 or process.end.PORT
import express from 'express';
import router from './routes/route.mjs';
const app = express();


app.use(express.json())

app.get('/', (req, res) => {
  res.send('It is workgin');
}); 

app.get('/about', (req, res) => {
  const data = req.body
  res.send(data); 
});

app.use('/execute', router);

app.listen(process.env.PORT || 3000, () => {
  console.log('Check out the app at http://localhost:3000/execute');
});
