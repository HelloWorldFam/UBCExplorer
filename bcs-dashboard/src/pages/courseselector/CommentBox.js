import React, { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";
import { isEmpty } from "lodash";

function CommentBox({ courseCode, courseNum, url }) {
  const [disqusConfig, setDisqusConfig] = useState({});

  useEffect(() => {
    setDisqusConfig({
      url: window.location.href.slice(0,-1) + url,    // Must use .slice(0,-1), as the variable url starts with '/'
      identifier: `${courseCode}${courseNum}`,
      title: `${courseCode}${courseNum}`,
    });
  }, [courseCode, courseNum, url]);

  return (
    <div className="article-container">
      <h4>UBC Explorer Comment Box</h4>
      <p>
        Interested in becoming a moderator to help keep the community clean?{" "}
        <b>Apply.</b>
      </p>
      {!isEmpty(disqusConfig) && (
        <DiscussionEmbed shortname="ubcexplorer2" config={disqusConfig} />
      )}
    </div>
  );
}

export default CommentBox;
