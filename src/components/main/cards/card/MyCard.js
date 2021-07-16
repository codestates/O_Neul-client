import React from "react";
import {
  MyDiary,
  MyDiaryFrontHeader,
  MyDiaryCardFront,
  MyDiaryBack,
  MyDiaryBackTextWrapper,
  MyDiaryBackText,
  IconWrapper,
} from "../../../../styles/main/cards/MyCards.style";
import mypic from "../../../../images/mypic.jpeg";
import { findEmj, splitDate } from "./cardfunction";
import { icons } from "../../../../../src/icons/icons";
import { FaceWeather } from "../../../../styles/main/cards/OtherCards.style";
import { removeDiary, removePublicDiary } from "../../../../actions/index";
import { connect } from "react-redux";
import styled from "styled-components";
import { Icon } from "react-icons-kit";
import { trash2 } from "react-icons-kit/feather/trash2";
import axios from "axios";
import moment from "moment";

const MyCard = ({
  diary,
  removeDiary,
  removePublicDiary,
  userInfo,
  modalHandle,
}) => {
  const { faceIcons, weatherIcons } = icons;
  const { id, isPublic, date, feeling, text, weather } = diary;
  const { accessToken } = userInfo.login;

  const deleteUrl = "https://oneul.site/O_NeulServer/diary/delete";

  const removePost = (e) => {
    e.stopPropagation();
    return axios
      .delete(deleteUrl, {
        headers: { authorization: "Bearer " + accessToken },
        data: { diaryId: id },
        withCredentials: true,
      })
      .then(() => {
        if (isPublic) {
          removePublicDiary(id);
        } else {
          removeDiary(id);
        }
      })
      .catch((err) => console.log(err));
  };

  const openModifyDiaryModal = () => {
    modalHandle(moment(date));
  };

  return (
    <MyDiary onClick={openModifyDiaryModal}>
      <MyDiaryCardFront>
        <MyDiaryFrontHeader>
          {splitDate(date)[0]}년 {splitDate(date)[1]}월 {splitDate(date)[2]}일
        </MyDiaryFrontHeader>
        <img src={userInfo.userInfo.picture} alt="" />
        <IconWrapper>
          <FaceWeather>
            {weather && findEmj(weatherIcons, weather).icon}
            {feeling && findEmj(faceIcons, feeling).icon}
          </FaceWeather>
        </IconWrapper>
      </MyDiaryCardFront>
      <MyDiaryBack>
        <MyDiaryBackTextWrapper>
          <RemoveBtn onClick={(e) => removePost(e)}>
            <Icon icon={trash2} size={20} />
          </RemoveBtn>
          <MyDiaryBackText>{text}</MyDiaryBackText>
        </MyDiaryBackTextWrapper>
      </MyDiaryBack>
    </MyDiary>
  );
};

const mapStateToProps = ({ loginReducer }) => {
  return { userInfo: loginReducer };
};

export default connect(mapStateToProps, { removePublicDiary, removeDiary })(
  MyCard
);

const RemoveBtn = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  border: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  &:active {
    transform: scale(0.9);
  }
`;
