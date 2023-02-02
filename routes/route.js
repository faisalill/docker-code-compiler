const express = require('express');
const fs = require('fs');
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const router = express.Router();
express.json();

var programRunCount = 0
var input = '';
var code = ``;
var language='';
// function to execute the program for the first time
const runProgramFirstTime = () => {
    setTimeout(() => {
      //spawns a child process to execute the program
      const program = spawn('./output/main.exe');
      //listens for data from the child process
      program.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
      //listens for errors from the child process
      program.stderr.on('data', (data) => {
        console.log(`stderr: ${data}`);
      });
       //writes data to the child process
       if(input !== ''){
        program.stdin.write(input);
       program.stdin.end();
        }
      //listens for errors from the child process
      program.on('error', (error) => {
        console.log(`error: ${error}`);
      });
      //listens for the child process to exit
      program.on('exit', (code) => {
        if (code === 0) {
          console.log(`Exited with code: ${code}`);
          // resets the programRunCount to 0 so that the program can be executed again
          programRunCount = 0;
          // resets the input to an empty string so that the input can be taken again
          input = '';
        }
      });
    }, 300);
  };

const cppExecute = () => {
  fs.writeFile('./programs/main.cpp', code, (err) => {
    if (err){
      console.log(err);
    }
    else{
  //executes the command to compile the file and give program.exe as output
  exec('g++ ./programs/main.cpp -o output/main.exe')
  //watches the current directory for any changes 
   fs.watch('./output', (eventType, filename) => {
     // if the file that is changed is program.exe then it will execute the program
       if (filename === 'main.exe') {
         if(programRunCount === 0){
           runProgramFirstTime();
           programRunCount++;
         }
       }
   });
    }
  });
};

const pythonExecute = () => {
  //writes the code to a file
 fs.writeFile('./programs/main.py', code, (err) => {
   if(err){
     console.log(err);
   }
   else{
    const program = spawn('python', ['./programs/main.py']);
    program.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    }
    );
    program.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    }
    );
    if(input !== ''){
      program.stdin.write(input);
      program.stdin.end();
    }
    program.on('error', (error) => {
      console.log(`error: ${error}`);
    }
    );
    program.on('exit', (code) => {
      if (code === 0) {
        console.log(`Exited with code: ${code}`);
        programRunCount = 0;
        input = '';
      }
    }
    );  
   }
 });
}

router.get('/', (req, res) => {
  var inputToBeConverted = req.body.input.split(',');
  for(var i = 0; i < inputToBeConverted.length; i++){
    input = input + inputToBeConverted[i] + '\n';
  }
  code = req.body.code;
  language = req.body.language;
  if(language === 'c++'){
    cppExecute();
  }
  else if(language === 'python'){
    pythonExecute();
  }
 
});

module.exports = router;