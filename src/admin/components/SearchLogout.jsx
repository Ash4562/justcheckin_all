import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useGetUsersQuery } from "../redux/adminApi/userApis";
import { useNavigate } from "react-router-dom";
import { useAdminlogoutMutation } from "../redux/adminApi/authApi";
import { toast } from "react-toastify";

const SearchLogout = () => {
    const { data, isLoading, error } = useGetUsersQuery();
    const [logout] = useAdminlogoutMutation();
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredData, setFilteredData] = useState([]); // State for filtered results
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout().unwrap(); // Call the logout mutation
            toast.success("Logged out successfully!");
            localStorage.removeItem("token");
            navigate("/login");
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
            console.error("Logout error:", error);
        }
    };
    // Update filtered data whenever the `data` or `searchQuery` changes
    useEffect(() => {
        if (data?.customers && searchQuery) {
            const filtered = data.customers.filter((customer) =>
                customer.customer_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.hotelName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                customer.aadhar_number?.includes(searchQuery)
            );
            setFilteredData(filtered);
        } else {
            setFilteredData([]); // Reset filtered data if search query is empty
        }
    }, [searchQuery, data]); // Dependency array ensures re-render when `data` or `searchQuery` changes

    // Handle loading and error states
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data!</div>;

    return (
        <>
            <div className="w-full flex flex-col sm:flex-row items-center justify-between xs:mt-20 sm:py-4">
                <div className="relative w-full">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // Update search query
                        className="w-full border px-10 py-2 focus:outline-none rounded-3xl font-poppins shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] placeholder:text-sm"
                        placeholder="Search by Name, Hotel, Aadhar..."
                    />
                    <CiSearch className="text-lg absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white xs:w-full mt-2 px-4 py-2 ml-4 rounded-3xl hover:bg-blue-600"
                >
                    Logout
                </button>
            </div>

            {/* Display filtered results only if there is a search query */}
            {searchQuery && (
                <div>
                    {filteredData.length > 0 ? (
                        <ul className="space-y-4">
                            {filteredData.map((customer) => (
                                <li key={customer._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                                    <div className="font-semibold">{customer.customer_name}</div>
                                    <div className="text-sm">Hotel: {customer.hotelName}</div>
                                    <div className="text-sm">Aadhar: {customer.aadhar_number}</div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center text-gray-500 mt-4">No results found</div>
                    )}
                </div>
            )}
        </>
    );
};

export default SearchLogout;
