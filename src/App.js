import React from "react";
import "./styles.scss";

////////////////////////////////////////////////////////
/*
To-do
- Add history section
-   Record pad clicks
-   Add ability to play back history at a vairable speed

- Fix button layout for narrow displays, buttons should expand to fill available space

- Add other sound banks and make them selectable by dropdown
- Display to show displayMessages 
 
*/

////////////////////////////////////////////////////////
//Variabls

const oDATE = new Date();

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

const banks = [
  {
    name: "Bank 1",
    obj: bankOne
  },
  {
    name: "Bank 2",
    obj: bankTwo
  }
];

const emptyPadObj = {
  keyCode: -1,
  keyTrigger: "_",
  id: "Blank",
  url: "#"
};

////////////////////////////////////////////////////////
//React

class Wrapper extends React.Component {
  constructor(props) {
    console.log("Wrapper constructor");
    super(props);
    this.state = {
      currentBank: banks[0],
      powerOn: true,
      displayMessage: "Power On",
      volume: 90,
      padHistory: [
        
      ]        
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.handlePowerChange = this.handlePowerChange.bind(this);
    this.handlePadClick = this.handlePadClick.bind(this);
    this.handleBankSelect = this.handleBankSelect.bind(this);
  }

  handlePadClick(padID) {
    console.log("handlePadClick for ID: ", padID);

    const newPadHistoryObj = {
      bankName: this.state.currentBank.name,
      padObj: this.state.currentBank.obj.find(el => el.id === padID)
    }

    this.setState({
      displayMessage: this.state.currentBank.name + ": " + padID,
      padHistory: [newPadHistoryObj, ...this.state.padHistory ]
    });

    const sound = document.getElementById(padID);
    sound.currentTime = 0;
    sound.play();
  }

  
  handleKeyPress(event) {
    let sound = this.state.currentBankObj.filter(
      (e) => e.keyCode === event.keyCode
    )[0];

    //console.log("Sound:", sound);

    if (sound !== undefined) {
      //this.handlePadClick(sound.id);
      //document.getElementById(sound.id).focus();
      document.getElementById(sound.id).click();
    }
  }

  handleBankSelect(e) {
    console.log("Bank selected value: ", e.target.value);
    this.setState({
      displayMessage: "Selected sound bank: " + e.target.value,
      currentBank: banks.filter((el) => el.name === e.target.value)[0]
    });
  }

  adjustVolume(e) {
    console.log("adjustVolume to value: ", e.target.value);
    if (this.state.powerOn) {
      this.setState({
        volume: e.target.value,
        displayMessage: "Volume set to " + e.target.value + "%"
      });
      //setTimeout(() => this.clearDisplay(), 1000);
    } else {
      this.setState({
        displayMessage: "Power Off"
      });
    }
  }

  handlePowerChange(e) {
    console.log(
      oDATE.toLocaleString(),
      "handlePowerChange to value: ",
      e.target.checked
    );
    this.setState({
      powerOn: e.target.checked,
      displayMessage: "Power " + (e.target.checked ? "On" : "Off")
    });
  }

  

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    return (
      <div id="drum-machine">
        
        <div id="main-container" className="container-fluid">
          
        <div className="row px-2 pt-1">
          <h1>Drum Machine</h1> 
        </div>

          <div className="row">
            <DrumPadButtonsContainer
              //bank={this.state.currentBank}
              handlePadClick={this.handlePadClick}
              //powerOn={this.state.powerOn}
              appState={this.state}
            />
            <ControlsContainer
              //displayMessage={this.state.displayMessage}
              //volume={this.state.volume}
              adjustVolume={this.adjustVolume}
              handlePowerChange={this.handlePowerChange}
              handleBankSelect={this.handleBankSelect}
              //powerOn={this.state.powerOn}
              appState={this.state}
            />
            <DrumPadHistoryContainer 
              appState={this.state}
            />
          </div>
        </div>

        <div id="history-container"></div>
      </div>
    );
  }
}

const DrumPadButtonsContainer = (props) => {
  return (
    <div className="col m-2">
      <div id="drum-buttons-container" className="row">
        {props.appState.currentBank.obj.map((e, i) => (
          <DrumPadButton
            padID={e.id}
            key={i}
            audioLink={e.url}
            text={e.keyTrigger}
            handlePadClick={props.handlePadClick.bind(null, e.id)}
            appState={props.appState}
          />
        ))}
      </div>
    </div>
  );
};

const DrumPadButton = (props) => {
  return (
    <div className="drum-pad col-4 p-1">
      <button
        sound-id={props.padID}
        type="button "
        className={
          "btn btn-primary btn-block" +
          (props.appState.powerOn ? "" : " disabled")
        }
        onClick={props.handlePadClick}
        disabled={!props.appState.powerOn}
      >
        <audio
          id={props.padID}
          src={props.audioLink}
          className="clip"
          type="audio/mpeg"
        />
        {props.text}
      </button>
    </div>
  );
};

const ControlsContainer = (props) => {
  return (
    <div id="controls-container" className="col-md mx-2 my-2">
      <h2>Controls</h2>
      <hr />

      <div className="">
        <div className="col custom-control custom-switch">
          <input
            id="power-switch"
            type="checkbox"
            className="custom-control-input"
            onChange={props.handlePowerChange}
            value={props.appState.powerOn}
            checked={props.appState.powerOn}
          />
          <label className="custom-control-label" htmlFor="power-switch">
            {props.appState.powerOn ? "Power On" : "Power Off"}
          </label>
        </div>
      </div>

      <br />

      <div className="">
        <label className="mr-sm-2" htmlFor="inlineFormCustomSelect">
          Select Sound Bank
        </label>

        <select className="custom-select" onChange={props.handleBankSelect}>
          {banks.map((e, i) => (
            <option key={i} value={e.name}>{e.name}</option>
          ))}
        </select>
      </div>

      <br />

      <div className="">
        <label htmlFor="range-volume">
          Set Volume ({props.appState.volume}%)
        </label>

        <input
          id="range-volume"
          className={
            "custom-range form-controlx" +
            (props.appState.powerOn ? "" : " disabled")
          }
          type="range"
          min="0"
          max="100"
          step="1"
          value={props.appState.volume}
          onChange={props.adjustVolume}
          disabled={!props.appState.powerOn}
        />
      </div>

      <br />

      <div id="display" className="row flex-grow-1">
        <p>
          <strong>Last Command</strong> <br />
          {props.appState.displayMessage}
        </p>
      </div>
    </div>
  );
};

const DrumPadHistoryContainer = (props) => {
  console.log("PadHistory:", props.appState.padHistory);
  return (
    <div className="col m-2 ">
       
        <h2>History</h2>
        <hr />  
        
        <div id="drum-history-container" className="">
          <ul>
            {props.appState.padHistory.map(({ bankName, padObj }, i) => 
              
              <li key={i}>
                <span><i className="fa fa-music"></i></span> {bankName + " " + padObj.id} 
              </li>
              
            )}
          </ul>
        </div>
      
    </div>
  );
};

/*<DrumPadButton
            padID={padObj.id}
            key={i}
            audioLink={e.url}
            text={e.keyTrigger}
            handlePadClick={props.handlePadClick.bind(null, e.id)}
            appState={props.appState}
          />*/



export default function App() {
  return <Wrapper />;
}
