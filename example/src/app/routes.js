import Home from './pages/Home';
import Planets from './pages/Planets';

export default [{
  path: '/',
  exact: true,
  component: Home,
}, {
  path: '/planets',
  component: Planets
}];
