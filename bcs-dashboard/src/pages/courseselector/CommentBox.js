import React from "react";
import { DiscussionEmbed } from "disqus-react";

function CommentBox() {
  const disqusShortname = "ubcexplorer";

  
  const disqusConfig = {
    url: "http://localhost:3000",
    identifier: "article-id",
    title: "Title of Your Article2",
  };

  return (
    <div className="article-container">
      <p>Page content.</p>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </div>
  );
}

export default CommentBox;
