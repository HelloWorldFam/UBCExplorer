import React, { useState, useEffect } from "react";
import jsboxscript from "./commentboxscript"

function CommentBox() {
 
  return (
    <div>
    <div id="disqus_thread"></div>
    <script src = "jsboxscript"></script>
    <p>Comment Box</p>
    <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    </div>
  );
}

export default CommentBox;
