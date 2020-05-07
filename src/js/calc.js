// import * as _ from "lodash"

function probabilityTargetStar(star, prevDraw) {
  if (star === 5) {
    if (prevDraw === 9) {
      return 1
    } else {
      return 0.08
    }
  } else if (star === 6) {
    if (prevDraw <= 49) {
      return 0.02
    } else if (prevDraw < 99) {
      return ((prevDraw - 48) * 2 / 100)
    } else {
      return undefined
    }
  } else {
    return undefined
  }
}

function totalDraw(gem, originium, drawCoupon, drawTenCoupon) {
  return Math.floor((gem + 180 * originium) / 600 + drawCoupon + 10 * drawTenCoupon)
}


const m = new Map()

function subArgs2Str(star, operatorNum, prevDraw, toDraw, limited) {
  return `${star.toFixed(0)}-${operatorNum.toFixed(0)}-${prevDraw.toFixed(0)}-${toDraw.toFixed(0)}-${limited.toString()}`
}

function emptyRes(){
  return {
    target: Array(7).fill(0),
    targetStar: Array(7).fill(0)
  }
}

function calcSub(star, operatorNum, prevDraw, toDraw, limited) {
  const id = subArgs2Str(star, operatorNum, prevDraw, toDraw, limited)

  let res = emptyRes()
  if (toDraw === 0) {
    res.target[0] = 1
    res.targetStar[0] = 1
  } else if (m.has(id)) {
    res = m.get(id)
  } else {
    const probStar = probabilityTargetStar(star, prevDraw)

    const givenStarProbTarget = star === 6 && limited === true ? 0.7 / operatorNum : 0.5 / operatorNum

    // If is 6, clear prev. If is 5, set prev=100 so that guarantee won't work
    const givenStarNextPrevDraw = star === 6 ? 0 : 100

    // Following probability given this draw is NOT target star
    const pNotS = probStar === 1 ? emptyRes() : calcSub(star, operatorNum, prevDraw + 1, toDraw - 1, limited)

    // Following probability given this draw is target star
    const pIsS = calcSub(star, operatorNum, givenStarNextPrevDraw, toDraw - 1, limited)

    for (let index = 0; index < res.target.length; index++) {
      if (index === 0) {
        res.targetStar[index] = (1 - probStar) * pNotS.targetStar[index]
        res.target[index] = (1 - probStar) * pNotS.target[index] + (probStar * (1 - givenStarProbTarget)) * pIsS.target[index]
      } else if (index < res.target.length - 1) {
        res.targetStar[index] = (1 - probStar) * pNotS.targetStar[index] + probStar * pIsS.targetStar[index - 1]
        res.target[index] = (1 - probStar) * pNotS.target[index] + (probStar * (1 - givenStarProbTarget)) * pIsS.target[index]
          + probStar * givenStarProbTarget * pIsS.target[index - 1]
      } else {
        res.targetStar[index] = (1 - probStar) * pNotS.targetStar[index] + probStar * (pIsS.targetStar[index - 1] + pIsS.targetStar[index])
        res.target[index] = (1 - probStar) * pNotS.target[index] + (probStar * (1 - givenStarProbTarget)) * pIsS.target[index]
          + probStar * givenStarProbTarget * (pIsS.target[index - 1] + pIsS.target[index])
      }
    }
  }
  m.set(id, res)
  return res
}

export function calculateProbability(
  star,
  operatorNum,
  gem,
  originium,
  drawCoupon,
  drawTenCoupon,
  sixPrevDraw,
  thisPrevDraw,
  limited
) {

  const toDraw = totalDraw(gem, originium, drawCoupon, drawTenCoupon)
  let prevDraw
  if (star === 6) {
    prevDraw = sixPrevDraw
  } else if (star === 5) {
    prevDraw = thisPrevDraw
  } else {
    return undefined
  }
  return calcSub(star, operatorNum, prevDraw, toDraw, limited)
}


