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
  }, [searchedValue])

  useEffect(() => {
    const urlArray = window.location.pathname.split("/");

    if (urlArray.length === 4 && urlArray[1] === "course") {
      setSearchedValue(`${urlArray[2]} ${urlArray[3]}`);
    }
  }, [history.location])

  useEffect(() => {
    const urlArray = window.location.pathname.split("/");

    if (urlArray.length === 4 && urlArray[1] === "course") {
      handleResultSelect(null, {
        result: { title: `${urlArray[2]} ${urlArray[3]}` },
      });
    }
  }, []);

  useEffect(() => {
    // Sets focus to search component on window load
    try {
      if (window.location.pathname === "/")
        document
          .querySelector(
            "#root > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-6 > div:nth-child(1) > div > div > div > div > div > div:nth-child(1) > div > div.ui.fluid.icon.input > input"
          )
          .focus();
      else if (window.location.pathname === "/bcs/courseselector")
        document
          .querySelector(
            "#root > div > div.sc-fzoYkl.hfPoTr > div > div:nth-child(3) > div:nth-child(1) > div > div > div > div > div > div > form > div:nth-child(1) > div > div.ui.fluid.icon.input > input"
          )
          .focus();
    } catch (error) {
      console.log("Document failed to select search component. ", error);
    }
  }, []);

  const handleResultSelect = (e, { result }) => {
    setValue(result.title);
    props.onChange(result.title);
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
          (window.location.host === "ubcexplorer.io"
            ? ""
            : "http://localhost:5000") +
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
