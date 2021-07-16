import React, { useEffect } from 'react'
import MyCard from '../../main/cards/card/MyCard';
import { Link } from 'react-router-dom';
import { DiaryLogin } from '../../../styles/main/cards/MyCards.style'
import { Icon } from "react-icons-kit";
import { pencil } from "react-icons-kit/entypo/pencil";
import { connect } from "react-redux";
import styled from 'styled-components';
import { flexCenter } from "../../../styles/global.style";

const MyCardList = ({ myDiaries, diary }) => {
  console.log(myDiaries)
  console.log(diary.myDiary)

  const content =
    myDiaries.length === 0 ? (
      <Link to="/main">
        <DiaryLogin>
          🚧 쓰기작업 공사중 메인페이지로 이동 🚧
        </DiaryLogin>
        {/* <DiaryLogin>
          일기작성은 메인페이지에서
          <Icon icon={pencil} />
        </DiaryLogin> */}
      </Link>
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
  height: 65vh;
  transform-style: preserve-3d;
  ${flexCenter}
  transition: 1s all ease-out;
  backface-visibility: hidden;
  border-radius: 5px;
`;