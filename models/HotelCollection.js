var fs = require('fs');
var Hotel = require('../models/Hotel');

class HotelCollection {
    constructor(){
        this.hotels = [];
    }
    

    addHotel(hotel){
          this.hotels.push(hotel);
    }

    sortedHotels(){
        var sorted = [];

        sorted = this.hotels.sort(function(obj1, obj2){
            return obj2.rating() - obj1.rating()
        });

        return sorted;
    }

    save(path){
        var jsonString = JSON.stringify(this.hotels, null, 2);
        fs.writeFileSync(path, jsonString, 'utf-8');
        
    }

    load(path){
        var loadedHotels = fs.readFileSync(path, 'utf-8');
        loadedHotels = JSON.parse(loadedHotels);
        var savedEntries = [];

        for (var entry of loadedHotels){
            var hotel = new Hotel(entry.name, entry.city);
            hotel.reviews = entry.reviews;
            savedEntries.push(hotel);
        }

        return savedEntries;

    }
}

module.exports = HotelCollection;