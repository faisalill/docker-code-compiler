import express from 'express';
import fs from 'fs';
import {spawn, exec} from 'child_process';
import { removeFile } from '../functions/functions.js';
import { NodeVM } from 'vm2';
import stream from 'stream'

const router = express.Router();
express.json();
var programRunCount = 0
var input = '';
var code = ``;
var language='';
var logMessage = '';
//executes the command to compile the file and give program.exe as output
const cppExecute = () => {
  
};

const pythonExecute = () => {
  
}

const cExecute = () => {
 
}

const rustExecute = () => {
 
}

const javascriptExecute = () => {
  //creates a sandbox for the code to be executed in
  //it only allows the console.log function to be used
  const sandbox = {
    console: console,
  }
  const callFunction = new Function('sandbox', code);
  return callFunction(sandbox)
}

router.post('/', (req, res) => {
  console.log(logMessage)
  if(req.body.input){
    var inputToBeConverted = req.body.input.split(',');
  for(var i = 0; i < inputToBeConverted.length; i++){
    input = input + inputToBeConverted[i] + '\n';
  }
  }
  code = req.body.code;
  language = req.body.language;
  if(language === 'cpp'){
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
                res.send(`stdout: ${data}`);
              });
              //listens for errors from the child process
              program.stderr.on('data', (data) => {
                res.send(`stderr: ${data}`);
              });
               //writes data to the child process
               if(input !== ''){
                program.stdin.write(input);
               program.stdin.end();
                }
              //listens for errors from the child process
              program.on('error', (error) => {
                res.send(`error: ${error}`);
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
  }
  else if(language === 'python'){
    //writes the code to a file
 fs.writeFile('./programs/main.py', code, (err) => {
  if(err){
    console.log(err);
  }
  else{
   //spawns a child process to execute the program
   const program = spawn('python3', ['./programs/main.py']);
   program.stdout.on('data', (data) => {
     res.send(`stdout: ${data}`);
   }
   );
   program.stderr.on('data', (data) => {
     res.send(`stderr: ${data}`);
   }
   );
   if(input !== ''){
     //writes data to the child process
     program.stdin.write(input);
     program.stdin.end();
   }
   program.on('error', (error) => {
     res.send(`error: ${error}`);
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
  else if(language === 'objective-c'){
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
                res.send(`stdout: ${data}`);
              });
              //listens for errors from the child process
              program.stderr.on('data', (data) => {
                res.send(`stderr: ${data}`);
              });
               //writes data to the child process
               if(input !== ''){
                program.stdin.write(input);
               program.stdin.end();
                }
              //listens for errors from the child process
              program.on('error', (error) => {
                res.send(`error: ${error}`);
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
  else if(language === 'rust'){
    fs.writeFile('./programs/rustProgram.rs', code, (err) => {
      if (err){
        console.log(err);
      }
      else{
    //executes the command to compile the file and give program.exe as output
    exec('rustc ./programs/rustProgram.rs -o ./output/rustProgram.out')
    //watches the current directory for any changes 
     const cWatcher = fs.watch('./output', (eventType, filename) => {
       // if the file that is changed is program.exe then it will execute the program
         if (filename === 'rustProgram.out') {
           if(programRunCount === 0){
            setTimeout(() => {
              //spawns a child process to execute the program
              const program = spawn('./output/rustProgram.out');
              //listens for data from the child process
              program.stdout.on('data', (data) => {
                res.send(`stdout: ${data}`);
              });
              //listens for errors from the child process
              program.stderr.on('data', (data) => {
                res.send(`stderr: ${data}`);
              });
               //writes data to the child process
               if(input !== ''){
                program.stdin.write(input);
               program.stdin.end();
                }
              //listens for errors from the child process
              program.on('error', (error) => {
                res.send(`error: ${error}`);
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
                  removeFile('./output/rustProgram.out');
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
  else if(language === 'javascript'){
    
   fs.writeFile('./programs/jsProgram.js', code, (err)=>{
      if(err){
        console.log(err);
      }
      else{
        // console.log("worked")
        // res.send('Javascript program success')
        const check = spawn('node',['./programs/jsProgram.js']);
        check.stdout.on('data', (data) => {
          res.send(`stdout: ${data}`);
        })
        check.stderr.on('data', (data) => {
          res.send(`stderr: ${data}`);
        }
        );
        check.on('error', (error) => {
          res.send(`error: ${error}`);
        }
        );
        check.on('exit', (code) => {
          if (code === 0) {
            console.log(`Exited with code: ${code}`);
           removeFile('./programs/jsProgram.js');
          }
        }
        );
      }
   })

  }
 
});

export default router;