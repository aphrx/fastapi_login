import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import CreatePage from './pages/CreatePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={LoginPage}/>
        <Route path="/home" component={HomePage}/>
        <Route path="/join" component={JoinPage}/>
        <Route path="/create" component={CreatePage}/>
      </div>
    </Router>
  );
}

export default App;
