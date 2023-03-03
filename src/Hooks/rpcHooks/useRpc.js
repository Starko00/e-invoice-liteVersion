import React, { useEffect, useState } from "react";
import axios from "axios";
import SHA1 from "../../utils/hashFunction";
import reverString from "../../utils/reverseString";
import { useNavigate } from "react-router-dom";

function useRpc() {
  const _id = Math.floor(Math.random() * 1000000); // gives a random id number to the request // not necessary
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [request, setRequest] = useState(null);
  const [userName, setUserName] = useState(null);
  const [password, setPassword] = useState(null);
  useEffect(() => {
    axios
      .post(
        "/json.rpc",
        {
          jsonrpc: "2.0",
          method: "Auth.GetSessionInfo",
          params: [],
          id: _id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data?.error) {
          setData(res.data.error);
        } else {
          navigate("/home");
        }
      });
  }, []); // Cheks if the active session exists
  useEffect(() => {
    if (data?.result) {
      clientProve(_id, userName, password, data.result); //Checks if the password is correct only activates if challange is present
    }
    setRequest(false);
    setLoading(false); //Puts the finnal loading to false // acts as failsafe in case of experimental or connected requests
  }, [request]);

  const clientLogin = (userName, password) => {
    setUserName(userName);
    setPassword(password);
    setLoading(true);
    axios
      .post(
        "/json.rpc",
        {
          jsonrpc: "2.0",
          id: _id,
          method: "Auth.IdentifyUsername",
          params: { username: userName },
        },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data);
        setRequest(true);
      })
      .catch((err) => setError(err))
      .finally(() => {
        console.log(data, "User auth");
      });
  }; // Client login funtion exported to the front, sends an RPC request and changes the state of the data prop, the state of the loading is set not to change as this function is connected to the validation
  const clientProve = (_id, userName, password, challange) => {
    axios
      .post(
        "/json.rpc",
        {
          jsonrpc: "2.0",
          id: _id,
          method: "Auth.AuthenticateUsername",
          params: {
            challenge: challange,
            proof: SHA1(
              SHA1(password + SHA1(reverString(userName))) + challange
            ),
          },
        },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => setError(err))
      .finally(() => {
        setLoading(false);
      });
  }; // Function that thakes challange and proves the matched identity and the password
  const changeOrg = (organizationId) => {
    axios
      .post("/json.rpc", {
        jsonrpc: "2.0",
        method: "Auth.ChangeOrganization",
        params: { orgid: organizationId },
      })
      .then((res) => window.location.reload(true));
  }; //Changes the organization, if the session is valid changes the user org to the provided organization ID

  const testingFunction = () => {
    axios.post("/json.rpc", {
      jsonrpc: "2.0",
      method: "Data.GetEntityData",
      params: {
        entity: "1a7ca589-9d77-4a7f-a0dc-d116c5878187",
      },
      id: _id,
    });
  };

  const initNewInvoice = () => {
    axios
      .post("/json.rpc", {
        jsonrpc: "2.0",
        method: "Extension.Execute",
        params: {
          extension: "EUeInvoices.GetInitializedNewInvoice",
          args: {
            Partial: "UIEdit",
          },
        },
        id: _id,
      })
      .then((res) => {
        if (res.data?.result.Result) {
          setData(res.data.result.Result);
        } else {
          setData({ error: "Cant get the invoice object" });
        }
      });
  };
  const getInvoOwnerInfo = () => {
    axios
      .post("/json.rpc", {
        jsonrpc: "2.0",
        method: "Data.GetEntityData",
        params: {
          entity: "EU_AOrg",
          skip: null,
          take: null,
        },
        id: _id,
      })
      .then((res) => {
        setData(res.data);
      });
  }; // Gets the information of the current inovice owner

  const saveInvoice = (invoice) => {
    console.log( {args: {
      Partial: "UIEdit",
      invoice,
    },})
    axios
      .post("/json.rpc", {
        jsonrpc: "2.0",
        method: "Extension.Execute",
        params: {
          extension: "EUeInvoices.SaveInvoice",

          args: {
            Partial: "UIEdit",
           invoice,
            AdditionalSteps:[35,40]
          },
        },
        id: _id,
      })
      .then((res) => {
        console.log(res);
      });
  };

  return {
    data,
    loading,
    error,
    clientLogin,
    changeOrg,
    testingFunction,
    initNewInvoice,
    getInvoOwnerInfo,
    saveInvoice
  }; // returns necessary states, like data loading and error, others are functions
}

export default useRpc;
