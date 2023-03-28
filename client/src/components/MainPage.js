import React, { useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

const data = [
  {
    id: 1,
    timestamp: "2022-03-28T10:00:00.000Z",
    location: "123 Main St.",
    rashDriving: false,
    falseAlarmTrigger: false,
    accident: true,
    severity: "High",
  },
  {
    id: 2,
    timestamp: "2022-03-28T11:00:00.000Z",
    location: "456 Elm St.",
    rashDriving: true,
    falseAlarmTrigger: false,
    accident: false,
    severity: "Low",
  },
  {
    id: 3,
    timestamp: "2022-03-28T12:00:00.000Z",
    location: "789 Oak St.",
    rashDriving: false,
    falseAlarmTrigger: true,
    accident: false,
    severity: "Medium",
  },
];

const columns = [
  {
    Header: "Vehicle ID",
    accessor: "id",
  },
  {
    Header: "Timestamp",
    accessor: "timestamp",
  },
  {
    Header: "Location",
    accessor: "location",
  },
  {
    Header: "Rash Driving",
    accessor: "rashDriving",
      Cell: (row) => {
      return row.value ? <span className="indicator">&#x2714;</span> : <span className="indicator">&#x2718;</span>;;
    },
  },
  {
    Header: "False Alarm Trigger",
    accessor: "falseAlarmTrigger",
      Cell: (row) => {
      return row.value ? <span className="indicator">&#x2714;</span> :  <span className="indicator">&#x2718;</span>;;
    },
  },
  {
    Header: "Accident",
    accessor: "accident",
     Cell: (row) => {
      return row.value ? <span className="indicator">&#x2714;</span> :  <span className="indicator">&#x2718;</span>;;
    },
  },
  {
    Header: "Severity",
    accessor: "severity",
  },
];

const MainPage = () => {
  const [activeTab, setActiveTab] = useState("Hospital");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="landing-page">
      <nav className="nav-options">
        <button
          className={activeTab === "Hospital" ? "active" : ""}
          onClick={() => handleTabChange("Hospital")}
        >
          Hospital
        </button>
        <button
          className={activeTab === "Family" ? "active" : ""}
          onClick={() => handleTabChange("Family")}
        >
          Family
        </button>
        <button
          className={activeTab === "PoliceStation" ? "active" : ""}
          onClick={() => handleTabChange("PoliceStation")}
        >
          Police Station
        </button>
      </nav>
      <div className="main-area">
        <ReactTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default MainPage;
