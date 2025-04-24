import { Link, useNavigate } from "react-router-dom";
import { useVerifyOtpMutation } from "../../redux/adminApi/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminVerify = () => {
    const navigate = useNavigate();
    const [verifyotp, { isSuccess, isError, error, data }] = useVerifyOtpMutation();
    const [userData, setUserData] = useState({
        email: " ",
        otp: " ",
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const email = userData.email.trim();
        const otp = userData.otp.trim();

        if (!email || !otp) {
            toast.error("Please fill in all fields");
            return;
        }


        verifyotp({ email, otp });


    };

    useEffect(() => {
        const token = data?.token;
        if (token) {
            localStorage.setItem("token", token); // Save token in localStorage
            toast.success("OTP Verified! Redirecting...");
            // Redirect to dashboard or home page
            navigate("/admin");

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
                            to="/AdminVerify"
                            className="text-lg sm:text-xl md:text-2xl leading-6 py-2 font-semibold font-poppins text-center bg-gradient-to-t from-[#1562D8] to-[#85D200] mb-6 bg-clip-text text-transparent"
                        >
                            Verify otp
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
                                placeholder="Enter otp"
                                type="text"
                                value={userData.otp}
                                inputMode="numeric"
                                onChange={handleChange}
                                name="otp"
                                className="w-full py-2 border-b border-opacity-60 font-poppins font-light text-sm sm:text-base leading-6 bg-transparent focus:outline-none focus:border-[#1562D8] text-[#D9D9D9]"
                            />

                            <button
                                type="button"
                                onClick={handleSubmit}
                                className=" py-2 px-2 mx-28 bg-white text-[#1562D8] font-poppins font-semibold text-sm sm:text-base rounded-[30px] md:rounded-[40px] hover:bg-[#003a96] "
                            >
                                Verify OTP
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminVerify;
