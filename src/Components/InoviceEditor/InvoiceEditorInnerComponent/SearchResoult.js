import { useEffect, useState } from "react";
import useRpc from "../../../Hooks/rpcHooks/useRpc";
import searchResoultStyle from "./searchResoultStyle.module.css";
export const SearchResoult = ({ searchIntent, functions }) => {
  const style = searchResoultStyle;
  const { searchData, searchBuyerRegister } = useRpc();
  const [clicked, setClicked] = useState(false);
  useEffect(() => {
    console.log(searchIntent, "Search parameters");
    searchBuyerRegister(searchIntent);
    setClicked(false);
  }, [searchIntent]);

  return (
    <div>
      {searchIntent && clicked == false ? (
        <div className={style.container}>
          {" "}
          {searchData?.result?.Result?.map((buyer) => {
            return (
              <p
                key={buyer.DeviceId}
                onClick={() => {
                  functions(buyer);
                  setClicked(!clicked);
                }}
              >
                {" "}
                {buyer.TaxNum},{" "} 
                {buyer.FormalName}
              </p>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};


// "InvStartDate": "2023-03-14T00:00:00.000", period placanja
// "InvEndDate": "2023-03-14T00:00:00.000", kraj perioda placanja
// "InvDueDate": "2023-03-16T00:00:00.000", Invoice rok placanja

//   "InvIssueDate": "2023-03-14T09:40:45.000", izdata...