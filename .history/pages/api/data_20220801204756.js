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
        var line = 0;
        
          
        if (lines[0] === "" || lines[0] === null) { //invalid program name or null text file
            correct = false;
        } 

        if (lines[1] !== "") {
            correct = false;
        }

        
        for (var i = 2; i < lines.length; i++ ) { //prompts and responses, if parity is even should have text and every odd parity should be whitespace
            if (i % 2 !== 0 && lines[i] !== "") {
                correct = false;
            } 
            else if (i % 2 === 0 && lines[i] === "") {
                correct = false;
            }
        }

        if (correct) {
            try { //insert program
                console.log(lines);
                console.log(lines[line]);
                var query = 'INSERT INTO programs(program_name) VALUES (?)';
                var values = [lines[line]];
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

            while(line < lines.length - 1){
                switch(status) {
                    case 0: //program
                        if (lines[line] != null) {
                            try {
                                console.log(lines);
                                console.log(lines[line]);
                                var query = 'INSERT INTO programs(program_name) VALUES (?)';
                                var values = [lines[line]];
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
                        } else {
                            console.log(error);
                            process.exit(1);
                        }
                        status = 1
                        line ++;
                        break;
                    case 1: //prompt 
                        if (!line == "") {
                            try {
                                query = ""
                            } catch (error) {
                                console.log(error);
                                process.exit(1);
                            }
                        }
    
                }
            } 
        }

    }

    res.status(200).json(apps);


}