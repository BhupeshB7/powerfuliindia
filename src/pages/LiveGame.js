// import React from "react";
// import play from "../assets/play.jpg";
// import { Container } from "react-bootstrap";
// import { useEffect } from "react";
// import { useState } from "react";
// const LiveGame = () => {
//   const predefinedColors = ["Blueviolet", "Red", "Green"];
//   const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
//   const [buttonColors, setButtonColors] = useState([]);
//   const predefinedColors1 = ["green", "orange", "purple"];
//   const predefinedLetter = ["Small", "Big"];
//   useEffect(() => {
//     // Generate random colors when the component is initially rendered
//     const randomColors = predefinedNumbers.map(() => {
//       const randomIndex = Math.floor(Math.random() * predefinedColors1.length);
//       return predefinedColors1[randomIndex];
//     });

//     setButtonColors(randomColors);
//   }, []); // The empty dependency array ensures this effect runs only once
//   const incrementBetAmount = () => {
//     setBetAmount((prevAmount) => prevAmount + 5);
//   };

//   const decrementBetAmount = () => {
//     if (betAmount >= 5) {
//       setBetAmount((prevAmount) => prevAmount - 5);
//     }
//   };
//   const multiplyBetAmount = (factor) => {
//     setBetAmount((prevAmount) => prevAmount * factor);
//     setMultiplicationFactor(factor);
//   };
//   const resetBetAmount = () => {
//     setBetAmount(0);
//     setMultiplicationFactor(1); // Reset multiplication factor as well if needed
//   };
//   return (
//     // <div className='text-center m-5'>Not started yet!</div>
//     <div className="liveGame" style={{ height: "800px", width: "100%" }}>
//       <div className="p-3">
//         <img
//           src={play}
//           height="60px"
//           width="110px"
//           alt="logo"
//           style={{ borderRadius: "10px" }}
//         />
//       </div>
//       {/* <div style={{display:'flex', width:'100%',marginLeft:'-25px'}}>
//      <img src='https://cdn-icons-png.flaticon.com/128/3049/3049365.png' height='60px' width='50px' alt='live'/>

//     </div> */}

//       <Container>
//         <div
//           style={{
//             height: "100%",
//             backgroundImage:
//               "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
//             borderRadius: "7px",
//           }}
//         >
//           <div className="color-options">
//             {/* background-image: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%); */}
//             {/* background-image: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%); */}
//             {predefinedColors.map((color) => (
//               <button
//                 key={color}
//                 style={{
//                   backgroundColor: color.toLowerCase(),
//                   margin: "5px",
//                   border: color.toLowerCase(),
//                 }}
//                 // onClick={() => handleColorSelect(color)}
//                 className="game_button"
//               ></button>
//             ))}
//           </div>
//           {/* Number */}
//           <div className="color-options number-options">
//                       {predefinedNumbers.map((color, index) => (
//                         <button
//                           key={color}
//                           style={{
//                             backgroundColor: buttonColors[index],
//                             margin: "5px",
//                             border: "1.5px solid transparent",
//                             color: "white",
//                             fontWeight: "bold",
//                             borderRadius: "50%",
//                             width: "53px",
//                             height: "53px",
//                             boxShadow: `0 0 0 1px ${buttonColors[index]}`,
//                             backgroundClip: "content-box",
//                           }}
//                         //   onClick={() =>
//                         //     handleNumberSelect(color, buttonColors[index])
//                         //   }
//                           className="game_button"
//                         >
//                           {color}
//                         </button>
//                       ))}
//                     </div>
//                     {/* Letter */}
//                     <div className="color-options number-options">
//                         {predefinedLetter.map((color, index) => (
//                           <button
//                             key={color}
//                             style={{
//                               backgroundColor:  buttonColors[index],
//                               margin: "4px",
//                               border: "1.5px solid transparent",
//                               color: "white",
//                               fontWeight: "bold",
//                               borderRadius: "10px",
//                               width: "100px",
//                               height: "35px",
//                               boxShadow:  `0 0 0 1px ${buttonColors[index]}`,
//                               backgroundClip: "content-box",
//                             }}
//                             // onClick={() =>
//                             //   handleLetterSelect(color, buttonColors[index])
//                             // }
//                             className="game_button"
//                           >
//                             {color}
//                           </button>
//                         ))}
//                       </div>
//                     {/* Letter */}
//         </div>
//         <Modal
//               show={showLetterModal}
//               onHide={() => setShowLetterModal(false)}
//               className="modal-center"
//             >
//               <Modal.Header
//                 closeButton
//                 style={{
//                   background: userChoiceButtonNumber.toLocaleLowerCase(),
//                   color: "white",
//                 }}
//               >
//                 <Modal.Title>Choose Bet Amount</Modal.Title>
//               </Modal.Header>
//               <Modal.Body>
//                 <Form>
//                   <Form.Group controlId="betAmount">
//                     {userChoiceLetter && (
//                       <h6 className="m-2">
//                         Choosed Letter: {userChoiceLetter}
//                       </h6>
//                     )}
//                     <h6 className="m-2">Balance: {profile.balance}</h6>
//                     {/* <Form.Label>Enter Bet Amount</Form.Label> */}
//                     <Form.Control
//                       type="number"
//                       placeholder="Enter Bet amount"
//                       value={betAmount}
//                       onChange={(e) => setBetAmount(e.target.value)}
//                     />
//                   </Form.Group>
//                 </Form>
//                 <div style={{ display: "flex", flexDirection: "row-reverse" }}>
//                   <button
//                     className="p-1 m-1"
//                     onClick={incrementBetAmount}
//                     style={{
//                       border: "none",
//                       borderRadius: "8px",
//                       width: "30px",
//                     }}
//                   >
//                     +
//                   </button>
//                   <button
//                     className="p-1 m-1"
//                     onClick={decrementBetAmount}
//                     style={{
//                       border: "none",
//                       borderRadius: "8px",
//                       width: "30px",
//                     }}
//                   >
//                     -
//                   </button>
//                   <button
//                     className="p-1 m-1"
//                     style={{
//                       border: "none",
//                       borderRadius: "8px",
//                       width: "30px",
//                     }}
//                     onClick={() => multiplyBetAmount(3)}
//                   >
//                     3x
//                   </button>
//                   <button
//                     className="p-1 m-1"
//                     style={{
//                       border: "none",
//                       borderRadius: "8px",
//                       width: "30px",
//                     }}
//                     onClick={() => multiplyBetAmount(2)}
//                   >
//                     2x
//                   </button>
//                   <button
//                     className="p-1 m-1"
//                     style={{
//                       border: "none",
//                       borderRadius: "8px",
//                       width: "30px",
//                     }}
//                     onClick={() => multiplyBetAmount(10)}
//                   >
//                     x
//                   </button>
//                   <img
//                     className="p-1 m-1"
//                     style={{
//                       width: "40px",
//                       height: "40px",
//                     }}
//                     onClick={resetBetAmount}
//                     src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
//                     alt="reset"
//                   />
//                 </div>
//               </Modal.Body>
//               <Modal.Footer>
//                 <Button
//                   variant="danger"
//                   onClick={() => setShowLetterModal(false)}
//                   style={{ width: "150px" }}
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={handleBet}
//                   style={{
//                     background: userChoiceButtonNumber.toLocaleLowerCase(),
//                     border: `1.5px solid ${userChoiceButtonNumber.toLowerCase()}`,
//                     width: "150px",
//                   }}
//                 >
//                   Place Bet
//                 </Button>
//               </Modal.Footer>
//             </Modal>
//       </Container>
//     </div>
//   );
// };

// export default LiveGame;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import play from "../assets/play.jpg";
import { Container } from "react-bootstrap";
import Axios from "axios";
import { useUser } from "../components/UserContext";
import axios from "axios";
const LiveGame = () => {
  const predefinedColors = ["Blueviolet", "Red", "Green"];
  const predefinedNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const predefinedColors1 = [
    "green",
    "orange",
    "purple",
    "brown",
    "black",
    "blue",
    "gray",
    "yellowGreen",
    "blueViolet",
    "orange",
  ];
  const predefinedLetter = ["Small", "Big"];

  const [showModal, setShowModal] = useState(false);
  const [userChoice, setUserChoice] = useState('');
  const [userChoiceNumber, setUserChoiceNumber] = useState('');
  const [betAmount, setBetAmount] = useState(0);
  const [multiplicationFactor, setMultiplicationFactor] = useState(1);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [userChoiceLetter, setUserChoiceLetter] = useState('');
  const [userChoiceButtonNumber, setUserChoiceButtonNumber] = useState(null);
  const {userName} = useUser;
  const handleChoice = (choice) => {
    setUserChoice(choice);
    setShowModal(true);
  };
  const handleChoiceNumber = (choice) => {
    setUserChoiceNumber(choice);
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const incrementBetAmount = () => {
    setBetAmount((prevAmount) => prevAmount + 5);
  };

  const decrementBetAmount = () => {
    if (betAmount >= 5) {
      setBetAmount((prevAmount) => prevAmount - 5);
    }
  };

  const multiplyBetAmount = (factor) => {
    setBetAmount((prevAmount) => prevAmount * factor);
    setMultiplicationFactor(factor);
  };

  const resetBetAmount = () => {
    setBetAmount(0);
    setMultiplicationFactor(1);
  };

  const handleLetterChoice = (choice) => {
    setUserChoiceLetter(choice);
    setShowLetterModal(true);
  };

  const handleLetterModalClose = () => {
    setShowLetterModal(false);
  };

  const handleBet = async() => {
    alert(betAmount)
    if(betAmount <5){
      alert('Bet amount must be greater than 5');
      setShowModal(false);
      setShowLetterModal(false);
      return; 
    }
    else{
      setShowModal(false);
      setShowLetterModal(false);
      alert(`Bet SuccessFully  Place of ${betAmount}`);
      const gameDetails = {
        userId: userName, // Make sure userId is defined or passed as a prop
        entryFee: betAmount,
        choosenColor: userChoice,
        choosenLetter: userChoiceLetter,
        choosenNumber: userChoiceNumber,
      };
      console.log(gameDetails);
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
        setUserChoice("");
        setUserChoiceLetter("");
        setUserChoiceNumber("");
        setBetAmount(0);
      }, 1000); // 10 seconds in milliseconds
    }
  };
  return (
    <div className="liveGame" style={{ height: "785px", width: "100%" }}>
      <div className="p-3">
        <img
          src={play}
          height="60px"
          width="110px"
          alt="logo"
          style={{ borderRadius: "10px" }}
        />
      </div>

      <Container>
        <div
          style={{
            height: "100%",
            backgroundImage:
              "linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)",
            borderRadius: "7px",
          }}
        >
          <div className="color-options">
            {predefinedColors.map((color) => (
              <button
                key={color}
                style={{
                  backgroundColor: color.toLowerCase(),
                  margin: "5px",
                  border: color.toLowerCase(),
                }}
                onClick={() => handleChoice(color)}
                className="game_button"
              ></button>
            ))}
          </div>

          <div className="color-options number-options">
            {predefinedNumbers.map((color, index) => (
              <button
                key={color}
                style={{
                  backgroundColor: predefinedColors1[index],
                  margin: "5px",
                  border: "1.5px solid transparent",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "50%",
                  width: "53px",
                  height: "53px",
                  boxShadow: `0 0 0 1px ${predefinedColors1[index]}`,
                  backgroundClip: "content-box",
                }}
                onClick={() => {
                  setUserChoiceButtonNumber(predefinedColors1[index]);
                  handleChoiceNumber(color);
                }}
                className="game_button"
              >
                {color}
              </button>
            ))}
          </div>

          <div className="color-options number-options">
            {predefinedLetter.map((color, index) => (
              <button
                key={color}
                style={{
                  backgroundColor: predefinedColors1[index],
                  margin: "4px",
                  border: "1.5px solid transparent",
                  color: "white",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  width: "100px",
                  height: "35px",
                  boxShadow: `0 0 0 1px ${predefinedColors1[index]}`,
                  backgroundClip: "content-box",
                }}
                onClick={() => {
                  handleLetterChoice(color);
                }}
                className="game_button"
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        <Modal
          show={showModal}
          onHide={handleModalClose}
          className="modal-center"
        >
          <Modal.Header
            closeButton
            style={{
              background: predefinedColors1[userChoice] || userChoice,
              color: "white",
            }}
          >
            <Modal.Title>Choose Your Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* <p>You selected: {userChoice}</p> */}
            {/* You can add more content here */}
            <Form>
              <Form.Group controlId="betAmount">
                {userChoice && (
                  <h6 className="m-2">Choosed Color: {userChoice}</h6>
                )}
                {userChoiceNumber && (
                  <h6 className="m-2">Choosed Number: {userChoiceNumber}</h6>
                )}
                <h6 className="m-2">Balance: </h6>
                <Form.Control
                  type="number"
                  placeholder="Enter Bet amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="p-1 m-1"
                onClick={incrementBetAmount}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
              >
                +
              </button>
              <button
                className="p-1 m-1"
                onClick={decrementBetAmount}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
              >
                -
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(3)}
              >
                3x
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(2)}
              >
                2x
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(10)}
              >
                x
              </button>
              <img
                className="p-1 m-1"
                style={{
                  width: "40px",
                  height: "40px",
                }}
                onClick={resetBetAmount}
                src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
                alt="reset"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              style={{ width: "120px" }}
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            {/* Add a button to confirm the selection here */}
            <Button
              style={{
                width: "120px",
                background: predefinedColors1[userChoice] || userChoice,
                border: `2px solid ${
                  predefinedColors1[userChoice] || userChoice
                }`,
              }}
              onClick={handleBet}
            >
              Place Bet
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showLetterModal}
          onHide={handleLetterModalClose}
          className="modal-center"
        >
          <Modal.Header
            closeButton
            style={{
              background:
                userChoiceButtonNumber && userChoiceButtonNumber.toLowerCase(),
                color:'white'
            }}
          >
            <Modal.Title>Choose Bet Amount</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="betAmount">
                {userChoiceLetter && (
                  <h6 className="m-2">Choosed Letter: {userChoiceLetter}</h6>
                )}
                <h6 className="m-2">Balance: </h6>
                <Form.Control
                  type="number"
                  placeholder="Enter Bet amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                />
              </Form.Group>
            </Form>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className="p-1 m-1"
                onClick={incrementBetAmount}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
              >
                +
              </button>
              <button
                className="p-1 m-1"
                onClick={decrementBetAmount}
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
              >
                -
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(3)}
              >
                3x
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(2)}
              >
                2x
              </button>
              <button
                className="p-1 m-1"
                style={{
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                }}
                onClick={() => multiplyBetAmount(10)}
              >
                x
              </button>
              <img
                className="p-1 m-1"
                style={{
                  width: "40px",
                  height: "40px",
                }}
                onClick={resetBetAmount}
                src="https://cdn-icons-png.flaticon.com/128/9497/9497072.png"
                alt="reset"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="danger"
              onClick={handleLetterModalClose}
              style={{ width: "150px" }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBet}
              style={{
                background:
                  userChoiceButtonNumber &&
                  userChoiceButtonNumber.toLowerCase(),
                border: `1.5px solid ${
                  userChoiceButtonNumber && userChoiceButtonNumber.toLowerCase()
                }`,
                width: "150px",
              }}
            >
              Place Bet
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </div>
  );
};

export default LiveGame;
