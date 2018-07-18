const isAdmin = user => {
    if (user.isadmin === true){
        return true;
    }else return false;
}

module.exports = isAdmin;