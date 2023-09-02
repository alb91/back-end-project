class ProductManager {
  constructor() {
    this.products = [];
    this.idCounter = 1;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("Debes completar toda la información.");
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.error(`Ya existe un producto con el código ${code}`);
      return;
    }

    const item = {
      id: this.idCounter++,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(item);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      return "Not found.";
    }
  }
}

//Ejemplos
const productManager = new ProductManager();

productManager.addProduct(
  "Producto",
  "Descripción",
  10.99,
  "imagen.jpg",
  "Código",
  4
);

console.log(productManager.getProducts());
console.log(productManager.getProductById(1));
