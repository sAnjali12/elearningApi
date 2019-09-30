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
    var jsonData = JSON.parse(data)
    user.id = jsonData.length + 1;
    jsonData.push(user)
    fs.writeFileSync("courses.json", JSON.stringify(jsonData,null,2))
    return res.json(jsonData)

})
// get data..
app.get("/getData",function(req,res){
    var data = fs.readFileSync("courses.json");
    var jsonData = JSON.parse(data);
    res.send(jsonData)
})
// BY name choice data...
app.get("/:name",function(req,res){
    var data  = fs.readFileSync("courses.json");
    var jsonData = JSON.parse(data);
    for (var i = 0;i<jsonData.length;i++){
        if(req.params.name==jsonData[i]["name"]){
            var course=jsonData[i]
            break;
        }
    }
    res.end(JSON.stringify(course))
})


// for uping data....
app.put('/putbyid/:id', function (req, res) {

    var id = req.params.id;
    var data = fs.readFileSync('courses.json')
    var jsonData = JSON.parse(data);
   
    jsonData[id]["name"] = req.body.name;
    jsonData[id][ "description"] = req.body.description;
    
    fs.writeFileSync("courses.json", JSON.stringify(jsonData));
    return res.json(jsonData)
    
})
// / Delete data name choice data...
app.delete("/delete/:id",function(req,res){
    var data  = fs.readFileSync("courses.json");
    var jsonData = JSON.parse(data);
    for (var i = 0;i<jsonData.length;i++){
        if(req.params.id==jsonData[i]["id"]){
            var a =  delete jsonData[i]
            break;
        }

   
    }
    fs.writeFileSync("courses.json", JSON.stringify(jsonData,null,2))
    return res.json(jsonData)
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
    var jsonData = JSON.parse(data)
    exerciseUser.id = jsonData.length + 1;
    jsonData.push(exerciseUser)
    fs.writeFileSync("exercises.json", JSON.stringify(jsonData,null,2))
    return res.json(jsonData)

})

// Courses Exercises get data..
app.get('/exercisesGet',function(req,res){
    fs.readFile('exercises.json',(err,data)=>{
        if(err){
            console.log("something went wrong")
        }
        else{
            var jsonData = JSON.parse(data.toString())
            return res.jsonData
        }
    })
})

// by Id get json data...
app.get("/course/:id",function(req,res){
    var exercisesData = []
    var courseId = req.params.id
    var data  = fs.readFileSync("exercises.json");
    var jsonData = JSON.parse(data);
    for (var index in jsonData){
        if(jsonData[index]["courseId"]==courseId){
            var course=jsonData[index]
            exercisesData.push(course)
        }
    }
    res.end(JSON.stringify(exercisesData))
})

// By course id and exercise id get data...
app.get("/course/:id/exercise/:Eid",function(req,res){
    var CId = req.params.id;
    var data = fs.readFileSync("exercises.json");
    var jsonData = JSON.parse(data);
    for (var index in jsonData){
        if (jsonData[index]["courseId"]==CId){
            var exerciseId = req.params.Eid
            for (exercises in jsonData){
                if(jsonData[exercises]["id"]==exerciseId && jsonData[exercises]["courseId"]==CId){
                    var oneExercise = jsonData[exercises]
                    res.send(JSON.stringify(oneExercise))
                }
            } 
        }
    }
    res.end("data is not found")
    
})

app.put('/put/:cId/exercise/:eId',(req,res)=>{

    var cId = req.params.cId;
    var jsondata = fs.readFileSync('exercises.json')
    var Data = JSON.parse(jsondata);

    for(var index in Data){
        if(Data[index]["courseId"]==cId){
            var eId = req.params.eId-1
            for (var j in Data){
                if (Data[j]["id"]==eId && Data[j]["courseId"]==cId){
                    Data[eId]["name"] = req.body.name;
                    Data[eId]["description"] = req.body.description;
                    Data[eId]["content"]=req.body.content;
                    Data[eId]["hint"]=req.body.hint;
                    fs.writeFileSync("exercises.json", JSON.stringify(Data,null,2));

                    res.send(Data)
                }
                
            }
        }
    }
});

app.post("/submissionPost/:id/exercise/:eId",function(req,res){
    var courseId = req.params.id; 
    var exerciseId = req.params.eId
    var exerciseUser = {
        codeUrl:req.body.codeUrl,
        userName:req.body.userName
        
    }
    var data = fs.readFileSync("submission.json")
    data = data.toString();
    var jsonData = JSON.parse(data)
    exerciseUser.submissionId = jsonData.length + 1;
    exerciseUser["courseId"] = parseInt(courseId)
    exerciseUser["exerciseId"] = parseInt(exerciseId)
    jsonData.push(exerciseUser)
    fs.writeFileSync("submission.json", JSON.stringify(jsonData,null,2))
    return res.json(jsonData)

})

const port = 2000
app.listen(port,()=>
   console.log(`my server is listning port....${port}`)
);