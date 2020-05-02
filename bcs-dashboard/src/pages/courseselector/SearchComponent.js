import React, { useState, useEffect } from 'react';
import _ from "lodash";
import { Search } from "semantic-ui-react";
import faker from "faker";
import './semantic.css';

const source = _.times(5, () => ({
  title: faker.company.companyName(),
  description: faker.company.catchPhrase()
}));

export default function SearchComponent(props) {
  const [isLoading, setisLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");

  const handleResultSelect = (e, { result }) => setValue(result.title);
  useEffect(() => {
    console.log(source);
  },[]);

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

      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = (result) => re.test(result.title);

      setisLoading(false);
      setResults((results) => [..._.filter(source, isMatch)]);
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