import React, { useEffect, useState } from "react";
import { DiscussionEmbed } from "disqus-react";

function CommentBox({ courseCode, courseNum, url }) {
  const [disqusConfig, setDisqusConfig] = useState({});

  useEffect(() => {
    setDisqusConfig({
      url: `https://ubcexplorer.io${url}`,
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
      <DiscussionEmbed shortname="ubcexplorer" config={disqusConfig} />
    </div>
  );
}

export default CommentBox;
