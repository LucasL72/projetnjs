/*======== La fonction filtre par titre ======================*/
function monFiltre() {
    // Declare variables
    let input, filter, listCard, card, h3, i, txtValue;
    input = document.getElementById('inputFilter');
    filter = input.value.toUpperCase();
    listCard = document.getElementById("listCard");
    card = listCard.getElementsByTagName('div');

    // Loop through all list items, and hide those who don't match the search query
    for (i = 0; i < card.length; i++) {
        h3 = card[i].getElementsByTagName("h3")[0];
        txtValue = (h3.textContent || h3.textContent).toUpperCase().indexOf(filter) > -1;

        if (txtValue) {
            card[i].style.display = "";
        } else {
            card[i].style.display = "none";
        }
    }
}