
import { gql } from '@apollo/client';


export const REMOVE_CHAR_MUTATION = gql`
mutation removeChar($id:Int!){
    removeChar(
        id:$id
    ){
       success 
    }
    
}
`;

