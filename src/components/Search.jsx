import React from 'react'

const Search= ({searchname,setsearchname}) => {
  return (
    <div className="search">
    <div className>
        <img src="search2.svg" alt="search bar"/>

        <input 
            type="text"
            placeholder="Watcha u lookin' for ?"
            value={searchname}
            onChange={(e) => setsearchname(e.target.value)}
        />
        </div>
    </div>
  )
}

export default Search