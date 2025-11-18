'use client';

import Image from 'next/image';
import styles from '@/app/orders/createOrder.module.css';
import { useBasketStore, BasketItem } from '@/lib/store/basketStore';

const GoodsOrderList = () => {
  const { items, updateQuantity, removeFromBasket } = useBasketStore();

  const delivery = items.length > 0 ? 70 : 0;
  const subtotal = items.reduce(
    (sum, item) => sum + item.price.value * item.quantity,
    0
  );
  const total = subtotal + delivery;

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    updateQuantity(id, quantity);
  };

  const handleRemove = (id: string) => {
    removeFromBasket(id);
  };

  return (
    <div className={styles.orderProducts}>
      <h2 className={styles.blockTitle}>Товари</h2>

      <div className={styles.productsList}>
        {items.map(item => (
          <div key={item._id} className={styles.productCard}>
            {item.image && (
              <Image
                className={styles.productImage}
                src={item.image}
                alt={item.name}
                width={70}
                height={70}
              />
            )}

            <div className={styles.productInfo}>
              <div className={styles.productText}>
                <p className={styles.productName}>{item.name}</p>

                <div className={styles.productMeta}>
                  <div className={styles.ratingGroup}>
                    <svg width="14" height="14">
                      <use href="/sprite.svg#icon-icon-star-fill" />
                    </svg>
                    <span className={styles.productRating}>
                      {item.avgRating ?? 0}
                    </span>
                  </div>

                  <div className={styles.reviewsGroup}>
                    <svg width="14" height="14">
                      <use href="/sprite.svg#icon-comment-section" />
                    </svg>
                    <span className={styles.productReviews}>
                      {item.feedbackCount ?? 0}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.productRight}>
                <p className={styles.productPrice}>
                  {(item.price.value * item.quantity).toFixed(2)} грн
                </p>

                <div className={styles.quantityButtonRow}>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(
                        item._id,
                        Number(e.target.value)
                      )
                    }
                    className={styles.quantityInput}
                  />
                  <button
                    onClick={() => handleRemove(item._id)}
                    aria-label="Видалити товар"
                    className={styles.removeButton}
                  >
                    <svg width="20" height="20">
                      <use href="/sprite.svg#icon-trash" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.orderSummary}>
        <div className={styles.summaryRow}>
          <span>Проміжний підсумок</span>
          <span>{subtotal.toFixed(2)} грн</span>
        </div>
        <div className={styles.summaryRow}>
          <span>Доставка</span>
          <span>{delivery.toFixed(2)} грн</span>
        </div>
        <div className={styles.summaryRowTotal}>
          <span>Всього</span>
          <span>{total.toFixed(2)} грн</span>
        </div>
      </div>
    </div>
  );
};

export default GoodsOrderList;
