import React, { useEffect, useState } from 'react';
import NavbarComponent from '../components/Admin/NavbarComponent';
import { Table } from 'react-bootstrap';
import AdminLiveGame from './AdminLiveGame';
import LiveHistory from './LiveHistory';

const checkT = localStorage.getItem("check");

const AdminLive = () => {
  const [liveGameUsers, setLiveGameUsers] = useState([]);

  useEffect(() => {
    const fetchLiveGameUsers = async () => {
      try {
        const response = await fetch('https://mlm-production.up.railway.app/api/liveGameUsers');
        const data = await response.json();
        setLiveGameUsers(data);
      } catch (error) {
        console.error('Error fetching live game users:', error);
      }
    };

    // Fetch data initially
    fetchLiveGameUsers();

    // Fetch data every second
    const intervalId = setInterval(fetchLiveGameUsers, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only once on mount


  return (
    <div className='adminLive' style={{minHeight:'800px'}}>
   {checkT?(
    <>
    <NavbarComponent/>
    <AdminLiveGame/>
    <LiveHistory/>
    <h6 className='text-light p-2'>User Current Bet History</h6>
    <div className='table-responsive p-1'>
      <Table striped bordered hover  style={{border:'2px solid yellow',backgroundImage:
                    "linear-gradient(60deg, #29323c 0%, #1d1f20 100%)"}}>
        <thead>
          <tr className='text-warning'>
            <th>#</th>
            <th>User ID</th>
            <th>Entry Fee</th>
            <th> Number</th>
            <th> Color</th>
            <th>Big/Small</th>
          </tr>
        </thead>
        <tbody>
          {liveGameUsers.map((user,index) => (
            <tr key={user._id} className='text-light'>
              <td>{index+1}</td>
              <td>{user.userId}</td>
              <td>{user.entryFee}</td>
              <td>{user.choosenNumber}</td>
              <td>{user.choosenColor}</td>
              <td>{user.choosenLetter}</td>
              {/* <td>{user.userId}</td> */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </>
   ):(<>
   <h6>Login Again</h6>
   </>)}
    </div>
  )
}

export default AdminLive