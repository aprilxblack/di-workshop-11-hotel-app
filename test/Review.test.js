const chai = require('chai')
const expect = chai.expect

const Review = require('../models/Review');

describe('Review', ()=>{
    it('should initialize properly', ()=>{
        {
            var review = new Review(5, "Excellent hotel, very clean", "2018-12-17");
    
            expect(review.rating).to.equal(5);
            expect(review.text).to.equal("Excellent hotel, very clean");
            expect(review.date.toLocaleDateString()).to.equal("2018-12-17");
        }
    })
    it('should return a correct number of stars', ()=>{
        var review = new Review(5, "Excellent hotel, very clean", "2018-12-17");

        expect(review.ratingAsStars()).to.equal("⭐️⭐️⭐️⭐️⭐️");

    })
})