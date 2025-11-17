'use client';

import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { StarRating } from 'react-flexible-star-rating';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import css from './ReviewModal.module.css';
import { ReviewRequestBody } from '@/types/review';

interface ModalProps {
  onClose: () => void;
  goodId: string;
  category: string;
}

interface FormValues {
  name: string;
  review: string;
  rating: number;
}

const initValues: FormValues = {
  name: '',
  review: '',
  rating: 0,
};

const ReviewSchema = Yup.object().shape({
  name: Yup.string().required(`Введіть Ваше ім'я`),
  review: Yup.string()
    .required(`Введіть Ваш відгук`)
    .max(
      500,
      'Відгук не повинен перевищувати 500 символів'
    ),
  rating: Yup.number()
    .min(0.5, 'Вкажіть оцінку')
    .required('Вкажіть оцінку'),
});

export default function ReviewModal({
  onClose,
  goodId,
  category,
}: ModalProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    const payload: ReviewRequestBody = {
      goodId,
      category,
      author: values.name,
      rate: values.rating,
      description: values.review,
      date: new Date().toISOString().split('T')[0],
    };
    console.log(payload);

    try {
      setLoading(true);
      // const response;
      toast.success('Ваш відгук відправлено!');
      actions.resetForm();
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBackdrop = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.target === event.currentTarget) {
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
              {formik => (
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
                    <Field
                      name="rating"
                      as={StarRating}
                      isHalfRatingEnabled
                      color={'#000000'}
                      dimension={6}
                      onRatingChange={(value: number) => {
                        formik.setFieldValue(
                          'rating',
                          value
                        );
                      }}
                      initialRating={0}
                    ></Field>
                    <div className={css.errorMessage}>
                      <ErrorMessage
                        name="rating"
                        component="span"
                      />
                    </div>
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
              )}
            </Formik>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
