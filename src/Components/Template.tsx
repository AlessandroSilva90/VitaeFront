import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const TemplateContent = () => {
    return ( 
        <div className="content">
            <Sidebar/>
            <Outlet/>
        </div>
     );
}
 
export default TemplateContent;