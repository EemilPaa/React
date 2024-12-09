import './App.css';
function App(props) {
  return (
    <>
      <h1>Welcome to my site</h1>
      <p>Tervehdys {props.firstname} {props.lastname}</p>
    </>
  );
}

export default App;