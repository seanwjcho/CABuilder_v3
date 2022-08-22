import { calculateObjectSize } from "bson";

export default async function handler(req, res) {

    if (req.body == 1) { //calcDistance
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
    }

    else if (req.body == 2) { //random
 
    }

    else if (req.body == 3) { //test 

    }




}