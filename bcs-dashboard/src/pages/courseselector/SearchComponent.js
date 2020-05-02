import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Search } from "semantic-ui-react";
import "./semantic.css";
import axios from "axios";

export default function SearchComponent(props) {
  const [isLoading, setisLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleResultSelect = (e, { result }) => setValue(result.code);

  useEffect(() => {
    console.log(results);
  },[results]);

  const handleSearchChange = (e, { value }) => {
    setisLoading(true);
    setValue(value);

    setTimeout(() => {
      if (value.length < 1) {
        setisLoading(false);
        setResults([]);
        setValue("");
        return;
      }

      axios
        .get("http://localhost:3000/searchAny/" + value)
        .then((res) => {
          setisLoading(false);
          setResults((results) => [...res.data]);
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    }, 300);

  };
  return (
    <div>
      <Search
        input={{ fluid: true }}
        loading={isLoading}
        onResultSelect={handleResultSelect}
        onSearchChange={_.debounce(handleSearchChange, 500, {
          leading: true,
        })}
        results={results}
        value={value}
        {...props}
      />
    </div>
  );
}
