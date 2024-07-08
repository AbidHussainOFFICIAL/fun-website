document.getElementById('jokeButton').addEventListener('click', generateJokes);

async function generateJokes() {
    const jokeButton = document.getElementById('jokeButton');
    const jokesElement = document.getElementById('jokes');
    const loadingElement = document.getElementById('loading');

    jokeButton.disabled = true;
    loadingElement.style.display = 'block';

    const response = await fetch('https://api.jokes.one/jod?category=animal');
    const data = await response.json();
    const jokes = data.contents.jokes.map(j => j.joke.text);

    jokesElement.innerHTML = jokes.map(joke => `<li>${joke}</li>`).join('');
    loadingElement.style.display = 'none';
    jokeButton.disabled = false;
}
