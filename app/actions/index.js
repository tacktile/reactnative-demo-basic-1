export const DATA_AVAILABLE = 'DATA_AVAILABLE';

//Import the restaurants data
import Data from '../restaurants.json';

export function getData(){
    return (dispatch) => {
 
        //Make API Call
        //For this example, I will be using the sample data in the json file
        //delay the retrieval [Sample reasons only]
        setTimeout(() => {
            var data  = Data.restaurants;
            dispatch({type: DATA_AVAILABLE, data:data});
        }, 2000);
    };
}