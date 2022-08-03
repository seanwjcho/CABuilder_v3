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
         const 
    }

    res.status(200).json(apps);


}