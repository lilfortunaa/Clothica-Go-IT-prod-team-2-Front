import Head from "next/head";
import PopularGoods from "@/components/PopularGoods/PopularGoods";

export default function Home() {
  const mockGoods = [
    {
      id: 1,
      title: "Базова футболка Clothica",
      price: 1499,
      rating: 5,
      reviews: 2,
      image: "/images/goods/good1-desk.jpg", 
    },
    {
    id: 2,
    title: "Класичне худі Clothica",
    price: 1499,
    rating: 5,
    reviews: 2,
    image: "/images/goods/good2-desk.jpg",
  },
  {
    id: 3,
    title: "Джинси slim fit Clothica",
    price: 1499,
    rating: 5,
    reviews: 2,
    image: "/images/goods/good3-desk.jpg",
  },
  {
    id: 4,
    title: "Світшот Clothica",
    price: 1499,
    rating: 5,
    reviews: 2,
    image: "/images/goods/good4-desk.jpg",
  },
  {
      id: 5,
      title: "Літні шорти Clothica",
      price: 1499,
      rating: 5,
      reviews: 2,
      image: "/images/goods/good5-desk.jpg", 
    },
    {
      id: 6,
      title: "Легка куртка Clothica",
      price: 1499,
      rating: 5,
      reviews: 2,
      image: "/images/goods/good6-desk.jpg", 
    },
  ];

  return (
    <div>
      <PopularGoods goods={mockGoods} />
    </div>
  );
}
