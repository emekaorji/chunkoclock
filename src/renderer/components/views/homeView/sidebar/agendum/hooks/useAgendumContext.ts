import { useContext } from 'react';
import { AgendumContextInterface } from '../types/contextType';
import { AgendumContext } from '../provider/agendumProvider';

const useAgendumContext = () =>
  useContext(AgendumContext) as AgendumContextInterface;

export default useAgendumContext;
