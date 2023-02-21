//write a basic express app that listens on port 3000 or process.end.PORT
import express from 'express';
import router from './routes/route.mjs';
import cors from 'cors';
const app = express();


app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('It is working');
}); 

app.get('/about', (req, res) => {
  const data = req.body
  res.send(data); 
});

app.post('/check', (req,res)=>{
  res.send(req.body)
})


app.use('/execute', router);

app.listen(process.env.PORT || 3001, () => {
  console.log('Check out the app at http://localhost:3001/execute');
});
