document.getElementById('jokeButton').addEventListener('click', generateJoke);

async function generateJoke() {
    const jokeButton = document.getElementById('jokeButton');
    const jokeElement = document.getElementById('joke');
    const loadingElement = document.getElementById('loading');

    jokeButton.disabled = true;
    jokeElement.style.display = 'none';
    loadingElement.style.display = 'block';

    const response = await fetch('https://api.jokes.one/jod');
    const data = await response.json();
    const joke = data.contents.jokes[0].joke.text;

    jokeElement.innerText = joke;
    jokeElement.style.display = 'block';
    loadingElement.style.display = 'none';
    jokeButton.disabled = false;
}
