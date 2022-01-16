// @flow
import React from "react";
import type { Node } from "react";

function Loading(): Node {
  return (
    <div className="loading-fixed">
      <div className="loader">Loading...</div>
      <h2>The page is loading</h2>
    </div>
  );
}

export default Loading;
