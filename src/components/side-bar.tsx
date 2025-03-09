import ThemeSwitcher from './theme-switcher.tsx'
import logoSite from '../assets/img/logo/logo.png';


function Sidebar() {
  
    return (
      <>
      <div className='side-bar box'>
        <a href="https://github.com/mathiasvacher/" target="_blank" rel="noopener noreferrer" >
          <img src={logoSite} alt="Site Logo" className='logo'/>
        </a>
        <ThemeSwitcher />
        <h1> Sidebar</h1>
      </div>

      </>
    );
}
  
export default Sidebar;
