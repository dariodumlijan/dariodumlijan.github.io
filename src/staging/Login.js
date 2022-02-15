// @flow
import React, { useState } from "react";
import type { Node } from "react";
import useLocale from "../website/locale";
import "./login.scss";

type Props = {
  onSubmit: Function,
};

function Login(props: Props): Node {
  const t = useLocale;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <input
          type="text"
          placeholder={t("login.username")}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder={t("login.password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={() => props.onSubmit({ username, password })}>
          {t("login.cta")}
        </button>
      </div>
    </div>
  );
}

export default Login;
