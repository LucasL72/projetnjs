/*======== La fonction filtre par titre ======================*/
function monFiltre() {
    // Declare variables
    let input, filter, listCard, card, h4, i, txtValue;
    input = document.getElementById('inputFilter');
    filter = input.value.toUpperCase();
    listCard = document.getElementById("listCard");
    card = listCard.getElementsByTagName('div');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < card.length; i++) {
        h4 = card[i].getElementsByTagName("h4")[0];
        txtValue = h4.textContent || h4.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
};