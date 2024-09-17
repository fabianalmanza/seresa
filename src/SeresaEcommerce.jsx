import { useState } from 'react';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';

// Datos de ejemplo
const products = [
  { id: 1, name: "Collar GUCCI en Rodio", category: "COLLARES", price: 28000, image: "https://i.imgur.com/2U5QHC3.png" },
  { id: 2, name: "Cadena cobra plateada", category: "CADENAS", price: 30000, image: "https://i.imgur.com/SYjnA9p.png" },
  { id: 3, name: "Earcuff colores", category: "ARETES", price: 8000, image: "https://i.imgur.com/tk6V6wQ.png" },
  { id: 4, name: "Tipo Pandora Kids", category: "PULSERAS", price: 15000, image: "https://i.imgur.com/qVVNOBC.png" },
  { id: 5, name: "Cadena +Earcuff+Topos", category: "Sets", price: 42000, image: "https://i.imgur.com/mkD08bk.png" },
  { id: 6, name: "Cara de oso", category: "TOPOS", price: 20000, image: "https://i.imgur.com/5TDjYpd.png" },
  { id: 7, name: "Candongas", category: "Candongas", price: 12000, image: "https://i.imgur.com/sO9DxGC.png" },
  { id: 8, name: "Aretes de Gota", category: "Gotas", price: 20000, image: "https://i.imgur.com/KBj4fXD.png" },
];

const categories = ["TODOS", "COLLARES", "CADENAS + DIJES","CADENAS", "ARETES", "PULSERAS", "Sets", "TOPOS", "Candongas", "Gotas"];

export default function SeresaEcommerce() {
  const [selectedCategory, setSelectedCategory] = useState("TODOS");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchText, setSearchText] = useState(""); // Estado para el texto de búsqueda

  const filteredProducts = products
    .filter(product =>
      selectedCategory === "TODOS" || product.category === selectedCategory
    )
    .filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id);
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const sendWhatsAppOrder = () => {
    const message = cart.map(item => `${item.name} x${item.quantity}`).join('\n');
    const total = `Total: $${totalPrice.toLocaleString()}`;
    const whatsappMessage = encodeURIComponent(`Hola, me gustaría hacer el siguiente pedido:\n\n${message}\n\n${total}`);
    window.open(`https://wa.me/+573174869462?text=${whatsappMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fdf2d6] text-[#4a3933]">
      <section className="relative w-full bg-[#fdf2d6] shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          {/* Location Icon */}
          <div className="flex items-center space-x-2">
            <i className="fas fa-map-marker-alt text-gray-500"></i>
            <span className="text-gray-700">Bucaramanga, Colombia.</span>
          </div>

          {/* Social Media Icons */}
          <div className="hidden md:flex space-x-4">
            <a href="https://wa.me/+573174869462" target="_blank" rel="nofollow" aria-label="Whatsapp">
              <i className="fab fa-whatsapp text-green-500"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="nofollow" aria-label="Facebook">
              <i className="fab fa-facebook-f text-blue-600"></i>
            </a>
            <a href="https://www.instagram.com/seresa_bga/" target="_blank" rel="nofollow" aria-label="Instagram">
              <i className="fab fa-instagram text-pink-500"></i>
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="nofollow" aria-label="Youtube">
              <i className="fab fa-youtube text-red-600"></i>
            </a>
          </div>
        </div>

        <header className="bg-[#e6c78f] p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Contenedor Circular */}
            <div className="w-36 h-36 rounded-full overflow-hidden flex items-center justify-center">
              <img
                src="https://i.postimg.cc/L8H78FjX/logo.jpg"
                alt="Logo Seresa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative w-1/2 mb-4">
              <i className="fas fa-search absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                placeholder="Buscar producto"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-400 rounded"
              />
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-[#b38b59] text-white p-2 rounded-full relative"
            >
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>
      </section>

      <main className="container mx-auto p-4">
        <div className="mb-8 container mx-auto p-4">
          <h2 className="text-2xl font-semibold mb-4">Categorías</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded ${selectedCategory === category
                  ? 'bg-[#b38b59] text-white'
                  : 'bg-[#e6c78f] text-[#4a3933] hover:bg-[#d1b17e]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

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

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6">
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

      <footer className="bg-[#e6c78f] p-4 mt-8 shadow-md">
        <div className="container mx-auto text-center">
          <p className="mb-4">Tenemos los mejores componentes de mayor calidad.</p>
          <div className="flex justify-center space-x-4 mb-4">
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

      {/* Botón WhatsApp en la esquina inferior derecha */}
      <div className="btn-whatsapp">
        <a href="https://wa.me/+573174869462" target="_blank" rel="noopener noreferrer">
          <img src="https://imeldajoyas.com/img/btn_whatsapp1.png" alt="imelda joyas" />
        </a>
      </div>
    </div>

  );
}
