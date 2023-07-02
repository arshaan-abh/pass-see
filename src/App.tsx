import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import TheEye from "./components/the-eye";
import PassField from "./components/pass-field";

function App() {
    const [isFocused,setIsFocused] = useState<boolean>(false)
  return (
      <div id="main-container">
          <TheEye isFocused={isFocused}></TheEye>
          <PassField onFocusChange={setIsFocused}></PassField>
      </div>
  );
}

export default App;
