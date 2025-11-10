'use client';

import styles from './BasketModal.module.css';

type GoodsOrderListProps = {
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
};

export default function GoodsOrderList({
  items,
}: GoodsOrderListProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <ul className={styles.list}>
        {items.map(item => (
          <li key={item.id} className={styles.listItem}>
            <div>
              <p className={styles.itemName}>{item.name}</p>
              <p className={styles.itemQty}>
                Кількість: {item.quantity}
              </p>
            </div>
            <p className={styles.itemPrice}>
              {item.price * item.quantity} грн
            </p>
          </li>
        ))}
      </ul>
      <p className={styles.total}>Разом: {total} грн</p>
    </div>
  );
}
