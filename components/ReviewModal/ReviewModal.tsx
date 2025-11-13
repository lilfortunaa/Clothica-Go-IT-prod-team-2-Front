'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './ReviewModal.module.css';

import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import { StarRating } from 'react-flexible-star-rating';
import * as Yup from 'yup';

interface ModalProps {
  onClose: () => void;
  onSubmit: () => void;
  reviewData: FormValues;
  setReviewData: () => void;
}

interface FormValues {
  name: string;
  review: string;
  rating: number;
  productId: string;
}

const initValues: FormValues = {
  name: '',
  review: '',
  rating: 0,
  productId: '',
};

const ReviewSchema = Yup.object().shape({
  name: Yup.string().required(`Введіть Ваше ім'я`),
  review: Yup.string()
    .required(`Введіть ваш відгук`)
    .max(500, 'Надто довгий відгук('),
});

export default function ReviewModal({
  onClose,
  reviewData,
  setReviewData,
  onSubmit,
}: ModalProps) {
  const [loading, setLoading] = useState(false);

  const handleBackdrop = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);
    } catch (err) {
    } finally {
      setLoading(false);
      actions.resetForm();
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener(
        'keydown',
        handleKeydown
      );
    };
  }, [onClose]);

  const handleRatingChange = (rating: number) => {};

  return (
    <>
      {createPortal(
        <div
          onMouseDown={handleBackdrop}
          className={css.backdrop}
          role="dialog"
          aria-modal="true"
        >
          <div className={css.container}>
            <button
              onClick={onClose}
              type="button"
              className={css.closeBtn}
            >
              <svg
                height={14}
                width={14}
                className={css.closeIcon}
              >
                <use href={`/sprite.svg#icon-close`}></use>
              </svg>
            </button>
            <h2 className={css.title}>Залишити відгук</h2>
            <Formik
              initialValues={initValues}
              onSubmit={handleSubmit}
              validationSchema={ReviewSchema}
            >
              <Form className={css.form}>
                <div className={css.inputContainer}>
                  <label
                    className={css.label}
                    htmlFor="name"
                  >
                    Ваше імʼя
                  </label>
                  <Field
                    className={css.input}
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Ваше ім'я"
                  />
                  <div className={css.errorMessage}>
                    <ErrorMessage
                      name="name"
                      component="span"
                    />
                  </div>
                </div>
                <div className={css.inputContainer}>
                  <label
                    className={css.label}
                    htmlFor="review"
                  >
                    Відгук
                  </label>
                  <Field
                    as="textarea"
                    className={css.textarea}
                    id="review"
                    type="text"
                    name="review"
                    placeholder="Ваш відгук"
                  ></Field>
                  <div className={css.errorMessage}>
                    <ErrorMessage
                      name="review"
                      component="span"
                    />
                  </div>
                </div>
                <div className={css.ratingContainer}>
                  <StarRating
                    isHalfRatingEnabled
                    color={'#000000'}
                    dimension={6}
                    onRatingChange={handleRatingChange}
                  ></StarRating>
                </div>
                <button
                  className={css.button}
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? 'Надсилаємо відгук...'
                    : 'Надіслати'}
                </button>
              </Form>
            </Formik>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
