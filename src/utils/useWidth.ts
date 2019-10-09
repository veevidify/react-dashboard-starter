import { useContext } from 'react';
import { ResponsiveContext } from 'grommet';

const useWidth = () => useContext(ResponsiveContext);

export default useWidth;
