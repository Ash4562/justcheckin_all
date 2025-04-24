import { Link, useNavigate } from "react-router-dom";
import { useAdminloginMutation } from "../../redux/adminApi/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [adminLogin, { isSuccess, isError, error }] = useAdminloginMutation();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!userData.email || !userData.password) {

      toast.error("Please fill in all fields");
      return;
    }
    adminLogin(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Admin login successfully");
      navigate("/admin/AdminVerify");


    }

    if (isError) {
      toast.error(error?.data?.message || "Login failed");
    }
  }, [isSuccess, isError, error, navigate]);

  return (
    <div
      className="h-screen w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('/loginBG.jpeg')`,
      }}
    >
      <div className="text-white flex items-center justify-center h-screen">
        <div className="p-6 sm:py-8 md:p-10 bg-white rounded-[30px] md:rounded-[50px] w-full max-w-lg">
          <div className="rounded-[15px] sm:py-4 xs:py-4 md:rounded-[20px] shadow-xl shadow-[#FFFFFF7A] flex flex-col w-full bg-gradient-to-t from-[#004FC2] to-[#00255C] px-4 md:p-20">
            <Link
              to="/admin/login"
              className="text-lg sm:text-xl md:text-2xl leading-6 py-2 font-semibold font-poppins text-center bg-gradient-to-t from-[#1562D8] to-[#85D200] mb-6 bg-clip-text text-transparent"
            >
              Login
            </Link>
            <form className="flex flex-col space-y-4 sm:space-y-6 w-full gap-4">
              <input
                placeholder="Email ID"
                type="text"
                value={userData.email}
                onChange={handleChange}
                name="email"
                className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
              />
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className=" py-2 px-2 mx-28 bg-white text-[#1562D8] font-poppins font-semibold text-sm sm:text-base rounded-[30px] md:rounded-[40px] hover:bg-[#003a96] "
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
