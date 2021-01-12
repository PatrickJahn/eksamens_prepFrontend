import { render } from "@testing-library/react";
import { useEffect, useState } from "react";
import facade from "./apiFacade";
import URL from "./settings";
export default function StarWars({ fetchedData }) {

 

  return (
    <div class="bb">

<h1>The Star Wars Movies</h1>
<div>{mapMovies(fetchedData)}</div>

    </div>
  );

  function mapMovies(){

  
      
      try {
        let imgUrl;
    let returned = fetchedData.map((data, index) => {

      imgUrl = getImageUrl(index, imgUrl);

      let buttonName = data.liked ? "Dislike" : "Like"
      

  let filmUrl =  "https://swapi.dev/api/films/" + (index + 1) + "/";

      return (
    <div class="card">
       <img src={imgUrl} />
     <div class="container">
        <h3><b>{data.title}</b> </h3> 
        <p>{data.opening_crawl}</p> 
        <h4><b>{data.release_date}</b></h4>
     <button class="button" onClick={() => likemovie(filmUrl, buttonName) }>{buttonName}</button> 
     </div>
    </div>
      );
    });
  
    return returned;
    } catch(err) {
      console.log(err)
    }

    }


    function likemovie(filmUrl, buttonName){
      const jwt = require("jsonwebtoken");
      const token = localStorage.getItem("jwtToken");
      const user = jwt.decode(token).username;
      if (buttonName == "Like"){

       
      facade.likeMovie({username : user, url : filmUrl });
    } else {
      console.log("Dislike")
    facade.dislikeMovie({username : user, url : filmUrl });
      
    }


    }

  function getImageUrl(index, imgUrl) {
    switch (index) {
      case 0:
        imgUrl = "https://images-na.ssl-images-amazon.com/images/I/A1wnJQFI82L._AC_SY879_.jpg";
        break;

      case 1:
        imgUrl = "https://caragaleblog.files.wordpress.com/2014/03/star-wars-empire-strikes-back.jpg";
        break;
      case 2:
        imgUrl = "http://gamequiche.com/wp-content/uploads/2016/12/star_wars_return_of_the_jedi.jpg";
        break;
      case 3:
        imgUrl = "https://fanart.tv/fanart/movies/1893/movieposter/star-wars-episode-i---the-phantom-menace-5ad0329fed805.jpg";
        break;
      case 4:
        imgUrl = "https://fanart.tv/fanart/movies/1894/movieposter/star-wars-episode-ii---attack-of-the-clones-522a838fd5dd5.jpg";
        break;
      case 5:
        imgUrl = "https://wallpapercave.com/wp/wp3054783.jpg";
        break;
      default:
        imgUrl = "https://caragaleblog.files.wordpress.com/2014/03/star-wars-empire-strikes-back.jpg";
    }
    return imgUrl;
  }
}



