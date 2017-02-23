import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import "../css/readmeViewer.css";

class ReadmeViewer extends Component {
  constructor(props) {
    super(props);
    this.access_token = "f44b55796f2125013fe101c5a0b344586e315c01";
    this.state = {
      readme: "<br>Pick a project to view its Readme!",
    };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchReadme(nextProps);  
  }

  fetchReadme(nextProps) {
    let project = nextProps.project;
    if (!project) return
    fetch(
      `https://raw.githubusercontent.com/${project.projectDevs[
        0
      ]}/${project.repoName}/master/README.md?access_token=${this.access_token}`,
    )
      .then(response => response.text())
      .then(text => {
        if 
          (text.indexOf("404: Not Found")>-1) this.setState({ readme: `Readme not available for ${project.repoName}.` });
        else
          this.setState({ readme: text });
      })
      .catch(error => console.log("error in fetch request:" + error));
  }

  render() {
    if (this.state.readme)
      return (
        <div className="readme-viewer">
          <br />
          <h3 className="text-center"> Project Readme </h3>
          <hr />
          <ReactMarkdown source={this.state.readme} />
        </div>
      );
    else
      return <div>Loading readme...</div>;
  }
}

export default ReadmeViewer;
