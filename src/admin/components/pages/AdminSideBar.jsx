import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { FaHotel } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { LuUsersRound } from "react-icons/lu";
import { VscBellDot } from "react-icons/vsc";
import UserIcon from "/UserIcon.jpg";
import { RiGovernmentFill } from "react-icons/ri";


const AdminSideBar = () => {
  return (
    <>
      {/* Sidebar for Larger Screens */}
      <div className="hidden md:flex md:flex-col md:w-1/4 md:min-h-screen  bg-[#0060EC] p-4 shadow-md">
        {/* Profile Icon */}
        <div className="border-b-2 border-white ">
          {/* <GoPerson className="text-4xl text-blue-600" />  Replace it with the image */}
          <div className=" w-24 h-24 mx-auto my-8 bg-white rounded-full flex justify-center items-center shadow-md">
            <img src={UserIcon} alt="userProfileIcon" />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-8">
          {/* Dashboard */}
          <div className="flex items-center gap-3 text-lg text-white mb-6 px-4">
            <MdOutlineDashboard className="icon-large" />
            <Link to="/admin/dashboard" className="hover:underline">
              Dashboard
            </Link>
          </div>

          {/* Hotel */}
          <div className="flex items-center gap-3 text-lg text-white mb-6 px-4">
            <FaHotel className="icon-large" />
            <Link to="/admin/AdminHotels" className="hover:underline">
              Hotel
            </Link>
          </div>

          {/* Users */}
          <div className="flex items-center gap-3 text-lg text-white mb-6 px-4">
            <LuUsersRound className="icon-large" />
            <Link to="/admin/AllUserHotels" className="hover:underline">
              Users
            </Link>
          </div>

          {/* Payments */}
          <div className="flex items-center gap-3 text-lg text-white mb-6 px-4">
            <MdOutlinePayments className="icon-large" />
            <Link to="/AdminPayments" className="hover:underline">
              Payments
            </Link>
          </div>

          {/* Pending Approvals */}
          <div className="flex items-center gap-3 text-lg text-white px-4">
            <VscBellDot className="icon-large" />
            <Link to="/admin/AdminPendingApprovals" className="hover:underline">
              Pending <br /> Approvals
            </Link>
          </div>

          {/* Government  */}
          <div className="flex items-center gap-3 mt-2 text-lg text-white mb-6 px-4">
            <RiGovernmentFill className="icon-large" />
            <Link to="/admin/AdminCreateUser" className="hover:underline">
              Government
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for Smaller Screens */}
      <div className="md:hidden fixed w-full bg-[#0060EC] shadow-lg flex z-10 justify-around py-3">
        <Link to="/" className="text-white flex flex-col items-center">
          <MdOutlineDashboard className="icon-size" />
          <span className="text-sm">Dashboard</span>
        </Link>
        <Link
          to="/admin/AdminHotels"
          className="text-white flex flex-col items-center"
        >
          <FaHotel className="icon-size" />
          <span className="text-sm">Hotel</span>
        </Link>
        <Link
          to="/admin/AllUserHotels"
          className="text-white flex flex-col items-center"
        >
          <LuUsersRound className="icon-size" />
          <span className="text-sm">Users</span>
        </Link>
        <Link
          to="/admin/AdminPayments"
          className="text-white flex flex-col items-center"
        >
          <MdOutlinePayments className="icon-size" />
          <span className="text-sm">Payments</span>
        </Link>
        <Link
          to="/admin/AdminPendingApprovals"
          className="text-white flex flex-col items-center text-center w-16"
        >
          <VscBellDot className="icon-size" />
          <span className="text-sm leading-tight">Pending <br /> Approvals</span>
        </Link>
        <Link
          to="/admin/AdminCreateUser"
          className="text-white flex flex-col items-center text-center w-16"
        >
          <RiGovernmentFill className="icon-size" />
          <span className="text-sm leading-tight">Government </span>
        </Link>
      </div>
    </>
  );
};

export default AdminSideBar;
