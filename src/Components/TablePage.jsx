import React, { useState, useEffect } from "react";
import Table from "./Table";
import Dropdown from "./Dropdown";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import logo from "../assets/logo.png";

const TablePage = () => {
  const [data, setData] = useState([
    {
      title: "SQL Basics To Advanced Mastery Course",
      startDate: "2024-07-20",
      endDate: "2024-07-28",
      price: "$1000",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Introduction to Python Programming",
      startDate: "2024-08-01",
      endDate: "2024-08-15",
      price: "$750",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Data Science with R",
      startDate: "2024-09-05",
      endDate: "2024-09-20",
      price: "$1200",
      validity: "365 days",
      status: "draft",
    },
    {
      title: "Machine Learning Fundamentals",
      startDate: "2024-10-10",
      endDate: "2024-10-25",
      price: "$1300",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Web Development Bootcamp",
      startDate: "2024-11-01",
      endDate: "2024-11-30",
      price: "$900",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Advanced JavaScript Techniques",
      startDate: "2024-12-01",
      endDate: "2024-12-15",
      price: "$800",
      validity: "365 days",
      status: "archived",
    },
    {
      title: "Full Stack Developer Course",
      startDate: "2025-01-10",
      endDate: "2025-03-10",
      price: "$1500",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Digital Marketing Masterclass",
      startDate: "2025-02-05",
      endDate: "2025-02-20",
      price: "$950",
      validity: "365 days",
      status: "draft",
    },
    {
      title: "Cloud Computing Essentials",
      startDate: "2025-03-15",
      endDate: "2025-03-30",
      price: "$1100",
      validity: "365 days",
      status: "published",
    },
    {
      title: "Cybersecurity Fundamentals",
      startDate: "2025-04-01",
      endDate: "2025-04-20",
      price: "$1000",
      validity: "365 days",
      status: "published",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const rowsPerPageOptions = [
    { value: 3, label: "3 rows" },
    { value: 5, label: "5 rows" },
    { value: 10, label: "10 rows" },
  ];

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const keyFn = (rowData) => rowData.name;

  const config = [
    {
      label: "Title",
      render: () => (
        <img
          src={logo}
          alt="Logo"
          className="w-[106px] h-[60px] rounded-lg shadow-lg object-cover"
          style={{ filter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25))" }}
        />
      ),
      header: () => "Title", // Optional header label
    },
    {
      label: "",
      render: (rowData) => rowData.title,
    },
    {
      label: "Start Date",
      render: (rowData) => new Date(rowData.startDate).toLocaleDateString(),
    },
    {
      label: "End Date",
      render: (rowData) => new Date(rowData.endDate).toLocaleDateString(),
    },
    {
      label: "Price",
      render: (rowData) => rowData.price,
    },
    {
      label: "Validity",
      render: (rowData) => rowData.validity,
    },
    {
      label: "Status",
      render: (rowData) =>
        rowData.status === `published` ? (
          <button className="bg-[#DBFFCE] text-black px-2 cursor-default py-1 rounded-mdbg-[#DBFFCE] text-black">
            published
          </button>
        ) : (
          rowData.status
        ),
    },
  ];

  useEffect(() => {
    const handleKeydown = (event) => {
      if ((event.altKey || event.metaKey) && event.key === "k") {
        document.getElementById("search").focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  return (
    <div className="p-4 h-full">
      <div className="mb-4">
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title..."
          className="border border-gray-300 rounded-sm p-2 w-[20rem]"
        />
        <button className="w-[7.25rem] bg-[#6C6BAF] text-white font-[1.2rem] rounded-[4px] h-[2.69rem] ml-4">
          Search
        </button>
      </div>
      <div className="overflow-x-scroll">
        <Table data={paginatedData} config={config} keyFn={keyFn} />
      </div>
      <div className="mt-4 flex justify-between items-center absolute bottom-0 mb-20 right-0 gap-10 px-4">
        <Dropdown
          options={rowsPerPageOptions}
          value={rowsPerPageOptions.find((opt) => opt.value === rowsPerPage)}
          onChange={(option) => {
            setRowsPerPage(option.value);
            setCurrentPage(1);
          }}
          upward
        />
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2  text-black  disabled:text-gray-400 flex items-center"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2  text-black  disabled:text-gray-400 flex items-center"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default TablePage;
