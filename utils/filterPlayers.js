
export const filterPlayers = (players) => {
    const tmp = [];
    let haveError = false;
    players.forEach((player)=>{
        if (player.email && player.name)
            tmp.push(player)
        else if (player.email || player.name)
            haveError = true;
    })
    if (haveError)
        return {error:true};
    return tmp;
}