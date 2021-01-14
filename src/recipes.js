
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";

export default function Recipes({kind, category}){


    const [recipes, setRecipes] = useState([])
    var n = category.indexOf("/", 1) + 1;


    useEffect(() =>{
        var cat = category.substr(n);
      cat = cat.replaceAll(" ", "_");
 
        
       facade.fetchRecipes(cat, kind).then((data)=> {
        setRecipes(data)
        console.log(data)
       })


    },[])

 


 return (
     <>

    <h1 className="recipesH">{category.substr(n) + " Recipes"}</h1>
    <div className="recipes">
 
    {recipes.map((item, index) =>{


      return (        
      
       
        <div className="recipesBox">
            <div className="saveIcon" onClick={() => saveItem(item.idMeal ? {id : item.idMeal } : item.idDrink)}> </div>
         <NavLink exact activeClassName="" to={"/recipe/" + (item.idMeal ? "meal" : "drink") + "/" + (item.idMeal ? item.idMeal : item.idDrink)}> 
        <img src={item.strMealThumb ? item.strMealThumb : item.strDrinkThumb}></img>
        <h3>{item.strMeal ? item.strMeal : item.strDrink}</h3>
        </NavLink>
        </div>

   
          )
    })}
    </div>
    </>
 )   
 
}

function saveItem(id) {
    facade.saveRecipe(id).then((data) => {
        console.log(data)
    }).catch((err) =>{console.log(err)})
}
