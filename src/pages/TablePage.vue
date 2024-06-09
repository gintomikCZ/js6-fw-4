<template>
  <!-- <div class="container">
    <h1>table</h1>
  </div>

  <div class="table-container">
    <TLoading v-if="loading" />
    <TTable v-else :headers="headers" :bodyData="teamsCalculated" />
  </div> -->
  <TPage title="table">
    <button @click="addNew">add new team</button>
    <TTable :headers="headers" :bodyData="teamsCalculated" @row-clicked="onRowClicked"/>
  </TPage>
</template>

<script>

/*

standing | team city | games played | points | score


*/
import db from '@/utils/db.js'
import TTable from '@/components/TTable.vue'
import TPage from '@/components/TPage.vue'
export default {
  name: 'TablePage',
  created() {
    // stahnout data z tabulky games i z tabulky teams
    Promise.all([db.get('teams'), db.get('games')])
      .then((resultsArray) => {
        this.teams = resultsArray[0]
        this.games = resultsArray[1]
        this.$store.commit('switchLoading', false)
      })
  },
  data () {
    return {
      teams: null,
      games: null,
      headers: ['standing', 'team', 'games', 'points', 'score']
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
          {label: '' + (index + 1), align: 'center'},
          {label: team.team},
          {label: '' + team.games, align: 'center'},
          {label: '' + team.points, align: 'center'},
          {label: team.score.join(' : '), align: 'center'},
        ]
      })
    }
  },
  methods: {
    addNew () {
      this.$router.push('/teamform')
    },
    onRowClicked (index) {
      this.$router.push('/teamform/' + this.teamsWithPoints[index].id)
    }
  },
  components: { TPage, TTable }
}

</script>