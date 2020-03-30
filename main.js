var users = [];

getUsers();

/** * Função para transformar a lista em json e o js conseguir ler  */
function getUsers() {
    $.ajax({
        url: 'https://randomuser.me/api/?results=15&nat=BR',
        dataType: 'json',
        success: function(data) {
            users = data.results;
            generateItemView(data.results);
            searchUser();
        }
    });
}

/** * Função de geração de cada item
 * o forEach percorre a lista em um loop como se fosse um 'for' do android
 */
function generateItemView(results) {
    $("#users").empty();
    results.forEach(function(user, index) {
        $("#users").append(
            '<li class="item_user">' +
            '<img class="thumb_user"src="' + user.picture.thumbnail + '"/>' +
            '<span class="name_user">' + user.name.first + " " + user.name.last + '</span>' +
            '<span class="info_user">' + user.email + '</span>' +
            '<span class="info_user">' + user.phone + '</span>' +
            '<span class="info_user">' + user.location.city + '</span>' +
            '<div class="options">' +
            '<button> <img src="./assets/icon_trash.svg"/></button>' +
            '<button> <img src="./assets/icon_all_grey.svg"/></button>' +
            '<button> <img src="./assets/icon_one_checked.svg"/></button>' +
            '</div>' +
            '</li>');
    });
}

// função que pega o evento de escrita do input
function searchUser() {
    $("#search").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        generateItemView(search(value));
    });
}

// função que filtra a lista buscando os elementos que estão contidos nela
function search(query) {
    return this.users.filter(function(user) { return user.name.first.toLowerCase().indexOf(query.toLowerCase()) > -1; })
}