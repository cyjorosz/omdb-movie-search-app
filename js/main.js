function getUserInput() {
  return document.querySelector('#searchInput').value;
}

function handleSubmit() {
  const searchTerm = getUserInput().trim();

  if (userInputIsEmpty(searchTerm)) {
    clearPreviousSearchResults();
    hideMovieNotFound();
    displayEmptyUserInputMessage();
  } else {
    hideEmptyUserInputMessage();
    clearPreviousSearchResults();
    fetchResults(searchTerm);
  }
}

function fetchResults(searchTerm) {
  const apiKey = '338f9a63';
  const request = new XMLHttpRequest();
  const url = 'http://www.omdbapi.com/?s=' + encodeURI(searchTerm) + `&apikey=${apiKey}&`;
  request.open('GET', url);
  request.send();

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      const response = JSON.parse(request.responseText);
      if (responseHasResults(response)) {
        displayMovieResults(response);
        hideMovieNotFound();
      } else {
        displayMovieNotFound();
      }
    } else {
      console.log('Still waiting for response to finish');
    }
  };
}

function displayMovieResults(movieObject) {
  const searchResults = document.querySelector('#searchResults');
  movieObject.Search.forEach(movie => {
    const movieContainer = document.createElement('div');
    searchResults.appendChild(movieContainer);
    movieContainer.innerHTML += '<div class="movie-poster"><img src="' + movie.Poster + '" alt="Movie poster" class="poster-image"><p class="movie-title">' + movie.Title + '</p></div>';
  });
}

function responseHasResults(response) {
  if (response.Response === 'True') {
    return true;
  } else {
    return false;
  }
}

function userInputIsEmpty(searchTerm) {
  if (searchTerm === '') {
    return true;
  } else {
    return false;
  }
}

function displayUserInput(input) {
  document.getElementById('searchTerm').innerHTML = getUserInput();
}

function displayEmptyUserInputMessage() {
  document.getElementById('formValidation').style.display = 'block';
}

function hideEmptyUserInputMessage() {
  document.getElementById('formValidation').style.display = 'none';
}

function displayMovieNotFound() {
  injectUserSearchTermInNoResultsMessage();
  document.getElementById('noResults').style.display = 'block';
}

function injectUserSearchTermInNoResultsMessage() {
  document.getElementById('searchTerm').innerHTML = getUserInput();
}

function hideMovieNotFound() {
  document.getElementById('noResults').style.display = 'none';
}

function clearPreviousSearchResults() {
  document.getElementById('searchResults').innerHTML = '';
}


