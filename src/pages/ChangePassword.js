import React, { useState, useEffect } from "react";
import spinner from "../assets/spinner2.gif";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
function Profile() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
    const token = localStorage.getItem("token");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      //   console.log(result); // check the response data

      setData(result);
      setIsLoading(false);
    };
    fetchData();
  }, [token]);
  const userId = "abcd";
  const handleChangePassword = async () => {
    // e.preventDefault();
    setOldPasswordError("");
    setNewPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage('');
    setErrorMessage('');
    let hasError = false;

    if (!oldPassword) {
      setOldPasswordError("Please enter Old Password");
      hasError = true;
    }

    if (!newPassword) {
      setNewPasswordError("Please enter New Password");
      hasError = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Please enter Confirm Password");
      hasError = true;
    }

    if (newPassword !== confirmPassword) {
    setConfirmPasswordError("New Password and Confirm Password must match");
      hasError = true;
    }
    if (!hasError) {
        try {
          const response = await fetch(
            "https://mlm-production.up.railway.app/api/change-password",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                userId: data.userId,
                oldPassword,
                newPassword,
                confirmPassword,
              }),
            }
          );
  
          const data = await response.json();
  
          if (response.status === 200) {
            // Password changed successfully, set the success message
            setSuccessMessage(data.message);
          } else {
            // Handle the error and set the error message
            setErrorMessage(data.message);
          }
        } catch (error) {
          // Handle network or other errors and set the error message
          setErrorMessage("An error occurred while updating the password.");
        }
      }
    };
  if (isLoading) {
    return (
      <h6
        className="text-center"
        style={{
          marginTop: "-70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <img
          src={spinner}
          alt="spinner"
          height="100px"
          width="100px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }
  return (
    <div>
      {token ? (
        <div className="topUPBg">
          <Container className="login_Image ">
            <Row>
              <h6 className="text-center text-secondary">Change Password</h6>

              <Col xs={12} sm={12} md={12}>
                <div className="changePassword">
                {successMessage && <Alert variant="success">{successMessage}</Alert>}
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                  <div>
                    <label>Old Password</label>
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      required
                    />
                    {oldPasswordError && (
                      <Alert variant="danger">{oldPasswordError}</Alert>
                    )}
                  </div>
                  <div>
                    <label>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {newPasswordError && (
                      <Alert variant="danger">{newPasswordError}</Alert>
                    )}
                  </div>
                  <div>
                    <label>Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {confirmPasswordError && (
                      <Alert variant="danger">{confirmPasswordError}</Alert>
                    )}
                  </div>
                  <Button
                    variant="warning"
                    className="changePasswordButton"
                    onClick={handleChangePassword}
                  >
                    Update Password
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <>
          <h6 className="text-center text-secondary m-3">
            Re login to continue...
          </h6>
          <div className="text-center">
          <Link
            to="/login"
            className="text-center text-primary"
            style={{ textDecoration: "underline" }}
          >
            Login
          </Link>
          </div>
          
        </>
      )}
    </div>
  );
}

export default Profile;
