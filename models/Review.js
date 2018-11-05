class Review {
    constructor(rating, text, date){
        this.rating = rating;
        this.text = text;
        this.date = new Date(date);
    }

    ratingAsStars(){
        var stars = [];

        for(var i = 0; i < this.rating; i++){
            stars.push("⭐️");
        }

        stars = stars.join('');

        return stars;
    }

    toJSON(){
        var object = {
            rating: this.rating,
            text: this.text,
            date: this.date.toISOString(),
            ratingAsStars: this.ratingAsStars(),
        }
        return object;
    }
}

module.exports = Review;