export const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    username: "admin_user",
    role: "admin" //  change this to "user" for regular users
};

export const switchRole = (newRole) => {
    const updatedUser = { ...currentUser, role: newRole};
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    window.location.reload();
}