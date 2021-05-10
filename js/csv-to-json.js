
const fs = require("fs");
csv = fs.readFileSync("caca.csv");


var lines=csv.toString().split("\r");
var lines=lines.toString().split("\n");

var result = [];

var headers=lines[0].split(",");

for(var i=1;i<lines.length;i++){
    
    var obj = {};
    var currentline=lines[i].split(",");
    
    for(var j=0;j<headers.length;j++){
        obj[headers[j]] = currentline[j];
    }
    
    result.push(obj);        
}    

//return JSON
let json = JSON.stringify(result); 
fs.writeFileSync('output.json', json);

console.log(json[0]);

