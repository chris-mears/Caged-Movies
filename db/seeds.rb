User.destroy_all
Movie.destroy_all

bob_loblaw = User.create!(
  email: 'bob@bob.com',
  password: 'password',
  password_confirmation: 'password'
)

chris_mears = User.create!(
  email: 'chris@chris.com',
  password: 'password',
  password_confirmation: 'password'
)

the_room = Movie.create!(
  title: "The Room",
  plot: "Johnny is a successful banker with great respect for and dedication to the people in his life, especially his future wife Lisa. The happy-go-lucky guy sees his world fall apart when his friends begin to betray him one-by-one.",
  poster: "https://image.tmdb.org/t/p/original/aUC39cFC2KO8CJ0EV0ijIJRr3PT.jpg",
  rating: 6.366738,
  likes: 1,
  api_id: 17473,
  imdb_id: "tt0368226",
  tag_line: "Can you ever really trust anyone?",
  genre: "Drama"
)

street_fighter = Movie.create!(
  title: "Street Fighter",
  plot: "Col. Guile and various other martial arts heroes fight against the tyranny of Dictator M. Bison and his cohorts.",
  poster: "https://image.tmdb.org/t/p/original/1Q5YdK91oJBXJcbCuZhKXeY4vP1.jpg",
  rating: 10.861827,
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
  user_id: chris_mears.id,
  movie_id: the_room.id
)

fighter_review = Review.create!(
  title: "The muscles from brussels as an American Colonel?",
  body: "A dreary, overstuffed hodgepodge of poorly edited martial arts sequences and often unintelligible dialogue.",
  likes: 1,
  genre: "Action",
  user_id: bob_loblaw.id,
  movie_id: street_fighter.id
)
