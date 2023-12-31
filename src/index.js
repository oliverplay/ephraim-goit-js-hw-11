import axios from 'axios';

const formEl = document.querySelector('.search-form');
const gallery = document.querySelector(".gallery");
const loadmoreEl = document.querySelector(".load-more")
console.log(loadmoreEl)
// Initialize current page number
let page = 1;

// Add an event listener to the form to handle form submissions
formEl.addEventListener('submit', handleFormSubmit);

// Function to handle form submissions
async function handleFormSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Get the user input from the first input element in the form and remove any leading/trailing white spaces
  const userInput = e.target[0].value.trim();

  // Fetch data from the API using the user input and the current page number
  const data = await fetchData(userInput, page);

  // Log the hits array from the fetched data (each hit represents an image)
  console.log(data.hits);

  // Check if there are no images found based on the total count from the API response
  if (data.total === 0) {
    // Display an alert to the user if no images are found
    alert('Sorry, no images found. Please try again.');
  } else {
    createMarkup(data.hits);  // a number 
  }

  // Reset the input value to an empty string after the form is submitted
  e.target[0].value = '';
}

// Function to fetch data from the Pixabay API based on user input and page number
async function fetchData(userInput, page) {
  try {
    // Make an HTTP GET request using Axios to the Pixabay API
    const response = await axios.get(
      `https://pixabay.com/api/?key=38245803-17b2e774beea3b422758604fe&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
    );

    // Return the data (hits array and other information) from the API response
    return response.data;
  } catch (error) {
    // If an error occurs during the API call, log the error message and throw the error
    console.error('Error fetching data:', error);
    throw error; // You can handle the error further if needed
  }
}

// Function to create the necessary markup and display the images on the page
function createMarkup(hits) {

    for (let i = 0; i < hits.length; i++){

       let divEl = document.createElement("div")
        divEl.className = "photo-card";

       divEl.innerHTML =   `<img src="${hits[i].webformatURL}" alt="${hits[i].tags}" loading="lazy" />
            <div class="info">
                <p class="info-item">
                <b>Likes</b>
                <br>
                ${hits[i].likes}
                </p>

                <p class="info-item">
                <b>Views</b>
                 ${hits[i].views}
                </p>
               
                <p class="info-item">
                <b>Comments</b>
                <br>
                ${hits[i].comments}
                </p>
                <p class="info-item">
                <b>Downloads</b>
                <br>
                ${hits[i].downloads}
                </p>
            </div>`;
        
        gallery.append(divEl)
    }
   

    console.log(hits.length)
}




