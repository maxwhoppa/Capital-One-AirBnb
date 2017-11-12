# Capital-One-AirBnb
http://airbnbchallenge.surge.sh

Capital One Software Engineer Winter Summit Challenge. This challenge provided us with public information on Airbnb listings in San Francisco, California. Our goal was to create a web app which vizualizes the data in a creative and interesting way that can help potential hosts make profit.

## Criteria

[x] Visualize the data: Graph some (any 3) interesting metrics, maps, or trends from the dataset.

[x] Price estimation: Given the geo-location (latitude and longitude) of a new property, estimate the weekly average income the homeowner can make with Airbnb.

[x] Bookings optimization: Given the geo-location (latitude and longitude) of a property, what is the ideal price per night that will yield maximum bookings or revenue?

## Bonus

[x] Animate: Add an animation to your visualization.

[x] Popularity: Can you identify the neighborhood that averages the most positive reviews?

[] Investment: If I have $100 million to invest, where in San Francisco should I buy properties so I can maximize my returns with Airbnb? When will I break even?

### Build

1. Map

	a. Responsive Heatmap giving avergae price per night based on neighborhood

	b. Listings of all houses in San Francisco with corresponding information and links to the pages themselves.

2. Graphs

	a. Popularity graph showing the average review score based on neighborhood

	b. Average Price to Average Number of Reviews per month - shows the most profitable neighborhoods on average since reviews/month can be used as a measurement for frequency of tenants.

3. Estimations

	a. Determining the Weekly Income of a house given coordinates in San Francisco. - determined from averaging the 5 closest houses in proximity.

	b. Determining the Optimal Price of a house given coordinates in San Francisco - Using reviews per month as means to determine tenant frequency, determines the most profitable houses in proximity and provides a competing price 

## Authors

* **Maxwell Newman** - (https://github.com/Maxwhoppa)

## License

This project is licensed under the MIT License

