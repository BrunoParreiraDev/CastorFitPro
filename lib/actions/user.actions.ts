export const getUserInfo = () => {
  try {
    return {
      name: 'Henrique Castor',
      firstname: 'Henrique',
      profileImage: '/users/henrique_castor.jpg',
      privileges: 'admin',
    };
    
  } catch (error) {
    console.log(error);
  }
};
