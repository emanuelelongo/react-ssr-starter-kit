import { renderRoutes } from 'react-router-config';

export default function(routes) {
  return [{
    component:  ({ route }) => renderRoutes(route.routes),
    routes
  }];
}