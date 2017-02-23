import React from "react";
import ProjectCard from "./ProjectCard";
import "../css/projectList.css";

const ProjectList= props => {

const projectCardItems = props.projects.map((project,index) => {
    return (
    <ProjectCard 
    key={`${project.repoName}${project.deployedUrl}`} 
    project={project} 
    index={index}
    onProjectCardClick={props.onProjectCardClick}
    />
    );
  });

  return (
    <div className="project-card-list card-deck">
      {projectCardItems}
    </div>
  );
};

export default ProjectList;
