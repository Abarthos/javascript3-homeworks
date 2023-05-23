function requestJoke(keyword) {
  return fetch(`https://icanhazdadjoke.com/search?term=${keyword}`, {
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const jokes = data.results;
      const resultsList = [];
      if (jokes.length === 0) {
        resultsList.push("No results found");
      } else {
        jokes.forEach((joke) => {
          resultsList.push(joke.joke);
        });
      }
      return resultsList;
    });
}

const requestForm = document.getElementById("request-form");
const result = document.getElementById("result");

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const requestInput = document.getElementById("search-input");
  const keyword = requestInput.value.trim();
  if (keyword) {
    requestJoke(keyword)
      .then((results) => {
        const resultList = results.map((result) => `<li>${result}</li>`);
        result.innerHTML = `<ul>${resultList.join("")}</ul>`;
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = "<li>Jokes could not be loaded</li>";
      });
  }
});

