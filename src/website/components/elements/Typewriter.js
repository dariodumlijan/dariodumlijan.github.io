// @flow
import React, { useEffect, useState } from 'react';
import type { Node } from 'react';
import classNames from 'classnames';

type Props = {
  messageStatic: string,
  prompts: string[],
  className?: string,
};

let index = 0;
let del = false;

function Typewriter(props: Props): Node {
  const className = classNames('typewriter', props.className);
  const [animation, setAnimation] = useState(null);
  const [type, setType] = useState(props.prompts[index]);

  useEffect(() => {
    const handleEffect = () => {
      const newAddPosition = type.length + 1;
      const newDelPosition = type.length - 1;

      if (type.length === props.prompts[index].length) {
        del = true;
        clearTimeout(animation);
        setAnimation(
          setTimeout(() => {
            setType(props.prompts[index].substring(0, newDelPosition));
          }, 2000),
        );

        return;
      }
      if (type.length === 0) {
        index = index === props.prompts.length - 1 ? 0 : index + 1;
        del = false;
      }

      if (!del) {
        setType(props.prompts[index].substring(0, newAddPosition));
      }
      if (del) {
        setType(props.prompts[index].substring(0, newDelPosition));
      }
    };

    setAnimation(setTimeout(handleEffect, 150));

    return () => clearTimeout(animation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <span className={className}>
      {props.messageStatic + type}
      <div className="carrot" />
    </span>
  );
}

export default Typewriter;
