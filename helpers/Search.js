exports.FindRoleByName = (name, guild) => {
    let roles = [];
    guild.roles.forEach(r => {
        let rName = r.name.toLowerCase();
        let search = name.toLowerCase();
        if(rName.includes(search)){
            roles.push(r);
        }
    });
    if(roles.length > 1){
        //there's more than one roles found
        return roles;
    } else if (roles.length === 0){
        //there's no matching roles
        return null;
    } else {
        //there's only one
        return roles;
    }
};

exports.FindUserByName = (name, guild) => {

};