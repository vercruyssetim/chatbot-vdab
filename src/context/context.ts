export class Context {
    private name: string;
    private parameters: any;
    private lifespan: number;

    constructor(context) {
        this.name = context.name;
        this.parameters = context.parameters ? context.parameters : {};
        this.lifespan = context.lifespan;
    }

    isAlive() {
        return this.lifespan > 0;
    }

    getContextType() {
        return this.name.split('_')[0];
    }

    getIndex() {
        return this.name.split('_')[1];
    }

    withParameter(name, value) {
        this.parameters[name] = value;
        return this;
    }

    handleEnd() {
        this.name = `${this.getContextType()}_${parseInt(this.getIndex()) + 1}`;
        this.lifespan = 1;
    }

    static fromType(contextType: string, index?: number): Context {
        let number = index ? index : 1;
        return new Context({
            name: `${contextType}_${number}`,
            parameters: {},
            lifespan: 1
        });
    }
}
