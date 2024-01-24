# weather_traffic

1. Got to https://github.com/ChawinTan/weather_traffic and clone git@github.com:ChawinTan/weather_traffic.git
2. In a terminal, cd into `weather-app/server`
3. Run `npm start` to start the server on localhost 3001
4. In another terminal, cd into `weather-app`
5. Run `npm start` to start the front end on locahost 3000
6. Go to the browser and enter localhost:3000 to access the app


## Additional notes

Due to an update in the api, I could not find the original url. I decided to side track a bit and show an app that displays real time traffic data and weather forecast using the two apis below:
- https://api.data.gov.sg/v1/transport/traffic-images
- https://api.data.gov.sg/v1/environment

Even though the date/time parameters are not required anymore, I still pass them in for demonstrating an api call.