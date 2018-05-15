import React from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchPeople } from '../actions';

class People extends React.Component {
  componentDidMount() {
    if(this.props.people.length === 0) {
      const search = this.props.location.search.split('=')[1];
      this.props.fetchPeople(search);
    }
  }

  render() {
    const { people } = this.props;

    return (
      <div>
        <Link to={'/'}>Star Wars</Link>
        <br/>
        <h2>People</h2>
          <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Year</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Skin Color</th>
              <th>Eye Color</th>
              <th>Hair Color</th>
            </tr>
          </thead>
          <tbody>
              { 
                people.map(i => <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>{i.birth_year}</td>
                  <td>{i.height}</td>
                  <td>{i.mass}</td>
                  <td>{i.skin_color}</td>
                  <td>{i.eye_color}</td>
                  <td>{i.hair_color}</td>
                </tr>)
              } 
          </tbody>
          </table>
      </div>
    )
  }
}

People.requirements = [
  ['/people', (params, query) => fetchPeople(query.search) ]
]

function mapStateToProps(state) {
  return {
    people: state.people
  }
}

export default connect(mapStateToProps, {fetchPeople})(People)
