import React, {useState, useEffect} from 'react';


function App() {
  const [programdata, setprogramdata] = useState([]);
  //fetch from api 
  //populate programs with data from fetch


  useEffect(() => {
    async function getProgramids() {
      console.log("calling to get data from api");
      const response = await fetch('/api/getprogramid', {
        method: 'POST',
        body: programid
      }).then(response => response.json())
      .catch(err => console.log(err))
      console.log(response);

      setprogramdata(response);
      console.log("got programdata");
    }
    getProgramids();
  }, [] );

  var programs = [];

  programdata.forEach((item) => {
    console.log(item.program_id);
    console.log(item.program_name)
  });

  console.log(programs);
  console.log("printing programs");




  let [programid, setProgramid] = useState("Select an app!");
  //our programid state variable is associated with the programid that the user picked

  let handleProgramidChange = (e) => {
    setProgramid(e.target.value);
  }

  

  const getPrompts = async() => {
    console.log("calling to get data from api");
    const response = await fetch('/api/userinteract', {
      method: 'POST',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);
    console.log("got data from api");
    
  }

  return (
   

    <div className="App" text-align="center">
      {programid}  
      <br/> 
      <br/>

      
      <select onChange={handleProgramidChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
        {programs.map((programid) => <option key={programid.program_name} value={programid.program_id}> {programid.program_name} </option>)}
      </select>

      <br> 
      </br>
      <br>
      </br>
      <button onClick={getPrompts}>Once you have selected a program, please press this button to see the available prompts.</button>

      <br>
      </br>
      <br>
      </br>

      

      
    </div> 
   
  );

}






export default App;