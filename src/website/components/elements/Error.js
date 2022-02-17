// @flow
import React from "react";
import type { Node } from "react";
import { Link } from "react-router-dom";

type Props = {
  error: string,
};

function Error(props: Props): Node {
  return (
    <div className="error-wrapper">
      <div className="error-title">Error...</div>
      <span className="error">
        There has been an error while loading the site!
      </span>
      <span className="error hide">{props.error}</span>
      <Link className="error-link" to="/">
        Home
      </Link>
    </div>
  );
}

export default Error;
