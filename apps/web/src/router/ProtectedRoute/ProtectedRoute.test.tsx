import { render, screen } from '@testing-library/react';
import { describe, vi, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { AppContextType } from '@/context/AppContext/types';
import { ProtectedRoute } from '.';

describe('PrivateRoute', () => {
  const defaultUser = {
    id: 1,
    email: 'test@test.com',
    firstName: 'test',
    lastName: 'test',
    role: 'student',
  };

  const setToken = vi.fn();

  function renderTestComponent(props?: Partial<AppContextType>) {
    const { user = defaultUser } = props || {};
    render(
      <AppContext.Provider
        value={{ user, setToken }}
      >
        <MemoryRouter initialEntries={['/login']} >
          <Routes >
            <Route element={<ProtectedRoute />} >
              <Route path="login" element={<div>LOGIN</div>}></Route>
            </Route>
            <Route path="/" element={<div>HOME</div>}/>
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );
  }

  it('should render the component if no user', () => {
    renderTestComponent({ user: null });

    screen.getByText('LOGIN');
  });

  it('should redirect to the home page if the user is logged in', () => {
    renderTestComponent();

    screen.getByText('HOME');
  });
});
