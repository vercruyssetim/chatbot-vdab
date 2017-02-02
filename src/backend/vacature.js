export default class Vacature {
    constructor(){

    }

    static aVacature(){
        return new Vacature();
    }

    withFunctie(functie) {
        this.functie = functie;
        return this;
    }

    withBedrijf(bedrijf) {
        this.bedrijf = bedrijf;
        return this;
    }

    withLogo(logo) {
        this.logo = logo;
        return this;
    }

    withLink(link) {
        this.link = link;
        return this;
    }
}
