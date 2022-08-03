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
            const query = "SELECT * FROM programs";
            const values = [];
            const [data] = await dbconnection.execute(query, values);
            console.log(data);
            console.log("queried programids!");
        
            return res.status(200).json({id: data});
        } catch (error) {
            console.log("error, not queried");
            return res.status(500).json({id: ""});
        }
    }

   

    


}