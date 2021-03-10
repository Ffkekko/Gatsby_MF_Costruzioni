/* eslint-disable no-unused-vars */
import React from 'react';
import { FiChevronUp } from "react-icons/fi"
import styled from "styled-components"

const GoTop = (props) => {

  const [intervalId, setIntervalId] = React.useState(0);
  const [thePosition, setThePosition] = React.useState(false);
  const [showButton, setShowButton] = React.useState(false);
  
  const timeoutRef = React.useRef(null);


  React.useEffect(() => {
      document.addEventListener("scroll", () => {
          if (window.scrollY > 170) {
              setThePosition(true)
          } else {
              setThePosition(false);
          }
      });

      document.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
          setShowButton(true)
        } else {
          setShowButton(false);
        }
    });
    
      return () => {

      };

      // window.scrollTo(0, 0);
  }, [])
  
  const onScrollStep = () => {

      if (window.pageYOffset === 0){
          clearInterval(timeoutRef.current);
      }
      window.scroll(0, window.pageYOffset - props.scrollStepInPx);
  }

  const scrollToTop = () => {
      timeoutRef.current = setInterval(onScrollStep, props.delayInMs);

  }


  const renderGoTopIcon = () => {
    const buttonVisible = showButton ? 'upButton' : 'upButtonNone';

      return (
        <button
          type='button'
          className={`${buttonVisible}`}
          onClick={scrollToTop}
        >
          <FiChevronUp />
        </button>
      )
  }

  return (
    <Wrapper>
      {renderGoTopIcon()}
          
    </Wrapper>
  )
}

export default GoTop

const Wrapper = styled.section`


.upButton {
  position:fixed;
  font-weight:bold;
  font-size: 12px;
  bottom: 80px;
  right: 20px;
  color:white;
  background-color:black !important;
  padding:8px;
  opacity:0.5;
  border:none;
}

.upButton:hover {
  opacity:1 !important;
  border: none;
}

.upButtonNone {
  display: none;
}
  
@media only screen and (min-width: 768px) {

.upButton {
  font-size: 16px;
  padding:12px;
}
}

`