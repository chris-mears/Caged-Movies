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
  rating: 4.3,
  likes: 1,
  api_id: 17473,
  imdb_id: "tt0368226",
  tag_line: "Can you ever really trust anyone?",
  genre: "Drama"
)

panic_room = Movie.create!(
  title: "Panic Room",
  plot: "Trapped in their New York brownstone's panic room, a hidden chamber built as a sanctuary in the event of break-ins, newly divorced Meg Altman and her young daughter Sarah play a deadly game of cat-and-mouse with three intruders - Burnham, Raoul and Junior - during a brutal home invasion. But the room itself is the focal point because what the intruders really want is inside it.",
  poster: "https://image.tmdb.org/t/p/original/hjkugMBhYjV8ZXgvSnGXI3q7wt7.jpg",
  rating: 6.6,
  likes: 1,
  api_id: 4547,
  imdb_id: "tt0258000",
  tag_line: "",
  genre: "Drama"
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
