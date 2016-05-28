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

  var podcasts = [
    {
      id: 1,
      username: "grokpodcast",
      name: "Grok Podcast",
      img: "http://is3.mzstatic.com/image/thumb/Music6/v4/3e/13/b3/3e13b374-3e2c-9fbb-5bce-dc04aa4bb6ca/source/600x600bb.jpg",
      descript: "League of Ipsum dolor sit amet inhibitor ignite dodge reset pro strats BotRK support roam lag overstaying wraiths skintimidation instalock Elo hell gap closer. Map queue pentakill wolves counter gank smurf pentakill top skins bait jungle push AFK solo queue leash pentakill proc top dodge. Top inhib bronze smurf queue fog of war ARAM leash bronze bush report bruiser fountain nexus inhibitor dunk. Elixir 1v1 skintimidation golems solo queue bait ARAM lag pro banana ganks queue golems fog of war warding counter gank. Inhibitor ult doran's roam face check kite double buffs quadra top dunk assist fountain wraiths baron jungle. Vision troll red buff chase global instakill nexus roam doran's gap closer baron hue poke hue dragon mid top. Skillshot BotRK gap closer smurf chase League of Legends report wraiths CC fog of war face check wave chase quadrakill bruiser."
    },
    {
      id: 2,
      username: "nerdcastjovemnerd",
      name: "Nerdcast",
      img: "img/nerdcast.jpg",
      descript: "League of Ipsum dolor sit amet inhibitor ignite dodge reset pro strats BotRK support roam lag overstaying wraiths skintimidation instalock Elo hell gap closer. Map queue pentakill wolves counter gank smurf pentakill top skins bait jungle push AFK solo queue leash pentakill proc top dodge. Top inhib bronze smurf queue fog of war ARAM leash bronze bush report bruiser fountain nexus inhibitor dunk. Elixir 1v1 skintimidation golems solo queue bait ARAM lag pro banana ganks queue golems fog of war warding counter gank. Inhibitor ult doran's roam face check kite double buffs quadra top dunk assist fountain wraiths baron jungle. Vision troll red buff chase global instakill nexus roam doran's gap closer baron hue poke hue dragon mid top. Skillshot BotRK gap closer smurf chase League of Legends report wraiths CC fog of war face check wave chase quadrakill bruiser."
    },
    {
      id: 3,
      username: "matandorobosgigantes",
      name: "Matando Robos Gigantes",
      img: "img/mrg.jpg",
      descript: "League of Ipsum dolor sit amet inhibitor ignite dodge reset pro strats BotRK support roam lag overstaying wraiths skintimidation instalock Elo hell gap closer. Map queue pentakill wolves counter gank smurf pentakill top skins bait jungle push AFK solo queue leash pentakill proc top dodge. Top inhib bronze smurf queue fog of war ARAM leash bronze bush report bruiser fountain nexus inhibitor dunk. Elixir 1v1 skintimidation golems solo queue bait ARAM lag pro banana ganks queue golems fog of war warding counter gank. Inhibitor ult doran's roam face check kite double buffs quadra top dunk assist fountain wraiths baron jungle. Vision troll red buff chase global instakill nexus roam doran's gap closer baron hue poke hue dragon mid top. Skillshot BotRK gap closer smurf chase League of Legends report wraiths CC fog of war face check wave chase quadrakill bruiser."
    },
    {
      id: 4,
      username: "99vidas",
      name: "99vidas",
      img: "img/99vidas.jpg",
      descript: "League of Ipsum dolor sit amet inhibitor ignite dodge reset pro strats BotRK support roam lag overstaying wraiths skintimidation instalock Elo hell gap closer. Map queue pentakill wolves counter gank smurf pentakill top skins bait jungle push AFK solo queue leash pentakill proc top dodge. Top inhib bronze smurf queue fog of war ARAM leash bronze bush report bruiser fountain nexus inhibitor dunk. Elixir 1v1 skintimidation golems solo queue bait ARAM lag pro banana ganks queue golems fog of war warding counter gank. Inhibitor ult doran's roam face check kite double buffs quadra top dunk assist fountain wraiths baron jungle. Vision troll red buff chase global instakill nexus roam doran's gap closer baron hue poke hue dragon mid top. Skillshot BotRK gap closer smurf chase League of Legends report wraiths CC fog of war face check wave chase quadrakill bruiser."
    }
  ];

  return {
    allPodcasts: function(){
      return podcasts;
    },
    remove: function(podcast){
      podcasts.splice(podcasts.indexOf(podcast), 1);
    },
    searchPodcast: function(term){
      var promise;

      if (!promise) {
        promise = $http.get("https://api.mixcloud.com/search/?q="+ term.replace(' ', '+') +"&type=user").then(function (response) {          
          console.log(response);

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
          console.log(response);

          return response.data;
        });
      }

      return promise;
    }
  };
});
