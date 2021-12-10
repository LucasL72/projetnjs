
/*======== 
La fonction filtre par titre ======================*/
function monFiltre() {
    // Declare variables
    let input, filter, listCard, card, h4, i, txtValue;
    input = document.getElementById("inputFilter");
    filter = input.value.toUpperCase();
    listCard = document.getElementById("listCard");
    card = listCard.getElementsByTagName("div");

    // Boucle pour parcourir nos cards
    for (i = 0; i < card.length; i++) {
        h4 = card[i].getElementsByTagName("h4")[0];
       
        txtValueH4 =
            (h4.textContent || h4.textContent).toUpperCase().indexOf(filter) > -1;
       


        // Condition pour ajouter notre display none au div ne correspondant pas à notre recherche (input.value)
        if (txtValueH4) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}