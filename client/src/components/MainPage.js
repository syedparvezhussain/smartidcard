import React, { useEffect, useState } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Modal from './Modal';

import contact from "../contact.json"

const datahard = [
  {
    id: 1,
    timestamp: "2022-03-28T10:00:00.000Z",
    location: "123 Main St.",
    message:"Accedent Detected",
    personname: "Nikhila"
  },
  {
    id: 2,
    timestamp: "2022-03-28T11:00:00.000Z",
    location: "456 Elm St.",
    message:"Rash Driving detected",
    personname: "Mobeen"
  },
  {
    id: 3,
    timestamp: "2022-03-28T12:00:00.000Z",
    location: "789 Oak St.",
    message:"Accedent Detected",
    personname: "Nikhil"
  },
  {
    id: 4,
    timestamp: "2022-03-28T13:00:00.000Z",
    location: "789 Oak St.",
    message:"Accedent Detected",
    personname: "akhil"
  },
];

const columns = [
  {
    Header: "Person ID",
    accessor: "id",
  },
  {
    Header: "personName",
    accessor: "personname",
  },
  {
    Header: "Location",
    accessor: "location",
  },
    {
    Header: "message",
    accessor: "message",
  },
   {
    Header: "Time and date",
    accessor: "timestamp",
  },
];
const columns2 = [
  {
    Header: "Contact Person Name",
    accessor: "name",
  },
  {
    Header: "Contact person relation",
    accessor: "relation",
  },
  {
    Header: "contact person ID",
    accessor: "id",
  },
    {
    Header: "contact details",
    accessor: "phone",
  },
   
];
const data2 = [
  {
    id: 1,
    phone: "940321654",
    relation: "father",
    name:"ramanujam",
  }
];


const MainPage = ({arrayOfMessages, data}) => {
 const [contactData, setContactData] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const [aletsData, setAlertData] = useState([])
     useEffect(()=>{

    setContactData(contact.contacts);
  }, [])
  useEffect(()=>{
    if(arrayOfMessages.length){
setAlertData([...arrayOfMessages, data]);
const contactDataOfStudent=  contactData.filter((e)=>{ 

 return e.id*1===data.id*1
})
console.log("the contact data ", contactDataOfStudent)
let getPhoneNumberMessages = ""
contactDataOfStudent.forEach((e)=>{
getPhoneNumberMessages= getPhoneNumberMessages + "  " + e.phone + "  " 
})
const lastMsg= arrayOfMessages[arrayOfMessages.length-1]
const msgString = lastMsg.personname + "is in danger" + "and is in the locaiton " + lastMsg.location + "their personalized message is " + lastMsg.message + "their id is" +lastMsg.id + "sending messages to... " + getPhoneNumberMessages 
alert("new alert **** "+msgString)
//TODO need tointegrate external API for SMS service
    }

  },[arrayOfMessages, data])
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
    async function clearContactJson() {
  const response = await fetch(`http://localhost:5000/clearContacts`);
  const jsonData = await response.json();
  console.log(jsonData);
  alert(jsonData)
}

  return (
    <div className="landing-page">
      <nav className="nav-options">
      <button onClick={handleOpenModal}>Add contacts</button>
         <button onClick={()=>{
          setContactData([]);
             clearContactJson();}}>Clear Contacts Data</button>
      </nav>
      {isModalOpen && <Modal data={contactData} setData={setContactData} studentData={datahard}closeModal={() => setIsModalOpen(false)} />}
      <div className="main-area">
        Contact Info
        <div style={{height:"300px",  overflow:"auto"}}>
        <ReactTable data={contactData} columns={columns2} />
        </div>
             <div style={{height:"300px",  overflow:"auto"}}>
        Details of the Alerts: 

        <ReactTable data={aletsData} columns={columns} />
        </div>
      </div>
    </div>
  );
}; 

export default MainPage;
