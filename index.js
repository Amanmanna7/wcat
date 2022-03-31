#!/usr/bin/env node


const fs=require("fs");
const { getSystemErrorMap } = require("util");

let arguments=process.argv.slice(2);

let flags=[];
let filenames=[];
let secArguments=[];

for(let i of arguments){
    if(i[0]=="-"){
        flags.push(i);
    }
    else if(i[0]=="$"){
        secArguments.push(i.slice(1));
    }
    else{
        filenames.push(i);
    }
}

// if(flags.length==0 && filenames.length!=0){
//     for(let file of filenames){
//         console.log(fs.readFileSync(file,"utf-8"));
//     }
// }

// for(let flag of flags){
//     if(flag=="-sl"){
//         for(let file of filenames){
//             let fileData=fs.readFileSync(file,"utf-8");
            
//             // let newData="";
//             // for(let i=0;i<fileData.length;i++){
//             //     if(fileData[i]!=" " && fileData[i]!="\n" && fileData[i]!="\r"){
//             //         newData+=fileData[i];
//             //     }
//             // }
//             // console.log(newData);
            
//             console.log(fileData.split(" ").join("").split("\r\n").join(""));
//         }
//     }
// }

for(let file of filenames){
    let fileData=fs.readFileSync(file,"utf-8");
    for(let flag of flags){
        // removing spaces
        if(flag=='-rs'){
            fileData=removeAll(fileData," ");
        }
        // removing new lines
        else if(flag=="-rn"){
            fileData=removeAll(fileData,"\r\n");
            fileData=removeAll(fileData,"\n");
        }
        // removing what ever you pass
        else if(flag=="-rsc"){
            for(let secArgument of secArguments){
                fileData=removeAll(fileData,secArgument);
            }
        }
        // adding sequence before all lines
        else if(flag=="-s"){
            fileData=addSequence(fileData);
        }
        // adding number before non empty lines only
        else if(flag=="-sn"){
            fileData=addSequenceTnel(fileData);
        }
        //removing extra empty line (1 is allowed)
        else if(flag=="-rel"){
            fileData=removeExtraLine(fileData);
        }
    }
    console.log(fileData);
}

function removeAll(string,removalData){
    console.log(string.split(removalData));
    return string.split(removalData).join("");
}

function addSequence(fileData){
    let arr=fileData.split("\r\n");
    for(let i=0;i<arr.length;i++){
        arr[i]=(i+1)+" "+arr[i];
    }
    return arr.join("\r\n");
}
function addSequence(fileData){
    let arr=fileData.split("\r\n");
    for(let i=0;i<arr.length;i++){
        arr[i]=(i+1)+" "+arr[i];
    }
    return arr.join("\r\n");
}
function addSequenceTnel(fileData){
    let arr=fileData.split("\r\n");
    let k=1;
    for(let i=0;i<arr.length;i++){
        if(arr[i]!=""){
            arr[i]=k++ +" "+ arr[i];
        }
    }
    return arr.join("\r\n");
}

function removeExtraLine(fileData){
    let arr=fileData.split("\r\n");
    let count=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]===""){
            count++;
        }
        else{
            count=0;
        }
        if(count>1){
            arr.splice(i,1);
            i--;
        }
    }
    return arr.join("\r\n");
}