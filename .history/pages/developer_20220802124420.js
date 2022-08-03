import React, { useState, useRef, useEffect } from "react";
import Router from 'next/router';
import { RESPONSE_LIMIT_DEFAULT } from "next/dist/server/api-utils";
import { withCoalescedInvoke } from "next/dist/lib/coalesced-function";



function Upload({ children }) {
    const [fileContent, setFileContent] = useState("");
    let fileRef = useRef();

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

    const fetcher = async () => {
      const response = await fetch('/api/data', {
        method: 'POST',
        body: fileContent,
      }) 
      const data = await response.json()
      return data
    }

    const parseFile = async() => {
        
        const response = await fetch('/api/data', {
          method: 'POST',
          body: fileContent,
        }).then(response => response.json())
        console.log(response.success);

        
       
        //window.location.assign("http://localhost:3000/success");

        //window.location.assign("http://localhost:3000/failure");
    }

return (
    <>
    <h1>Developer</h1>
    <br></br>
    <input ref={fileRef} type="file" onChange={readFile} accept=".txt"/>
    <button onClick={parseFile}>Upload</button>
      
    </>
    );
}

export default Upload;