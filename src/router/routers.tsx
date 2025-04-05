// src/routes/routes.tsx
import { useRoutes } from 'react-router-dom';
import Home from '../pages/Home';
import Projects from '../components/Projects';

const Router = () => {
  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/projects', element: <Projects /> },
  ]);

  return routes;
};

export default Router;
