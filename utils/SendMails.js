export const sendAllEmailsWithSetInterval = (secretSantaDetail, setIsLoading, navigation, nextPageName) => {       
    let mailsSent = 0;
    let task = setInterval(
        () => {
            if(mailsSent === secretSantaDetail.couples.length){
                setIsLoading(false);
                clearInterval(task);
                navigation.navigate(nextPageName);
            }
            else{
                const   organisateurNom = secretSantaDetail.organisateur,
                        giver = secretSantaDetail.couples[mailsSent].giver,
                        receiver = secretSantaDetail.couples[mailsSent].receiver,
                        budget = secretSantaDetail.budget;
                sendEmailWithSetInterval(organisateurNom, giver, receiver, budget);
                mailsSent++;
            }
        },
        1100
    )
}

const sendEmailWithSetInterval = (organisateur, destinataireMail, destinataireCadeau, budget) => {
    const payloadBody = {
        "service_id": "service_96bgpzc",
        "template_id": "template_x0fk83r",
        "user_id": "25pqutaWVYNTz_XTC",
        "accessToken": "BSPbjtyoSwHDTI6M1UpAo",
        "template_params": {
            "to_mail": destinataireMail.email,
            "organiser": organisateur,
            "santa": destinataireMail.name,
            "destinataire": destinataireCadeau.name,
            "budget": budget
        }
    };

    const fullPayload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payloadBody)
    };

    // console.log(    "organisateur : " + organisateur + "budget : " + budget + "destinataire mail : ", destinataireMail.name + "-" 
    //                 + destinataireMail.email, "destinataireCadeau : " + destinataireCadeau.name + "\n");
    try{
        fetch("https://api.emailjs.com/api/v1.0/email/send", fullPayload)
        // .then(response => console.log(response))
    }
    catch(e){
        console.log(e);
    }
}