// // import React, { useEffect, useState } from "react";
// // import { Col, Container, Row } from "react-bootstrap";

// // const NewGame = () => {
// //   const [targetColor, setTargetColor] = useState("");
// //   const [userChoice, setUserChoice] = useState("");
// //   const predefinedColors = ["Blueviolet", "Red"];

// //     const getRandomColor = () => {
// //       const randomIndex = Math.floor(Math.random() * predefinedColors.length);
// //       return predefinedColors[randomIndex];
// //     };
// //     useEffect(() => {
// //       // Set the targetColor only if it's not set (for the first game)
// //       if (!targetColor) {
// //         setTargetColor(getRandomColor());
// //       }

// //     }, [targetColor ]);

// //     const handleColorSelect = async (color) => {
// //       setUserChoice(color);

// //       const message = `You chose ${color}`;
// //       alert(message);

// //       if(userChoice === targetColor){
// //         alert('You Win');
// //       }
// //     };
// //     if(userChoice === targetColor){
// //       alert('You Win');
// //     }
// //   return (
// //     <div style={{ background: "rgb(199, 129, 129)", height: "100vh" }}>
// //       <div className="game_box"></div>

// //       <Container className="pt-5">
// //         <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
// //           <Col sm={12} md={6} lg={6} className="game_session">
// //             <div>
// //               <h6 className="text-light p-2" style={{ textAlign: "end" }}>
// //                 Game Session
// //               </h6>
// //             </div>
// //           </Col>
// //         </Row>
// //         <Row>
// //           <Col sm={12} md={6} lg={6}></Col>
// //           <div className="color-options">
// //             {predefinedColors.map((color) => (
// //               <button
// //                 key={color}
// //                 style={{ backgroundColor: color.toLowerCase() }}
// //                 onClick={() => handleColorSelect(color)}
// //                 className="game_button"
// //               >
// //                 {color}
// //               </button>
// //             ))}
// //           </div>
// //         </Row>
// //       </Container>
// //     </div>
// //   );
// // };

// // export default NewGame;

// import React, { useEffect, useState } from "react";
// import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";

// const NewGame = () => {
//   const [targetColor, setTargetColor] = useState("");
//   const [userChoice, setUserChoice] = useState("");
//   const [gameResult, setGameResult] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [betAmount, setBetAmount] = useState(0);
//   const [winningAmount, setWinningAmount] = useState(0);
//   const predefinedColors = ["Blueviolet", "Red", "Green"];

//   const getRandomColor = () => {
//     const randomIndex = Math.floor(Math.random() * predefinedColors.length);
//     return predefinedColors[randomIndex];
//   };

//   useEffect(() => {
//     if (!targetColor) {
//       setTargetColor(getRandomColor());
//     }
//   }, [targetColor]);

//   const handleColorSelect = (color) => {
//     setUserChoice(color);
//     setShowModal(true);
//   };

//   const handleBet = () => {
//     const randomChance = Math.random();

//     if (userChoice === targetColor) {
//       const winnings = betAmount * 1.25;
//       setWinningAmount(winnings);
//       setGameResult(`You Win $${winnings}`);
//       // Perform any necessary actions to update the user's balance or wallet for a win
//     } else {
//       setGameResult("You Lose");
//       // Perform any necessary actions for a loss
//     }

//     setShowModal(false); // Close the modal after placing the bet
//   };

//   return (
//     <div style={{ background: "rgb(199, 129, 129)", height: "100vh" }}>
//       <div className="game_box"></div>

//       <Container className="pt-5">
//         <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
//           <Col sm={12} md={6} lg={6} className="game_session">
//             <div>
//               <h6 className="text-light p-2" style={{ textAlign: "end" }}>
//                 Game Session
//               </h6>
//             </div>
//           </Col>
//         </Row>
//         <Row>
//           <Col sm={12} md={6} lg={6} className="game_choice_color">
//             <div className="color-options">
//               {predefinedColors.map((color) => (
//                 <button
//                   key={color}
//                   style={{ backgroundColor: color.toLowerCase(), margin: "5px" }}
//                   onClick={() => handleColorSelect(color)}
//                   className="game_button"
//                   disabled={gameResult !== ""}
//                 >
//                   {color}
//                 </button>
//               ))}
//             </div>
//           </Col>
//         </Row>
//         {gameResult && (
//           <Row>
//             <Col sm={12} md={6} lg={6}>
//               <div className="text-center">
//                 <h5 className="mt-3">{gameResult}</h5>
//                 {gameResult === "You Win $0" ? (
//                   <p>You didn't place a bet.</p>
//                 ) : (
//                   <p>Winning Amount: ${winningAmount}</p>
//                 )}
//               </div>
//             </Col>
//           </Row>
//         )}
//       </Container>

//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Choose Bet Amount</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <p>You chose the color: {userChoice}</p>
//           <Form>
//             <Form.Group controlId="betAmount">
//               <Form.Label>Enter Bet Amount</Form.Label>
//               <Form.Control
//                 type="number"
//                 placeholder="Enter amount"
//                 value={betAmount}
//                 onChange={(e) => setBetAmount(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleBet}>
//             Place Bet
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default NewGame;

//Latest Code

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import welcome from '../assets/gameWelcome.png'
import spinner from '../assets/spinner2.gif'
import QRCODE from "../assets/QRCODE2.jpg";
const NewGame = () => {
  const [targetColor, setTargetColor] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [gameResult, setGameResult] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [betAmount, setBetAmount] = useState(0);
  const [winningAmount, setWinningAmount] = useState("");
  const [profile, setProfile] = useState({});
  const [time, setTime] = useState(60);
  const [uniqueId, setUniqueId] = useState(generateUniqueId());
  const [contentDisabled, setContentDisabled] = useState(false);
  const [timerBlink, setTimerBlink] = useState(false);
  const predefinedColors = ["Blueviolet", "Red", "Green"];
  const [withdrawalHistory, setWithdrawalHistory] = useState([]);
  const [depositHistory, setDepositHistory] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getTokenExpireTime = () => {
    const tokenExpire = localStorage.getItem("tokenExpire");
    return tokenExpire ? parseInt(tokenExpire) : null;
  };
  
  const isTokenExpired = () => {
    const expireTime = getTokenExpireTime();
    return expireTime ? expireTime < Date.now() : true;
  };
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []);  
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    amount: "",
    UTR:"",
  });
  const [formData1, setFormData1] = useState({
    userId: "",
    name: "",
    amount: "",
    UPI: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setFormData1({
      ...formData1,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mlm-production.up.railway.app/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        // const userLevel = getUserLevel(result.level);
        // setLevel(userLevel);
        if(result.role){
          const userrole = result.role
          // console.log(userrole);
          if(userrole === 'admin'){
            localStorage.setItem('check','nfwnwen');
          }
      }
        setData(result);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [token]);
  // const userId = "PI17218169";
  const handleSubmit = async (e) => {
    if(formData.amount<100){
      alert("Minimum Withdrawal Amount 200");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/depositSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, type: "Deposit" }), // Set type to 'Deposit'
        }
      );

      if (response.ok) {
        alert("Deposit request submitted successfully");
      } else {
        alert("Error submitting deposit request");
      }
    } catch (error) {
      alert("Error submitting deposit request", error);
      console.error(error);
    }
  };
  const handleSubmitWithdrawal = async (e) => {
    if(formData1.amount<200){
      alert("Minimum Withdrawal Amount 200");
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/withdrawalSubmit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData1 }), // Set type to 'Deposit'
        }
      );

      if (response.ok) {
        alert("Withdrawal request submitted successfully");
      } else {
        const responseData = await response.json();
        if (responseData.message === "Insufficient Balance") {
          alert("Insufficient Balance. Please check your wallet.");
        } else {
          alert("Error submitting withdrawal request");
        }
      }
    } catch (error) {
      alert("Error submitting deposit request", error);
      console.error(error);
    }
  };
  // const fetchGameHistory = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://mlm-production.up.railway.app/api/game/history/${userId}`
  //     );
  //     setGameHistory(response.data);
  //   } catch (error) {
  //     console.error(`Error fetching game history: ${error}`);
  //   }
  // };

  // useEffect(() => {
  //   fetchGameHistory();
  // }, [userId]);

  const [gameHistory, setGameHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20; // Set the page size (items per page)

  const fetchGameHistory = async (page) => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/game/history/${data.userId}?page=${page}`
      );
      const {
        page: currentPage,
        itemsPerPage,
        totalPages,
        gameHistory,
      } = response.data;

      setCurrentPage(currentPage);
      setTotalPages(totalPages);
      setGameHistory(gameHistory);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchGameHistory(currentPage);
  }, [data.userId, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const fetchWithdrawalHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/history/${data.userId}`
      );
      setWithdrawalHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchWithdrawalHistory();
  }, [data.userId]);
  const fetchDepositHistory = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/deposit/history/${data.userId}`
      );
      setDepositHistory(response.data);
    } catch (error) {
      console.error(`Error fetching game history: ${error}`);
    }
  };

  useEffect(() => {
    fetchDepositHistory();
  }, [data.userId]);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * predefinedColors.length);
    return predefinedColors[randomIndex];
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     if (time > 0) {
  //       setTime(time - 1);
  //       if (time <= 10) {
  //         setContentDisabled(true);
  //       }
  //     } else {
  //       setTime(60);
  //       setContentDisabled(false);
  //       setUniqueId(generateUniqueId()); // Generate a new random 4-digit number for the unique ID
  //     }
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, [time]);
  useEffect(() => {
    const timer = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
        if (time <= 15) {
          setTimerBlink(true);
          setContentDisabled(true);
        } else {
          setTimerBlink(false);
        }
        if (time === 1) {
          setContentDisabled(false);
        }
      } else {
        setTime(60);
        setContentDisabled(false);
        setUniqueId(generateUniqueId());
        setTimerBlink(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  const getGamerProfile = async () => {
    try {
      const response = await axios.get(
        `https://mlm-production.up.railway.app/api/gameProfile/${data.userId}`
      );
      const result = response.data;
      setProfile(result);
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getGamerProfile();
  }, [data.userId]);
  useEffect(() => {
    if (!targetColor) {
      setTargetColor(getRandomColor());
    }
  }, [targetColor]);

  const handleColorSelect = (color) => {
    setUserChoice(color);
    setShowModal(true);
  };

  const handleBet = async () => {
    if (betAmount < 5) {
      alert("Bet Amount Should be greater than 5Rs.😌");
    } else if (betAmount >= profile.balance) {
      // alert(betAmount)
      alert("Insufficient Balance");
    } else {
      // Close the modal after placing the bet
      setShowModal(false);
      alert(`Bet Place SuccessFully! of ${betAmount} Rs.`);
      try {
        const response = await axios.post(
          "https://mlm-production.up.railway.app/api/gameProfile/startGame",
          {
            userId: data.userId, // Make sure userId is defined or passed as a prop
            entryFee: betAmount,
          }
        );

        // Assuming the response contains updated balance data
        const updatedBalance = response.data.balance;
        // Make sure you have defined setProfile elsewhere
        setProfile({ ...profile, balance: updatedBalance });
      } catch (error) {
        console.error(error);
      }

      if (userChoice === targetColor) {
        const winnings = betAmount * 1.25;
        setWinningAmount(winnings);
        setGameResult(`You Win ₹ ${winnings}`);
        try {
          const response = await axios.post(
            "https://mlm-production.up.railway.app/api/gameProfile/winningGame",
            {
              userId: data.userId, // Make sure userId is defined or passed as a prop
              winnings: winnings,
            }
          );

          // Assuming the response contains updated balance data
          const updatedTotalWin = response.data.totalwin;
          // Make sure you have defined setProfile elsewhere
          setProfile({ ...profile, totalwin: updatedTotalWin });
        } catch (error) {
          console.error(error);
        }

        // Perform any necessary actions to update the user's balance or wallet for a win
      } else {
        setGameResult("You Lose");
        // Perform any necessary actions for a loss
      }
    }
    console.log(winningAmount);
    const gameDetails = {
      userId: data.userId, // Make sure userId is defined or passed as a prop
      // entryFee: betAmount,

      targetColor: targetColor,
      chosenColor: userChoice,
      result: uniqueId,
    };

    try {
      const response = await axios.post(
        "https://mlm-production.up.railway.app/api/game/saveGame",
        gameDetails
      );
      console.log(gameDetails);
      if (response.status === 201) {
        console.log("Game details saved successfully");
      } else {
        console.error("Error saving game details");
      }
    } catch (error) {
      console.error("Error saving game details:", error);
    }

    // Reset the game after 10 seconds
    setTimeout(() => {
      setGameResult("");
      setUserChoice("");
      setBetAmount(0);
      setTargetColor(getRandomColor());
    }, 3000); // 10 seconds in milliseconds
  };
  function generateUniqueId() {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const hour = now.getHours().toString().padStart(2, "0");
    const minute = now.getMinutes().toString().padStart(2, "0");
    const randomDigits = Math.floor(1000 + Math.random() * 9000); // Generates a random 4-digit number
    return `${month}${day}-${hour}${minute}-${randomDigits}`;
  }
  const timerStyle = {
    color: timerBlink && time <= 15 ? "red" : "white",
    animation: timerBlink && time <= 15 ? "blink 1s infinite" : "none",
  };
  // Function to shuffle an array in place
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  if (isLoading) {
    return <h6 className='text-center' style={{marginTop:'-70px', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', width:'100%' }}><img src={spinner} alt="spinner" height="100px" width="100px"  style={{display:'flex', justifyContent:'center', alignItems:'center'}}/></h6>;
  }
  // Shuffle the predefinedColors array
  const gameColors = shuffleArray(predefinedColors.slice(0, 3));
  return (
    <>
   
   
  {isTokenValid ?(
    <>
     <div className="colorbackGround">
      <div className="game_box"></div>
      <div className="game_welcome">
        <img
          src={welcome}
          height="100px"
          width="130px"
          alt="welcome"
        />
      </div>
      <Container className="pt-5">
        <Row style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Col sm={12} md={6} lg={6} className="game_session">
            <div>
              <h6 className="text-light p-2" style={{ textAlign: "end" }}>
                Game Session
              </h6>
              <div>
                <style>
                  {`
          @keyframes blink {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
                </style>

                <div className="timer">
                  <h4 style={timerStyle}>Remaining Time: {time}s</h4>
                </div>
              </div>
              <p className="text-info">Sessioin ID: {uniqueId}</p>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div>
              <h6 className="p-2" style={{color:'#240b36'}}>Have a Good Luck!</h6>
            </div>
          </Col>
        </Row>
        {gameResult && (
          <Row>
            <Col sm={12} md={6} lg={6}>
              <div className="text-center">
                <h5 className="mt-3">{gameResult}</h5>
                {gameResult === "You Win ₹ 0" ? (
                  <p>You didn't place a bet.</p>
                ) : (
                  <p>Winning Amount: ₹ {winningAmount}</p>
                )}
              </div>
            </Col>
          </Row>
        )}
        <Row>
          <Col
            sm={12}
            md={6}
            lg={6}
            className={`game_choice_color ${contentDisabled ? "disabled" : ""}`}
            style={{
              opacity: contentDisabled ? 0.7 : 1,
              pointerEvents: contentDisabled ? "none" : "auto",
            }}
          >
            <div className="color-options">
              {predefinedColors.map((color) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: contentDisabled
                      ? "gray"
                      : color.toLowerCase(),
                    margin: "5px",
                  }}
                  onClick={() => handleColorSelect(color)}
                  className="game_button"
                  disabled={gameResult !== ""}
                >
                  {color}
                </button>
              ))}
            </div>

            {/* <div
              style={{
                backgroundColor: targetColor.toLowerCase(),
                width: "50px",
                height: "50px",
                display: "inline-block",
                margin: "5px",
              }}
            /> */}
          </Col>
        </Row>
        <Row
          className={`game_choice_color game_choice1 ${
            contentDisabled ? "disabled" : ""
          }`}
        >
          <Col
            sm={12}
            col={12}
            md={6}
            lg={6}
            //  className={`game_choice_color ${contentDisabled ? "disabled" : ""}`}
            style={{
              opacity: contentDisabled ? 0.7 : 1,
              pointerEvents: contentDisabled ? "none" : "auto",
              marginTop: "10px",
            }}
          >
            <div className=" color-options">
              {gameColors.map((color, index) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: contentDisabled
                      ? "gray"
                      : color.toLowerCase(),
                    margin: "5px",
                    // minWidth:'100px'
                  }}
                  onClick={() => handleColorSelect(color)}
                  className="game_button"
                  disabled={gameResult !== ""}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <div className=" color-options">
              {gameColors.slice(0, 2).map((color, index) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: contentDisabled
                      ? "gray"
                      : color.toLowerCase(),
                    margin: "5px",
                  }}
                  onClick={() => handleColorSelect(color)}
                  className="game_button"
                  disabled={gameResult !== ""}
                >
                  {index + 4}
                </button>
              ))}
            </div>
            <div className="color-options">
              {gameColors.map((color, index) => (
                <button
                  key={color}
                  style={{
                    backgroundColor: contentDisabled
                      ? "gray"
                      : color.toLowerCase(),
                    margin: "5px",
                  }}
                  onClick={() => handleColorSelect(color)}
                  className="game_button"
                  disabled={gameResult !== ""}
                >
                  {index + 6}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <div
              className="table-responsive"
              style={{ borderRadius: "10px", marginTop: "10px" }}
            >
              <table className="table table-bordered table-hover table-dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Session</th>
                    <th>select</th>
                    <th>Target</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {gameHistory && gameHistory.length > 0 ? (
                    gameHistory.map((game, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{game.result}</td>
                        {/* <td>{game.chosenColor}</td> */}
                        <td>
                          <div
                            style={{
                              backgroundColor: game.chosenColor,
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </td>
                        <td>
                          <div
                            style={{
                              backgroundColor: game.targetColor,
                              width: "25px",
                              height: "25px",
                              borderRadius: "50%",
                            }}
                          ></div>
                        </td>
                        <td>{new Date(game.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No game history available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {/* Pagination */}
              <div className="pagination">
                <Button
                  variant="warning"
                  className="m-1"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>

                <Button
                  variant="warning"
                  className="m-1"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>

              {/* Display page number and items per page information */}
              <div className="text-light">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <div className="row game_account">
          <div className="col-5 col-sm-9 col-md-6 col-lg-4 game_balance">
            <h6 className="text-secondary">
              Balance <b style={{ color: "brown" }}> {profile.balance} ₹</b>
              {/* UserId <b style={{ color: "brown" }}> {data.userId} ₹</b> */}
            </h6>
            <h5></h5>
            <h6 className="text-secondary">
              Total win <b style={{ color: "brown" }}> {profile.totalwin} ₹</b>
            </h6>
            <h5></h5>
          </div>
          {/* <div className="col-5 col-sm-9 col-md-6 col-lg-4 balanceCard">
            <h6 className="text-info">Total win</h6>
            <h5 style={{ color: "cyan" }}> {profile.totalwin} ₹</h5>
          </div> */}
        </div>
      </Container>
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        className="modal-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Bet Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Choose Color</h6>
          <div
            style={{
              background: userChoice.toLowerCase(),
              height: "35px",
              width: "120px",
              color: "#fff",
              borderRadius: "6px",
            }}
          >
            {/* {userChoice} */}
          </div>
          <Form>
            <Form.Group controlId="betAmount">
              <h6 className="m-2">Balance: {profile.balance}</h6>
              <Form.Label>Enter Bet Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={betAmount}
                onChange={(e) => setBetAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBet}>
            Place Bet
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        <div className="bottom_section " style={{ marginTop: "100px" }}>
          <div
            className="row footer_row_content"
            style={{ height: "90px", color: "cyan", background: "#000427" }}
          >
            <div className="col-12">
              <div className="footer_container">
                <div className="footer_content">
                  <Link
                    to="/dashboard"
                    className="footer_icon"
                    style={{ color: "cyan" }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/9187/9187555.png"
                      alt="account Activation"
                      height="35px"
                      width="35px"
                    />
                    <h6 className=" mt-1">Home</h6>
                  </Link>
                  <div className="footer_icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/10701/10701014.png"
                      alt="wallet"
                      height="40px"
                      width="40px"
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    />
                    <h6
                      className="mt-1 dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Menu
                    </h6>
                    <ul className="dropdown-menu">
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          Deposit
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop2"
                        >
                          Withdrawal
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop3"
                        >
                          Withdrawal History
                        </h6>
                      </li>
                      <li>
                        <h6
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop4"
                        >
                          Deposit History
                        </h6>
                      </li>
                    </ul>
                  </div>
                  <Link
                    to="/game"
                    className="footer_icon"
                    style={{ color: "cyan" }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/8002/8002123.png"
                      alt="fund"
                      height="35px"
                      width="35px"
                    />
                    <h6 className="mt-1">Game</h6>
                  </Link>
                  <Link to="/setting" className="footer_icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3953/3953226.png"
                      alt="account Activation"
                      height="35px"
                      width="35px"
                    />
                    <h6 className="mt-1" style={{ color: "cyan" }}>
                      Setting
                    </h6>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*Deposit Start  */}
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-warning"
                  id="staticBackdropLabel"
                >
                  Deposit
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
              <div
                    className="image"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <img
                      src={QRCODE}
                      height="200px"
                      width="200px"
                      alt=""
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid black",
                      }}
                    />
                  </div>
                <h6 className="text-info">UPI:kumaromprakashhdhdksks@axl</h6>
                <form onSubmit={handleSubmit} className="deposit_Form">
                  <label>UserId:</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    // disabled
                    required
                  />
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                  <label>Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                  <label>UTR:</label>
                  <input
                    type="text"
                    name="UTR"
                    placeholder="UTR"
                    value={formData.UTR}
                    onChange={handleChange}
                    required
                  />

                  <br />
                  <button type="submit" className="btn btn-outline-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Deposit End */}

        {/*Withdrawal Start  */}
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop2"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Withdrawal
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form
                  onSubmit={handleSubmitWithdrawal}
                  className="deposit_Form"
                >
                  <label>UserId:</label>
                  <input
                    type="text"
                    name="userId"
                    value={formData1.userId}
                    onChange={handleChange1}
                    // disabled
                    required
                  />
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData1.name}
                    onChange={handleChange1}
                    required
                  />

                  <label>Amount:</label>
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    value={formData1.amount}
                    onChange={handleChange1}
                    required
                  />
                  <label>UPI:</label>
                  <input
                    type="text"
                    name="UPI"
                    placeholder="Payment UPI "
                    value={formData1.UPI}
                    onChange={handleChange1}
                    required
                  />
                  <br />
                  <button type="submit" className="btn btn-outline-primary">
                    Submit
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal End */}
        {/*Wthdrawal history Start  */}
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop3"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-info"
                  id="staticBackdropLabel"
                >
                  Withdrawal History
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body table-responsive">
                <table className="table table-bordered table-hover table-dark">
                  <thead>
                    <tr className="text-secondary">
                      <th>#</th>
                      <th>Name</th>
                      <th>UserId</th>
                      <th>Amount</th>
                      <th>UPI</th>
                      <th>status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawalHistory.map((withdrawal, index) => (
                      <tr key={index}>
                        <td className="text-info">{index}</td>
                        <td className="text-primary">{withdrawal.name}</td>
                        <td className="text-secondary">{withdrawal.userId}</td>
                        <td className="text-warning">{withdrawal.amount}</td>
                        <td className="text-success">{withdrawal.UPI}</td>
                        <td
                          className={
                            withdrawal.approved === "Pending"
                              ? "text-warning"
                              : withdrawal.approved === "Approved"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {withdrawal.approved}
                        </td>
                        <td className="text-secondary">
                          {new Date(withdrawal.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* withdrawal History End */}

        {/*Deposit history Start  */}
        {/* Modal */}
        <div
          className="modal fade"
          id="staticBackdrop4"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content bg-dark">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5 text-info"
                  id="staticBackdropLabel"
                >
                  Deposit History
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body table-responsive">
                <table className="table table-bordered table-hover table-dark">
                  <thead>
                    <tr className="text-secondary">
                      <th>#</th>
                      <th>Name</th>
                      <th>UserId</th>
                      <th>Amount</th>
                      <th>status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depositHistory.map((withdrawal, index) => (
                      <tr key={index}>
                        <td className="text-info">{index}</td>
                        <td className="text-primary">{withdrawal.name}</td>
                        <td className="text-secondary">{withdrawal.userId}</td>
                        <td className="text-warning">{withdrawal.amount}</td>
                        <td
                          className={
                            withdrawal.approved === "Pending"
                              ? "text-warning"
                              : withdrawal.approved === "Approved"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {withdrawal.approved}
                        </td>
                        <td className="text-secondary">
                          {new Date(withdrawal.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  ):( <>
  
  </>)}
</>
  );
};

export default NewGame;
