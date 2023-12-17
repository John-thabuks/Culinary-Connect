# Culinary-Connect App

Culinary-Connect is a React-based web application that allows users to explore and discover various cuisines, recipes, and cooking ideas. The app provides a user-friendly interface to navigate through different categories, view popular recipes, and search for specific recipes.

## Contributors

- [Irene Ndinda](https://github.com/Ndindairene)
- [Kevin Moino](https://github.com/sdfpt04)
- [Chrispine Ochieng](https://github.com/OchiengJr)
- [John Muthabuku](https://github.com/John-thabuks)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/culinary-connect.git
```

2. Navigate to the project directory:

```bash
cd culinary-connect
```

3. Install dependencies:

```bash
npm start
jsorn-server --watch db.json --port 3005
```

The app should now be running locally on `http://localhost:3000`.

## Usage

Once the application is running, you can access it through the provided local URL. Explore different cuisines, check out popular recipes, and use the search functionality to find specific recipes.

## Features

1. Category Component

The Category component provides a visually appealing way to navigate through different cuisine categories. Icons represent each category, and users can click on them to explore specific cuisines.

2. Popular Component

The Popular component displays a selection of popular recipes. It uses the Splide slider for an interactive and visually appealing presentation of recipes.

3. Search Component

The Search component allows users to search for recipes. Simply enter the desired search term and press enter to see relevant results.

4. Veggies Component

The Veggies component showcases vegetarian picks. Similar to the Popular component, it uses the Splide slider to present a collection of vegetarian recipes.

5. Cuisine Component

The Cuisine component dynamically fetches and displays recipes based on a specified cuisine. Users can explore recipes from different cuisines by navigating to the corresponding pages.

6. Recipe Component

The Recipe component provides detailed information about a specific recipe, including instructions and ingredients. Users can access this information by clicking on a recipe from the main pages.

7. Searched Component

The Searched component displays search results based on user input. It dynamically fetches and presents recipes matching the search query.

8. Form Component

The Form component allows users to submit their own recipes. It includes a form for providing details such as name, title, image, instructions, and ingredients. The form integrates with Cloudinary for image uploads.

## Contributing

We welcome contributions from the community! If you'd like to contribute to the project, please follow these steps:

    1. Fork the repository.
    2. Create a new branch: `git checkout -b feature-name``.
    3. Make your changes and commit them: `git commit -m 'Add new feature'`.
    4. Push to the branch: `git push origin feature-name`.
    5. Submit a pull request.

## License

This project is licensed under the MIT License.

