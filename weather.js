$(function(){
	var weatherData = null;
	var locationData = null;
	var state = null;
	var city = null;
	var time = null;
	var temp = null;
	var condition = null;
	var RecipeData = null;
	var everything = ""
	var everything1 = ""
	var possibility1 = ["soup", "bread", "fish", "garlic"]
	var possibility2 = ["fruit", "salad", "tomato", "noodles"]
	var possibility3 = ["bake", "pasta", "beef", "chicken"]
	var possibility4 = ["cream", "sandwich", "chicken", "vegetable"]
	var possibility5 = ["soup", "cheese", "pasta", "hot"]
	var title = null
	var ingreds = ""

	var initiate2 = function()
	{
		if(time.indexOf("AM")!=-1)
		{
			var meal = "Lunch";
		}
		else
		{
			var meal = "Dinner";
		}
		$("#weatherbox").html(meal+ " at " + city + ", " + state + " <br> for " + time + " <br>" + temp + " degrees" + ", " + condition)
		if((condition.indexOf("Chance"))!= -1)
		{
			var chosenFood = possibility1[Math.floor(Math.random()*4)];
		}
		else if((condition.indexOf("Sunny")!=-1)||condition.indexOf("Clear")!=-1)
		{
			var chosenFood = possibility2[Math.floor(Math.random()*4)];
		}
		else if((condition.indexOf("Cloud")!=-1)||condition.indexOf("Overcast")!=-1)
		{
			var chosenFood = possibility3[Math.floor(Math.random()*4)];
		}
		else if (condition.indexOf("Flurries") != -1 || condition.indexOf("Fog")!= -1 || condition.indexOf("Haze")) 
		{
			var chosenFood = possibility4[Math.floor(Math.random()*4)];
		}
		else
		{
			var chosenFood = possibility5[Math.floor(Math.random()*4)];
		}
			var recipeSource = "https://api.pearson.com/v2/foodanddrink/recipes?limit=10&search=" + chosenFood + "&apikey=S3FIUvCFI6pdPDFvhfxcAYbhDzGtGq3c"
			$.ajax({
				url: recipeSource, 
				success: function(data)
				{
					RecipeData = data;
					blurg();
					console.log(RecipeData)
				},
				dataType: "json"
			});
		}
	var blurg = function()
	{
			var randomRecipeIndex = Math.floor(Math.random()*RecipeData['results']['length'])
				everything1 = ""
				for(var j = 0; j < RecipeData['results'][randomRecipeIndex]['directions'].length; j ++)
				{
					everything1 = everything1 + RecipeData['results'][randomRecipeIndex]['directions'][j] + "<br>"
				}
				everything = everything + everything1 + "<br><br>";
		$("#recipebox").html(everything);
		$("#title").html(RecipeData['results'][randomRecipeIndex]['summary']['title'])
		for(var k = 0; k < RecipeData['results'][randomRecipeIndex]['ingredients'].length; k ++)
		{
			ingreds = ingreds + RecipeData['results'][randomRecipeIndex]['ingredients'][k]['description'] + "<br>"
		}
		$("#ingredients").html(ingreds)
		$("#photo").html("<img src = https://api.pearson.com" + RecipeData['results'][randomRecipeIndex]['images'][1]['url'] + " width = '100' height = '100'>")
	}
	var success1 = function(data)
	{
		locationData = data;
		console.log(locationData);
		initiate();
	}
	var initiate = function()
	{
	state = locationData['location']['state'];
  	city = locationData['location']['city'];
  	$.ajax({
		url : "http://api.wunderground.com/api/e0b7a5f7e92ab6f2/hourly/q/" + state + "/" + city + ".json",
		dataType : "jsonp",
		success : success2
	});
  }
	var success2 = function(parsed_json)
	{
		var weatherData = parsed_json;
		time = weatherData['hourly_forecast'][0]['FCTTIME']['civil'];
	  	console.log(time);
	  	temp = weatherData['hourly_forecast'][0]['temp']['english']
	  	console.log(temp);
	  	condition = weatherData['hourly_forecast'][0]['condition']
	  	console.log(condition);
	  	initiate2();
	}
	$.ajax({
	  	url : "http://api.wunderground.com/api/e0b7a5f7e92ab6f2/geolookup/q/autoip.json",
	  	success : success1,
	  	dataType : "jsonp"
	 });	
	
	
		
});
