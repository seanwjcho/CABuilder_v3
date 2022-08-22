import mysql2 from "mysql2/promise";
export default async function handler(req, res){

    const dbconnection = await mysql2.createConnection({
        host: "localhost",
        database: "javabase",
        port:"3306",
        user:"java",
        password:"javapassword"
    });


    if (req.method == "GET") {

    }

    if (req.method == "POST") {
        console.log(req.body);
        var lines = req.body.split(/\r\n|\n/);

        var correct = true;

        var status = 0; //prompt = 1, response = 2, program = 0
        var currentprogramid = 0;
        var currentpromptid = 0;

        var errorline = 0;
        var errormessage = "";
        
        
          
        if (lines[0] === "" || lines[0] === null) { //invalid program name or null text file
            correct = false;
            errorline = 1;
            errormessage = "Invalid program name!";
            return res.status(500).json({success:0, line:errorline, msg:errormessage });
        } 

        if (lines[1] !== "") {
            correct = false;
            errorline = 2;
            errormessage = "No whitespace after program name!";
            return res.status(500).json({success:0, line:errorline, msg:errormessage });
        }

        
        for (var i = 2; i < lines.length; i++ ) { //prompts and responses, if parity is even should have text and every odd parity should be whitespace
            if (i % 2 !== 0 && lines[i] !== "") {
                correct = false;
                errorline = i + 1;
                errormessage = "There is a text line, there should be a whitespace!";
                return res.status(500).json({success:0, line:errorline, msg:errormessage });
            } 
            else if (i % 2 === 0 && lines[i] === "") {
                correct = false;
                errorline = i + 1;
                errormessage = "There is a whitespace, there should be a text line!";
                return res.status(500).json({success:0, line:errorline, msg:errormessage });
            }
        }

        if (correct) {
            try { //insert program
                var query = 'INSERT INTO programs(program_name) VALUES (?)';
                var values = [lines[0]];
                var [results] = await dbconnection.execute(query, values);

                //query = 'SELECT LAST_INSERT_ID()';
                //values = [];
                //[results] = await dbconnection.execute(query, values);
                currentprogramid = results.insertId;
            } catch (error) {
                console.log(error);
                return res.status(500).json({msg:error, line:0});
                process.exit(1);
            }

            var line = 2;
            var counter = true;
            var tokn = false;
            while(line <= lines.length - 1){
                if (counter) { // prompt
                    if (lines[line].charAt(0) == "_") { //tokenized prompt
                        try {
                            lines[line] = lines[line].substring(1, lines[line].length);
                            query = 'INSERT INTO prompts(prompt_text, program_id, tokenized) VALUES (?, ?, TRUE)';
                            values = [lines[line], currentprogramid];
                            console.log("prompt" + lines[line]);
                            [results] = await dbconnection.execute(query, values);
                            currentpromptid = results.insertId;
                            //console.log(lines[line]);
                            console.log("tokenized prompt text inserted");
                            console.log(currentpromptid);
                            console.log("tokenized prompt id obtained");
                            //now insert tokens into prompt
                            
                            let tokenizedprompt = lines[line]
                            const words = tokenized.matchAll(/\$.*?\$/g);
                            for (const m of words) {
                                const token = m[0].slice(1, -1);
                                query = 'INSERT INTO tokens(token, prompt_id) VALUES (?, ?)';
                                values = [token, currentpromptid];
                                console.log("inserted token" + token);
                                [results] = await dbconnection.execute(query, values);
                                console.log("one token inserted");
                            }
                            tokn = true;
                            counter = false;
                            line++;
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({msg:error, linenumber:line});
                        }
                    } 
                    else {
                        try { 
                            query = 'INSERT INTO prompts(prompt_text, program_id, tokenized) VALUES (?, ?, NULL)';
                            values = [lines[line], currentprogramid];
                            console.log("prompt" + lines[line]);
                            [results] = await dbconnection.execute(query, values);
                            currentpromptid = results.insertId;
                            //console.log(lines[line]);
                            console.log("prompt text inserted");
                            console.log(currentpromptid);
                            console.log("prompt id obtained");
                            counter = false;
                            line++;
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({msg:error, linenumber:line});
                        }
                    }
                    
                } else { // response
                    if (tokn) { //tokenized response
                        //what to do with the tokenized response?
                        //how to know which primitive to call to from user page
                        //link prompt to primitive id 
                        try {

                        }
                        try { 
                            query = 'INSERT INTO prompts(prompt_text, program_id, tokenized) VALUES (?, ?, NULL)';
                            values = [lines[line], currentprogramid];
                            console.log("prompt" + lines[line]);
                            [results] = await dbconnection.execute(query, values);
                            currentpromptid = results.insertId;
                            //console.log(lines[line]);
                            console.log("prompt text inserted");
                            console.log(currentpromptid);
                            console.log("prompt id obtained");
                            counter = false;
                            line++;
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({msg:error, linenumber:line});
                        }




                    } 
                    if (lines[line].charAt(0) !== "[") { //single response
                        try {
                            query = 'INSERT INTO responses(response_text, prompt_id) VALUES (?, ?)';
                            values = [lines[line], currentpromptid];
                            console.log("response" + lines[line]);
                            [results] = await dbconnection.execute(query, values);
                            console.log("single response inserted");
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({msg:error, linenumber:line});
                        }
                    } else { // multiple responses
                        try {
                            let response = lines[line];
                            response = response.substring(1, response.length-1);
                            var resArray = response.split(", ");
                            for (var j = 0; j<resArray.length; j++) {
                                var responseText = resArray[j];
                                query = 'INSERT INTO responses(response_text, prompt_id) VALUES (?, ?)';
                                values = [responseText, currentpromptid];
                                console.log("split response " + responseText);
                                [results] = await dbconnection.execute(query, values);
                                console.log("one response inserted");
                        }
                        console.log("mutiple responses inserted");
                        } catch (error) {
                            console.log(error);
                            return res.status(500).json({msg:error, linenumber:line});
                        }
                    }
                    counter = true;
                    line++;
                }
                line++;  
            } 
        dbconnection.end();
        return res.status(200).json({success:1});

        } else {
            dbconnection.end();
            return res.status(500).json({success:0, line:errorline, msg:errormessage });
        }

    }


}

