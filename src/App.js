import { BrowserRouter as Router } from 'react-router-dom';
import MainLayout from '../src/layouts/_MainLayout'
import RoutesComponent  from '../src/components/RoutesComponent'

const App = () => {
  return (
    <div className='bg-[#fafafa]'>
      <Router>
        <MainLayout>
          <RoutesComponent />
        </MainLayout>
      </Router>
    </div>
  );
}

export default App;
