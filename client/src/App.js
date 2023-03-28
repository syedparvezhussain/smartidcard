import React, { useEffect, useState } from "react";
import "./App.css";

import { io } from "socket.io-client";
import { BrowserRouter as Router,Routes as Switch, Route, Link } from 'react-router-dom';
import Hospital from './components/Hospital';
import PoliceStation from './components/PoliceStation';
import Family from './components/Family';
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

    setData(data);
    const x= arrayOfMessages
    if(arrayOfMessages && arrayOfMessages.length !== 0 && arrayOfMessages[arrayOfMessages.length-1].location !== data.location){
x.push(data)
    }
    else if(arrayOfMessages.length===0){
      x.push(data)
    }
    
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
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link">Landing Page </Link></li>
            <li><Link to={'/Hospital'} className="nav-link">Hospital </Link></li>
            <li><Link to={'/PoliceStation'} className="nav-link">Police Station</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' element={<LandingPage arrayOfMessages={arrayOfMessages}/>} />
              <Route path='/Hospital' element={<Hospital/>} />
              <Route path='/PoliceStation' element={<PoliceStation/>} />
          </Switch>
        </div>
      </Router>
    </div>
 
  );
}

export default App;
