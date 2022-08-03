import mysql2 from "mysql2/promise";
import {apps} from '../../data/apps';
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
        
        
          
        if (lines[0] === "" || lines[0] === null) { //invalid program name or null text file
            console.log("error detected here");
            console.log(lines[0]);
            console.log("^ that was the culprit.");
            correct = false;
        } 

        if (lines[1] !== "") {
            console.log("error detected here");
            console.log(lines[1]);
            console.log("^ that was the culprit.");
            correct = false;
        }

        
        for (var i = 2; i < lines.length; i++ ) { //prompts and responses, if parity is even should have text and every odd parity should be whitespace
            if (i % 2 !== 0 && lines[i] !== "") {
                correct = false;
                console.log("error detected here");
                console.log(lines[i]);
                console.log("^ that was the culprit.");
            } 
            else if (i % 2 === 0 && lines[i] === "") {
                correct = false;
                console.log("error detected here");
                console.log(lines[i]);
                console.log("^ that was the culprit.");
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

                query = 'SELECT LAST_INSERT_ID()';
                values = [];
                [results] = await dbconnection.execute(query, values);
                currentprogramid = results.insertId;
                console.log(currentprogramid);
                console.log("id obtained");
            } catch (error) {
                console.log(error);
                process.exit(1);
            }

            var line = 2;
            var counter = true;
            while(line <= lines.length - 1){
                if (counter) { // prompt
                    try { 
                        query = 'INSERT INTO prompts(prompt_text, program_id) VALUES (?, ?)';
                        values = [lines[line], currentprogramid];
                        [results] = await dbconnection.execute(query, values);
                        currentpromptid = results.insertId;
                        console.log(lines[line]);
                        console.log("prompt text inserted");
                        console.log(currentpromptid);
                        console.log("prompt id obtained");
                        counter = false;
                        line++;
                    } catch (error) {
                        console.log(error);
                        process.exit(1);
                    }
                } else { // response
                    if (lines[line].charAt(0) !== "[") { //single response
                        try {
                            query = 'INSERT INTO responses(response_text, prompt_id) VALUES (?, ?)';
                            values = [lines[line], currentpromptid];
                            console.log("single response inserted");
                        } catch (error) {
                            console.log(error);
                            process.exit(1);
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
                                console.log("one response inserted");
                        }
                        console.log("mutiple responses inserted");
                        } catch (error) {
                            console.log(error);
                            process.exit(1);
                        }
                        
                    }
                    counter = true;
                    line++;
                }
                    
            } 
        } else {
            console.log("incorrect text file!");
        }

    }

    res.status(200).json(apps);


}