
//Created global variables for use between functions 
var darkskyUrl = 'https://api.darksky.net/forecast/1a43d545710c14571dbbe87b13bad8c7/';
var citiesUrl = 'https://raw.githubusercontent.com/lutangar/cities.json/master/cities.json';
var data;
var countries = [];
var cities = [];


//Created pre-set lat and long values to point at London
var lat =51.50853;
var long =0.1278;

//Start of Jquery
$(document).ready(function() {

    //------------------------------FUNCTIONS


    //Created a function to convert farenheit to celcius as API returns farenheit
    $.fn.fToC = function(fahrenheit){
        //Returns a formatted celcius value rounded to the nearest whole number
        return Math.round((5*(fahrenheit-32))/9) +"°C";
    }

    //Created a function to return the day of the week based on a number given
    $.fn.dayOfWeek = function(input){
        //Created output variable with dummy "N/A" value incase of input error
        var output = "N/A";

        //days of the week go from 0-6. If the given day is greater than 6,
        // then it must be brought into the 0-6 range
        while(input>6){
            input = input - 7;
        }
        //Created a switch to set the output based on the input
        switch(input){
            case 0:
                output = "Sun";
                break;
              case 1:
                output = "Mon";
                break;
              case 2:
                output = "Tues";
                break;
              case 3:
                output = "Wed";
                break;
              case 4:
                output = "Thurs";
                break;
              case 5:
                output = "Fri";
                break;
              case 6:
                output = "Sat";  
        }
        //returns the output value
        return output;
    }

    //Created an icon filter using the icon names given by the darksky API
    //The function maps these icon names with icon names from the Weather Icons pack
    //FROM DARKSKY API:
            //A machine-readable text summary of this data point,
            // suitable for selecting an icon for display. If 
            //defined, this property will have one of the following 
            //values: clear-day, clear-night, rain, snow, sleet, wind, fog, 
            //cloudy, partly-cloudy-day, or partly-cloudy-night. 
            //(Developers should ensure that a sensible default is defined,
            // as additional values, such as hail, thunderstorm, or tornado, may be defined in the future.)
    $.fn.iconFilter = function(input){
        //Created an output variable - used default to ensure value is always set 
        var output;
        switch(input){
            case "clear-day":
                output = "wi wi-day-sunny";
                break;
            case "clear-night":
                output = "wi wi-night-clear";
                break;
            case "rain":
                output = "wi wi-rain";
                break;
            case "snow":
                output = "wi wi-snow";
                break;
            case "sleet":
                output = "wi wi-sleet";
                break;
            case "wind":
                output = "wi wi-windy";
                break;
            case "fog":
                output = "wi wi-fog";
                break;
            case "cloudy":
                output = "wi wi-cloud";
                break;
            case "partly-cloudy-day":
                output = "wi wi-day-cloudy";
                break;
            case "partly-cloudy-night":
                output = "wi wi-night-alt-cloudy";
                break;
            default:
                output = "wi wi-na"        
        }
        //returned the icon string
        return output;

    }

    //Created a refresh function. This uses ajax to call the darksky API
    //Once called it will refresh all the values on the page
    $.fn.refresh = function(){

        //Used Ajax to call API
        $.ajax({
            //Built the URL using the base and the lat and long values stored
            url: darkskyUrl + lat +","+long,
            //Declared the content type
            contentType: "application/json",
            //calling 'json' causes error so used jsonp as data type
            dataType: 'jsonp',

            //Created function that occurs on success
            success: function(res){
                //Created variable to store the list of each of the daily data
                var daily = res.daily.data;

                //created a Date object called day
                var day = new Date;
                //Set the var to the current date
                day = day.getDay();
                
                //uncomment to print log of response
                //console.log(res);

                //Set the current temp and day icons from the API calls and using the iconFilter and fToC functions
                $("#dayIcon").attr('class',$.fn.iconFilter(res.currently.icon) + " currentTemp icon")
                $("#currentTemp").html($.fn.fToC(res.currently.temperature));

                //Icons are static so no change needed, but update the daily high and low temps
                $("#todayHigh").html($.fn.fToC(daily[0].temperatureHigh));
                $("#todayLow").html($.fn.fToC(daily[0].temperatureLow));

                //Rain chance icon is static so just pass the value plus % symbol
                $("#rainChance").html(res.currently.precipProbability +"%");

                //Wind icon is static and so just pass the speed and add unit of knots per hour
                $("#windspeed").html(res.currently.windSpeed+ " kph");


                //Humidity icon is static so just pass humidity %
                $("#humidity").html(res.currently.humidity + "%");

                //Updated values for day 1 including icon and day of week
                $("#dayOne").html($.fn.dayOfWeek(day+1));
                $("#dayOneIcon").attr('class',$.fn.iconFilter(daily[1].icon) + " day1Icon");
                $("#dayOneHigh").html($.fn.fToC(daily[1].temperatureHigh));
                $("#dayOneLow").html($.fn.fToC(daily[1].temperatureLow));

                //Updated values for the day 2 including icon and day of week
                $("#dayTwo").html($.fn.dayOfWeek(day+2));
                $("#dayTwoIcon").attr('class',$.fn.iconFilter(daily[2].icon) + " day2Icon");
                $("#dayTwoHigh").html($.fn.fToC(daily[2].temperatureHigh));
                $("#dayTwoLow").html($.fn.fToC(daily[2].temperatureLow));


                //Updated values for the day 3 including icon and day of week
                $("#dayThree").html($.fn.dayOfWeek(day+3));
                $("#dayThreeIcon").attr('class',$.fn.iconFilter(daily[3].icon) + " day3Icon");
                $("#dayThreeHigh").html($.fn.fToC(daily[3].temperatureHigh));
                $("#dayThreeLow").html($.fn.fToC(daily[3].temperatureLow));


                //Updated values for the day 4 including icon and day of week
                $("#dayFour").html($.fn.dayOfWeek(day+4));
                $("#dayFourIcon").attr('class',$.fn.iconFilter(daily[4].icon) + " day4Icon");
                $("#dayFourHigh").html($.fn.fToC(daily[4].temperatureHigh));
                $("#dayFourLow").html($.fn.fToC(daily[4].temperatureLow));


                //Updated values for the day 5 including icon and day of week
                $("#dayFive").html($.fn.dayOfWeek(day+5));
                $("#dayFiveIcon").attr('class',$.fn.iconFilter(daily[5].icon) + " day5Icon");
                $("#dayFiveHigh").html($.fn.fToC(daily[5].temperatureHigh));
                $("#dayFiveLow").html($.fn.fToC(daily[5].temperatureLow));


                //Updated values for the day 6 including icon and day of week
                $("#daySix").html($.fn.dayOfWeek(day+6));
                $("#daySixIcon").attr('class',$.fn.iconFilter(daily[6].icon) + " day6Icon");
                $("#daySixHigh").html($.fn.fToC(daily[6].temperatureHigh));
                $("#daySixLow").html($.fn.fToC(daily[6].temperatureLow));

                //Updated values for the day 7 including icon and day of week
                $("#daySeven").html($.fn.dayOfWeek(day+7));
                $("#daySevenIcon").attr('class',$.fn.iconFilter(daily[7].icon) + " day7Icon");
                $("#daySevenHigh").html($.fn.fToC(daily[7].temperatureHigh));
                $("#daySevenLow").html($.fn.fToC(daily[7].temperatureLow));
                
            }
            
        })
    };


    //Created an exists function which allows to check if an input value exists in the given array
    $.fn.exists = function(inputArray, inputValue){

        //Boolean output created
        //IF output == true, then the inputValue exists in the inputArray
        //Else it will remain false
        var output = false;

        //If array length is NOT zero then loop through array and compare input
        if(inputArray.length != 0){

            //Iterate through array
            for(var i = 0; i<inputArray.length;i++){

                //If the inputvalue matches a single value in the array output becomes true
                if(inputArray[i] == inputValue) output = true;
            }
        } 
        return output;
    }

    //------------------------------END OF FUNCTIONS

    //Hiding the second dropdown as is not needed until country is selected
    $('#fromGroupCity').hide();
    $('#selectACity').hide();
    $('#dropDownCity').hide();

    //Created an onclick listener for the clicking of the refresh icon
    $("#refresh").click(function(){
        $.fn.refresh();
    });

    //Used Ajax to call in the json list of cities, countries and their lat and long values
    $.ajax({
        
        //Static URL for cities, countries and their lat & longs
        url:citiesUrl,

        //On successful call to API
        success: function(res)
        {
            //Uncomment to print log
            //console.log(res);

            //Parse the data from the response into a JSON object
            data = JSON.parse(res);

            //Created a listener on the first (country) combobox
            $('#dropDownCountry').change(function() {


                //"Remove" the city combobox. This is because the list cannot be edited 
                //after the line $('.comboboxCity').combobox({})
                //Removing and re adding it is the only way to refresh the list of cities
                $('#formGroupCity').remove();
                //Readded the city combobox after the country combobox
                $('#formGroupCountry').after('<div class="form-group" id="formGroupCity"> \
                    <label id="selectACity">Select a city</label>\
                    <select id="dropDownCity" class="comboboxCity"></select>\
                    </div>')

                //Append a prompt    
                $('.comboboxCity').append($('<option />').val("-1").text("Enter a city"));
                //Set value of the combobox to point at prompt
                $('.comboboxCity').val("-1")

                //create a var for the county selected to be stored in
                var selected = $('#dropDownCountry option:selected').text();

                //update the label to be more dynamic
                $('#selectACity').html("Select a city from " + selected);

                //Ensure that the selected value is not -1
                if($.fn.exists(countries,selected)){
                    //Uncomment to see log of the selected value
                    //console.log(selected);
                    
                    //Iterate through the data list
                    for(var i = 0; i<data.length; i++){
                        //If a city exists in the given country, then
                        if(selected == data[i].country){
                            //append this as an answer to the combobox (unsorted)
                            $('.comboboxCity').append($('<option />').val(i).text(data[i].name));
                            
                            
                        }
                    }


                    //Created the combo box
                    $('.comboboxCity').combobox({
                        bsVersion: '4', 
                        appendId:'#dropDownCity',    
                    });


                    //toggle the hide on the functions
                    $('#fromGroupCity').hide();
                    $('#selectACity').hide();
                    $('#dropDownCity').hide();

                }



                //created a change listener for the city drop down,
                //This can only be created after API is successful (API can be slow!)
                //AND once the country has been selected
                $('#dropDownCity').change(function() {
                    //Created a value object for the option selected
                    var value = $('#dropDownCity option:selected').val();
                    
                    //An uncaught type error occurs here on the lat value.
                    //HOWEVER it does not stop the functioning of the program.
                    //attempt to resolve this issue:
                    if(typeof(data[value].lat) == 'undefined'){
                        lat = parseFloat(0);
                        long = parseFloat(0);
                    } else{
                        //Set lat and long values based off the user's selected city
                        lat = data[value].lat;
                        long = data[value].lng;
                    }

                    //Set location text to match the city name user selected
                    $("#location").html(data[value].name);

                    //refreshed the interface using the refresh function
                    $.fn.refresh();
                });
            });


            //On success of the API, clear the comboboxCountry values
            $('.comboboxCountry').empty();
            //Append a first option to enter a country
            $('.comboboxCountry').append($('<option />').val("-1").text("Enter a country"));
            //Set the value to -1
            $('.comboboxCountry').val("-1");

            //Created a for loop to iterate through the data
            for (var i = 0; i < data.length; i++) {
                //If the country does not already exist wthin the array then
                if(!$.fn.exists(countries, data[i].country)){
                    //Add to array and add to combobox list
                    countries.push(data[i].country);
                    $('.comboboxCountry').append($('<option />').val(countries.indexOf(data[i].country)).text(data[i].country));
                }
            }

            //Created the combobox
            $('.comboboxCountry').combobox({
                bsVersion: '4', 
                appendId:'#dropDownCountry'
            });
        }
    });


    //Called refresh on creation 
    $.fn.refresh();
});






