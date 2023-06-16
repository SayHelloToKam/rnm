import React from "react";
import "./Search.css";
import axios from "axios";

//                catch the props
function Search({ setCharacters }) {
  //need state to hold user input
  const [query, setQuery] = React.useState("");

  //https://rickandmortyapi.com/api/character/?name=rick

  const handleSubmit = (e) => {
    //stop page from refreshing
    e.preventDefault();
    console.log("search", query);

    // I need to make an api call to find matching characters
    axios
      .get(`https://rickandmortyapi.com/api/character/?name=${query}`)
      .then((res) => {
        console.log(res.data.results);
        // I have the data what do I do with it
        //change the data in characters
        setCharacters(res.data.results);
      })
      .catch((err) => {
        console.log(err.response.status);
        //check for character not found
        if (err.response.status === 404) {
          alert(`No character named ${query}`);
        }
      });

    //clear textbox
    setQuery("");
  };

  return (
    <form className='search-container' onSubmit={handleSubmit}>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search all characters'
      />
    </form>
  );
}

export default Search;
