import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import SocialMediaAnalysis from './views/socialMediaAnalysis';
import Header from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route
          exact
          path="/"
          render={() => {
              return (<Redirect to="/home" />);
          }}
        />
          <Route path='/home' component={Home} />
          <Route path='/socialmediaanalysis' component={SocialMediaAnalysis} />
          <Route path='/about' component={About} />
        </Switch>
  </Router>
  );
}

export default App;
