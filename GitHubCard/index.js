/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios.get('https://api.github.com/users/MaryamMosstoufi')

  //   /*
  //     STEP 2: Inspect and study the data coming back, this is YOUR
  //       github info! You will need to understand the structure of this
  //       data in order to use it to build your component function

  //       Skip to STEP 3.
  //   */

  //   /*
  //     STEP 4: Pass the data received from Github into your function,
  //       and append the returned markup to the DOM as a child of .cards
  //   */
  .then(response => {
    let newCard = cardMaker(response.data);
    document.querySelector('.cards').appendChild(newCard);

    console.log(response.data.followers_url);
    // Stretch

    axios.get(response.data.followers_url)
      .then(response => {

        console.log(response.data);

        for (let i = 0; i < response.data.length; i++) {
          axios.get(response.data[i].url)
            .then(response => {
              let newCard = cardMaker(response.data);
              document.querySelector('.cards').appendChild(newCard);
            })
            .catch(error => {
              console.log("Error:", error);
            })
        }
      })
      .catch(error => {
        console.log("Error:", error);
      })

  })
  .catch(error => {
    console.log("Error:", error);
  })

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  'https://api.github.com/users/leachcoding',
  'https://api.github.com/users/Ladrillo',
  'https://api.github.com/users/sage-jordan',
  'https://api.github.com/users/darkfrog26',
  'https://api.github.com/users/Katnoelii'
];

let newFollowersCards = followersArray.map((arrayItem) => {
  axios.get(arrayItem)
    .then(response => {
      let newFollowerCard = cardMaker(response.data);
      document.querySelector('.cards').appendChild(newFollowerCard);
    })
    .catch(error => {
      console.log("Error:", error);
    })
});


/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/
function cardMaker(cardData) {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');

  const imgElement = document.createElement('img');
  imgElement.setAttribute('src', cardData.avatar_url);
  cardDiv.appendChild(imgElement);

  const cardInfoDiv = document.createElement('div');
  cardInfoDiv.classList.add('card-info');
  cardDiv.appendChild(cardInfoDiv);

  const nameH3 = document.createElement('h3');
  nameH3.classList.add('name');
  nameH3.textContent = cardData.name;
  cardInfoDiv.appendChild(nameH3);

  const usernameP = document.createElement('p');
  usernameP.classList.add('username');
  usernameP.textContent = cardData.login;
  cardInfoDiv.appendChild(usernameP);

  const userLocationP = document.createElement('p');
  userLocationP.textContent = cardData.location;
  cardInfoDiv.appendChild(userLocationP);

  const userProfileP = document.createElement('p');
  userProfileP.textContent = 'Profile: ';
  cardInfoDiv.appendChild(userProfileP);

  const userProfileLink = document.createElement('a');
  userProfileLink.setAttribute('href', cardData.url);
  userProfileLink.textContent = cardData.url;
  userProfileP.appendChild(userProfileLink);

  const followersP = document.createElement('p');
  followersP.textContent = 'Followers: ' + cardData.followers;
  cardInfoDiv.appendChild(followersP);

  const followingP = document.createElement('p');
  followingP.textContent = 'Following: ' + cardData.following;
  cardInfoDiv.appendChild(followingP);

  const bioP = document.createElement('p');
  bioP.textContent = 'Bio: ' + cardData.bio;
  cardInfoDiv.appendChild(bioP);

  return cardDiv;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/


