import { useContext } from 'react';
import { AuthContext } from 'renderer/provider/authProvider';
import { AuthContextInterface } from 'renderer/types/contextType';

const useAuthContext = () => useContext(AuthContext) as AuthContextInterface;

// eslint-disable-next-line import/prefer-default-export
export { useAuthContext };
