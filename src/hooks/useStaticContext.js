import React, { useContext } from 'react'; // eslint-disable-line no-unused-vars
import { staticContextContext } from '@src/context';

const useStaticContext = () => {
  return useContext(staticContextContext);
};

export default useStaticContext;
