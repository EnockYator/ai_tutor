
// configuration file


export const loginFormControls =[
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    }

];

export const registerFormControls =[
    {
        name : 'full_name',
        label : 'Full Name',
        placeholder : 'Enter your name',
        componentType : 'input',
        type : 'text',
    },
    {
        name : 'email',
        label : 'Email',
        placeholder : 'Enter your email',
        componentType : 'input',
        type : 'email',
    },
    {
        name : 'password',
        label : 'Password',
        placeholder : 'Enter your password',
        componentType : 'input',
        type : 'password',
    },
    {
        name : 'role',
        label : 'Role',
        componentType : 'radio',
        options: [
            { id: 'student', label: 'Student' },
            { id: 'tutor', label: 'Tutor' }
        ],
        defaultValue: 'student' // optional default value
    },
    
];