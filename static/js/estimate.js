// --------------------------------- WEEKLY INCOME ESTIMATES -----------------------------------

//Fail fucntion to set error if input is out of bounds of SF, or invalid
function weeklyIsFail(flag){
    if (flag){
        document.getElementById("weeklyResponse").innerHTML = "Please Enter A Valid Input"
        document.getElementById("weeklyEstimateLat").style.borderColor = "red";
        document.getElementById("weeklyEstimateLong").style.borderColor = "red";   
    }else{
        document.getElementById("weeklyResponse").innerHTML = "Make Sure These Coordinates Are In San Francisco!"
        document.getElementById("weeklyEstimateLat").style.borderColor = "red";
        document.getElementById("weeklyEstimateLong").style.borderColor = "red";   
    }
}

// estimates the weekly income of a house based on location 
function estimateWeekly(data){
    var lat = document.getElementById("weeklyEstimateLat").value
    var long = document.getElementById("weeklyEstimateLong").value

    //check for invalid inputs 
    if (lat == '' || long == ''|| isNaN(parseFloat(lat)) || isNaN(parseFloat(long))){
        weeklyIsFail(true);
    }else if(long < -122.52 || long > -122.35405 || lat > 37.84 || lat < 37.7){
        weeklyIsFail(false)
    } else{

        var closest = getClosest(lat,long,data); //get closest 5 houses in an array. *See getClosest() for more details
        console.log(closest)

        //average the 5 houses prices/week together
        var average=0.0;
        for (i=0; i<closest.length; i++){
            average += parseFloat(closest[i][2]);
        }
        document.getElementById("weeklyResponse").innerHTML = "$" + (average*7) + " per week"
    }
}

// ----------------------------- OPTIMAL PRICING ESTIMATES ---------------------------------

//Fail Function to set error if input is out of bounds of SF, or invalid
function optimalIsFail(flag){
    if (flag){
        document.getElementById("optimalResponse").innerHTML = "Please Enter A Valid Input"
        document.getElementById("optimalLat").style.borderColor = "red";
        document.getElementById("optimalLong").style.borderColor = "red";   
    }else{
        document.getElementById("optimalResponse").innerHTML = "Make Sure These Coordinates Are In San Francisco!"
        document.getElementById("optimalLat").style.borderColor = "red";
        document.getElementById("optimalLong").style.borderColor = "red";   
    }
}

//Estimates optimal price based off of closest 5 houses to location
function estimateOptimal(data){
    var lat = document.getElementById("optimalLat").value
    var long = document.getElementById("optimalLong").value
    console.log(parseFloat(lat))
    if (lat == '' || long == ''|| isNaN(parseFloat(lat)) || isNaN(parseFloat(lat))){
        optimalIsFail(true);
    }else if(long < -122.52 || long > -122.35405 || lat > 37.84 || lat < 37.7){
        optimalIsFail(false)
    } else{
        var closest = getClosest(lat,long,data) //get closest 5 houses in an array. *See getClosest() for more details
        var index = 0;
        var indexValue=0;

        // find house of that array that makes the most income overtime -- daily price * reviews per day
        // (Uses reviews per month as means to determine frequency of tenants)
        for(i=0; i<closest.length;i++){ 
            if (parseInt(closest[i][2])*(parseInt(closest[i][4]))>indexValue){
                indexValue = parseInt(closest[i][2])*(parseInt(closest[i][4]));
                index =i;
            }
        }
        // Undercut most successful house by $20 a night to deter competition
        console.log(closest);
        document.getElementById("optimalResponse").innerHTML = "$" + (parseInt(closest[index][2])-10) + " per night"
    }
}

// ----------------------------------- HELPER METHODS ---------------------------------------

//Based on lat and long passed in, determine the 5 closest houses arranged by proximity
function getClosest(lat, long, data){

    //set any red errors in webpage back to normal
    document.getElementById("weeklyEstimateLat").style.borderColor = "gray"
    document.getElementById("weeklyEstimateLong").style.borderColor = "gray"
    document.getElementById("optimalLat").style.borderColor = "gray"
    document.getElementById("optimalLong").style.borderColor = "gray"

     // Create a 2D array with first 5 houses, each holding data as follows:
     // latitude,longitude,price, distance (from the local instances of lat and long), reviews_per_month
    var closest=[];
    for (i =1; i<6; i++){
        var checkLat = parseFloat(data[i][0]);
        var checkLong = parseFloat(data[i][1]);
        var distance = Math.pow(Math.pow((checkLat - lat),2) + Math.pow((checkLong - long),2),.5) //distance formula
        closest.push([data[i][0],data[i][1],data[i][2], distance, data[i][3]]);
    }
    
    closest.sort(sortFunction); //sorts the array based on distance
   

    //Check to see if the next house in (data) is closer than the last house in the array (since the array is ordered by distance)
    for ( i =6; i<data.length; i++){
        var checkLat = parseFloat(data[i][0]);
        var checkLong = parseFloat(data[i][1]);
        var distance = Math.pow(Math.pow((checkLat - lat),2) + Math.pow((checkLong - long),2),.5)
        if (distance < closest[4][3]){ // if the house is closer
            closest.splice(4,1); //remove the last house from the array
            closest.push([data[i][0],data[i][1],data[i][2], distance, data[i][3]]); //add the closer house
            closest.sort(sortFunction); //sort the array so the farthest house is last in the array
        }
    }
    return closest;
}

//Sorts the given array based on distance 
function sortFunction(a, b) {
    if (a[3] === b[3]) {
        return 0;
    }
    else {
        return (a[3] < b[3]) ? -1 : 1;
    }
}

// Load CSV File as a String
function runCSV(flag){
    fetch('data/estimate.csv').then(function(response) {
        if (response.status !== 200) {
            throw response.status;
        }
        return response.text();
    }).then(function(file_content) {
        array = csvToArray(String(file_content));
        if (flag==0){
            estimateWeekly(array)
        }else{
            estimateOptimal(array)
        }
    }).catch(function(status) {
        console.log('Error ' + status);
    });
}

//Turn CSV string to an Array
function csvToArray (csv) {
    rows  = csv.split("\n");
    return rows.map(function (row) {
    	return row.split(",");
    });
};

