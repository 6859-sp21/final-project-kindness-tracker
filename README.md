# kindness-tracker

## links

- [deployed app](http://bit.ly/kindness-tracker-app)
- [teaser video](https://youtu.be/oispwOZaiFU)
- [Google form](http://bit.ly/kindness-form)
- [Google form prefilled w/ 123](http://bit.ly/your-kindness)
- [original demo video](https://www.dropbox.com/s/5whse10x4ziqafc/6859%20-%20Kindness%20Tracker.mp4?dl=0)

## Abstract

In the midst of current economic, political, and public health concerns, we believe that being kind to one another is more important than ever. That's why we developed Kindness Tracker, a data collection and visualization application for random acts of kindness. Utilizing physical "Kindness Cards", an active database, and a front-end application, we are able to visualize the spread of kindness across the country between friends, family, and total strangers. We have found that not only is it an enjoyable experience to observe the spread of kindness, but also a catalyst for future acts of kindness in viewers. Our hope is that this application plays a small role in increasing happiness across the country.

## Work Breakdown

Kevin was our head front end developer, designing the framework for the codebase, and consistently managing large scale updates to the system. Christian worked on the initial MapboxGl pairing with the website framework Kevin designed, also developing the communication with Google Maps API to properly link address descriptions to geographical data. Jack worked on the data management, developing fake data for early testing, and also working on back-end data processing for visualization on the final website. He also managed creation of kindness tracker business cards and security of the database. All members worked closely (as we all live together) on each major update to the project - consistently partner coding together.

## Research/Development Process

Initial ideation began with sketched visualizations of what the website should look like and fake tables of what proposed data would be like. Our project was unique in the sense of dataset being created as part of it. We aimed to spend most of our time working on the visualization aspect of the project. Our team achieved this by cementing our hypothesized dataset with the core data of geographical location in latitude and longitude, and the general concept of act-of-kindness-specific details (providing wiggle room for these details to be ironed out later). With these two key ideas in mind for the main components of our dataset, we then began our website implementation. We leverage the MapboxGL interative map tool to enhance the user-experience of interacting with D3 visual encoding objects. Because our project is reliant on user interest to grow the dataset, we gave special care to the user's adventure through the website. Early testing within our immediate friend group provided valuable feedback for what aspects of the data should be emphasized in our visualization. The midpoint demo within the class had the main backbone of our project (nodes on a graph showing acts of kindness) - namely the aspects initially requested from our friend group. The peer-review feedback gave us a stepping stone for where to take the project next. The statistics of a given kindness card ID - showing where the kindness went, what happened, and how far it traveled - was an area where peers felt the data could have been encoded more clearly. This feedback inspired the connections between nodes, statistics summary, and ability to join the rapidly-growing network of acts of kindness via the 'kindness card ID-less act of kindness' button, enabling kindness community members unable to obtain a physical card a way add a node to the graph. We utilize Google Forms script editing for a backend, React for Front-End development, Google Sheets for concurrent read/write to a shared database, D3 for user-friendly data interaction/visualization/transitions, GitHub for version control, and MapboxGL for interactive map functionality.

## install dependencies

```
npm ci
```

## run the app on your local machine

(make sure you ran `npm ci` to install dependencies)

```
npm start
```

## deploy it to GitHub pages

```
npm run deploy
```
