import React from "react";
import AlumniCard from "./AlumniCard";
import "../css/alumniCardList.css";

const AlumniCardList = props => {
  const alumniCardItems = props.data.map((userData,index) => {
    return (
    <AlumniCard 
    key={userData.githubLogin} 
    githubLogin={userData.githubLogin} 
    index={index}
    onAlumniCardClick={props.onAlumniCardClick}
    />
    );
  });

  return (
    <div className="alumni-card-list card-deck">
      {alumniCardItems}
    </div>
  );
};

export default AlumniCardList;
