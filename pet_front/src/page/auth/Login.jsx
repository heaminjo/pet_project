import { useForm } from 'react-hook-form';
import LoginComp from './LoginStyle';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import MemberApi from '../../api/MemberApi';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { PetContext } from '../../App';
import kakao from '../../images/kakao_login_large_wide.png';
import { API_BASE_URL } from '../../services/app-config';
import { KAKAO_REDIRECT_URI } from '../../services/app-config';
const KH_DOMAIN = `${API_BASE_URL}`;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  // 쿼리스트링에서 redirectTo 추출
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get('redirectTo') || '/'; // 기본값은 홈으로 설정

  const REST_API_KEY = 'f61e8c06e81e7134bf354ceb1c687438';

  //카카오오
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(REST_API_KEY);
      console.log('카카오 code를 받아옵니다.');
    }

    //코드 받아왔는지 검사
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (!code) return;
    else {
      kakaoLogin(code);
    }
  }, []);

  //유효성 조건(yup)
  const schema = yup.object({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, '올바른 이메일 형식이 아닙니다.')
      .matches(/^[^\s@]+@[^\s@]+\.(com|net|kr)$/i, '이메일 형식은 .com, .net, .kr 만 허용됩니다.')
      .required('필수 입력입니다.'),
    password: yup
      .string()
      .required('필수 입력입니다.')
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`\-=|\\]).{10,16}$/, '10~16자 대소문자+영문+특수 기호로 조합해주세요.'),
  });

  //폼 상태관리
  const {
    register, //폼 필드와 리액트 훅 폼을 연결
    watch, //특정 watch("email") 입력값들을 실시간 감시
    handleSubmit,
    trigger, //실시간 검사
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur', // 실시간 검사
  });

  //로그인 버튼 클릭
  const clickLogin = async () => {
    const result = await MemberApi.login(watch('email'), watch('password'));
    loginResponse(result);
  };
  //카카오 로그인
  const kakaoLogin = async (code) => {
    const result = await MemberApi.kakaoLogin(code);
    loginResponse(result);
  };

  //로그인 응답처리
  const loginResponse = (result) => {
    if (result.success) {
      sessionStorage.setItem('loginName', result.data.memberName);
      sessionStorage.setItem('accessToken', result.data.accessToken);
      sessionStorage.setItem('role', result.data.role);

      //만약
      if (result.data.role == 'ROLE_USER') conditionCheck();
      const url = location.state?.nextUrl ? -1 : '/';
      navigate(url);
    } else {
      alert(result.message);
    }
  };

  //업그레이드 검사
  const conditionCheck = async () => {
    const result = await MemberApi.conditionCheck();

    //만약 업그레이드 조건이 중족됐다면 이동
    if (result.success) {
      navigate('/upgrade/', { state: { nextGrade: result.data } });
    }
  };
  //카카오에 인가 코드를 발급받아서 다시 /login으로 온다.
  const kakaoCode = async () => {
    setValue('email', '');
    setValue('password', '');
    window.Kakao.Auth.authorize({
      redirectUri: KAKAO_REDIRECT_URI,
    });
  };

  // const kakaoCode = () => {
  //   const REST_API_KEY = "카카오 REST API 키";
  //   const REDIRECT_URI = "http://localhost:3000/login";

  //   const KAKAO_AUTH_URL =
  //     `https://kauth.kakao.com/oauth/authorize?` +
  //     `client_id=${REST_API_KEY}` +
  //     `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
  //     `&response_type=code` +
  //     `&prompt=login`; // 요게 핵심

  //   window.location.href = KAKAO_AUTH_URL;
  // };
  return (
    <LoginComp>
      <div className='login_inner'>
        <div className='login_container'>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit(() => clickLogin())}>
            <ul className='login_form'>
              <li>
                <input type='email' placeholder='Email' {...register('email')} />
                {errors.email && <p className='error_message'>{errors.email.message}</p>}
              </li>
              <li>
                <input type='password' placeholder='Password' {...register('password')} />
                {errors.password && <p className='error_message'>{errors.password.message}</p>}
              </li>
            </ul>
            <div className='login_btn'>
              <button type='submit'>로그인</button>
              <button onClick={() => kakaoCode()}>
                <img src={kakao} alt='카카오 로그인 버튼' />
              </button>
            </div>
          </form>
        </div>
      </div>
    </LoginComp>
  );
}
