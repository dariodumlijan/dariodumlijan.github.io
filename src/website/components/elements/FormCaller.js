// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import ReactDOM from 'react-dom';
import Form from '../blocks/Form';

type Props = {
  className?: string,
  children: Node,
};

function FormCaller(props: Props): Node {
  const [showModal, setShowModal] = useState();
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && modalRef.current === e.target) {
        setShowModal(false);
      }
    };

    window.addEventListener('click', handleClick);

    return () => window.removeEventListener('click', handleClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={props.className} onClick={() => setShowModal(true)}>
        {props.children}
      </div>
      {showModal
        && ReactDOM.createPortal(
          <div ref={modalRef} className="modal-overlay">
            <Form close={() => setShowModal(false)} />
          </div>,
          document.getElementById('modal'),
        )}
    </>
  );
}

export default FormCaller;
