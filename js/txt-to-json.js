const fs = require('fs');
txt = fs.readFileSync("txt/Ple_Municipal.txt");

var lines = txt.toString().split("\n");
var lines = txt.toString().split("\r");
var headers = lines[0].split(";");

//convert from txt to json file
var result = [];
for (let i = 1; i < lines.length; i++) {
    var obj = {};
    var currentline = lines[i].split(";");

    for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
    }
    result.push(obj);
}
let jsonString = JSON.stringify(result);
let json = JSON.parse(jsonString);
fs.writeFileSync('json/output.json', jsonString);

//url generator with time, url and speaker 
var frames = [];
for (let i = 0; i < lines.length - 1; i++) {
    var url = {};
    let time = json[i]['00:00:00'];
    url['url'] = urlWithSecs(time);

    var speak = 'silencio';
    for (let j = 0; j < headers.length; j++) {
        if (json[i]['AUDIO ' + j] === 'HABLA') {
            speak = j;
            break;
        }
    }
    url['speaker'] = speak;
    frames.push(url);
}
/* console.log(frames); */

function urlWithSecs(time) {
    var d = new Date("0001-01-01T" + time);
    var seconds = d.getHours() * 120 + d.getMinutes() * 60 + d.getSeconds();
    return "https://www.youtube.com/watch?v=zyz3oMsAEtk&t=" + seconds + "s";
}
