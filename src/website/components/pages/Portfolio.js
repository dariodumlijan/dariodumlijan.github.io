// @flow
import React, { useEffect } from "react";
import type { Node } from "react";
import PortfolioMusic from "../blocks/PortfolioMusic";
import PortfolioDesign from "../blocks/PortfolioDesign";
import { useLocationInfo } from "../../utils";

type Props = {
  title: string,
};

function Portfolio(props: Props): Node {
  const locationInfo = useLocationInfo();

  useEffect(() => {
    document.title += props.title;
  }, [props.title]);

  if (locationInfo.isDesign) return <PortfolioDesign />;
  if (locationInfo.isMusic) return <PortfolioMusic />;

  return null;
}

export default Portfolio;
