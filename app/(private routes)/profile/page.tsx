"use client"

import { useAuthStore } from '@/lib/store/authStore';
import { logout as apiLogout } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react'
import toast from 'react-hot-toast';
import css from './ProfilePage.module.css';
import Link from "next/link";

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
    <>
    <div className={css.container}>
      <h1 className={css.titleProfilePage}>Кабінет</h1>
      <div className={css.containerPageProfileFirst}>
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
      </div>
      <div className={css.containerPageProfileSecond}>
        {true ? (<div className={css.messageNoInfo}>
          <p className={css.textMessageNoInfo}>У вас ще не було жодних замовлень! Мерщій до покупок!</p>
          <Link href="/goods" className={css.linkMessageNoInfo}>До покупок</Link>
        </div>) : (<ul>
              <li className={css.transactionItem}>
                <p className={css.transactionItemText}><strong>Дата:</strong></p>
                <p className={css.transactionItemText}><strong>Номер замовлення:</strong></p>
                <p className={css.transactionItemText}><strong>Сума:</strong></p>
                <p className={css.transactionItemText}><strong>Статус:</strong></p>
              </li>
        </ul>)}
        </div>
        <button type="button" onClick={handleLogout}
          className={css.logoutButton}>Вийти з кабінету</button>
      </div>
      </>
  );
};
