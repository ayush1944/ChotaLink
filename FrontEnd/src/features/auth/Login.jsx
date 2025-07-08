import { useContext, useState } from "react";
import { loginUser } from "../../api/createShortUrl";
import Context from "../../utils/context";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slice/authSlice";

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const auth = useSelector((state)=> state.auth);
  console.log(auth, "auth");
  


  const { toast } = useContext(Context);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const success = () => {
    toast.success("Login successful!");
  };
  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser(credentials.email, credentials.password);    

    if(data){
        success()
        navigate("/dashboard");
        dispatch(login(data.user));
    }
    else{
    toast.error("Login failed!");

    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 font-medium"
          >
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-500 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
