import React, { useState } from "react";
import "../assets/css/App.css";
import Select from "react-select";

function SearchBar() {
  function handleChange(e) {
    setcriteria(e.value);
  }

  const options = [
    { value: "address", label: "Address" },
    { value: "transaction", label: "Transaction" },
  ];
  const [criteria, setcriteria] = useState("");

  return (
    <div className="search-container">
      <Select
        placeholder={<div>Select Search Criteria</div>}
        options={options}
        onChange={handleChange}
      ></Select>
      <form action={"/" + criteria} method="get">
        <input
          className="input"
          type="text"
          id="header-search"
          placeholder="Type here transaction hash/Block Number/Address"
          name="s"
        />
        <button type="submit" className="go-home-button">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
