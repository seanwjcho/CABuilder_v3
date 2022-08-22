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
            console.log("error detected here #1");
            console.log(lines[0]);
            console.log("^ that was the culprit.");
            correct = false;
            errorline = 0;
            errormessage = "Invalid Program Name!";
        } 

        if (lines[1] !== "") {
            console.log("error detected here #2");
            console.log(lines[1]);
            console.log("^ that was the culprit.");
            correct = false;
            errorline = 1;
            errormessage = "No Whitespace After Program Name!";
        }

        
        for (var i = 2; i < lines.length; i++ ) { //prompts and responses, if parity is even should have text and every odd parity should be whitespace
            if (i % 2 !== 0 && lines[i] !== "") {
                correct = false;
                console.log("error detected here #3");
                console.log(lines[i]);
                console.log("^ that was the culprit.");
                errorline = i;
                errormessage = "There Is A Text Line, There Should Be A Whitespace!";
            } 
            else if (i % 2 === 0 && lines[i] === "") {
                correct = false;
                console.log("error detected here #4");
                console.log(i);
                console.log(lines[i]);
                console.log("^ that was the culprit.");
                errorline = i;
                errormessage = "There Is A Whitespace, There Should Be A Text Line!";
            }
        }

        if (correct) {
            try { //insert program
                console.log(lines);
                console.log(lines[0]);
                var query = 'INSERT INTO programs(program_name) VALUES (?)';
                var values = [lines[0]];
                var [results] = await dbconnection.execute(query, values);
                console.log("inserted");

                //query = 'SELECT LAST_INSERT_ID()';
                //values = [];
                //[results] = await dbconnection.execute(query, values);
                currentprogramid = results.insertId;
                console.log(currentprogramid);
                console.log("id obtained");
            } catch (error) {
                console.log(error);
                return res.status(500).json({msg:error, line:0});
                process.exit(1);
            }

            var line = 2;
            var counter = true;
            while(line <= lines.length - 1){
                if (counter) { // prompt
                    try { 
                        query = 'INSERT INTO prompts(prompt_text, program_id) VALUES (?, ?)';
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
                } else { // response
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

