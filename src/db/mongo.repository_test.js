import chai, {expect} from 'chai';
import chaiProperties from 'chai-properties';
import MongoRepository from './mongo.repository';
chai.use(chaiProperties);

describe('mongo -> ', () => {

    let userRepository;
    beforeEach(() => {
        userRepository = new MongoRepository('user_test', 'mongodb://mongodb:27017/chatbotDb');
        userRepository.drop();
    });

    describe('insert', () => {
        it('should successfully insert', (done) => {
            userRepository.insert({_id: 1, test: 'test'});
            userRepository.findAll()
                .then((result) => {
                    expect(result).to.deep.equal([{_id: 1, test: 'test'}]);
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done();
                });
        });
    });

    describe('findOne', () => {
        it('should successfully find the right id', (done) => {
            userRepository.insert({id: 1, test: 'noMatch'});
            userRepository.insert({id: 2, test: 'match'});
            userRepository.findOne({id: 2})
                .then((result) => {
                    expect(result).to.have.properties({id: 2, test: 'match'});
                    done();
                })
                .catch((error) => {
                    console.log(error);
                    done();
                });
        });
    });
});
