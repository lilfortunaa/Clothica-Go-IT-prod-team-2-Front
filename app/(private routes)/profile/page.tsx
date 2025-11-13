"use client"

import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import toast from 'react-hot-toast';
import css from './ProfilePage.module.css';

const ProfilePage = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<number>();
  const [city, setCity] = useState<string>("");
  const [post, setPost] = useState<number>();
  const [comment, setComment] = useState<string>("");

  const { user, clearAuth } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiLogout();
    } catch {}
    clearAuth();
    toast.success('Ви вийшли з системи');
    router.push('/');
  };

  if (!user) {
    return (
      <div className={css.loading}>
        <p>Завантаження профілю...</p>
      </div>
    );
  }

  return (
    <main className={css.main}>
    <div className={css.container}>
      <h1 className={css.titleProfilePage}>Кабінет</h1>
      <section className={css.containerPageProfileFirst}>
        <form className={css.profileInfo}>
          <h2 className={css.titleForm}>Особиста інформація</h2>
          <label htmlFor="firstName">Ім'я*:</label>
            <input
              id="firstName"
              type="text"
              className={css.inputFirstName}
              value={firstName}
              required
          />
          <label htmlFor="lastName">Прізвище*:</label>
            <input
              id="lastName"
              type="text"
              className={css.inputLastName}
              value={lastName}
              required
          />
          <label htmlFor="phone">Номер*:</label>
            <input
              id="phone"
              type="tel"
              className={css.inputNumber}
              value={phone}
              required
            />
            <label htmlFor="city">Місто доставки*:</label>
            <input
              id="city"
              type="text"
              className={css.inputCity}
              value={city}
              required
          />
          <label htmlFor="post">Номер відділення Нової Пошти*:</label>
            <input
              id="post"
              type="number"
              className={css.inputPost}
              value={post}
              required
          />
          <label htmlFor="comment">Коментар:</label>
            <textarea
              id="comment"
              className={css.inputComment}
              value={comment}
              required
          />
          <button type="submit" className={css.saveInputButton}>
              Зберегти зміни
            </button>
        </form>
      </section>
      <section className={css.containerPageProfileSecond}>
        {true ? (<div className={css.messageNoInfo}>
          <p className={css.textMessageNoInfo}>У вас ще не було жодних замовлень! Мерщій до покупок!</p>
          <button onClick={() => router.push('/goods')} className={css.linkMessageNoInfo}>До покупок</button>
        </div>) : (<ul className={css.transactionList}>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}><span>Дата:</span></p>
              </li>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}><span>Номер замовлення:</span></p>
                </li>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}><span>Сума:</span></p>
              </li>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}><span>Статус:</span></p>
              </li>
        </ul>)}
        </section>
        <button type="button" onClick={handleLogout}
          className={css.logoutButton}>Вийти з кабінету</button>
      </div>
      </main>
  );
};
