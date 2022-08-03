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

  let handleProgramidChange = (e) => {
    setProgramid(e.target.value);
  }

  return (
    <div className="App">
      {programid}
      <br/>

      <select onChange={handleProgramChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
        {programs.map((programid) => <option key={programid.id} value={programid.program_name}> {programid.program_name} </option>)}
      </select>
    </div> 
  );

}






export default App;