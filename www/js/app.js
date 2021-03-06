angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, Settings) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    var link = document.getElementById("theme");
    if(Settings.get("dark")){
        link.setAttribute("href", "css/ionic.app.css");
    }else{
        link.setAttribute("href", "lib/ionic/css/ionic.css");
    }
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.tabs.style('standard').position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center').positionPrimaryButtons('left');

    $stateProvider

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.podcasts', {
        url: '/podcasts',
        views: {
            'tab-podcasts': {
                templateUrl: 'templates/tab-podcasts.html',
                controller: 'PodcastsCtrl'
            }
        }
    })

    .state('tab.podcasts-search', {
        url: '/podcasts/search/:term',
        views: {
            'tab-podcasts': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('tab.podcasts-episodes', {
        url: '/podcasts/:podcastId',
        views: {
            'tab-podcasts': {
                templateUrl: 'templates/podcast-episodes.html',
                controller: 'PodcastEpisodesCtrl'
            }
        }
    })

    .state('tab.downloads', {
        url: '/downloads',
        views: {
            'tab-downloads': {
                templateUrl: 'templates/tab-downloads.html',
                controller: 'DownloadsCtrl'
            }
        }
    })

    .state('tab.download-detail', {
        url: '/downloads/:episodeId',
        views: {
            'tab-downloads': {
                templateUrl: 'templates/episode-detail.html',
                controller: 'DownloadDetailCtrl'
            }
        }
    })

    .state('tab.settings', {
        url: '/settings',
        views: {
            'tab-settings': {
                templateUrl: 'templates/tab-settings.html',
                controller: 'SettingsCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/podcasts');

});
