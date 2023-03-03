import { Outlet, useNavigate } from "react-router-dom";
import {useEffect} from 'react'
export const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);

  return <div>404</div>;
};
