
import { gql } from '@apollo/client';


export const GET_CHAR_QUERY = gql`
query getCharQuery($offset:Int,$limit:Int!,$filter:String){
  getChars(offset:$offset,limit:$limit,filter:$filter){
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