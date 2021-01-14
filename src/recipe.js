import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";
import Recipes from "./recipes";


export default function Recipe({kind, foodid}){


    const [recipe, setRecipe] = useState([])

    var n = foodid.indexOf("/", 5) + 1;
    var recipeID = foodid.substr(n);
    useEffect(() => {
        
        facade.fetchRecipe(recipeID, kind).then((data) => {
            setRecipe(data)
            console.log(data)
        })


    },[])

    const getIngrindients = (item) => {
        var ins = ""; 
        for (var x = 1; x < 13; x++) {

            ins += item["strIngredient" + x] + " " + item["strMeasure" + x] + " \n"
        }
        ins +=""
       
        return (ins);
    }
    return (

        <div>
 
            {recipe.map((item) => {
                return (
                    <>
                    <h1 className="infoH"> {item.strMeal ? item.strMeal : item.strDrink}</h1>
                <div className="recipeInfoBox">
                    <img src={item.strMealThumb}></img>
                    <div>
                    <h4>{item.strInstructions}</h4>
                    <h4>Ingridients</h4>
                    <p>{getIngrindients(item)}</p>
                    </div>
                    </div>
                    </>
                )

            })}
        </div>
    
    )

}