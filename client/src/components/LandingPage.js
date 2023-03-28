
import { useState } from "react"
import Login from "./Login"
import MainPage from "./MainPage"
export default function LandingPage({arrayOfMessages}){
    const [loggedIn, setLogin] = useState(false)
    console.log("loggedin", loggedIn)
    return(

    <div class="container">
Accedent Safty Landing Page
{arrayOfMessages.map((e)=>{return <div>
       accident <li>{e.accident}</li>
      rash driving <li> {e.rash}</li>
     location <li>{e.location}</li>
      </div>})}
{loggedIn && 
    <div>
        <button onClick={()=>setLogin(false)}>Logout</button>
        <MainPage/>
    </div>}
{!loggedIn && 
    <Login handleLogin={(e)=>{setLogin(e)}} isLoggedin ={loggedIn}/>
    }
    </div>
 )
}