export class AppRoute {
    constructor(public path: string, public parent: AppRoute | undefined = undefined) {
    }

    public get fullPath():string {
        let tempParent = this.parent;
        const routeParts: string[] = [this.path];

        while (tempParent) {
            routeParts.push(tempParent.path)
            tempParent = tempParent.parent;
        }

        let result = [...routeParts.reverse()].join("/");

        result = result.replaceAll("//", "/");

        if (result[0] === "/") {
            result = result.slice(1, result.length - 1);
        }

        return result;
    }
}