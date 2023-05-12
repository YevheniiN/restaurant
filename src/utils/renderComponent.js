import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

const renderComponent = (Component) => {
  const component = render(
    <BrowserRouter>
      {Component}
    </BrowserRouter>
  );

  return { component };
}

export default renderComponent;