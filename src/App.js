import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoutes';

import Login from './screens/LoginScreen';
import Signup from './screens/SignupScreen';
import EmployeeCreate from './screens/EmployeeCreateScreen';
import EmployeeDetails from './screens/EmployeeDetailsScreen';
import EmployeeList from './screens/EmployeeListScreen';
import EmployeeSearch from './screens/EmployeeSearchScreen';
import EmployeeUpdate from './screens/EmployeeUpdateScreen';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes - User Screens */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Employee Screens */}
        <Route element={<ProtectedRoute />}>
          <Route path="/employees" element={<EmployeeList />} />
          <Route path="/employees/new" element={<EmployeeCreate />} />
          <Route path="/employees/:eid" element={<EmployeeDetails />} />
          <Route path="/employees/:eid/edit" element={<EmployeeUpdate />} />
          <Route path="/employees/search" element={<EmployeeSearch />} />
        </Route>

        {/* Default route */}
        <Route path="*" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;
