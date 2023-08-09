import React, { useState } from "react";
import settings from '../settings.json'
const Login = ({handleLogin, isLoggedin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
 async function loginGetUsers() {
  const response = await fetch(`http://localhost:5000/getusers`, { mode: 'no-cors'}).then((res)=>{
      console.log(res);
  });
  // const jsonData = await response.json()
  // console.log(jsonData);
  // alert(JSON.stringify(jsonData))
}
  const handleSubmit = (event) => {
       loginGetUsers();
    event.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
    // You can add your authentication logic here
 
    const data = settings.data;
    let x= false;
    data.forEach((e)=>{
      if(username == e.userName && password == e.passWord){
        x=true
      }
    })
    if(x){
        handleLogin(true)
    }
    else{
        alert("something is wrong, please try again later with correct iD password")
        //add your validations here
    }

  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
