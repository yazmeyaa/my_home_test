import { ExchangeRateConverter } from "./components/converter/Converter";

function App() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <ExchangeRateConverter />
    </div>
  );
}

export default App;
