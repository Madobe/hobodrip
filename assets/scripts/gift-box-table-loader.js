( function () {
    [
        ["Andoris", 0, 3, 2, 0, 1],
        ["Belka", 0, 2, 0, 3, 1],
        ["Centaraussi", 1, 0, 3, 0, 2],
        ["Cheeta", 3, 0, 2, 0, 1],
        ["Colphne", 0, 1, 3, 2, 0],
        ["Daiyan", 0, 3, 2, 1, 0],
        ["Dushevnaya", 2, 3, 0, 1, 0],
        ["Faye", 0, 3, 2, 0, 1],
        ["Groza", 0, 2, 3, 0, 1],
        ["Jiangyu", 2, 3, 0, 1, 0],
        ["Klukay", 3, 0, 0, 2, 1],
        ["Krolik", 2, 1, 0, 0, 3],
        ["Ksenia", 3, 1, 2, 0, 0],
        ["Lenna", 3, 0, 1, 2, 0],
        ["Littara", 0, 3, 2, 0, 1],
        ["Lotta", 0, 0, 3, 1, 2],
        ["Macchiato", 2, 0, 1, 0, 3],
        ["Mechty", 3, 0, 2, 0, 1],
        ["Mosin-Nagant", 0, 1, 2, 3, 0],
        ["Nagant", 0, 0, 1, 3, 2],
        ["Nemesis", 1, 3, 0, 2, 0],
        ["Papasha", 2, 3, 0, 1, 0],
        ["Peri", 0, 0, 2, 1, 3],
        ["Peritya", 3, 0, 0, 2, 1],
        ["Qiongjiu", 0, 1, 0, 2, 3],
        ["Sabrina", 1, 3, 2, 0, 0],
        ["Sharkry", 0, 1, 0, 3, 2],
        ["Springfield", 0, 2, 3, 0, 1],
        ["Suomi", 1, 2, 3, 0, 0],
        ["Tololo", 3, 0, 0, 1, 2],
        ["Ullrid", 0, 2, 1, 0, 3],
        ["Vector", 1, 0, 2, 0, 3],
        ["Vepley", 0, 2, 0, 3, 1],
        ["Zhaohui", 1, 0, 3, 0, 2],
    ].forEach( doll => {
        console.log( doll );
        var tr = document.createElement( "tr" );

        doll.forEach( item => {
            var td = tr.insertCell();
            var text = "";

            if ( isNaN( item ) ) text = item;
            else if ( !item ) text = "";
            else if ( item === 1 ) { text = "+25%"; td.classList.add( "text-white-50" ); }
            else if ( item === 2 ) text = "+50%";
            else if ( item === 3 ) { text = "+75%"; td.classList.add( "table-success" ); }

            td.appendChild( document.createTextNode( text ) );
        });

        document.getElementById( "gift-box-table" ).appendChild( tr );
    });
})();