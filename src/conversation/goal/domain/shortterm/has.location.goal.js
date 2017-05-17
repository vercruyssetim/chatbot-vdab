import {UNSURE} from '../../../../backend/vind.een.job.client';
export default class HasLocationGoal {

    constructor(data) {
        data.locationGoal = {
            completed: false
        };
        this.name = 'hasLocation';
    }

    isCompletedByUserAction(userAction) {
        return userAction.entities.location || userAction.intent === 'unsure';
    }

    isCompletedBy({vindEenJob, locationGoal}) {
        return locationGoal.completed || vindEenJob.location;
    }

    completeData({vindEenJob, locationGoal}, userAction) {
        if (userAction.intent === 'unsure') {
            locationGoal.completed = true;
            vindEenJob.location = UNSURE;
        } else {
            vindEenJob.location = userAction.entities.location;
        }
    }

    start(speech) {
        speech.addMessage('In welke gemeente of stad wil je werken?');
        speech.send();
    }

    complete(speech, {vindEenJob}) {
        if (vindEenJob.location !== UNSURE) {
            speech.addMessage('Oké, check!');
            speech.addMessage('Ik toon je zo meteen een aantal jobs');
        } else {
            speech.addMessage('Oké, geen probleem. Dan zoek ik overal. Even geduld.');
        }
        speech.send();
    }

    failed(speech){
        speech.addMessage('Sorry, ik begrijp niet goed wat je bedoelt. Ik leer nog elke dag bij. Welke locatie bedoel je precies?');
        speech.send();
    }
}