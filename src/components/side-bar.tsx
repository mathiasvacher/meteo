import ThemeSwitcher from './theme-switcher.tsx'
import logoSite from '../assets/img/logo/logo.png';


function Sidebar() {
  
    return (
      <div className='side-bar'>
        <a href="https://github.com/mathiasvacher/" target="_blank" rel="noopener noreferrer" >
          <img src={logoSite} alt="Météo" className='logo'/>
        </a>
        <span className="brand-name">Météo</span>
        <ThemeSwitcher />
      </div>
    );
}
  
export default Sidebar;
