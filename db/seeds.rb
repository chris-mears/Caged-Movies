User.destroy_all
Movie.destroy_all

rick = User.create!(
  email: 'rick@morty.com',
  password: 'password',
  name: 'Rick Sanchez',
  nickname: 'C-132',
  image: 'https://static1.comicvine.com/uploads/original/11/119238/5230235-ricksanchez.jpg',
  password_confirmation: 'password'
)

bender = User.create!(
  email: 'bender@futurama.com',
  password: 'password',
  name: 'Bender B Rodriguez',
  nickname: 'Bender',
  image: 'https://pbs.twimg.com/profile_images/620600803544293380/pzEASAVk.png',
  password_confirmation: 'password'
)

nic_cage = User.create!(
  email: 'nick@thecage.com',
  password: 'password',
  name: 'Nic Cage',
  nickname: 'Nic Cage',
  image: 'https://media.giphy.com/media/bn0zlGb4LOyo8/giphy.gif',
  password_confirmation: 'password'
)

the_room = Movie.create!(
  title: "The Room",
  plot: "Johnny is a successful banker with great respect for and dedication to the people in his life, especially his future wife Lisa. The happy-go-lucky guy sees his world fall apart when his friends begin to betray him one-by-one.",
  poster: "https://image.tmdb.org/t/p/original/aUC39cFC2KO8CJ0EV0ijIJRr3PT.jpg",
  rating: 4.3,
  likes: 1,
  api_id: 17473,
  imdb_id: "tt0368226",
  tag_line: "Can you ever really trust anyone?",
  genre: "Drama"
)

face_off = Movie.create!(
  title: "Face/Off",
  plot: "An antiterrorism agent goes under the knife to acquire the likeness of a terrorist and gather details about a bombing plot. When the terrorist escapes custody, he undergoes surgery to look like the agent so he can get close to the agent's family.",
  poster: "https://image.tmdb.org/t/p/original/q1i8QHiHZ1cukG5iOxai8pydmoa.jpg",
  rating: 6.8,
  likes: 10,
  api_id: 754,
  imdb_id: "tt0119094",
  tag_line: "In order to catch him, he must become him.",
  genre: "Action"
)

street_fighter = Movie.create!(
  title: "Street Fighter",
  plot: "Col. Guile and various other martial arts heroes fight against the tyranny of Dictator M. Bison and his cohorts.",
  poster: "https://image.tmdb.org/t/p/original/1Q5YdK91oJBXJcbCuZhKXeY4vP1.jpg",
  rating: 4.1,
  likes: 1,
  api_id: 11667,
  imdb_id: "tt0111301",
  tag_line: "The fight to save the world is on!",
  genre: "Action"
)

room_review = Review.create!(
  title: "Oh, Hi Mark",
  body: "What puts 'The Room' in a class of its own is its overabundant idiocy. While you're still gasping at one of the film's moronic lines or vagrant plot knots, another one rises up to smack you in the head.",
  likes: 2,
  genre: "Drama",
  user_id: bender.id,
  movie_id: the_room.id
)

fighter_review = Review.create!(
  title: "The muscles from brussels as an American Colonel?",
  body: "A dreary, overstuffed hodgepodge of poorly edited martial arts sequences and often unintelligible dialogue.",
  likes: 1,
  genre: "Action",
  user_id: rick.id,
  movie_id: street_fighter.id
)

faceoff_review = Review.create!(
  title: "Best Movie I've ever seen!",
  body: "Ok could this really happen who knows but It is the What If's movies pose that make them so much fun to watch. This movie starts off with some awesomely crafted what if's and over the next hour or so weaves them all into an incredible action adventure tapastry that is complex, funny, wierd, thrilling, frightening and more. This movie absorbs you so completely you feel as if you are almost part of the action. When it comes to action this movie has lots of it bombarding your senses and emotions almost non-stop from beginning to ending credits. I won't spoil the movie for you any more than to say if you like really ripping seat of the pants action adventure you NEED to BUY this MOVIE. This movie will blow your hair back in ways that equal or best anything Agent 007 has up his sleave. Adding this movie to my collection was a serious no-brainer. I saw how awesome this movie was on some nutty satalite channel and when it ended I walked to my living room computer popped into AMAZON.com. Before I knew it Face Off was in my shopping cart and purchased immediately afterwards.",
  likes: 10,
  genre: "Action",
  user_id: nic_cage.id,
  movie_id: face_off.id
)
