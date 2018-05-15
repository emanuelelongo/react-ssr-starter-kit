import React from 'react';
import { matchRoutes } from 'react-router-config'

export default function(path, routes) {
  return matchRoutes(routes, path)
    .map(({ route }) => route)
    .filter(route => route.component)
    .filter(route => route.component.requirements)[0];
}
