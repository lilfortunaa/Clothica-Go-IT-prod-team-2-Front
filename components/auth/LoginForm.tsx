"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import type { User } from "@/types/user";
import css from "./LoginForm.module.css";

// Валідація згідно з ТЗ
const schema = Yup.object({
  phone: Yup.string().required("Введіть номер телефону"),
  password: Yup.string().required("Введіть пароль"),
});

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((s) => s.setUser);

  const handleSubmit = async (
    values: { phone: string; password: string },
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const user: User = await login(values.phone, values.password);

      setUser(user);
      toast.success("Вітаємо, вхід успішно виконано!");
      router.push("/profile");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Помилка входу";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={css.container}>
      <div className={css.header}>
        <h1 className={css.title}>Вхід</h1>
      </div>

      <Formik
        initialValues={{ phone: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={css.form}>
            {/* Phone */}
            <div className={css.formGroup}>
              <label htmlFor="phone" className={css.label}>
                Номер телефону*
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                placeholder="+38 (0__) ___-__-__"
                className={css.input}
              />
              <ErrorMessage name="phone" component="span" className={css.errorText} />
            </div>

            {/* Password */}
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
              />
              <ErrorMessage name="password" component="span" className={css.errorText} />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={css.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Вхід..." : "Увійти"}
            </button>
          </Form>
        )}
      </Formik>

      {/* Посилання на реєстрацію */}
      <div className={css.footer}>
        <p className={css.footerText}>
          © 2025 Clothica. Всі права захищені.
        </p>
      </div>
    </div>
  );
}
