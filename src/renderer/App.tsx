import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Digital from './components/views/digital/digital';
import Hourglass from './components/views/hourglass/hourglass';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Digital />} />
        <Route path="/hourglass" element={<Hourglass />} />
      </Routes>
    </Router>
  );
};

export default App;
