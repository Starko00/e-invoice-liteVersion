import { useContext, useEffect, useState } from "react";
import DashboardStyle from "./DashboardStyle.module.css";
import { LoadingAnimation } from "../../Components/AuthComponents/LoadingElement/LoadingAnimation";
import { InvoiceEditor } from "../../Components/InoviceEditor/InoviceEditor";
import useRpc from "../../Hooks/rpcHooks/useRpc";
import { InvoiceGraph } from "../../Components/DashboardComponents/InvoiceGraph";
import { HistoryPrew } from "../../Components/DashboardComponents/HistoryPrew";

export const Dashboard = () => {
  const { data, initNewInvoice } = useRpc();
  const [invoiceEditorReset, setInvoiceEditorReset] = useState(false)
  useEffect(() => {
    initNewInvoice();
  }, []);
  useEffect(()=>{
    if(invoiceEditorReset === true){
     console.log("Reseting")
    }
    setInvoiceEditorReset(false)
  },[invoiceEditorReset])
  const style = DashboardStyle;
  return (
    <div className={style.dashboardContainer}>
      <div className={style.LeftSideContainer}>
        <InvoiceGraph />
        <HistoryPrew />
      </div>
      <div className={style.EditorHolder}>
        {" "}
        {data ? <InvoiceEditor props={data} resetInvoiceEditor={setInvoiceEditorReset}/> : <div><LoadingAnimation /></div>}
      </div>

      {/* {JSON.stringify(data)} */}
    </div>
  );
};
