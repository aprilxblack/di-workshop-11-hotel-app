const chai = require('chai')
const expect = chai.expect

const Hotel = require('../models/Hotel')
const Review = require('../models/Review');

describe('Hotel', ()=>{
    it('should initialize properly', ()=>{
        {
            var hotel = new Hotel("Hilton Metropole", "London");
    
            expect(hotel.name).to.equal("Hilton Metropole");
            expect(hotel.city).to.equal("London");
            expect(hotel.reviews).to.deep.equal([]);
            expect(hotel.reviewCount()).to.equal(0);
        }
    })
    it('should return properly formatted url', ()=>{
        var hotel = new Hotel("Hilton Metropole", "London");

        expect(hotel.urlSlug()).to.equal("hilton_metropole_london");
    })
    it('should add a review properly', ()=>{
        var hotel = new Hotel("Hilton Metropole", "London");
        var review1 = new Review(5, "Excellent hotel, very clean", "2018-12-17");
        var review2 = new Review(1, "Terrible hotel, smelled of mice", "2018-01-01");

        hotel.addReview(review1);
        hotel.addReview(review2);

        expect(hotel.reviewCount()).to.equal(2);
        expect(hotel.reviews[0].rating).to.equal(5);
        expect(hotel.reviews[1].text).to.equal("Terrible hotel, smelled of mice");
    })
    it('should calculate a correct average rating', ()=>{
        var hotel = new Hotel("Hilton Metropole", "London");
        var review1 = new Review(5, "Excellent hotel, very clean", "2018-12-17");
        var review2 = new Review(1, "Terrible hotel, smelled of mice", "2018-01-01");

        hotel.addReview(review1);
        hotel.addReview(review2);

        expect(hotel.rating()).to.equal(3);
    })
    it('should return a correct average star rating', ()=>{
        var hotel = new Hotel("Hilton Metropole", "London");
        var review1 = new Review(5, "Excellent hotel, very clean", "2018-12-17");
        var review2 = new Review(1, "Terrible hotel, smelled of mice", "2018-01-01");

        hotel.addReview(review1);
        hotel.addReview(review2);

        expect(hotel.ratingAsStars()).to.equal("⭐️⭐️⭐️");
    })
    it('should return correctly formatted JSON string', ()=>{
        var hotel = new Hotel("Hilton Metropole", "London");
        var review1 = new Review(5, "Excellent hotel, very clean", "2018-12-17");
        var review2 = new Review(1, "Terrible hotel, smelled of mice", "2018-01-01");

        hotel.addReview(review1);
        hotel.addReview(review2);

        var object = {
            "name":"Hilton Metropole",
            "city":"London",
            "reviewCount":2,
            "rating":3,
            "ratingAsStars":"⭐️⭐️⭐️",
            "urlSlug":"hilton_metropole_london",
            "reviews":[
              {
                "rating":5,
                "text":"Excellent hotel, very clean",
                "date":"2018-12-17T00:00:00.000Z",
                "ratingAsStars":"⭐️⭐️⭐️⭐️⭐️",
              },{
                "rating":1,
                "text":"Terrible hotel, smelled of mice",
                "date":"2018-01-01T00:00:00.000Z",
                "ratingAsStars":"⭐️",
              }
            ]
          }

        expect(hotel.toJSON()).to.deep.equal(object);
    })
})