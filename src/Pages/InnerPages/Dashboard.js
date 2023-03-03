import { useContext, useEffect } from "react";

import { LoadingAnimation } from "../../Components/AuthComponents/LoadingElement/LoadingAnimation";
import { InvoiceEditor } from "../../Components/InoviceEditor/InoviceEditor";
import useRpc from "../../Hooks/rpcHooks/useRpc";

export const Dashboard = () => {
  const { data, initNewInvoice } = useRpc();
  useEffect(() => {
    initNewInvoice();
  }, []);

  return (
    <>
      <p>Dashboard</p>
      {data ? <InvoiceEditor props={data} /> : <LoadingAnimation />}

      {/* {JSON.stringify(data)} */}
    </>
  );
};
