import React, { useState, useRef } from "react";
import mysql2 from "mysql2/promise";

function Upload({ children }) {
    const [fileContent, setFileContent] = useState("");
    let fileRef = useRef();

    let lines = null;

    const readFile = event => {
        const reader = new FileReader();
        const { files } = event.target;

        var file = files[0];

        

        reader.onload = function(progressEvent){    
            lines = this.result.split(/\r\n|\n/);
            for(var line = 0; line < lines.length-1; line++){
              console.log(line + " --> "+ lines[line]);
            }
          };
          if(file) {
            reader.readAsText(file);
          }
          
    };

    async function parseFile (req, res) {
        var line = 0;
        var status = 0; //prompt = 1, response = 2, program = 0
        var currentprogramid = 0;
        var currentpromptid = 0;
        try {
            while(line < lines.length - 1){
                switch(status) {
                    case 0: //program
                        if (lines[line] != null) {
                            const result = await executeQuery({
                                query: 'INSERT INTO programs(program_name) VALUES(?)',
                                values: [lines[line]]
                            });
                            console.log("inserted");

                            result = await executeQuery({
                                query: 'SELECT LAST_INSERT_ID'
                            }); 

                            currentprogramid = result.insertID;

                        } else {
                            console.log(error)
                            process.exit(1);
                        }
                        status = 1
                        break;
                   
    
    
    
    
    
    
                }
            }   

        } catch (error) {
            console.log(error);
        }
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