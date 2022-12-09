export const filterForm = (data, isEnabled) => {
    const tmp = [];
    const numberSubscribe = Object.keys(data).length / 2;
    for (let i = 0; i < numberSubscribe; i++) {
        if (data['name-' + i] && data['email-' + i])
            tmp.push({name: data['name-' + i], email: data['email-' + i]});
        else if (data['name-' + i] || data['email-' + i]){
            return {error:true};
        }

    }
    if (isEnabled)
        tmp.push({name: data['name-Organisateur'], email: data['email-Organisateur']});
    return {player:tmp, organisateur: data['name-Organisateur'], error:false};
}