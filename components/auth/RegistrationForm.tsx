"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup"; 
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { register } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import css from "./RegistrationForm.module.css";

// Схема валідації згідно з ТЗ
const schema = Yup.object({
  name: Yup.string()
    .max(32, "Ім'я не повинно перевищувати 32 символи") 
    .required("Введіть ім'я"),
  phone: Yup.string()
    .matches(/^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/, "Введіть номер у форматі +38 (0XX) XXX-XX-XX")
    .required("Введіть номер телефону"),
  password: Yup.string()
    .min(8, "Пароль повинен містити мінімум 8 символів") 
    .max(128, "Пароль не повинен перевищувати 128 символів") 
    .required("Введіть пароль"),
});

export default function RegistrationForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (
    values: { name: string; phone: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      // Викликаємо API реєстрації
      const user: User = await register({
        name: values.name,
        phone: values.phone,
        password: values.password,
      });
      
      // Зберігаємо користувача в store
      setUser(user);
      
      // Показуємо успішне повідомлення
      toast.success("Реєстрація успішна! Вітаємо в Clothica!");
      
      // Редірект на профіль або головну
      router.push("/profile");
    } catch (err) {
      // Обробка помилок з backend
      const errorMessage = err instanceof Error ? err.message : "Помилка реєстрації";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Реєстрація</h1>
        
      </div>

      <Formik
        initialValues={{ name: "", phone: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            {/* Поле Ім'я */}
            <div className={css.formGroup}>
              <label htmlFor="name" className={css.label}>
                Ім'я*
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                placeholder="Ваше ім'я"
                className={css.input}
                maxLength={32}
              />
              <ErrorMessage name="name" component="span" className={css.errorText} />
            </div>

            {/* Поле Phone */}
            <div className={css.formGroup}>
              <label htmlFor="phone" className={css.label}>
                Номер телефону*
              </label>
              <Field
                id="phone"
                name="phone"
                type="phone"
                placeholder="+38 (0__) ___-__-__"
                className={css.input}
                maxLength={64}
              />
              <ErrorMessage name="phone" component="span" className={css.errorText} />
            </div>

            {/* Поле Пароль */}
            <div className={css.formGroup}>
              <label htmlFor="password" className={css.label}>
                Пароль*
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className={css.input}
                maxLength={128}
              />
              <ErrorMessage name="password" component="span" className={css.errorText} />
              
            </div>

            {/* Кнопка submit з лоадером */}
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className={css.loader}>
                  <span className={css.spinner} aria-hidden="true"></span>{" "}
                  Реєстрація...
                </span>
              ) : (
                "Зареєструватися"
              )}
            </button>
          </Form>
        )}
      </Formik>

      {/* Посилання на логін */}
      <div className={css.footer}>
        <p className={css.footerText}>
          © 2025 Clothica. Всі права захищені.
        </p>
      </div>
    </div>
  );
}