class UserDto{
    email;
    id;
    firstName;
    lastName;

    constructor(model) {
        this.email = model.email;
        this.id = model._id;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
    }
}

export default UserDto;