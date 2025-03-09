import Sidebar from "./../components/side-bar.tsx";
import Searchbar from "./../components/pages/homepage/search-bar.tsx";
import Currentdata from "./../components/pages/homepage/current-data.tsx";
import Dayprevision from "./../components/pages/homepage/day-prevision.tsx";
import Weekprevision from "./../components/pages/homepage/week-prevision.tsx";
import Miscellaneous from "./../components/pages/homepage/miscellaneous.tsx";


function Homepage() {
  
    return (
      <>
        <div className="container-fluid">
          <div className="row row-page">
            <div className="sidebar-page col-3">
              <Sidebar />
            </div>

            <div className="middle-page col-13">
              <Searchbar />
              <Currentdata />
              <Dayprevision />
              <Miscellaneous />
            </div>

            <div className="weekprev-page col-8">
              <Weekprevision />
            </div>
          </div>
        </div>
      </>
    );
}
  
export default Homepage;
