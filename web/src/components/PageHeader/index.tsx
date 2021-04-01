import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import backIcon from "../../assets/images/icons/back.svg";
import logo from "../../assets/images/logo.svg";

interface PageHeaderProps {
  title: string;
  description?: string;
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <header className="page-header">
      <div className="top-bar-container">
        <Link to="/">
          <img src={backIcon} alt="back-button-icon" />
        </Link>
        <img src={logo} alt="proffy-logo" />
      </div>

      <div className="header-content">
        <strong>{props.title}</strong>
        {props.description && <p>{props.description}</p>}
        {props.children}
      </div>
    </header>
  );
};

export default PageHeader;
