import { View } from "./View";

/**
 * Class managing the rendering and the interactions with the content of the home page.
 * @extends View
 */
export class HomeView extends View {
    /**
     * Render the dynamic content of the home page.
     * Add the product list to the content.
     * @param {Product[]} products - An object containing a list of products to display.
     */
    render(products) {
        let containerElement = this.getElements('#items')[0];

        for (let i = 0 ; i < products.length ; i++) {
            let linkWrapperElement = this.createElement('a', {
                href : `./product.html?id=${products[i].id}`
            });
            let articleElement = this.createElement('article');
            let imageElement = this.createElement('img', {
                src: `${products[i].imageSource}`,
                alt : `${products[i].imageAltText}`
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