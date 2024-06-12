import { renderRouter, screen } from "expo-router/testing-library";

describe("Login Screen", () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it("should render login screen", () => {
    renderRouter("../src/app/index");
    expect(screen).toHavePathname("");
  });
});
