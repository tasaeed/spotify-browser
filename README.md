# spotify-browser

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>

clone repo on your system and run

  $ npm start

to run dev server  , i already generated compiled files inside build folder however its require to run build folder using web server,

There is change in Spotify API the way they authroize , earlier you can hit search api directly but no its require to visit spotify website to get authorization token and after that you can hit api's with access token.

I am handling this in componentWillMount phase , for refresh token if didnt build any login simple if there is 401 error i am redirecting again to get new token