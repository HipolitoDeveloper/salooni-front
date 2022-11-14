import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const httpLink = createHttpLink({
    uri: 'https://parseapi.back4app.com/graphql',
});

const authLink = setContext(async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem('session_token');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            'X-Parse-Application-Id': process.env.APP_ID,
            'X-Parse-Client-Key': process.env.CLIENT_KEY,
            'X-Parse-Session-Token': token ? `${token}` : "",
        }
    }
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client
