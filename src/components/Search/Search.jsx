import React, { Fragment } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

const Search = ({ search, setSearch }) => {
  return (
    <div className="relative hidden sm:block pt-1">
      <MagnifyingGlassIcon className="h-6 w-6 inline-block absolute -translate-y-1/2 right-2 top-1/2 border-4 border-red-600 bg-red-600 rounded-full text-white hover:scale-105 transition duration-150 ease-in-out hover:cursor-pointer" />
      <input
        type="text"
        placeholder="Search food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="rounded-full w-full md:w-96 pl-5 h-10 outline outline-2 outline-red-600 shadow-md"
      />
    </div>
  );
};

export default Search;
