
import React, { useRef, useState } from 'react';
import logo from '../assets/PI1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link } from 'react-router-dom';
import ParticleComponent from './Task/ParticleComponent';

const LoginForm = ({setToken}) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [captchaResponse, setCaptchaResponse] = useState('');
  const [error, setError] = useState(null);
  const captchaRef = useRef();
  //for Login Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
// const BASE_URl = process.env.BASE_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    captchaRef.current.reset();
        try {
      const response = await fetch('https://mlm-production.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, password, captchaResponse }),
      });

      if (response.status === 400) {
        throw new Error('Invalid userId or password');
      }
      if (response.status === 401) {
        throw new Error('Invalid Captcha');
      }

      const { token } = await response.json();
      
      localStorage.setItem('token', token);
      // token will expire in 6 hours
      localStorage.setItem('tokenExpire', Date.now() + 21600000 ); //86400000 for 24
      //  setToken(token);
      setError(null);
      setIsSubmitting(false);
      toast.success('LogIn successfully!')
      // redirect to dashboard page
      window.location.href = '/dashboard';

    } 
    
    catch (error) {
      setError(error.message);
      alert(error.message)
    }

    
  };
  
  const handleCaptchaChange = (response) => {
    setCaptchaResponse(response);
  };
  return (
    <>
    <div >
    <ParticleComponent />
    </div>
    <div className="form_container">
    {/* <div className="form_container" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1347283792/photo/galaxy-outer-space-starry-sky-purple-red-abstract-star-pattern-futuristic-nebula-background.webp?b=1&s=170667a&w=0&k=20&c=8gMS2kDr8DELjwAnj-nB_jHvJRmolqgeFSf17_Ca6KI=')", backgroundSize:'cover'}}> */}
      <div className="card12 login_Image">
        <div className='login_Image2'> 
         <div className="img"><img src={logo} height={"220px"} width={"220px"} alt="Logo" /></div>
        </div>
        {/* <img src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?size=626&ext=jpg&uid=R102726883&ga=GA1.2.1717175719.1670043102&semt=sph" alt="" /> */}
      <form className='login_img' onSubmit={handleSubmit}>
       <div className="formInput">
           
      {error && <div className="error text-danger">{error}</div>}
      <div className="form_input">
      <label>UserId:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required/>
      </div>
     <div className="form_input">
     <label>Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
     </div>
    <div className="form_input">
    <ReCAPTCHA  style={{background:'transparent'}}
            sitekey="6LesDAkmAAAAANop2voHvPE_NCuh17wZf7J85ybm"
            onChange={handleCaptchaChange}
            ref={captchaRef}
          />
    </div>
      <button type="submit" className='form_button' style={{  backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF5Q7kZdjUq-gfzOvwIDxu93MNZRCjC3zKMNe2YS2&s')", letterSpacing:'4px', scale:'1.03'}} >
      {isSubmitting? 'processing...':'LOGIN'}
      </button>
      <Link to={'/register'}  style={{color:'#aaa'}} >Don't have an account yet? <a href='/register' style={{textDecoration:"underline", color:"gray"}}>SignUp</a> </Link>
      <Link to={'/password-reset'} style={{marginBottom:'8px', color:'gray',}}> <b style={{textDecoration:'underline', fontWeight:'500'}}>Forgot Password</b> </Link>
      </div>

    </form>
      </div>
   
    <ToastContainer/>
    </div>

    </>
  );
};
export default LoginForm;