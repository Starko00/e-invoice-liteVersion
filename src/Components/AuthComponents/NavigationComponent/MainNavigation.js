import { useContext } from "react";
import MainNavigationStyle from "./MainNavigationStyle.module.css";
import { UserContext } from "../../../App";
import logo from "./../../../resources/logo.svg";
import { BsFillCaretDownFill, BsPersonFill } from "react-icons/bs";

import axios from "axios";
import useRpc from "../../../Hooks/rpcHooks/useRpc";
export const MainNavigation = () => {
  const style = MainNavigationStyle;
  const { changeOrg } = useRpc();
  const [user, setUser] = useContext(UserContext);

  return (
    <div className={style.navigationHolder}>
      <div className={style.logoHolder}>
        <img src={logo} />
      </div>

      <div className={style.userInformationHolder}>
        <div className={style.userPictureHolder}>
          <BsPersonFill className={style.userIcon} />
        </div>

        <div className={style.userBasicInfo}>
          {user?.User?.Name}

          <div className={style.organizationInfo}>
            <div className={style.primaryOrganizationHolder}>
              {user?.Organization?.Title}{" "}
              <BsFillCaretDownFill className={style.dropDownIcon} />
            </div>

            <div className={style.organizationsHolder}>
              {user.AuthorizedOrganizations?.map((org) => {
                return (
                  <p
                    key={org.Id}
                    onClick={() => {
                      console.log(org.id);
                      changeOrg(org.Id);
                    }}
                  >
                    {JSON.stringify(org.Title).replaceAll('"', "")}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
