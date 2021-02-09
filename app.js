let carouselCard = document.getElementById('test');

const removeDuplicates = (myArr, prop) => {
  return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
  })
};

const fetchData = async() => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/posts'),
    fetch('https://jsonplaceholder.typicode.com/users')
  ]);

  const posts = await postsResponse.json();
  const users = await usersResponse.json();
  return { posts, users };
};

const findUser = (arr, id) => arr.filter(user => user.id === id);

fetchData().then(({posts, users}) => {
  let testimonials = removeDuplicates(posts, 'userId').slice(0, 4);
  testimonials.map(testimony => {
    let name = findUser(users, testimony.userId)[0].name;
    carouselCard.innerHTML += `<div class="swiper-slide">
      <div class="testimony_container">
          <img src="./images/person_${testimony.userId}.jpg" alt="person">
          <p class="testimony_text">${testimony.body}</p>
          <p class="testimony_name">${name}</p>
      </div>
    </div>`
  });
});