import React, { useState } from "react";
import AdminSideBar from "./AdminSideBar";
import { CiSearch, } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useGetGovetusersQuery } from "../../redux/adminApi/govtApi";
import SearchLogout from "../../components/SearchLogout";


const UserDetails = () => {
    const { data: goverUser } = useGetGovetusersQuery()
    console.log(goverUser);


    return (
        <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <AdminSideBar />

            {/* Main Content */}
            <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
                {/* Top Section: Search Input and Logout Button */}
                <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />


                <div>
                    <p className="mb-3 text-2xl font-semibold">User Details</p>
                    <div className="overflow-x-auto">
                        <table className="table font-poppins">
                            {/* head */}
                            <thead>
                                <tr className="font-normal">

                                    <th className="font-normal">Email ID</th>
                                    <th className="font-normal">User Name</th>
                                    <th className="font-normal">Password</th>

                                </tr>
                            </thead>
                            <tbody className="font-normal">
                                {/* row 1 */}
                                {
                                    goverUser && goverUser.goverementCredential.map((item) => <tr key={item.id} className=" ">

                                        <td className="my-20">
                                            {item.sendemail}
                                        </td>
                                        <td className="my-6">
                                            {item.email}
                                        </td>
                                        <td className="my-6">{item.password}</td>

                                    </tr>)
                                }




                            </tbody>


                        </table>
                    </div>
                </div>
            </div>


        </div>

    );
};

export default UserDetails;
