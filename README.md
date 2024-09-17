

# Seresa Ecommerce

Seresa Ecommerce es una aplicación web de comercio electrónico desarrollada con React que permite a los usuarios explorar productos, agregarlos al carrito y realizar pedidos a través de WhatsApp. La aplicación muestra productos en diferentes categorías y proporciona una experiencia de usuario sencilla y atractiva para la compra de artículos.

## Índice

- [Características](#características)
- [Tecnologías Usadas](#tecnologías-usadas)
- [Estructura del Código](#estructura-del-código)
- [Instrucciones de Instalación](#instrucciones-de-instalación)
- [Uso](#uso)



## Características

- **Exploración de Productos:** Los usuarios pueden filtrar productos por categoría y buscar productos por nombre.
- **Carrito de Compras:** Los usuarios pueden agregar productos al carrito, ajustar la cantidad y eliminar artículos.
- **Realización de Pedidos:** Los usuarios pueden enviar pedidos directamente a través de WhatsApp.
- **Interfaz de Usuario Atractiva:** La aplicación presenta un diseño limpio y fácil de usar.

## Tecnologías Usadas

- **React:** Biblioteca de JavaScript para construir interfaces de usuario.
- **Tailwind CSS:** Framework CSS para estilos rápidos y eficientes.
- **Lucide Icons:** Conjunto de iconos utilizados para la interfaz de usuario.

## Estructura del Código

A continuación, se proporciona una explicación paso a paso del código en el componente `SeresaEcommerce`.

### Importaciones

```javascript
import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
```

- **`useState`**: Hook de React para manejar el estado local.
- **Iconos**: Importa iconos de la biblioteca `lucide-react` para la interfaz de usuario.

### Datos de Ejemplo

```javascript
const products = [
  { id: 1, name: "Collar GUCCI en Rodio", category: "COLLARES", price: 28000, image: "https://i.imgur.com/2U5QHC3.png" },
  // ... otros productos
];

const categories = ["TODOS", "COLLARES", "CADENAS + DIJES", "CADENAS", "ARETES", "PULSERAS", "Sets", "TOPOS", "Candongas", "Gotas"];
```

- **`products`**: Array que contiene la información de los productos disponibles.
- **`categories`**: Array que contiene las categorías de productos para filtrar.

### Componente Principal: `SeresaEcommerce`

```javascript
export default function SeresaEcommerce() {
  // Estado local para manejar categoría seleccionada, carrito, estado del carrito y texto de búsqueda
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); ...
```

### Explicación del Código

1. **Importaciones:**
   - **`useState`**: Hook para gestionar el estado en el componente.
   - **Iconos**: Se utilizan para botones y acciones en la interfaz de usuario.

2. **Datos de Ejemplo:**
   - **`products`**: Contiene una lista de productos con sus detalles.
   - **`categories`**: Listado de categorías para filtrar los productos.

3. **Estado del Componente:**
   - **`selectedCategory`**: Categoria actualmente seleccionada.
   - **`cart`**: Lista de productos en el carrito de compras.
   - **`isCartOpen`**: Determina si el carrito de compras está abierto o cerrado.
   - **`searchText`**: Texto de búsqueda para filtrar productos.

4. **Funciones Principales:**
   - **`addToCart`**: Añade un producto al carrito, aumentando la cantidad si ya está en el carrito.
   - **`removeFromCart`**: Elimina un producto del carrito.
   - **`updateQuantity`**: Actualiza la cantidad de un producto en el carrito.
   - **`sendWhatsAppOrder`**: Genera un mensaje para WhatsApp con el contenido del carrito y lo envía.

5. **Renderización del Componente:**
   - **Barra de Navegación:** Muestra ubicación, iconos de redes sociales, y el botón del carrito.
   - **Filtro por Categorías:** Permite seleccionar y filtrar productos por categoría.
   - **Listado de Productos:** Muestra los productos filtrados con opción para agregar al carrito.
   - **Carrito de Compras:** Muestra los productos en el carrito, con opciones para ajustar cantidad, eliminar productos y realizar el pedido por WhatsApp.
   - **Pie de Página:** Información adicional y enlaces a redes sociales.
   - **Botón WhatsApp:** Acceso rápido para iniciar un chat por WhatsApp.

## Instrucciones de Instalación

1. **Clona el Repositorio:**

   ```bash
   git clone https://github.com/fabianalmanza/seresa.git
   cd seresa
   ```

2. **Instala las Dependencias:**

   ```bash
   npm install
   ```

3. **Inicia la Aplicación:**

   ```bash
   npm start
   ```

   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Uso

- **Explorar Productos:** Navega por las categorías y utiliza la barra de búsqueda para encontrar productos.
- **Agregar al Carrito:** Haz clic en "Agregar al carrito" para añadir productos a tu carrito.
- **Ver Carrito:** Haz clic en el icono del carrito para ver y gestionar los productos en tu carrito.
- **Realizar Pedido:** En el carrito, utiliza el botón para enviar un pedido a través de WhatsApp.
