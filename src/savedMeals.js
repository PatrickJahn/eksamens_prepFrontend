
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import facade from "./apiFacade";

export default function SavedMeals(){

    const [meals, setMeals] = useState([])

    useEffect(() => {

        facade.fetchSavedMeals().then((data) => {
            setMeals(data)
       
        })

    },[])



    return (
        <>

        <h1 className="recipesH">{"Saved Meals"}</h1>
        <div className="recipes">
     
        {meals.map((item) =>{
            

          return (        
          item.meals.map((item) => {
            return (
            <div className="recipesBox">
            <NavLink exact activeClassName="" to={"/recipe/" + (item.idMeal ? "meal" : "drink") + "/" + (item.idMeal ? item.idMeal : item.idDrink)}> 
           <img src={item.strMealThumb ? item.strMealThumb : item.strDrinkThumb}></img>
           <h3>{item.strMeal ? item.strMeal : item.strDrink}</h3>
           </NavLink>
           </div>
            )
          })
           
           
    
       
              )
        })}
        </div>
        </>
    )



}