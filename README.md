
# Chatting with an Astronaut 

Using the power of our chat engine you can simulate talking to a Astronaut!



![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Astronaut_(97576)_-_The_Noun_Project.svg/512px-Astronaut_(97576)_-_The_Noun_Project.svg.png)

## Authors

- [@Colin Pereira](https://github.com/ZuShi0)





# New Features

## Google Translate API Integration:

The Google Translate API allows users to receive responses from the chatbot in a language that they pick. Currently, this iteration only supports English, Japanese, French, Spanish, Russian and Chinese. In addition to this, the system currently only accepts user inputs in English, but with more time, input language detection (which is a feature of the API) could be implemented as well. 

### Example of Use:

Changing Language using the Language button
![Logo](https://imgur.com/yJ1OZhs.jpg)


Bot conversation after changing the language to Japanese
![Logo](https://imgur.com/6RnBcl8.jpg)

Notice that in the above screenshot, there is a response in English. This is because the default language is English, and the first message that the user sent to the bot was before swapping languages. 

The translation will only occur after sending an input to the bot, and will not translate existing conversation. This is by design so users could refer to multiple translations if they wanted without having to restart a whole conversation.

## Google Street View Static API Integration:

The Google Street View Static API is mainly used to proved users with an image of a specified location from Google Maps' Street View feature. In this implementation, I'm using it to provide users with images of places on Earth that are geologically close to Mars/Venus/Others. 

Currently, only 3 images can be output by the system, due to the fact that Street View is not accessible in every possible location on Earth, and lack of information on existing spatial body geology.
In addition to this, I have used specific coordinates (Latitude, Longitude) for each image to ensure that the Street View API returns an image. To add more images, I would have to add more coordinates to the location bank. 

### Example of Use:
Mars:
![Logo](https://imgur.com/B4n52mR.jpg)

Venus:
![Logo](https://imgur.com/z65SgMb.jpg)

Something Otherworldly:
![Logo](https://imgur.com/sV7A6YF.jpg)

As you can see here, images will persist on the screen until the page is reloaded, or until the user mentions Mars/Venus/something otherworldly.

## GitHub Link

[Click Here](https://github.com/ZuShi0/A4COSC310-Solo.github.io) to go to the Project GitHub Page 

(https://github.com/ZuShi0/A4COSC310-Solo.github.io)

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Setup
You must have `npm` and `nodejs` installed on your system. https://nodejs.org/en/download/

clone the project
```
git clone https://github.com/ZuShi0/A4COSC310-Solo.github.io
````

install all the npm dependencies
```
npm install
```

## Run
```
npm start
```
The site can be viewed at `http://localhost:4000/`
