import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  Player: {
    position: 'relative',
    maxWidth: 'fit-content',
    height: 'auto',
    display: 'flex',
    margin: '75px auto',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#000'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    padding: 6,
    borderRadius: '0px 0px 4px 4px',
    background: 'rgba(30, 30, 30, 0.75)',
    transition: 'all 0.25s ease-out'
  },
  button: {
    border: 'none',
    minWidth: 30,
    backgroundColor: 'transparent',
    '&:focus': {
      outline: 0
    }
  },
  time: {
    color: '#fff',
    fontSize: 12
  },
  range: {
    WebkitAppearance: 'none',
    width: 180,
    margin: '6px 0',
    background: 'none',
    '&:focus': {
      outline: 0
    },
    '&::-webkit-slider-runnable-track': {
      width: '100%',
      height: 6,
      cursor: 'pointer',
      boxShadow:
        '0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0)',
      background: '#796465',
      borderRadius: '1.9px',
      border: '0px solid rgba(1, 1, 1, 0)'
    },
    '&::-webkit-slider-thumb': {
      boxShadow:
        '0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0)',
      border: '0px solid rgba(0, 0, 0, 0)',
      height: 15,
      width: 15,
      borderRadius: 10,
      background: '#eeeeee',
      cursor: 'pointer',
      WebkitAppearance: 'none',
      marginTop: '-4px'
    }
  },
  volumeRange: {
    width: '50px !important'
  },
  timeRange: {
    flex: 1
  }
});

const Player = ({ src, width }) => {
  const classes = useStyles();
  const [formattedTime, setFormattedTime] = useState();
  const [formattedLength, setFormattedLength] = useState();
  const [currentTime, setCurrentTime] = useState();
  const [muted, setMuted] = useState();
  const [paused, setPaused] = useState(false);
  const [length, setLength] = useState();
  const [volume, setVolume] = useState();
  const videoRef = useRef();
  const volumeRangeRef = useRef();
  const timeRangeRef = useRef();
  let interval;

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
      video.pause();
      setPaused(false);
    } else {
      video.play();
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
    interval = setInterval(() => {
      setCurrentTime(setCustomCurrentTime());
      setLength(getDuration());
    }, 10);
  }, []);

  useEffect(() => {
    videoRef.current.load();
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (Number(currentTime) === Math.trunc(video.duration)) {
      setCurrentTime(0);
      video.currentTime = 0;
      video.pause();
      setPaused(false);
    }
  }, [currentTime]);

  useEffect(() => {
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box className={classes.Player}>
      <video ref={videoRef} width={width} height="auto">
        <track kind="captions" />
        <source src={src} type="video/mp4" />
      </video>

      <Box className={classes.controls}>
        <Box display="flex" alignItems="center" width="100%" marginRight={3}>
          <Box marginRight={1}>
            <button type="button" onClick={onPlay} className={classes.button}>
              {paused ? (
                <svg
                  width="17"
                  height="19"
                  viewBox="0 0 17 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 19H5.66667V0H0V19ZM11.3333 0V19H17V0H11.3333Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  width="14"
                  height="19"
                  viewBox="0 0 14 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0V19L14 9.5L0 0Z" fill="white" />
                </svg>
              )}
            </button>
          </Box>
          <Box marginRight={1} minWidth={120}>
            <span className={classes.time}>
              <span>{formattedTime}</span>
              <span> / </span>
              <span>{formattedLength}</span>
            </span>
          </Box>
          <input
            type="range"
            className={`${classes.range} ${classes.timeRange}`}
            ref={timeRangeRef}
            onChange={setTimeRange}
            value={currentTime}
            step={0.1}
            min={0}
            max={length}
          />
        </Box>
        <Box display="flex" alignItems="center">
          <button type="button" onClick={onMute} className={classes.button}>
            {muted ? (
              <svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.25 9.5C14.25 7.63167 13.1733 6.02722 11.6111 5.24611V7.57889L14.1972 10.165C14.2289 9.95389 14.25 9.73222 14.25 9.5V9.5ZM16.8889 9.5C16.8889 10.4922 16.6778 11.4211 16.3189 12.2867L17.9128 13.8806C18.6094 12.5717 19 11.0833 19 9.5C19 4.98222 15.8439 1.20333 11.6111 0.242778V2.41722C14.6617 3.325 16.8889 6.15389 16.8889 9.5ZM1.34056 0L0 1.34056L4.99278 6.33333H0V12.6667H4.22222L9.5 17.9444V10.8406L13.9861 15.3267C13.2789 15.8756 12.4872 16.3083 11.6111 16.5722V18.7467C13.0678 18.4194 14.3872 17.7439 15.5061 16.8361L17.6594 19L19 17.6594L9.5 8.15944L1.34056 0ZM9.5 1.05556L7.29389 3.26167L9.5 5.46778V1.05556Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 6.25028V12.7497H4.39111L9.88 18.1659V0.834093L4.39111 6.25028H0ZM14.82 9.5C14.82 7.58267 13.7003 5.93615 12.0756 5.13455V13.8546C13.7003 13.0639 14.82 11.4173 14.82 9.5ZM12.0756 0V2.23147C15.2481 3.16306 17.5644 6.06613 17.5644 9.5C17.5644 12.9339 15.2481 15.8369 12.0756 16.7685V19C16.4776 18.0143 19.76 14.1363 19.76 9.5C19.76 4.86374 16.4776 0.985747 12.0756 0V0Z"
                  fill="white"
                />
              </svg>
            )}
          </button>

          <input
            type="range"
            className={`${classes.range} ${classes.volumeRange}`}
            ref={volumeRangeRef}
            onChange={setVolumeRange}
            value={volume}
            step={0.1}
            min={0}
            max={1}
          />
        </Box>
      </Box>
    </Box>
  );
};

Player.propTypes = {
  src: PropTypes.string,
  width: PropTypes.number
};

Player.defaultProps = {
  width: 500
};

export default Player;
