export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  rating: number;
  image: string;
  stock: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Auriculares Bluetooth Pro",
    price: 79.99,
    description:
      "Auriculares inalámbricos con cancelación de ruido activa, 30 horas de batería y audio de alta fidelidad. Perfectos para trabajo y viajes.",
    category: "Electrónica",
    rating: 4.7,
    image: "🎧",
    stock: 15,
  },
  {
    id: 2,
    name: "Teclado Mecánico RGB",
    price: 129.99,
    description:
      "Teclado mecánico con switches Cherry MX Red, retroiluminación RGB personalizable y diseño compacto TKL. Ideal para gaming y programación.",
    category: "Periféricos",
    rating: 4.5,
    image: "⌨️",
    stock: 8,
  },
  {
    id: 3,
    name: "Monitor 4K 27\"",
    price: 349.99,
    description:
      "Monitor UHD 4K de 27 pulgadas con panel IPS, 144Hz, HDR400 y cobertura del 99% sRGB. Compatible con HDMI 2.1 y DisplayPort 1.4.",
    category: "Monitores",
    rating: 4.8,
    image: "🖥️",
    stock: 5,
  },
  {
    id: 4,
    name: "Ratón Inalámbrico Ergonómico",
    price: 59.99,
    description:
      "Ratón vertical ergonómico que reduce la tensión en la muñeca. Conectividad Bluetooth y receptor USB, 3 meses de batería.",
    category: "Periféricos",
    rating: 4.3,
    image: "🖱️",
    stock: 22,
  },
  {
    id: 5,
    name: "Webcam HD 1080p",
    price: 89.99,
    description:
      "Webcam Full HD con micrófono integrado con cancelación de ruido, corrección automática de luz y campo de visión de 90°.",
    category: "Accesorios",
    rating: 4.2,
    image: "📷",
    stock: 12,
  },
  {
    id: 6,
    name: "Hub USB-C 7 en 1",
    price: 45.99,
    description:
      "Hub multipuerto USB-C con HDMI 4K, 3× USB-A 3.0, lector de tarjetas SD/MicroSD y carga rápida PD 100W.",
    category: "Accesorios",
    rating: 4.6,
    image: "🔌",
    stock: 30,
  },
  {
    id: 7,
    name: "SSD Externo 1TB",
    price: 99.99,
    description:
      "Disco sólido externo USB 3.2 con velocidades de lectura de 1050 MB/s. Compacto, resistente a golpes y con cifrado por hardware.",
    category: "Almacenamiento",
    rating: 4.9,
    image: "💾",
    stock: 18,
  },
  {
    id: 8,
    name: "Lámpara de Escritorio LED",
    price: 34.99,
    description:
      "Lámpara LED de escritorio con 5 modos de color, 10 niveles de brillo, puerto USB-A de carga y brazo articulado ajustable.",
    category: "Accesorios",
    rating: 4.4,
    image: "💡",
    stock: 25,
  },
];

export const CATEGORIES = [
  "Todos",
  "Electrónica",
  "Periféricos",
  "Monitores",
  "Accesorios",
  "Almacenamiento",
];
