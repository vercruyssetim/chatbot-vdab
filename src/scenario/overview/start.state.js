export default class StartState {

    start(reply){
        reply.addMessage('Goeiedag!');
        reply.addMessage('Ik ben een chat bot van de VDAB en ik kan je helpen met het vinden van een vacature');
        reply.addMessage('Ik ben nog vrij nieuw dus de kans bestaat dat ik nog fouten maak.');
        reply.addQuickReplies('Waar wil je mee beginnen?', ['Start VEJ!']);
        reply.send();
    }
}
