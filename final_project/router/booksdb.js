let books = {
  1: {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    isbn: "9780385474542",
    reviews: [
      {
        reviewer: "alice",
        review: "A powerful novel about tradition and change.",
      },
      {
        reviewer: "ahmed",
        review: "Excellent storytelling and memorable characters.",
      },
    ],
  },
  2: {
    author: "Hans Christian Andersen",
    title: "Fairy Tales",
    isbn: "9780140449914",
    reviews: [
      {
        reviewer: "charlie",
        review: "Timeless stories for all ages.",
      },
    ],
  },
  3: {
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    isbn: "9780142437223",
    reviews: [
      {
        reviewer: "diana",
        review: "A challenging but rewarding read.",
      },
    ],
  },
  4: {
    author: "Dante Alighieri",
    title: "The Epic Of Gilgamesh",
    isbn: "9780141026282",
    reviews: [
      {
        reviewer: "eric",
        review: "One of humanity's oldest and most fascinating epics.",
      },
    ],
  },
  5: {
    author: "Robert Alvee",
    title: "The Book Of Job",
    isbn: "9780393350197",
    reviews: [
      {
        reviewer: "frank",
        review: "Deep philosophical questions about suffering.",
      },
    ],
  },
  6: {
    author: "Chomson Tack",
    title: "One Thousand and One Nights",
    isbn: "9780140449389",
    reviews: [
      {
        reviewer: "grace",
        review: "A magical collection of stories.",
      },
    ],
  },
  7: {
    author: "Ahmed Didar",
    title: "Njál's Saga",
    isbn: "9780140447699",
    reviews: [
      {
        reviewer: "henry",
        review: "A gripping Icelandic saga full of drama.",
      },
    ],
  },
  8: {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    reviews: [
      {
        reviewer: "isabella",
        review: "Witty, romantic, and endlessly enjoyable.",
      },
      {
        reviewer: "jack",
        review: "One of the greatest novels ever written.",
      },
    ],
  },
  9: {
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    isbn: "9780140440171",
    reviews: [
      {
        reviewer: "kate",
        review: "A sharp portrait of Parisian society.",
      },
    ],
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    isbn: "9781857152760",
    reviews: [
      {
        reviewer: "leo",
        review: "Experimental and thought-provoking.",
      },
    ],
  },
};

books = Object.values(books);

const getBookWithIsbn = (isbn) => {
  return books.find((book) => book.isbn === isbn);
};

module.exports.books = books;
module.exports.getBookWithIsbn = getBookWithIsbn;
