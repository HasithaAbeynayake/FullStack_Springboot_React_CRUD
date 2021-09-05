import './App.css';
import EmployeeComponent from './components/EmployeeComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AddEmployeeComponent from './components/AddEmployeeComponent';
import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
        <Router>
          <div className = "container">
            <Switch>
                <Route path="/" exact component={EmployeeComponent}></Route>
                <Route path="/employees" component={EmployeeComponent}></Route>
                <Route path="/add-employee/:id" component={AddEmployeeComponent}></Route>
                <Route path="/view-employee/:id" component={ViewEmployeeComponent}></Route>
            </Switch>
          </div>
        </Router>
  );
}

export default App;
