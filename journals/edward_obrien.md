# Monday 11/14

* Solidified stand-up and stand-down times and goals. Got our branches setup as well as the base code for the project so everyone is on the same page. Assigned issues for our main application features for each team member to begin writing up. Ran into an issue with our Campground Detail API that it wasn't returning results properly. After doing research on other possible API's, we found that one of the parameters was documented incorrectly. Began laying out the issue for my current task of the advanced search page.

# Tuesday 11/15

* Researched React Hooks and started building react component for advanced search.

# Wednesday 11/16

* Continued building advanced search page.

# Thursday 11/17

* Worked on creating routes in FastAPI for calling the Campground Search API to circumvent the CORS errors we were getting.

# Friday 11/18

* Figured out we can't use the ActiveNet API for campground searches so we did research for other APIs and decided on using a mixture of the NPS API, Google Places API, and Wikimedia API.

# Monday 11/21

* Worked on creating routes and endpoints for searching with the Places API.

# Tuesday 11/22

* Continued the work from Monday.

# Wednesday 11/23

* Created routes and endpoints for getting data from the NPS api.

# Monday 11/28

* Helped Jeff fix a merge and worked on diagnosing my react issues after a larger merge.

# Tuesday 11/29

* Mostly diagnosed why my react app was taking an hour to render or not at all. Ended up updating my integrated GPU, starting React just locally and not in Docker, and using yarn over npm.

# Wednesday 11/30

* Worked on converting the search page from a class component to a function component using hooks. Diagnosed the slow speed of our NPS api and found a solution. Got the parks returned to pass into the Home component.

# Thursday 12/1

* Added State/Territory and Activity parameters to the search page.

# Friday 12/2

* Added Search Radius and Park Designation parameters to the search page.

# Monday 12/5

* Assessment and began work on integrating favorites into the database and React.

# Tuesday 12/6

* Continued working on favorites and visited markers for accounts.

# Wednesday 12/7

* Worked on making unit tests and continued working on favorites.
