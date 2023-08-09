const express = require("express"); //Line 1
const app = express(); //Line 2
const fs = require('fs');
const mysql = require('mysql');
const port = process.env.PORT || 5000; //Line 3
// const PORT = process.env.PORT || 6000;
// const { SerialPort } = require('serialport')
// const sport = new SerialPort({path:'\\\\.\\COM6', baudRate: 9600, autoOpen:true });

// sport.on('data', (data) => {
//   console.log('Received data:', data.toString());
// });

// // handle errors
// sport.on('error', (err) => {
//   console.error('Error:', err);
// });
// sport.close();
const connection = mysql.createConnection({
  host:"localhost",
  user: "root",
  password:"password",
  database:"iiclub"
})
// Connecting to database
connection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`)
        connection.query(`SHOW DATABASES`,
            function (err, result) {
                if (err)
                    console.log(`Error executing the query - ${err}`)
                else
                    console.log("Result: ", result)
            })
    }
})
const socketIo = require("socket.io");
const http = require("http");
const { Select } = require("@material-ui/core");
const { hostname } = require("os");
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("client connected: ", socket.id);

  socket.join("clock-room");

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});
setInterval(() => {
  io.to("clock-room").emit("time", new Date());
}, 1000);
server.listen(port, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", port);
});
// This displays message that the server running and listening to specified port
app.listen(5001, () => console.log(`Listening on port ${5001}`)); //Line 6

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  let x ;
    connection.query(`select * from userinfo`,
            function (err, result) {
                if (err){
                  
                    console.log(`Error executing the query - ${err}`)
                   res.send("errors")}
                else{
                      x = { express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT", result : JSON.stringify(result) }
                    console.log("Result: ", result, x)
                   res.send(JSON.stringify(x));
                  }
                    
            })
       
  //Line 10
}); //Line 11
app.get("/getusers", (req, res)=>{
  const _query = "select * from userinfo";
  let error;
  let resultMain;
  connection.query(_query, function (err, result){
    try{
      if(err){
error= {msg:"failed to fetch from DB", error:err}
      }
      else{
         resultMain = { msg:"success", result : JSON.stringify(result) }
      }
      console.log(JSON.stringify(result), "this is coming")
        res.send({express: resultMain});
    }
    catch{
      console.log("error occured while fetch")
    }

  })
 
   
})
app.get("/exampleApi", (req, res) => {
  //Line 9
  const bar=req.query.data  // true
  // sport.write(bar);
 
  console.log('getting api call',bar)
  io.to("clock-room").emit("Event", bar);

  res.send({ express: bar }); //Line 10
  // sport.end();
}); //Line 11

app.get("/getVehicleStatus", (req, res) => {
  //Line 9
  const distressMessage=req.query.distressMessage  // true
  const location = req.query.location
  const studentId=req.query.studentId
  const timestamp=req.query.timestamp
  const personname=req.query.personname
  // sport.write(bar);
 const data = {
message:distressMessage,
location:location,
id:studentId,
timestamp:timestamp,
personname:personname
}
  console.log('getting api call',data)
  io.to("clock-room").emit("Event", data);

  res.send({ express: data }); //Line 10
  // sport.end();
}); //Line 11
function updateJsonFile(newObject) {
  // Read the contents of the JSON file
  fs.readFile('./client/src/settings.json', 'utf-8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const json = JSON.parse(data);
    console.log("json data", json)
    // Add the new object to the JSON array
    json.data.push(newObject);

    // Write the updated JSON data back to the file
    fs.writeFile('./client/src/settings.json', JSON.stringify(json), 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been updated!');
    });
  });
}



app.get("/signUp", (req, res) => {
  //Line 9
    var currentDate = new Date();
  console.log(currentDate.toISOString())
const username=req.query.username  // true
  const password = req.query.password
    const id=req.query.id  // true
  const roleId = req.query.roleId
    const name=req.query.name  // true
  const role = req.query.role
// Example usage

const newObject = { 
  userName: username,
   passWord: password,
   id:id,
   role:role,
   roleId:roleId,
    name:name,   };

    let x ;
    
const _query = "INSERT INTO userinfo (name, userName, role, passWord,roleId, id) VALUES ('" + name + "', '" + username + "', '" + role + "','" + password + "','" + roleId + "','" + id + "' );"
    connection.query(_query,
            function (err, result) {
              try{
                
            
                if (err){
                  
                    console.log(`Error executing the query - ${err}`)
                   res.send({msg:"failed to fetch from DB", error:err})}
                else{
                      x = { msg:"success", result : JSON.stringify(result) }
                    console.log("Result: ", result, x)
                   res.send(JSON.stringify(x));
                  }
                      }
                      catch {
                        console.log("error occured")
                      }
            })
// updateJsonFile(newObject);


  res.send( JSON.stringify({...newObject, msg:" user created successfully Signin with Respective Username and Password"})); //Line 10

}); //Line 11

function updatecontactJsonFile(newObject) {
  // Read the contents of the JSON file
  fs.readFile('./client/src/contact.json', 'utf-8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const json = JSON.parse(data);
    console.log("json data", json)
    // Add the new object to the JSON array
    json.contacts.push(newObject);

    // Write the updated JSON data back to the file
    fs.writeFile('./client/src/contact.json', JSON.stringify(json), 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been updated!');
    });
  });
}

function clearcontactJsonFile() {
  // Read the contents of the JSON file
  fs.readFile('./client/src/contact.json', 'utf-8', (err, data) => {
    if (err) throw err;

    // Parse the JSON data
    const json = {"contacts":[]}
    console.log("json data", json)
    // Add the new object to the JSON array
 

    // Write the updated JSON data back to the file
    fs.writeFile('./client/src/contact.json', JSON.stringify(json), 'utf-8', (err) => {
      if (err) throw err;
      console.log('The file has been updated!');
    });
  });
}

app.get("/updateContacts", (req, res) => {
  //Line 9
    var currentDate = new Date();
  console.log(currentDate.toISOString())
  const id=req.query.id  // true
  const name = req.query.name
    const phone=req.query.phone  // true
  const relation = req.query.relation
// Example usage
// Example usage

const newObject = { id: id, name: name, phone:phone, relation:relation };
updatecontactJsonFile(newObject);

  res.send("Contact Added Successfully  !!!"); //Line 10


}); //Line 11

app.get("/clearContacts", (req, res) => {
clearcontactJsonFile();
  res.send("Contact cleard Successfully  !!!"); //Line 10


}); //Line 11
