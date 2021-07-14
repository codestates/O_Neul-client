import React from "react";
import styled from "styled-components";
import { flexCenter } from "../../styles/global.style";
import DiaryWriting from "../modals/DiaryWriting";
import { connect } from "react-redux";
import "aos/dist/aos.css";

const Diary = ({ closeDiaryModal, clickmoment, diary }) => {
  const selectedDiary = diary.myDiary.filter(
    (el) => el.date === clickmoment.format("YYYY-M-D")
  )[0];

  console.log(clickmoment.format("L"));
  return (
    <Diarybackground data-aos={"zoom"} data-aos-duration={"500"}>
      <DiaryWriting
        closeDiaryModal={closeDiaryModal}
        clickmoment={clickmoment}
        selectedDiary={selectedDiary}
      />
    </Diarybackground>
  );
};
const mapStateToProps = ({ mainReducer }) => {
  return {
    diary: mainReducer,
  };
};

export default connect(mapStateToProps)(Diary);

export const Diarybackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  background: rgba(0, 0, 0, 0.4);
  text-align: center;
  ${flexCenter}
`;
