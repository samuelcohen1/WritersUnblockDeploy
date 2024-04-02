//Sam

import './App.css';


function App() {
  function Title() {
    return (
      <div className="title">
        Writer's Unblock
      </div>
    );
  }

  function Toggle() {
    
  }

  function InputField() {
    return (
      <div className="inputField">
        <form className="form">
          <textarea type="text" className="inputFieldText" placeholder="Enter text here"/>
        </form>
      </div>
    );
  }


  return (
    <div className="App" >
      {Title()}
      {InputField()}
    </div>
  );
}

export default App;
