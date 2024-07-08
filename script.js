document.getElementById('jokeButton').addEventListener('click', generateJoke);

async function generateJoke() {
    const response = await fetch('https://api.jokes.one/jod');
    const data = await response.json();
    const joke = data.contents.jokes[0].joke.text;

    document.getElementById('joke').innerText = joke;
}
