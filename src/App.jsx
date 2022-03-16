import './App.css';
import List from './list';


function App() {
    return (
        <div>
            <div className="app-bar">
                <span className="brand">
                    CI/CD Overview
                </span>
            </div>
            <div className="App">
                <header className="App-header">
                    <div className='content'>
                        <List />
                    </div>
                </header>
            </div>

        </div>
    );
}

export default App;
