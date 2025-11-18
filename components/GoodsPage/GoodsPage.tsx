
'use client';

import React, { useState, useEffect } from 'react';
import { Good, GetGoodsParams } from '@/types/goods';
import { getGoods, getCategories } from '@/lib/api/clientApi';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import SideBarGoods from '../../app/goods/filter/@sidebar/SideBarGoods';
import styles from './GoodsPage.module.css';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

export interface CategoryItem {
  _id: string;
  name: string;
  image: string;
  goodsCount: number;
  availableSizes?: string[];
}

export interface FiltersResponse {
  categories: CategoryItem[];
  sizes: string[];
  genders: { label: string; value: string }[];
}

export interface SelectedFilters {
  category?: string;
  size: string[];
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
}

interface GoodsResponse {
  data: Good[];
  totalGoods: number;
}

export default function GoodsPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [page, setPage] = useState(1);
  const perPage = 15;

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    category: undefined,
    size: [],
    gender: undefined,
    minPrice: undefined,
    maxPrice: undefined,
  });


  const baseFilters: FiltersResponse = {
    categories: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    genders: [
      { label: 'Всі', value: '' },
      { label: 'Жіноча', value: 'women' },
      { label: 'Чоловіча', value: 'man' },
      { label: 'Унісекс', value: 'unisex' },
    ],
  };


  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);


  const categoriesQuery = useQuery<CategoryItem[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      const cats = await getCategories();
      return cats.map(c => ({
        _id: c._id,
        name: c.name,
        image: c.image,
        goodsCount: c.goodsCount ?? 0,
        availableSizes: c.availableSizes,
      }));
    },
    staleTime: 1000 * 60 * 10,
  });


  const filters: FiltersResponse = {
    ...baseFilters,
    categories: categoriesQuery.data ?? [],
  };


  const goodsQuery = useQuery<GoodsResponse>({
    queryKey: ['goods', selectedFilters, page, perPage],
    queryFn: async (): Promise<GoodsResponse> => {
      const params: GetGoodsParams = {
        page,
        perPage,
        category: selectedFilters.category,
        size: selectedFilters.size.length ? selectedFilters.size : undefined,
        gender: selectedFilters.gender,
        minPrice: selectedFilters.minPrice,
        maxPrice: selectedFilters.maxPrice,
      };
      return await getGoods(params, page, perPage);
    },

    placeholderData: prev => prev,
  });


  const goods = goodsQuery.data?.data ?? [];
  const totalGoods = goodsQuery.data?.totalGoods ?? 0;
  const isFetching = goodsQuery.isFetching;


  useEffect(() => {
    setPage(1);
  }, [selectedFilters]);


  const handleShowMore = () => {
    if (goods.length < totalGoods) {
      setPage(prev => prev + 1);
    }
  };

  const handleClearAll = () =>
    setSelectedFilters({
      category: undefined,
      size: [],
      gender: undefined,
      minPrice: undefined,
      maxPrice: undefined,
    });

  const handleClearFilter = (key: keyof SelectedFilters) => {
    setSelectedFilters(prev => ({
      ...prev,
      [key]: key === 'size' ? [] : undefined,
    }));
  };

  const handleCategoryClick = (categoryId?: string) => {
    const availableSizes =
      filters.categories.find(c => c._id === categoryId)?.availableSizes || [];

    setSelectedFilters(prev => ({
      ...prev,
      category: categoryId,
      size: prev.size.filter(s => availableSizes.includes(s)),
    }));
  };

  return (
    <section className={styles.wrapper}>

      {!isMobile && (
        <aside className={styles.container}>
          <SideBarGoods
            filters={filters}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            totalGoods={totalGoods}
            goodsLength={goods.length}
          />
        </aside>
      )}

      <main className={styles.mainContent}>

 
        {isMobile && (
          <div className={styles.mobileFilters}>
            <h2 className={styles.mobileTitle}>Всі товари</h2>

            <div className={styles.filtersHeader}>
              <span className={styles.filtersLabel}>Фільтри</span>
              <button className={styles.clearAll} onClick={handleClearAll}>
                Очистити всі
              </button>
            </div>

            <div className={styles.showCount}>
              Показано {goods.length} з {totalGoods}
            </div>

            <div className={styles.dropdown}>
              <div
                className={styles.dropdownHeader}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Фільтри</span>
                <svg className={styles.arrowIcon}>
                  <use
                    href={`/sprite.svg#${dropdownOpen ? 'icon-arrow-top' : 'icon-arrow-bottom'}`}
                  />
                </svg>
              </div>

              {dropdownOpen && (
                <div className={styles.dropdownContent}>

              
                  <div className={styles.filterBlock}>
                    <div className={styles.filterValues}>
                      <div
                        className={`${styles.filterItem} ${
                          !selectedFilters.category ? styles.selected : ''
                        }`}
                        onClick={() => handleCategoryClick(undefined)}
                      >
                        Усі
                      </div>

                      {filters.categories.map(c => (
                        <div
                          key={c._id}
                          className={`${styles.filterItem} ${
                            selectedFilters.category === c._id ? styles.selected : ''
                          }`}
                          onClick={() => handleCategoryClick(c._id)}
                        >
                          {c.name} ({c.goodsCount})
                        </div>
                      ))}
                    </div>
                  </div>

                 
                  <div className={styles.filterBlock}>
                    <div className={styles.filterHeader}>
                      <strong>Розмір</strong>
                      <button
                        className={styles.clearAll}
                        onClick={() => handleClearFilter('size')}
                      >
                        Очистити
                      </button>
                    </div>

                    <div className={styles.filterValues}>
                      {filters.sizes.map(size => {
                        const active = selectedFilters.size.includes(size);
                        return (
                          <div
                            key={size}
                            className={`${styles.filterItem} ${active ? styles.selected : ''}`}
                            onClick={() =>
                              setSelectedFilters(prev => ({
                                ...prev,
                                size: active
                                  ? prev.size.filter(s => s !== size)
                                  : [...prev.size, size],
                              }))
                            }
                          >
                            {size}
                          </div>
                        );
                      })}
                    </div>
                  </div>

               
                  <div className={styles.filterBlock}>
                    <div className={styles.filterHeader}>
                      <strong>Стать</strong>
                      <button
                        className={styles.clearAll}
                        onClick={() => handleClearFilter('gender')}
                      >
                        Очистити
                      </button>
                    </div>

                    <div className={styles.filterValues}>
                      {filters.genders.map(g => {
                        const active = selectedFilters.gender === g.value;
                        return (
                          <div
                            key={g.value || 'all'}
                            className={`${styles.filterItem} ${active ? styles.selected : ''}`}
                            onClick={() =>
                              setSelectedFilters(prev => ({
                                ...prev,
                                gender: active ? undefined : g.value,
                              }))
                            }
                          >
                            {g.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        )}

       
        {goods.length > 0 ? (
          <>
            <div className={styles.goodsGrid}>
              {goods.map(item => (
                <div key={item._id}>
                  <div className={styles.card}>
                    <div className={styles.imageBox}>
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className={styles.info}>
                      <h3 className={styles.title}>{item.name}</h3>

                      <div className={styles.row}>
                        <div className={styles.leftMeta}>
                          <span className={styles.metaItem}>
                            <svg className={styles.icon}>
                              <use href="/sprite.svg#icon-icon-star-fill" />
                            </svg>
                            {item.avgRating ?? 0}
                          </span>
                          <span className={styles.metaItem}>
                            <svg className={styles.icon}>
                              <use href="/sprite.svg#icon-comment-section" />
                            </svg>
                            {item.feedbackCount ?? 0}
                          </span>
                        </div>

                        <span className={styles.price}>
                          {item.price.value} {item.price.currency || '₴'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Link href={`/goods/${item._id}`} className={styles.moreBtn}>
                    Детальніше
                  </Link>
                </div>
              ))}
            </div>

            {goods.length < totalGoods && (
              <div className={styles.showMoreWrapper}>
                <button
                  disabled={isFetching}
                  onClick={handleShowMore}
                  className={styles.showMoreBtn}
                >
                  {isFetching ? 'Завантаження...' : 'Показати більше'}
                </button>
              </div>
            )}
          </>
        ) : (
          <MessageNoInfo onClearFilters={handleClearAll} />
        )}

      </main>
    </section>
  );
}
