import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import SocialMediaAnalysis from './views/socialMediaAnalysis';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />

      <div>
        <Switch>
          <Route path='/home' component={Home} />
          <Route path='/socialmediaanalysis' component={SocialMediaAnalysis} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
  </Router>
  );
}

export default App;
