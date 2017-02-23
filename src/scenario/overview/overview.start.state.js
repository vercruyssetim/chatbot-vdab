import VEJStartState from '../vej/vej.start.state';
export default class OverviewStartState {

    start(reply, context){
        reply.addMessage(`Goeiedag ${context.user.getFullName()}!`);
        reply.addMessage('Dit ben jij :)');
        reply.addImage(context.user.profilePicture);
        reply.addDelay(3000);
        reply.addMessage('Ik ben een chat bot van de VDAB en ik kan je helpen met het vinden van een vacature');
        reply.addMessage('Ik ben nog vrij nieuw dus de kans bestaat dat ik nog fouten maak.');
        reply.addQuickReplies('Zullen we beginnen?', ['Natuurlijk!']);
        reply.send();
        return new VEJStartState();
    }
}
