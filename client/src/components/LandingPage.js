
import { useState } from "react"
import Login from "./Login"
import MainPage from "./MainPage"
import Signup from "./Signup"
export default function LandingPage({arrayOfMessages, data}){
    const [loggedIn, setLogin] = useState(false)
      const [signUp, setSignUp] = useState(false)

    console.log("loggedin", arrayOfMessages)
    return(

    <div class="container">
Women Safty for ID card 

{/* {arrayOfMessages.map((e)=>{return <div>
       accident <li>{e.accident}</li>
      rash driving <li> {e.rash}</li>
     location <li>{e.location}</li>
     time stamp <li>{e.timestamp}</li>
    severity <li>{e.severity}</li>
    id <li>{e.id}</li>
    falseAlarmTrigger <li>{e.falseAlarmTrigger}</li>
      </div>})} */}
{loggedIn && 
    <div>
        <button onClick={()=>setLogin(false)}>Logout</button>

        <MainPage arrayOfMessages={data}/>
    </div>}

{!loggedIn && !signUp &&
    <Login handleLogin={(e)=>{setLogin(e)}} isLoggedin ={loggedIn}/>
    }
    {signUp && <Signup />
    }

    <button onClick={()=>setSignUp(!signUp)}>{signUp?"login":"signup"}</button>

    </div>
 )
}