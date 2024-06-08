<template>
  <!-- <div class="container">
    <h1>games</h1>
  </div>



  <div class="table-container">
    <TLoading v-if="loading" />
    <TTable v-else :headers="headers" :bodyData="gamesFormated" :footers="footers"/>
  </div> -->

  <TPage title="games" :loading="loading">
    <button @click="newGame">new game</button>
    <TTable :headers="headers" :bodyData="gamesFormated" :footers="footers" @row-clicked="onRowClicked"/>
  </TPage>

</template>

<script>
import TTable from '@/components/TTable.vue'
import TPage from '@/components/TPage.vue'
import db from '@/utils/db.js'
import { formatDate } from '@/utils/dateUtils.js'

export default {
  name: 'GamesPage',
  created() {
    Promise.all([db.get('teams'), db.get('games')])
      .then((resultsArray) => {
        this.teams = resultsArray[0]
        this.games = resultsArray[1]
        this.loading = false
      })
  },
  data () {
    return {
      teams: null,
      games: null,
      loading: true,
      headers: ['date', 'home team', 'away team', { label:'result',  align:'center' }],
    }
  },
  computed: {
    teamsWithPoints () {
      if (!this.teams) {
        return []
      }
      return this.teams.map(team => {
        const goals = this.games.reduce((acc, cur) => {
          if (cur.hometeamid === team.id) {
            return [acc[0] + cur.hometeamgoals, acc[1] + cur.awayteamgoals]
          }
          if (cur.awayteamid === team.id) {
            return [acc[0] + cur.awayteamgoals, acc[1] + cur.hometeamgoals]
          }
          return acc
        }, [0, 0])
        return {
          id: team.id,
          team: `${team.team} ${team.city}`,
          games: this.games.reduce((acc, cur) => ([cur.hometeamid, cur.awayteamid].indexOf(team.id) > -1) ? acc + 1 : acc, 0),
          points: this.games.reduce((acc, cur) => {
            if (cur.hometeamid === team.id && cur.hometeamgoals > cur.awayteamgoals) {
              return acc + 3
            }
            if (cur.awayteamid === team.id && cur.hometeamgoals < cur.awayteamgoals) {
              return acc + 3
            }
            if ([cur.hometeamid, cur.awayteamid].indexOf(team.id) > -1 && cur.hometeamgoals === cur.awayteamgoals) {
              return acc + 1
            }
            return acc
          }, 0),
          score: goals // [51, 61]
        }
      }).sort((a, b) => {
        if (a.points !== b.points) {
          return b.points - a.points
        }
        const aScore = a.score[0] - a.score[1]
        const bScore = b.score[0] - b.score[1]
        if (aScore !== bScore) {
          return bScore - aScore
        }
        return b.score[0] - a.score[0]
      })
    },
    teamsCalculated () {
      return this.teamsWithPoints.map((team, index) => {
        return [
          { label: '' + (index + 1), align: 'center' },
          { label: team.team },
          { label: '' + team.games, align: 'center' },
          { label: '' + team.points, align: 'center' },
          { label: team.score.join(' : '), align: 'center' },
        ]
      })
    },
    teamsForContent () {
      return this.teamsWithPoints.map((team, index) => {
        return {
          content: [
            `standing: ${index + 1}`,
            `${team.team}`,
            `games: ${team.games}`,
            `points: ${team.points}`,
            `score: ${team.score.join(':')}`
          ],
          id: team.id
        }
      })
    },
    gamesFormated () {
      if (!this.games) {
        return []
      }
      return this.games.map(game => {
        return [
          formatDate(game.date),
          { label: `${game.hometeam} ${game.hometeamcity}`, id: this.teamsForContent.find(team => team.id === game.hometeamid).content },
          { label: `${game.awayteam} ${game.awayteamcity}`, id: this.teamsForContent.find(team => team.id === game.awayteamid).content },

          { label: `${game.hometeamgoals} : ${game.awayteamgoals}`, align: 'center' }

        ]
      })
    },
    numberOfGames () {
      return '' + (!this.games ? 0 : this.games.length)
    },
    footers() {
      return [{ label: 'total games played', colspan: 3 }, { label: this.numberOfGames, align: 'center' }]
    }
  },
  methods: {
    newGame () {
      this.$router.push('/gameform')
    },
    onRowClicked (index) {
      this.$router.push('/gameform/' + this.games[index].id)
    }
  },
  components: { TTable, TPage }
}

</script>


