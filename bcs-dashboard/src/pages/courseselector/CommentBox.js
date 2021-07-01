import React, { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";
import { isEmpty } from "lodash";

function CommentBox({ courseCode, courseNum, url }) {
  const [disqusConfig, setDisqusConfig] = useState({});

  useEffect(() => {
    setDisqusConfig({
      url: window.location.origin + url, 
      identifier: `${courseCode}${courseNum}`,
      title: `${courseCode}${courseNum}`,
    });
  }, [courseCode, courseNum, url]);

  return (
    <div className="article-container">
      <h4>UBC Explorer Comment Box</h4>
      <p>
        Interested in becoming a moderator to help keep the community clean?{" "}
        <b>
          <a href="https://forms.gle/64LnAw5RrNi3HtKM8">Apply</a>.
        </b>
      </p>
      {!isEmpty(disqusConfig) && (
        <DiscussionEmbed shortname="ubcexplorer2" config={disqusConfig} />
      )}
    </div>
  );
}

export default CommentBox;
