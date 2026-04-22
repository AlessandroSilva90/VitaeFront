import { Outlet } from "react-router-dom";
import "./Auth.scss";

import illustration from "../assets/illust.jpg";
import illustration2 from "../assets/illu1.png";
import illustration3 from "../assets/illu2.png";

import star  from "../assets/star.svg";

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="design-content">
        <img src={illustration2} />
      </div>
      <div className="wavelg">
        <h1 className="vitaeLogo">VITAE <img style={{marginLeft:"15px", marginTop:"15px"}} width={30} src={star}  /></h1>
        <div className="ctn-form">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;


