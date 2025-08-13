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
          <p> tistory | ha7708.tistory.com </p>
          {/* <p>깃허브 | https://github.com/heaminjo/pet_project/tree/%EC%A0%95%EC%84%9C%EC%98%81-branch</p> */}
          <p> Notion | https://circular-alloy-d7c.notion.site/245ade4dadab8025a8a1c00c29488475 </p>

          <ul class='footer-team'>{/* <li>조해민 | 정서영 | 남장욱</li> */}</ul>
          <p class='footer-copy'>© 2025 Mongnyang Market. All rights reserved.</p>
        </div>
      </footer>
    </FooterComp>
  );
}
