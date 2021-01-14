import React, { useState, useEffect } from "react";
import facade from "./apiFacade";
import StarWars from "./starWars";
import WelcomePage from "./welcomePage";
import { Switch, Route, NavLink, useLocation } from "react-router-dom";
import LikedMovies from "./likedMovies";
import Recipes from "./recipes";
import Recipe from "./recipe";
import SavedMeals from "./savedMeals";


function Header({loggedIn}) {
  return (
    <div>
      <ul className="header">
        <li>
          <NavLink exact activeClassName="selected" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="selected" to="/LoginPage">
           {loggedIn ? (<> Log out</>) : (<>Login</>) } 
          </NavLink>
        </li>
        {loggedIn && (
          <li>
          <NavLink activeClassName="selected" to="/savedmeals">
            Saved meals
          </NavLink>
        </li>
        )}
        
  
      </ul>
    </div>
  );
}





function StarWarsPage() {
  const emptyData = {
    planetInfo: [{ name: "Loading..." }],
    characterInfo: [{ name: "Loading..." }],
  };
  const [fetchedData, setfetchedData] = useState(emptyData);
  const [fetchedDataError, setfetchedDataError] = useState("");

  useEffect(() => {
    facade.fetchStarWarsData().then((data) => {setfetchedData(data); }).catch(err => err.fullError).then(err => setfetchedDataError(err));
  }, []);

  if(fetchedDataError){
  return <h3>{fetchedDataError.message}</h3>
  }
  return <StarWars fetchedData={fetchedData} />;
}













function Home() {

  const [food, setFood] = useState([])
  const [drinks, setDrinks] = useState([])
  useEffect(() => {
    facade.fetchCategories().then((data) => {
     setFood(data.food)
     setDrinks(data.drink)
   
    })
  },[])
  return (
    <div className="categories">
      <h2>Food</h2>
      {food.map((item) =>{
        return (
          <NavLink exact activeClassName="" to={"/food/"+ item.strCategory}>
           
          <div className="categoryBox">
          <img src={item.strCategoryThumb}></img>
          <h3>{item.strCategory}</h3>
          </div>
          
          </NavLink>
            )
      })}
   
   <h2>Drinks</h2>
   {drinks.map((item) => {
     return (
      <NavLink exact activeClassName="" to={"/drink/"+ item.strCategory}>
      <div className="categoryBox">
      <h3>{item.strCategory}</h3>
      </div>
      </NavLink>
       )
   })}
    </div>

   // <WelcomePage/>
    );
}

function LoginPage({ setLoggedIn, loggedIn }) {
  const [loggedInError, setLoggedInError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => setLoggedIn(true))
      .catch((err) => err.fullError)
      .then((data) => setLoggedInError(data));
  };

  if (loggedInError) {
    return (
      <div>
        <LogIn login={login} />
        <h3>{loggedInError.message}</h3>
      </div>
    );
  }

  return (
    <div>
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

function LogIn({ login }) {
  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);

  const performLogin = (evt) => {
    evt.preventDefault();
    login(loginCredentials.username, loginCredentials.password);
  };
  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onChange={onChange}>
        <input placeholder="User Name" id="username" />
        <input type="password" placeholder="Password" id="password" />
        <button onClick={performLogin}>Login</button>
      </form>
    </div>
  );
}
function LoggedIn() {
  const [dataFromServer, setDataFromServer] = useState("");
  const jwt = require("jsonwebtoken");
  const token = localStorage.getItem("jwtToken");
  const role = jwt.decode(token).roles;
  console.log(jwt.decode(token))
  let roleToFetch = role;
  if (roleToFetch === "admin,user") {
    roleToFetch = "admin";
  }
  useEffect(() => {
    facade.fetchData(roleToFetch).then((data) => setDataFromServer(data.msg));
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>Role: {role}</h3>
    </div>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <Header loggedIn={loggedIn} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route  path="/food/">
          <Recipes kind="food" category={useLocation().pathname}/>
        </Route>
        <Route  path="/drink/">
          <Recipes kind="drink" category={useLocation().pathname}/>
        </Route>
        <Route  path="/recipe/meal">
          <Recipe kind="meal" foodid={useLocation().pathname}/>
        </Route>
        <Route  path="/recipe/drink">
          <Recipe kind="drink" foodid={useLocation().pathname}/>
        </Route>
        <Route  path="/savedmeals/">
          <SavedMeals />
        </Route>
        <Route exact path="/LoginPage">
          <LoginPage setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
        </Route>
        <Route exact path="/StarWarsPage">
          <StarWarsPage />
        </Route>
        <Route exact path="/LikedMovies">
          <LikedMovies />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
