var code= `use std::io;
use std::{i32};
 
fn main() {
         
 
          println!("Input First number ? ");
 
          let mut var1 = String::new();
 
          io::stdin().read_line(&mut var1).expect("Unable to read entered data");
 
       
 
          println!("Input second number ? ");
          let mut var2 = String::new();
          io::stdin().read_line(&mut var2).expect("Unable to read entered data");

          let a: i32 = var1.trim().parse().ok().expect("Program only processes numbers, Enter number");
          let b: i32 = var2.trim().parse().ok().expect("Program only processes numbers, Enter number");
          println!("The sum of a &  b is : {}", a + b);
 
}`
const formattedCode = code.replace(/\n/g, '\\n').replace(/\"/g, '\\"');
console.log(formattedCode);