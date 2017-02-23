import React, { Component } from "react";
import "../css/alumniCard.css";

class AlumniCard extends Component {
  constructor(props) {
    super(props);
    this.access_token = "f44b55796f2125013fe101c5a0b344586e315c01"
    this.state = {
      personData: {}
    };
  }

  componentDidMount() {
    // get data for one person and do a setState when data arrives
    // the setState causes render() to run again
    fetch(
      `https://api.github.com/users/${this.props.githubLogin}?access_token=${this.access_token}`,
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ personData: json });
      })
      .catch(error => console.log("error in fetch request:" + error));
  }

  render() {
    if (this.state.personData.login) {
      return this.generateCard(this.state.personData);
    } else {
      return (
        <div className="card"> Loading.. </div>
      );
    }
  }

  generateCard(data) {
    return (
      <div onClick={() => this.props.onAlumniCardClick(this.props.index)} 
      className="card">
        <img
          src={data.avatar_url}
          alt="Avatar"
          className="card-img-top avatar mx-auto"
        />
        <div className="card-block">
          <h3 className="card-title">{data.login}</h3>
          <p className="card-text">{data.name}</p>
          <hr />
          <p className="card-text">{data.bio}</p>
          <br />
          <div className="row justify-content-center">
            <a href={data.html_url} className="btn btn-primary">Github</a>
            {data.blog &&
              <a href={data.blog} className="btn btn-primary">Personal Link</a>}
          </div>
        </div>
      </div>
    );
  }
}

export default AlumniCard;
