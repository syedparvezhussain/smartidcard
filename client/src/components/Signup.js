import React, { useState } from "react";

const Signup = ({handleLogin, isLoggedin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
    const [role, setRole] = useState("");
  const [roleId, setRoleId] = useState("");
    const [id, setId] = useState("");

  async function logJSONData(username,password) {
  const response = await fetch(`http://localhost:5000/signUp?username=${username}&password=${password}
  &id=${id}
  &role=${role}
  &roleId=${roleId}
  &name=${name}`);
  const jsonData = await response.json();
  console.log(jsonData);
  alert(JSON.stringify(jsonData))
}
const handleSignInSubmit =(e)=>{
   e.preventDefault();
    console.log(`Username: ${username} Password: ${password}`);
    //make an API call
logJSONData(username,password);

}
  return (
    <div className="login-container">
    <h1>{"sign up"}</h1>
      <form onSubmit={handleSignInSubmit }>
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
          <div className="form-group">
          <label htmlFor="password">name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
          <div className="form-group">
          <label htmlFor="password">role:</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
          <div className="form-group">
          <label htmlFor="password">roleId:</label>
          <input
            id="roleId"
            type="text"
            value={roleId}
            onChange={(event) => setRoleId(event.target.value)}
          />
        </div>
          <div className="form-group">
          <label htmlFor="password">id:</label>
          <input
            id="id"
            type="text"
            value={id}
            onChange={(event) => setId(event.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form> 
    </div>
  );
};

export default Signup;
