/* eslint-disable */
// export const user = {
//     id    : 'cfaad35d-07a3-4447-a6c3-d8c3d54fd5df',
//     name  : 'Brian Hughes',
//     email : 'hughes.brian@company.com',
//     avatar: 'assets/images/avatars/brian-hughes.jpg',
//     status: 'online'
// };


const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export const user = {
    id    : userInfo ? userInfo.id : '',
    userId    : userInfo ? userInfo.userId : '',
    name  : userInfo ? userInfo.firstName + ' ' + userInfo.lastName : '',
    username  : userInfo ? userInfo.username : '',
    email : userInfo ? userInfo.email : '',
    designation : userInfo ? userInfo.designation : '',
    avatar:  userInfo && userInfo.photo != null ? userInfo.photo : 'assets/images/avatars/brian-hughes.jpg',
    status: 'online'
};
