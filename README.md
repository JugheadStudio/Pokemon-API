![Datamon Header Image](https://github.com/JugheadStudio/Github-assets/blob/main/Datamon/Github-header-blue.png)

- - - -

# About Datamon

Datamon is an app built using [PokeAPI](https://pokeapi.co/), which is a database of everything you would need to create a website with comprehensive information on anything pokemon related, from every pokemon, all the typings, all the items etc. I used the dataset to create a visual representation of every Pokemon's stats, typings, weaknesses to other typings, the evolution chain and what every Pokemon's base stats are.

### Built With
[![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)](https://www.javascript.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![ChartJS](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

![Datamon Screenshot](https://github.com/JugheadStudio/Github-assets/blob/main/Datamon/datamon-screenshot.png)

## How To Install

To get started, clone the repo:
```
git clone https://github.com/JugheadStudio/Pokemon-API.git
```

Install all the dependencies using npm:
```
npm install
```

Run the app:
```
npm start
```

## Features

| Home Page | Compare Page | Timeline Page |
| :--- | :--- | :--- |
| Pokemon details overview | Compare Pokemon Details | Pokemon details overview |
| Pokemon base Stats in a bar chart | Compare Pokemon base stats | Pokemon evolution chain |
| Pokemon base EV values in a radar chart | Compare pokemon base EV values | Pokemon growth rate |
| Pokemon weakness table | Compare Pokemon total base stats |  |
| Pokemon growth rate |  |  |

## The Idea

The idea was to create a website that you could use to get an overview of overall stats, abilities, weaknesses etc. of any Pokemon by just doing a quick search.

## Wireframes

![Wireframe](https://github.com/JugheadStudio/Github-assets/blob/main/Datamon/wireframes.png)

## Development Process

### Highlights
Highlights of my page are definitely my search bar and my evolution chain, I think these added features really gives a nice user experience and a nice flow to the website

### Challenges
This was my first react project and I made some beginner mistakes by having each component making it's own api calls to [PokeAPI](https://pokeapi.co/) and some of the other components were dependant on the information from other components. I Had to rewrite almost all of my code to have all the api calls in one file that passes the data into an array, which made it a lot easier to get the data I needed, this allowed me to just import the data file into each component and use only what I needed. None of the components were dependant on each other.

Another main challenge I had was with regards to the search bar and the evolution chain. Some pokemon names had '-' high-fins in their names and I made a function that splits then name and only used the first part of the name. Later on in my build, this made issues where my search bar was dependent on having the full name to access the correct api link and this was essential for my evolution chain as well as loading the data for the Pokemon that the user searches for. To fix this issue, I rewrote all my code for my search bar and started by pushing the full name with the high-fins to my array and then a modified version of the names that had only the name.

## Future Implementations

* Login and authentication
* National Pokedex with filters for each region/generation
* A national Pokedex that allows you to track which pokemon you have caught
* A national Pokedex that keeps track of all the shiny Pokemon that you have caught
* A team builder
* A list of all moves and abilities and which Pokemon can learn them

## Mockups

![Javascript](https://github.com/JugheadStudio/Github-assets/blob/main/Datamon/devices.png)

## Demonstration

### License
[MIT](LICENSE) © [Jughead Studio](https://github.com/JugheadStudio)
