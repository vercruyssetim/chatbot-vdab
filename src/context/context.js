class Context{
    constructor(context){
        this.name = context.name;
        this.parameters = context.parameters;
        this.lifespan = context.lifespan;
    }

    isAlive(){
        return this.lifespan > 0;
    }

    getContextType(){
        return this.name.split('_')[0];
    }

    getIndex(){
        return this.name.split('_')[1];
    }

    handleEnd(){
        this.name = `${this.getContextType()}_${parseInt(this.getIndex()) + 1}`;
        this.lifespan = 1;
    }

    static fromType(contextType){
        return new Context({
            name: `${contextType}_1`,
            parameters: {},
            lifespan: 1
        })
    }
}
module.exports = Context;
