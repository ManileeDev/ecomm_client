import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function Search({searchVal}) {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    searchVal(search)
  }

  const onChangeSearch = (e) => {
    setSearch(e.target.value)
    searchVal(e.target.value)
  }

  return (
    <div className="s-bg">
      <div className="search">
        <input
          type="text"
          onChange={onChangeSearch}
          className="search-bar"
          placeholder="Search"
        />
        <span className="search-icon" onClick={handleSearch}>
          <IoSearch />
        </span>
      </div>
    </div>
  );
}
