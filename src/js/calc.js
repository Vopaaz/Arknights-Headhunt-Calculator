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

function subArgs2Str(star, operatorNum, prevDraw, toDraw) {
  return `${star.toFixed(0)}-${operatorNum.toFixed(0)}-${prevDraw.toFixed(0)}-${toDraw.toFixed(0)}`
}

function calcSub(star, operatorNum, prevDraw, toDraw) {
  const id = subArgs2Str(star, operatorNum, prevDraw, toDraw)
  if (toDraw === 0) {
    return 0
  } else if (m.has(id)) {
    return m.get(id)
  } else {
    const probStar = probabilityTargetStar(star, prevDraw)

    const givenStarProbTarget = 0.5 / operatorNum

    // If is 6, clear prev. If is 5, set prev=100 so that guarantee won't work
    const givenStarNextPrevDraw = star === 6 ?  0 : 100

    let accProbNonTargetStar
    if (probStar === 1){
      accProbNonTargetStar = 0
    } else {
      accProbNonTargetStar = (1 - probStar) * calcSub(star, operatorNum, prevDraw + 1, toDraw - 1)
    }

    const res = probStar * givenStarProbTarget +
      probStar * (1 - givenStarProbTarget) * calcSub(star, operatorNum, givenStarNextPrevDraw, toDraw - 1) +
      accProbNonTargetStar
    m.set(id, res)
    return res
  }
}

export function calculateProbability(
  star,
  operatorNum,
  gem,
  originium,
  drawCoupon,
  drawTenCoupon,
  sixPrevDraw,
  thisPrevDraw
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
  return calcSub(star, operatorNum, prevDraw, toDraw)
}


