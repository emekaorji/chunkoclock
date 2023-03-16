import { useContext } from 'react';
import { TimerViewContext } from '../provider/timerViewProvider';
import { TimerViewContextInterface } from '../types/contextType';

const useTimerViewContext = () =>
  useContext(TimerViewContext) as TimerViewContextInterface;

export default useTimerViewContext;
