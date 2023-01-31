//write a basic express app that listens on port 3000 or process.end.PORT
const express = require('express');
const { exec } = require('child_process');
const app = express();
app.use(express.json())
app.get('/', (req, res) => {
  res.send('Hello World!');
}); 

app.get('/about', (req, res) => {
  const data = req.body
  res.send(data); 
});

var fileName = 'main.cpp'

app.get('/version', (req, res) => {
  exec(`g++ ${fileName} -o program && program.exe`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      res.send(error)
      return;
    }
    res.send(stdout);
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Check out the app at http://localhost:3000');
});
