// @flow
import React from "react";
import type { Node } from "react";

function LoadingContent(): Node {
  return (
    <div className="loading-relative">
      <div className="loader">Loading...</div>
      <h2>The page is loading</h2>
    </div>
  );
}

export default LoadingContent;
