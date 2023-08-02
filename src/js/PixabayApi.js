const API_KEY = '37217184-8f6cfbb216d0e6cd21e017d05';
const ENDPOINT = "https://pixabay.com/api/";
const PARAMETERS = {
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

 
export default class PixabayApi {
    constructor() {
        this.page = 1;
        this.per_page = 40;
        this.searchQuery = '';
      }

      async getResponse() {
        try {
          const response = await axios.get(
            `${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&${PARAMETERS}&per_page=${this.per_page}&page=${this.page}`
          );
          const data = response.data;
          this.incrementPage();
          console.log(data)
          return data;
        } catch (error) {
          loadMoreBtn.hide();
        }
      }

      incrementPage() {
        this.page += 1;
      }
      resetPage() {
        this.page = 1;
       
      }
      get query() {
        return this.searchQuery;
      }

      set query(newQuery) {
        this.searchQuery = newQuery;
      }

};