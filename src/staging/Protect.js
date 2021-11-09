import React, { useState } from "react";
import "./protect.scss";

function Protect({ login }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="protect-wrapper">
      <form className="login-wrapper">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPass(e.target.value)}
        />
        <button onClick={() => login(user, pass)}>Login</button>
      </form>
    </div>
  );
}

export default Protect;
