import React, { useEffect } from 'react'
import MyCard from '../../main/cards/card/MyCard';
import { DiaryLogin } from '../../../styles/main/cards/MyCards.style'
import { Link } from 'react-router-dom';
import { Icon } from "react-icons-kit";
import { pencil } from "react-icons-kit/entypo/pencil";
import { connect } from "react-redux";
import styled from 'styled-components';
import { flexCenter } from "../../../styles/global.style";

const MyCardList = ({ myDiaries }) => {
  console.log(myDiaries)

  const content =
    myDiaries.length === 0 ? (
      <DiaryLogin>
        <Link to="/main">
          일기쓰러가기
        </Link>
        <Icon icon={pencil} />
      </DiaryLogin>
    ) : (
      <CardFace>
        {myDiaries.map((diary) => <MyCard key={diary.id} diary={diary} />)}
      </CardFace>
    )

  return (
    <div>
      {(content)}
    </div>
  )
}
const mapStateToProps = ({ mainReducer }) => {
  return {
    diary: mainReducer,
  };
};

export default connect(mapStateToProps)(MyCardList);
// export default MyCardList;

export const CardFace = styled.div`
display: flex;
flex-wrap: wrap;
  width: 100%;
  height: 35%;
  transform-style: preserve-3d;
  ${flexCenter}
  transition: 1s all ease-out;
  backface-visibility: hidden;
  border-radius: 5px;
`;