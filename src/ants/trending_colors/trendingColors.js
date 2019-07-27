import { glue , piped , sort , sortBy , tap } from 'rambdax'
import axios from 'axios'

export async function trendingColorsAnt(numResults = 100){
  const url = glue(`
    http://www.colourlovers.com/api/colors?format=json
    numResults=${numResults}
    orderCol=dateCreated
    sortBy=DESC
    `, '&')
  const { data } = await axios.get(url)
  const sk = piped(
    data,
    sort((a,b) => {
      if(a.numVotes !== b.numVotes){
        return a.numVotes > b.numVotes ? -1:1
      }
      if(a.numViews === b.numViews) return 0

      return a.numViews > b.numViews ? -1:1
    }),
    // tap(x => x.map(xx => console.log(xx.numVotes, xx.numViews)))
    )
    // console.log(sk,data.length)

}
