import express from 'express';
import fs from 'fs';
import {spawn, exec} from 'child_process';
import { removeFile } from '../functions/functions.js';

const router = express.Router();
express.json();
var programRunCount = 0
var input = '';
var code = ``;
var language='';

//executes the command to compile the file and give program.exe as output
const cppExecute = () => {
  fs.writeFile('./programs/main.cpp', code, (err) => {
    if (err){
      console.log(err);
    }
    else{
  //executes the command to compile the file and give program.exe as output
  exec('g++ ./programs/main.cpp -o output/main.out')
  //watches the current directory for any changes 
   const cppWatcher = fs.watch('./output', (eventType, filename) => {
     // if the file that is changed is program.exe then it will execute the program
       if (filename === 'main.out') {
         if(programRunCount === 0){
          setTimeout(() => {
            //spawns a child process to execute the program
            const program = spawn('./output/main.out');
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
                //closes the watcher
                cppWatcher.close();
                //removes the program.exe file
                removeFile('./output/main.out');
                //removes the main.cpp file
                removeFile('./programs/main.cpp');
              }
            });
          }, 300);
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
    //spawns a child process to execute the program
    const program = spawn('python3', ['./programs/main.py']);
    program.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    }
    );
    program.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    }
    );
    if(input !== ''){
      //writes data to the child process
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
        // resets the programRunCount to 0 so that the program can be executed again
        programRunCount = 0;
        // resets the input to an empty string so that the input can be taken again
        input = '';
        //removes the main.py file
        removeFile('./programs/main.py');
      }
    }
    );  
   }
 });
}

const cExecute = () => {
  fs.writeFile('./programs/Cprogram.c', code, (err) => {
    if (err){
      console.log(err);
    }
    else{
  //executes the command to compile the file and give program.exe as output
  exec('gcc ./programs/Cprogram.c -o output/Cprogram.out')
  //watches the current directory for any changes 
   const cWatcher = fs.watch('./output', (eventType, filename) => {
     // if the file that is changed is program.exe then it will execute the program
       if (filename === 'Cprogram.out') {
         if(programRunCount === 0){
          setTimeout(() => {
            //spawns a child process to execute the program
            const program = spawn('./output/Cprogram.out');
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
                //closes the watcher
                cWatcher.close();
                //removes the Cprogram.exe file
                removeFile('./output/Cprogram.out');
                //removes the Cprogram.c file
                removeFile('./programs/Cprogram.c');
              }
            });
          }, 300);
           programRunCount++;
         }
       }
   });
    }
  });
}

const rustExecute = () => {
  fs.writeFile('./programs/rustProgram.rs', code, (err) => {
    if (err){
      console.log(err);
    }
    else{
  //executes the command to compile the file and give program.exe as output
  exec('rustc ./programs/rustProgram.rs -o ./output/rustProgram')
  //watches the current directory for any changes 
   const cWatcher = fs.watch('./output', (eventType, filename) => {
     // if the file that is changed is program.exe then it will execute the program
       if (filename === 'rustProgram') {
         if(programRunCount === 0){
          setTimeout(() => {
            //spawns a child process to execute the program
            const program = spawn('./output/rustProgram');
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
                //closes the watcher
                cWatcher.close();
                //removes the Cprogram.exe file
                removeFile('./output/rustProgram');
                //removes the Cprogram.c file
                removeFile('./programs/rustProgram.rs');
              }
            });
          }, 300);
           programRunCount++;
         }
       }
   });
    }
  });
}

const javascriptExecute = () => {
  fs.writeFile('./programs/javascriptProgram.js', code, (err) => {
    if (err){
      console.log(err);
    }
    else{
  const program = spawn('node', ['./programs/javascriptProgram.js']);
  program.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  program.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });
  if(input !== ''){
    program.stdin.write(input);
    program.stdin.end();
  }
  program.on('error', (error) => {
    console.log(`error: ${error}`);
  });
  program.on('exit', (code) => {
    if (code === 0) {
      console.log(`Exited with code: ${code}`);
      input = '';
      removeFile('./programs/javascriptProgram.js');
    }
  });
    }
  });
}


router.get('/', (req, res) => {
  if(req.body.input){
    var inputToBeConverted = req.body.input.split(',');
  for(var i = 0; i < inputToBeConverted.length; i++){
    input = input + inputToBeConverted[i] + '\n';
  }
  }
  code = req.body.code;
  language = req.body.language;
  if(language === 'cpp'){
    cppExecute();
    res.send('C++ program success')
  }
  else if(language === 'python'){
    pythonExecute();
    res.send('Python program success')
  }
  else if(language === 'objective-c'){
    cExecute();
    res.send('C program success')
  }
  else if(language === 'rust'){
    rustExecute();
    res.send('Rust program success')
  }
  else if(language === 'javascript'){
    javascriptExecute();
    res.send('Javascript program success')
  }
 
});

export default router;