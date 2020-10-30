import './App.css';
import LoginForm from './components/LoginForm';
import Users from './components/Users';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/users" component={Users} />
      </Router>
    </div>
  );
}

export default App;
