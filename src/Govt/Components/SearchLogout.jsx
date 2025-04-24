import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useGovtUserQuery } from "../redux/authGovt";

const SearchLogout = () => {
    const { data, isLoading, error } = useGovtUserQuery();
    const [searchQuery, setSearchQuery] = useState(""); // State for search input
    const [filteredData, setFilteredData] = useState([]); // State for filtered results

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
            <div className="w-full flex flex-col sm:flex-row items-center justify-between  sm:py-4">
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
