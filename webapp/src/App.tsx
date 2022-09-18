import { LoginPage } from '@/pages';
import { AppContextProvider } from '@/context/AppContext';

export function App() {
  return (
    <AppContextProvider>
      <LoginPage />
    </AppContextProvider>
  );
}
