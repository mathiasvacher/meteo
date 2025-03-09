import Sidebar from "./../components/side-bar.tsx";
import Searchbar from "./../components/pages/homepage/search-bar.tsx";
import Currentdata from "./../components/pages/homepage/current-data.tsx";
import Dayprevision from "./../components/pages/homepage/day-prevision.tsx";
import Weekprevision from "./../components/pages/homepage/week-prevision.tsx";
import Miscellaneous from "./../components/pages/homepage/miscellaneous.tsx";


function Homepage() {
  
    return (
      <>
        <Sidebar />
        <Searchbar />
        <Currentdata />
        <Currentdata />
        <Dayprevision />
        <Weekprevision />
        <Miscellaneous />
      </>
    );
}
  
export default Homepage;
