import { useEffect, useState } from "react";
import useRpc from "../../../Hooks/rpcHooks/useRpc";
import searchResoultStyle from "./searchResoultStyle.module.css";
export const SearchResoult = ({ searchIntent, functions }) => {
  const style = searchResoultStyle;
  const { searchData, searchBuyerRegister } = useRpc();
    const[clicked,setClicked] = useState(false)
  useEffect(() => {
    console.log(searchIntent, "Search parameters");
    searchBuyerRegister(searchIntent);
    setClicked(false)
  }, [searchIntent]);

  return (
 
    <div>
        {searchIntent && clicked == false? <div className={style.container}> {searchData?.result?.Result?.map((buyer) => {
        return (
          <p
            onClick={() => {
              functions(buyer);
              setClicked(!clicked)
            }}
          >
            {buyer.FormalName}{" "}
          </p>
        );
      })}</div>:""}
     
    </div>
  );
};
