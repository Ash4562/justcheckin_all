import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
// import { useCreateuserMutation } from "../../redux/adminApi/govtApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateuserMutation } from "../../redux/adminApi/govtApi";
import SearchLogout from "../../components/SearchLogout";

const AdminCreateUser = () => {
    const navigate = useNavigate()
    // State variables for username, password, and email
    const [sendemail, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    // Create user mutation
    const [createuser, { isSuccess, error, isError, isLoading }] =
        useCreateuserMutation();

    // Function to handle the "Send" button click
    const handleCreateUser = async () => {
        try {
            console.log("Creating user with:", { sendemail, password, email });
            await createuser({ sendemail, password, email });
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    // Trigger toast notifications
    if (isSuccess) {
        console.log("Success! User created.");
        toast.success("User created successfully!");
        navigate("/admin/UserDetails")
    }

    if (isError) {
        console.log("Error occurred:", error);
        toast.error(error?.data?.message || "Failed to create user!", {

        });
    }


    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
                {/* Top Section: Search Input and Logout Button */}
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

                {/* Create Username & Password */}
                <div>
                    <strong className="text-xl">Create Username & Password</strong>
                    <hr />
                    <input
                        type="text"
                        className="w-50 border rounded-full mt-4 px-10 py-2"
                        placeholder="Enter Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                    />
                    <br />
                    <input
                        type="password"
                        className="w-50 border rounded-full mt-4 px-10 py-2"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                </div>

                {/* Email Input and Send Button */}
                <div className="mt-4">
                    <strong className="text-xl">Send To</strong>
                    <hr />
                    <input
                        type="email"
                        className="w-50 border rounded-full mt-4 px-10 py-2"
                        placeholder="Enter Email"
                        value={sendemail}
                        onChange={(e) => setUsername(e.target.value)} // Update username state
                    />
                    <button
                        onClick={handleCreateUser} // Call handleCreateUser on button click
                        className="w-20 ml-6 btn-sm btn btn-primary"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? "Sending..." : "Send"}
                    </button>
                    <Link to="/admin/UserDetails" className="ml-64">
                        See User Details
                    </Link>
                </div>
            </div>

            {/* Toast Container for notifications */}
            <ToastContainer />
        </div>
    );
};

export default AdminCreateUser;
