'use client';

import {
  BasketItem,
  useBasketStore,
} from '@/lib/store/basketStore';
import styles from './BasketModal.module.css';

type GoodsOrderListProps = {
  items: BasketItem[];
};

export default function GoodsOrderList({
  items,
}: GoodsOrderListProps) {
  const { updateQuantity, removeFromBasket } =
    useBasketStore();

  const handleQuantityChange = (
    id: string,
    newQty: number
  ) => {
    if (newQty < 1) removeFromBasket(id);
    else updateQuantity(id, newQty);
  };

  return (
    <div className={styles.orderList}>
      <ul className={styles.list}>
        {items.map(item => (
          <li
            key={`${item._id}-${item.size}`}
            className={styles.listItem}
          >
            <div className={styles.itemInfo}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className={styles.itemImage}
                />
              )}
              <div className={styles.itemDetails}>
                <p className={styles.itemName}>
                  {item.name}
                </p>
                {item.size && (
                  <p className={styles.itemSize}>
                    Розмір: {item.size}
                  </p>
                )}
                <p className={styles.itemPriceSingle}>
                  {item.price.value.toLocaleString()}{' '}
                  {item.price.currency} / од.
                </p>

                <div className={styles.qtyControl}>
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
                    className={styles.qtyInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.itemRight}>
              <p className={styles.itemTotalPrice}>
                {(
                  item.price.value * item.quantity
                ).toLocaleString()}{' '}
                {item.price.currency}
              </p>

              <button
                className={styles.removeBtn}
                onClick={() => removeFromBasket(item._id)}
                aria-label="Видалити товар"
              >
                <svg
                  className={styles.iconRemove}
                  width={20}
                  height={20}
                >
                  <use href="/sprite.svg#icon-close"></use>
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
