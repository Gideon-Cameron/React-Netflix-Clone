import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [rememberLogin, setRememberLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Destructure signUp with the correct casing
  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Wait for the sign-up process to complete
      await signUp(email, password);
      // Navigate to the home page after successful signup
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen">
      <img 
        className="hidden sm:block absolute w-full h-full object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/ET-en-20240930-TRIFECTA-perspective_ea8ae4a0-8c35-42ea-876f-8b7ad74d7217_large.jpg" 
        alt="Netflix background" 
      />
      <div className="bg-black/70 fixed top-0 w-full h-screen" />

      <div className="fixed w-full px-4 py-24 z-20">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/80 rounded-lg">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-msans-bold">Sign Up</h1>
          
            <form onSubmit={handleFormSubmit} className="w-full flex flex-col py-4">
              <input 
                className="p-3 my-2 bg-gray-700 rounded" 
                type="email" 
                placeholder="Email" 
                autoComplete="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input 
                className="p-3 my-2 bg-gray-700 rounded" 
                type="password" 
                placeholder="Password" 
                autoComplete="current-password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="bg-red-600 py-3 my-6 rounded font-nsans-bold">Sign Up</button>

              <div className="flex justify-between items-center text-gray-600">
                <p>
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    checked={rememberLogin} 
                    onChange={() => setRememberLogin(!rememberLogin)} 
                  /> 
                  Remember Me
                </p>
                <p>Need Help?</p>
              </div>
              <p>
                <span className="text-gray-600 mr-2">Already Subscribed to Netflix?</span>
                <Link to="/login">Sign in</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
