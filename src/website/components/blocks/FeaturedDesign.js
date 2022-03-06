// @flow
import React from "react";
import type { Node } from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import PhoneModel from "../../assets/svg-components/PhoneModel";
import MonitorModel from "../../assets/svg-components/MonitorModel";
import contentfulToReact from "../../utils/cmsRichText";

type Props = {
  data: Object,
};

function FeaturedDesign(props: Props): Node {
  const { data } = props;

  const handleModel = (): Node => {
    if (data.projectType === "App") {
      return (
        <>
          <PhoneModel className="project-svg" />
          {data.img && (
            <img
              src={data.img.url}
              alt="project-phone"
              className="project-phone-image"
            />
          )}
        </>
      );
    }
    if (data.projectType === "Web") {
      return (
        <>
          <MonitorModel className="project-svg" />
          {data.img && (
            <img
              src={data.img.url}
              alt="project-monitor"
              className="project-monitor-image"
            />
          )}
        </>
      );
    }

    return null;
  };

  return (
    <div className="project-wrapper">
      <div className="artwork-wrapper">{handleModel()}</div>
      <div className="content-wrapper">
        <h1 className="content-title">{data.title}</h1>
        <div className="links-wrapper">
          {data.links.map((link) => (
            <a key={link.id} href={link.value}>
              {link.key}
            </a>
          ))}
        </div>
        {data.description && (
          <div className="content-description rich-content">
            {documentToReactComponents(
              data.description.json,
              contentfulToReact()
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default FeaturedDesign;
