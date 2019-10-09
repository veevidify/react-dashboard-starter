import React from 'react';

interface Props {
  noMargin?: boolean;
}

const Loading: React.FC<Props> = ({ noMargin }) => (
  <div className={`spinner ${!noMargin && 'margin'}`}>
    <div className="double-bounce1" />
    <div className="double-bounce2" />
  </div>
);

export default Loading;
