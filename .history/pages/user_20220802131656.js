import React, {useState} from 'react';


function App() {

  //fetch from api 
  //populate programs with data from fetch

  let programs = [
    {id : 1, program_name : "Test1"},
    {id : 2, program_name : "Test2"},
    {id : 3, program_name : "Test3"}
  ]

  let [programid, setProgramid] = useState("Select an app!");
  //our programid state variable is associated with the programid that the user picked

  let handleProgramidChange = (e) => {
    setProgramid(e.target.value);
  }

  const getPrompts = async() => {
    const response = await fetch('/api/userinteract.js', {
      method: 'POST',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    
    console.log(response.success);
  }

  return (
    <div className="App">
      {programid}
      <br/>

      <select onChange={handleProgramidChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
        {programs.map((programid) => <option key={programid.program_name} value={programid.id}> {programid.program_name} </option>)}
      </select>
    </div> 
  );

}






export default App;