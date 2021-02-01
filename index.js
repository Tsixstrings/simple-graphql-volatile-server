const { ApolloServer, gql } = require('apollo-server');

let products = [
    {
        id: 1,
        name: "Iphone 12 Pro",
        category: "Mobile",
        description: "The last Apple Phone"
    },
    {
        id: 2,
        name: "Aspirador Cecotec C1",
        category: "Electrodomesticos",
        description: "Aspirador de mano con deposito de 2Litros."
    },{
        id: 3,
        name: "Lenovo Legion",
        category: "PC",
        description: "Portatil Gaming."
    },
]

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  # This "Book" type defines the queryable fields for every book in our data source.
  type Product{
    id: Int
    name: String
    category: String
    description: String
}


  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query{
    products: [Product]
    product(id: ID): Product
}
type Mutation{
    addProduct(name: String, category: String, description: String): Product
    updateProduct(id: Int,name: String, category: String, description: String): Product
    deleteProduct(id: Int): Product
}
`;



  // Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
        products: () => { return products},
        product: (data) => {
            return products.filter(row => row.id = data.id);
        },
  },
  Mutation: {
    addProduct: (parent, data) => {
        let id = products.length+1;
        let newRegister = {
            'id': id,
            'name': data.name,
            'category': data.category,
            'description': data.description
        }
        products.push(newRegister)
        return newRegister;
    },
    updateProduct: (parent,data) => {
        products.map((row,index) => {
            if(row.id === data.id){
                products[index].name = data.name;
                products[index].category = data.category;
                products[index].description = data.description;
            }
        })
        return null;
    },
    deleteProduct: (parent,data) => {
        let aux_var = products.filter(row => row.id !== data.id);
        products = aux_var;
        console.log("asi se quedan products al borrar uno", products);
        return null;
    }
}
}

  

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});