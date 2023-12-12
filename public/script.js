

//programmed to only intake cities only
async function searchEvents(query) {
  const apiKey = "92dDw5p3vPjhsTnJIm7sXVZlLOBsSYoB";
  const url = `https://app.ticketmaster.com/discovery/v2/events.json?city=${query}&apikey=${apiKey}`; //encodeURIComponent(query)

  try {
    const response = await fetch(url); // Await the fetch call
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json(); // Await parsing the response as JSON
    displayEvents(data);
  } catch (error) {
    console.error("Error:", error);
  }

  //synchronous version
  // fetch(url)
  //   .then((response) => response.json()) //we get response in json
  //   .then((data) => displayEvents(data)) //using the received data, we call the display function
  //   .catch((error) => console.error("Error:", error)); //if there is an error, we log it to the console
}

function displayEvents(data) {
  const resultsContainer = document.getElementById("eventResults");
  resultsContainer.innerHTML = ""; // every time the searchbar is used, we clear the container of previous results

  if (!data._embedded || !data._embedded.events) {
    //* if there are no results found
    resultsContainer.innerHTML = "<p>No events found. Try another search!</p>";
    return;
  }

  const events = data._embedded.events;
  events.forEach((event) => {
    console.log(event);
    const eventName = event.name;
    //const eventLocation = event._embedded.address; for some reason it is not showing //<p>Address: ${eventLocation}</p>
    const eventDate = event.dates.start.localDate;
    const eventTime = event.dates.start.localTime || "TBA";
    const eventInfo = `<div class="event">
    <h2>${eventName}</h2>
    <p>Date: ${eventDate}</p>
    <p>Time: ${eventTime}</p>
    </div>`; //here we add the event info to the container as an HTML code
    resultsContainer.innerHTML += eventInfo;
  });
}

/////////
document.getElementById("searchBtn").addEventListener("click", function () {
  const query = document.getElementById("searchField").value;
  searchEvents(query);
});

//*
// _embedded property:In the context of the Ticketmaster API, the _embedded property is a part of their JSON response structure. It typically contains nested resources related to the primary resource you requested. For example, when you search for events, the main response object might contain metadata, pagination info, and links. The actual event data, however, is nested within an _embedded object.

// The benefits of making the program asynchronous are:

// Non-blocking: Asynchronous code allows other parts of your application to continue running while waiting for long-running operations (like network requests) to complete. This prevents your application from freezing or becoming unresponsive.

// Improved Responsiveness: Users won't experience delays or freezes in the user interface when making network requests. The UI remains responsive because the JavaScript event loop can handle other tasks while waiting for the asynchronous operation to finish.

// Efficient Resource Utilization: Asynchronous code can efficiently utilize system resources. It doesn't block the CPU while waiting for I/O operations, making your application more resource-efficient.

// Better User Experience: Asynchronous operations enhance the user experience by providing faster feedback and smoother interactions in web applications.
