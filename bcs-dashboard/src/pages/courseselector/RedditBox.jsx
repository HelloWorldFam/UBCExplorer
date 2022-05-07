import React, { useEffect, useState } from "react";
import axios from "axios";
import { color } from "@material-ui/system";

// https://www.reddit.com/dev/api/#GET_search

function RedditBox({ courseCode, courseNum }) {
  const [redditResult, setRedditResult] = useState([]);

  useEffect(() => {
    (async () => {
      const {
        data: {
          data: { children: results },
        },
      } = await axios.get(
        `https://www.reddit.com/r/ubc/search.json?q=${courseCode}%20${courseNum}&restrict_sr=on`
      );

      const json = results
        .sort((a, b) => (a.data.ups < b.data.ups ? 1 : -1))
        .map((posting) => {
          const { title, ups, created_utc, permalink, name } = posting.data;
          return {
            name,
            title,
            upvotes: ups,
            date_created: new Date(created_utc * 1000),
            url: `https://www.reddit.com${permalink}`,
          };
        });

      setRedditResult(json);
    })();
    // .sort((a, b) => a.data.created_utc < b/data.created_utc ?  1: - 1)
  }, [courseCode, courseNum]);

  return (
    <div className="article-container">
      <h4>/r/UBC Reddit Box</h4>

      {redditResult &&
        redditResult.map((entry) => {
          return (
            <a
              href={entry.url}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <div
                style={{
                  border: "1px solid grey",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "left",
                  minHeight: "65px",
                  padding: "5px",
                  marginBottom: "10px",
                  borderRadius: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: "30px",
                  }}
                >
                  <img
                    src="https://i.imgur.com/PujrP7q.png"
                    height="10px"
                    width="10px"
                  />
                  <div>{entry.upvotes}</div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "20px",
                  }}
                >
                  {" "}
                  <p style={{ margin: 0 }}>{entry.title}</p>
                  <p style={{ margin: 0, marginTop: '5px', fontSize: "12px" }}>
                    Created At: {entry.date_created.toDateString()}
                  </p>
                </div>
                <br />
              </div>
            </a>
          );
        })}
    </div>
  );
}

export default RedditBox;
