import { userEvent } from '@storybook/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, render, screen } from '@testing-library/react';
import { rest } from 'msw';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from '.';
import { setupServer, waitForRequest } from '@/utils/test/setup';
import { AppContext } from '@/context/AppContext';

describe('LoginForm', () => {
  const emailText = 'test@test.com';
  const passwordText = 'password';
  const errorMessage = 'Invalid credentials';

  const server = setupServer();

  server.use(
    rest.post<{ email: string; password: string }>(
      '/auth/login',
      (req, res, ctx) => {
        const { email, password } = req.body;
        if (email === emailText && password === passwordText) {
          return res(ctx.status(200), ctx.json({ token: 'token' }));
        }
        return res(ctx.status(401), ctx.json({ error: errorMessage }));
      }
    )
  );

  const setToken = vi.fn();

  function renderTestComponent() {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider value={{
          user: null,
          setToken,
        }}>
          <LoginForm />
        </AppContext.Provider>
      </QueryClientProvider>
    );
  }

  it('Should render all fields', async () => {
    renderTestComponent();

    screen.getByRole('textbox', { name: /Email/ });
    screen.getByRole('textbox', { name: /Password/ });

    screen.getByRole('checkbox');
    screen.getByRole('button', { name: /Log in/ });
  });

  it('Should show error message when email is invalid', async () => {
    renderTestComponent();

    const passwordInput = screen.getByRole('textbox', { name: /Password/ });
    const submitButton = screen.getByRole('button', { name: /Log in/ });

    act(() => {
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    await screen.findByText('Please input your Email!');
    screen.queryByText('Please input your Password!');
  });

  it.skip('Should show error message when password is invalid', async () => {
    renderTestComponent();

    const emailInput = screen.getByRole('textbox', { name: /Email/ });
    const submitButton = screen.getByRole('button', { name: /Log in/ });

    act(() => {
      userEvent.type(emailInput, emailText);
      submitButton.click();
    });

    screen.queryByText('Please input your Email!');
    await screen.findByText('Please input your Password!');
  });

  it.skip('Should show error message from API', async () => {
    renderTestComponent();

    const emailInput = screen.getByRole('textbox', { name: /Email/ });
    const passwordInput = screen.getByRole('textbox', { name: /Password/ });
    const submitButton = screen.getByRole('button', { name: /Log in/ });

    screen.getByRole('checkbox', { checked: true });

    act(() => {
      userEvent.type(emailInput, 'wrongMail@test.com');
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    await waitForRequest(server, 'get', 'http://localhost:3000/api/auth/login' );
  });

  it('Should submit form correctly', async () => {
    renderTestComponent();

    const emailInput = screen.getByRole('textbox', { name: /Email/ });
    const passwordInput = screen.getByRole('textbox', { name: /Password/ });
    const submitButton = screen.getByRole('button', { name: /Log in/ });

    screen.getByRole('checkbox', { checked: true });

    act(() => {
      userEvent.type(emailInput, emailText);
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    expect(screen.queryByText(errorMessage)).toBeNull();
    expect(setToken).toBeCalledWith('token');
  });
});
