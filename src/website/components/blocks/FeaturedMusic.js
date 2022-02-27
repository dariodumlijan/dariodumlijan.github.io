// @flow
import React, { useState } from "react";
import type { Node } from "react";
import classNames from "classnames";
import AudioPlayer from "../elements/AudioPlayer";
import Vinyl from "../../assets/svg-components/Vinyl";

type Props = {
  data: Object,
};

function FeaturedMusic(props: Props): Node {
  const { data } = props;
  const [animate, setAnimate] = useState(false);
  const vinylClass = classNames("vinyl-cover", {
    animate,
  });

  return (
    <div className="project-wrapper">
      <div className="vinyl-wrapper">
        <img className={vinylClass} src={data.img.url} alt={data.img.title} />
        <Vinyl />
      </div>
      <div className="content-wrapper">
        <div className="content-credits">
          <h1 className="content-title">{data.title}</h1>
          <div className="content-links">
            <span>-</span>
            {data.links.map((link) => (
              <a key={link.id} href={link.value} className="content-artist">
                {link.key}
              </a>
            ))}
          </div>
        </div>
        <AudioPlayer
          songs={data.audioCollection.items}
          onPress={(isPlaying: boolean) => setAnimate(isPlaying)}
        />
        <p className="content-description">{data.description}</p>
      </div>
    </div>
  );
}

export default FeaturedMusic;
