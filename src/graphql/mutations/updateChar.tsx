
import { gql } from '@apollo/client';


export const UPDATE_CHAR_MUTATION = gql`
mutation updateChar($id:Int!,$name:String!,$location:String!,$image:String!){
    updateChar(
        id:$id,
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
