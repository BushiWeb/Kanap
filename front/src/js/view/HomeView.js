import { View } from "./View";

/**
 * Class managing rendering and intarctions with the content of the Home page
 */
export class HomeView extends View {
    /**
     * Renders the dynamic content of the home page: create the products cards and appends them to their container.
     * @param {Array} products - Object containing a list of products to display.
     */
    render(products) {
        let containerElement = this.getElements('#items')[0];

        for (let i = 0 ; i < products.length ; i++) {
            let linkWrapperElement = this.createElement('a', {
                href : `./product.html?id=${products[i]._id}`
            });
            let articleElement = this.createElement('article');
            let imageElement = this.createElement('img', {
                src: `${products[i].imageUrl}`,
                alt : `${products[i].altTxt}`
            });
            let nameElement = this.createElement('h3', {
                class: 'productName'
            });
            let descriptionElement = this.createElement('p', {
                class: 'productDescription'
            });

            nameElement.textContent = `${products[i].name}`;
            descriptionElement.textContent = `${products[i].description}`;

            articleElement.appendChild(imageElement);
            articleElement.appendChild(nameElement);
            articleElement.appendChild(descriptionElement);
            linkWrapperElement.appendChild(articleElement);
            containerElement.appendChild(linkWrapperElement);
        }

    }
}