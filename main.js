const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.idCounter = 1;
    this.path = path;
  }


  loadProducts() {
    try {

      const data = fs.readFileSync(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      this.products = [];

    }
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), "utf8");
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
    this.saveProducts();
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


  deleteProduct(id) {
  const index = this.products.findIndex((product) => product.id === id);

  if (index !== -1) {
    this.products.splice(index, 1);
    this.saveProducts();
    console.log(`Producto ${id} ha sido eliminado`);
  } else {
    console.error(`Producto ${id} no encontrado.`)
  }
}

}



//Ejemplos
const productManager = new ProductManager("products.json");

productManager.addProduct(
  "Producto",
  "Descripción",
  10.99,
  "imagen.jpg",
  "Código",
  4
);

//console.log(productManager.getProducts());
//console.log(productManager.getProductById(1));
//console.log(productManager.deleteProduct(1));