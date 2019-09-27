var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser')
app.use(bodyParser.json())

app.post("/post",function(req,res){
    var user = {
        name:req.body.name,
        discription:req.body.discription
    }
    var data = fs.readFileSync("courses.json")
    data = data.toString();
    var Data = JSON.parse(data)
    user.id = Data.length + 1;
    Data.push(user)
    fs.writeFileSync("courses.json", JSON.stringify(Data,null,2))
    return res.json(Data)

})
// get data..
app.get("/getData",function(req,res){
    var data = fs.readFileSync("courses.json");
    var Data = JSON.parse(data);
    res.send(Data)
})
// BY name choice data...
app.get("/:name",function(req,res){
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


// for uping data....
app.put('/putbyid/:id', function (req, res) {

    var id = req.params.id;
    var jsondata = fs.readFileSync('courses.json')
    var data = JSON.parse(jsondata);
   
    data[id]["name"] = req.body.name;
    data[id][ "description"] = req.body.description;
    
    fs.writeFileSync("courses.json", JSON.stringify(data));
    return res.json(data)

})
// / Delete data name choice data...
app.delete("/delete/:id",function(req,res){
    var data  = fs.readFileSync("courses.json");
    var Data = JSON.parse(data);
    for (var i = 0;i<Data.length;i++){
        if(req.params.id==Data[i]["id"]){
            var a =  delete Data[i]
            break;
        }

   
    }
    fs.writeFileSync("courses.json", JSON.stringify(Data,null,2))
    return res.json(Data)
})

// Exercise post data..
app.post("/postexercise",function(req,res){
    var exerciseUser = {
        courseId:req.body.courseId,
        name:req.body.name,
        content:req.body.content,
        hint:req.body.hint,
    }
    var data = fs.readFileSync("exercises.json")
    data = data.toString();
    var Data = JSON.parse(data)
    exerciseUser.id = Data.length + 1;
    Data.push(exerciseUser)
    fs.writeFileSync("exercises.json", JSON.stringify(Data,null,2))
    return res.json(Data)

})

// Courses Exercises get data..
app.get('/exercisesGet',function(req,res){
    fs.readFile('exercises.json',(err,data)=>{
        if(err){
            console.log("something went wrong")
        }
        else{
            var data = JSON.parse(data.toString())
            return res.data
        }
})





const port = 2000
app.listen(port,()=>
   console.log(`my server is listning port....${port}`)
);