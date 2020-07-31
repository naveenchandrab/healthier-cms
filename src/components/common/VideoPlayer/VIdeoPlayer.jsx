/* eslint-disable class-methods-use-this */
/* eslint-disable no-extend-native */
/* eslint-disable camelcase */
import React from 'react';
import './style.css';
import PropTypes from 'prop-types';

class VideoPlayer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      paused: true,
      muted: false,
      length: null,
      formattedLength: null,
      currentTime: null,
      formattedTime: null,
      volume: 0.5
    };
  }

  componentDidMount() {
    this.customVolume();
    setInterval(() => this.setState({ currentTime: this.currentTime() }), 10);
    setInterval(() => this.setState({ length: this.duration() }), 10);
  }

  play() {
    const { paused } = this.state;
    this.duration();
    const v = document.getElementById('v');
    // const playPause = document.querySelector('.playPause');

    this.setState({
      paused: !paused
    });

    if (paused === true) {
      v.play();
      this.setState({
        paused: false
      });
    } else {
      v.pause();
      this.setState({
        paused: true
      });
    }
  }

  duration() {
    let dur = document.getElementById('v').duration;
    dur = dur.toFixed();
    const formattedLength = this.toHHMMSS(dur);

    this.setState({
      length: dur,
      formattedLength
    });

    return dur;
  }

  toHHMMSS(value) {
    const sec_num = parseInt(value, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = sec_num - hours * 3600 - minutes * 60;

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
  }

  currentTime() {
    const { currentTime, length } = this.state;

    let cur = document.getElementById('v').currentTime;
    cur = cur.toFixed();
    const formattedTime = this.toHHMMSS(cur);

    this.setState({
      currentTime: cur,
      formattedTime
    });
    if (parseInt(currentTime, 1) === parseInt(length, 1)) {
      this.setState({ paused: true });
    }

    return cur;
  }

  customTime() {
    const timeRange = document.querySelector('.timeRange');
    document.getElementById('v').currentTime = timeRange.value;

    this.setState({
      currentTime: timeRange.value
    });
  }

  customVolume() {
    const volumeRange = document.querySelector('.volumeRange');
    document.getElementById('v').volume = volumeRange.value;

    this.setState({
      volume: volumeRange.value
    });

    if (volumeRange.value === 0) {
      this.setState({
        muted: true
      });
    } else {
      this.setState({
        muted: false
      });
    }
  }

  mute() {
    const { muted } = this.state;
    document.getElementById('v').muted = true;

    this.setState({
      muted: true
    });

    if (muted === true) {
      document.getElementById('v').muted = false;

      this.setState({
        muted: false
      });
    } else {
      document.getElementById('v').muted = true;
      this.setState({
        muted: true
      });
    }
  }

  render() {
    const {
      paused,
      formattedTime,
      formattedLength,
      muted,
      currentTime,
      length,
      volume
    } = this.state;
    const { src } = this.props;
    return (
      <div className="VideoPlayer">
        <video id="v" width="500" height="auto">
          <track kind="captions" />
          <source src={src} type="video/mp4" />
        </video>

        <div className="controls">
          <button
            type="button"
            onClick={this.play.bind(this)}
            className="play_pause_btn"
          >
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
            onChange={this.customTime.bind(this)}
            value={currentTime}
            step={0.1}
            min={0}
            max={length}
          />

          <button
            type="button"
            onClick={this.mute.bind(this)}
            className="mute_unmute_btn"
          >
            {muted ? 'MU' : 'UM'}
          </button>

          <input
            type="range"
            className="volumeRange"
            onChange={this.customVolume.bind(this)}
            value={volume}
            step={0.1}
            min={0}
            max={1}
          />
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string
};

export default VideoPlayer;
