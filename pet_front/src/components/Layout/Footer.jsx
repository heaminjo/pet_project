import FooterComp from './FooterStyle';
import logo from '../../images/몽냥마켓로고.png';

export default function Footer() {
  return (
    <FooterComp>
      <footer class='footer'>
        <div class='footer-content'>
          <div className='center'>
            <img src={logo} alt='로고' />
          </div>
          <p>사랑스러운 반려동물을 위한 특별한 쇼핑몰</p>

          <ul class='footer-team'>{/* <li>조해민 | 정서영 | 남장욱</li> */}</ul>

          <p class='footer-copy'>© 2025 Mongnyang Market. All rights reserved.</p>
        </div>
      </footer>
    </FooterComp>
  );
}
