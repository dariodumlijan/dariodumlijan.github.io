// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

function ScrollToTop(): Node {
  const [show, setShow] = useState(false);
  const body = document.querySelector("body");

  const toTop = () => {
    if (body) body.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = body
        ? body.scrollTop >= body.clientHeight * 0.8
        : null;
      if (scrollOffset) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    if (body) body.addEventListener("scroll", handleScroll);

    return () => {
      if (body) body.removeEventListener("scroll", handleScroll);
    };
  }, [body]);

  return (
    <div id="to-top" className={classNames({ show })} onClick={toTop}>
      <FontAwesomeIcon icon={faAngleUp} />
    </div>
  );
}

export default ScrollToTop;
