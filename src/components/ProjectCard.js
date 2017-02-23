import React from "react";

const ProjectCard = props => {
  const generateCard = project => {
    return (
      <div
        onClick={() => props.onProjectCardClick(props.index)}
        className="card"
      >
        {project.previewImage &&
          <img
            src={project.previewImage}
            alt="Avatar"
            className="card-img-top avatar mx-auto"
          />}
        <div className="card-block">
          <h5 className="card-title">{project.repoName}</h5>
          <h6 className="card-title">Unit {project.unit} </h6>
          <hr />
          <p className="card-text">{project.projectDevs.join(", ")}</p>
          <hr />
          <div className="row justify-content-center">
            <a href={project.deployedUrl} className="btn btn-primary btn-sm">
              Live Project
            </a>
            <a
              href={
                `https://github.com/
                ${project.projectDevs[0]}/${project.repoName}`
              }
              className="btn btn-primary btn-sm"
            >
              On Github
            </a>
          </div>
        </div>
      </div>
    );
  };

  return generateCard(props.project);
};

export default ProjectCard;
