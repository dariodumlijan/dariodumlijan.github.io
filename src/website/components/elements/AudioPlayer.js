// @flow
import React, { useRef, useState } from "react";
import type { Node } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/_colors.scss";

type Song = {
  title: string,
  url: string,
};

type Props = {
  songs: Song[],
  onPress: Function,
};

function AudioPlayer(props: Props): Node {
  const [selected, setSelected] = useState(props.songs[0]);
  const [play, setPlay] = useState(false);
  const [mute, setMute] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const audio = useRef(new Audio(selected.url));
  const colorKey = "--primary-color";

  const getRootStyle = (key: string): string => {
    const doc: any = document.documentElement;
    if (!doc) return "";

    return doc.style.getPropertyValue(key);
  };

  const calcPercentage = (value: number, total: number): number =>
    (value * 100) / total;

  const progressPercent: string =
    Math.round(
      calcPercentage(progress, Math.round(audio.current.duration) || 100)
    ) + "%";
  const volumePercent: string = Math.round(calcPercentage(volume, 1)) + "%";

  const progressStyle = {
    background: `linear-gradient(90deg, ${colors.primary}, ${
      colors.primary
    } ${progressPercent}, ${getRootStyle(
      colorKey
    )}66 ${progressPercent}, ${getRootStyle(colorKey)}66 100%)`,
  };
  const volumeStyle = {
    background: `linear-gradient(90deg, ${colors.primary}, ${
      colors.primary
    } ${volumePercent}, ${getRootStyle(
      colorKey
    )}66 ${volumePercent}, ${getRootStyle(colorKey)}66 100%)`,
  };

  /*
  const handleDownload = () => {
    audio.current.download()
  };
  */

  audio.current.ontimeupdate = () => {
    setProgress(Math.round(audio.current.currentTime));
  };

  const handlePlay = (shouldPlay: boolean) => {
    setPlay(shouldPlay);
    props.onPress(shouldPlay);

    if (shouldPlay) audio.current.play();
    else audio.current.pause();
  };

  const handleSeek = (seek: number) => {
    audio.current.currentTime = seek;
    setProgress(seek);
  };

  const handleVolume = (vol: number) => {
    audio.current.volume = vol;
    if (vol >= 0.1) setMute(false);
    if (vol === 0) {
      setMute(true);

      return;
    }
    setVolume(vol);
  };

  const handleMute = (shouldMute: boolean) => {
    setMute(shouldMute);
    if (shouldMute) audio.current.volume = 0;
    else audio.current.volume = volume;
  };

  const handleSongChange = (song) => {
    setSelected(song);
    audio.current = new Audio(song.url);
    setPlay(true);
    handlePlay(true);
  };

  return (
    <div className="player-wrapper">
      <div className="master-player">
        <input
          style={progressStyle}
          className="progress"
          type="range"
          min={0}
          max={Math.round(audio.current.duration) || 100}
          step={1}
          value={progress}
          onChange={(e) => handleSeek(Number(e.target.value))}
        />
        <div className="controls">
          <FontAwesomeIcon
            className="player-icon"
            icon={play ? faPause : faPlay}
            onClick={() => handlePlay(!play)}
          />
          <span className="player-title">{selected.title}</span>
          <div className="player-volume">
            <input
              style={volumeStyle}
              className="volume"
              type="range"
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={(e) => handleVolume(Number(e.target.value))}
            />
            <FontAwesomeIcon
              className="sound-icon"
              icon={mute ? faVolumeMute : faVolumeUp}
              onClick={() => handleMute(!mute)}
            />
          </div>
          {/* <FontAwesomeIcon
            className="download-icon"
            icon={faDownload}
            onClick={handleDownload}
          /> */}
        </div>
      </div>
      <div className="songs-list">
        {props.songs.map((song) => (
          <div
            key={song.title}
            className="song-item"
            onClick={() => handleSongChange(song)}
          >
            <span>{song.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AudioPlayer;
