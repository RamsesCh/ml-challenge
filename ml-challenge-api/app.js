const express = require("express");
const Config = require("./config");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
    res.send("API REST ML-CHALLENGE :-)");
});

app.get('/api/items', (req, res)=>{
    const queryParam = req.query.q;
    axios.get(`${Config.endpoints.search}limit=${Config.limitItems}&q=${queryParam}`).then((response)=>{
        const dataResponse = response.data;
        const categories = dataResponse.filters[0] ? dataResponse.filters[0].values[0].path_from_root.map(cat => cat.name): [];
        const items = dataResponse.results.map((result) => {
            return {
                id: result.id,
                title: result.title,
                price: {
                    currency: result.currency_id,
                    amount: result.price,
                    decimals: 0,
                },
                picture: result.thumbnail,
                condition: result.condition,
                free_shipping: result.shipping.free_shipping,
                location: result.seller_address.state.name
            };
        });
        res.json({
            author: Config.author,
            categories,
            items
        });

    }).catch((error)=>{
        res.json(error);
    })
});

app.get('/api/items/:id', async(req, res)=>{
    const id = req.params.id;
    try {
        const [resItem, resDescription] = await axios.all([
            axios.get(`${Config.endpoints.items}${id}`),
            axios.get(`${Config.endpoints.items}${id}${Config.itemsMethods.description}`) 
        ]);
        const item = {
            id: resItem.data.id,
            title: resItem.data.title,
            price: {
                currency: resItem.data.currency_id,
                amount: resItem.data.price,
                decimals: 0,
            },
            picture: resItem.data.pictures,
            condition: resItem.data.condition,
            free_shippin: resItem.data.shipping.free_shipping,
            sold_quantity: resItem.data.sold_quantity,
            description: resDescription.data.plain_text
        };
        res.json({
            author: Config.author,
            item
        });
    } catch(error){
        res.json(error)
    }
    
});

app.listen(8000, () => {
 console.log("Server iniciado en el puerto 8000.");
});