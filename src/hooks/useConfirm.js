import { useContext } from 'react';
import ConfirmContext from '../contexts/ConfirmContext';

function useConfirm() {
  return useContext(ConfirmContext);
}

export default useConfirm;
