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

  console.log(programdata);

  var programs = programdata.id;


  let [programid, setProgramid] = useState("Select an app!");

  let [promptid, setPromptid] = useState("Select a prompt!");
  //our programid state variable is associated with the programid that the user picked

  let handleProgramidChange = (e) => {
    setProgramid(e.target.value);
  }

  let handlePromptidChange = (e) => {
    setPromptid(e.target.value);
  }


  const [prompts, setPrompts] = useState([]);

  
  async function getPrompts() {
    console.log("calling to get data from api");
    const response = await fetch('/api/getprompts', {
      method: 'POST',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);
    setPrompts(response);
  } 
 
  var promptdisplay = prompts.id;
  console.log(promptdisplay);


  

  




  return (
   
    <center>
    <h1>USER PAGE</h1>
    <div className="App" text-align="center">
      Program ID: {programid}  
      <br/> 
      <br/>

      
      <select onChange={handleProgramidChange}>
        <option value = "Select an app!"> -- Select an app -- </option>
        {programs?.map((programid) => <option key={programid.program_name} value={programid.program_id}> {programid.program_name} </option>)}
      </select>

      <br> 
      </br>
      <br>
      </br>

      <button>Once you have selected a program, please press this button to see the available prompts.</button>

      <br>
      </br>
      <br>
      </br>

      <div>
        <select onChange={handlePromptidChange}>
        <option value = "Select a prompt!"> -- Select a prompt -- </option>
        {promptdisplay?.map((prompt) => <option key={prompt.prompt_text} value={prompt.prompt_id}> {prompt.prompt_text} </option>)}
      </select>
      </div>
      


      

      
    </div> 
    </center>
  );

}






export default App;