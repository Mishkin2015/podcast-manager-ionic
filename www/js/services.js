angular.module('starter.services', [])

.factory('Chats', function() {

    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function() {
            return chats;
        },
        remove: function(chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function(chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory("Podcasts", function($http){

    var podcasts = JSON.parse(window.localStorage.getItem("podcasts")) || [];

    return {
        allPodcasts: function(){
            return podcasts;
        },
        unsubscribe: function(podcast){
            // podcasts.splice(podcasts.indexOf(podcast), 1);

            podcasts.splice(podcasts.indexOf(podcast), 1);
            window.localStorage.setItem("podcasts", JSON.stringify(podcasts));
        },
        subscribe: function(podcast){
            // podcast.id = podcasts.length;
            // podcasts.push(podcast);

            podcast.id = podcasts.length;
            podcasts.push(podcast);
            window.localStorage.setItem("podcasts", JSON.stringify(podcasts));
        },
        searchPodcast: function(term){
            var promise;

            if (!promise) {
                promise = $http.get("https://api.mixcloud.com/search/?q="+ term.replace(' ', '+') +"&type=user").then(function (response) {
                    return response.data;
                });
            }

            return promise;
        },
        getPodcast: function(id){
            for(var i=0; i<podcasts.length; i++){
                if(podcasts[i].id == id){
                    return podcasts[i];
                }
            }
        },
        getEpisodes: function(id){
            var username;
            console.log(podcasts);
            for(var i=0; i<podcasts.length; i++){
                if(podcasts[i].id == id){
                    username = podcasts[i].username;
                    break;
                }
            }

            var promise;

            if (!promise) {
                promise = $http.get("https://api.mixcloud.com/"+ username +"/cloudcasts/").then(function (response) {
                    return response.data;
                });
            }

            return promise;
        }
    };
});
