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

        var status = 0; //prompt = 1, response = 2, program = 0
        var currentprogramid = 0;
        var currentpromptid = 0;
        var line = 0;
        
        }   
        //while(line < lines.length - 1){
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
                            currentpromptid = results.insertId;
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
                    break;

            }
    //}

    res.status(200).json(apps);


}