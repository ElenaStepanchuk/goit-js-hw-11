import axios from "axios";

const API_KEY = '24384103-764a450d164e25b7c6f60e4ce';
const URL = 'https://pixabay.com/api/';
const OPTIONS = 'image_type=photo&orientation=horizontal&safesearch=true';


export default class FetchToIP {
    constructor() {
        this.request = ``;
        this.page = 1;
        this.per_page = 40;
        this.totalHits = 1;
    }


    async getFetchPhotos() {
        
        
        const url = `${URL}?key=${API_KEY}&q=${this.request}&${OPTIONS}&page=${this.page}&per_page=${this.per_page}`;
        try {
            const response = await axios.get(url);
            this.page += 1;
            return await response.data.hits;
            
        }
        catch (error) {
            console.log(error)
        }
    }
    resetPage() {
        this.page = 1;
    }
    get reply() {
    return this.request;
  }

  set reply(newReply) {
    this.request = newReply;
  }
}
