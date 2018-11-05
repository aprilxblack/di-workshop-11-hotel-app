const chai = require('chai')
const expect = chai.expect

const Hotel = require('../models/Hotel');
const Review = require('../models/Review');
const HotelCollection = require('../models/HotelCollection');
var fs = require('fs');

describe('HotelCollection', ()=>{
    it('should initialize properly', ()=>{
        var c = new HotelCollection();

        expect(c.hotels).to.deep.equal([]);
    })
    it('should add hotels properly', ()=>{
        var c = new HotelCollection();

        var hotel1 = new Hotel("Hilton Metropole", "London")
        var hotel2 = new Hotel("Crown Plaza", "Leeds")

        c.addHotel(hotel1);
        c.addHotel(hotel2);

        expect(c.hotels.length).to.equal(2);
        expect(c.hotels[0].name).to.equal("Hilton Metropole");
        expect(c.hotels[1].city).to.equal("Leeds");
    })
    it('should sort properly', ()=>{
        var c = new HotelCollection();

        var hotel1 = new Hotel("Hilton Metropole", "London")
        var hotel2 = new Hotel("Crown Plaza", "Leeds")
        var hotel3 = new Hotel("Bad Hotel", "Luton")

        var review1 = new Review(5, "cool hotel", "2018-10-10");
        var review2 = new Review(1, "this hotel is garbage", "2018-10-10");
        var review3 = new Review(2, "i dont like this hotel", "2018-10-10");

        hotel1.addReview(review2);
        hotel2.addReview(review1);
        hotel3.addReview(review3);

        c.addHotel(hotel1);
        c.addHotel(hotel2);
        c.addHotel(hotel3);

        var sorted = c.sortedHotels();
        expect(sorted[0].name).to.equal("Crown Plaza");
    })
    it('should not allow to overwrite an array', ()=>{
        var c = new HotelCollection();

        var hotel1 = new Hotel("Hilton Metropole", "London")
        var hotel2 = new Hotel("Crown Plaza", "Leeds")

        c.addHotel(hotel1);
        c.addHotel(hotel2);

        function something(){
            c.hotels = ['some', 'nonsense'];
        }
        console.log(c.hotels);

        expect(something).to.throw('no');
    })

    it('should save properly', ()=>{
        var c = new HotelCollection();

        var hotel1 = new Hotel("Hilton Metropole", "London")
        var hotel2 = new Hotel("Crown Plaza", "Leeds")

        c.addHotel(hotel1);
        c.addHotel(hotel2);

        c.save('models/saved.json');

        var fileContents = fs.readFileSync('models/saved.json', 'utf-8');

        var loadedCollection = JSON.parse(fileContents);

        expect(loadedCollection.length).to.equal(2);
        expect(loadedCollection[0].name).to.equal("Hilton Metropole");
        expect(loadedCollection[1].city).to.equal("Leeds");
    })

    it('should load properly', ()=>{
        var c = new HotelCollection();

        var hotel1 = new Hotel("Hilton Metropole", "London")
        var hotel2 = new Hotel("Crown Plaza", "Leeds")

        c.addHotel(hotel1);
        c.addHotel(hotel2);

        c.save('models/saved.json');
        var loadedCollection = c.load('models/saved.json');

        expect(loadedCollection.length).to.equal(2);
        expect(loadedCollection[0].name).to.equal("Hilton Metropole");
        expect(loadedCollection[1].city).to.equal("Leeds");
    })
})