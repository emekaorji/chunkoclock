import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import LoginView from './components/views/loginView/loginView';
import SignupView from './components/views/signupView/signupView';
import Digital from './components/views/timerView/timerView';
import AuthProvider from './provider/authProvider';
// import Hourglass from './components/views/hourglass/hourglass';
import './styles/global.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Digital />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          {/* <Route path="/hourglass" element={<Hourglass />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
