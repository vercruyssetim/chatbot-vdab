export default class BackendService {

    static mapToElements(vacatures) {
        return vacatures.map((vacature) => {
            return {
                title: vacature.bedrijf,
                subtitle: vacature.functie,
                image: vacature.logo ? vacature.logo : 'http://i4bi.be/wp-content/uploads/2015/10/vdab-e1448897071202.png',
                link: vacature.link
            };
        });
    }
}
