import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
// import { makeStyles } from '@material-ui/styles';

// const useStyles = makeStyles({
//   VideoPlayer: {},
//   controls: {}
// });

const VIdeoPlayerFun = ({ src }) => {
  // const classes = useStyles();
  const [formattedTime, setFormattedTime] = useState();
  const [formattedLength, setFormattedLength] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [muted, setMuted] = useState();
  const [paused, setPaused] = useState();
  const [length, setLength] = useState();
  const [volume, setVolume] = useState();
  const videoRef = useRef();
  const volumeRangeRef = useRef();
  const timeRangeRef = useRef();

  const setVolumeRange = () => {
    const volumeRange = volumeRangeRef.current;
    videoRef.current.volume = volumeRange.value;
    setVolume(volumeRange.value);
    if (volumeRange.value === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const toHHMMSS = value => {
    const secNum = parseInt(value, 10);
    let hours = Math.floor(secNum / 3600);
    let minutes = Math.floor((secNum - hours * 3600) / 60);
    let seconds = secNum - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return `${hours}:${minutes}:${seconds}`;
  };

  const getDuration = () => {
    let { duration } = videoRef.current;
    duration = duration.toFixed();
    const formattedTimeLength = toHHMMSS(duration);
    setFormattedLength(formattedTimeLength);
    setLength(duration);
    return duration;
  };

  const setTimeRange = () => {
    const timeRange = timeRangeRef.current;
    videoRef.current.currentTime = timeRange.value;
    setCurrentTime(timeRange.value);
  };

  const onMute = () => {
    const video = videoRef.current;
    video.muted = true;
    setMuted(true);
    if (muted === true) {
      video.muted = false;
      setMuted(false);
    } else {
      video.muted = true;
      setMuted(true);
    }
  };

  const customVolume = () => {
    const volumeRange = volumeRangeRef.current;
    videoRef.current.volume = volumeRange.value;
    setVolume(volumeRange.value);

    if (volumeRange.value === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const onPlay = () => {
    getDuration();
    const video = videoRef.current;
    setPaused(!paused);
    if (paused === true) {
      video.play();
      setPaused(false);
    } else {
      video.pause();
      setPaused(true);
    }
  };

  const setCustomCurrentTime = () => {
    let cur = videoRef.current.currentTime;
    cur = cur.toFixed();
    const time = toHHMMSS(cur);
    setCurrentTime(cur);
    setFormattedTime(time);
    if (parseInt(currentTime, 1) === parseInt(length, 1)) {
      setPaused(true);
    }
    return cur;
  };

  useEffect(() => {
    customVolume();
    setInterval(() => {
      setCurrentTime(setCustomCurrentTime());
      setLength(getDuration());
    }, 10);
  }, []);

  return (
    <Box className="VideoPlayer">
      <video ref={videoRef} width="500" height="auto">
        <track kind="captions" />
        <source src={src} type="video/mp4" />
      </video>

      <Box className="controls">
        <button type="button" onClick={onPlay} className="play_pause_btn">
          {paused ? 'Pa' : 'Pl'}
        </button>

        <span className="time">
          <span className="video_time">{formattedTime}</span>
          <span> / </span>
          <span className="video_length">{formattedLength}</span>
        </span>

        <input
          type="range"
          className="timeRange"
          ref={timeRangeRef}
          onChange={setTimeRange}
          value={currentTime}
          step={0.1}
          min={0}
          max={length}
        />

        <button type="button" onClick={onMute} className="mute_unmute_btn">
          {muted ? 'MU' : 'UM'}
        </button>

        <input
          type="range"
          className="volumeRange"
          ref={volumeRangeRef}
          onChange={setVolumeRange}
          value={volume}
          step={0.1}
          min={0}
          max={1}
        />
      </Box>
    </Box>
  );
};

VIdeoPlayerFun.propTypes = {
  src: PropTypes.string
};

export default VIdeoPlayerFun;
