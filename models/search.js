import {Paging} from "../utils/paging";

class Search {
    static search(keyword){
       return new Paging(({
           url:`search?q=${keyword}`
       }))
    }
}
export {
    Search
}