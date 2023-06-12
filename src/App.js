import React from 'react';
import './App.css';
import Header from './features/Header/Header';
import Reddit from './features/Reddit/Reddit';
import SubReddit from './features/Subreddit/Subreddit';



function App() {
  return (
    <>
      <Header />
      <div className='main-container'>
        <main>
          
          <Reddit />
          
        </main>
        <aside>
          <SubReddit />
        </aside>
      </div>
    </>
  );
}

export default App;
