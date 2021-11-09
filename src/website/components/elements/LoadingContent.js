import React from "react";
import "../../styles/loading.scss";

function LoadingContent() {
  return (
    <div className="loading-relative">
      <div className="loader">Loading...</div>
      <h2>The page is loading</h2>
    </div>
  );
}

export default LoadingContent;
