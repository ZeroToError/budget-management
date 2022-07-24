import logo from './logo.svg';
import './App.css';
import BudgetReviewCard from './components/BudgetReviewCard/BudgetReviewCard';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className='container'>
      <div className='bg-img'></div>
      <div className="App">
        <NavBar />
        <BudgetReviewCard />
      </div>
    </div>
  );
}

export default App;
