import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch'; // Import Switch component
import Grid from '@mui/material/Grid'; // Import Grid component
import './fonts/font.css'; // Import the fonts CSS file
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'; // Import Dialog component
import DialogTitle from '@mui/material/DialogTitle'; // Import DialogTitle component
import DialogContent from '@mui/material/DialogContent'; // Import DialogContent component
import DialogActions from '@mui/material/DialogActions'; // Import DialogActions component
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon component from @mui/icons-material package
import IconButton from '@mui/material/IconButton'; // Import CloseIcon component
import Box from '@mui/material/Box'; // Import CloseIcon component
import axios from 'axios'; //Import axios for backend integration





const App = () => {
  const [sentence, setSentence] = useState('');
  const [prediction, setPrediction] = useState('');
  const [switchValue, setSwitchValue] = useState(false); // State for the Switch component
  const [prevWord, setPrevWord] = useState('');
  const inputRef = useRef(null);

  const handleInputChange = (event) => {
    setSentence(event.target.value);
  };

  //backend integration
  const fetchServer = async (word) => {
    try {
      // const lastWord = suggestMode || genText === "" ? sentence.split(" ").slice(-2)[0] : genText.split(" ").slice(-2)[0];
      const response = await axios.get(`http://localhost:8001/getWord/${word}/${mode}`);
      setPrediction(response.data);
      console.log(prediction);
      return response.data;
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (suggestMode && sentence.charAt(sentence.length - 1) === ' ' && sentence.charAt(sentence.length - 2) !== " ") {
      fetchServer(sentence.split(" ").slice(-2)[0]);
    }
    else
    {
      setPrediction("");
    }

  }, [sentence]);




  const handleKeyDown = async (event) => {
    if (event.key === 'Tab' && suggestMode && prediction) {
      event.preventDefault();
      setSentence(`${sentence}${prediction}`);
      setPrediction('');
    }

    if (event.key === 'Enter' && !suggestMode) {
      console.log("Enter hit");
      // setGenText(sentence.split(" ").slice(-2)[0] + " ");  // Not done executing in time
      setGenText(sentence + " ");
      let currWord = sentence.split(" ").slice(-2)[0];

      console.log("going in with genText at ", genText, "and currWord at", currWord);
      for (let i = 0; i < 100; i++) {

          await new Promise(resolve => setTimeout(resolve, 10));
          console.log("going in w/ currWord at ", currWord);
          // setPrevWord(genText.split(" ").slice(-2)[0]);
          currWord = await fetchServer(currWord);   // Await or smth?   Could pass in the specific word, which might be helpful...  Maybe will need a return value...
          // currWord = prediction;
          // setGenText(`${genText} ${currWord}`);  // Might not be updated in time. Maybe move inside of fetchserver?
          setGenText(prevGenText => `${prevGenText} ${currWord}`);
          console.log("Setting genText with prediction ", prediction);
          // setPrediction('');
        
      }


      // setGenText("Enter just pressed!");
    }
  };

  // Mock data (replace with your backend integration later)
  const mockPredictions = {
    "The quick brown fox jumps over the lazy": "dog",
    "Once upon a time in a": "fairytale",
    "the": "cat",
    "Potatoes are": "great",
    "The quick brown fox jumps over the lazy lazy lllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllazy": "doggo",
    "Samuel walked to the": "store",
  };



  const handleSwitchChange = () => {
    setSwitchValue(!switchValue); // Update the state when the switch is toggled
  };

  const [mode, setMode] = useState('slow'); // State to track the current mode

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode); // Update the mode when a button is clicked
  }

  const handleModeToggle = () => {
    const newMode = mode === 'slow' ? 'fast' : 'slow'; // Toggle between 'slow' and 'fast' modes
    setMode(newMode); // Update the mode
  };

  const [suggestMode, setSuggestMode] = useState(true); // State for Suggest/Generate mode

  const handleSuggestModeToggle = () => {
    setPrediction("");  // If we're switching to generate mode, delete the autocomplete text

    setSuggestMode(!suggestMode); // Toggle between Suggest and Generate modes
  };

  const [genText, setGenText] = useState("");



  const [openAboutDialog, setOpenAboutDialog] = useState(false);

  const handleOpenAboutDialog = () => {
    setOpenAboutDialog(true);
  };

  const handleCloseAboutDialog = () => {
    setOpenAboutDialog(false);
  };

  return (
    <div style={{ minWidth: "1200px", backgroundColor: "#FFF7ED", minHeight: "100vh", padding: "50px" }}>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Typography */}
        <Typography
          style={{
            fontFamily: 'Josefin',
            fontWeight: '500',
            fontSize: '90px',
            marginLeft: '20px', // Adjust margin for left alignment

          }}
        >
          Writer's Unblock
        </Typography>
        {/* Toggle Mode Button */}
        <div style={{ display: 'flex', alignItems: "center", marginRight: "20px" }}>
          <Button
            variant="contained"
            onClick={handleSuggestModeToggle}
            style={{
              backgroundColor: suggestMode ? '#888888' : 'green',
              color: 'white',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px 20px',
              fontFamily: 'Josefin',
              fontSize: suggestMode ? '30px' : '25px',
              fontWeight: suggestMode ? '200' : '800',
              width: '150px',
              height: '80px',
              marginRight: '20px', // Adjust margin for right alignment
              marginLeft: "20px",
            }}
          >
            {suggestMode ? 'Suggest' : 'Generate'}
          </Button>
          <Button
            variant="contained"
            onClick={handleModeToggle}
            style={{
              backgroundColor: mode === 'slow' ? '#888888' : 'green',
              color: 'white',
              border: '2px solid black',
              borderRadius: '20px',
              padding: '10px 20px',
              fontFamily: 'Josefin',
              fontSize: '30px',
              fontWeight: mode === 'slow' ? '200' : '800',
              width: '150px',
              height: '80px',
              marginRight: '20px', // Adjust margin for right alignment
              marginLeft: "20px",
            }}
          >
            {mode === 'slow' ? 'Slow' : 'Fast'}
          </Button>
          <div style={{ width: "20px" }} />


          <Button
            variant="contained"
            onClick={handleOpenAboutDialog}
            style={{
              backgroundColor: '#000000',   // Also looks nice when it's blue!
              color: 'white',
              // border: '2px solid gray',
              borderRadius: '20px',
              padding: '10px 20px',
              fontFamily: 'Josefin',
              fontSize: '30px',
              fontWeight: mode === '200',
              width: '150px',
              height: '80px',
              marginRight: '40px', // Adjust margin for right alignment
            }}
          >
            About
          </Button>
        </div>
      </div>


      <div style={{ height: "100px" }} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>


        <TextField
          placeholder="Your sentence here"
          value={sentence}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          InputProps={{
            endAdornment: prediction && suggestMode ? (
              <Typography
                variant="body1"
                style={{
                  marginTop: "1px",
                  marginRight: prediction ? `${1162 + 9.75 - sentence.length * 9.75 - prediction.length * 9.75}px` : '300px',
                  fontFamily: 'Courier, monospace',
                  color: 'gray',
                  fontWeight: "600"
                  // marginLeft: '80px', // Adjust spacing between text and prediction
                }}
              >
                {prediction}
              </Typography>
            ) : null,
          }}
          sx={{
            '& input': {
              fontFamily: 'Courier, monospace',
              fontWeight: "600"
            },
            'fieldset.MuiOutlinedInput-notchedOutline': {
              border: '2px solid #233D',
              borderRadius: '10px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#666E87',
                borderWidth: '2px',
              },
            },
          }}
          style={{
            width: "1200px",
            margin: '10px 0',
          }}
        />




      </div>


      {suggestMode ?

        <Typography
          variant="body1"
          style={{
            marginTop: "40px",
            marginLeft: "20px",
            fontFamily: 'Courier, monospace',
            fontWeight: "500",
            fontSize: "25px",

            // marginLeft: '80px', // Adjust spacing between text and prediction
          }}
        >
          Press space to show suggestion and press tab to accept suggestion. <br />
          Remember to cite John Steinbeck whenever you use Writer's Unblock.

        </Typography> :

        <Typography
          variant="body1"
          style={{
            marginTop: "40px",
            marginLeft: "20px",
            fontFamily: 'Courier, monospace',
            fontWeight: "500",
            fontSize: "25px",

            // marginLeft: '80px', // Adjust spacing between text and prediction
          }}
        >
          Press enter to generate text: <br /> <br />
          {genText}
        </Typography>
      }




      {/* <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Typography>Slow</Typography>
        </Grid>
        <Grid item>
          <Switch
            checked={switchValue}
            onChange={handleSwitchChange}
            size="medium"
          />
        </Grid>
        <Grid item>
          <Typography>Fast</Typography>
        </Grid>
      </Grid> */}





      <Dialog open={openAboutDialog} onClose={handleCloseAboutDialog} fullWidth maxWidth="md" >
        <DialogTitle>
          <div style={{
            'marginLeft': '10px',
            'font-family': 'Nunito',
            fontFamily: 'Josefin',
            fontSize: '60px',
            fontWeight: '600',
            "display": "flex",
            marginLeft: "30px"
          }}>
            About
            <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
              <IconButton onClick={handleCloseAboutDialog} style={{ margin: "5px", position: 'absolute', top: 0, right: 0 }}>
                <CloseIcon style={{ fontSize: '38px', color: "black" }} />
              </IconButton>
            </div>
          </div>

        </DialogTitle>


        <Box sx={{ padding: '30px', paddingTop: '5px', }}>
          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "900", fontSize: "20px", marginLeft: "30px"
          }}>
            Hate that feeling of staring at a blank screen? <br />  <br />
          </Typography>

          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "400", fontSize: "17px", marginLeft: "30px"
          }}>
            We do too. That's why we made Writer's Unblock, your personal writing tool to get unstuck. Simply put in whatever word you're stuck on and receive a suggestion based on the style of John Stienbeck's book <i>East of Eden</i>. <br />  <br />
          </Typography>

          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "900", fontSize: "20px", marginLeft: "30px"
          }}>
            How it works <br />  <br />
          </Typography>

          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "400", fontSize: "17px", marginLeft: "30px"
          }}>
            Our prediction is the word most likely to appear directly after the input word in <i>East of Eden</i>. We translated <i>East of Eden</i> into two weighted directed graphs where words are vertices, word adjacencies are edges, and adjacency frequencies are edge weights. One graph ("Slow Mode") is implemented as a hashmap of hashmaps, and the other graph ("Fast Mode") is implemented as a hashmap of maxheaps.<br />  <br />
            {/* // A demo picture here would be realy cool! */}
          </Typography>
          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "900", fontSize: "20px", marginLeft: "30px"
          }}>
            Note <br />  <br />
          </Typography>

          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "400", fontSize: "17px", marginLeft: "30px"
          }}>

            <i>East of Eden</i> is in the public domain, so our suggestions are legal and safe to use. However, you should cite John Steinbeck whenever you use Writer's Unblock for academic honesty purposes. <br /> <br />
          </Typography>




          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "900", fontSize: "20px", marginLeft: "30px"
          }}>
            Credits <br />  <br />
          </Typography>

          <Typography style={{
            fontFamily: 'Courier, monospace',
            fontWeight: "400", fontSize: "17px", marginLeft: "30px"
          }}>
            Samuel Cohen: Frontend and hashmap<br />
            Abhinav Pothuri: Backend, maxheap, and data cleaning <br />
            Adi Pasthumarti: Main method <br />

            {/* // A demo picture here would be realy cool! */}
          </Typography>
        </Box>
        <br />
      </Dialog>


      <div style={{ display: "flex", justifyContent: "center" }}>
        {/* Toggle Mode Button */}

      </div>
    </div>
  );
};

export default App;