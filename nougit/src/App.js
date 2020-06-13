import React, {useState} from 'react';
import './App.css';
import EntryViewer from './components/EntryViewer'

function App() {

  const [state, setState] = useState([]);

  return (
    <div className="App">
      <EntryViewer state={state} setState={setState} />
    </div>
  );
}

export default App;
