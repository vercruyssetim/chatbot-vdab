export default class UserService {

    constructor() {
        this.users = {};
    }

    setUser(userId, users) {
        this.users[userId] = users;
    }

    getUser(userId){
        return this.users[userId];
    }
}
