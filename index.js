const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // Import of the model Recipe from './models/Recipe'
const data = require('./data.js');  // Import of the data from './data.js'

// Connection to the database "recipeApp"
mongoose.connect('mongodb://localhost/recipeApp', { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

const anyRecipe = new Recipe({
  title: 'Chilaquiles',
  level: 'UltraPro Chef',
  ingredients: ['Salsa', 'Tortillas', 'Cebolla', 'Huevos', 'Queso', 'Crema', 'Aguacate'],
  cuisine: 'Mexican',
  dishType: 'Dish',
  image: 'https://www.mylatinatable.com/wp-content/uploads/2018/04/chilaquiles-verdes-in-skilet-6.jpg',
  duration: 160,
  creator: 'Chef Alberto'
})

async function crudRecipes() {
  try {
    const recipe = await Recipe.create(anyRecipe)
    console.log(recipe.title)

    const recipes = await Recipe.insertMany(data)
    recipes.forEach(recipe => console.log(recipe.title))

    const rigatoni = await Recipe.findOneAndUpdate({'title': 'Rigatoni alla Genovese'},{$set:{'duration': 100}}, {new: true})
    console.log(`Nice! You've updated ${rigatoni.title} successfully.`)

    const carrotCake = await Recipe.deleteOne({title: 'Carrot Cake'})
    console.log(`${carrotCake.title}'s been removed from the DB.`)
  } catch(err) {
    console.log(err)
  }
} 

crudRecipes()

mongoose.connection.close()
  
