import { useContext, useEffect } from "react";
import DashboardStyle from "./DashboardStyle.module.css";
import { LoadingAnimation } from "../../Components/AuthComponents/LoadingElement/LoadingAnimation";
import { InvoiceEditor } from "../../Components/InoviceEditor/InoviceEditor";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import { InvoiceGraph } from "../../Components/DashboardComponents/InvoiceGraph";
import { HistoryPrew } from "../../Components/DashboardComponents/HistoryPrew";

export const Dashboard = () => {
  const { data, initNewInvoice } = useRpc();
  useEffect(() => {
    initNewInvoice();
  }, []);
  const style = DashboardStyle;
  return (
    <div className={style.dashboardContainer}>
      <div className={style.LeftSideContainer}>
        <InvoiceGraph />
        <HistoryPrew />
      </div>
      <div className={style.EditorHolder}>
        {" "}
        {data ? <InvoiceEditor props={data} /> : <div><LoadingAnimation /></div>}
      </div>

      {/* {JSON.stringify(data)} */}
    </div>
  );
};
