import axios from "axios"
import { useEffect } from "react"

export const HomePage = ()=>{
    useEffect(()=>{
        axios
        .post(
          "/json.rpc",
          {
            jsonrpc: "2.0",
            method: "Auth.GetSessionInfo",
            params: [],
            id:280755
            
          },
          {
            withCredentials: true,
          }
        ).then(res=>console.log(res))
        
    })
    return <div>Home page</div>
}