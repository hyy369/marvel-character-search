# Marvel Character Search
## To run the app
Open `index.html ` using a modern browser.
## Known problems
- System will not respond if daily API calls exceeds 3000.
- For an unknown reason, thumbnails on the first page of the result will load but may not render properly in some cases. Going to next page and back again will show the images.

## Design process
### Aesthetic and minimalist design
I started with Bootstrap, a style sheet that I am familiar with. I decided to use a `jumbotron` for the main page that will include the title of the application, the search box, and other search parameter controls. I then use the responsive containers below the `jumbotron` to display the search results. This will keep the deisgn minimalistic and mobile-friendly.

I first only implemented the search box and the search button to test the API calls to see if I can get the desired result from the server. When I was able to parse the returned results, I designed the layout to display the result. I hard coded some results to the html so that I don't have to make unnecessary calls while fixing the layout. I choose to display the thumbnail image on the left column, and the character's name, comic title, and the decription on the right.

### Visibility of system status
I noticed that the recursive API calls can take some time before any result was returned. The users should infomred about the searching process so that they know that the system is responding. As soon as the user clicks the search button, the page will scroll to the result section and display "searching..." before replaced by any search results.

Sometimes the query returns no applicable results. Instead of showing a blank page, the user should be informed that there is no result matching the search parameters.

The search results will appear outside the visible area of the page. So the page will scroll to the result section when anything is returned. It will also scroll to top of the section when the user goes to a new page of results.

### Recognition rather than recall
Unlike title or initial letter, other search parameters should match the API requirements exactly in order to return the right results. So instead of let the user remember and type the exact year, format, and order condition, I use selection menus to implement these filters.

### Error prevention
The title or the initial letter field cannot be left empty. If the box is empty, the user will be alerted before the request is sent to the server.

I dumps the search result to a list of `div`s, and only display 10 of them at a time using `.slice()`. The user is able to go forward and back using two page control buttons. The user should not go back on the first page and go forward on the last page. So the buttons will automatically hide themselves if the action is not applicable.

### User control and freedom
The user may or may not want to define extra filters. So the year, format, and order by selections are hide into "more options".

### Help and documentation
I implemented a help page which is accessibel from the bottom of the homepage. The help page expalains which search parameters can be defined and which results will be returned, as well as the meaning of each of them.

### Attribution
Included attribution according to Marvel's requirement.
