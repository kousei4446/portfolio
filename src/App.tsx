// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import Router from './router/routers';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
