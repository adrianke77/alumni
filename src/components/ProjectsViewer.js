import React from "react";
import "../css/projectsViewer.css";

const ProjectsViewer = ({ selectedData }) => {
  let data = selectedData;
  const projectNos = [1, 2, 3, 4];
  const projectCards = projectNos.reduce(
    (cardList, no) => {
      return cardList.concat(
        <div>
            {data["project" + no] &&
              <div className="card mx-auto">
                <div className="card-block">
                  <h5 className="card-title">{data["project" + no].repoName}</h5>
                  {data["project" + no].previewImage &&
                    <img
                      src={data["project" + no].previewImage}
                      alt="project 1"
                      className="card-img-top"
                    />}
                  <hr />
                  <a
                    href={
                      `https://github.com/${data.githubLogin}/${data["project" + no].repoName}`
                    }
                    className="btn btn-primary"
                  >
                    Project On Github
                  </a>
                  <a
                    href={data["project" + no].deployedUrl}
                    className="btn btn-primary"
                  >
                    Live Project
                  </a>
                </div>
              </div>}
          </div>
        );
    },
    [],
  );

  return (
    <div className="projects-viewer">
    <br/>
    <h3 className="text-center">Alumni's Projects</h3>
      {projectCards}
    </div>
  );
};

export default ProjectsViewer;
