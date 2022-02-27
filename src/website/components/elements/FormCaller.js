// @flow
import React, { useState } from "react";
import type { Node } from "react";
import ReactDOM from "react-dom";
import Form from "../blocks/Form";

type Props = {
  className?: string,
  children: Node,
};

function FormCaller(props: Props): Node {
  const [showModal, setShowModal] = useState();

  return (
    <>
      <div className={props.className} onClick={() => setShowModal(true)}>
        {props.children}
      </div>
      {showModal &&
        ReactDOM.createPortal(
          <div className="modal-overlay">
            <Form close={() => setShowModal(false)} />
          </div>,
          document.getElementById("modal")
        )}
    </>
  );
}

export default FormCaller;
