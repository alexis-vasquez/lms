import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { LoginForm } from ".";
import { setupServer, waitForRequest } from "@/utils/test/setup";
import { AuthContext } from "@/context/AuthContext";
import userEvent from "@testing-library/user-event";

describe("LoginForm", () => {
  const emailText = "test@test.com";
  const passwordText = "password";
  const errorMessage = "Invalid credentials";

  const setToken = jest.fn();

  const server = setupServer();

  function renderTestComponent() {
    const queryClient = new QueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider
          value={{
            user: null,
            setToken,
          }}
        >
          <LoginForm />
        </AuthContext.Provider>
      </QueryClientProvider>
    );
  }

  it("Should render all fields", async () => {
    renderTestComponent();

    screen.getByRole("textbox", { name: /Email/ });
    screen.getByRole("textbox", { name: /Password/ });

    screen.getByRole("checkbox");
    screen.getByRole("button", { name: /Log in/ });
  });

  it("Should show error message when email is invalid", async () => {
    renderTestComponent();

    const passwordInput = screen.getByRole("textbox", { name: /Password/ });
    const submitButton = screen.getByRole("button", { name: /Log in/ });

    userEvent.type(passwordInput, passwordText);
    submitButton.click();

    await screen.findByText("Please input your Email!");
    screen.queryByText("Please input your Password!");
  });

  it("Should show error message when password is invalid", async () => {
    renderTestComponent();

    const emailInput = screen.getByRole("textbox", { name: /Email/ });
    const submitButton = screen.getByRole("button", { name: /Log in/ });

    userEvent.type(emailInput, emailText);
    submitButton.click();

    screen.queryByText("Please input your Email!");
    await screen.findByText("Please input your Password!");
  });

  it("Should show error message from API", async () => {
    server.use(
      rest.post<{ email: string; password: string }>(
        "http://localhost:3000/api/auth/login",
        (req, res, ctx) => {
          return res(ctx.status(401), ctx.json({ error: errorMessage }));
        }
      )
    );

    renderTestComponent();

    const emailInput = screen.getByRole("textbox", { name: /Email/ });
    const passwordInput = screen.getByRole("textbox", { name: /Password/ });
    const submitButton = screen.getByRole("button", { name: /Log in/ });

    screen.getByRole("checkbox", { checked: true });

    await userEvent.type(passwordInput, passwordText);
    await userEvent.type(emailInput, "wrongmail@test.com");
    userEvent.click(submitButton);

    screen.debug();
    await waitForRequest(
      server,
      "post",
      "http://localhost:3000/api/auth/login"
    );
    await screen.findByText(errorMessage);
  });

  it("Should submit form correctly", async () => {
    server.use(
      rest.post<{ email: string; password: string }>(
        "http://localhost:3000/api/auth/login",
        (req, res, ctx) => {
          return res(ctx.status(200), ctx.json({ token: "token" }));
        }
      )
    );

    renderTestComponent();

    const emailInput = screen.getByRole("textbox", { name: /Email/ });
    const passwordInput = screen.getByRole("textbox", { name: /Password/ });
    const submitButton = screen.getByRole("button", { name: /Log in/ });

    screen.getByRole("checkbox", { checked: true });

    await userEvent.type(emailInput, emailText);
    await userEvent.type(passwordInput, passwordText);
    userEvent.click(submitButton);

    await waitForRequest(
      server,
      "post",
      "http://localhost:3000/api/auth/login"
    );
    expect(screen.queryByText(errorMessage)).toBeNull();
    await waitFor(() => expect(setToken).toHaveBeenCalled());
  });
});
