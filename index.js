//write a basic express app that listens on port 3000 or process.end.PORT
const express = require('express');
const fs = require('fs');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
  res.send('It is workgin');
}); 

app.get('/about', (req, res) => {
  const data = req.body
  res.send(data); 
});
var fileName = 'main.cpp'
var programRunCount = 0

const runProgram = () => {
  setTimeout(() => {
    //spawns a child process to execute the program
    const program = spawn('./program.exe');
    //listens for data from the child process
    program.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });
    //listens for errors from the child process
    program.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
     //writes data to the child process
     program.stdin.write('1\n');
     program.stdin.end();
    //listens for errors from the child process
    program.on('error', (error) => {
      console.log(`error: ${error}`);
    });
    //listens for the child process to exit
    program.on('exit', (code) => {
      if (code === 0) {
        console.log(`Exited with code: ${code}`);
        programRunCount = 0;
      }
    });
  }, 300);
};

app.get('/version', (req, res) => {
  //executes the command to compile the file and give program.exe as output
   exec('g++ main.cpp -o program.exe')
   //watches the current directory for any changes 
    fs.watch('./', (eventType, filename) => {
      // if the file that is changed is program.exe then it will execute the program
        if (filename === 'program.exe') {
          if(programRunCount === 0){
            runProgram();
            programRunCount++;
          }
        }
    });
});


app.listen(process.env.PORT || 3000, () => {
  console.log('Check out the app at http://localhost:3000/version');
});
