import SignIn from './page/user/SignIn';
import SignUp from './page/user/SignUp';
import ResponsiveAppBar from './components/Nav';
import {Routes, Route} from 'react-router'

function App() {
  return (
    <div className='App'>
      <ResponsiveAppBar/>
      <Routes>
        <Route path='/SignIn' element={<SignIn/>}/>
        <Route path='/SignUp' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
