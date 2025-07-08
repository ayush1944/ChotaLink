import React, { useContext, useState } from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Context from "../../utils/context";
import { useSelector } from "react-redux";
import { logoutUser } from "../../api/createShortUrl";



export default function Navbar() {

  const auth = useSelector((state)=> state.auth)
  console.log(auth, "auth");
  const [user, setuser] = useState(auth.isAuthenticated);

  const { toast } = useContext(Context);


  const success = () => {
   toast.success("Logut successful!");
 };
 
 
 const handlelogout = async ()=>{
 await logoutUser();
 setuser(false);
    success();
  }

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 shadow-md">
      <Logo />

      {
        user ? 
        (
          <div className="flex items-center space-x-4">
            <Link
              to="/profile"
              className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              Profile
            </Link>
            <button
              onClick={handlelogout}
              className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
            >
              Logout
            </button>
          </div>
         ):
          (      
        <div className="flex items-center space-x-4">
          <Link
          to="/login"
          className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Register
        </Link>
      </div>
      )
      }
    </nav>
  );
}
