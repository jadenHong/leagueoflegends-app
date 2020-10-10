const users = [];

const addUser = ({ id, name, room, icon }) => {
    // JavaScript Mastery => javascriptmastery 이렇게 만들어주기위해 아래에 trim 이랑 toLowerCase 사용
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => user.room === room && user.name === name);

    if (!name || !room) return { error: 'Username and room are required.' };
    if (existingUser) return { error: 'Username is taken.' };

    const user = { id, name, room, icon };

    // console.log(user)

    users.push(user);
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id);
}


const getUsersInRoom = (room) => users.filter((user) => user.room === room);


module.exports = { addUser, removeUser, getUser, getUsersInRoom };



























// const users = [];

// const addUser = ({ id, name, room }) => {
//     // JavaScript Mastery => javascriptmastery 이렇게 만들어주기위해 아래에 trim 이랑 toLowerCase 사용
//     name = name.trim().toLowerCase();
//     room = room.trim().toLowerCase();

//     const existingUser = users.find((user) => user.room === room && user.name === name);

//     if (!name || !room) return { error: 'Username and room are required.' };
//     if (existingUser) return { error: 'Username is taken.' };

//     const user = { id, name, room };

//     // console.log(user)

//     users.push(user);

//     return { user };
// }

// const removeUser = (id) => {
//     const index = users.findIndex((user) => user.id === id);
//     if (index !== -1) {
//         return users.splice(index, 1)[0];
//     }
// }

// const getUser = (id) => {
//     return users.find((user) => user.id === id);
// }


// const getUsersInRoom = (room) => users.filter((user) => user.room === room);


// module.exports = { addUser, removeUser, getUser, getUsersInRoom };







