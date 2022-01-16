// @flow
import React from "react";
import type { Node } from "react";

function Footer(): Node {
  // render the fetched Contentful data
  return (
    <footer id="footer">
      <span>
        Chimera Studio | Copyright &copy; {new Date().getFullYear()} | All
        rights reserved
      </span>
    </footer>
  );
}

export default Footer;
