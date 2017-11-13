# Capital-One-AirBnb
http://airbnbchallenge.surge.sh

Capital One Software Engineer Winter Summit Challenge. This challenge provided us with public information on Airbnb listings in San Francisco, California. Our goal was to create a web app which vizualizes the data in a creative and interesting way that can help potential hosts make profit.

## Criteria

[x] Visualize the data: Graph some (any 3) interesting metrics, maps, or trends from the dataset. - HeatMap, House Listings, Graphs

[x] Price estimation: Given the geo-location (latitude and longitude) of a new property, estimate the weekly average income the homeowner can make with Airbnb. - Weekly Income Estimation

[x] Bookings optimization: Given the geo-location (latitude and longitude) of a property, what is the ideal price per night that will yield maximum bookings or revenue? - Optimal Price Estimation

## Bonus

[x] Animate: Add an animation to your visualization. - estimation transitions, button slides, and footer appearing/disapearing

[x] Popularity: Can you identify the neighborhood that averages the most positive reviews? - Popularity graph

[x] Investment: If I have $100 million to invest, where in San Francisco should I buy properties so I can maximize my returns with Airbnb? When will I break even? - 12+ years, CSV file of coordinates. See 3.c for more details

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

	c. $100 million investment - median house is $1,236,700 (https://www.zillow.com/san-francisco-ca/home-values/) and the average guest stays 3.5 days (https://blog.atairbnb.com/economic-impact-airbnb/). This means 80 houses can be purchased with $100 million. Using reviews per month and price per night, determine the 80 most profitable houses and their individual incomes per year. This will give a total estimated income of $8,202,694.08 a year. Coordinates for houses along with their yearly income can be found here: http://airbnbchallenge.surge.sh/data/investment.csv

## Authors

* **Maxwell Newman** - (https://github.com/Maxwhoppa)

## License

This project is licensed under the MIT License

