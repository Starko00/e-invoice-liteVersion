import axios from "axios";
import { useContext, useEffect } from "react";
import { UserContext } from "../App";
import { LoadingAnimation } from "../Components/AuthComponents/LoadingElement/LoadingAnimation";
import { MainNavigation } from "../Components/AuthComponents/NavigationComponent/MainNavigation";

export const HomePage = () => {
  const [user, setUser] = useContext(UserContext);
  useEffect(() => {
    axios
      .post(
        "/json.rpc",
        {
          jsonrpc: "2.0",
          method: "Auth.GetSessionInfo",
          params: [true],
          id: 280755,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setUser(res.data.result);
    
      });
      console.log(user)
  }, []);

 

  return (
    <div>
     <MainNavigation />
      
     
    </div>
  );
};

