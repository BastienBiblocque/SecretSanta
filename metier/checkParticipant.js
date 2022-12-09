export const checkParticipant = (evenement) => {
    const allPlayerName = evenement.player.map((player) => player.name);
    if (allPlayerName.length !== new Set(allPlayerName).size) {
        return {title: 'Nom similaire', message: "Les noms des participants doivent être différents"};
    }
    const allPlayerEmail = evenement.player.map((player) => player.email);
    if (allPlayerEmail.length !== new Set(allPlayerEmail).size) {
        return {title: 'Mail similaire', message: "Les mails des participants doivent être différents"};
    }
    console.log(allPlayerName.length)
    if (allPlayerName.length < 3) {
        return {
            title: 'Nombre insufisant',
            message: "Vous devez inscrire au moins 3 personnes pour créer un évenement"
        };
    }
    return false;
}
