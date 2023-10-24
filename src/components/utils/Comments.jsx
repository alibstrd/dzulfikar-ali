import React, { useRef } from "react";
import useScript from "../../lib/use-script";

const id = "comments-container";
const Comments = () => {
  const comment = useRef(null);

  const status = useScript({
    url: "https://utteranc.es/client.js",
    theme: "icy-dark",
    issueTerm: "url",
    repo: "alibstrd/dzulfikar-ali",
    ref: comment,
    id: id,
  });

  return <div className="w-full">{<div ref={comment} id={id}></div>}</div>;
};

export default Comments;
