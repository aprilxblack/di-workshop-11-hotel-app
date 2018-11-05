class Hotel{
    constructor(name, city){
        this.name = name;
        this.city = city;
        this.reviews = [];
    }

    urlSlug(){
        var name = this.name.toLowerCase();
        var nameElements = name.split(' ');
        nameElements = nameElements.join('_');

        var city = this.city.toLowerCase();
        var cityElements = city.split(' ');
        cityElements = cityElements.join(' ');

        return nameElements + '_' + cityElements;
    
    }

    reviewCount(){
        return this.reviews.length;
    }

    rating(){
        var average = 0;

        for (var review of this.reviews){
            average += review.rating;
        }

        average = average / this.reviews.length;

        return average;
    }

    ratingAsStars(){
        var average = this.rating();
        var stars = [];

        for(var i = 0; i < average; i++){
            stars.push("⭐️");
        }

        stars = stars.join('');
        return stars;
    }

    addReview(review){
        this.reviews.push(review);
    }

    toJSON(){
        var object = {
            "name":this.name,
            "city":this.city,
            "reviewCount":this.reviewCount(),
            "rating":this.rating(),
            "ratingAsStars":this.ratingAsStars(),
            "urlSlug":this.urlSlug(),
            "reviews":[]
          }

        for(var i = 0; i < this.reviews.length; i++){
            var reviewObject = {
                "rating": this.reviews[i].rating,
                "text": this.reviews[i].text,
                "date": this.reviews[i].date.toISOString(),
                "ratingAsStars": this.reviews[i].ratingAsStars(),
            }

            object.reviews.push(reviewObject);
        }

        object = JSON.stringify(object, null, 2);

        return object;
    }
}

module.exports = Hotel;