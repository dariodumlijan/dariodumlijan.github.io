// @flow
import React, { useEffect, useState } from "react";
import type { Node } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";

const screenHeight = window.innerHeight || 0;

function ScrollToTop(): Node {
  const [show, setShow] = useState(false);

  const handleScroll = () => {
    const scrollOffset = window.pageYOffset >= screenHeight * 0.8;
    if (scrollOffset) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const toTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", () => handleScroll);
    };
  }, []);

  return (
    <div id="to-top" className={show ? "active" : ""} onClick={toTop}>
      <FontAwesomeIcon icon={faAngleUp} />
    </div>
  );
}

export default ScrollToTop;
