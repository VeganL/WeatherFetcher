# WeatherFetcher
Node.js project for a webapp service that displays the weather forecast in your area for today and the following 6 days.
Depends the express and request Node.js frameworks.

Also depends on a file stored in the parent directory named aeriskey.json of this format:

{
	"accessId": (key string),
	"secretKey": (another key string)
}

Keys can be obtained by signing up as a developer at: https://www.aerisweather.com/signup/developer/

This is also the service that provides the weather data.
