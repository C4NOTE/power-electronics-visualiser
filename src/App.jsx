import { useState } from 'react';
import { auth, provider } from './firebase';
import { signInWithPopup } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  const login = () => {
    signInWithPopup(auth, provider)
      .then((res) => setUser(res.user))
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px', fontFamily: 'sans-serif' }}>
      <h1>⚡ Power Electronics Visualizer</h1>
      {!user ? (
        <button onClick={login} style={{ padding: '15px 30px', fontSize: '18px', cursor: 'pointer', borderRadius: '8px' }}>
          Login with Google
        </button>
      ) : (
        <div>
          <h2>Welcome, Engineer {user.displayName.split(' ')[0]}</h2>
          <p>Your workspace is ready.</p>
          <button style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}>
            + Create New Waveform
          </button>
        </div>
      )}
    </div>
  );
}

export default App;