import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import landing from "../../assets/images/landing.svg";
import studyIcon from "../../assets/images/icons/study.svg";
import giveClassesIcon from "../../assets/images/icons/give-classes.svg";
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg";
import "./styles.css";
import { Link } from "react-router-dom";
import api from "../../services/api";

const Landing = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  useEffect(() => {
    api.get("/connections").then((response) => {
      setTotalConnections(response.data.total);
    });
  }, []);

  return (
    <div id="page-landing">
      <div id="page-landing-content" className="container">
        <div className="logo-container">
          <img src={logo} alt="logo-proffy" />
          <h2>Sua plataforma de estudos online.</h2>
        </div>
        <img className="hero-image" src={landing} alt="landing-page-proffy" />
        <div className="buttons-container">
          <Link to="/study" className="study">
            <img src={studyIcon} alt="study-icon" />
            Estudar
          </Link>
          <Link to="/give-classes" className="give-classes">
            <img src={giveClassesIcon} alt="give-classes-icon" />
            Dar aulas
          </Link>
        </div>
        <span className="total-connections">
          Total de {totalConnections} conexões já realizadas
          <img src={purpleHeartIcon} alt="purple-heart" />
        </span>
      </div>
    </div>
  );
};

export default Landing;
