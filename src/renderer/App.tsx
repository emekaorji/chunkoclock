import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './provider/authProvider';
import HomeView from './components/views/homeView/homeView';
import LoginView from './components/views/loginView/loginView';
import SignupView from './components/views/signupView/signupView';
// import Hourglass from './components/views/hourglass/hourglass';
import './styles/global.css';
import './styles/variables.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          {/* <Route path="/hourglass" element={<Hourglass />} /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
