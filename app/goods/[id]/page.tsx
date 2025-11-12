'use client';

import { getGoodById } from '@/lib/api/clientApi';
import { Good } from '@/types/user';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import css from './GoodsDetails.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Field, Form, Formik } from 'formik';

interface GoodByIdPageProps {
  params: Promise<{ id: string }>;
}
export default function GoodByIdPage() {
  const params = useParams(); // отримуємо id з URL
  let id: string | undefined;

  if (Array.isArray(params.id)) {
    id = params.id[0];
  } else {
    id = params.id;
  }
  const [good, setGood] = useState<Good | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchGood = async () => {
      try {
        console.log('🔍 Fetching Good by ID:', id);
        const data = await getGoodById(id);
        setGood(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchGood();
  }, [id]);

  if (loading) return <p>Завантаження товару...</p>;
  if (error) return <p>❌ {error}</p>;
  if (!good) return <p>Товар не знайдено.</p>;

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <svg key={i} className={css.svgPrice}>
            <use xlinkHref="/sprite.svg#icon-icon-star-fill"></use>
          </svg>
        );
      } else if (i - 0.5 <= rating) {
        stars.push(
          <svg key={i} className={css.svgPrice}>
            <use xlinkHref="/sprite.svg#icon-icon-star-half-fill"></use>
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className={css.svgPrice}>
            <use xlinkHref="/sprite.svg#icon-star-no-fill"></use>
          </svg>
        );
      }
    }

    return <div className={css.stars}>{stars}</div>;
  };

  return (
    <section className={css.categoriesSection}>
      <div className={css.imageWrapper}>
        <Image
          src={good.image}
          alt={good.name}
          width={416}
          height={277}
          className={css.IMG}
        />
      </div>
      <div className={css.listSection}>
        <ul className={css.list}>
          <li className={css.link}>
            <Link href="/goods">Всі товари</Link>
          </li>
          <li className={css.link}>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-arrow-right" />
            </svg>
          </li>
          <li className={css.link}>
            <Link href="/categories">Категорія</Link>
          </li>
          <li className={css.link}>
            <svg className={css.svg}>
              <use href="/sprite.svg#icon-arrow-right" />
            </svg>
          </li>
          <li className={css.link}>
            <Link href={`/goods/${id}`}>{good.name}</Link>
          </li>
        </ul>

        <div className={css.titleDiv}>
          <h2 className={css.title}>{good.name}</h2>
          <div className={css.price}>
            <p className={css.textTitel}>
              {good.price.value} {good.price.currency}
            </p>

            <div className={css.rating}>
              <StarRating rating={good.avgRating ?? 0} />
              <span className={css.ratingText}>
                ({good.avgRating ?? '—'}) •{' '}
                {good.feedbackCount ?? 0} відгуків
              </span>
            </div>
          </div>
        </div>

        <p className={css.text}>
          {good.prevDescription ?? ''}
        </p>

        <div className={css.form}>
          <Formik
            initialValues={{
              size: good.size[3],
              quantity: 1,
            }}
            onSubmit={() => {}}
          >
            <Form>
              <label
                className={css.text}
                htmlFor="size-select"
              >
                Розмір:
              </label>
              <div className={css.formSizeDiv}>
                <Field
                  className={css.formSize}
                  as="select"
                  id="size-select"
                  name="size"

                  // value={selectedSize}
                  // onChange={handleSizeChange}
                >
                  {good.size.map(size => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Field>
                <svg className={css.selectArrow}>
                  <use href="/sprite.svg#icon-arrow-bottom" />
                </svg>
              </div>

              <div className={css.formButtons}>
                <button
                  type="submit"
                  className={css.buttonBasket}
                  // onClick={handleAddToCart}
                >
                  Додати в кошик
                </button>
                <div className={css.formCount}>
                  <Field
                    type="number"
                    id="quantity"
                    name="quantity"
                    // value={quantity}
                    min={1}
                    // onChange={handleQuantityChange}
                    className={css.inputQuantity}
                  />
                </div>
              </div>
              <button
                type="button"
                className={css.buttonBuy}
                // onClick={handleBuyNow}
              >
                Купити зараз
              </button>
              <p className={css.formText}>
                Безкоштовна доставка для замовлень від 1000
                грн
              </p>
            </Form>
          </Formik>
        </div>

        <div className={css.descriptionBlock}>
          <h3 className={css.descriptionTitle}>Опис</h3>
          <p className={css.descriptionText}>
            {good.description}
          </p>
        </div>

        <div className={css.characterBlock}>
          <h3 className={css.characterTitel}>
            Основні характеристики:
          </h3>
          <ul className={css.characterList}>
            {good.characteristics.map(characteristic => (
              <li
                className={css.characterItem}
                key={characteristic}
              >
                {characteristic}
              </li>
            ))}

            <li className={css.characteristicItem}>
              <strong className={css.characteristicText}>
                Доступні розміри:
              </strong>
              {good['size'][0]} -{' '}
              {good['size'][good['size'].length - 1]}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
