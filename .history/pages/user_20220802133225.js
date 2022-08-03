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
    console.log("calling to get data from api");
    const response = await fetch('/api/userinteract.js', {
      method: 'GET',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);
    console.log("got data from api");
    
  }

  return (
    <div className="App">
      {programid}  
      <br/> 
      <br/>

      
      <select onChange={handleProgramidChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
        {programs.map((programid) => <option key={programid.program_name} value={programid.id}> {programid.program_name} </option>)}
      </select>

      <br> 
      </br>
      <br>
      </br>
      <button onClick={getPrompts}>Once you have selected a program, please press this button to see the available prompts.</button>

      
    </div> 
  );

}






export default App;