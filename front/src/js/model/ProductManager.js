/**
 * Product managers parent class.
 */
export class ProductManager {
    /**
     * Create an empty array for the Product entities. Create the produtsListComplete property that indicates if all the products have already been fetched.
     */
    constructor() {
        this.products = [];
        this.productsListComplete = false;
    }
}
