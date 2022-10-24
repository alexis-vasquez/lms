import { render, screen } from "@testing-library/react";
import { protectedPage } from ".";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { User } from "@/context/AuthContext/types";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

describe("ProtectedPage", () => {
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
    const TestComponent = protectedPage(() => <div>LOGGED OUT</div>);

    render(
      <AuthContext.Provider value={{ user: defaultUser, setToken: jest.fn() }}>
        <TestComponent />
      </AuthContext.Provider>
    );
  }

  test("it should nload protected page is user is not logged in", () => {
    renderTestComponent({ defaultUser: null });

    screen.getByText("LOGGED OUT");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });

  test("it should redirect to login page if user is not logged in", () => {
    renderTestComponent({});

    expect(screen.queryByText("LOGGED OUT")).toBeNull();
    expect(mockRouter.push).toHaveBeenCalledWith("/");
  });
});
