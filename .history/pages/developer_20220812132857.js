import React, { useState, useRef, useEffect } from "react";
import Router from 'next/router';
import Link from "react-router-dom";
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";



function Upload({ children }) {
    const [fileContent, setFileContent] = useState("");
    let fileRef = useRef();
    const [responseData, setResponseData] = useState([]);

    let lines = null;

    const readFile = event => {
        const reader = new FileReader();
        const { files } = event.target;

        var file = files[0];

        

        reader.onload = function(progressEvent){ 
            setFileContent(this.result);
            lines = this.result.split(/\r\n|\n/);
            for(var line = 0; line < lines.length-1; line++){
              console.log(line + " --> "+ lines[line]);
            }
          };
          if(file) {
            reader.readAsText(file);
          }
          
    };

    const parseFile = async() => {
        
        const response = await fetch('/api/data', {
          method: 'POST',
          body: fileContent,
        }).then(response => response.json())
        .then(setResponseData(response))
        .catch(err => {
          console.log(err);
        })
          
    
        
        
        if (response.success) {
          window.location.assign("http://localhost:3000/success");
        } else {
          //display error message
          console.log(response);
          console.log(response.line);
          console.log("error44^");
          console.log(response.msg);
          console.log("line # ^");
          


        }

        
       
        
    }

    return (
      
      <div className="Container">
        <a href="http://localhost:3000"><button id = "mybutton"> Go Home </button></a>
        <main>
        <h1 className = "title">Developer Page 🏗️</h1>
            
  
            <div className="grid">
              <a className="card">
              <h3> Upload your .txt file below to create your app! </h3>
              <br></br>
              <center>
              <input ref={fileRef} type="file" onChange={readFile} accept=".txt"/>
              <Link to={{
                pathname: "/failure",
                state:responseData
              }}><button onClick={parseFile}>Upload</button></Link>
              </center>
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
  
  export default Upload;