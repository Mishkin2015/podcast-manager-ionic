angular.module('starter.controllers', [])

.controller('PodcastsCtrl', function($scope, $ionicPopup, $state, Podcasts) {
    $scope.search = function(){
        $scope.data = {};
        $ionicPopup.show({
            template: '<input type="Text" ng-model="data.term" autofocus>',
            title: 'Search',
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Search</b>',
                    type: 'button-positive',
                    onTap: function(e) {3
                        $state.go('tab.podcasts-search', {term: $scope.data.term})
                    }
                },
            ]
        });
    };

    $scope.podcasts = Podcasts.allPodcasts();
})

.controller('SearchCtrl', function($scope, $stateParams, $ionicLoading, $ionicListDelegate, Podcasts){
    $ionicLoading.show({template: 'Loading...'});

    Podcasts.searchPodcast($stateParams.term).then(function(response){
        var podcasts = Podcasts.allPodcasts();
        for(var i=0; i<response.data.length; i++){
            response.data[i].subscribed = false;
            for(var j=0; j<podcasts.length; j++){
                if(response.data[i].username == podcasts[j].username){
                    response.data[i].subscribed = true;
                    break;
                }
            }
        }
        $scope.podcasts = response.data;
        $ionicLoading.hide();
    });

    $scope.subscribe = function(podcast){
        podcast.subscribed = true;
        Podcasts.subscribe(podcast);
        $ionicListDelegate.closeOptionButtons();
    }

    $scope.unsubscribe = function(podcast){
        Podcasts.unsubscribe(podcast);
        $ionicListDelegate.closeOptionButtons();
    }
})

.controller('PodcastEpisodesCtrl', function($scope, $stateParams, $ionicLoading, Podcasts, Downloads) {
    $scope.podcastId = $stateParams.podcastId;

    $ionicLoading.show({template: 'Loading...'});

    Podcasts.getEpisodes($stateParams.podcastId).then(function(response){
        var downloads = Downloads.all();
        for(var i=0; i<response.data.length; i++){
            response.data[i].downloaded = false;
            for(var j=0; j<downloads.length; j++){
                if(response.data[i].slug == downloads[j].slug){
                    response.data[i].downloaded = true;
                    break;
                }
            }
        }

        $scope.episodes = response.data;
        $ionicLoading.hide();
    });

    $scope.download = function(episode){
        episode.downloaded = true;
        Downloads.set(episode);
    };

    $scope.delete = function(episode){
        Downloads.remove(episode);
    }
})

.controller('DownloadsCtrl', function($scope, Downloads) {
    $scope.downloads = Downloads.all();

    $scope.remove = function(episode) {
        Downloads.remove(episode);
    };
})

.controller('DownloadDetailCtrl', function($scope, $stateParams, $ionicLoading, Downloads) {
    $ionicLoading.show({template: 'Loading...'});
    Downloads.get($stateParams.episodeId).then(function(response){
        $scope.episode = response;
        $ionicLoading.hide();
    });
})

.controller('SettingsCtrl', function($scope, Settings) {
    $scope.settings = {
        dark: Settings.get("dark")
    };

    $scope.$watch("settings.dark", function(){
        var link = document.getElementById("theme");
        if($scope.settings.dark){
            Settings.set("dark", true);
            link.setAttribute("href", "css/ionic.app.css");
        }else{
            Settings.set("dark", false);
            link.setAttribute("href", "lib/ionic/css/ionic.css");
        }
    });
});
