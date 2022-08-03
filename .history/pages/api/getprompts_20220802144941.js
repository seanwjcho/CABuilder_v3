import mysql2 from "mysql2/promise";
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
            const query = "SELECT * FROM prompts WHERE program_id = ?";
            const values = [req.body];
            const [data] = await dbconnection.execute(query, values);
            console.log(data);
            console.log("queried!");
        
            return res.status(200).json({prompts: data});
        } catch (error) {
            console.log("error, not queried");
            return res.status(500).json({prompts: ""});
        }
    }

   

    


}