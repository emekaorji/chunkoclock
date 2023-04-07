import { useContext } from 'react';
import { HomeViewContext } from '../provider/homeViewProvider';
import { HomeViewContextInterface } from '../types/contextType';

const useHomeViewContext = () =>
  useContext(HomeViewContext) as HomeViewContextInterface;

export default useHomeViewContext;
