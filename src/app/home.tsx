// pages/index.tsx

// Import necessary React and component libraries
"use client";
import { useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";

// Define the structure of each payout data entry
interface Payout {
  dateAndTime: string;
  status: string;
  value: string;
  username: string;
}

// Define metadata structure for pagination information
interface Metadata {
  page: number;
  limit: number;
  totalCount: number;
}

// Define the main component for the Payouts page
const PayoutsPage: React.FC = () => {
  // State variables for managing payouts, metadata, search term, current page, and loading status
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [metadata, setMetadata] = useState<Metadata>({
    page: 1,
    limit: 10,
    totalCount: 0,
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data on component mount or when currentPage or searchTerm changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [currentPage, searchTerm]);

  // Function to fetch payout data based on current page and search term
  const fetchData = async () => {
    try {
      // Construct API URL with pagination parameters or search query
      let apiUrl = `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/payouts?page=${currentPage}&limit=${metadata.limit}`;
      if (searchTerm) {
        apiUrl = `https://theseus-staging.lithium.ventures/api/v1/analytics/tech-test/search?query=${searchTerm}`;
      }

      // Fetch data from the API
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("Here is the response", data);

      // Update state based on whether it's a search or regular payout data
      if (searchTerm) {
        const searchData = data || [];
        console.log("search data to be set", searchData);
        setPayouts(searchData); // Ensure data is not undefined
      } else {
        const payoutsData = data?.data || [];
        const metadataInfo = data?.metadata || {
          page: 1,
          limit: 10,
          totalCount: 0,
        };
        console.log("payouts data to be set", payoutsData);

        setPayouts(payoutsData);
        setMetadata(metadataInfo);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or in case of an error
    }
  };

  // Function to format UTC time to a human-readable format
  function formatTime(inputTime: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short", // Short day name (e.g., "Fri")
      month: "short", // Short month name (e.g., "Apr")
      day: "numeric", // Numeric day of the month (e.g., "8")
      hour: "numeric", // Numeric hour (e.g., "18")
      minute: "numeric", // Numeric minute (e.g., "00")
      timeZone: "UTC", // Ensure UTC time zone
      timeZoneName: "short", // Short time zone name (e.g., "UTC")
    };

    const date = new Date(inputTime);
    const formattedTime: string = date.toLocaleString("en-US", options);
    return formattedTime;
  }

  // Example usage of formatTime function
  const inputTime: string = "2023-09-14T00:00:00.000Z";
  const formattedTime: string = formatTime(inputTime);
  console.log(formattedTime);

  // Function to handle search input change
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setCurrentPage(1);
  };

  // Function to handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Render the PayoutsPage component
  return (
    <div className="h-full p-5">
      {/* Page title */}
      <div className="py-2">
        <h1 className="font-bold text-[1.8rem]">Payouts</h1>
      </div>

      {/* Payout history section */}
      <div className="p-3">
        <div className="flex content-start items-center">
          {/* Color indicator */}
          <span className="dummy pr-[15px] rounded bg-indigo-400 h-[30px]"></span>
          {/* Section title */}
          <span className="py-2 pl-3">
            <h1 className="font-semibold">Payout History</h1>
          </span>
        </div>

        {/* Search input */}
        <div className="relative w-1/4">
          <input
            type="text"
            id="simple-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-50 dark:border-gray-50 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by username"
            required
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* Payout data table */}
        <table className="w-full">
          <thead>
            <tr>
              <th className="p-3">Date and Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Value</th>
              <th className="p-3">Username</th>
            </tr>
          </thead>
          <tbody>
            {/* Loading spinner */}
            {loading && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
                <ScaleLoader color={"#ffffff"} loading={loading} />
              </div>
            )}
            {/* Render payout data rows */}
            {payouts.map((payout, index) => (
              <tr
                key={index}
                className={`${index % 2 ? "rounded" : "rounded bg-gray-50"}`}
              >
                <td className="p-3 w-1/4 text-gray-500">
                  {formatTime(payout.dateAndTime)}
                </td>
                {/* Render payout status */}
                {payout.status === "Completed" ? (
                  <td className="p-3">
                    <span className="p-1 rounded  bg-lime-500">Paid</span>
                  </td>
                ) : (
                  <td className="p-3">
                    <span className="p-1 rounded  bg-gray-300">
                      {payout.status}
                    </span>
                  </td>
                )}
                {/* Render payout value and username */}
                <td className="p-3">{payout.value}</td>
                <td className="p-3 w-1/4">{payout.username}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex items-center justify-center gap-2">
        {/* Previous page button */}
        <button
          onClick={() => {
            setLoading(true);
            handlePageChange(currentPage - 1);
          }}
          className="py-1 px-2 bg-gray-300 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Previous
        </button>
        {/* Display current page and total pages */}
        <span className="text-gray-500">
          Page {currentPage} of{" "}
          {Math.ceil(metadata.totalCount / metadata.limit)}{" "}
        </span>
        {/* Next page button */}
        <button
          onClick={() => {
            setLoading(true);
            handlePageChange(currentPage + 1);
          }}
          className="py-1 px-2 bg-gray-300 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PayoutsPage;
