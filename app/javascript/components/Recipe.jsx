import React, { useState, useEffect } from 'react';
import { Link/*, useParams*/ } from 'react-router-dom';

export default function Recipe(props) {
// class Recipe extends React.Component {
  const [recipe, setRecipe] = useState({ ingredients: '' });

  // constructor(props) {
  //   super(props);
  //   this.state = { recipe: { ingredients: '' } };
  //   this.addHtmlEntities = this.addHtmlEntities.bind(this);
  //   this.deleteRecipe = this.deleteRecipe.bind(this);
  // }

  useEffect(() => {
  // componentDidMount() {
    // const {
    //   match: {
    //     params: { id }
    //   }
    // } = this.props;

    const id = props.match.params.id;
    const url =`/api/v1/show/${id}`;

    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(response => setRecipe(response))
      .catch(() => props.history.push('/recipes'))
      // .then(response => this.setState({recipe: response }))
      // .catch(() => this.props.history.push('/recipes'))
  }, []);

  function addHtmlEntities(str) {
  // addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  function deleteRecipe() {
  // deleteRecipe() {
    const {
      match: {
        params: { id }
      }
    } = props;
    // } = this.props;
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'X-CSRF-Token': token,
        'Content-Type': 'application/json'
      }
    })
    .then(() => props.history.push('/recipes'))
    // .then(() => this.props.history.push('/recipes'))
    .catch(error => console.log(error.message));
  }

  // render() {
    // const { recipe } = this.state;
  let ingredientList = "No ingredients available";

  if (recipe.ingredients.length > 0) {
    ingredientList = recipe.ingredients
      .split(",")
      .map((ingredient, index) => (
        <li key={index} className="list-group-item">
          {ingredient}
        </li>
      ));
  }

  const recipeInstruction = addHtmlEntities(recipe.instruction);
  // const recipeInstruction = this.addHtmlEntities(recipe.instruction);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          className="img-fluid position-absolute"
        />
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {recipe.name}
        </h1>
      </div>
      <div className="container py-5">
        <div className="row">
          <div className="col-sm-12 col-lg-3">
            <ul className="list-group">
              <h5 className="mb-2">Ingredients</h5>
              {ingredientList}
            </ul>
          </div>
          <div className="col-sm-12 col-lg-7">
            <h5 className="mb-2">Preparation Instructions</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: `${recipeInstruction}`
              }}
            />
          </div>
          <div className="col-sm-12 col-lg-2">
            <button type="button" className="btn btn-danger" onClick={deleteRecipe}>
            {/*<button type="button" className="btn btn-danger" onClick={this.deleteRecipe}>*/}
              Delete Recipe
            </button>
            <Link to={`/recipe/${recipe.id}/edit`} className="btn btn-warning mt-2">
            Edit Recipe
          </Link>
          </div>
        </div>
        <Link to="/recipes" className="btn btn-link">
          Back to recipes
        </Link>
      </div>
    </div>
  );
  // }

}

// export default Recipe;


// v***********************************************v
// v Original code from the tutorial without hooks v
// v***********************************************v

// import React from 'react';
// import { Link } from 'react-router-dom';

// class Recipe extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { recipe: { ingredients: '' } };
//     this.addHtmlEntities = this.addHtmlEntities.bind(this);
//     this.deleteRecipe = this.deleteRecipe.bind(this);
//   }

//   componentDidMount() {
//     const {
//       match: {
//         params: { id }
//       }
//     } = this.props;

//     const url =`/api/v1/show/${id}`

//     fetch(url)
//       .then(response => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error('Network response was not ok.');
//       })
//       .then(response => this.setState({recipe: response }))
//       .catch(() => this.props.history.push('/recipes'))
//   }

//   addHtmlEntities(str) {
//     return String(str)
//       .replace(/&lt;/g, '<')
//       .replace(/&gt;/g, '>');
//   }

//   deleteRecipe() {
//     const {
//       match: {
//         params: { id }
//       }
//     } = this.props;
//     const url = `/api/v1/destroy/${id}`;
//     const token = document.querySelector('meta[name="csrf-token"]').content;

//     fetch(url, {
//       method: 'DELETE',
//       headers: {
//         'X-CSRF-Token': token,
//         'Content-Type': 'application/json'
//       }
//     })
//     .then(() => this.props.history.push('/recipes'))
//     .catch(error => console.log(error.message));
//   }

//   render() {
//     const { recipe } = this.state;
//     let ingredientList = "No ingredients available";

//     if (recipe.ingredients.length > 0) {
//       ingredientList = recipe.ingredients
//         .split(",")
//         .map((ingredient, index) => (
//           <li key={index} className="list-group-item">
//             {ingredient}
//           </li>
//         ));
//     }

//     const recipeInstruction = this.addHtmlEntities(recipe.instruction);

//     return (
//       <div className="">
//         <div className="hero position-relative d-flex align-items-center justify-content-center">
//           <img
//             src={recipe.image}
//             alt={`${recipe.name} image`}
//             className="img-fluid position-absolute"
//           />
//           <div className="overlay bg-dark position-absolute" />
//           <h1 className="display-4 position-relative text-white">
//             {recipe.name}
//           </h1>
//         </div>
//         <div className="container py-5">
//           <div className="row">
//             <div className="col-sm-12 col-lg-3">
//               <ul className="list-group">
//                 <h5 className="mb-2">Ingredients</h5>
//                 {ingredientList}
//               </ul>
//             </div>
//             <div className="col-sm-12 col-lg-7">
//               <h5 className="mb-2">Preparation Instructions</h5>
//               <div
//                 dangerouslySetInnerHTML={{
//                   __html: `${recipeInstruction}`
//                 }}
//               />
//             </div>
//             <div className="col-sm-12 col-lg-2">
//               <button type="button" className="btn btn-danger" onClick={this.deleteRecipe}>
//                 Delete Recipe
//               </button>
//             </div>
//           </div>
//           <Link to="/recipes" className="btn btn-link">
//             Back to recipes
//           </Link>
//         </div>
//       </div>
//     );
//   }

// }

// export default Recipe;
