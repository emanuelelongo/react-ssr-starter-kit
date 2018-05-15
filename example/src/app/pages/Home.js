import React from 'react';
import { Link } from 'react-router-dom';

export default class Home extends React.Component {
  
  handleKeyPress(event) {
    if (event.key === 'Enter') {
        this.props.history.push(`/people?search=${event.target.value}`);
    }
  }


  render() {
    return (
      <div>
        <h2>Star Wars</h2>

        <Link to={`/planets`}>Go to Planets List</Link>
        <br/>
        <br/>
        Search people: <input type="text" onKeyPress={this.handleKeyPress.bind(this)}/>
      </div>
    );
  }
}
