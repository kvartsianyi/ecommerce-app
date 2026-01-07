import { Page } from './app/page';
import { useAuth } from './hooks/useAuth';
import { FullScreenSpinner } from './components/FullScreenSpinner';

export function App() {
  const { isInitialized } = useAuth();

  return (
    <>
      <Page />
      <FullScreenSpinner visible={!isInitialized} />
    </>
  );
}

export default App;
