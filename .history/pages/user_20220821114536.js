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

  let [tokenizedpromptid, setTokenizedPromptid] = useState("Select a tokenized prompt!");

  let handleProgramidChange = (e) => {
    setProgramid(e.target.value);
  }

  let handlePromptidChange = (e) => {
    setPromptid(e.target.value);
  }

  let handleTokenizedPromptidChange = (e) => {
    setTokenizedPromptid(e.target.value);
  }


  const [prompts, setPrompts] = useState([]);
  const [tokenizedprompts, setTokenizedPrompts] = useState([]);

  function getAllPrompts() {
    getPrompts();
    console.log(prompts);
    getTokenizedPrompts();
    console.log(tokenizedprompts);
  }

  
  async function getPrompts() {
    console.log("calling to get data from api");
    const response = await fetch('/api/getprompts', {
      method: 'POST',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);
    //iterate all the prompts, add normal prompts to setPrompts
    //add tokenized prompts to setTokenizedPrompts  
    setPrompts(response);
  } 
 
  var promptdisplay = prompts.prompts;
  console.log(promptdisplay + "here");

  async function getTokenizedPrompts() {
    console.log("calling to get data from api");
    const response = await fetch('/api/gettokenizedprompts', {
      method: 'POST',
      body: programid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);
    //iterate all the prompts, add normal prompts to setPrompts
    //add tokenized prompts to setTokenizedPrompts  
    setTokenizedPrompts(response);
  } 

  var tokenizedpromptdisplay = tokenizedprompts.prompts;
  console.log(tokenizedpromptdisplay + "here");

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

  const [tokens, setTokens] = useState([]);

  function tokenbutton() {
    getTokens();
    getButton();
  }

  const [submitbutton, setSubmitButton] = useState("");

  
  function getButton() {
    setSubmitButton(["Submit input parameters"]);
  }

  var submitb = submitbutton;

  async function getTokens() { //also get primitive here and set primitive id so we can call to it
    console.log("calling to get tokens from api");
    const response = await fetch('/api/gettokens', {
      method: 'POST',
      body: tokenizedpromptid
    }).then(response => response.json())
    .catch(err => console.log(err))
    console.log(response);

    setTokens(response);
    

  }

  var tokenlist = tokens.tokens;




  async function getTokenizedResponse() {
    console.log("reached here");
    //iterate tokenlist 
    //create map w/ values associated to each token 
    //call to api route and promptid
    var tokenmap = new Map();
    console.log(tokenlist)
    for (const val of tokenlist.values()) {
      //tokenmap.set(val, document.getElementById(val).value);
      console.log(val)
      //console.log(document.getElementById(val).value);
    }
   
    
    var name=document.getElementById('city1');
    var email=document.getElementById('city2');
    console.log(name);
    console.log(email);
    

  }





  


  return (
  
    <div className="Container">
      <a href="http://localhost:3000"><button id = "mybutton"> Go Home </button></a>
      <main>
      <h1 className="title">User Page ↩️</h1>

   

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
              <button className = "button2" onClick = {getAllPrompts}>Once you have selected a program, please press this button to see the available prompts.</button>
            </a> 
        

          
            <a className="card">
              <h3> Prompts </h3>
              <center>
              Prompt ID: {promptid}  
              <br></br>
              <select onChange={handlePromptidChange}>
              <option value = "Select a prompt!"> -- Select a prompt -- </option>
                <br></br>
                {promptdisplay?.map((prompt) => <option key={prompt.prompt_text} value={prompt.prompt_id}> {prompt.prompt_text} </option>)}
              </select>
              </center>
              <br></br>
              <button className = "button2" onClick = {getResponse}>Once you have selected a prompt, please press this button to see the response.</button>
            </a> 

            <a className="card">
              <h3> Tokenized Prompts </h3>
              <center>
              Tokenized Prompt ID: {tokenizedpromptid}  
              <br></br>
              <select onChange={handleTokenizedPromptidChange}>
              <option value = "Select a tokenized prompt!"> -- Select a tokenized prompt -- </option>
                <br></br>
                {tokenizedpromptdisplay?.map((tprompt) => <option key={tprompt.prompt_text} value={tprompt.prompt_id}> {tprompt.prompt_text} </option>)}
              </select>
              </center>
              <br></br>
              <button className = "button2" onClick = {tokenbutton}>Once you have selected a tokenized prompt, please press this.</button>

              <div id="FormContainer">
              <center>
              <form onSubmit={getTokenizedResponse}>
                <div className = "rows">
                {tokenlist?.map((token) => <input type="text" key = {token.token_text} id={token.token_text} name={token.token_text} placeholder={token.token_text}/>)}
                <button className = "button2" type = "submit">Submit input parameters</button>
                </div>
              </form>
  
              </center>
              </div>

              
            </a> 

            <a className="card">
              <h3> Response </h3>
              <p> {ret_response} </p>
            </a> 
         

         
        </div>

      
  

      
      

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

        rows{
          width:100%;
          display:inline-block;
        }
        
        
        .button2{
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
          background-color: #0070f3;
          border-radius: 8px;
        }
          .button2:hover{
          color:#DDDDDD;
          border-color:#DDDDDD;
          }
          .button2:active{
          color:#BBBBBB;
          border-color:#BBBBBB;
          }
          @media all and (max-width:30em){
          .button2{
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

        input{
          width: 100%;
          padding: 10px 16px;
          margin: 6px 0;
          box-sizing: border-box;
          vertical-align:middle;
        }

        input[type=text]:focus {
          border: 2px solid #0070f3;
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
          color: #0070f3;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
          text-align: center; 
          font-weight: bold
        }

        #mybutton {
          position: relative;
          top: 15px;
          right: 0px; 
          left: 15px;
          border-radius: 8px;
          font-size: 16px;
          color: white;

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
          background-color: #555555;

         }

          #mybutton:hover {background-color: #555548}

          #mybutton:active {
            background-color: #555555;
            box-shadow: 0 5px #666;
            transform: translateY(4px);
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