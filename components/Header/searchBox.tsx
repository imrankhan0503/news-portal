"use client";

import { searchPosts, SearchPostType } from "@/lib/supabase/queries";
import Link from "next/link";

import { SetStateAction, useState } from "react";

const SearchBar = () => {
  const [input, setInput] = useState<string>("");
  const [searchPostResult, setSearchPostResult] =
    useState<SearchPostType | null>(null);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInput(e.target.value);
  };
  const handleClick = async () => {
    const { data, error } = await searchPosts(input);
    if (error) throw new Error();
    setSearchPostResult(data);
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="flex gap-2">
        <input
          onChange={handleChange}
          className="input-search-box"
          type="text"
          placeholder="Search Posts..."
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
        />
        <button
          onClick={handleClick}
          className="button-search-box whitespace-nowrap"
        >
          Search
        </button>
      </div>
      {searchPostResult && searchPostResult.length > 0 && (
        <div className="mt-4 overflow-hidden rounded-xl border border-(--line) p-2 inline-block">
          {searchPostResult.map((result, index) => (
            <Link key={index} href={`/${result.slug}`}>
              {result.title}
              <span className="text-lg text-(--accent) px-1">→</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
