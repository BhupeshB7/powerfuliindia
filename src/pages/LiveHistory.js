// import React, { useEffect, useState } from "react";
// import { Table } from "react-bootstrap";

// const LiveHistory = () => {
//   const [liveGameUsers, setLiveGameUsers] = useState([]);
//   const [checkT, setCheckT] = useState(localStorage.getItem("check"));

//   const fetchLiveGameUsers = async () => {
//     try {
//       const response = await fetch("https://mlm-production.up.railway.app/api/liveGameHistory");
//       const data = await response.json();
//       setLiveGameUsers(data);
//     } catch (error) {
//       console.error("Error fetching live game users:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchDataInterval = setInterval(fetchLiveGameUsers, 2000); // Fetch data every 5 seconds

//     return () => clearInterval(fetchDataInterval); // Cleanup on unmount

//   }, []); // Run only on mount and unmount

//   return (
//     <div className="adminLive">
//       {checkT ? (
//         <>
//           <h6 className="text-light p-2">User Game History</h6>
//           <div className="table-responsive p-1">
//             <Table
//               striped
//               bordered
//               hover
//               style={{
//                 border: "2px solid yellow",
//                 backgroundImage:
//                   "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)",
//               }}
//             >
//               <thead>
//                 <tr className="text-warning">
//                   <th>#</th>
//                   <th>sessionId</th>
//                   <th>Color</th>
//                   <th>Number</th>
//                   <th>Big/Small</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {liveGameUsers.map((user, index) => (
//                   <tr key={user._id} className="text-light">
//                     <td>{index + 1}</td>
//                     <td>{user.sessionId}</td>
//                     <td>{user.color}</td>
//                     <td>{user.number}</td>
//                     <td>{user.size}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </div>
//         </>
//       ) : (
//         <>
//           <h6>Login Again</h6>
//         </>
//       )}
//     </div>
//   );
// };

// export default LiveHistory;


// frontend/src/components/LiveHistory.js

import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const LiveHistory = () => {
  const [liveGameUsers, setLiveGameUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [checkT, setCheckT] = useState(localStorage.getItem("check"));

  const fetchLiveGameUsers = async (page) => {
    try {
      const response = await fetch(`https://mlm-production.up.railway.app/api/liveGameHistory?page=${page}&perPage=10`);
      const data = await response.json();
      setLiveGameUsers(data.data);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      console.error("Error fetching live game users:", error);
    }
  };

  useEffect(() => {
    fetchLiveGameUsers(currentPage);
    const fetchDataInterval = setInterval(() => fetchLiveGameUsers(currentPage), 5000);

    return () => clearInterval(fetchDataInterval); // Cleanup on unmount
  }, [currentPage]);

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="adminLive">
      {checkT ? (
        <>
          <h6 className="text-light p-2"> Game History</h6>
          <div className="table-responsive p-1">
          <Table
              striped
              bordered
              hover
              style={{
                border: "2px solid yellow",
                backgroundImage:
                  "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)",
              }}
            >
              <thead>
                <tr className="text-warning">
                  <th>#</th>
                  <th>sessionId</th>
                  <th>Color</th>
                  <th>Number</th>
                  <th>Big/Small</th>
                </tr>
              </thead>
              <tbody>
                {liveGameUsers.map((user, index) => (
                  <tr key={user._id} className="text-light">
                    <td>{index + 1}</td>
                    <td>{user.sessionId}</td>
                    <td>{user.color}</td>
                    <td>{user.number}</td>
                    <td>{user.size}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="pagination-buttons">
            <Button variant="warning" className="m-1" onClick={handlePrevClick} disabled={currentPage === 1}>
              Previous
            </Button>
            <Button variant="warning" className="m-1" onClick={handleNextClick} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </>
      ) : (
        <>
          <h6>Login Again</h6>
        </>
      )}
    </div>
  );
};

export default LiveHistory;
