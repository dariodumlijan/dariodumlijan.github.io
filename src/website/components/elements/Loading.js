import React from "react";
import "../../styles/loading.scss";

function Loading() {
  return (
    <div className="loading-fixed">
      <div className="loader">Loading...</div>
      <h2>The page is loading</h2>
    </div>
  );
}

export default Loading;
