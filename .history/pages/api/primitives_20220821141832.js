import { calculateObjectSize } from "bson";
import mysql2 from "mysql2/promise";
export default async function handler(req, res) {
    //check which primitive is linked to this prompt_id
    //can get response linked to this prompt_id

    const dbconnection = await mysql2.createConnection({
        host: "localhost",
        database: "javabase",
        port:"3306",
        user:"java",
        password:"javapassword"
    });


    var map = new Map(JSON.parse([req.body]));
    let promptid = map.get("id");
    console.log(promptid);
    try {
        var query = "SELECT response_text FROM responses WHERE prompt_id = ?";
        var [data] = await dbconnection.execute(query, [promptid]);
        console.log("get tokenized response");
        console.log(data.response_text);

        //get primitive id
        query = "SELECT primitive FROM prompts WHERE prompt_id = ?";
        let [primitive] = await dbconnection.execute(query, [promptid]);
        console.log("got primitive id");
        console.log(primitive);

        map.delete("id")



        for (let [key, value] of map) {
            if(key == "id"){
                continue;
            }
            else {

            }
        }
      
      
    } catch (error) {
        console.log("error, not queried");
        console.log(error);
      
 
    }

    if (req.body == 1) { //calcDistance

        populateData();
        getDistance(city1, city2);



        class Coordinate {
            constructor(latitude, longitude) {
                this.latitude = latitude;
                this.longitude = longitude;
            }

            get latitude() {
                return this.latitude;
            }

            get longitude() {
                return this.longitude;
            }

        }

        const coordinateMap = new Map();
        const cities = new Array();

        void function populateData() {

            cities.push("New York");
            cities.push("Los Angeles");
            cities.push("Chicago");
            cities.push("Houston");
            cities.push("San Francisco");
            cities.push("Phoenix");
            cities.push("Philadelphia");
            cities.push("Dallas");


            coordinateMap.set("Los Angeles", new Coordinate(34.0522, 118.2437));
            coordinateMap.set("New York", new Coordinate(40.7128, 74.0060));
            coordinateMap.set("Chicago", new Coordinate(44.8781, 87.6298));
            coordinateMap.set("Houston", new Coordinate(29.7604, 95.3698));
            coordinateMap.set("San Francisco", new Coordinate(37.7749, 122.4194));
            coordinateMap.set("Phoenix", new Coordinate(33.4484, 112.0740));
            coordinateMap.set("Philadelphia", new Coordinate(39.9526, 75.1652));
            coordinateMap.set("Dallas", new Coordinate(32.7767, 96.7970));
        }

        function getDistance(city1, city2) { //ideally should automatically be called to as a result of the file contents  
            c1 = coordinateMap.get(city1);
            latitude1 = c1.latitude;
            longitude1 = c1.longitude;
            
            c2 = coordinateMap.get(city2);
            latitude2 = c2.latitude;
            longitude2 = c2.longitude();
            
            dist = calculateDistance(latitude1, longitude1, latitude2, longitude2);
            console.log(("The distance between " + city1 + " and " + city2 +" is " + (dist) + " miles." )); 
            
        }

        function calculateDistance(lat1, long1, lat2, long2) {
       
            lat1 = degrees_to_radians(lat1);
            long1 = degrees_to_radians(long1);
            
            lat2 = degrees_to_radians(lat2);
            long2 = degrees_to_radians(long2);
            
            //apply Haversine formula 
            
            dlon = long2 - long1;
            dlat = lat2 - lat1;
            a = Math.pow(Math.sin(dlat / 2), 2)
                     + Math.cos(lat1) * Math.cos(lat2)
                     * Math.pow(Math.sin(dlon / 2),2); 
            c = 2 * Math.asin(Math.sqrt(a));
            
            r = 3956;
            
            return c * r;
        }

        function degrees_to_radians(degrees){
            var pi = Math.PI;
            return degrees * (pi/180);
        }


    }

    else if (req.body == 2) { //random
 
    }

    else if (req.body == 3) { //test 

    }




}