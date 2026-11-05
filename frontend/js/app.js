const productsContainer =
    document.getElementById("products");


async function getProducts() {

    try {

        const response =
            await fetch(
                "http://localhost:5000/api/products"
            );


        const products =
            await response.json();


        productsContainer.innerHTML = "";


        products.forEach(product => {

            const productCard =
                document.createElement("div");


            productCard.className =
                "product-card";


            productCard.innerHTML = `

                <img
                    src="${product.image}"
                    alt="${product.name}"
                >

                <div class="product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        ${product.description}
                    </p>

                    <h2>
                        ₹${product.price}
                    </h2>

                    <a
                        href="product.html?id=${product._id}"
                        class="btn"
                    >
                        View Product
                    </a>

                </div>

            `;


            productsContainer.appendChild(
                productCard
            );

        });

    } catch (error) {

        console.log(
            "Error:",
            error
        );

    }

}


getProducts();