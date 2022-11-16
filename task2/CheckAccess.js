const configMS = {
    read: [
        'sample@email.com',
        'mark@fb.com',
        'whoami@dot.com',
        'test@email.com',
    ],
    write: ['sample@email.com', 'test@email.com'],
};

const CheckAccess = (login, config) => {
    const keys = Object.keys(config);
    const rules = keys.filter((key) => {
        const index = config[key].findIndex((el) => el === login);
        if (index !== -1) return key;
    });
    return rules;
};

console.log(CheckAccess('sample@email.com', configMS)); //check
