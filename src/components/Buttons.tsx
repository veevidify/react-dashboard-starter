import React from 'react';
import { Button } from 'grommet';
import styled from 'styled-components';

export const SpacedButton: React.FC<{ label: string; click: () => void }> = ({ label, click }) => (
  <Button primary onClick={() => click()} label={label} />
);

export const CondensedButton = styled(Button)`
  padding: 6px;
`;
