import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const genres = [
    { name: 'Fiction', description: 'Fictional stories and literature' },
    { name: 'Science', description: 'Scientific knowledge and discoveries' },
    { name: 'History', description: 'Historical events and biographies' },
    { name: 'Technology', description: 'Computing and technological innovation' },
  ];

  const genreRecords = await Promise.all(
    genres.map((genre) =>
      prisma.genre.upsert({
        where: { name: genre.name },
        update: { description: genre.description },
        create: genre,
      }),
    ),
  );

  const genreMap = Object.fromEntries(
    genreRecords.map((genre) => [genre.name, genre.id]),
  );

  const books = [
    { title: 'Things Fall Apart', author: 'Chinua Achebe', isbn: '9780385474542', genre: 'Fiction', publishedYear: 1958 },
    { title: 'The River Between', author: 'Ngugi wa Thiong’o', isbn: '9780435905484', genre: 'Fiction', publishedYear: 1965 },
    { title: 'Purple Hibiscus', author: 'Chimamanda Ngozi Adichie', isbn: '9781616202415', genre: 'Fiction', publishedYear: 2003 },
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', genre: 'Fiction', publishedYear: 1925 },

    { title: 'A Brief History of Time', author: 'Stephen Hawking', isbn: '9780553380163', genre: 'Science', publishedYear: 1988 },
    { title: 'The Selfish Gene', author: 'Richard Dawkins', isbn: '9780198788607', genre: 'Science', publishedYear: 1976 },
    { title: 'Cosmos', author: 'Carl Sagan', isbn: '9780345539434', genre: 'Science', publishedYear: 1980 },
    { title: 'The Origin of Species', author: 'Charles Darwin', isbn: '9781509827695', genre: 'Science', publishedYear: 1859 },

    { title: 'Long Walk to Freedom', author: 'Nelson Mandela', isbn: '9780316548182', genre: 'History', publishedYear: 1994 },
    { title: 'The Art of War', author: 'Sun Tzu', isbn: '9781590302255', genre: 'History', publishedYear: -500 },
    { title: 'The Diary of a Young Girl', author: 'Anne Frank', isbn: '9780553296983', genre: 'History', publishedYear: 1947 },
    { title: 'Sapiens', author: 'Yuval Noah Harari', isbn: '9780062316097', genre: 'History', publishedYear: 2011 },

    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', genre: 'Technology', publishedYear: 2008 },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt', isbn: '9780135957059', genre: 'Technology', publishedYear: 1999 },
    { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262046305', genre: 'Technology', publishedYear: 2022 },
    { title: 'The Innovators', author: 'Walter Isaacson', isbn: '9781476708690', genre: 'Technology', publishedYear: 2014 },
  ];

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {},
      create: {
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        publishedYear: book.publishedYear,
        genreId: genreMap[book.genre],
      },
    });
  }

  console.log(`Seed completed: ${genreRecords.length} genres and ${books.length} books processed.`);
}

main()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
