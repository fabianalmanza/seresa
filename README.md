

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
  const [searchText, setSearchText] = useState("");
  
  // Filtrado de productos basado en la categoría seleccionada y el texto de búsqueda
  const filteredProducts = products
    .filter(product =>
      selectedCategory === "TODOS" || product.category === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

  // Funciones para manejar el carrito
  const addToCart = (product) => { /*...*/ };
  const removeFromCart = (id) => { /*...*/ };
  const updateQuantity = (id, newQuantity) => { /*...*/ };

  // Cálculo del total de artículos y precio
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Función para enviar el pedido por WhatsApp
  const sendWhatsAppOrder = () => { /*...*/ };

  // Renderización del componente
  return (
    <div className="min-h-screen bg-[#fdf2d6] text-[#4a3933]">
      {/* Barra de navegación */}
      <section className="relative w-full bg-[#fdf2d6] shadow-md sticky top-0 z-50">
        {/* ...contenido de la barra de navegación... */}
      </section>
      
      {/* Contenido principal */}
      <main className="container mx-auto p-4">
        {/* Filtro por categorías */}
        <div className="mb-8 container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded ${selectedCategory === category
                  ? 'bg-[#b38b59] text-white'
                  : 'bg-[#e6c78f] text-[#4a3933] hover:bg-[#d1b17e]'}`
                }
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 object-cover mb-4 rounded"
              />
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2 text-center">{product.category}</p>
              <p className="text-lg font-bold mb-4 text-center">${product.price.toLocaleString()}</p>
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#b38b59] text-white py-2 rounded hover:bg-[#9e7a4d]"
              >
                Agregar al carrito
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Carrito de compras */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
            {/* Encabezado del carrito */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Carrito de Compras</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            {cart.length === 0 ? (
              <p>Tu carrito está vacío</p>
            ) : (
              <>
                {/* Listado de artículos en el carrito */}
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between mb-4 border-b pb-4">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">${item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Plus size={20} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-6">
                  <p className="text-xl font-bold">Total: ${totalPrice.toLocaleString()}</p>
                  <button
                    onClick={sendWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-3 rounded mt-4 hover:bg-green-600"
                  >
                    Realizar Pedido por WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Pie de página */}
      <footer className="bg-[#e6c78f] p-4 mt-8 shadow-md">
        <div className="container mx-auto text-center">
          <p className="mb-4">Tenemos los mejores componentes de mayor calidad.</p>
          <div className="flex justify-center space-x-4 mb-

4">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg"
            >
              <i className="fab fa-facebook-f text-xl text-gray-800"></i>
            </a>
            <a
              href="https://wa.me/+573174869462"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg"
            >
              <i className="fab fa-whatsapp text-xl text-green-600"></i>
            </a>
            <a
              href="https://www.instagram.com/seresa_bga/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg"
            >
              <i className="fab fa-instagram text-xl text-pink-600"></i>
            </a>
          </div>
          <p>2024. Seresa ©️ Todos los derechos reservados.</p>
        </div>
      </footer>

      {/* Botón WhatsApp */}
      <div className="btn-whatsapp">
        <a href="https://wa.me/+573174869462" target="_blank" rel="noopener noreferrer">
          <img src="https://imeldajoyas.com/img/btn_whatsapp1.png" alt="imelda joyas" />
        </a>
      </div>
    </div>
  );
}
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
