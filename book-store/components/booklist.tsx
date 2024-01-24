import { useState, useEffect } from "react";
import styles from "@/components/booklist.module.css";
import Image from "next/image";

interface Book {
  id: string;
  title: string;
  authors?: string[];
  averageRating?: number;
  ratingsCount?: number;
  description?: string;
  imageLinks?: {
    thumbnail: string;
  };
  saleInfo?: {
    listPrice: {
      amount: number;
      currencyCode: string;
    };
  };
}

const BookList: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([
    "Architecture",
    "Art & Fashion",
    "Biography",
    "Business",
    "Crafts & Hobbies",
    "Drama",
    "Fiction",
    "Food & Drink",
    "Health & Wellbeing",
    "History & Politics",
    "Humor",
    "Poetry",
    "Psychology",
    "Science",
    "Technology",
    "Travel & Maps",
  ]);

  const [activeCategory, setActiveCategory] = useState<string | null>(
    "Architecture",
  );
  const [books, setBooks] = useState<Book[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<Book[]>([]);

  useEffect(() => {
    // Загрузка книг при монтировании компонента
    if (activeCategory !== null) {
      loadBooks(activeCategory, startIndex);
    }
  }, [activeCategory, startIndex]);

  const loadBooks = async (category: string, index: number) => {
    try {
      setLoading(true);
      const bffUrl = `/api/books?subject=${category}&page=${Math.ceil((index + 1) / 6)}`;
      const response = await fetch(bffUrl);
      const data = await response.json();

      if (index === 0) {
        setBooks([]);
      }

      setBooks((prevBooks) => [
        ...prevBooks,
        ...data.data.items.map((item: any) => item.volumeInfo),
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setStartIndex(0); // Сброс индекса при выборе новой категории
  };

  const handleBuyNowClick = (book: Book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  const handleLoadMoreClick = () => {
    setStartIndex(startIndex + 6);
  };

  return (
    <div className={styles.book_container}>
      <div className={styles.categories}>
        <ul className={styles.category_list}>
          {categories.map((category) => (
            <li
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={category === activeCategory ? "active" : ""}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.books}>
        <div className={styles.book_list}>
          {books.map((book) => (
            <div key={book.id} className={styles.book_card}>
              {/*При попытке заменить изображение на Next/image получаю ошибку*/}
              <img
                src={book.imageLinks?.thumbnail || "placeholder.png"}
                alt={book.title}
              />
              <div className={styles.text_info}>
                <p className={styles.authors}>
                  {book.authors?.join(", ") || "Unknown"}
                </p>
                <h3>{book.title}</h3>
                <p className={styles.rating}>
                  {book.averageRating
                    ? `${book.averageRating} (${book.ratingsCount} ratings)`
                    : "No ratings available"}
                </p>
                <p className={styles.description}>
                  {book.description
                    ? `${book.description.substring(0, 150)}...`
                    : "No description available"}
                </p>
                <p className={styles.price}>
                  {book.saleInfo && book.saleInfo.listPrice
                    ? `${book.saleInfo.listPrice.amount} ${book.saleInfo.listPrice.currencyCode}`
                    : "Price not available"}
                </p>
                <button
                  className={styles.buy_button}
                  onClick={() => handleBuyNowClick(book)}
                >
                  Buy now
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          className={styles.load_more}
          onClick={handleLoadMoreClick}
          disabled={loading}
        >
          {loading ? "Loading..." : "Load more"}
        </button>
      </div>
    </div>
  );
};

export default BookList;
