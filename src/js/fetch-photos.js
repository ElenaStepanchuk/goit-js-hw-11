import axios from "axios";
const API_KEY = '24384103-764a450d164e25b7c6f60e4ce';
const URL = 'https://pixabay.com/api/';


export class FetchToIP {
    constructor() {
        this.fetch = "";
        this.page = 1;
    }


    async getFetchPhotos() {
        
        const params = new URLSearchParams( {
            key: API_KEY,
            q: '${this.fetch}',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: `${this.page}`,
            per_page: 40,
        })

        const response = await axios.get(`${URL}?${params}`)
        try {
            if (response.data.hits.length === 0) {
                return Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            }
            this.page += 1;
            return await response.data;
        }
        catch (error) {
            console.log(error.message)
        }
    }
    resetPage() {
        this.page = 1;
    }
}
// collections: 8037
// comments: 396
// downloads: 366937
// id: 736877
// imageHeight: 1282
// imageSize: 97150
// imageWidth: 1920
// largeImageURL: "https://pixabay.com/get/g116aa7e24f203aeb5eae264a314b57123404d2c61ae1819c8e2182e8dfa93d2a1b0e71519fcdb0d0536b42382d4de6910dc1bc98aea188720d38241c02916574_1280.jpg"
// likes: 2337
// pageURL: "https://pixabay.com/photos/tree-cat-silhouette-moon-full-moon-736877/"
// previewHeight: 100
// previewURL: "https://cdn.pixabay.com/photo/2015/04/23/21/59/tree-736877_150.jpg"
// previewWidth: 150
// tags: "tree, cat, silhouette"
// type: "photo"
// user: "Bessi"
// userImageURL: "https://cdn.pixabay.com/user/2019/04/11/22-45-05-994_250x250.jpg"
// user_id: 909086
// views: 792727
// webformatHeight: 427
// webformatURL: "https://pixabay.com/get/gd900567c55d5c33743ea8f0320c26213460a17cf6f31483b55c1cdc8df0f55a72bfedb4e366ecdbbc34fe6da30e8c874_640.jpg"
// webformatWidth: 640