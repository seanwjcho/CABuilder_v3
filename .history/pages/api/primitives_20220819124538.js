import { calculateObjectSize } from "bson";

export default async function handler(req, res) {

    if (req.body == 1) { //calcDistance
        class Coordinate {
            constructor(latitude, longitude) {
                this.latitude = latitude;
                this.longitude = longitude;
            }

            get latitude(){
                return this.latitude;
            }

            get longitude(){
                return this.longitude;
            }
        }
    }

    else if (req.body == 2) { //random
 
    }

    else if (req.body == 3) { //test 

    }




}