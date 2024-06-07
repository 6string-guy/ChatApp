export const getSender = (loggedUser, users) => {
    if (users[0].__id === loggedUser._id)
    {
        return users[1].name
    }
    return users[0].name;
}