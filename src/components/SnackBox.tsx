import { Box } from 'grommet';
import React from 'react';

const SnackBox: React.FC = ({ children }) => (
  <Box
    pad="small"
    round="small"
    background="status-error"
    direction="column"
    border={{ color: 'status-error', size: 'small' }}
  >
    {children}
  </Box>
);

export default SnackBox;
