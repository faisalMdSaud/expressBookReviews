let books = {
  1: {
    author: "Chinua Achebe",
    title: "Things Fall Apart",
    isbn: "9780385474542",
    reviews: {
      alice: "A powerful novel about tradition and change.",
      ahmed: "Excellent storytelling and memorable characters.",
    },
  },
  2: {
    author: "Hans Christian Andersen",
    title: "Fairy Tales",
    isbn: "9780140449914",
    reviews: {
      charlie: "Timeless stories for all ages.",
    },
  },
  3: {
    author: "Dante Alighieri",
    title: "The Divine Comedy",
    isbn: "9780142437223",
    reviews: {
      diana: "A challenging but rewarding read.",
    },
  },
  4: {
    author: "Unknown",
    title: "The Epic Of Gilgamesh",
    isbn: "9780141026282",
    reviews: {
      eric: "One of humanity's oldest and most fascinating epics.",
    },
  },
  5: {
    author: "Unknown",
    title: "The Book Of Job",
    isbn: "9780393350197",
    reviews: {
      frank: "Deep philosophical questions about suffering.",
    },
  },
  6: {
    author: "Unknown",
    title: "One Thousand and One Nights",
    isbn: "9780140449389",
    reviews: {
<<<<<<< HEAD
      grace: "A magical collection of stories.",
=======
    
>>>>>>> 6e207a0870aa6136e601df46ef18f0f534a84915
    },
  },
  7: {
    author: "Unknown",
    title: "Njál's Saga",
    isbn: "9780140447699",
    reviews: {
      henry: "A gripping Icelandic saga full of drama.",
    },
  },
  8: {
    author: "Jane Austen",
    title: "Pride and Prejudice",
    isbn: "9780141439518",
    reviews: {
      isabella: "Witty, romantic, and endlessly enjoyable.",
      jack: "One of the greatest novels ever written.",
    },
  },
  9: {
    author: "Honoré de Balzac",
    title: "Le Père Goriot",
    isbn: "9780140440171",
    reviews: {
      kate: "A sharp portrait of Parisian society.",
    },
  },
  10: {
    author: "Samuel Beckett",
    title: "Molloy, Malone Dies, The Unnamable, the trilogy",
    isbn: "9781857152760",
    reviews: {
      leo: "Experimental and thought-provoking.",
    },
  },
};

// books = Object.values(books);

const getBookWithIsbn = (isbn) => {
<<<<<<< HEAD
  books = Object.values(books);
=======
    books = Object.values(books);
>>>>>>> 6e207a0870aa6136e601df46ef18f0f534a84915
  return books.find((book) => book.isbn === isbn);
};

module.exports.books = books;
module.exports.getBookWithIsbn = getBookWithIsbn;
