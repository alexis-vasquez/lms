import { userEvent } from '@storybook/testing-library';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { LoginForm } from './LoginForm';

const queryClient = new QueryClient();

describe('LoginForm', () => {
  const emailText = 'test@test.com';
  const passwordText = 'password';
  const errorMessage = 'Invalid credentials';

  const server = setupServer(
    rest.post<{ email: string; password: string }>(
      'http://localhost:3000/api/auth/login',
      (req, res, ctx) => {
        const { email, password } = req.body;
        if (email === emailText && password === passwordText) {
          return res(ctx.status(200), ctx.json({ token: 'token' }));
        }
        return res(ctx.status(401), ctx.json({ error: errorMessage }));
      }
    )
  );

  function TestComponent() {
    return (
      <QueryClientProvider client={queryClient}>
        <LoginForm />
      </QueryClientProvider>
    );
  }

  beforeAll(() => server.listen());

  it('Should render all fields', async () => {
    render(<TestComponent />);

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument();
    expect(
      screen.getByRole('textbox', { name: 'Password' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('checkbox', { name: 'Remember me' })
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log in' })).toBeInTheDocument();
  });

  it('Should show error message when email is invalid', async () => {
    render(<TestComponent />);

    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
    const submitButton = screen.getByRole('button', { name: 'Log in' });

    act(() => {
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    expect(
      await screen.findByText('Please input your Email!')
    ).toBeInTheDocument();
    expect(
      screen.queryByText('Please input your Password!')
    ).not.toBeInTheDocument();
  });

  it('Should show error message when password is invalid', async () => {
    render(<TestComponent />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const submitButton = screen.getByRole('button', { name: 'Log in' });

    act(() => {
      userEvent.type(emailInput, emailText);
      submitButton.click();
    });

    expect(
      screen.queryByText('Please input your Email!')
    ).not.toBeInTheDocument();
    expect(
      await screen.findByText('Please input your Password!')
    ).toBeInTheDocument();
  });

  it('Should show error message from API', async () => {
    render(<TestComponent />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
    const submitButton = screen.getByRole('button', { name: 'Log in' });

    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeChecked();

    act(() => {
      userEvent.type(emailInput, 'wrongMail@test.com');
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  it('Should submit form correctly', async () => {
    render(<TestComponent />);

    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    const passwordInput = screen.getByRole('textbox', { name: 'Password' });
    const submitButton = screen.getByRole('button', { name: 'Log in' });

    expect(screen.getByRole('checkbox', { name: 'Remember me' })).toBeChecked();

    act(() => {
      userEvent.type(emailInput, emailText);
      userEvent.type(passwordInput, passwordText);
      submitButton.click();
    });

    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

});
