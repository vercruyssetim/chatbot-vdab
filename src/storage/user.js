export default class User {

    static aUser() {
        return new User();
    }

    withFirstName(firstName) {
        this.firstName = firstName;
        return this;
    }

    withLastName(lastName) {
        this.lastName = lastName;
        return this;
    }

    withProfilePicture(profilePicture) {
        this.profilePicture = profilePicture;
        return this;
    }

    withGender(gender) {
        this.gender = gender;
        return this;
    }

    getFullName(){
        return `${this.firstName} ${this.lastName}`;
    }
}
