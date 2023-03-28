import { useAuthContext } from 'renderer/hooks/contextHooks/useContext';

const LoginView = () => {
  const { signInWithGoogle } = useAuthContext();

  return (
    <>
      <div>
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="button">Sign in</button>
        <button type="button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </>
  );
};

export default LoginView;
