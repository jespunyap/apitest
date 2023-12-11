import { BrowserRouter } from "react-router-dom";
import LandingPage from "./LandingPage";
import { render, screen } from '@testing-library/react';
import App from "../App";

const Mocktest =()=>{
    return(
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    )
  }

test('renders learn react link', () => {
    render(<Mocktest />);
    const linkElement = screen.getByText(/Onboarding/i);
    expect(linkElement).toBeInTheDocument();
  });
  