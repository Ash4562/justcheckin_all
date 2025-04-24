import AdminSideBar from "./AdminSideBar";
import { CiSearch } from "react-icons/ci";
import hands from "/public/Vector.jpg";
import Rupee from "/Rupee.svg";
import cash from "/public/hotelIMG.png";
// CHART / GRAPH
import { Bar } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Link } from "react-router-dom";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useGetPaymentsQuery } from "../../redux/adminApi/adminPayments";
import SearchLogout from "../../components/SearchLogout";
// import { useGetPaymentsQuery } from "../../redux/adminApi/adminPayments";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const AdminPayments = () => {
  const { data: payments } = useGetPaymentsQuery()
  console.log(payments);



  // Bar Chart data and options
  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "",
        data: [70, 50, 80, 40, 60, 30, 70],
        // backgroundColor: "rgba(0, 96, 236, 1)",
        backgroundColor: "rgba(133, 210, 0, 1)",

        borderWidth: 1,
        borderRadius: 60,
        lineWidth: 20,
        barPercentage: 0.5,
        barThickness: 90,
        maxBarThickness: 8,
        minBarLength: 0,
        maxBarLength: 100,
      },
      {
        label: "",
        data: [100, 100, 100, 100, 100, 100, 100],
        // backgroundColor: "rgba(133, 210, 0, 1)",
        backgroundColor: "rgba(0, 96, 236, 1)",
        borderRadius: 60,
        borderWidth: 1,
        lineWidth: 20,
        barPercentage: 0.5,
        barThickness: 90,
        maxBarThickness: 8,
        minBarLength: 100,
      },
    ],
  };

  const barOptions = {
    plugins: {
      label: {
        font: {
          family: "Poppins",
          size: 14, // Increase font size of X-axis labels
        },
      },
      legend: {
        position: "top",
        display: false,
      },
      title: {
        display: true,
      },
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: "#1562D8", // Correct hex color code for the labels
        },
      },

      barThickness: 40,

      y: {
        stacked: true,
        ticks: {
          display: false, // This will hide the numbers on the Y-axis
        },
      },
    },
  };

  // Donut Chart Data and Option
  const data = {
    labels: ["Blue Segment", "Green Segment"],
    datasets: [
      {
        label: "Dataset",
        data: [25, 75], // Adjust values for proportions
        backgroundColor: [
          "#85D200", // Green
          "#1562D8", // Blue
        ],
        // color: "black",
        // hoverOffset: 4,
      },
      // options: []
    ],
  };

  //options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // Change to 'bottom' or 'left' if needed
        display: false,
      },
      tooltip: {
        enabled: true,
      },
      // Custom plugin to show percentage in the center
      customCenterText: {
        percentage: data.datasets[0].data[0], // Show the first segment percentage
        color: "#000000", // Text color (black)
        fontSize: "16", // Font size
        fontFamily: "Poppins", // Font family
        fontWeight: 500, // Font weight
        lineHeight: 24, // Line height
      },
    },
    cutout: "70%", // Adjust for inner radius
    radius: 90,
  };

  // Define a custom plugin for displaying text in the center
  const customTextPlugin = {
    id: "customCenterText",
    beforeDraw(chart) {
      const { width } = chart;
      const { percentage, color, fontSize } =
        chart.options.plugins.customCenterText;
      const ctx = chart.ctx;
      const text = `${percentage}%`; // Green percentage text
      ctx.save();
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = color;
      ctx.fillText(text, width / 2, chart.chartArea.top + chart.height / 2);
    },
  };

  return (
    <div className="flex">
      <AdminSideBar />
      {/* Main Content */}
      <div className="flex flex-col w-full px-6  bg-white shadow-md border rounded-lg mt-20 sm:mt-20 md:mt-0 h-screen">
        <SearchLogout className="w-full flex flex-row items-center justify-between py-4 sm:py-20" />

        {/* Graphs */}
        <div className="flex flex-col justify-center  gap-6">
          <div className="flex items-center  w-full gap-6 bg-[#F3FFDF] justify-evenly xs:flex xs:flex-col">
            <div className=" bg-[#F3FFDF]   rounded-lg xs:w-full">
              <Bar
                data={barData}
                options={barOptions}
                style={{ width: "500px", height: "500px" }}
              />
            </div>
            <div className="rounded-lg xs:w-full">
              <Doughnut
                data={data}
                options={options}
                plugins={[customTextPlugin]} // Add the custom plugin
              />{" "}
            </div>
            <div className="flex flex-col gap-4 -mt-44 xs:mt-0 xs:justify-center xs:items-center xs:w-full">
              <p className="font-poppins font-medium text-base leading-6 justify-start ">
                Weekly Summary
              </p>
              <div className="flex flex-row justify-center items-center gap-2 h-1/2 ">
                <div className=" h-8 w-8 rounded-full bg-[#85D200]" />
                <p className="font-light text-base leading-4">
                  Total Registered Users
                </p>
              </div>
            </div>
          </div>

          {/* Payments and Button Section */}
          <div className="xs:mb-20   w-full  px-4 md:px-8 lg:px-20  flex flex-col gap-6 lg:flex-row lg:gap-20 justify-between items-center">
            {/* Payments Info */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start ">
              {/* Payments Icon and Title */}
              <div className="flex flex-col  py-3 px-9 rounded-2xl  border-2  lg:items-start lg:text-left">
                <div>
                  <MdOutlineAccountBalanceWallet className="text-[#1562D8] border-0 ml-4 text-center text-5xl" />
                  <p className=" ">
                    Total wallet <br />
                    Amount                </p>
                  <strong className="text-2xl" >₹ {payments && payments.data.totalCredits}</strong>
                </div>
              </div>
              <div className="flex flex-col  py-3 px-9 rounded-2xl  border-2 ml-12  lg:items-start lg:text-left">
                <div>
                  <img src={hands} className="text-[#1562D8] border-0 ml-4 text-center text-2xl" />
                  <p className=" ">
                    Total Registeration  <br />
                    Amount                </p>
                  <strong className="text-2xl " >₹ {payments && payments.data.totalCredits}</strong>
                </div>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
