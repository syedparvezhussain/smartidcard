import React, { useState } from 'react';

export default function Model({setData,studentData, data, closeModal}) {
  const [id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [relation, setRelation] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = { id, phone, relation, name };
    const phoneExist = data.some((e)=>{
      return e.phone === phone
    })
    const studentPresent =studentData&& studentData.some((e)=>{
      console.log(e.id, id, "sho be ")
      return e.id*1 === id*1
    })
          async function logJSONData(id,phone,name, relation) {
      const response = await fetch(`http://localhost:5000/updateContacts?id=${id}&name=${name}&phone=${phone}&relation=${relation}`);
      const jsonData = await response.json();
      console.log(jsonData);
      alert(jsonData)
}
    if(studentPresent){
  if(!phoneExist){
    setData([...data, newData]);
    logJSONData(id,phone,name,relation  );
    }
    else{
      alert("contact already exist")
    }
    }
    else{
      alert("student not present, invalid Id")
    }
  

    closeModal();
  };

  const closeModal2 = () => {
    // close the modal window
    closeModal()
  };
console.log("shwo this ")
  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">ID:</label>
        <input type="number" id="id" name="id" value={id} onChange={(e) => setId(e.target.value)} /><br />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />

        <label htmlFor="relation">Relation:</label>
        <input type="text" id="relation" name="relation" value={relation} onChange={(e) => setRelation(e.target.value)} /><br />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} /><br />

        <button type="submit">Submit</button>
        <button type="button" onClick={closeModal2}>Cancel</button>
      </form>
    </div>
  );
}
