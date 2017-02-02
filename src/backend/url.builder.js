export default class UrlBuilder {

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.queryParams = [];
    }

    static aUrl(baseUrl) {
        return new UrlBuilder(baseUrl);
    }

    build(){
        let url = `${this.baseUrl}`;
        if(this.queryParams.length > 0){
            url = `${url}?`;
            for(let index = 0; index < this.queryParams.length; index++){
                url = `${url}${this.queryParams[index].name}=${this.queryParams[index].value}`;
                if(index !== this.queryParams.length - 1){
                    url = `${url}&`;
                }
            }
        }
        return url;
    }

    withQueryParam(name, value) {
        if(value){
            this.queryParams.push({name, value});
        }
        return this;
    }
}
