import React, { Component } from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Chip from 'material-ui/Chip';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Reorder, { reorder } from 'react-reorder';

const styles = {
  main : {
    margin: '100px 0 0 100px',
    width : 500
  },
  floatingLabelStyle: {
    color: '#000',
  },
  floatingLabelFocusStyle: {
    color: '#000',
  },
  addButton : {
    margin : 'auto'
  },
  submitButton : {
    margin : '20px 0'
  },
  chip: {
    margin: 4,
    borderRadius : 0,
    backgroundColor : '#37e7c8'
  }
};

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif'
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chipData: [],
      value : "",
      keyvals : ["0","1","2","3","4","5","6","7","8","9"],
      ctr : 0,
      disabled : false,
      error : "",
      prefix : "Prefix"
    };
  }

  componentDidMount = () => {
      document.getElementById('textbox').addEventListener("keyup", function(event) {
      event.preventDefault();
      if (event.keyCode === 13)
        document.getElementById('addbtn').click();
      });  
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  addSkill = () => {

    if(this.state.ctr === 9)
      this.setState({disabled: true});

    for(let i=0;i<this.state.ctr;i++)
    {
      if(this.state.chipData[i].label === this.state.value )
      {
        this.setState({
          error : "Skill already present"
        });
        return;
      }
    }

    const key_idx = this.state.keyvals[0];
    this.keyvals = this.state.keyvals;
    this.keyvals.shift();
    this.chipData = this.state.chipData;
    const obj = {key : key_idx, label : this.state.value};
    this.chipData.push(obj);
    this.setState({
      value : "", 
      chipData: this.chipData,
      ctr : this.state.ctr + 1,
      keyvals : this.keyvals,
      error : ""
    });
  }

  printLog = () => {
    let ans =[];
    for(let i=0;i<this.state.ctr;i++)
    {
      ans.push(this.state.chipData[i].label)
    }
    console.log(ans);
  }

  handleRequestDelete = (key) => {
    if(this.state.ctr === 10)
      this.setState({disabled: false});

    this.chipData = this.state.chipData;
    const chipToDelete = this.chipData.map((chip) => chip.key).indexOf(key);
    this.chipData.splice(chipToDelete, 1);
    this.keyvals = this.state.keyvals;
    this.keyvals.push(key.toString());
    this.setState({chipData: this.chipData, ctr : this.state.ctr - 1, keyvals : this.keyvals});
  };

  onReorder = (event, previousIndex, nextIndex, fromId, toId) => {
    this.setState({
      chipData: reorder(this.state.chipData, previousIndex, nextIndex)
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.main}>
          <h1>What are your skills?</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <div style={{display : 'flex', flexWrap: 'wrap', marginBottom: 20}}>
            <TextField
              id="textbox"
              floatingLabelText="Your Skills (Upto 10)"
              floatingLabelStyle={styles.floatingLabelStyle}
              floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
              value={this.state.value}
              errorText={this.state.error}
              onChange={this.handleChange}
            />
            
            <RaisedButton 
              id="addbtn" 
              label="Add" 
              disabled={this.state.disabled}
              labelColor='#FFFFFF'
              backgroundColor='#3871ff'
              style = {styles.addButton}
              onClick={this.addSkill} 
            />
          </div>
          
          <div id="tags">        
            <Reorder
              itemKey='label'
              holdTime={0}
              reorderId="my-list"
              onReorder={this.onReorder}
            >
              {
                this.state.chipData.map((item) => (
                <Chip key={item.key} style={styles.chip} deleteIconStyle={{fill : '#000'}} onRequestDelete={() => this.handleRequestDelete(item.key)}>
                  {item.label}
                </Chip>
                ))
              }
            </Reorder>
          </div>
          
          <RaisedButton 
            label="Continue"
            backgroundColor='#3871ff'
            labelColor='#FFFFFF'
            fullWidth={true}
            style = {styles.submitButton}
            onClick={this.printLog} 
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
