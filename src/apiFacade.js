import URL from "./settings";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };


const fetchCategories = () => {
  const options = makeOptions("GET", true);
  return fetch(URL + "/api/food/categoriesp").then(handleHttpErrors)
}

const fetchRecipes = (category, kind) => {
  const options = makeOptions("GET", true);
  return fetch(URL + "/api/food/categories/" + kind + "/" + category).then(handleHttpErrors)
}

const fetchRecipe = (id) => {
  const options = makeOptions("GET", true);
  console.log(id)
  return fetch(URL + "/api/food/" + id).then(handleHttpErrors)
}
const saveRecipe = (id) => {
  const options = makeOptions("POST", true, id);
  console.log(id)
  return fetch(URL + "/api/info/savemeal", options).then(handleHttpErrors)
}

const fetchSavedMeals = (id) => {
  const options = makeOptions("GET", true);
  console.log(id)
  return fetch(URL + "/api/info/savedmeals", options).then(handleHttpErrors)
}
  const fetchData = (role) => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/" + role, options).then(handleHttpErrors);
  };

  const fetchStarWarsData = () => {
    const options = makeOptions("GET", true); //True add's the token
    return fetch(URL + "/api/info/allfilms",options).then(handleHttpErrors);
  };

  const likeMovie = (body) => {
    const options = makeOptions("POST", true, body); //True add's the token
    return fetch(URL + "/api/info/likefilm",options).then(handleHttpErrors);
  };

  const dislikeMovie = (body) => {
    const options = makeOptions("POST", true, body); //True add's the token
    return fetch(URL + "/api/info/dislikefilm",options).then(handleHttpErrors);
  };

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
      console.log(getToken())
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };
  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };
  const loggedIn = () => {
    const loggedIn = getToken() != null;
    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchStarWarsData,
    likeMovie,
    dislikeMovie,
    fetchCategories,
    fetchRecipes,
    fetchRecipe,
    saveRecipe,
    fetchSavedMeals
  };
}
const facade = apiFacade();
export default facade;
