import React from "react";
import NavbarComponent from "./NavbarComponent";
import { Container } from "react-bootstrap";
import UserData from "./UserData";
import WithdrawalRequests from "./WithdrawalRequests";
import AllFundTransfer from "./AllFundTransfer";
import { useEffect } from "react";
import { useState } from "react";

const DashboardAdmin = () => {
  const [isTokenValid, setIsTokenValid] = useState(true);
  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };

  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };

  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []);
  const checkT = localStorage.getItem("check");
  return (
    <>
    {checkT?(
      <>
       { isTokenValid ? (
        <div>
          <NavbarComponent />
          <Container>
            <UserData />
            <WithdrawalRequests />
            <AllFundTransfer />
          </Container>
        </div>
      ) : (
        <>
          <h6>Session expired, Login to continue </h6>
        </>
      )}</>
    ):(<>
    <h4> You are not Authorized</h4>
    </>)}
     
    </>
  );
};

export default DashboardAdmin;
