# Atlanta Tech Ecosystem Dashboard

This project was completed in collaboration with City of Atlanta and Emory's Center of AI, for Emory's 370 - Computer Practicum course.

Group Members: Aaron Zaiman, Alex Forbes, Darren Ni, Dickson Leong, Doron Czarny, Lachlan Spangler, and Yasasvi Josyula.
test
## Project Overview
For our semester-long project, our team decided to team up with the City of Atlanta to present them a dynamic dashboard of Atlanta's startup ecosystem. This dashboard will provide investors and students with high-level information, dynamic graphs and maps and a huge database of vital statistics to best inform and advise those interested. Through weeks of meeting with the CoA and Emory's Center of AI, we drafted a Spec Document and met all their requirements for metrics, graphs, and features. The data was provided from the City of Atlanta through dealroom, which we then filtered and uploaded to a master database on redshift. Our dashboard currently has a Homepage which displays Ecosystem Value (valuations), Funding rounds, Total Funding, Startups per year, Minority-founded, Type of Startup, and Amount raised this year through dynamic graphs and scatterplots. Additionally, it has a page for Companies (displaying all startups with a searchbar), a interactive heat map, and an About Us page. 

## Installation Instructions
Visit the dashboard at: https://co-a-startup-dashboard.vercel.app/
To clone the repo, use git clone https://github.com/NiDarren6/CoA_Startup_Dashboard - Then run npm build then npm run in terminal

## Usage
No log in or sign up is required. Our information is readily available. All graphs and plots on the homepage are dynamic, so simply hover your mouse over them to examine their data further. The scatter plot on the bottom is customizable, meaning users can select the x-axis, y-axis and key datatype from the dropdown options to be displayed. The Companies page shows a comphrensive list of startups. Users can either scroll or use the searchbar. The heat map is interactive so users can move and zoom in wherever. They can click on each location for hyperlinks and more information. Finally, the About Us page is purely informational.

## Features
- Interactive graphs with key metric data
- Customizeable, dynamic scatterplots
- Dynamic heat map with Atlanta's startup ecosystem
- Comphrensive list of all startups with search bar
- Informational About Us page

## Demo

Dashboard: https://co-a-startup-dashboard.vercel.app/
Video:

## Pages

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## License
All code was written by students of Emory University with collaboration with the Center of AI Learning and the City of Atlanta.

## Contact Information
Please direct all questions and inquiries to dashbaordcoa@gmail.com
