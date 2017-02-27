export default class WelcomeGoal {

    constructor() {
        this.shorttermGoals = [];
    }

    getShorttermGoals() {
        return this.shorttermGoals;
    }

    getName() {
        return 'welcome';
    }

    start(speech, data) {
        speech.addMessage(`Goeiedag ${data.user.getFullName()}!`);
        speech.send();
    }

    complete(speech, data) {
        speech.addMessage('Dit ben jij :)');
        speech.addImage(data.user.profilePicture);
        speech.addDelay(6000);
        speech.addMessage('Ik ben een chat bot van de VDAB en ik kan je helpen met het vinden van een vacature');
        speech.addMessage('Ik ben nog vrij nieuw dus de kans bestaat dat ik nog fouten maak.');
        speech.addQuickReplies('Zullen we beginnen?', ['Natuurlijk!']);
        speech.send();
    }
}
