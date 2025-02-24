import * as model from './model.js';
import MapView from './views/mapView.js';
import sideBarView from './views/sideBarView.js';



const controller = {
  async init() {
      console.log("Controller initializing...");

      // Step 1: Initialize the Model
      await model.init();

      // Step 2: Initialize Views
      this.MapView = new MapView();  // Create an instance of MapView

      /*
      this.sideBarView = new SideBarView();
      this.sideBarView.init();
      */
  }
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded - Initializing Controller");
  controller.init();
});



//Voorbeeld
/*const controlLoadSideBar= async function () {
    try {
      resultsView.renderSpinner();
  
      // 1) Get search query                
      const query = searchView.getQuery();
      if (!query) return;
  
      // 2) Load search results
      await model.loadSearchResults(query);
  
      // 3) Render results
      resultsView.render(model.getSearchResultsPage());
  
      // 4) Render initial pagination buttons
      paginationView.render(model.state.search);
    } catch (err) {
      console.log(err);
    }
  };
  */