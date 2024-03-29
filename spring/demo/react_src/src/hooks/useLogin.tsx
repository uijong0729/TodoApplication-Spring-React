// 커스텀 훅은 접두어에 use를 붙이는 것이 관례
import axios from "axios";
import { useState, useContext } from "react";
import { UserEntity } from "./api/UserEntity";
import { Constants } from "../utils/Constants";
import { useNavigate } from "react-router-dom";
import {AuthContext} from "../provider/AppContext";

// 모든 유저 일람을 취득하는 커스텀 훅
export const useLogin = () => {
    const { authenticated, setAuthenticated } = useContext(AuthContext);
    const [userEntity, setUserEntity] = useState<UserEntity>();
    const navigate = useNavigate();

    // 로그인
    const goLogin = async (props: UserEntity) => {
      // post
      await axios.post<UserEntity>(`${Constants.ENV}/login`, {
          username: props.username,
          password: props.password
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      // 로그인 OK
      .then((response) => {
        const res :UserEntity = {
          username: response.data.username,
          password: response.data.password,
          groupId: ''
        };
        setUserEntity(res);
        //setIsLogin(true);
        setAuthenticated(true);
        navigate("/");
      })
      // 에러가 발생할 경우
      .catch((error)=>{
        console.log(error);
        setAuthenticated(false);
        //setIsLogin(false);
      })
    }

    // 회원가입
    // const addUser = (param :UserEntity) :void => {
    //   const formData = new FormData();
    //   formData.append('id', param.id)
    //   formData.append('pass', param.pass)

    //   axios.post<UserEntity>(`${Constants.ENV}/signup`, formData, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //         //"Content-Type": "multipart/form-data"
    //     }
    //   })
    //   .then((response) => {
    //     console.log(response);
    //   })
    //   // 에러가 발생할 경우
    //   .catch((error)=>{
    //     console.log(error);
    //   })
    // }

    const addUser = async (props: UserEntity) => {
      // post
      await axios.post<UserEntity>(`${Constants.ENV}/signup`, {
          username: props.username,
          password: props.password,
          groupId: props.groupId
      }, {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      // 로그인 OK
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      // 에러가 발생할 경우
      .catch((error)=>{
        console.log(error);
      })
    }

    // 다른 곳에서 사용할 수 있도록 반환
    return {
      userEntity, goLogin, addUser//, isLogin
    };
};