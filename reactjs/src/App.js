import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './views/home';
import About from './views/about';
import SocialMediaAnalysis from './views/socialMediaAnalysis';

function App() {
  return (
    <Router>
      <main>
        <nav>
          <ul>
            <li><a href='/'>Home</a></li>
            <li><a href='/socialmediaanalysis'>Social Media Analysis</a></li>
            <li><a href='/about'>About</a></li>
          </ul>
        </nav>
      </main>

      <Route path='/' exact component={Home} />
      <Route path='/about' component={About} />
      <Route path='/socialmediaanalysis' component={SocialMediaAnalysis} />
  </Router>
  );
}

export default App;
