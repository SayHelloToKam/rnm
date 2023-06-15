import React, { useEffect, useState } from "react";
import "./Homepage.css";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

function Homepage() {
  //show the characters when the page loads
  //create state to hold the characters
  const [characters, setCharacters] = useState([]);
  //https://rickandmortyapi.com/api/character
  useEffect(
    () => {
      console.log("homepage loaded");
      //make api call to get data
      axios
        .get(`https://rickandmortyapi.com/api/character`)
        .then((res) => {
          console.log(res.data.results);
          //I have the data, what do I do with it?
          //store in state
          setCharacters(res.data.results);
        })
        .catch((err) => console.log(err));
    },
    [] //runs once only when page loads
  );

  return (
    <div className='homepage-container'>
      <h1>Main Characters</h1>
      <div className='characters-container'>
        {
          characters.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))
          // characters.map(item => <p>{item.name}</p>)
        }
      </div>
    </div>
  );
}

export default Homepage;
