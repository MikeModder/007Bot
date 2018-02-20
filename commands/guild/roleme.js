exports.run = (client, message, args) => {
    let manageRoles = message.guild.members.get(message.author.id).permissions.has('MANAGE_ROLES');
    let fullArgs = args.join(' ');
    let action = args.shift();
    let rolename = args.join(' ');
    let config = client.server_cfg.get(message.guild.id);
    let roles;

    if(!manageRoles && (action === 'add' || action === 'remove')){
        message.channel.send(`:x: You need the \`MANAGE_ROLES\` permission to configure roleme!!`);
        return;
    }

    switch(action){
        case 'add':
            //add a role
            roles = client.search.FindRoleByName(rolename, message.guild);
            if(!roles) return message.channel.send(`:x: There was no role found matching \`${rolename}\`!`);
            if(roles.length > 1){
                let rolesArray = [];
                roles.forEach(r => {
                    rolesArray.push(r.name);
                });
                return message.channel.send(`:x: There where multiple matches found for that search!\n\`${rolesArray.join(', ')}\``);
            } else if (roles.length === 1) {
                if(config.roleme.includes(roles[0].id)){
                    return message.channel.send(`:x: That role is already setup for RoleMe! You can remove it with \`roleme remove ${roles[0].name}\`.`);
                }
                config.roleme.push(roles[0].id);
                client.server_cfg.set(message.guild.id, config);
                return message.channel.send(`:white_check_mark: Added role \`${roles[0].name}\` to the RoleMe list!`);
            }
            break;
        case 'remove':
            //remove a role
            roles = client.search.FindRoleByName(rolename, message.guild);
            if(!roles) return message.channel.send(`:x: There was no role found matching \`${rolename}\`!`);
            if(roles.length > 1){
                let rolesArray = [];
                roles.forEach(r => {
                    rolesArray.push(r.name);
                });
                return message.channel.send(`:x: There where multiple matches found for that search!\n\`${rolesArray.join(', ')}\``);
            } else if (roles.length === 1) {
                if(!config.roleme.includes(roles[0].id)){
                    return message.channel.send(`:x: That role isn't setup for RoleMe! You can add it with \`roleme add ${roles[0].name}\`.`);
                }
                config.roleme.splice(config.roleme.indexOf(roles[0].id), 1);
                client.server_cfg.set(message.guild.id, config);
                return message.channel.send(`:white_check_mark: Removed role \`${roles[0].name}\` from the RoleMe list!`);
            }
            break;
        case 'list':
            //list the roles on the list
            if(!config.roleme.length > 0) return message.channel.send(`There are no roles currently setup for RoleMe!`);
            roles = [];
            config.roleme.forEach(ar => {
                roles.push(message.guild.roles.get(ar).name);
            });
            message.channel.send(`The following roles are setup for RoleMe:\n\`${roles.join(', ')}\``);
            break;
        default:
            //add or remove a role from the user

            roles = client.search.FindRoleByName(rolename, message.guild);
            if(!roles) return message.channel.send(`:x: There was no role found matching \`${rolename}\`!`);

            rolename = fullArgs;
            let roleArray = [];
            config.roleme.forEach(ar => {
                roleArray.push(message.guild.roles.get(ar).name);
            });

            if(roles.length > 1){
                return message.channel.send(`:x: There where multiple matches found for that search!\n\`${rolesArray.join(', ')}\``);
            } else if (roles.length === 1){
                if(!config.roleme.includes(roles[0].id)) return message.channel.send(`:x: That role isn't enabled for RoleMe!`);
                let gmember = message.guild.members.get(message.author.id);
                let memberRoles = [];
                gmember.roles.forEach(r => {
                    memberRoles.push(r.id);
                });
                if(memberRoles.includes(roles[0].id)){
                    //they have the role, remove it
                    gmember.removeRole(roles[0])
                        .then(() => {
                            message.channel.send(`:white_check_mark: The role \`${roles[0].name}\` was removed!`);
                        })
                        .catch(e => {
                            message.channel.send(`:x: There was an error removing the role! Maybe I don't have the correct permissions?\n${e}`);
                        });
                } else {
                    //they don't have the role, give it to them
                    gmember.addRole(roles[0])
                        .then(() => {
                            message.channel.send(`:white_check_mark: The role \`${roles[0].name}\` was added!`);
                        })
                        .catch(e => {
                            message.channel.send(`:x: There was an error giving the role! Maybe I don't have the correct permissions?\n${e}`);
                        });
                }

            }
            
            break;
    }

};

exports.cfg = {
    name: 'roleme',
    desc: 'Configure or use server roleme.',
    usage: '{prefix}roleme [add/remove/list/rolename] [role name]',
    aliases: [],
    public: true
};