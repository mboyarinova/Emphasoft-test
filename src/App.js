import './App.css';
import Login from './components/Login';
import Users from './components/Users';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Login} />
        <Route exact path="/users" component={Users} />
      </Router>
    </div>
  );
}

export default App;
