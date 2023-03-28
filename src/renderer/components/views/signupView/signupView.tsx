const SignupView = () => {
  return (
    <>
      <div>
        <input type="text" placeholder="Enter username" />
        <input type="password" placeholder="Enter Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="button">Sign up</button>
        <button type="button">Sign in with Google</button>
      </div>
    </>
  );
};

export default SignupView;
