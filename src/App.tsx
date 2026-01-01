import { Page } from './app/page';
import { Providers } from './app/providers';
import { useAuth } from './hooks/useAuth';
import { FullScreenSpinner } from './components/FullScreenSpinner';

export function App() {
  const { isInitialized } = useAuth();

  return (
    <Providers>
      <Page />
      <FullScreenSpinner visible={!isInitialized} />
    </Providers>
  );
}

export default App;
