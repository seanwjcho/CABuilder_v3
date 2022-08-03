import React, {useState} from 'react';


function App() {

  //fetch from api 
  //populate programs with data from fetch

  let programs = [
    {id : 1, program_name : "Test1"},
    {id : 2, program_name : "Test2"},
    {id : 3, program_name : "Test3"}
  ]

  let [program, setProgram] = useState("Select an app!");

  let handleProgramChange = (e) => {
    setProgram(e.target.value);
  }

  return (
    <div className="App">
      {program}
      <br/>

      <select onChange={handleProgramChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
       
        {programs.map((program) => <option key={program.id} value={program.program_name}> {program.program_name} </option>)}
      </select>
    </div> 
  );

}






export default App;