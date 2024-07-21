import profIcon from '../assets/profIcon.svg';
import './ProfileWidget.css'
const ProfileWidget = () => {
  return (
    <div className='profileNavbar'>
      <img className='imgProf' src={profIcon} alt='Profile Widget' />
    </div>
  );
};

export default ProfileWidget;
