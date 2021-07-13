import React, { useState, useEffect, useCallback } from "react";
import moment from "moment";
import "../../style.css";
import Calendar from "./calendar/Calendar";
import CalendarHeader from "./calendar/CalendarHeader";
import Diary from "../modals/Diary";
import DiaryWriting from "../modals/DiaryWriting";
import MusicModal from "../modals/MusicModal";
import {
  MainSection,
  CalendarWrapper,
  MainInnerSection,
  MainInnerWrapper,
  DiaryWrapper,
} from "../../styles/main/Main.style";
import MainHeaderCompo from "./MainHeaderCompo";
import MyCards from "./cards/MyCards";
import OtherCards from "./cards/OtherCards";
import { connect } from "react-redux";
import axios from "axios";
import { fetchAllLoginDiary, fetchAllUnloginDiary } from "../../actions";

const Main = ({ userInfo, fetchAllLoginDiary, fetchAllUnloginDiary }) => {
  const [value, setValue] = useState(moment());
  const [isClick, setIsClick] = useState(false);
  const [clickmoment, setClickmoment] = useState(null);

  useEffect(() => {
    if (clickmoment !== null) {
      return setIsClick((prev) => setIsClick(!prev));
    }
  }, [clickmoment]);

  useEffect(() => {
    return axios(
      "https://oneul.site/O_NeulServer/main",
      {
        headers: {
          authorization: "Bearer " + userInfo.login.accessToken,
        },
      },
      {
        withCredentials: true,
      }
    )
      .then((data) => {
        return data.data.data;
      })
      .then((result) => {
        if (userInfo.login.accessToken) {
          return fetchAllLoginDiary(
            result.publicDiary,
            result.myDiary,
            result.musicList
          );
        } else {
          return fetchAllUnloginDiary(result.publicDiary, result.musicList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const closeDiaryModal = () => {
    setIsClick((prev) => setIsClick(!prev));
  };

  const momentHandler = (day) => {
    setClickmoment(day);
  };

  const next = useCallback(() => {
    setValue(value.add(1, "month").clone());
  }, [value]);

  const before = useCallback(() => {
    setValue(value.subtract(1, "month").clone());
  }, [value]);

  return (
    <>
      {isClick && (
        <Diary clickmoment={clickmoment} closeDiaryModal={closeDiaryModal} />
      )}
      <MainSection>
        <MainHeaderCompo />
        <MainInnerSection>
          <MainInnerWrapper>
            <CalendarWrapper>
              <CalendarHeader value={value} next={next} before={before} />
              <Calendar value={value} modalHandle={momentHandler} />
            </CalendarWrapper>
            <DiaryWrapper>
              <MyCards modalHandle={momentHandler} />
              <OtherCards />
            </DiaryWrapper>
          </MainInnerWrapper>
        </MainInnerSection>
      </MainSection>
    </>
  );
};

const mapStateToProps = ({ loginReducer }) => {
  return {
    userInfo: loginReducer,
  };
};

export default connect(mapStateToProps, {
  fetchAllLoginDiary,
  fetchAllUnloginDiary,
})(Main);
