import { render, screen } from "@testing-library/react";
import { privatePage } from ".";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { User } from "@/context/AuthContext/types";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("PrivatePage", () => {
  const mockRouter: any = {
    push: jest.fn(),
  };

  (useRouter as jest.Mock).mockReturnValue(mockRouter);

  const user: User = {
    id: 1,
    email: "test@test.com",
    firstName: "name",
    lastName: "lastName",
    role: "student",
  };

  function renderTestComponent({
    defaultUser = user,
  }: {
    defaultUser?: User | null;
  }) {
    const TestComponent = privatePage(() => <div>AUTHENTICATED</div>);

    render(
      <AuthContext.Provider value={{ user: defaultUser, setToken: jest.fn() }}>
        <TestComponent />
      </AuthContext.Provider>
    );
  }

  test("it should load private page is user is logged in", () => {
    renderTestComponent({});

    screen.getByText("AUTHENTICATED");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("it should redirect to login page if user is not logged in", () => {
    renderTestComponent({ defaultUser: null });

    expect(screen.queryByText("AUTHENTICATED")).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith("/login");
  });
});
