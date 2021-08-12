import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={LoginPage}/>
        <Route path="/home" component={HomePage}/>
      </div>
    </Router>
  );
}

export default App;
