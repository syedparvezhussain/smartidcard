
import { useState } from "react"
import Login from "./Login"
import MainPage from "./MainPage"
export default function LandingPage({arrayOfMessages, data}){
    const [loggedIn, setLogin] = useState(false)
    console.log("loggedin", arrayOfMessages)
    return(

    <div class="container">
Women Safty for ID card 
{/* {arrayOfMessages.map((e)=>{return <div>
       distressMessage <li>{e.distressMessage}</li>
      studentId <li> {e.studentId}</li>
     location <li>{e.location}</li>
      </div>})} */}
{loggedIn && 
    <div>
        <button onClick={()=>setLogin(false)}>Logout</button>
        <MainPage data={data} arrayOfMessages={arrayOfMessages}/>
    </div>}
{!loggedIn && 
    <Login handleLogin={(e)=>{setLogin(e)}} isLoggedin ={loggedIn}/>
    }
    </div>
 )
}