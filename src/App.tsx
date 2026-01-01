import { Page } from './app/page';
import { Providers } from './app/providers';

export function App() {
  return (
    <Providers>
      <Page />
    </Providers>
  );
}

export default App;
