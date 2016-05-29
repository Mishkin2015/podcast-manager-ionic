angular.module('starter.services', [])

.factory('Downloads', function($http) {

    var downloads = JSON.parse(window.localStorage.getItem("downloads")) || [];

    return {
        all: function() {
            return downloads;
        },
        remove: function(episode) {
            for(var i=0; i<downloads.length; i++){
                if(downloads[i].slug == episode.slug){
                    downloads.splice(downloads.indexOf(downloads[i]), 1);
                }
            }
            window.localStorage.setItem("downloads", JSON.stringify(downloads));
        },
        get: function(episodeId) {
            var episodeKey = "/";
            for(var i=0; i<downloads.length; i++){
                if(downloads[i].id == episodeId){
                    episodeKey = downloads[i].key;
                }
            }

            var promise;

            if (!promise) {
                promise = $http.get("https://api.mixcloud.com" + episodeKey).then(function (response) {
                    return response.data;
                });
            }

            return promise;
        },
        set: function(episode){
            episode.id = downloads.length;
            downloads.push(episode);
            window.localStorage.setItem("downloads", JSON.stringify(downloads));
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
            podcasts.splice(podcasts.indexOf(podcast), 1);
            window.localStorage.setItem("podcasts", JSON.stringify(podcasts));
        },
        subscribe: function(podcast){
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
})

.factory("Settings", function(){
    var settings = JSON.parse(window.localStorage.getItem("settings")) || {};

    return {
        get: function(setting){
            if(!settings[setting]){
                this.set(setting, false);
            }
            return settings[setting];
        },
        set: function(setting, value){
            settings[setting] = value;
            window.localStorage.setItem("settings", JSON.stringify(settings));
        }
    };
});
