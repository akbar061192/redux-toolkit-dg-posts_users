import React from 'react';
import AddPostForm from './components/AddPostForm';
import Posts from './components/Posts';

const App = () => {
  return (
    <main className='App'>
      <AddPostForm />
      <Posts />
    </main>
  );
};

export default App;
