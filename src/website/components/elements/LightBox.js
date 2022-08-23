// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

type Props = {
  className?: string,
  children: Node,
};

function LightBox(props: Props): Node {
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
            <div className="modal-item">
              <FontAwesomeIcon
                className="close"
                icon={faTimes}
                onClick={() => setShowModal(false)}
              />
              {props.children}
            </div>
          </div>,
          document.getElementById('modal'),
        )}
    </>
  );
}

export default LightBox;
