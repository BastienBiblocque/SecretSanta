export const generateCouples = (data) => {
    const couples = [];
    const shuffledPlayer = data.sort((a, b) => 0.5 - Math.random());
    shuffledPlayer.forEach((player, index)=>{
        if (shuffledPlayer[index+ 1])
            couples.push({giver: shuffledPlayer[index], receiver: shuffledPlayer[index+ 1]});
        else
            couples.push({giver: shuffledPlayer[index], receiver: shuffledPlayer[0]});
    })
    return couples;
}