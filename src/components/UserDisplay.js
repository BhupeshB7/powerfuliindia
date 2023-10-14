// //
// //
// //  new code

// import React, { useState, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { BsWhatsapp } from "react-icons/bs";
// import Modal from "react-modal";
// import "./Dashboard.css";
// import logo from "../assets/PI1.png";
// import QRCODE from "../assets/QRCODE1.jpg";
// // import INFO from '../assets/info.jpg';
// // import GOA from '../assets/GOA.jpg';
// // import PATNA from '../assets/PATNA.jpg';
// import spinner from "../assets/spinner.gif";
// import { MdOutlineTransferWithinAStation, MdEmail } from "react-icons/md";
// import { IoCall } from "react-icons/io5";
// import { ImWhatsapp } from "react-icons/im";
// import { BsTelegram } from "react-icons/bs";
// import { MdGroups2 } from "react-icons/md";
// import { HiOutlineArrowUpTray } from "react-icons/hi2";
// import { RiExchangeFundsLine } from "react-icons/ri";
// import { AiOutlinePlusCircle } from "react-icons/ai";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import QRCodeGenerator from "../pages/QRCodeGenerator";
// import ControlledCarousel from "./CarouselComponent";
// import ParticleComponent from "./Task/ParticleComponent";
// // import Timer from '../pages/Timer';

// const getTokenExpireTime = () => {
//   const tokenExpire = localStorage.getItem("tokenExpire");
//   return tokenExpire ? parseInt(tokenExpire) : null;
// };

// const isTokenExpired = () => {
//   const expireTime = getTokenExpireTime();
//   return expireTime ? expireTime < Date.now() : true;
// };

// const Dashboard = () => {
//   // State declarations
//   const [isTokenValid, setIsTokenValid] = useState(true);
//   const [data, setData] = useState([]);
//   const [realTimeDate, setRealTimeDate] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const token = localStorage.getItem("token");
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     localStorage.getItem("token") ? true : false
//   );
//   const [dailyIncome, setDailyIncome] = useState("");
//   // For Direct
//   const [isDirectModelOpen, setIsDirectModelOpen] = useState(false);
//   // const [isTeamModelOpen, setIsTeamModelOpen] = useState(false);
//   const [teamStructure, setTeamStructure] = useState([]);
//   const [currentDownline, setCurrentDownline] = useState([]);
//   const [visitedDownlines, setVisitedDownlines] = useState([]);
//   const [rank, setRank] = useState("Loading...");
//   const [activeUsersByLevel, setActiveUsersByLevel] = useState([]);
//   //for fund move
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   // For deposit
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [userData, setUserData] = useState({
//     name: "",
//     transactionId: "",
//     userID: "",
//     depositAmount: "",
//     // image: null
//   });
//   // const [activeUserData, setActiveUserData] = useState([]);

//   // For fetch direct sponsorID
//   const [sponsors, setSponsors] = useState([]);

//   // For Withdrawal
//   const [withdrawalAmount, setWithdrawalAmount] = useState("");
//   const [copied, setCopied] = useState(false);
//   const [userId, setUserId] = useState("");
//   const [userStatus, setUserStatus] = useState(null);
//   const [topupButton, setTopupButton] = useState(true);
//   const [topUpAmount, setTopUpAmount] = useState("");
//   const [isApproved, setIsApproved] = useState(false);
//   // useEffect hooks

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch(
//         "https://mlm-production.up.railway.app/api/users/profile",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const result = await response.json();
//       // const userLevel = getUserLevel(result.level);
//       // setLevel(userLevel);
//       setData(result);
//       setIsLoading(false);
//     };
//     fetchData();
//   }, [token]);

//   useEffect(() => {
//     if (data.userId && data.updatedAt) {
//       const convertTimestamp = () => {
//         const date = new Date(data.updatedAt);
//         const realTime = date.toLocaleString();
//         setRealTimeDate(realTime);
//       };

//       convertTimestamp();
//     }
//   }, [data]);

//   useEffect(() => {
//     const fetchIncome = async () => {
//       try {
//         // const response = await fetch(`https://mlm-production.up.railway.app/api/daily-level-income/users/${data.userId}`);
//         const response = await fetch(
//           `https://mlm-production.up.railway.app/api/daily-level-income/users/${data.userId}`,
//           {
//             headers: {
//               "Cache-Control": "no-cache",
//               Pragma: "no-cache",
//             },
//             method: "GET",
//           }
//         );
//         const dailyLevel = await response.json();
//         setDailyIncome(dailyLevel.dailyIncome);
//         setIsLoading(false);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchIncome();
//   }, [data.userId]);

//   useEffect(() => {
//     axios
//       .get(
//         `https://mlm-production.up.railway.app/api/users/teamStructureRank/${data.userId}`
//       )
//       .then((response) => {
//         const data = response.data;
//         if (data.rank === "Fresher") {
//           setRank("FRESHER");
//         } else {
//           // setRank(`Congratulations! You have achieved the rank: ${data.rank}.`);
//           setRank(`${data.rank}.`);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setRank("An error occurred while fetching the data.");
//       });
//   }, [data.userId]);

//   useEffect(() => {
//     // Call the backend API to get the team structure
//     axios
//       .get(
//         `https://mlm-production.up.railway.app/api/users/teamStructure/${data.userId}`
//       )
//       .then((response) => {
//         setActiveUsersByLevel(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching team structure:", error);
//       });
//   }, [data.userId]);

//   // useEffect(() => {
//   //   fetchTeamStructure(data.userId);
//   // }, [data.userId]);
//   useEffect(() => {
//     const fetchTeamStructure = async (userId) => {
//       try {
//         const response = await axios.get(
//           `https://mlm-production.up.railway.app/api/users/team/${userId}`
//         );
//         setTeamStructure(response.data);
//         setCurrentDownline(response?.data?.downline);
//       } catch (error) {
//         console.error("Error fetching team structure:", error);
//       }
//     };
//     fetchTeamStructure(data.userId);
//   }, [data.userId]);

//   useEffect(() => {
//     // fetchTopupAmount(data.userId);
//     const fetchTopupAmount = async (userID) => {
//       try {
//         const response = await axios.get(
//           `https://mlm-production.up.railway.app/api/deposit/topUpuserAmount/${userID}`
//         );
//         console.log("API Response:", response.data);
//         console.log(data.userId);

//         const { deposit } = response.data;

//         if (!deposit) {
//           console.log("User not found!");
//           return;
//         }

//         const { depositAmount, isApproved } = deposit;
//         console.log("Deposit Amount:", depositAmount);
//         // setTopUpAmount(response.data);
//         setTopUpAmount(depositAmount);
//         setIsApproved(isApproved);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchTopupAmount(data.userId);
//     // console.log(data.userId)
//   }, [data.userId]);

//   useEffect(() => {
//     if (isTokenExpired()) {
//       setIsTokenValid(false);
//       // redirect to homepage
//       window.location.href = "/login";
//     }
//   }, []);

//   // for direct userID
//   useEffect(() => {
//     const fetchSponsors = async () => {
//       try {
//         const response = await axios.get(
//           `https://mlm-production.up.railway.app/api/direct/${data.userId}`
//         );
//         setSponsors(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSponsors();
//   }, [data.userId]);

//   const handleWithdrawalSubmit = (e) => {
//     e.preventDefault();
//     const amount = Number(withdrawalAmount); // convert string to number
//     fetch(`https://mlm-production.up.railway.app/api/withdraw/${data.userId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         amount,
//         GPay: data.GPay,
//         ifscCode: data.ifscCode,
//         accountNo: data.accountNo,
//         accountHolderName: data.accountHolderName,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           // display success message or update user balance
//           // toast.success("Withdrawal successful");
//         } else {
//           // display error message
//           toast.error(`Withdrawal failed: ${data.error}`);
//           // toast.error('Sunday Closed')
//         }
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//         toast.error(`Withdrawal failed: ${error.message}`);
//         // toast.error('Sunday closed!!!')
//       });
//   };

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setUserData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("name", userData.name);
//     formData.append("transactionId", userData.transactionId);
//     formData.append("userID", userData.userID);
//     formData.append("depositAmount", userData.depositAmount);
//     // formData.append('image', userData.image);

//     try {
//       // const response = await axios.post('https://mlm-production.up.railway.app/api/deposit/upload', formData);
//       const response = await axios.post(
//         "https://mlm-production.up.railway.app/api/deposit/user",
//         formData
//       );
//       const data = response.data;

//       console.log(data);
//       alert("Deposited!");
//       window.location.href = "/dashboard";
//     } catch (error) {
//       if (error.response && error.response.status === 400) {
//         alert("Transaction Id already exists");
//       }
//       console.error(error);
//       alert("Not Deposited!");
//     }
//   };
//   //Fund move API and Function start
//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };
//   const handleFundMoveSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post(
//         `https://mlm-production.up.railway.app/api/transfer/${data._id}`,
//         { amount: parseFloat(amount) }
//       );
//       setMessage(response.data.message);
//       alert(response.data.message);
//     } catch (error) {
//       setMessage(error.response.data.error);
//     }
//   };
//   //Fund move API and Function End
//   const handleClick = async () => {
//     try {
//       const response = await fetch(
//         "https://mlm-production.up.railway.app/api/deposit/topUpActivate/",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ userId }),
//         }
//       );
//       const data = await response.json();
//       setTopupButton(false); // Hide the button after getting the user status
//       if (data.status === "not_found") {
//         alert("user not found!");
//         setUserStatus(null);
//         setTopupButton(true);
//       } else {
//         setUserStatus(data.status);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleActivateUser = async () => {
//     try {
//       const response = await fetch(
//         `https://mlm-production.up.railway.app/api/deposit/topUpUserID/${data.userId}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             userId,
//           }),
//         }
//       );

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || "Activation failed");
//       }

//       const responseData = await response.json();

//       if (responseData.success) {
//         // display success message or update user balance
//         alert("UserID Activated Successfully");
//         window.location.href = "/dashboard";
//       } else {
//         // display error message
//         alert(`Activation Failed: ${responseData.error}`);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert(`Activation failed: ${error.message}`);
//     }
//   };

//   // Rendering

//   const navigate = useNavigate();

//   if (isLoading) {
//     return (
//       <h6
//         className="text-center"
//         style={{
//           marginTop: "-70px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           width: "100%",
//         }}
//       >
//         <img
//           src={spinner}
//           alt="spinner"
//           height="90px"
//           width="90px"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         />
//       </h6>
//     );
//   }

//   const handleTasks = () => {
//     navigate("/tasks");
//   };

//   // For User LogOut
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     window.location.href = "/login";
//   };

//   // For User LogOut
//   const handleLogin = () => {
//     window.location.href = "/login";
//   };

//   // The rest of your component's code...

//   const customModalStyles = {
//     content: {
//       width: "98%", // Set the width of the modal here
//       height: "700px",
//       left: "2px",
//     },
//   };

//   // const customModalStyleTeam = {
//   //   content: {
//   //     width: '95%', // Set the width of the modal here
//   //     height: '700px',
//   //     left: '5px',
//   //     background: '#000',
//   //   },
//   // };

//   // const topupCustomModalStyles = {
//   //   content: {
//   //     width: '95%', // Set the width of the modal here
//   //     height: '500px',
//   //     left: '5px',
//   //   },
//   // };

//   if (isLoading) {
//     return (
//       <h6
//         className="text-center"
//         style={{
//           marginTop: "-70px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           height: "100vh",
//           width: "100%",
//         }}
//       >
//         <img
//           src={spinner}
//           alt="spinner"
//           height="90px"
//           width="90px"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         />
//       </h6>
//     );
//   }

//   // const handleViewMore = (downline) => {
//   //   setCurrentDownline(downline);
//   // };
//   const handleViewMore = (downline) => {
//     setVisitedDownlines((prevVisited) => [...prevVisited, currentDownline]); // Save the current downline in the visitedDownlines array
//     setCurrentDownline(downline);
//   };

//   const handleViewBack = () => {
//     const lastVisitedDownline = visitedDownlines.pop(); // Retrieve the last visited downline from the array
//     setCurrentDownline(lastVisitedDownline);
//     setVisitedDownlines([...visitedDownlines]); // Update visitedDownlines by removing the last element
//   };

//   // referral link
//   const referralLink = `https://powerfulIndia.in/register?ref=${data.userId}`;
//   // const referralLink = `https://globalsuccesspoint.in/register?ref=${data.userId}`;

//   // const handleCopy = () => {
//   //   navigator.clipboard.writeText(referralLink);
//   //   setCopied(true);
//   //   alert('copied')
//   // };
//   // const handleCopy = async () => {
//   //   try {
//   //     await navigator.clipboard.writeText(referralLink);
//   //     setCopied(true);
//   //   } catch (error) {
//   //     console.error('Failed to copy: ', error);
//   //     alert('Failed to copy: ', error);
//   //   }
//   // };

//   const handleCopy = () => {
//     if (navigator.clipboard) {
//       navigator.clipboard
//         .writeText(referralLink)
//         .then(() => setCopied(true))
//         .catch((error) => console.error("Failed to copy: ", error));
//     } else {
//       fallbackCopyTextToClipboard(referralLink);
//     }
//   };

//   const handleWhatsAppClick = () => {
//     const message = ` https://globalsuccesspoint.in/register?ref=${data.userId}`;
//     const encodedMessage = encodeURIComponent(message);
//     const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
//     window.open(whatsappURL, "_blank");
//   };

//   const fallbackCopyTextToClipboard = (text) => {
//     const textArea = document.createElement("textarea");
//     textArea.value = text;

//     // Set the textarea off-screen
//     textArea.style.position = "fixed";
//     textArea.style.top = "-9999px";
//     textArea.style.left = "-9999px";

//     document.body.appendChild(textArea);
//     textArea.focus();
//     textArea.select();

//     try {
//       const successful = document.execCommand("copy");
//       setCopied(successful);
//     } catch (error) {
//       console.error("Failed to copy: ", error);
//     }

//     document.body.removeChild(textArea);
//   };

//   const levelCounts = [1, 14, 70, 400, 1000, 2000];
//   const levelRanks = [
//     "Fresher",
//     "Starter",
//     "Bronze",
//     "Silver",
//     "Gold",
//     "Diamond",
//   ];
//   let activationTime = "Unknown";

//   if (data.activationTime) {
//     activationTime = new Date(data.activationTime).toLocaleString("en-IN", {
//       year: "numeric",
//       month: "long",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   }

//  return(
// <>
// </>
//  )

// };
// export default Dashboard;

import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsWhatsapp } from "react-icons/bs";
import Modal from "react-modal";
import "./Dashboard.css";
import logo from "../assets/PI1.png";
import QRCODE from "../assets/QRCODE2.jpg";
import spinner from "../assets/spinner2.gif";
import { MdOutlineTransferWithinAStation, MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { ImWhatsapp } from "react-icons/im";
import { BsTelegram } from "react-icons/bs";
import { MdGroups2 } from "react-icons/md";
import { HiOutlineArrowUpTray } from "react-icons/hi2";
import { RiExchangeFundsLine } from "react-icons/ri";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QRCodeGenerator from "../pages/QRCodeGenerator";
import ControlledCarousel from "./CarouselComponent";
import ParticleComponent from "./Task/ParticleComponent";
import FileInput from "../extra/App";
import DisplayImage from "../extra/DisplayImage";

const getTokenExpireTime = () => {
  const tokenExpire = localStorage.getItem("tokenExpire");
  return tokenExpire ? parseInt(tokenExpire) : null;
};

const isTokenExpired = () => {
  const expireTime = getTokenExpireTime();
  return expireTime ? expireTime < Date.now() : true;
};

const Dashboard = () => {
  // State declarations
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [data, setData] = useState([]);
  const [realTimeDate, setRealTimeDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [dailyIncome, setDailyIncome] = useState("");
  // For Direct
  const [isDirectModelOpen, setIsDirectModelOpen] = useState(false);
  // const [isTeamModelOpen, setIsTeamModelOpen] = useState(false);
  const [teamStructure, setTeamStructure] = useState([]);
  const [currentDownline, setCurrentDownline] = useState([]);
  const [visitedDownlines, setVisitedDownlines] = useState([]);
  const [rank, setRank] = useState("Loading...");
  const [activeUsersByLevel, setActiveUsersByLevel] = useState([]);
  //for fund move
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  // For deposit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    transactionId: "",
    userID: "",
    depositAmount: "",
  });
  // const [activeUserData, setActiveUserData] = useState([]);

  // For fetch direct sponsorID
  const [sponsors, setSponsors] = useState([]);

  // For Withdrawal
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [copied, setCopied] = useState(false);
  const [userId, setUserId] = useState("");
  const [userStatus, setUserStatus] = useState(null);
  const [topupButton, setTopupButton] = useState(true);
  const [topUpAmount, setTopUpAmount] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [imagePresent, setImagePresent] = useState(false);

  // Callback function to set the imagePresent state when an image is successfully uploaded
  const handleImageUploadSuccess = () => {
    setImagePresent(true);
  };
  // useEffect hooks
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
        if (result.role) {
          const userrole = result.role;
          // console.log(userrole);
          if (userrole === "admin") {
            localStorage.setItem("check", "nfwnwen");
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

  useEffect(() => {
    if (data.userId && data.updatedAt) {
      const convertTimestamp = () => {
        const date = new Date(data.updatedAt);
        const realTime = date.toLocaleString();
        setRealTimeDate(realTime);
      };

      convertTimestamp();
    }
  }, [data]);

  useEffect(() => {
    const fetchIncome = async () => {
      try {
        // const response = await fetch(`https://mlm-production.up.railway.app/api/daily-level-income/users/${data.userId}`);
        const response = await fetch(
          `https://mlm-production.up.railway.app/api/daily-level-income/users/${data.userId}`,
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
            },
            method: "GET",
          }
        );
        const dailyLevel = await response.json();
        setDailyIncome(dailyLevel.dailyIncome);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIncome();
  }, [data.userId]);

  useEffect(() => {
    axios
      .get(
        `https://mlm-production.up.railway.app/api/users/teamStructureRank/${data.userId}`
      )
      .then((response) => {
        const data = response.data;
        if (data.rank === "Fresher") {
          setRank("FRESHER");
        } else {
          // setRank(`Congratulations! You have achieved the rank: ${data.rank}.`);
          setRank(`${data.rank}.`);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRank("An error occurred while fetching the data.");
      });
  }, [data.userId]);

  useEffect(() => {
    // Call the backend API to get the team structure
    axios
      .get(
        `https://mlm-production.up.railway.app/api/users/teamStructure/${data.userId}`
      )
      .then((response) => {
        setActiveUsersByLevel(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team structure:", error);
      });
  }, [data.userId]);

  useEffect(() => {
    const fetchTeamStructure = async (userId) => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/users/team/${userId}`
        );
        setTeamStructure(response.data);
        setCurrentDownline(response?.data?.downline);
      } catch (error) {
        console.error("Error fetching team structure:", error);
      }
    };
    fetchTeamStructure(data.userId);
  }, [data.userId]);

  useEffect(() => {
    // fetchTopupAmount(data.userId);
    const fetchTopupAmount = async (userID) => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/deposit/topUpuserAmount/${userID}`
        );
        console.log("API Response:", response.data);
        console.log(data.userId);

        const { deposit } = response.data;

        if (!deposit) {
          console.log("User not found!");
          return;
        }

        const { depositAmount, isApproved } = deposit;
        console.log("Deposit Amount:", depositAmount);
        // setTopUpAmount(response.data);
        setTopUpAmount(depositAmount);
        setIsApproved(isApproved);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTopupAmount(data.userId);
    // console.log(data.userId)
  }, [data.userId]);

  useEffect(() => {
    if (isTokenExpired()) {
      setIsTokenValid(false);
      // redirect to homepage
      window.location.href = "/login";
    }
  }, []);

  // for direct userID
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await axios.get(
          `https://mlm-production.up.railway.app/api/direct/${data.userId}`
        );
        setSponsors(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSponsors();
  }, [data.userId]);

  const handleWithdrawalSubmit = (e) => {
    e.preventDefault();
    const amount = Number(withdrawalAmount); // convert string to number
    fetch(
      `https://mlm-production.up.railway.app/api/withdraw/user/${data.userId}`,
      {
        // fetch(`http://localhost:5000/api/withdraw/user/${data.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          ifscCode: data.ifscCode,
          accountNo: data.accountNo,
          accountHolderName: data.accountHolderName,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // display success message or update user balance
          // toast.success("Withdrawal successful");
        } else {
          // display error message
          toast.error(`Withdrawal failed: ${data.error}`);
          // toast.error('Sunday Closed')
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(`Withdrawal failed: ${error.message}`);
        // toast.error('Sunday closed!!!')
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      // const response = await axios.post('https://mlm-production.up.railway.app/api/deposit/upload', formData);
      const response = await axios.post(
        "https://mlm-production.up.railway.app/api/deposit/userAmount",
        //  "http://localhost:5000/api/deposit/userAmount",
        formData
      );
      const data = response.data;

      console.log(data);
      alert("Deposited!");
      window.location.href = "/dashboard";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("Transaction Id already exists");
      }
      console.error(error);
      alert("Not Deposited!");
    }
  };

  //Fund move API and Function start
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleFundMoveSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://mlm-production.up.railway.app/api/transfer/${data._id}`,
        { amount: parseFloat(amount) }
      );
      setMessage(response.data.message);
      alert(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };
  //Fund move API and Function End

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://mlm-production.up.railway.app/api/deposit/topUpActivate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      const data = await response.json();
      setTopupButton(false); // Hide the button after getting the user status
      if (data.status === "not_found") {
        alert("user not found!");
        setUserStatus(null);
        setTopupButton(true);
      } else {
        // setUserStatus(data.status);
        // setUserStatus(data.name + " is " + (data.status));
        if (data.status === true) {
          setUserStatus(data.name + " is Active");
      } else {
          setUserStatus(data.name + " is Inactive");
      }
      
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleActivateUser = async () => {
    if (data.topupWallet < 850) {
      alert("Insufficient funds for Activation");
      return;
    }
    try {
      const response = await fetch(
        `https://mlm-production.up.railway.app/api/deposit/topUpUserID/${data.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Activation failed");
      }

      const responseData = await response.json();

      if (responseData.success) {
        // display success message or update user balance
        alert("UserID Activated Successfully");
        window.location.href = "/dashboard";
      } else {
        // display error message
        alert(`Activation Failed: ${responseData.error}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Activation failed: ${error.message}`);
    }
  };

  // Rendering

  const navigate = useNavigate();

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
          height="90px"
          width="90px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }

  const handleTasks = () => {
    navigate("/tasks");
  };

  // For User LogOut
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  // For User LogOut
  const handleLogin = () => {
    window.location.href = "/login";
  };

  // The rest of your component's code...

  const customModalStyles = {
    content: {
      width: "98%", // Set the width of the modal here
      height: "700px",
      left: "2px",
    },
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
          height="90px"
          width="90px"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </h6>
    );
  }

  // const handleViewMore = (downline) => {
  //   setCurrentDownline(downline);
  // };
  const handleViewMore = (downline) => {
    setVisitedDownlines((prevVisited) => [...prevVisited, currentDownline]); // Save the current downline in the visitedDownlines array
    setCurrentDownline(downline);
  };

  const handleViewBack = () => {
    const lastVisitedDownline = visitedDownlines.pop(); // Retrieve the last visited downline from the array
    setCurrentDownline(lastVisitedDownline);
    setVisitedDownlines([...visitedDownlines]); // Update visitedDownlines by removing the last element
  };

  // referral link
  const referralLink = `https://powerfullindia.com/register?ref=${data.userId}`;
  // const referralLink = `https://globalsuccesspoint.in/register?ref=${data.userId}`;

  // const handleCopy = () => {
  //   navigator.clipboard.writeText(referralLink);
  //   setCopied(true);
  //   alert('copied')
  // };
  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(referralLink);
  //     setCopied(true);
  //   } catch (error) {
  //     console.error('Failed to copy: ', error);
  //     alert('Failed to copy: ', error);
  //   }
  // };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(referralLink)
        .then(() => setCopied(true))
        .catch((error) => console.error("Failed to copy: ", error));
    } else {
      fallbackCopyTextToClipboard(referralLink);
    }
  };

  const handleWhatsAppClick = () => {
    const message = `https://powerfullindia.com/register?ref=${data.userId}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  };

  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Set the textarea off-screen
    textArea.style.position = "fixed";
    textArea.style.top = "-9999px";
    textArea.style.left = "-9999px";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      setCopied(successful);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }

    document.body.removeChild(textArea);
  };

  const levelCounts = [1, 10, 70, 350, 800, 2000];
  const levelRanks = [
    "Fresher",
    "Bronze",
    "Silver",
    "Gold",
    "Royal Star",
    "Diamond",
  ];
  let activationTime = "Unknown";

  if (data.activationTime) {
    activationTime = new Date(data.activationTime).toLocaleString("en-IN", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }

  return (
    <div>
      {/* <div style={{ background: "#000428" }}> */}
      <ParticleComponent />
      {/* <div className="background-image"></div> */}
      {/* <div className="network-image"></div> */}
      <div className="dashboard-bg" style={{ zIndex: "1000" }}>
        {token && isTokenValid ? (
          <>
            <div>
              <nav className="navbar navbarBackground navbar-light bg-light">
                <a
                  className="navbar-brand text-bold"
                  href="/"
                  style={{
                    marginLeft: "25px",
                    color: "#30ABE2",
                    fontWeight: "700",
                    fontSize: "27px",
                  }}
                >
                  PI
                </a>
                <h6
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasRight"
                  aria-controls="offcanvasRight"
                >
                  {" "}
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/9109/9109764.png"
                    alt="img"
                    height="50px"
                    width="50px"
                    style={{ marginRight: "20px" }}
                  />
                </h6>
                <div
                  className="offcanvas offcanvasDashboard offcanvas-end"
                  tabIndex={-1}
                  id="offcanvasRight"
                  aria-labelledby="offcanvasRightLabel"
                >
                  <div className="offcanvas-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      aria-label="Close"
                    />
                  </div>

                  <div className="offcanvas-body offcanvasBody">
                    {/* Navbar- Start */}

                    <div className="container-fluid ms-3">
                      <div>
                        <ul className="navbar-nav ms-auto navbar-border mb-2 mb-lg-0">
                          {/* <li className="nav-item" style={{ color: "cyan" }}>
                <h6>Activation Date: {data.activationTime ? new Date(data.activationTime).toLocaleString() : 'unknown'}</h6>
              </li> */}

                          {/* {imagePresent ? (
                            <div className="company-logo">
                              <a href="/dashboard">
                                <img
                                  src={logo}
                                  height="220px"
                                  width="220px"
                                  alt="logo"
                                />
                              </a>
                            </div>
                          ) : (
                            <>
                            <div className="company-logo">
                              <a href="/dashboard">
                                <img
                                  src={logo}
                                  height="220px"
                                  width="220px"
                                  alt="logo"
                                />
                              </a>
                            </div>
                            <FileInput
                              onUploadSuccess={handleImageUploadSuccess}
                              userId={data.userId}
                            />
                            </>
                          )} */}
                          <div className="company-logo">
                            <a href="/dashboard">
                              <img
                                src={logo}
                                height="220px"
                                width="220px"
                                alt="logo"
                              />
                            </a>
                          </div>
                          <li>
                            <h6 className="text-info text-center mt-3">
                              {" "}
                              Hello, {data.name}
                            </h6>
                          </li>
                          <li>
                            <>
                              {data.role === "admin" ||
                              data.role === "Admin" ? (
                                <>
                                  <div>
                                    <Link to={"/admin/dashboard"}>
                                      <h6 className="text-center">
                                        Admin Dashboard
                                      </h6>
                                    </Link>
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          </li>
                          <li>
                            <div className="notification-container">
                              {/* <IoNotificationsCircle style={{ color: 'yellow', backgroundColor: 'red', borderRadius: '50%' }} className="notification-icon" /> */}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/2654/2654416.png"
                                alt="account Activation"
                                height="35px"
                                width="35px"
                              />
                              <div
                                className="notification-text"
                                style={{ color: "cyan" }}
                              >
                                &nbsp; &nbsp; Account activated on: &nbsp;
                                &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;{" "}
                                {/* {data.activationTime
                                  ? new Date(
                                      data.activationTime
                                    ).toLocaleString()
                                  : "unknown"} */}
                                {activationTime}
                              </div>
                            </div>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/profile"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/10613/10613753.png"
                                alt="profile"
                                height="20px"
                                width="20px"
                              />{" "}
                              &nbsp; Profile{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/profile-update"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/11121/11121490.png"
                                alt="Profile update"
                                height="20px"
                                width="20px"
                              />{" "}
                              &nbsp; Profile-update{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/withdrawal"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/2845/2845668.png"
                                alt="withdrawal"
                                height="23px"
                                width="23px"
                              />{" "}
                              &nbsp; Withdrawal{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/topUp"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/3503/3503775.png"
                                alt="TopUp History"
                                height="23px"
                                width="23px"
                              />{" "}
                              &nbsp; Top-up history{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/fundHistory"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/2530/2530313.png"
                                alt="Fund History"
                                height="23px"
                                width="23px"
                              />{" "}
                              &nbsp; Fund history{" "}
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/task-report"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/10008/10008048.png"
                                alt="member task report"
                                height="23px"
                                width="23px"
                              />{" "}
                              &nbsp; Member Task Report{" "}
                            </a>
                          </li>
                          {/*  */}
                          <li className="nav-item dropdown">
                            <a
                              className="nav-link dropdown-toggle"
                              aria-current="page"
                              href="/dashboard"
                              id="navbarDropdown"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/10710/10710128.png"
                                alt="member"
                                height="25px"
                                width="23px"
                              />{" "}
                              &nbsp; member{" "}
                            </a>
                            <ul
                              className="dropdown-menu"
                              aria-labelledby="navbarDropdown"
                            >
                              <li>
                                <div className="dropdown-item">
                                  <h6
                                    onClick={() => setIsDirectModelOpen(true)}
                                  >
                                    Direct
                                  </h6>
                                  {/*  */}
                                  {/*  */}
                                  <Modal
                                    isOpen={isDirectModelOpen}
                                    style={customModalStyles}
                                  >
                                    {/* <Modal isOpen={isDirectModelOpen} style={{width:"50%", height:"100px", backgroundColor:"yellow"}}> */}
                                    <h4
                                      style={{
                                        color: "red",
                                        fontWeight: "bold",
                                        position: "fixed",
                                        cursor: "pointer",
                                        right: "10%",
                                      }}
                                      onClick={() =>
                                        setIsDirectModelOpen(false)
                                      }
                                    >
                                      X
                                    </h4>
                                    <h6>All team</h6>
                                    <div>
                                      <div>
                                        <table
                                          className="table table-striped table-warning table-bordered"
                                          style={{ width: "18rem" }}
                                        >
                                          <thead>
                                            <tr>
                                              <th>S.No.</th>
                                              <th>Name</th>
                                              <th>Email</th>
                                              <th>UserId</th>
                                              <th>Mobile No</th>
                                              <th>Status</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {sponsors.map((sponsor, index) => (
                                              <tr key={sponsor._id}>
                                                <td>{index + 1}</td>
                                                <td>{sponsor.name}</td>
                                                <td>{sponsor.email}</td>
                                                <td>{sponsor.userId}</td>
                                                <td>{sponsor.mobile}</td>
                                                <td>
                                                  {sponsor.is_active
                                                    ? "Active"
                                                    : "Inactive"}
                                                </td>
                                              </tr>
                                            ))}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </Modal>
                                </div>
                              </li>{" "}
                              <hr />
                              <hr />
                              <li>
                                {" "}
                                <div className="dropdown-item"></div>
                              </li>
                            </ul>
                          </li>
                          {/*  */}
                          <li className="nav-item">
                            <a
                              className="nav-link active"
                              aria-current="page"
                              href="/password-reset"
                              style={{ color: "cyan", fontWeight: "600" }}
                            >
                              {" "}
                              <img
                                src="https://cdn-icons-png.flaticon.com/128/11135/11135315.png "
                                alt="forgot Password"
                                height="23px"
                                width="23px"
                              />{" "}
                              &nbsp; forgot password{" "}
                            </a>
                          </li>

                          <li className="nav-item">
                            {isLoggedIn ? (
                              <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                              >
                                LogOut
                              </button>
                            ) : (
                              <>
                                {" "}
                                <button
                                  className="btn btn-secondary"
                                  onClick={handleLogin}
                                >
                                  Login
                                </button>
                              </>
                            )}
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Navbar- End */}
                  </div>
                </div>
              </nav>
            </div>

            {/* Dashboard-Navbar */}

            {/*  */}
            <div className="container-fluid dashboard">
              <ControlledCarousel />
              {token ? (
                <div className="dashboard-profile-center">
                  <div className="dashboard-profile ">
                    <h6
                      className="text-center d-flex text-light"
                      style={{ justifyContent: "center", letterSpacing: "2px" }}
                    >
                      Hello, {data.name}
                    </h6>
                    <h6
                      className="text-center fw-bold "
                      style={{ color: "cyan" }}
                    >
                      UserID: {data.userId}
                    </h6>
                    <h6 className="text-center " style={{ color: "#aaa" }}>
                      Email: {data.email}
                    </h6>
                    <h6 className="text-center" style={{ color: "#ccc" }}>
                      SponsorID: {data.sponsorId}
                    </h6>
                  </div>
                </div>
              ) : (
                <h6 className="text-center">Re Login to continue...</h6>
              )}

              <div className="id-status" style={{ letterSpacing: "2px" }}>
                <h6 className="text-light ms-5 fw-bold">
                  ID Status: {data.is_active ? "Active" : "Inactive"}
                </h6>
              </div>
              <div className="dashboard-rank" style={{ letterSpacing: "2px" }}>
                <div className="text-light ms-5 fw-bold">
                  {teamStructure &&
                  teamStructure.activeDownlineCount !== null ? (
                    <div>
                      {/* <p>Rank: {getLevel(teamStructure.activeDownlineCount)}</p> */}
                      <h6 className="fw-400">Rank: {rank}</h6>
                      {/* Render other team structure data */}
                    </div>
                  ) : (
                    <p>Loading...</p>
                  )}
                </div>
              </div>
              {/* Balance Section */}

              <div
                className="row mt-1 rowBalanceCard "
                style={{
                  color: "white",
                }}
              >
                <div className="team_structure_text">
                  <h6
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    style={{ opacity: ".9" }}
                  >
                    TEAM STRUCTURE
                  </h6>
                </div>
                <div className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>DAILY INCOME</p>
                  <h6>{data.topupWallets} 25 Rs</h6>
                </div>
                <div
                  className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard"
                  onClick={handleTasks}
                  userID={data.userId}
                >
                  <p className="mt-4" style={{ paddingLeft: "10px" }}>
                    TODAY'S TASK
                  </p>
                </div>
                {/* <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>TOP UP BALANCE</p>
                  <h4>{topUpAmount !== null ? topUpAmount : 'N/A'} Rs</h4>
                  <h6>{data.topUpAmount} Rs</h6>
                  {data.topupWallet}
                 </div> */}

                {/* <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>TOTAL BALANCE</p>
                  <h4>{topUpAmount !== null ? topUpAmount : 'N/A'} Rs</h4>
                  <h6>{data.balance} Rs</h6>
                </div> */}
                {/* <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>INCOME WALLET</p>
                  <h6>{data.income} Rs</h6>
                </div>
                <div className="col-11 col-sm-9 col md-6 col-lg-5 balanceCard">
                  <p>WITHDRAWAL WALLET</p>
                  <h6>{data.withdrawal} Rs</h6>
                </div> */}
                <div
                  className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard"
                  onClick={() => setIsModalOpen(true)}
                  style={{ paddingLeft: "40px" }}
                >
                  <AiOutlinePlusCircle className="dashboard-icon m-1" />
                  <h6> DEPOSIT</h6>
                </div>
                <div
                  className="col-5 col-sm-9 col md-6 col-lg-5 balanceCard"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1"
                >
                  <MdOutlineTransferWithinAStation className="dashboard-icon m-1" />
                  <h6> WITHDRAWAL</h6>
                </div>
              </div>
              {/* Balance section End */}
              <div className="row rowBalanceCard ">
                <div className="col-12 col-sm-9 col-md-5 col lg-4 ">
                  <div className="card incomeCard">
                    <div
                      className="card-heading text-warning"
                      style={{
                        marginLeft: "20px",
                        fontWeight: "600",
                        marginTop: "10px",
                      }}
                    >
                      INCOME
                    </div>
                    <div
                      className="card-text text-light"
                      style={{ marginLeft: "15px" }}
                    >
                      Your Total Income: {data.income} Rs
                    </div>
                    <div className="col">
                      <div className="d-flex flex-row">
                        <div className="p-2">
                          <div className="d-flex flex-column income-border">
                            <div className="p-2 text-light">Self Income</div>
                            <div className="p-2" style={{ color: "cyan" }}>
                              {data.selfIncome} Rs
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="d-flex flex-column income-border">
                            <div className="p-2 text-light">Team income</div>
                            <div className="p-2" style={{ color: "cyan" }}>
                              {data.teamIncome} Rs
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <div className="d-flex flex-column">
                            <div className="p-2 text-light">Reward</div>
                            <div className="p-2" style={{ color: "cyan" }}>
                              {data.rewards}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Balance section End */}

              {/* Team Structure Start */}
              {/* Modal */}
              <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog ">
                  <div className="modal-content bg-dark">
                    <div className="modal-header">
                      <h5
                        className="modal-title text-warning"
                        id="exampleModalLabel"
                      >
                        TEAM STRUCTURE
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body" style={{ overflowX: "auto" }}>
                      <table className="table table-bordered">
                        <thead className="fw-300">
                          <tr className="text-light">
                            <th>S.No</th>
                            <th>Level</th>
                            <th>Active</th>
                            <th style={{ width: "60px" }}>InActive</th>
                            <th>Target Team</th>
                            <th>Rank</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(activeUsersByLevel).map(
                            (level, index) => (
                              <tr key={level}>
                                <td className="text-light">{index + 1}</td>
                                <td className="text-info">{level}</td>
                                <td className="text-warning">
                                  {activeUsersByLevel[level].active}
                                </td>
                                <td className="text-danger">
                                  {activeUsersByLevel[level].inactive}
                                </td>
                                <td className="text-warning">
                                  {levelCounts[index]}
                                </td>
                                <td className="text-info">
                                  {levelRanks[index]}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-footer"></div>
                  </div>
                </div>
              </div>

              {/* Team Structure End */}
              {/* Withdrawal */}
              <Modal isOpen={isModalOpen} style={customModalStyles}>
                <div className="content_container">
                  <span
                    style={{
                      color: "gray",
                      textDecoration: "underline",
                      fontWeight: "bold",
                    }}
                  >
                    Deposit
                  </span>
                  <h4
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      position: "absolute",
                      cursor: "pointer",
                      right: "15px",
                    }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    X
                  </h4>
                  <h6>Recharge Amount</h6>
                  <h6>Rs 850/-</h6>
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
                  <hr />
                  <div
                    className="account"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">IFSC CODE</th>
                          <th scope="col">Account Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>UTIB0002620</td>
                          <td>923010046330302</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    className="account"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th scope="col">UPI</th>
                          <td>kumaromprakashhdhdksks@axl</td>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </div>
                <div className="form_container" style={{ marginTop: "-30px" }}>
                  <form onSubmit={handleSubmit}>
                    <div className="formInput">
                      <label htmlFor="name">Name:</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />

                      <label htmlFor="transactionId">UTR No:</label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        value={formData.transactionId}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="userID">User ID:</label>
                      <input
                        type="text"
                        id="userID"
                        name="userID"
                        value={formData.userID}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="userID">Amount</label>
                      <input
                        type="number"
                        id="depositAmount"
                        name="depositAmount"
                        value={formData.depositAmount}
                        onChange={handleChange}
                        minLength={0}
                        // required
                      />
                      {/* <label htmlFor="image">Image:</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/png,image/jpg, image/jpeg"
                        // onChange={handleChangeImage}
                        // required
                      /> */}
                      <button className="form_button" type="submit">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </Modal>
              <div
                className="modal fade "
                id="staticBackdrop1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1 className="modal-title fs-6" id="staticBackdropLabel">
                        WITHDRAWAL
                      </h1>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      />
                    </div>
                    <div className="modal-body">
                      <div className="content_container">
                        <form onSubmit={handleWithdrawalSubmit}>
                          <div
                            className="formInput"
                            style={{
                              paddingTop: "20px",
                              marginBottom: "8px",
                            }}
                          >
                            <label style={{ fontSize: "17px" }}>
                              Account No:
                            </label>
                            {/* <input>value={data.accountNo}</input> */}
                            <input
                              type="text"
                              value={data.accountNo}
                              disabled
                            />
                            <label style={{ fontSize: "17px" }}>
                              IFSC CODE:
                            </label>
                            {/* <input>value={data.ifscCode}</input> */}
                            <input type="text" value={data.ifscCode} disabled />
                            
                            <label style={{ fontSize: "17px" }}>
                              Account Holder Name:
                            </label>
                            {/* <input>value={data.GPay}</input> */}
                            <input
                              type="text"
                              value={data.accountHolderName}
                              disabled
                            />

                            <label>Withdraw Amount</label>
                            <input
                              type="number"
                              value={withdrawalAmount}
                              onChange={(e) =>
                                setWithdrawalAmount(e.target.value)
                              }
                            />
                            <button
                              className="form_button"
                              disabled={!withdrawalAmount}
                              style={{
                                backgroundImage:
                                  "linear-gradient(to left, #ff5f6d 0%, #ffc371 100%)",
                              }}
                            >
                              Withdraw
                            </button>
                          </div>
                        </form>
                        <ToastContainer />
                      </div>
                    </div>
                    <div className="modal-footer">
                      {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row dashboard-box">
                <div className="box-row">
                  <div className="box-col">
                    <div className="box-col-icon">
                      {/* TOP-UP NEW MODEL */}
                      <div>
                        <HiOutlineArrowUpTray
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          className="dashboard-icon1"
                          style={{ color: " #252E95" }}
                        />
                      </div>
                    </div>
                    <h6
                      className="mt-2 "
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      style={{ color: " #252E95" }}
                    >
                      {" "}
                      TOP-UP{" "}
                    </h6>

                    <div
                      className="modal fade "
                      id="staticBackdrop"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              TOP-UP
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <div>
                              <div className="form_container mb-3">
                                <form>
                                  <h6 className="text-success mt-3">
                                    Balance :{" "}
                                    {/* {isApproved ? (
                                        <>
                                          {topUpAmount !== null
                                            ? topUpAmount
                                            : "N/A"}{" "}
                                          Rs
                                        </>
                                      ) : (
                                        "Not Approved"
                                      )} */}
                                    {data.topupWallet}
                                  </h6>
                                  <div className="formInput mt-2 mb-3">
                                    <label
                                      htmlFor="userId"
                                      style={{ fontSize: "15px" }}
                                    >
                                      UserID
                                    </label>
                                    <input
                                      type="text"
                                      value={userId}
                                      onChange={(e) =>
                                        setUserId(e.target.value)
                                      }
                                      placeholder="Enter User ID"
                                      required
                                      min={"1"}
                                      minLength={"1"}
                                    />
                                    {/* <button className="form_button topUp_button">Search</button> */}
                                  </div>
                                </form>
                              </div>
                              <div
                                className="content d-flex"
                                style={{ justifyContent: "center" }}
                              >
                                {topupButton && (
                                  <button
                                    className="form_button topUp_button"
                                    style={{
                                      width: "270px",
                                      fontWeight: "600",
                                    }}
                                    onClick={handleClick}
                                    disabled={!userId}
                                  >
                                    Check Status
                                  </button>
                                )}
                              </div>
                              <div
                                className="content-para d-flex"
                                style={{ justifyContent: "center" }}
                              >
                                {userStatus === null ? (
                                  <p>Click the button to check status.</p>
                                ) :(
                                  <>
                                  {/* <p className="text-danger">
                                    User Already Activated!.
                                  </p> */}
                                  <h6 className="text-success text-center fw-bold">
                                    {userStatus}
                                  </h6> <br/>
                                  {data.status === true ?(
                                      <></>
                                  ):(<>
                                  <button
                                    className="form_button topUp_button1"
                                    style={{ width: "300px" }}
                                    onClick={handleActivateUser}
                                  >
                                    TopUp Now
                                  </button></>)}
                                  </>
                                )
                                //  : (
                                //   <button
                                //     className="form_button topUp_button1"
                                //     style={{ width: "300px" }}
                                //     onClick={handleActivateUser}
                                //   >
                                //     TopUp Now
                                //   </button>
                                // )
                                }
                                <div></div>
                              </div>
                            </div>
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

                    {/* TOP-UP NEW MODEL END */}
                  </div>
                  {/*  */}
                  <div className="box-col">
                    <div className="box-col-icon">
                      {/* TOP-UP NEW MODEL */}
                      <div>
                        <RiExchangeFundsLine
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop3"
                          className="dashboard-icon1"
                          style={{ color: "cyan" }}
                        />
                      </div>
                    </div>
                    <h6
                      className="mt-2 "
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop3"
                      style={{ color: "cyan" }}
                    >
                      {" "}
                      FUND MOVE{" "}
                    </h6>

                    <div
                      className="modal fade "
                      id="staticBackdrop3"
                      data-bs-backdrop="static"
                      data-bs-keyboard="false"
                      tabIndex={-1}
                      aria-labelledby="staticBackdropLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id="staticBackdropLabel"
                            >
                              FUND MOVE
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <form onSubmit={handleFundMoveSubmit}>
                              <div
                                className="formInput"
                                style={{
                                  paddingTop: "20px",
                                  marginBottom: "8px",
                                }}
                              >
                                {message && <p className="m-3">{message}</p>}
                                <label style={{ fontSize: "17px" }}>
                                  Total Income
                                </label>
                                {/* <input>value={data.accountNo}</input> */}
                                <input
                                  type="text"
                                  value={data.income}
                                  disabled
                                  style={{ color: "rgb(120, 0, 206)" }}
                                />
                                <label style={{ fontSize: "17px" }}>
                                  Total Balance
                                </label>
                                {/* <input>value={data.ifscCode}</input> */}
                                <input
                                  type="text"
                                  value={data.balance}
                                  disabled
                                  style={{ color: "rgb(120, 0, 206)" }}
                                />
                                <label style={{ fontSize: "17px" }}>
                                  TopUp Wallet
                                </label>
                                {/* <input>value={data.GPay}</input> */}
                                {/* <h4><>{topUpAmount !== null ? topUpAmount : 'N/A'} Rs</>} Rs</h4> */}
                                {/* <div>
                               <h6>
                                  {" "}
                                  {isApproved ? (
                                    <>
                                      {topUpAmount !== null
                                        ? topUpAmount
                                        : "N/A"}{" "}
                                      Rs
                                    </>
                                  ) : (
                                    "Not Approved"
                                  )}{" "}
                                  style={{ color: "rgb(120, 0, 206)" }}
                                </h6>
                               </div> */}
                                <input
                                  // value={
                                  //   isApproved
                                  //     ? topUpAmount !== null
                                  //       ? `${topUpAmount} Rs`
                                  //       : "N/A"
                                  //     : "Not Approved"
                                  // }
                                  value={data.topupWallet}
                                  disabled
                                  style={{ color: "rgb(120, 0, 206)" }}
                                />
                                <label style={{ fontSize: "17px" }}>
                                  Enter Amount:
                                </label>
                                <input
                                  type="text"
                                  value={amount}
                                  onChange={handleAmountChange}
                                  style={{ color: "rgb(120, 0, 206)" }}
                                />

                                <button
                                  className="form_button"
                                  type="submit"
                                  style={{
                                    background:
                                      "linear-gradient(to right, #c6d9df, #283048)",
                                  }}
                                >
                                  Submit
                                </button>
                              </div>
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

                    {/* TOP-UP NEW MODEL END */}
                  </div>
                </div>
              </div>

              {/*Withdrawal section end  */}
              {/* Referral Section */}
              <div className="row rowBalanceCard">
                <div className="col-12 col-sm-9 col-md-5 col-lg-4 ">
                  <div className="card mb-3 referralCard">
                    <div
                      className="card-heading"
                      style={{ color: "darkorchid" }}
                    >
                      Referral Link
                    </div>
                    <div>
                      <div className="form_input">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          style={{ color: "#eee" }}
                        />
                      </div>

                      <button className="referral-button" onClick={handleCopy}>
                        {copied ? (
                          <div className="text-light">Copied!</div>
                        ) : (
                          <>
                            {/* <h6 className='text-dark' style={{paddingTop:"5px"}}>COPY LINK</h6> */}
                            <img
                              src="https://cdn-icons-png.flaticon.com/128/1828/1828249.png"
                              height="25px"
                              width="25px"
                              alt=""
                            />
                          </>
                        )}
                      </button>

                      <div style={{ marginLeft: "20px", display: "inline" }}>
                        {/* <a className='text-success' href={`https://api.whatsapp.com/send?text=${encodeURIComponent(referralLink)}`} target="_blank"> */}

                        <BsWhatsapp
                          style={{
                            height: "28px",
                            width: "28px",
                            color: "green",
                          }}
                          onClick={handleWhatsAppClick}
                        />
                        <div>
                          <QRCodeGenerator userId={data.userId} />
                        </div>
                      </div>
                    </div>
                    {/*  */}
                  </div>
                </div>
              </div>
              {/* Referal section End */}
              {/* Extra information */}

              {/* New Support */}
              <div className="col-sm-12 col-md-6 col-lg-5 contact-section-1">
                <h3 style={{ color: "#01b7ff", textDecoration: "underline" }}>
                  Supports
                </h3>

                <div
                  className="contact-us mt-5"
                  style={{ marginLeft: "-15px" }}
                >
                  <div className="row">
                    <div className="col-3">
                      <Link
                        to={"tel:+91 8102256637"}
                        className="contact-icon col-2"
                      >
                        <IoCall className="contact-svg" />
                      </Link>
                    </div>

                    <div className="col-3">
                      <Link
                        to={"mailto:powerfulindia850@gmail.com"}
                        className="contact-icon col-2"
                      >
                        <MdEmail className="contact-svg" />
                      </Link>
                    </div>

                    <div className="col-3">
                      <Link
                        to={
                          "https://wa.me/918102256637/?text=Hi!%20I'm%20interested%20to%20know%20more."
                        }
                        className="contact-icon col-2"
                      >
                        <ImWhatsapp className="contact-svg" />
                      </Link>
                    </div>

                    <div className="col-3">
                      {/* <img src="https://cdn-icons-png.flaticon.com/128/1828/1828249.png" height='45px' width='45px' alt="" /> */}
                      <Link
                        to="https://t.me/+UPKVZrsgU-NlZTdl"
                        className="contact-icon col-2"
                      >
                        <BsTelegram className="contact-svg" />
                      </Link>
                    </div>
                  </div>

                  <div>
                    <h6
                      className="text-center text-light"
                      style={{ textDecoration: "underline" }}
                    >
                      Join WhatsApp Group
                    </h6>
                    <div className="m-1 p-3">
                      <Link
                        to="https://chat.whatsapp.com/HjgV1NCYjx4Go5tdcmiPyq"
                        className="contact-icon col-2"
                      >
                        <MdGroups2 className="contact-svg" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="time_update">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtUYEr6dGrRfmPzVp03_uHsktADr47VhHqtJBEDDqDZ9YpccdmnNyfQRwMhiXgZi4EVvw&usqp=CAU"
                height="60px"
                width="65px"
                style={{ borderRadius: "50%" }}
                alt=""
              />
              <h6
                className=" mt-3 ms-3 "
                style={{ width: "180px", color: "#fff" }}
              >
                Last update: {realTimeDate}
              </h6>
            </div>
            <div className="bottom_section " style={{ marginTop: "90px" }}>
              <div
                className="row  footer_row_content "
                style={{
                  background: "#000428",
                  height: "90px",
                  color: "cyan",
                }}
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
                      <Link
                        to="/wallet"
                        style={{ color: "cyan" }}
                        className="footer_icon"
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/9181/9181081.png"
                          alt="wallet"
                          height="35px"
                          width="35px"
                        />
                        <h6 className=" mt-1">Wallet</h6>
                      </Link>
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
                        <h6 className=" mt-1">Game</h6>
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
            {/*  */}
          </>
        ) : (
          <h1>Your session has expired. Please log in again.</h1>
        )}
      </div>
    </div>
  );
};
export default Dashboard;
