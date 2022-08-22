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
 
  var promptdisplay = prompts.prompts;
  console.log(promptdisplay + "here");

  const [ret_response, setResponse] = useState("");

  async function getResponse() {
    console.log("calling to get data from api");
    const response = await fetch('/api/getresponse', {
      method: 'POST',
      body: promptid
    }).then(response => response.json())
    .catch(err => console.log(err))

    var randomnumber = Math.floor(Math.random() * response.response.length);
   
    console.log(response.response[randomnumber].response_text);
    setResponse(response.response[randomnumber].response_text)
  } 
  console.log("ret");
  console.log(ret_response);


  

  




  return (
  
    <div className="Container">
      <main>
      <h1 className="title">User Page</h1>

   

      <div className="grid">
          
            <a className="card">
              <h3> Apps </h3>
              <center>
              Program ID: {programid}  
              <br></br>
              <select onChange={handleProgramidChange}>
                <option value = "Select an app!"> -- Select an app -- </option>
                <br></br>
                {programs?.map((programid) => <option key={programid.program_name} value={programid.program_id}> {programid.program_name} </option>)}
              </select>
              </center>
              <br></br>
              <button className = "button2" onClick = {getPrompts}>Once you have selected a program, please press this button to see the available prompts.</button>
            </a> 
        

          
            <a className="card">
              <h3>User </h3>
              <p>Interact with any of the submitted conversation apps.</p>
            </a>
         

         
        </div>

      
      

      <br> 
      </br>
      <br>
      </br>

    

      <br>
      </br>
      <br>
      </br>
      <br>
      </br>

      Prompt ID: {promptid}  
      <br></br>
      <br></br>
      <div>
        <select onChange={handlePromptidChange}>
        <option value = "Select a prompt!"> -- Select a prompt -- </option>
        {promptdisplay?.map((prompt) => <option key={prompt.prompt_text} value={prompt.prompt_id}> {prompt.prompt_text} </option>)}
      </select>
      </div>

      <br>
      </br>
      <br>
      </br>
      <button onClick = {getResponse}>Once you have selected a prompt, please press this button to see the response.</button>

      <h4> {ret_response} </h4>

      
      

      </main>
      

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }
        
        button2{
           display:inline-block;
           padding:0.5em 3em;
           border:0.16em solid #FFFFFF;
           margin:0 0.3em 0.3em 0;
           box-sizing: border-box;
           text-decoration:none;
           font-family:'Roboto',sans-serif;
           font-weight:400;
           color:#FFFFFF;
           text-align:center;
           transition: all 0.15s;
          }
          button2:hover{
           color:#DDDDDD;
           border-color:#DDDDDD;
          }
          button2:active{
           color:#BBBBBB;
           border-color:#BBBBBB;
          }
          @media all and (max-width:30em){
           button2{
            display:block;
            margin:0.4em auto;
           }
          }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          flex-direction: column;
          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
          text-align: center;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div> 
    
  );

}






export default App;