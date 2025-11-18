'use client';

import { ErrorMessage, FormikProps } from 'formik';
import css from '@/app/(private routes)/profile/ProfilePage.module.css';
import { UserFormValues } from '@/types/user';

interface PersonalInfoFormProps {
  formik: FormikProps<UserFormValues>;
  title?: string;
  showComment?: boolean;
}

const PersonalInfoForm = ({
  formik,
  title,
  showComment,
}: PersonalInfoFormProps) => {
  return (
    <form
      className={css.profileInfo}
      onSubmit={formik.handleSubmit}
    >
      <h2 className={css.titleForm}>{title}</h2>

      <div className={css.containerProfileInfo}>
        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
            <label
              className={css.labelForm}
              htmlFor="firstName"
            >
              Ім'я*:
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              className={css.inputForm}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше імʼя"
              required
            />
            {formik.touched.firstName &&
              formik.errors.firstName && (
                <div className={css.textMessageNoInfo}>
                  {formik.errors.firstName}
                </div>
              )}
          </div>

          <div className={css.profileInfoItemsGroup}>
            <label
              className={css.labelForm}
              htmlFor="lastName"
            >
              Прізвище*:
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              className={css.inputForm}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше прізвище"
              required
            />
            {formik.touched.lastName &&
              formik.errors.lastName && (
                <div className={css.textMessageNoInfo}>
                  {formik.errors.lastName}
                </div>
              )}
          </div>
        </div>

        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
            <label
              className={css.labelForm}
              htmlFor="phone"
            >
              Номер*:
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className={`${css.inputForm} ${css.inputPhone}`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="+38 (0__) ___-__-__"
              required
            />
            {formik.touched.phone &&
              formik.errors.phone && (
                <div className={css.textMessageNoInfo}>
                  {formik.errors.phone}
                </div>
              )}
          </div>
        </div>

        <div className={css.profileInfoItems}>
          <div className={css.profileInfoItemsGroup}>
            <label className={css.labelForm} htmlFor="city">
              Місто доставки*:
            </label>
            <input
              id="city"
              name="city"
              type="text"
              className={css.inputForm}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ваше місто"
              required
            />
          </div>

          <div className={css.profileInfoItemsGroup}>
            <label
              className={css.labelForm}
              htmlFor="postOffice"
            >
              Номер відділення Нової Пошти*:
            </label>
            <input
              id="postOffice"
              name="postOffice"
              type="text"
              className={css.inputForm}
              value={formik.values.postOffice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="1"
              required
            />
          </div>
        </div>

        {/* === Додатковий textarea для коментаря === */}
        {showComment && (
          <div className={css.formRow}>
            <label htmlFor="comment">Коментар</label>
            <textarea
              id="comment"
              name="comment"
              placeholder="Введіть ваш коментар"
              value={formik.values.comment || ''}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={css.inputTextArea}
            />
            {formik.touched.comment &&
              formik.errors.comment && (
                <div className={css.error}>
                  {formik.errors.comment}
                </div>
              )}
          </div>
        )}
      </div>

      <button type="submit" className={css.saveInputButton}>
        Зберегти зміни
      </button>
    </form>
  );
};

export default PersonalInfoForm;
