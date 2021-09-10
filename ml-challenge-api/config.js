const Config = {
    author: {
        name:'Ramses',
        lastname: 'Chavarria'
    },
    endpoints: {
        search: 'https://api.mercadolibre.com/sites/MLA/search?',
        items: 'https://api.mercadolibre.com/items/'
    },
    limitItems: 4,
    itemsMethods: {
        description: '/description'
    }
};

module.exports = Config;