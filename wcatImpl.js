#!/usr/bin/env node

let fs = require("fs");
let path = require("path");

function displayFile(filepath){

    let content = fs.readFileSync(filepath);
    return content;
}


function displayMultipleFiles(fileArr){
    let content = "";
    for(let i =0;i <fileArr.length ;i++){
        let file = fileArr[i];
        content += displayFile(file);
        content+="\n";
    }
    return content;
}

function removeLineBreaksHelper(content){
    // jahan bhi 1 see jada line break mile unhe remove krdo
    // let content = fs.readFileSync(filepath).toString();

    content = content.replace(/\n\s*\n/g, '\n\n');
    
    return content;
}


function removeLineBreak(fileContent){
    

    let content = removeLineBreaksHelper(fileContent);
    content+"\n";

    return content;
}

// Handles both empty and non empty lines cases-

function lineNumbering(filecontent,isEmpty){
    // l

    // for(let i =0;i<filesArr.length;i++){
    //     count = lineNumberingHelper(filesArr[i],isEmpty,count);
    // }

    let resultContent = lineNumberingHelper(filecontent,isEmpty);

    return resultContent;
}

function lineNumberingHelper(content, isEmpty){

    let count =1;
    
    let resultContent="";

    let arr = content.toString().replace(/\r\n/g,'\n').split('\n');

    for(let i =0 ;i < arr.length ;i++){

        if(arr[i] == '' ){
            if(isEmpty){
                // console.log(count+". "+ arr[i]);
                resultContent+=count+". "+arr[i]+"\n";
                count++;
            }
            else{
                // console.log(arr[i]);
                resultContent+="\n";
            }
        }

        else{
            // console.log(count+". "+ arr[i]);
            resultContent+=count+". "+arr[i]+"\n";
            count++;
        }
    }
    // console.log(arr);
    return resultContent;
}


// function pushContent(filesArr, filepath2){
//     if(!fs.existsSync(filepath2)){
//         fs.openSync(filepath2,'w');
//     }


//     for(let i =0;i<filesArr.length ;i++){
//         pushContentHelper(filesArr[i],filepath2);
//     }

// }

// function pushContentHelper(filepath1, filepath2){

//     if(!fs.existsSync(filepath1)){
//         // console.log("Invalid filepath for "+filepath1);
//         return;
//     }

//     let contentFilePath1 = fs.readFileSync(filepath1);
//     fs.appendFileSync(filepath2,contentFilePath1.toString());
//     fs.appendFileSync(filepath2, "\n");
// }

function main(){

    
    
    let inputArr = process.argv.slice(2);

    let currDir = process.cwd();

    // let optionsArr = [];
    let filesArr =[];

    let n = false;
    let b = false;
    let s = false;
    let options = false;

    for( let i =0;i<inputArr.length ;i++){
        let input = inputArr[i];
      
        if(input.charAt(0) == "-"){
            let ch = input.charAt(1);

            if(ch == 'n'){
                n = true;
                options = true;
            }
            if(ch =='s'){
                s = true;
                options = true;
            }
            if(ch == 'b'){
                b= true;
                options = true;
            }
            
        }
        else{
            let filepath = path.join(currDir,input);
            filesArr.push(filepath);
          
        }
    }

    if(filesArr.length == 0){
        console.log("Please enter a file to perform action at");
        return;
    }

    let content = "";
  

    content = displayMultipleFiles(filesArr);
    if(s == true){
        content = removeLineBreak(content);
    }

    if(n && b){
        // will do numbering of non empty lines
        content = lineNumbering(content, true);
    }
    else if(n && !b){
        content = lineNumbering(content,true);
    }
    else if(!n && b){
        content = lineNumbering(content,false);
    }
    else{
        // do nothing // i need not to print mujhe save krate hue saare kaam krne padenge, otherwise "-n & -s " operations can't be performed with each other
    }
    
    console.log(content);
}

main();