import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import '@testing-library/jest-dom/extend-expect';
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";

it('renders without crashing', function() {
  render(<Carousel />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

describe('test our carousel arrows and functionality', () => {
    let queryByAltText;
    let queryByTestId
    let rightArrow;
    let leftArrow;

  beforeEach(() => {
    ({ queryByTestId, queryByAltText } = render(
      <Carousel cardData={[
          {
            src: image1,
            caption: "Photo 1"
          },
          {
            src: image2,
            caption: "Photo 2"
          }
        ]}
      />));

    rightArrow = queryByTestId("right-arrow");
    leftArrow = queryByTestId("left-arrow");
  });
  
  it("works when you click on the right arrow", function() {
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo 1")).toBeInTheDocument();
    expect(queryByAltText("Photo 2")).not.toBeInTheDocument();
    
    // move forward in the carousel
    fireEvent.click(rightArrow);
    
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo 1")).not.toBeInTheDocument();
    expect(queryByAltText("Photo 2")).toBeInTheDocument();
  });
  
  it("works when you click on the left arrow", function() {
    // move forward in the carousel
    fireEvent.click(rightArrow);
    
    // expect the second image to show, but not the first
    expect(queryByAltText("Photo 1")).not.toBeInTheDocument();
    expect(queryByAltText("Photo 2")).toBeInTheDocument();
    
    // move backward in the carousel
    fireEvent.click(leftArrow);
    
    // expect the first image to show, but not the second
    expect(queryByAltText("Photo 1")).toBeInTheDocument();
    expect(queryByAltText("Photo 2")).not.toBeInTheDocument();
  });
  
  it("hides left arrow when on the first image", function() {
    // expect the first image to show
    expect(queryByAltText("Photo 1")).toBeInTheDocument();
    
    // expect the left arrow to be hidden
    expect(leftArrow).toHaveClass('isHidden');
  });

  it("hides right arrow when on the second image", function() {
    // move forward in the carousel
    fireEvent.click(rightArrow);

    // expect the second image to show
    expect(queryByAltText("Photo 2")).toBeInTheDocument();
    
    // expect the right arrow to be hidden
    expect(rightArrow).toHaveClass('isHidden');
  });
  
});