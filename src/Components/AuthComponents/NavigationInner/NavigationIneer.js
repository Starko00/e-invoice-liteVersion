import { useEffect } from "react";
import {
  BsFileText,
  BsFileTextFill,
  BsFillHouseFill,
  BsFillJournalBookmarkFill,
  BsGearFill,
  BsPersonLinesFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import InnerNavigationStyle from "./InnerNavigationStyle.module.css";

export const NavigationInner = () => {
  const navigate = useNavigate();

  const style = InnerNavigationStyle;

  return (
    <div className={style.container}>
      <div className={style.left}>
        <div
          className={style.menuItemHolder}
          onClick={() => {
            navigate("/home");
          }}
        >
          <div className={style.menuIconHolder}>
            <BsFillHouseFill className={style.icon} />{" "}
          </div>{" "}
          <p>Home</p>
        </div>

        <div
          className={style.menuItemHolder}
          onClick={() => {
            navigate("bills");
          }}
        >
          <div className={style.menuIconHolder}>
            <BsFileTextFill className={style.icon} />
          </div>{" "}
          <p>Fakture</p>
        </div>

        <div
          className={style.menuItemHolder}
          onClick={() => {
            navigate("clients");
          }}
        >
          <div className={style.menuIconHolder}>
            <BsPersonLinesFill className={style.icon} />{" "}
          </div>{" "}
          <p>Klijenti</p>
        </div>

        <div
          className={style.menuItemHolder}
          onClick={() => {
            navigate("articles");
          }}
        >
          <div className={style.menuIconHolder}>
            {" "}
            <BsFillJournalBookmarkFill className={style.icon} />
          </div>{" "}
          <p>Sifrarnik</p>
        </div>
      </div>
      <div className={style.right}>
        <div
          className={style.menuItemHolder}
          onClick={() => {
            navigate("settings");
          }}
        >
          <div className={style.menuIconHolder}>
            {" "}
            <BsGearFill className={style.icon} />
          </div>{" "}
          <p>Settings</p>
        </div>
      </div>
    </div>
  );
};
