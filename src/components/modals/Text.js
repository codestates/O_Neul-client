import React from "react";
import styled from "styled-components";

export const Text = ({ setDiaryText }) => {
  const canvasHeight = (window.innerWidth / 2) * 0.4;
  const textAreaHeight = window.innerHeight - 135 - canvasHeight;

  return (
    <TextArea
      className="textarea"
      placeholder="오늘은 어떠셨나요?"
      textAreaHeight={textAreaHeight}
      onChange={(e) => {
        setDiaryText(e.target.value);
      }}
    />
  );
};

export default React.memo(Text);

const TextArea = styled.textarea`
  border: none;
  height: ${(props) => props.textAreaHeight}px;
  resize: none;
  /* z-index: 1; */
  /* padding: 2.5rem; */
  border: none;
  font-size: 1.7rem;
  outline: none;
  color: #7f7366;
  font-family: var(--thick-font);

  background-attachment: local;
  background-position: 0 0.5rem;
  background-image: url("https://www.transparenttextures.com/patterns/sandpaper.png"),
    linear-gradient(to right, #f2ede3 0.5rem, transparent 0.5rem),
    //가로
    linear-gradient(to left, #f2ede3 0.5rem, transparent 0.5rem),
    //가로
    repeating-linear-gradient(
        #f2ede3,
        #f2ede3 3.3rem,
        #d2c1aa 3.3rem,
        #d2c1aa 3.4rem,
        white 3.4rem
      );
  line-height: 3.4rem;
  letter-spacing: 0.5px;
  padding: 0.6rem 4.5rem;
`;
