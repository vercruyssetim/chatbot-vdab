export default class UserService {

    constructor() {
        this.users = {};
    }

    setUser(userId, user) {
        this.users[userId] = user;
    }

    getUser(userId){
        return this.users[userId];
    }
}
