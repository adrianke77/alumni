import _ from "lodash";
import React, { Component } from "react";
import "./css/App.css";
import data from "./data.json";
import AlumniCardList from "./components/AlumniCardList.js";
import ProjectsViewer from "./components/ProjectsViewer.js";
import ReadmeViewer from "./components/ReadmeViewer.js";
import ProjectList from "./components/ProjectList.js";
import Navbar from "./components/Navbar.js";

class App extends Component {
  constructor() {
    super();

    const projectNos = [1, 2, 3, 4];

    this.projectNos = projectNos;

    // consolidate all projects in an array
    const allProjectsList = data.reduce(
      (list, person) => {
        let login = person.githubLogin;
        let projects = [];
        projects = projectNos.reduce(
          (accum, no) => {
            if (person["project" + no]) {
              let project = person["project" + no];
              let projectDevs = [];
              projectDevs.push(login);
              if (project.collaborators)
                projectDevs = projectDevs.concat(project.collaborators);
              project["projectDevs"] = projectDevs;
              project["unit"] = no;
              return accum.concat(project);
            }
            return accum;
          },
          [],
        );
        return list.concat(projects);
      },
      [],
    );

    // filter out dupes
    let projectDupeTracker = {}; //key is repoName, value is deployedURL
    let masterProjectsList = allProjectsList.filter(project => {
      if (
        projectDupeTracker[project.repoName] &&
        projectDupeTracker[project.repoName] === project.deployedUrl
      )
        return false;
      projectDupeTracker[project.repoName] = project.deployedUrl;
      return true;
    });

    this.masterProjectsList = masterProjectsList;

    let projectFiltersByUnit = {};
    projectNos.forEach(no => projectFiltersByUnit[no] = true);
    this.state = {
      selectedAlumniIndex: 0,
      selectedProjectIndex: 0,
      viewing: "alumni",
      viewableProjectsList: masterProjectsList,
      projectFiltersByUnit: projectFiltersByUnit,
    };
  }

  changeProjByUnitFilter(value) {
    let projectFiltersByUnit = this.state.projectFiltersByUnit;
    projectFiltersByUnit[value] = !projectFiltersByUnit[value];
    this.setState({ projectFiltersByUnit });
    this.setState({ selectedProjectIndex: 0 });
    this.updateViewableProjectsList();
  }

  updateViewableProjectsList() {
    let visibleProjects = this.masterProjectsList.filter(
      (project,ind,arr) => {
      let allowed = true;
      this.projectNos.forEach(no => {
        if (
          this.state.projectFiltersByUnit[no] === false && project.unit === no
        )
          allowed = false;
      });
      return allowed
    });
    this.setState({ viewableProjectsList: visibleProjects });
    console.log("viewableProjectsList:",this.state.viewableProjectsList)
    console.log("selectedprojectindex:",this.state.selectedProjectIndex)
  }

  render() {
    return (
      <div>
        <Navbar
          onButtonClick={(function(viewing) {
            this.setState({ viewing });
          }).bind(this)}
          onProjFilterClick={this.changeProjByUnitFilter.bind(this)}
          viewing={this.state.viewing}
        />
        {this.state.viewing === "alumni" &&
          <div className="row">
            <div className="col-sm-4">
              <ProjectsViewer
                selectedData={data[this.state.selectedAlumniIndex]}
              />
            </div>
            <div className="col-sm-8">
              <AlumniCardList
                data={data}
                onAlumniCardClick={(function(selectedAlumniIndex) {
                  this.setState({ selectedAlumniIndex });
                }).bind(this)}
              />
            </div>
          </div>}
        {this.state.viewing === "projects" &&
          <div className="row">
            <div className="col-sm-5">
              <ReadmeViewer
                project={
                  this.state.viewableProjectsList[this.state.selectedProjectIndex]
                }
              />
            </div>
            <div className="col-sm-7">
              <ProjectList
                projects={this.state.viewableProjectsList}
                onProjectCardClick={(function(selectedProjectIndex) {
                  this.setState({ selectedProjectIndex });
                }).bind(this)}
              />
            </div>
          </div>}
      </div>
    );
  }
}

export default App;
