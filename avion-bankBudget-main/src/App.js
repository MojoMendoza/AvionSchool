import './App.css';
import Navigation from './components/Navigation/Navigation';
import Bank from './components/Bank/Bank';

function App() {

  return (

    <div className="App">
      <Navigation />
      <div className="appBody">
        <Bank />
      </div>

    </div>
  );
}

export default App;
