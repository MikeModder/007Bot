exports.run = (client, message, args) => {
    let manageRoles = message.guild.members.get(message.author.id).permissions.has('MANAGE_ROLES');
    let action = args.shift();
    let rolename = args.join(' ');
    let config = client.server_cfg.get(message.guild.id);
    let roles;

    if(!manageRoles){
        message.channel.send(`:x: You need the \`MANAGE_ROLES\` permission to use this command!`);
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
                return message.channel.send(`:x: There where multiple matches found for that search!\n\`${rolesArray.join(', ')}\``)
            } else if (roles.length === 1) {
                if(config.autorole.includes(roles[0].id)){
                    return message.channel.send(`:x: That role is already setup for AutoRole! You can remove it with \`autorole remove ${roles[0].name}\`.`);
                }
                config.autorole.push(roles[0].id);
                client.server_cfg.set(message.guild.id, config);
                return message.channel.send(`:white_check_mark: Added role \`${roles[0].name}\` to the AutoRole list!`);
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
                return message.channel.send(`:x: There where multiple matches found for that search!\n\`${rolesArray.join(', ')}\``)
            } else if (roles.length === 1) {
                if(!config.autorole.includes(roles[0].id)){
                    return message.channel.send(`:x: That role isn't setup for AutoRole! You can add it with \`autorole add ${roles[0].name}\`.`);
                }
                config.autorole.splice(config.autorole.indexOf(roles[0].id), 1);
                client.server_cfg.set(message.guild.id, config);
                return message.channel.send(`:white_check_mark: Removed role \`${roles[0].name}\` from the AutoRole list!`);
            }
            break;
        case 'list':
            //list the roles on the list
            if(!config.autorole.length > 0) return message.channel.send(`There are no roles currently setup for AutoRole!`);
            roles = [];
            config.autorole.forEach(ar => {
                roles.push(message.guild.roles.get(ar).name);
            });
            message.channel.send(`The following roles are setup for AutoRole:\n\`${roles.join(', ')}\``);
            break;
        default:
            //incorrect
            return message.channel.send(`:x: That isn't a valid option!\n Options: \`add, remove, list\`.`);
            break;
    }

};

exports.cfg = {
    name: 'autorole',
    desc: 'Configure server autorole.',
    usage: '{prefix}autorole [add/remove/list] [role name]',
    aliases: [],
    public: true
};