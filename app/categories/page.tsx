'use client';

import { getCategories } from '@/lib/api/clientApi';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import css from './CategoriesPage.module.css';
import { Category } from '@/types/user';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

const CategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(4);
  const [more, setMore] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 10;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({
    minWidth: 768,
    maxWidth: 1439,
  });
  const isDesktop = useMediaQuery({ minWidth: 1440 });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories(page, perPage);
        setCategories(prev => [...prev, ...data]);
        if (data.length < perPage) setMore(false);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [page]);

  useEffect(() => {
    if (categories.length === 0) return;
    if (isMobile) setVisibleCount(4);
    else if (isTablet) setVisibleCount(4);
    else if (isDesktop) setVisibleCount(6);
  }, [isMobile, isTablet, isDesktop, categories]);

  const handleLoadMore = () => {
    if (isMobile) setVisibleCount(prev => prev + 1);
    else if (isTablet) setVisibleCount(prev => prev + 2);
    else if (isDesktop) setVisibleCount(prev => prev + 3);
  };

  if (loading)
    return (
      <p className={css.loading}>
        Завантаження категорій...
      </p>
    );

  if (error) return <p className={css.error}>{error}</p>;

  const visibleCategories = categories.slice(
    0,
    visibleCount
  );
  const hasMore = visibleCount < categories.length;

  return (
    <section className={css.categoriesSection}>
      <div className={css.categories}>
        <h2 className={css.title}>Категорії</h2>
      </div>
      <div>
        <ul className={css.CategoriesList}>
          {visibleCategories.map(category => (
            <li
              key={category._id}
              className={css.CategoriesItem}
            >
              <Link
                href={`/categories/${category._id}`}
                className={css.CategoriesLink}
              >
                <div className={css.imageWrapper}>
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={416}
                    height={277}
                    loading="eager"
                    className={css.categoriesIMG}
                  />
                </div>
                <p className={css.categoriesText}>
                  {category.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {hasMore && (
        <button
          className={css.button}
          onClick={handleLoadMore}
        >
          Показати більше
        </button>
      )}
    </section>
  );
};

export default CategoriesList;
