import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function EditRecipe(props) {

// OPTION 1 for using hooks
// const [name, setName] = useState('');
// const [ingredients, setIngredients] = useState('');
// const [instruction, setInstruction] = useState('');

// OPTION 2 for using hooks
const [recipe, setRecipe] = useState({
  name: '',
  ingredients: '',
  instruciton: ''
});
const { name, ingredients, instruction } = recipe;

  useEffect(() => {

    const id = props.match.params.id;
    const url =`/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      // OPTION 1
      // .then(response => {
      //   setName(response.name);
      //   setIngredients(response.ingredients);
      //   setInstruction(response.instruction);
      //   }
      // )
      // OPTION 2
        .then(response => setRecipe(response))
      .catch(() => props.history.push('/recipes'))
  }, []);

  // we never call this function...(mistake in tutorial)
  // function stripHtmlEntities(str) {
  //   return String(str)
  //     .replace(/</g, '&lt;')
  //     .replace(/>/g, '&gt;');
  // }

  function onChange(event) {
    // OPTION 1
    // setState(event.target.name, event.target.value);
    // OPTION 2
    setRecipe({...recipe, [event.target.name]: event.target.value})
  }

  function onSubmit(event) {
    event.preventDefault();
    const id = props.match.params.id;
    const url = `/api/v1/recipes/${id}/update`;

    if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
      return;

    const body = {
      name,
      ingredients,
      instruction: instruction.replace(/\n/g, '<br> <br>')
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => props.history.push(`/recipe/${response.id}`))
      .catch(error => console.log(error.message));
  }

  // OPTION 1
  // function setState(stateName, value) {
  //   switch (stateName) {
  //   case 'name':
  //     setName(value);
  //     break;
  //   case 'ingredients':
  //     setIngredients(value);
  //     break;
  //   case 'instruction':
  //     setInstruction(value);
  //     break;
  //   }
  // }

  return(
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Edit recipe: {name}
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="recipeName">Recipe name</label>
              <input
                type="text"
                name="name"
                id="recipeName"
                value={name}
                className="form-control"
                required
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                value={ingredients}
                className="form-control"
                required
                onChange={onChange}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              name="instruction"
              id="instruction"
              rows="5"
              value={instruction}
              required
              onChange={onChange}
            />
            <button type="submit" className="btn custom-button mt-3">
              Update Recipe
            </button>
            <Link to="/recipes" className="btn btn-link mt-3">
              Back to recipes
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
