import React, { useEffect, useState } from "react";
import "./Episodes.css";
import axios from "axios";
import CharacterCard from "../../components/CharacterCard/CharacterCard";

function Episodes() {
  //when page loads I need to create the dropdown UI
  //https://rickandmortyapi.com/api/episode

  //create state
  const [optionNumbers, setOptionNumbers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState([]);
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    //make an api call to find out how many episodes
    axios
      .get(`https://rickandmortyapi.com/api/episode`)
      .then((res) => {
        //I need to create an array of numbers
        const newOptions = [];
        for (let i = 1; i <= res.data.info.count; i++) {
          newOptions.push(i);
        }
        setOptionNumbers(newOptions);
      })
      .catch((err) => console.log(err));
  }, []);

  //function to call when I select an option
  const handleSelectChange = (e) => {
    //console.log(e.target.value);
    //save selection in state
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    //console.log(selectedOption);
    //need to get data for this episode
    //https://rickandmortyapi.com/api/episode/28
    //but then I need to make an api call for each
    //character in the episode
    //use async
    //asynch function returns a promise
    const fetchEpisodeData = async () => {
      try {
        //get specific episode data
        const res = await axios.get(
          `https://rickandmortyapi.com/api/episode/${selectedOption}`
        );
        //console.log(res.data);
        setSelectedEpisode(res.data);

        //res.data.characters is array with all
        //endpoints for characters in this episode
        const episodeCharacters = await Promise.all(
          res.data.characters.map((url) => {
            return axios.get(url).then((res) => res.data);
          })
        );
        console.log(episodeCharacters);
        //store in state
        setCharacterList(episodeCharacters);
      } catch (err) {
        console.log(err);
      }
    };

    //remember to call the function
    fetchEpisodeData();
  }, [selectedOption]);

  return (
    <div className='episodes-container'>
      <div>
        <label>Select an Episode</label>
        <select id='select-episode' onChange={handleSelectChange}>
          {optionNumbers.map((num) => {
            return <option key={num} value={num}>{`Episode ${num}`}</option>;
          })}
        </select>
      </div>
      <div>
        <div className='episode-info'>
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className='characters-container '>
          {characterList.map((item) => (
            <CharacterCard key={item.id} character={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Episodes;
