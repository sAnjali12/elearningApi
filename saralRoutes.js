var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser')
var expresapp = app.use(bodyParser.json())

expresapp.post("/post",function(req,res){
    var user = {
        name:req.body.name,
        discription:req.body.discription
    }
    id = req.params.id
    var data = fs.readFileSync("courses.json")
    data = data.toString();
    var Data = JSON.parse(data)
    user.id = Data.length + 1;
    Data.push(user)
    fs.writeFileSync("courses.json", JSON.stringify(Data,null,2))
    return res.json(Data)

})
// get data..
expresapp.get("/getData",function(req,res){
    var data = fs.readFileSync("courses.json");
    var Data = JSON.parse(data);
    res.send(Data)
})
// BY name choice data...
expresapp.get("/:name",function(req,res){
    var data  = fs.readFileSync("courses.json");
    var Data = JSON.parse(data);
    for (var i = 0;i<Data.length;i++){
        if(req.params.name==Data[i]["name"]){
            var course=Data[i]
            break;
        }
    }
    res.end(JSON.stringify(course))
})

const port = 2000
app.listen(port,()=>
   console.log(`my server is listning port....${port}`)
);