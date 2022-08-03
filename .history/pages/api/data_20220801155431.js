import mysql2 from "mysql2/promise";
export default async function handler(req, res){

    const dbconnection = await mysql.createConnection({
        host: "localhost",
        database: "javabase",
        port:"3306",
        user:"java",
        password:"javapassword"
    });


    res.status(200).json({name: "John Doe"});


}