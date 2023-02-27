import { useMemo, useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const Hello = () => {
  const [time, setTime] = useState(230);

  const minutes = useMemo(() => {
    return Math.floor(time / 60);
  }, [time]);

  return (
    <div>
      <h1>{minutes}</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
};

export default App;
