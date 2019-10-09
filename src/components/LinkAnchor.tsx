import React from 'react';
import { Anchor } from 'grommet';
import { Link } from 'react-router-dom';

const LinkAnchor: React.FC<{ dest: string; text: string }> = ({ dest, text }) => (
  <Link to={dest}>
    <Anchor href={dest} as="span">
      {text}
    </Anchor>
  </Link>
);

export default LinkAnchor;
