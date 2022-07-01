
import { gql } from '@apollo/client';


export const ADD_CHAR_MUTATION = gql`
mutation addChar($name:String!,$location:String!,$image:String!){
    addChar(
        name:$name,
        location:$location,
        image:$image
    ){
        success
        errorMessage
        data{
            id
            name
            status
            species
            type
            gender
            location{
                name
            }
            episode
            url
            image
            created
        }
    }
    
}
`;
