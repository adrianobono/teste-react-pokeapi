import { render, screen } from "@testing-library/react";
import App from "./App";

test("deve conter somente um elemento de imagem para o logo", () => {
  render(<App />);
  const getImage = screen.getByRole("img");
  expect(getImage).toBeInTheDocument();
});
