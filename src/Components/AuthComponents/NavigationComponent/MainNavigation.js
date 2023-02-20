import { useContext } from "react";
import MainNavigationStyle from "./MainNavigationStyle.module.css";
import { UserContext } from "../../../App";
import { json } from "react-router-dom";
export const MainNavigation = () => {
  const style = MainNavigationStyle;
  const [user, setUser] = useContext(UserContext);
  return (
    <div className={style.navigationHolder}>
      <div className={style.userPictureHolder}></div>
      <div className={style.userBasicInfo}>
        {user?.User?.Name}
        <div className={style.organizationInfo}>
          {user?.Organization?.Title}
        </div>
      </div>
      {JSON.stringify(user)}

     
    </div>
  );
};
