import React from 'react';
import matchPath from 'react-router/matchPath';

function dispatchIfMatch(dispatch, requirement, path, query) {
  const match = matchPath(path, requirement[0]);
  return match
    ? dispatch(requirement[1](match.params, query))
    : Promise.resolve();
}

export default function fetchComponentData(dispatch, route, path, query) {
  const promises = route.component.requirements.map(requirement => {
    return typeof(requirement) === 'function'
      ? dispatch(requirement())
      : dispatchIfMatch(dispatch, requirement, path, query);
  });
  return Promise.all(promises);
}
