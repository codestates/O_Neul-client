import { useState, useEffect } from 'react';
import { Switch, Route, Link } from "react-router-dom";
import axios from 'axios';
import Swal from 'sweetalert2';
import Modify from './modify/Modify';
import MypageHeader from './MypageHeader';
import ProfileImg from './ProfileImg';
import GetMyDiary from './GetMyDiary';
import Nav from './Nav';
import MyInfo from './MyInfo';
import {
  BoxContainer,
  FormContainer,
  UserInfoForm,
  UserContentForm,
  ContentContainer,
  ContentTitle,
  Div,
  Frame,
  Info,
  Input,
  UserContent,
  Button
} from '../../styles/mypage/Mypage.style';


const Mypage = () => {
  const [modiValues, setModiValues] = useState({
    nickname: 'test',
    email: 'test@test.com',
    nowPassword: '',
    password: '',
    password2: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <>
      <BoxContainer>
        <MypageHeader onSubmit={handleSubmit} />
        <FormContainer>
          <ContentContainer>
            <Div>
              <ContentTitle>나의 오늘,</ContentTitle>
            </Div>
            <UserInfoForm>
              <Frame>
                <Switch>
                  <Route path="/mypage/modify" exact>
                    <Modify />
                  </Route>
                  <ProfileImg />
                </Switch>
                <Info>나의 프로필</Info>
                <Input
                  type="text"
                  value={modiValues.nickname}
                  name="nickname"
                  readOnly
                />
                <Input
                  type="email"
                  value={modiValues.email}
                  name="email"
                  readOnly
                />
                <Link to="/mypage/modify">
                  <Button>나의 정보수정</Button>
                </Link>
              </Frame>
            </UserInfoForm>
            <UserContentForm>
              <UserContent>
                <Switch>
                  <Route path="/mypage/myinfo" exact>
                    <MyInfo />
                  </Route>
                  <Route path="/mypage/mydiary" exact>
                    <GetMyDiary />
                  </Route>
                </Switch>
                <Nav />
              </UserContent>
            </UserContentForm>
          </ContentContainer>
        </FormContainer>
      </BoxContainer>

    </>
  )
}
export default Mypage
