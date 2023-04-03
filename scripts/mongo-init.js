db.createUser({
    user: 'pokeapi',
    pwd: 'pokeapi',
    roles: [
        {
            role: 'readWrite',
            db: 'pokeapi',
        },
    ],
})
