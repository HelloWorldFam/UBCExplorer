import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Search } from "semantic-ui-react";
import "./semantic.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function SearchComponent(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [value, setValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");

  const history = useHistory();

  useEffect(() => {
    if (searchedValue) {
      setValue(searchedValue);
      props.onChange(searchedValue);
    }
  }, [searchedValue]);

  useEffect(() => {
    const urlArray = window.location.pathname.split("/");

    if (urlArray.length === 4 && urlArray[1] === "course") {
      setSearchedValue(`${urlArray[2]} ${urlArray[3]}`);
      window.scrollTo(0, 0);
    }
  }, [history.location]);

  useEffect(() => {
    // Sets focus to search component on window load
    try {
      document.getElementsByClassName(
        "ui fluid icon input"
      )[0].children.item("input")
      .focus();
    } catch (error) {
      console.log("Document failed to select search component. ", error);
    }
  }, []);

  const handleResultSelect = (e, { result }) => {
    setSearchedValue(result.title);
  };

  const handleSearchChange = (e, { value }) => {
    setIsLoading(true);
    setValue(value);

    setTimeout(() => {
      if (value.length < 3) {
        setIsLoading(false);
        setResults([]);
        return;
      }

      axios
        .get(
          (window.location.hostname === "localhost"
            ? `http://${window.location.hostname}:5000`
            : window.location.origin) +
            "/searchAny/" +
            value
        )
        .then((res) => {
          if (!(res.data instanceof Array)) {
            setIsLoading(false);
            setResults([]);
            return;
          }
          setIsLoading(false);
          let array = [];
          for (let object of res.data) {
            let newObject = {
              title: object.code,
              description: object.name,
            };
            array.push(newObject);
          }
          setResults(array);
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
