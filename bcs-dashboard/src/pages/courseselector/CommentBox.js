import React, { useState, useEffect } from "react";
// import jsboxscript from "./commentboxscript";

function scriptContents() {
  var disqus_config = function () {
    this.page.url = "ubcexplorer.io"; // Replace PAGE_URL with your page's canonical URL variable
    this.page.identifier = "CPSC210"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable (our prop)
  };
  var d = document,
    s = d.createElement("script");
  s.src = "https://ubcexplorer.disqus.com/embed.js";
  s.setAttribute("data-timestamp", +new Date());
  (d.head || d.body).appendChild(s);
}

function CommentBox() {
  return (
    <div>
      <div id="disqus_thread"></div>
      <script>{scriptContents()}</script>
      <p>Comment Box</p>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">
          comments powered by Disqus.
        </a>
      </noscript>
    </div>
  );
}

export default CommentBox;
