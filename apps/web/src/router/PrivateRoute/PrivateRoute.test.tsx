import { render, screen } from '@testing-library/react';
import { describe, vi, it } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from '@/context/AppContext';
import { AppContextType } from '@/context/AppContext/types';
import { PrivateRoute } from '.';

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
        <MemoryRouter initialEntries={['/home']} >
          <Routes >
            <Route element={<PrivateRoute />} >
              <Route path="home" element={<div>HOME</div>}/>
            </Route>
            <Route path="login" element={<div>LOGIN</div>}></Route>
          </Routes>
        </MemoryRouter>
      </AppContext.Provider>
    );
  }

  it('should render the component if the user is logged in', () => {
    renderTestComponent();

    screen.getByText('HOME');
  });

  it('should redirect to the login page if the user is not logged in', () => {
    renderTestComponent({ user: null });

    screen.getByText('LOGIN');
  });
});
