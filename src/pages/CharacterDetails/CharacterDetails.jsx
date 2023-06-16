import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CharacterDetails.css";

function CharacterDetails() {
  //This page shows the details for a specific character
  //how do I know which one?
  //the id is in the url

  const { characterId } = useParams();

  //create state to hold character data
  const [character, setCharacter] = useState("");

  //https://rickandmortyapi.com/api/character/7
  //get the data when the page loads useEffect needed
  useEffect(() => {
    //console log to make useEffect is working
    //console.log("loaded happens");

    //make api call to get character data
    axios
      .get(`https://rickandmortyapi.com/api/character/${characterId}`)
      .then((res) => {
        //console.log(res.data);

        setCharacter(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='details-container'>
      <img src={character?.image} />
      <div className='container-info'>
        <p>Name: {character?.name}</p>
        <p>Gender: {character?.gender}</p>
        <p>Location: {character?.location?.name}</p>
        <p>Species: {character?.species}</p>
      </div>
    </div>
  );
}

export default CharacterDetails;
