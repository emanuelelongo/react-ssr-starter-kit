import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h2>Star Wars</h2>

        <Link to={`/planets`}>Planets</Link>
      </div>
    );
  }
}