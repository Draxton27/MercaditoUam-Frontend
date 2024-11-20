export default function Cards({ products }) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <div
            key={product.productId}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden flex flex-col"
          >
            {/* Imagen del producto */}
            <div className="relative">
              <img
                className="w-full h-60 object-cover"
                src={product.images}
                alt={product.title}
              />
              {/* Badge para destacar */}
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-md">
                Nuevo
              </span>
            </div>
  
            {/* Contenido de la tarjeta */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Título del producto */}
              <h2 className="font-semibold text-lg mb-2 text-gray-900">
                {product.title}
              </h2>
              {/* Descripción */}
              <p className="text-gray-600 text-sm mb-4">
                {product.description.length > 100
                  ? product.description.substring(0, 100) + "..."
                  : product.description}
              </p>
              {/* Precio */}
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-xl text-gray-800">
                  ${product.price.toFixed(2)}
                </span>
                <button className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors duration-200">
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  