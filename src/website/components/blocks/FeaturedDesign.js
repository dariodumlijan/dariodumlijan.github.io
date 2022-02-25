import React from "react";
import type { Node } from "react";

type Props = {
  data: Object,
};

function FeaturedDesign(props: Props): Node {
  const { data } = props;

  return (
    <div className="project-wrapper">
      <div className="artwork-wrapper">
        {data.img && (
          <img className="" src={data.img.url} alt={data.img.title} />
        )}
      </div>
      <div className="content-wrapper">
        <h1 className="content-title">{data.title}</h1>
        <div className="links-wrapper">
          {data.links.map((link) => (
            <a key={link.id} href={link.value}>
              {link.key}
            </a>
          ))}
        </div>
        <p className="content-description">{data.description}</p>
      </div>
    </div>
  );
}

export default FeaturedDesign;
