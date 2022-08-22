import mysql2 from "mysql2/promise";
import Connection from "mysql2/typings/mysql/lib/Connection";
export default async function handler(req, res){

    const dbconnection = await mysql2.createConnection({
        host: "localhost",
        database: "javabase",
        port:"3306",
        user:"java",
        password:"javapassword"
    });


    if (req.method == "POST") {
        try {
            const query = "SELECT token_text FROM tokens WHERE prompt_id = ?";
            const values = [req.body];
            console.log(values);
            const [data] = await dbconnection.execute(query, values);
            dbconnection.end()
            return res.status(200).json({tokens: data});
        } catch (error) {
            dbconnection.end()
            console.log("error, not queried");
            return res.status(500).json({prompts: ""});
        }
    }

   

    


}