import React, { useEffect, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";
import { BrowserRouter as Router,Routes as Switch, Route, Link } from 'react-router-dom';
//"http://192.168.43.84:5000/getVehicleStatus?distressMessage=%20danger%20danger&studentId=3&location=14.4292614,79.9106773&timestamp=2022-03-28T13:00:00.000Z&personname=nikki";
import LandingPage from "./components/LandingPage";
function App() {
const [data, setData] = useState("");
const [arrayOfMessages, setArrayOfMessages]= useState([])

  useEffect(() => {
    
    const socket = io("http://localhost:5000");
    socket.on("connect", () => console.log(socket.id));
    socket.on("connect_error", () => {
      setTimeout(() => socket.connect(), 5000);
    });
    socket.on("Event", (data) => {
      let data2={...data, id:Number(data.id)}
    setData(data2);
    const x= arrayOfMessages
    x.push(data2)
    
    setArrayOfMessages(x)
    }
      );
    socket.on("disconnect", () => setData("server disconnected"));
  }, []);


  return (
    <div>
      {/* <h1>http://10.42.171.70:5001/exampleApi?data={data}</h1> */}
  
       <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          {/* <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Landing Page </Link></li>
            <li><Link to={'/Hospital'} className="nav-link">Hospital </Link></li>
            <li><Link to={'/PoliceStation'} className="nav-link">Police Station</Link></li>
          </ul> */}
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' element={<LandingPage data={data} arrayOfMessages={arrayOfMessages}/>} />
          </Switch>
        </div>
      </Router>
    </div>
 
  );
}

export default App;
