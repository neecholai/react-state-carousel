import React from "react";
import { render } from "@testing-library/react";
import image1 from "./image1.jpg";
import Card from './Card';

it('renders without crashing', function() {
  render(
    <Card caption='test caption' src={image1} currNum='1' total='2' />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Card caption='test caption' src={image1} currNum='1' total='2' />);
  expect(asFragment()).toMatchSnapshot();
});