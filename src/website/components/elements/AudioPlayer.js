// @flow
import React, { useEffect, useRef, useState } from 'react';
import type { Node } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faVolumeMute,
  faVolumeUp,
  faDownload,
} from '@fortawesome/free-solid-svg-icons';
import colors from '../../styles/_colors.scss';

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

  const calcPercentage = (value: number, total: number): number => (value * 100) / total;

  const progressPercent: string = Math.round(
    calcPercentage(progress, Math.round(audio.current.duration) || 100),
  ) + '%';
  const volumePercent: string = Math.round(calcPercentage(volume, 1)) + '%';

  const handleHEX = (hex: string): string => {
    if (hex.length === 7) return hex;
    const newColor: string[] = Array.from(hex);

    return (
      newColor[0]
      + newColor[1]
      + newColor[1]
      + newColor[2]
      + newColor[2]
      + newColor[3]
      + newColor[3]
    );
  };

  const progressStyle = {
    background: `linear-gradient(90deg, ${colors.primary}, ${
      colors.primary
    } ${progressPercent}, ${handleHEX(
      colors.primaryMusic,
    )}66 ${progressPercent}, ${handleHEX(colors.primaryMusic)}66 100%)`,
  };
  const volumeStyle = {
    background: `linear-gradient(90deg, ${colors.primary}, ${
      colors.primary
    } ${volumePercent}, ${handleHEX(
      colors.primaryMusic,
    )}66 ${volumePercent}, ${handleHEX(colors.primaryMusic)}66 100%)`,
  };

  audio.current.ontimeupdate = () => {
    const currentTime = Math.round(audio.current.currentTime);
    if (currentTime === Math.round(audio.current.duration)) {
      props.onPress(false);
      audio.current.pause();
      audio.current.currentTime = 0;
      setProgress(0);
      setPlay(false);

      return;
    }

    setProgress(currentTime);
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

  useEffect(() => {
    props.onPress(false);
    audio.current.pause();
    audio.current.currentTime = 0;
    setProgress(0);
    setVolume(0.8);
    setMute(false);
    setPlay(false);
    setSelected(props.songs[0]);
    audio.current = new Audio(props.songs[0].url);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.songs]);

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
          <a
            href={selected.url}
            target="_blank"
            download
            className="download-icon"
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
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
