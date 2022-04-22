export default class CategoryDto{
    id;
    name;
    type;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.type = model.type;
    }
}